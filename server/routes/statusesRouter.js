const Router = require('express');
const router = new Router();
const statusController = require('../controllers/statusesController')

router.post('/', statusController.createProduct);
router.get('/', statusController.getAll);
router.get('/:id', statusController.getOne);
router.delete('/:id', statusController.deleteStatus);

module.exports = router;