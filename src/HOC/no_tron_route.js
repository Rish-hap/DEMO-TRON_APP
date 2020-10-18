import React , { Component } from 'react'
import { Redirect } from "react-router-dom"

const no_auth_route = ({authObject, ...rest}) => (getComponent) => {
    if(!!(authObject().is_tron)){
        return  <Redirect to="/tron-route" />
      }else{
        return  getComponent()
      }
}

export default no_auth_route
