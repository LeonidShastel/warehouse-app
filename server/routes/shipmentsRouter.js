const Router = require('express');
const router = new Router;
const shipmentsController = require('../controllers/shipmentsController');

router.post('/', shipmentsController.createShipment);
router.get('/', shipmentsController.getAll);
router.get('/:id', shipmentsController.getOne);
router.delete('/:id', shipmentsController.deleteShipment);
router.put('/:id', shipmentsController.editShipment);

module.exports = router;