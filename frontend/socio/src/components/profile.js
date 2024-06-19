import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const {id}=useParams();
  const dispatch= useDispatch();
    useGetProfile(id);
const followAndUnfollowHandler = async()=>{
  if(user.following.includes(id)){
    //unfollow
    try {
      axios.defaults.withCredentials=true;
        const res =await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,{id:user?._id});
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  else
  {
    //follow
    try {
      axios.defaults.withCredentials=true;
        const res =await axios.post(`${USER_API_END_POINT}/follow/${id}`,{id:user?._id});
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
}
  return (
    <div className="w-[60%] border-l border-r border-green-200">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoMdArrowBack size="24px" />
          </Link>
          <div>
            <h1 className="font-bold">{profile?.name}</h1>
            <p> 10 posts</p>
          </div>
        </div>
        <img
          className="w-[100%] h-20"
          src="https://th.bing.com/th/id/OIP.E3P2o2G7kPNSmuon1XWEKAHaEK?w=284&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="image"
        ></img>
        <div className="absolute top-28 border-4 border-green-300 rounded-full">
          <Avatar
            src="https://th.bing.com/th/id/OIP.EwG6x9w6RngqsKrPJYxULAHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            size="60"
            round={true}
          />
        </div>
        <div className="text-right">
          {
            profile?._id===user?._id? (<button className="px-4 m-1 rounded-full border-green-800 border-2  h-7 hover:bg-green-400">
            Edit Profile
             </button>)
             :( <button  onClick={followAndUnfollowHandler}className="px-4 m-1 rounded-full bg-black  h-7 text-white">
             {user.following.includes(id)? "following" :"follow"} 
             </button>)
          }
         
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl ">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div>
          <p>
            🌳“In love with every leaf and bloom; my world is green and full of
            life.” 🌿
          </p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
