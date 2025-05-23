const User = require('../model/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function handleUserSignup(req,res){
    const {fullName,email,password} = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);
    try {
        const foundUser = await User.findOne({email:email})
        if(foundUser){
            return res.status(400).json({error:"User already exists"})
        }
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
                id:user._id,
                fullName:user.fullName,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET , { expiresIn: '1d' });
            return res.json({message:"Login successfull",token:token,success:true}) 
        }
        return res.status(400).json({error:"Wrong password"})
    } catch (error) {
        return res.json(error)
    }
}

async function handleUserDashboard(req,res){
    const user = await User.findOne({_id:req.id}).select("-password")

    return res.json({message:"Welcome to dashboard",user})
}

module.exports={
    handleUserSignup,
    handleUserLogin,
    handleUserDashboard
}