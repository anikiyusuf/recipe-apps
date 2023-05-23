const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer"); 
const RecipeModel = require('../models/Recipe')
const UserModel = require("../models/Users")
const verifyToken = require("../middleware/userMiddleware")

const storage = multer.diskStorage({
    destination: function( req, file, cb) {
        cb(null , './uploads/')
    }, 
    filename: function ( req, file, cb ) {
        // resize the image to 200x200 pixels
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const splits = file.originalname.split('.')
        const ext = splits[splits.length - 1]
        const name = splits.slice(0, -1).join('.')
        req.body.image = name.replace(' ', '-') + '-' + uniqueSuffix + '.' + ext
        cb(null, req.body.image)
    }
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true)
        } else {
            cb(new Error('Only .jpeg, .jpg and .png format allowed!'))
        }
    }
})

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
    const host = req.protocol + '://' + req.get('host')
    try {
        const recipe = new RecipeModel({
            ...req.body,
            image: host + '/uploads/' + req.body.image,
        })

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
        res.status(201).json({ savedRecipes });
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = recipeRouter
