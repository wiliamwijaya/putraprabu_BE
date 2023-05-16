const router = require('express').Router()
const orders = require('../controllers/orderController')
const restrict = require('../middleware/restrict')

router.post('/', restrict, orders.create)
router.get('/history', restrict, orders.history)
router.get('/:id', restrict, orders.detail)
router.put('/:id', restrict, orders.update)
router.get('/', restrict, orders.get)

module.exports = router