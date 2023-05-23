const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer"); 
const RecipeModel = require('../models/Recipe')
const UserModel = require("../models/Users")
const verifyToken = require("../middleware/userMiddleware")

const storage = multer.diskStorage({
    destination:function( req, file, cb){
        console.log('file' , file)
        cb(null , './uploads/')
    }, 
    filename: function ( req, file, cb ){
        const filename = file.filename + '-' +  file.originalname.split('.').pop()
        cb(null , filename)
    }
});

const upload = multer({ dest: './uploads/', storage })

const recipeRouter = express.Router()

recipeRouter.get("/", async(req , res) => {
    try {
        const result = await RecipeModel.find({})
        res.status(200).json(result)
    } catch(err){
        res.status(500).json(err);
    }
 })

 recipeRouter.post("/", verifyToken, upload.single('image'), async (req,res) => {
    const file = req.file?.image
    console.log(file)
    console.log(req.body.image)
    const recipe = new RecipeModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.headers.host + '/uploads/' + file,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cookingTime: req.body.cookingTime,
        userOwner: req.body.userOwner, 
    })

    try{
        const result = await recipe.save()
        res.status(201).json({
            createdRecipe: {
                name: result.name,
                image: result.image,
                ingredients: result.ingredients,
                instructions : result.instructions,
                _id: result._id,
            }
        })
    }catch(err){
        res.status(500).json(err)
    }
 })

 recipeRouter.get("/:recipeId", async (req, res) => {
    try {
        const result = await RecipeModel.findById(req.params.recipeId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

recipeRouter.put("/" , async (req,res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID)
    const user = await   UserModel.findById(req.body.userID)
    try {
        user.savedRecipes.push(recipe)
        await user.save();
        res.status(200).json({ savedRecipes : user.savedRecipes })
    } catch(err){
        res.status(500).json(err);
    }
})


// Get  id of Saved Recipes 
recipeRouter.get("/savedRecipes/ids/:userId" , async (req,res) => {
    try {
        const user = await   UserModel.findById(req.params.userId)
        res.status(201).json({ savedRecipes :user?.savedRecipes })
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


recipeRouter.get("/savedRecipes/:userId" , async (req,res) => {
    try {
        const user =  await   UserModel.findById(req.params.userId)
        const savedRecipes = await   RecipeModel.find({
            _id: { $in: user.savedRecipes},
        })
        console.log(savedRecipes);
        res.status(201).json({ savedRecipes });
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = recipeRouter
