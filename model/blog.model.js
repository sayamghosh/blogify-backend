const {Schema, model, default: mongoose}= require('mongoose')
const User = require('./user.model')

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    coverImageUrl:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps:true})

const Blog = model('Blog',blogSchema)

module.exports= Blog