import React from 'react'
import Style from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  if(localStorage.getItem('userToken') !== null){
    console.log('ok');
    return props.children
  }
  else{
    console.log('not ok');
    return <Navigate to={'/Login'}/>
  }
}
