const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');
const auth = require("../middlewares/auth");

router.get('/login', adminController.viewLogin);
router.post('/login', adminController.actionLogin);
router.use(auth);

router.get('/logout', adminController.actionLogout);

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

// endpoint item detail
router.get('/item/show-detail-item/:itemId', adminController.viewDetailItem);

// endpoint feature
router.post('/add-feature', uploadSingle, adminController.addFeature);
router.put('/edit-feature', uploadSingle, adminController.editFeature);
router.delete('/delete-feature/:itemId/:id', adminController.deleteFeature);

// endpoint activity
router.post('/add-activity', uploadSingle, adminController.addActivity);
router.put('/edit-activity', uploadSingle, adminController.editActivity);
router.delete('/delete-activity/:itemId/:id', adminController.deleteActivity);

// endpoint booking
router.get('/booking', adminController.viewBooking);

module.exports = router;