import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
const RightSidebar = ({otherUsers}) => {
 // console.log(otherUsers);
  return (
    <div className="w-[25%]">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
        <CiSearch />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none px-2"
        ></input>
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-1" >
        <h1>Who's Doing Best</h1>
        {
         
            otherUsers?.map((user)=>{
              return(
               <div key={user?._id}className="flex justify-between bg-green-100 rounded-2xl mx-1">
               <div className="flex">
                 <div>
                   <Avatar
                     src="https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg"
                     size="50"
                     round={true}
                   />
                 </div>
                 <div className="ml-2">
                   <h1 className="font-bold">{user?.name}</h1>
                   <p className="text-sm">{`@${user?.username}`}</p>
                 </div>
                 <div >
                   <Link to ={`/profile/${user?._id}`}>
                   <button className="px-4 py-1 bg-black text-white rounded-full hover:bg-slate-500 my-2">
                     Profile
                   </button>
                   </Link>
                   
                 </div>
               </div>
             </div>);
            })
          
          
        }

     
      </div>
    </div>
  );
};
export default RightSidebar;
