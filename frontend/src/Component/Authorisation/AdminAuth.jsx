import { useLocation,Navigate,Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const AdminAuth=({allows})=> {
    const authstate=useSelector((state)=>state.user)
    const location=useLocation()

  return (
    authstate?.role=='ADMIN'
    ?<Outlet state={{from:location}}/>
    :<Navigate to={'/login'} state={{from:location.pathname}} replace/>
    
  )
}

export default AdminAuth;
