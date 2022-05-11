const Router = require('express');
const router = new Router();
const staffController = require('../controllers/staffController')

router.post('/', staffController.createStaff);
router.get('/', staffController.getAll);
router.get('/:id', staffController.getOne);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;