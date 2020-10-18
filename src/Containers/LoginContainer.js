import React from "react"
import LoginView from "../Views/Login"
import { login, login_loading } from "../actions/Auth"
import { set_user_data } from "../actions/user"
import { global_error, global_error_clr } from "../actions/global"
import { connect } from 'react-redux';
import Notif from '../Components/Notif'
import { ReCaptcha } from 'react-recaptcha-v3'
import Header from "../Components/Header"

class LoginContainer extends React.PureComponent {
        constructor(props){
            super(props)
            this.state = {
                valid:false
            }
            this.recaptcha = ""
        }

        verifyCallback = (recaptchaToken) => {
          // Here you will get the final recaptchaToken!!!  
          console.log(recaptchaToken, "<= your recaptcha token")
          this.setState({
            recaptchaToken:recaptchaToken
          })
        }
      

        execute_captcha = (data)=> {
           this.recaptcha.execute();
           console.log(this.state.data,"this.state.data")
        }

        update_data = (data) =>{
          this.setState({
            data
          })
        }

    render(){
      console.log(this.props.global_error_ret,"this.props.globalErrorRet in Container")
        return (
             <React.Fragment>
                <div >
                <ReCaptcha
                    ref={ref => this.recaptcha = ref}
                    sitekey="6Ld5lcAZAAAAAAV4sh9mQmC2aBSZIAA74P9XhP1p"
                    action='action_name'
                    verifyCallback={this.verifyCallback}
                />
                <Header />
                  <LoginView
                    login = {this.props.login}
                    login_ret = {this.props.login_ret}
                    login_loading = {this.props.login_loading}
                    login_loading_flag = {this.props.login_loading_flag}

                    global_error = {this.props.global_error}
                    set_user_data = {this.props.set_user_data}

                    execute_captcha = {this.execute_captcha}

                    confirm = {this.props.confirm}
                    confirm_ret = {this.props.confirm_ret}
                    confirm_loading = {this.props.confirm_loading}
                    confirm_loading_flag = {this.props.confirm_loading_flag}

                    update_data = {this.update_data}
                    recaptchaToken = {this.state.recaptchaToken}
                  />
                  <Notif 
                     global_error = {this.props.global_error}
                     global_error_ret = {this.props.global_error_ret}
                     global_error_clr = {this.props.global_error_clr}
                  />
                </div>
             </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
  auth_store: state.auth_store,
  login_ret:state.auth_store.login_ret,
  login_loading_flag:state.auth_store.login_loading,
  global_error_ret:state.global_store.global_error_ret
})

export default connect(mapStateToProps, {
  login,
  login_loading,
  global_error,
  global_error_clr,
  set_user_data
 })(LoginContainer)
