import { useSelector } from "react-redux"
import { useLocation,Navigate,Outlet } from "react-router-dom"

const BackAuth = () => {
    const authstate=useSelector((state)=>state.user)
    const location=useLocation();
  return (
    authstate?.access_token != null && authstate.role==='USER'
    ?<Navigate to={'/'} state={{from:location.pathname}} replace/>
    :<Outlet state={{from:location}}/>
  )
}

export default BackAuth
