import axios from 'axios';
import { get_url_params } from '../utils/common_utilities';
// import { connect } from 'react-redux';



let base_url = "https://devapi.plunes.com/v5"
let base_url_without_v5 = "https://devapi.plunes.com"

const pathLocation = window.location.host;
if(!!pathLocation) {
  console.log('pathLocation : ', pathLocation);
  if(pathLocation === 'analytics.plunes.com') {
    console.log('PROD');
    // Production baseUrl
    base_url = 'https://api.plunes.com/v5'
  }else{
    base_url = "https://devapi.plunes.com/v5"
  }
}

export default {
    auth:{
        login: (data, headers) =>
        axios
            .post(`${base_url}/auth/login`,data, headers)
            .then(res => {
                  return res.data
            })
            .catch(err =>{
              return err.response.data
            })
    },
    user: {
    
    }
}