const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter');
const statusesRouter = require('./statusesRouter');
const shipmentsRouter = require('./shipmentsRouter');
const staffRouter = require('./staffRouter')

router.use('/product', productRouter);
router.use('/statuses', statusesRouter);
router.use('/shipments', shipmentsRouter);
router.use('/staff', staffRouter);


module.exports = router
