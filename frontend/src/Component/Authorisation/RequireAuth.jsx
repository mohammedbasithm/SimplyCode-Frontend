import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ReqAuth = () => {
    const authstate = useSelector((state)=> state.user)
    const location = useLocation();
  return (
    authstate?.accessToken != null
        ? <Outlet state={{from: location}} />
        : <Navigate to="/login" state={{ from: location.pathname }} replace />
    
)
}

export default ReqAuth