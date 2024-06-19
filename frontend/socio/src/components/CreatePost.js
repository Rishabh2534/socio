import React, { useState } from 'react'
import Avatar from 'react-avatar'
import {CiImageOn} from "react-icons/ci"
import axios from "axios";
import toast from "react-hot-toast";
import {TWEET_API_END_POINT}from "../utils/constant";
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';
const CreatePost =()=>{

    const [description,setDescription]=useState("");
    const {user}= useSelector(store=>store.user);
    const {isActive}= useSelector(store=> store.tweet);
     const dispatch =useDispatch();
        const  submitHandler= async(req,res)=>{
                
                   try{
                    const res= await axios.post(`${TWEET_API_END_POINT}/create`,{description,id:user?._id},{
                        headers:{
                            "Content-Type":"application/json"
                        },
                        withCredentials:true,
                    });
                    dispatch(getRefresh());
                    if(res.data.success){
                        toast.success(res.data.message);
                    }
                   }catch(error){
                    toast.error(res.data.message);
                    console.log(error);
                   }
                   setDescription("");
        }
        const postHandler=()=>{
               dispatch(getIsActive(true));
        }
        const followingHandler=()=>{
            dispatch(getIsActive(false));

        }
       
    
    return (
        <div >
            <div className='m-2'>
             <div className='flex item-center justify-between border-b border-gray-300'>
                <div onClick={postHandler}className={`${isActive? "border-b-4 border-green-600":"null"}cursor-pointer hover:bg-gray-200 w-full`}>
                    <h1 className='font-bold text-gray-700 text-lg'>Posts</h1>
                </div>
                <div onClick={followingHandler} className={`${!isActive?"border-b-4 border-green-600":"null"}cursor-pointer  hover:bg-gray-200 w-full`}>
                    <h1 className='font-bold text-gray-700 text-lg '>Following</h1>
                </div>
             </div>
             <div className='m-4'>
                <div className='flex items-center'>
                    <div>
                        <Avatar src="https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg" size="100" round={true} />
                    </div>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full outline-none border-none text-lg ml-2' type="text" placeholder="write post"></input>
                   
                </div>
                <div className='flex item-center justify-between m-4 border-b border-gray-300'>
                    <div className='m-2 '>
                       <CiImageOn size="30px"/>
                    </div>
                    <button onClick={submitHandler} className='bg-[#1D9BF0] px-3 py-2 text-lg  border-none rounded-full'>Post</button>
               </div>
             </div>
          </div>
        </div>
    )
}
export default CreatePost