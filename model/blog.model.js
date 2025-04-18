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
    },
    author:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
},{timestamps:true})

const Blog = model('Blog',blogSchema)

module.exports= Blog