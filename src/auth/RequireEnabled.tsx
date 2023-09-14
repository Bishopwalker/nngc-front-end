import * as React from "react";
import {store} from "../redux/store";
import {useAppSelector} from "../redux/hooks";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireEnabled = () => {
    let state = store.getState();
    const userInfo = state?useAppSelector(state => state.userInfo):null
    let location = useLocation();
    console.log('userInfo',userInfo)
    if(userInfo?.enabled == null){
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
}
export default RequireEnabled