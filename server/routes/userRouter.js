const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')



router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.get('/auth')

module.exports = router;
