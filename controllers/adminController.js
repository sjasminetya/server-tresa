const categoryModel = require('../models/Category');

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard');
    },
    viewCategory: async (req, res) => {
        const category = await categoryModel.find();
        res.render('admin/category/view_category', {category});
    },
    addCategory: async (req, res) => {
        const { name } = req.body
        await categoryModel.create({name});
        res.redirect('/admin/category');
    },
    viewBank: (req, res) => {
        res.render('admin/bank/view_bank');
    },
    viewProperty: (req, res) => {
        res.render('admin/property/view_property');
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking');
    }
}