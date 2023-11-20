const Router = require('express')
const router = new Router()
const todoController = require('../controllers/todoController')

router.post('/', todoController.create)
router.get('/', todoController.getListTasks)
router.get('/:id', todoController.getTask)
router.put('/:id', todoController.updateTask)
router.delete('/:id', todoController.deleteTask)

module.exports = router