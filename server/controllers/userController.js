const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User } = require('../models/models')
const { generateJwt } = require('../helpers/jwtHelpers')


class UserController {

	async signUp(req, res, next) {
		try {
			const { email, password } = req.body
			if (!email || !password) {
				return next(ApiError.unprocessable('Email or password input was left blank'))
			}

			const candidate = await User.findOne({ where: { email } })
			if (candidate) {
				return next(ApiError.forbidden('User with this email alredy exists'))
			}

			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({ email, password: hashPassword })
			const token = generateJwt(user.id, user.email)

			res.status(201).json({ token })
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ where: { email } })
			if (!user) {
				return next(ApiError.notFound('User with this email does not exist'))
			}
			let comparePassword = bcrypt.compareSync(password, user.password)

			if (!comparePassword) {
				return next(ApiError.unauthorized('Password is incorrect'))
			}
			const token = generateJwt(user.id, user.email)
			res.status(200).json({ token })
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async check(req, res, next) {
		try {
			const token = generateJwt(req.user.id, req.user.email)
			res.status(200).json({ token })
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
}

module.exports = new UserController