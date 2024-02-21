require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const router = require('./routes/index')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const errorHandler = require('./middlware/ErrorHandlingMiddleware')


const app = express()

app.use(function (req, res, next) {
	res.setHeader(
		'Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'"
	)
	next()
})
app.use(cors({
	origin: 'https://to-do-app-client.onrender.com',
	methods: ['GET', 'POST', 'DELETE', 'PUT'],
}))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)


app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
	} catch (error) {

	}
}

start()