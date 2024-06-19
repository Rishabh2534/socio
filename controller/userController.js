import {User} from "../models/userSchema.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = async(req,res)=>{
    try{
         const {name,username,email,password}=req.body;
         if(!name||!username||!email||!password){
            return res.status(401).json({
                message:"all fields are required",
                success:false
            });
        
         }
         //if user already exist
         const user=await User.findOne({email});
         if(user){return res.status(401).json({
            message:"user already exist.",
            success:false
         });}
         const hashedPassword= await bcryptjs.hash(password,16);
         await User.create({
            name,username,email,password:hashedPassword
         });

         return res.status(201).json({
            message:"Account created successsfully",
            success:true
         });
    }catch(error){
          console.log(error);
    }
}

export const Login= async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
           return res.status(401).json({
            message:"all fields are required",
            success:false
           });
        };
        const user =await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"no such user",
                success:false
            });
        }
        const isMatch =await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Incorrect email or password",
                success:false,
            });
        }
    const tokenData={
        userId:user._id
    }
        const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"});
        return res.status(201).cookie("token",token,{expiresIn:"1d",httpOnly:true}).json({
                message:`walcome back ${user.name}`,
                user,
                success:true
        })
    } catch(error){
         console.log(error);
    }
}

export const logout =(req,res)=>{
    return res.cookie("token","",{expirtIn:new Date(Date.now())}).json({
        message:"    user logged out",
        success:true
    });
}

export const bookmarks =async(req,res)=>{
    try{
        const loggedInUserId=req.body.id;
        const tweetId=req.params.id;
        const user =await User.findById(loggedInUserId);
        if(user.bookmarks.includes(tweetId)){
          //bookmark
          await User.findByIdAndUpdate(loggedInUserId,{$pull:{bookmarks:tweetId}});
          return res.status(200).json({
            message:"User un bookmarked post",
            success:true
          });
        }
        else{//like
            await User.findByIdAndUpdate(loggedInUserId,{$push:{bookmarks:tweetId}});
            return res.status(200).json({
              message:"User bookmarked post",
              success:true
            });
        }
        }catch(error){
        console.log(error);
    }
}
export const getMyProfile =async(req,res)=>{
    try{
      const id=req.params.id;
      const user= await User.findById(id).select("-password");
      return res.status(200).json({
        user,
      })
    }catch(error){
        console.log(error);
    }
}
export const getOtherUsers= async(req,res)=>{
    try{
        const {id}=req.params.id;
        const otherUsers =await User.find({_id:{$ne:id}}).select("-password");
        console.log(otherUsers);
        if(!otherUsers){ 
            return res.status(401).json({

                message:"no user is there",
                
            })
        }
        //console.log("send from controller");
       // 

            return res.status(200).json({
                otherUsers,
                

            })
        
    }catch(error){
        console.log(error);
    }
}
export const follow = async(req,res)=>{
    try{
       const loggedInUserId=req.body.id;
       const userId=req.params.id;
       const loggedInUser= await User.findById(loggedInUserId);
       const user= await User.findById(userId);
       if(!user.followers.includes(loggedInUserId)){
        await user.updateOne({$push:{followers:loggedInUserId}});
        await loggedInUser.updateOne({$push:{following:userId}});
       }
       else{
           return res.status(400).json({
            message:`user already followed to ${user.name}`
           })
       }
       return res.status(200).json({
        message:`${loggedInUser.name} just followed you`,
       })
    }catch(error){
        console.log(error);
    }
}
export const unfollow=async(req,res)=>{
    try{
       const loggedInUserId=req.body.id;
       const userId=req.params.id;
       const loggedInUser= await User.findById(loggedInUserId);
       const user= await User.findById(userId);
       if(user.followers.includes(loggedInUserId)){
        await user.updateOne({$pull:{followers:loggedInUserId}});
        await loggedInUser.updateOne({$pull:{following:userId}});
       }
       else{
           return res.status(400).json({
            message:`user has already unfollowed to ${user.name}`
           })
       }
       return res.status(200).json({
        message:`${loggedInUser.name} unfollowed you`,
       })
    }catch(error){
        console.log(error);
    }
}