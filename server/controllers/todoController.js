const getTokenInfo = require('../helpers/getTokenInfo')
const { Todo, User } = require('../models/models')
const jwt = require('jsonwebtoken')


class TodoController {
	async create(req, res, next) {
		try {
			const { listId, task } = req.body
			const token = req.headers.authorization.split(' ')[1]
			const user = await getTokenInfo(token, User)

			if (!task) {
				throw new Error('Task is empty')
			}

			const todo = await Todo.create({
				task,
				isComplete: false,
				todoListId: listId,
				userId: user.id
			})

			return res.json(todo)
		} catch (error) {
			next(error)
		}
	}

	async getListTasks(req, res, next) {
		try {
			const { id } = req.params
			const todo = await Todo.findAll({ where: { todoListId: id } })
			res.json(todo)
		} catch (error) {
			next(error)
		}
	}

	async getTask(req, res, next) {
		try {
			const { id } = req.params
			const task = await Todo.findOne({ where: { id } })
			if (!task) {
				throw new Error('Task does not exist')
			}

			res.json(task)
		} catch (error) {
			next(error)
		}
	}

	async updateTask(req, res, next) {
		try {
			const { isComplete } = req.body
			const { id } = req.params

			const findTask = await Todo.findOne({ where: { id } })

			if (!findTask) {
				throw new Error('Task does not exist')
			}
	
			const updateTask = await findTask.update({ isComplete: isComplete })
			res.json(updateTask)

		} catch (error) {
			next(error)
		}
	}

	async deleteTask(req, res, next) {
		try {
			const { id } = req.params
			const findTask = await Todo.findOne({ where: { id } })
			if (!findTask) {
				throw new Error('Task does not exist')
			}

			findTask.destroy()
			res.json(findTask)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new TodoController