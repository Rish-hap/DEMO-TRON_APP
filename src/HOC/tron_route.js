import React from 'react'
import { Redirect } from "react-router-dom"

 const protected_route = ({authObject, ...rest}) => (getComponent) => {
                if(!!(authObject().is_tron)){
                    return  getComponent()
                  }else{
                    console.log("Protected route")
                    let { logout } = {...rest}
                    logout()
                    return  <Redirect to="/no-tron-route" />
                  }
}

export default protected_route
