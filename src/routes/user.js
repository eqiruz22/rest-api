const router = require('express').Router()
const { User } = require('../controllers')

router.get('/show', User.show)
router.get('/show/:id', User.showById)
router.post('/insert', User.createUser)
router.patch('/update/password', User.updatePassword)
router.patch('/update/:id', User.update)
router.delete('/delete/:id', User.deleteById)

module.exports = router