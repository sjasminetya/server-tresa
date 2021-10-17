const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { upload } = require('../middlewares/multer');

router.get('/dashboard', adminController.viewDashboard);
router.get('/category', adminController.viewCategory);
router.post('/add-category', adminController.addCategory);
router.put('/edit-category', adminController.editCategory);
router.delete('/delete-category/:id', adminController.deleteCategory);
router.get('/bank', adminController.viewBank);
router.post('/add-bank', upload, adminController.addBank);
router.put('/edit-bank', upload, adminController.editBank);
router.delete('/delete-bank/:id', adminController.deleteBank);
router.get('/item', adminController.viewItem);
router.get('/booking', adminController.viewBooking);

module.exports = router;