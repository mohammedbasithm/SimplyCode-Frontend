import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import React from 'react'

const TeacherAuth = ({allows}) => {
    const authstate=useSelector((state)=>state.user)
    const loaction=useLocation();
  return (
    authstate?.role=="TEACHER"
    ?<Outlet state={{from:loaction}}/>
    :<Navigate to={'/login '} state={{from:loaction.pathname}} replace/>
  )
}

export default TeacherAuth;
