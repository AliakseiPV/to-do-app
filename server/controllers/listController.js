const ApiError = require('../error/ApiError')
const getTokenInfo = require('../helpers/getTokenInfo')
const { TodoList, User, Todo } = require('../models/models')

class TodoListController {
	async create(req, res, next) {
		try {
			const { name } = req.body
			const token = req.headers.authorization.split(' ')[1]
			const user = await getTokenInfo(token, User)
			const list = await TodoList.findOne({ where: { name, userId: user.id } })

			if (!name) {
				return next(ApiError.unprocessable('Name input was left blank'))
			}
			if (list) {
				return next(ApiError.forbidden('The list name is alredy used'))
			}

			const createdList = await TodoList.create({
				name,
				userId: user.id
			})

			res.status(201).json(createdList)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async getAll(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const user = await getTokenInfo(token, User)
			const lists = await TodoList.findAll({ where: { userId: user.id } })
			res.status(200).json(lists)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params
			const token = req.headers.authorization.split(' ')[1]
			const user = await getTokenInfo(token, User)
			const list = await TodoList.findOne({ where: { id, userId: user.id } })
			res.status(200).json(list)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async updateList(req, res, next) {
		try {
			const { name } = req.body
			const { id } = req.params

			const token = req.headers.authorization.split(' ')[1]
			const user = await getTokenInfo(token, User)
			const list = await TodoList.findOne({ where: { id, userId: user.id } })
			const checkName = await TodoList.findOne({ where: { name, userId: user.id } })

			if (!name) {
				return next(ApiError.unprocessable('Name input was left blank'))
			}
			if (checkName) {
				return next(ApiError.forbidden('The list name is alredy used'))
			}
			if (list) {
				await list.update({ name: name })
			}

			res.status(200).json(list)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async deleteList(req, res, next) {
		try {
			const { id } = req.params
			const token = req.headers.authorization.split(' ')[1]
			const user = await getTokenInfo(token, User)

			await Todo.destroy({ where: { todoListId: id } })
			await TodoList.destroy({ where: { id, userId: user.id } })
			res.status(200).json('Successfully deleted')
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
}

module.exports = new TodoListController