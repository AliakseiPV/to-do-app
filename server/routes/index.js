const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')

router.use('/user', userRouter)
router.use('/todo', todoRouter)


module.exports = router