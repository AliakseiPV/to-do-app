const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middlware/authMiddleware')

router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)

module.exports = router;
