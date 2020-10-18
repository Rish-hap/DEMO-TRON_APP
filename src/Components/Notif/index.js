import React, { useEffect } from "react"
import {  notification } from 'antd';
import './index.scss'

const Notif = (props) => {
    useEffect(()=>{
        if(props.global_error_ret){
            if(props.global_error_ret.success){
                openNotificationWithIcon('success',props.global_error_ret.heading,props.global_error_ret.message)
            }else {
                openNotificationWithIcon('warning',props.global_error_ret.heading,props.global_error_ret.message)
            }
            props.global_error_clr()
        }
    },[props.global_error_ret])

    const openNotificationWithIcon =( type, heading, message) => {
        notification[type]({
          message: heading,
          description: message,
        });
      };
        return <React.Fragment>
        </React.Fragment>
}
export default Notif