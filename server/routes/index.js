const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const todoListRouter = require('./todoListRouter')

router.use('/user', userRouter)
router.use('/todo', todoRouter)
router.use('/list', todoListRouter)


module.exports = router