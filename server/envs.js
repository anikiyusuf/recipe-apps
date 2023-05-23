require('dotenv').config()

const envs = {
	PORT: process.env.PORT || 5000,
	MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/recipe-app',
	JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key',
}

module.exports = envs
