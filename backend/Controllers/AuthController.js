const UserModel = require("../Models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const signup = async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user = await UserModel.findOne({email});//user already exist dont signup again direct login
        if(user){
            return res.status(409)
            .json({message:'user is already exist,you can login',success:false});
        }
        const userModel =new UserModel({name,email,password});
        userModel.password=await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
        .json({message:'Signup successfully',
            success:true
        })
    }catch(err){
        //   res.status(500)
        // .json({message:'internal server error',
        //     success:false
        // })
    }

}
const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await UserModel.findOne({email});//user already exist dont signup again direct login
        const errMsg ='Auth faild email or password is wrong';
        if(!user){//user is already sign in if it is not then that case we will get 403 error
            return res.status(403)
            .json({message:errMsg,success:false});
        }
        // const userModel =new UserModel({name,email,password});
        // userModel.password=await bcrypt.hash(password,10);
        // await userModel.save();
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
             return res.status(403)
            .json({message:errMsg,success:false});
        }
        const jwtToken = jwt.sign(
            {email:user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        res.status(200)
        .json({message:'Login successfully',
            success:true,
            jwtToken,
            email,
            name:user.name
        })
    }catch(err){
        //   res.status(500)
        // .json({message:'internal server error',
        //     success:false
        // })
    }

}

module.exports={
    signup,
    login
}
