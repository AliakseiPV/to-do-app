const bcrypt = require('bcrypt')
const { User } = require('../models/models')
const { generateJwt } = require('../helpers/jwtHelpers')


class UserController {

	async signUp(req, res, next) {
		try {
			const { email, password } = req.body
			if (!email || !password) {
				throw new Error('Email or password missing')
			}

			const candidate = await User.findOne({ where: { email } })
			if (candidate) {
				throw new Error('User with this email alredy exists')
			}

			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({ email, password: hashPassword })
			const token = generateJwt(user.id, user.email)

			return res.json({ token })

		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ where: { email } })
			if (!user) {
				throw new Error('User is not fount')
			}
			let comparePassword = bcrypt.compareSync(password, user.password)
			
			if (!comparePassword) {
				throw new Error('Password is wrong')
			}
			const token = generateJwt(user.id, user.email)
			return res.json({token})
		} catch (error) {
			next(error)
		}
	}

	async check(req, res, next) {
		try {
			const token = generateJwt(req.user.id, req.user.email)
			return res.json({token})
		} catch (error) {
			next(error)
		}
	}
}


module.exports = new UserController