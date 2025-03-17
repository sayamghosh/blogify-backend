const User = require('../model/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function handleUserSignup(req,res){
    const {fullName,email,password} = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);
    try {
        const newUser=await User.create({
            fullName,
            email,
            password:hashedPassword,
        })
        return res.status(200).json({message:"User created successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}

async function handleUserLogin(req,res){
    const {email, password}=req.body;
    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({error:"Please register"})
        }
        const isMatch = await bcryptjs.compare(password,user.password);
        if(isMatch){
            const payload = {
                email:user.email,
                id:user._id
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET , { expiresIn: '1h' });
            res.cookie('token',token,{httpOnly:true});
            return res.json({message:"Login successfull"}) 
        }
        return res.status(400).json({error:"Wrong password"})
    } catch (error) {
        return res.json(error)
    }
}

module.exports={
    handleUserSignup,
    handleUserLogin,
}