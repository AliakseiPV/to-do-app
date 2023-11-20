const jwt = require('jsonwebtoken')

const getTokenInfo = async (token, model) => {
	const decoded = jwt.verify(token, process.env.SECRET_KEY)
	const userId = decoded.id
	return await model.findOne({ where:  userId  })
}


module.exports = getTokenInfo