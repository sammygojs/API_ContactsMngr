const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const User = require('../models/userModels')
const bcrypt = require("bcrypt")

const registerUser = asyncHandler(async(req,res)=>{
    const{username, email, password} = req.body;
    // console.log(username);
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
        
    }
    // console.log('all ok 1');
    const userAvailable = await User.findOne({email});
    // console.log('all ok 2');
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
        // console.log('all ok 2');
    }
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("hashedPassword", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`user created ${user}`)
    if(user){
        res.status(200).json({_id:user.id, email:user.email, })
    }else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({msg:"register the user"});
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        const accesstoken = jwt.sign(
        {
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m"},
        );
        res.status(200).json({accesstoken})
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    res.json({msg:"login user"});
})

const currentUser = asyncHandler(async(req,res)=>{
    // console.log("reached current user");
    // res.json({msg:"current user information"});
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}