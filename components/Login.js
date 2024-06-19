import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate()

  const dispatch=useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(getUser(res?.data?.user));
        if(res.data.success){
         navigate("/")
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, {
          name,
          username,
          email,
          password,
        },{
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if(res.data.success){
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        //toast.success(error.response.data.message);
        console.log(error);
      }
    }
  };
  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="W-screen h-screen flex items-center justify-center ">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="ml-5"
            width={"600px"}
            src="https://th.bing.com/th/id/OIP.SOjJyYjKU6wYNL4-hiOHLgHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="socio"
          ></img>
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-5xl">Mother Earth</h1>
          </div>
          <h1 className=" text-green-700 font-bold text-4xl my-5 mx-2">
            {isLogin ? "Login now" : "Signup now"}
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col w-[70%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="outline-green-500 border border-gray-800 px-2 py-2 rounded-full my-1"
                ></input>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="UserName"
                  className="outline-green-500 border border-gray-800 px-2 py-2 rounded-full my-1"
                ></input>
              </>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="outline-green-500 border border-gray-800 px-2 py-2 rounded-full my-1"
            ></input>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="outline-green-500 border border-gray-800 px-2 py-2 rounded-full my-1"
            ></input>
            <div>
              <button className="bg-[#1D98F0] border-none py-2 rounded-full w-[100%] hover:bg-green-200">
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>
            <h1 className="hover:cursor-pointer  text-green-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span onClick={loginSignupHandler}>
                {isLogin ? " Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
