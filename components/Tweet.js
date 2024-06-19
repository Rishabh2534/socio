import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineDeleteOutline} from  "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { timeSince } from "../utils/constant";

const Tweet = ({tweet}) => {
    console.log(tweet._id);

    const user = useSelector(store=>store.user)
    console.log(user.user._id);
    const dispatch = useDispatch();
    const likeOrDislikeHandler =async(id)=>{
      try {
        const res= await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user},{
          withCredentials:true,

        });
        dispatch(getRefresh());
          
          toast.success(res.data.message);   
          toast.error.response.message
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
   const deleteTweetHandler =async(id) =>{
      try {
        axios.defaults.withCredentials= true;
         const res= await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
         console.log(res);
         dispatch(getRefresh());
         toast.success(res.data.message);
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
   }
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex items-center p-4">
          <Avatar
            src="https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg"
            size="50px"
          ></Avatar>
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="front-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-grey-500 text-sm ml-1">{`${tweet?.userDetails[0]?.username} . ${timeSince(tweet?.createdAt)}`}  </p>
            </div>
            <div>
              <p>{tweet?.description} </p>
            </div>
            <div className="flex justify-between ">
              <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                <div  onClick={()=>likeOrDislikeHandler(tweet?._id)}className="flex m-2 ">
                  <CiHeart size="24px" />
                  <p>{tweet?.like.length}</p>
                </div>
              </div>
              <div className="p-2 hover:bg-green-300 rounded-full cursor-pointer">
                <div className="flex m-2 ">
                  <FaRegComment size="24px" />
                  <p>0</p>
                </div>
              </div>
              <div className="p-2 hover:bg-blue-200 rounded-full cursor-pointer">
                <div className="flex m-2 ">
                  <CiBookmark size="24px" />
                  <p>0</p>
                </div>
              </div>
              {
              user?.user?._id === tweet?.userId &&(
                <div  onClick ={()=>deleteTweetHandler(tweet?._id)}className="p-2 hover:bg-blue-200 rounded-full cursor-pointer">
                <div className="flex m-2 ">
                  <MdOutlineDeleteOutline size="24px" />
                 
                </div>
              </div>
              )
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tweet;
