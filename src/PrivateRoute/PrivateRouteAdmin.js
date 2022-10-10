import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../Login/Login';
import { UseLocalState } from '../util/UseLocalStorage';
const PrivateRouteAdmin = ({children}) => {
    
    const[jwt,setjwt] =UseLocalState("","jwt");
    return jwt ? children: <Navigate to="/adminlogin"/>;
};

export default PrivateRouteAdmin;