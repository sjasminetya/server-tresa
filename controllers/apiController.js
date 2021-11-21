const ItemModel = require('../models/Item');
const ActivityModel = require('../models/Activity');
const BookingModel = require('../models/Booking');
const CategoryModel = require('../models/Category');
const BankModel = require('../models/Bank');
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
  }
}