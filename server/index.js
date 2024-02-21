require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const router = require('./routes/index')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const errorHandler = require('./middlware/ErrorHandlingMiddleware')


const app = express()

app.use(cors({
	origin: 'https://api.render.com/deploy/srv-cnafpnq1hbls73dk6q0g?key=obdZeQbRZc4',
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