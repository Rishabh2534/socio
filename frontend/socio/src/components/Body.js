import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from './Login'
import Home from "./home";
import Profile from "./profile"
import Feed from './feed';
const Body=()=>{
    const appRouter=createBrowserRouter([
        {
            path:"/",
            element:<Home/>,
            children:[{
                path:"/",
                element:<Feed/>
            },
            {
                path:"/profile/:id",
                element:<Profile/>
            }
        ]
        },
        {
            path:"/login",
            element:<Login/>
        }
    ])
    return(
     <div>
       <RouterProvider router={appRouter}/> 
     </div>
    )
}
export default Body