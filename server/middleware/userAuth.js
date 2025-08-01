import jwt from 'jsonwebtoken';

const userAuth = (req,res,next) => {
    const {token} = req.cookies;
    if (!req.body) req.body = {};
    if(!token){
        return res.json({sucess: false, message: "not Athorized.Login Again"});
    }
        try{
          const  tokenDecode= jwt.verify(token, process.env.JWT_SECRET);

          if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
          }else{
            return res.json({sucess: false, message: "not Athorized.Login Again"});
          }
          next();
        }catch(error){
            return res.json({sucess: false, message: error.message});
        }

}

export default userAuth;