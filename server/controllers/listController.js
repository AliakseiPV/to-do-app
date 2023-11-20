const getTokenInfo = require('../helpers/getTokenInfo')
const { TodoList, User, Todo } = require('../models/models')
const jwt = require('jsonwebtoken')


class TodoListController {
	async create(req, res, next) {
		try {
			const { name } = req.body
			if (!name) {
				throw new Error('No name in list')
			}

			const token = req.headers.authorization.split(' ')[1]
			const user = await getTokenInfo(token, User)

			const list = await TodoList.findOne({ where: { name, userId: user.id } })

			if (list) {
				throw new Error('This name alredy exist')
			}

			const createdList = await TodoList.create({
				name,
				userId: user.id
			})
			return res.json(createdList)
		} catch (error) {
			next(error)
		}
	}

	async getAll(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			const user = await getTokenInfo(token, User)
			const list = await TodoList.findAll({ where: { userId: user.id } })
			res.json(list)
		} catch (error) {
			next(error)
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
				throw new Error('The name is empty')
			}
			if (checkName) {
				throw new Error('This name already exists')
			}
			if (list) {
				await list.update({ name: name })
			}

			res.json(list)
		} catch (error) {
			next(error)
		}
	}

	async deleteList(req, res, next) {
		try {
			const { id } = req.params
			const token = req.headers.authorization.split(' ')[1]
			const user = await getTokenInfo(token, User)

			await Todo.destroy({ where: { todoListId: id } })
			await TodoList.destroy({ where: { id, userId: user.id } })
			res.json('Successfully delete')
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new TodoListController