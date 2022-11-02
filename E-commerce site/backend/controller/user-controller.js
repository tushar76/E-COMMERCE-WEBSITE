import user from "../models/user-schema.js";
import jsonwebtoken from 'jsonwebtoken';
import passport from "passport";

const jwt = jsonwebtoken;

export const getUsers = (req,res) =>{
    res.send('Hello World!!');
}

//Registering
export const addUser = async (req,res) =>{
    try {
    const {email,username,password} = req.body;
    const newUser = new user({email,username});
    const User = await user.register(newUser, password);
    const token = jwt.sign({
        id: User._id,
        username: newUser.username
    }, 'JWT_SECRET');
    res.json({ auth: true, message: 'Account Created Successfully',token: token});
        // await newUser.save();
    } catch (error) {
    res.json({ auth: false, error});
    }
}

// Authentication & login
export  const isAuthenticate = (req,res,next) => {
    console.log('0')
    next();
    // passport.authenticate('local',{failureMessage: true })
}

export const logIn = async (req,res) =>{
    const currentUser = 
    {
        id:req.user._id,
        email: req.user.email,
        username: req.user.username
    }
    const token = jwt.sign({
        id: req.user._id,
        username: req.user.username
    }, 'JWT_SECRET');
    res.json({ auth: true ,message: 'Successfully Logged In' , token: token});
}

// validate IsloggedIn

export const isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        return res.json({auth: false, message: 'You need to login first'});
    }
    next();
}

// LogOut
export const logOut = (req,res)=>{
    req.logOut();
    res.json({auth: false, message: 'Succesfully Logged Out'});
}



// import bcrypt from "bcrypt";

// const hashingFx = async (pw)=>{
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw,12);
//     console.log(hash);
// }


// hashingFx('monkey');
// verifyPasswrd('monkey','$2b$12$Wizl02cgIcsl1A2mE0XBdOXOpWyhtOGNV9pkP4pEeysdOom6CvmGu');



// export const verifyUser = async(req,res) => {
//     const {email, uname , password } = req.body;
//     const result = await bcrypt.compare(password,'$2b$12$Wizl02cgIcsl1A2mE0XBdOXOpWyhtOGNV9pkP4pEeysdOom6CvmGu');
//     if(result){
//         res.send(JSON.stringify({
//             message: 'Logged in Successful!!'
//         }));
//     }else{
//         res.send({
//             message: 'Wrong password'
//         });
//     }

// }