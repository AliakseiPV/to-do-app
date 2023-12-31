require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const router = require('./routes/index')
const PORT = process.env.PORT || 5000 
const bodyParser = require('body-parser')


const app = express()

app.use(cors({
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'DELETE', 'PUT']
}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', router)


const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
	} catch (error) {
		
	}
}

start()