const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController')

router.post('/', productController.createProduct);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.editProduct);

module.exports = router
