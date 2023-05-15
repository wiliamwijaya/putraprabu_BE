const router = require('express').Router()
const user = require('../controllers/userController')
const restrict = require('../middleware/restrict')

router.get('/', user.getAll)
router.get('/one', user.getOne)
router.put('/update', restrict, user.update)
router.delete('/', user.delete)

module.exports = router
