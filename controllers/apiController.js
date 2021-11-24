const ItemModel = require('../models/Item');
const ActivityModel = require('../models/Activity');
const BookingModel = require('../models/Booking');
const CategoryModel = require('../models/Category');
const BankModel = require('../models/Bank');
const MemberModel = require('../models/Member');
const { reject, response } = require('../helpers/helpers');

module.exports = {
  landingPage: async (req, res) => {
    try {
      // hero
      const traveler = await BookingModel.find();
      const treasure = await ActivityModel.find();
      const city = await ItemModel.find();

      // mostpicked
      const mostPicked = await ItemModel.find().select('_id title country city price unit imageId').limit(5).populate({ path: 'imageId', select: '_id imageUrl' });

      // category
      const category = await CategoryModel.find().select('_id name').limit(3).populate({ path: 'itemId', select: '_id title country city isPopular imageId', populate: { path: 'imageId', select: '_id imageUrl', perDocumentLimit: 1 }, perDocumentLimit: 4, options: { sort: { sumBooking: -1 } } });

      // is popular
      for (let i = 0; i < category.length; i++) {
        for (let x = 0; x < category[i].itemId.length; x++) {
          const item = await ItemModel.findOne({ _id: category[i].itemId[x]._id });
          item.isPopular = false;
          await item.save();
          if (category[i].itemId[0] === category[i].itemId[x]) {
            item.isPopular = true;
            await item.save();
          }
        }
      }

      // testimoni
      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "images/testimonial2.jpg",
        name: "Happy Family",
        rate: 4.55,
        content: "What a great trip with my family and I should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer"
      }

      const result = {
        hero: {
          travelers: traveler.length,
          treasures: treasure.length,
          cities: city.length
        },
        mostPicked,
        category,
        testimonial
      }

      return response(res, result, 200, null)
    } catch (error) {
      return reject(res, [], 404, { error: 'Internal server error' })
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await ItemModel.findOne({ _id: id }).populate({ path: 'imageId', select: '_id imageUrl' }).populate({ path: 'featureId', select: '_id name qty imageUrl' }).populate({ path: 'activityId', select: '_id name type imageUrl' });
      const bank = await BankModel.find();
      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "images/testimonial1.jpg",
        name: "Happy Family",
        rate: 4.55,
        content: "What a great trip with my family and I should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer"
      }
      const result = {
        ...item._doc,
        bank,
        testimonial
      }
      return response(res, result, 200, null)
    } catch (error) {
      return reject(res, [], 404, { error: 'Internal server error' })
    }
  },
  bookingPage: async (req, res) => {
    const {
      idItem,
      duration,
      bookingStartDate,
      bookingEndDate,
      firstName,
      lastName,
      email,
      phoneNumber,
      accountHolder,
      bankFrom,
    } = req.body;

    if (!req.file) {
      return reject(res, null, 404, { error: 'Image not found' })
    }

    if (idItem === undefined || duration === undefined || bookingStartDate === undefined || bookingEndDate === undefined || firstName === undefined || lastName === undefined || email === undefined || phoneNumber === undefined || accountHolder === undefined || bankFrom === undefined) {
      return reject(res, null, 404, { error: 'Lengkapi semua field!' })
    }

    const item = await ItemModel.findOne({ _id: idItem });

    if (!item) {
      return reject(res, null, 404, { error: 'Item not found' })
    }

    item.sumBooking += 1;

    await item.save();

    let total = item.price * duration;
    let tax = total * 0.10;

    const invoice = Math.floor(1000000 + Math.random() * 9000000);

    const member = await MemberModel.create({
      firstName,
      lastName,
      email,
      phoneNumber
    });

    const newBooking = {
      invoice,
      bookingStartDate,
      bookingEndDate,
      total: total += tax,
      itemId: {
        _id: item.id,
        title: item.title,
        price: item.price,
        duration
      },
      memberId: member.id,
      payments: {
        proofPayment: `images/${req.file.filename}`,
        bankFrom,
        accountHolder
      }
    }

    const booking = await BookingModel.create(newBooking);

    return response(res, booking, 201, null)
  }
}