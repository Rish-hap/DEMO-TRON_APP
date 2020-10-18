import React, { useState, useEffect, useRef } from "react"
import InputComponent from "../Components/InputComponent"
import Button from "../Components/Buttons"
import { Link, Redirect } from "react-router-dom"
import validator from "validator"
import { error_form_check, get_url_params, sleep, only_alphabets } from "../utils/common_utilities"
import { loadReCaptcha } from 'react-recaptcha-v3'
import AnimatedMount from "../HOC/AnimatedMount"



const LoginView = (props) => {
    const [data, set_data] = useState({
        password:'',
        email:''
     })
     let recaptcha = useRef();
     const getWidth = () => window.innerWidth 
     || document.documentElement.clientWidth 
     || document.body.clientWidth;
     const [redirect_dashboard, set_redirect_dasboard] = useState(false)
     const [connect_wallet, set_connect_wallet] = useState(false) 
     const [confirmed, set_confirmed] = useState(false)
     const [error, set_error] = useState({
            password:{ state:false, text:"" },
            email:{ state:false, text:"" }
     })
    const [width, set_width] = useState(getWidth());

    const callback_func = ()=>{
      console.log("CallbackFunc")
    }


     // in this case useEffect will execute only once because
     // it does not have any dependencies.
     useEffect(()=>{
        let verification_code = get_url_params('verification_code')
        if(!!verification_code){
            props.confirm({
              verification_code
            })
        }

        loadReCaptcha('6Ld5lcAZAAAAAAV4sh9mQmC2aBSZIAA74P9XhP1p', callback_func);


        const resizeListener = () => {
          // change width from the state object
          set_width(getWidth())
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);
    
        // clean up function
        return () => {
          // remove resize listener
          window.removeEventListener('resize', resizeListener);
        }
     },[])

     const onChange = (event, dropDown) => {
       if(!!dropDown){
         set_data({
         ...data, [event.target.name]: event.target.value
         })
       }else{
        set_data({
            ...data, [event.target.id]: event.target.value
         })
         props.update_data({
          ...data, [event.target.id]: event.target.value
       })
       }
     }

   useEffect(()=>{
       if(props.login_ret){
           if(props.login_ret.success){
        
               props.global_error({
                success:true,
                message:props.login_ret.message,
                heading:'Login',
              })
              let ether = props.login_ret?.data?.user?.ethereum
              let token = props.login_ret?.data?.tokens?.access?.token
              if(!!token){
                localStorage.setItem("token", token)
                localStorage.setItem("portal_data", JSON.stringify(props.login_ret.data.portalData))
                sleep(400)
              }
              if(!ether){
                set_connect_wallet(true)
              }else{
                props.set_user_data({
                  ...props.login_ret.data.user
                })
                set_redirect_dasboard(true)
              }
           }else {
         
               props.global_error({
                success:false,
                message:props.login_ret.message,
                heading:'Login'
              })
           }
           props.login_loading()
       }
       if(props.confirm_ret){
        if(props.confirm_ret.success){
        
            set_confirmed(true)
            props.global_error({
             success:true,
             message:props.confirm_ret.message,
             heading:'Email confirmation',
           })
        }else {
           
            props.global_error({
             success:false,
             message:props.confirm_ret.message,
             heading:'Login'
           })
        }
        props.confirm_loading()
    }
   }, [props.login_ret, props.confirm_ret])

   const validate  = (data) =>{
    const  error = {
          email:{ state:false, text:"" },
          password:{ state:false, text:"" }
      }
  if(data.password===''){
    {
      error.password.text = "Please enter new password"
      error.password.state = true
    }
  }
  if(data.password.length!==0){
    if(data.password.length<4){
      {
        error.password.text = "Password must be atleast 4 characters long"
        error.password.state = true
      }
    }
  }
    if(data.email===''){
      {
        error.email.text = "Please enter your email address"
        error.email.state = true
      }
    }
    if(data.email !==''){
      if (!validator.isEmail(data.email))
      {
        error.email.text =  "Hmm, looks like an invalid email address";
        error.email.state = true
      }
    }
    return error
  }

  const submit_details = (e) =>{
    e.preventDefault()
    e.stopPropagation()

  
      const ret_error = validate({...data});
      set_error({...error, ...ret_error});
   
      if(!error_form_check(ret_error)){
         props.execute_captcha()
          props.login(Object.assign({},
              {
              email:data.email,
              password:data.password,
              token:props.recaptchaToken
            }))
      }
      }

      if(!!redirect_dashboard){
        return <Redirect to="/dashboard" />
      }else if(!!connect_wallet){
        return <Redirect to="/connect-wallet" />
      }else{
        return (
          <div className={`${width> 767?"v_align_outer height_100":'v_align_outer'}`}>
              <div  className={`${width> 767?"v_align_inner height_100":'v_align_inner'}`}>
                  <div className='card_class  flex_parent'>
                      {width > 767 ?<div className='flex_child_1 brdr_right'>
                         <img 
                           className='signin_image'
                           src="/img/signin_image.png"
                         />
                      </div>:''}
                      <div className='flex_child_1 padding_1'>
                        {!!confirmed?<h1 className='heading-primary'>
                            <span class="heading-primary--form_heading">Email Confirmed</span>
                            <span className='heading-primary--sub u-margin-top-small'>
                              Your account has been succcessfull confirmed please login to continue
                            </span> 
                            </h1>:<h1 className='heading-primary'>
                           <span class="heading-primary--form_heading">Login</span>
                         
                           </h1>}
                        <div >          
                           <InputComponent
                                   flag = "19"
                                   infoId="Email"
                                   infoHeading = "Email"
                                   infoText = "Enter Email"
                                   error={error.email.state}
                                   errorText={error.email.text}
                                   value={!!data.email?data.email:''}
                                   disabled = {props.login_loading_flag}
                                   toggleError={()=> set_error({
                                           ...error,
                                           email:{text:'',state:false}
                                       })}
                                   onChange={onChange}
                                   style={{marginTop: "30px"}}
                                   required={true}
                                   label="Email Address"
                                   type="text"
                                   placeholder="Enter your email address"
                                   name="email"
                                   validationProps={{type:'text'}}
                           />
                           </div>
                           <div >
                           <InputComponent
                                   flag = "19"
                                   infoId="password"
                                   infoHeading = "password"
                                   infoText = "Enter new password"
                                   error={error.password.state}
                                   errorText={error.password.text}
                                   value={!!data.password?data.password:''}
                                   disabled = {props.login_loading_flag}
                                   toggleError={()=> set_error({
                                           ...error,
                                           password:{text:'',state:false}
                                       })}
                                   onChange={onChange}
                                   style={{marginTop: "30px"}}
                                   required={true}
                                   label="password"
                                   type="text"
                                   placeholder="Enter your password"
                                   name="password"
                                   validationProps={{type:'text'}}
                           />
                           </div>
                           <div >
                               <Button id="login_button" className="btn btn--dark_blue btn--animated u-margin-top-small" loading={props.login_loading_flag} onClick={submit_details} >Login</Button>
                               <span className='heading-primary--sub u-margin-top-small'>Forgot Password ?
                                <Link to = "/signin">
                                  <text className='red_color'> Contact Us</text>
                                </Link>
                            </span>       
                           </div>
                      </div>
   
                  </div>
              </div>
   
          </div>
      )
      }


}




export default AnimatedMount({
  unmountedStyle: {
    opacity: 0,
    transform: 'translate3d(0, -2rem, 0)',
    transition: 'opacity 100ms ease-out, transform 100ms ease-out',
  },
  mountedStyle: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .5s ease-out, transform .5s ease-out',
  },
})((LoginView))