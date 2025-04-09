require('dotenv').config()
const {v2} = require('cloudinary')

v2.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

module.exports = v2;