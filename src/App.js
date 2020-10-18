import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './sass/main.scss';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import no_tron_route from "./HOC/no_tron_route"
import tron_route from "./HOC/tron_route"
import LoginContainer from "./Containers/LoginContainer"
import {  Route, Switch, Redirect,  BrowserRouter as Router } from 'react-router-dom'
import Home from "./Views/Home"
import Participant from './Views/Participant'
import CheckTron from './Views/CheckTron'
import NoTron from './Views/NoTron'


function App(props) {
  
  const authObject =()=> {
    return {
        is_tron:localStorage.getItem('is_tron')==="true"?true:false
    }
 }


 const runScript = () => {
  if( window.$ ) {
    // do your action that depends on jQuery.
   let  script = document.createElement("script");

    script.src = "/assets/js/modernizr-3.6.0.min.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);

    script = document.createElement("script");
    script.src = "/assets/js/plugins.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);

    script = document.createElement("script");
    script.src = "/assets/js/bootstrap.min.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);

    script = document.createElement("script");
    script.src = "assets/js/magnific-popup.min.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);

    script = document.createElement("script");
    script.src = "/assets/js/jquery-ui.min.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);


    script = document.createElement("script");
    script.src = "/assets/js/wow.min.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);

    script = document.createElement("script");
    script.src = "/assets/js/odometer.min.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);

    script = document.createElement("script");
    script.src = "/assets/js/viewport.jquery.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);

    script = document.createElement("script");
    script.src = "/assets/js/nice-select.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);

    script = document.createElement("script");
    script.src = "/assets/js/owl.min.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);

    script = document.createElement("script");
    script.src = "/assets/js/paroller.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);


    script = document.createElement("script");
    script.src = "/assets/js/main.js";
    script.async = true;
    script.crossorigin="anonymous"
    document.head.appendChild(script);


} else {
    // Load Jquey in to window
    let script = document.createElement("script");

    script.src = "/assets/js/jquery-3.3.1.min.js";
    script.async = true;
    script.crossorigin="anonymous"
  
    document.head.appendChild(script);

     // wait 50 milliseconds and try again.
    window.setTimeout( runScript, 50 );
}
 }




 useEffect( ()=>{
   console.log("Use effects get called")
  let script = document.createElement("script");

  script.src = "/assets/js/jquery-3.3.1.min.js";
  script.async = true;
  script.crossorigin="anonymous"

  document.head.appendChild(script);
  // runScript();
 },[])



  return (
      <React.Fragment>
         <Router>
          <Switch>
          <Redirect exact from="/" to="/check-tron" />
            <Route  path ="/check-tron" component={()=><div ><CheckTron runScript={runScript} /></div>} />


        <Route  path ="/tron-route" component={()=>tron_route({
                            authObject:authObject
                          })(()=><div ><Participant runScript={runScript}  /></div>)} />

                <Route  path ="/no-tron-route" component={()=>no_tron_route({
                            authObject:authObject
                          })(()=><div ><NoTron runScript={runScript}  /></div>)} />


          </Switch>
      </Router>
      </React.Fragment>
  );
}

export default App
