
import {Tweet} from "../models/TweetSchema.js";
import{User} from "../models/userSchema.js"
export const createTweet =  async(req,res)=>{
    try{
        const {description,id} = req.body;
        if(!description||!id){
            return res.status(401).json({
                message:"Field are required",
                success:false
            
        })}
        const user =await User.findById(id).select("-password");
        await Tweet.create({
            description,
            userId:id,
            userDetails:user,
        });
        return res.status(201).json({
            message:"Tweet created successfully",
            success:true,
        })
    }catch(error){
        console.log(error);
    }
}

export const deleteTweet= async(req,res)=>{
    try{
        const {id}=req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tweet deleted successfully",
            success:true,
        })

    }catch(error){
        console.log(error);
    }
}
export const likeOrDislike =async(req,res)=>{
    try{
        console.log("ram");
        console.log(req.body);
        const loggedInUserId=req.body.id.user._id;
        console.log("liking user");
        console.log(loggedInUserId);
        const tweetId=req.params.id;
        console.log("liked user");
        console.log(tweetId);
        const tweet =await Tweet.findById(tweetId);
        console.log("tweet to be liked");
        console.log(tweet);
        if(tweet.like.includes(loggedInUserId)){
          //dislike
          const p=await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
          console.log(p);
          return res.status(200).json({
            message:"User disliked post",
            success:true
          });
        }
        else{//like

            await Tweet.findByIdAndUpdate(tweetId,{$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked post",
                success:true
              });
        }
        }catch(error){
        console.log(error);
    }
}
export const getAllTweets = async(req,res)=>{
    try{
        const id=req.params.id;
        const loggedInUser=await User.findById(id);
        const loggedInUserTweets =await Tweet.find({userId:id});
        const followingUserTweet =await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return  Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:loggedInUserTweets.concat(...followingUserTweet)
        })
    }catch(error){
        console.log(error);
    }

}
export const getFollowingTweets = async(req,res)=>{
    try{
        const id=req.params.id;
        const loggedInUser=await User.findById(id);
    
        const followingUserTweet =await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return  Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        })
    }catch(error){
        console.log(error);
    }

}

 