import userModel from "../models/userModel.js";

export const getUserData = async(req, res) => {
    const {userId} = req.body;
    const user = await userModel.findById(userId);
    if(!user){
        return res.json({sucess: false, message: "User Not Found"});
    }
    return res.json({
        sucess: true,
        user: {
            name: user.name,
            email: user.email,
            isAccountVerified: user.isAccountVerified
        }
    });
}