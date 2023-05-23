const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
	name:{
		type:String,
		require:true
	},
	ingredients: {
		type:String
		,require:true
	},
	instructions: {
		type: String,
		required: true,
	},
	image:{
		type:String,
		require:true
	},
	cookingTime:{
		type:Number,
		require:true
	},
	user :{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		require:true,
	},
	createdAt:{
		type:Date,
		default:Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
})

const RecipeModel = mongoose.model('Recipes' , RecipeSchema)

module.exports = RecipeModel
