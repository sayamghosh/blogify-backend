const User = require('../model/user.model');
const bcryptjs = require('bcryptjs');


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

module.exports={
    handleUserSignup
}