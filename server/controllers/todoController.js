const ApiError = require('../error/ApiError')
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
				return next(ApiError.unprocessable('Name input was left blank'))
			}

			const todo = await Todo.create({
				task,
				isComplete: false,
				todoListId: listId,
				userId: user.id
			})

			res.status(201).json(todo)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async getListTasks(req, res, next) {
		try {
			const { id } = req.params
			const todo = await Todo.findAll({ where: { todoListId: id } })
			res.status(200).json(todo)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async getTask(req, res, next) {
		try {
			const { id } = req.params
			const task = await Todo.findOne({ where: { id } })

			res.status(200).json(task)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async updateTask(req, res, next) {
		try {
			const { isComplete } = req.body
			const { id } = req.params
			const findTask = await Todo.findOne({ where: { id } })
			const updateTask = await findTask.update({ isComplete: isComplete })

			res.status(200).json(updateTask)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async deleteTask(req, res, next) {
		try {
			const { id } = req.params
			const findTask = await Todo.findOne({ where: { id } })

			findTask.destroy()
			res.status(200).json(findTask)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
}

module.exports = new TodoController