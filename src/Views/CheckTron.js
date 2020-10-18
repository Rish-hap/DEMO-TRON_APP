import React, {useState, useEffect} from "react"
import { Redirect } from "react-router-dom"
import { global_loading_set, global_loading_clr } from "../actions/global"
import { connect } from 'react-redux'
import  GlobalLoading from "../Components/GlobalLoading"

const CheckTron = (props) => {
    const [is_tron, set_is_tron] = useState("Some Value")
    const check_tron = () => {
        props.global_loading_set()
          return new Promise((resolve,reject)=> {
            let attempts = 0 , max_attempts = 50
            const is_tron_available = () => {
                if(window.tronWeb){
                  resolve(true)
                  return; 
                }
                attempts++
                  if(attempts>=max_attempts){
                    resolve(false)
                    return;
                  }
                  setTimeout(is_tron_available, 100)
            }
            is_tron_available()
          })
     }

    useEffect( ()=>{
      // Execute RunScipt
    //   props.runScript();
       const async_check = async () => {
         const tron_flag = await check_tron()
     console.log(tron_flag,"tron_flag")
         if(!!tron_flag){
           console.log("Yes Tron Web is Available")
           set_is_tron(true)
           localStorage.setItem('is_tron', true)
           props.global_loading_clr()
         }else{
           console.log("Sorry, Tron Web is not Available")
           props.global_loading_clr()
           localStorage.setItem('is_tron', false)
           set_is_tron(false)
         }
     
         return null
       }
       async_check()
     
       console.log("after async_check")
      
      },[])

      console.log(props.global_store.global_loading,"global_loading")


      if(!!props.global_store.global_loading){
        return (
          <GlobalLoading />
        )
      }

      if(is_tron===true){
          return <Redirect to="/tron-route" />
      }else if(is_tron===false){
        return <Redirect to="/no-tron-route" />
      }


    return (
        <React.Fragment>
            <h1>Check Tron View</h1>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    global_store:state.global_store
  })
export default connect(mapStateToProps, {
    global_loading_set,
    global_loading_clr
  })(CheckTron)