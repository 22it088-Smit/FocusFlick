import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import userModel from '../models/userModel.js';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE  } from '../config/emailTemplates.js';

export const  register = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({sucess: false, message: "All fields are required"});
    }

    try{
        const existinguser = await userModel.findOne({email});
        if(existinguser){
            return res.json({sucess:false, message: "User already exists with this email"});
        }

        const hasgedpassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({name, email, password:hasgedpassword});
        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, { expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        })

        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to our Service",
            text: `Hello ${name},\n\nThank you for registering with us. Your account has been created successfully with Email id: ${email}`
        
    }
      await transporter.sendMail(mailoptions);

    return res.json({sucess: true});
  }catch(error){
        res.json({sucess: false, message: error.message});
    }
}    


export const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({sucess: false, message: "Email and Password are required"});
    }
    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({sucess: false, message: "Invalid Email"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({sucess: false, message: "Invalid Password"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        })

        return res.json({sucess: true});

    }catch(error){
        return res.json({sucess: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({sucess: true, message: "Logged Out"});

    }catch(error) {
        return res.json({sucess: false, message: error.message});
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        // if (!userId) {
        //     return res.json({ sucess: false, message: "userId is required in body" });
        // }
        
        // if (!user) {
        //     return res.json({ sucess: false, message: "User not found" });
        // }
        if (user.isAccountVerified) {
            return res.json({ sucess: false, message: "Account already verified" });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();
        const mailoption = { 
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            // text: `Your Verification OTP is ${otp}. \n\nVerify your account using this otp.`
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };
        await transporter.sendMail(mailoption);
        return res.json({ sucess: true, message: "OTP sent to your email" });
    } catch (error) {
        return res.json({ sucess: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp) {
        return res.json({sucess: false, message: "Missing Details"});
    }
    try{
        const user = await userModel.findById(userId);
        if(!user) {
            return res.json({sucess: false, message: "user not found"});
        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({sucess: false, message: "Invalid OTP"});
        }
        if(user.verifyOtpExpireAt < Date.now()) {
            return res.json({sucess: false, message: "OTP expired"});
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({sucess: true, message: "Account verified sucessfully"});
    }catch(error) {
        return res.json({sucess: false, message: error.message});
    }
}
//check if user is authenticated
export const isAuthenticated = async (req, res)=>{
    try{
        return res.json({sucess: true});
    }catch(error){
        return res.json({sucess: false, message: error.message});
    }
}
//send password reset otp
export const sendResetOtp = async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.json({success: false, message: 'Email is Required'})    
    }
    try{
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: 'User Not Found'});
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();
        const mailoption = { 
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            // text: `Your OTP For Resetting the Password is ${otp}. \nuSE This OTP to Reset Your Password.`
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };
        await transporter.sendMail(mailoption);
        return res.json({ sucess: true, message: "OTP sent to your email" });
    }catch(error){
        return res.json({success: false, message: error.message});
    }
}

//reset User Paaword
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword) {
        return res.json({success: false, message: 'All fields are required'});
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'user not found'});
        }
        if(user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'});
        }
        if(user.resetOtpExpireAt < Date.now()) {
            return res.json({success: false, message: 'OTP expired'});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();
        return res.json({success: true, message: 'Password reset successfully'});
            
    }catch(error) {
        return res.json({success: false, message: error.message});
    }
}