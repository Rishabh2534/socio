import React, { useEffect } from 'react'

import LeftSidebar from "./leftSidebar"
import RightSidebar from "./rightSidebar"
import Feed from "./feed"
import {Outlet, useNavigate} from "react-router-dom"
import useOtherUser from "../hooks/useOtherUser"    
import { useSelector } from 'react-redux'
import useGetMyTweets from '../hooks/useGetMyTweets'
const Home = ()=>{
      
        //custom hook
        const {user,otherUsers} = useSelector(store=>store.user);
        const navigate = useNavigate();
        useEffect(()=>{
            if(!user){
                navigate("/login");
                console.log("rrrrr");
            }
        },[]);
       
        useOtherUser(user?._id);
        useGetMyTweets(user?._id);

    return (
        <div className='flex justify-between w-[80%] mx-auto'>
            <LeftSidebar/>
            <Outlet/>
            <RightSidebar otherUsers={otherUsers}/>
        </div>
    )
}
export default Home;