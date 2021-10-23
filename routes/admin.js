const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');

router.get('/dashboard', adminController.viewDashboard);

// endpoint category
router.get('/category', adminController.viewCategory);
router.post('/add-category', adminController.addCategory);
router.put('/edit-category', adminController.editCategory);
router.delete('/delete-category/:id', adminController.deleteCategory);

// endpoint bank
router.get('/bank', adminController.viewBank);
router.post('/add-bank', uploadSingle, adminController.addBank);
router.put('/edit-bank', uploadSingle, adminController.editBank);
router.delete('/delete-bank/:id', adminController.deleteBank);

// endpoint item
router.get('/item', adminController.viewItem);
router.get('/item/:id', adminController.showEditItem);
router.get('/item/show-image/:id', adminController.showImageItem);
router.post('/add-item', uploadMultiple, adminController.addItem);
router.put('/edit-item/:id', uploadMultiple, adminController.editItem);
router.delete('/delete-item/:id', adminController.deleteItem);

// endpoint booking
router.get('/booking', adminController.viewBooking);

module.exports = router;