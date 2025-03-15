const {Schema,model}  = require('mongoose');

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type:String,
        required: true
    },
    profileImageURL:{
        type: String,
        default:"/images/avatar.png"
    },
    role:{
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
},{timestamps: true});

const User = model('User',userSchema);

module.exports = User;