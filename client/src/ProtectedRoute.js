import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({token=localStorage.getItem("token"), component: Component, ...rest}) {
    return (
      <Route {...rest} render={(props)=>{
          if (token) {
              return <Component />
          } else {
              return <Redirect to={{pathname:'/login'}}/>;
          }
      }} />
      )
}

export default ProtectedRoute
