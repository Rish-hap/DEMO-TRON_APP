import React, { useEffect, useState } from "react";
import Cycle from "../Components/CycleComponent/Cycle";
import CycleHeading from "../Components/CycleComponent/CycleHeading";
import BorderedBox from "../Components/Box/BorderedBox";
import InputComponent from "../Components/InputComponent";
import Button from "../Components/Buttons/index";
import TronGrid from "trongrid";
import TronWeb from "tronweb";
import Table from "../Components/Table";
import Card from "../Components/Card";
import Utils from "../utils";
import {
  global_error,
  global_error_clr,
  global_error_ret,
} from "../actions/global";
import { connect } from "react-redux";
import Notif from "../Components/Notif";
import Row from "../Components/Table/Row";
import WithdrawFunds from "./Withdrawfunds";
import StartCycle from "./StartCycle";
import FundsTransfer from "./FundsTransfer";
import InfoBanner from "./InfoBanner";

function MyError(message) {
  this.message = message;
}

MyError.prototype = new Error();

const Participant = (props) => {
  const [tron_web, set_tron_web] = React.useState({
    installed: true,
    loggedIn: false,
  });
  const [tronAddress, setTronAddress] = React.useState(null);
  const [data, set_data] = React.useState({});
  const [input, set_input] = React.useState({});
  const [refral_code, set_refral_code] = React.useState(null);
  const [wf, set_wf] = React.useState({
    amount: 1000,
    deposit: 0,
  });
  const [loading, set_loading] = React.useState({
    upload_fund_loading: false,
  });
  const [contract_details, set_contract_details] = React.useState({
    TotalFundsUploaded: 0,
    TotalFundsWithdrawn: 0,
    Balance: 0,
  });
  const [user_details, set_user_details] = React.useState({
    CF_Fund: "",
    cycle: "",
    cycleStartTime: "",
    duration: "",
    growth_fund: "",
    received_fund: "",
    referral_incentive: "",
    referrals: "",
    totalStructure: "",
    upline: "",
    uploaded_fund: "",
  });

  useEffect(async () => {
    // to inject all the css, js for the website assets
    props.runScript();

    const check_tron_address = () => {
      // if we want a loading screen for the initialization process
      // props.global_loading_set()
      return new Promise((resolve, reject) => {
        let attempts = 0,
          max_attempts = 50;
        const check_again = () => {
          if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            resolve(window.tronWeb.defaultAddress.base58);
            return;
          }
          attempts++;
          if (attempts >= max_attempts) {
            resolve(false);
            return;
          }
          setTimeout(check_again, 500);
        };
        check_again();
      });
    };

    const async_check = async () => {
      const tron_address = await check_tron_address();
      if (!!tron_address) {
        set_tron_web({
          installed: true,
          loggedIn: true,
        });
        setTronAddress(tron_address);
      } else {
        set_tron_web({
          installed: true,
          loggedIn: false,
        });
      }
    };

    await async_check();
    if (!!tron_web.loggedIn) {
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(tronAddress),
        base58: tronAddress,
      };

      window.tronWeb.on("addressChanged", () => {
        console.log("Addresss change event called");
        if (tron_web.loggedIn) return;
      });
    }

    await Utils.setTronWeb(window.tronWeb);
    await fetch_data();
    startEventListener();
  }, []);

  const fetch_data = async () => {
    const owner = await Utils.contract.owner().call();
    let balance = await utils_methods.get_balance();
    set_data({
      ...data,
      balance: Utils.tronWeb.fromSun(balance),
    });
    const details = await Utils.contract
      .accounts(window.tronWeb.defaultAddress.hex)
      .call();
    set_user_details({
      ...details,
      CF_Fund: parseFloat(
        Utils.tronWeb.fromSun(Utils.tronWeb.toDecimal(details.CF_Fund))
      ),
      growth_fund: Utils.tronWeb.fromSun(
        Utils.tronWeb.toDecimal(details.growth_fund)
      ),
      received_fund: Utils.tronWeb.fromSun(
        Utils.tronWeb.toDecimal(details.received_fund)
      ),
      uploaded_fund: Utils.tronWeb.fromSun(
        Utils.tronWeb.toDecimal(details.uploaded_fund)
      ),
      referral_incentive: Utils.tronWeb.fromSun(
        Utils.tronWeb.toDecimal(details.referral_incentive)
      ),
    });
    contract_info();
  };

  const utils_methods = {
    get_balance: async (tronWeb, tronAddress) => {
      const balance = await Utils.tronWeb.trx.getBalance();
      return balance;
    },
    upload_amount: async (amount, upline) => {
      try {
        const result = await Utils.contract
          .upload_fund(!!refral_code ? refral_code : "")
          .send({ callValue: Utils.tronWeb.toSun(amount) })
          .catch((e) => console.log("upload_fund: catch err: ", e));
        console.log(result, "result after upload _fund");
        return result;
      } catch (err) {
        console.log("upload_amount: catch err: ", err);
      }
    },
    contract_info: async (amount, upline) => {
      try {
        const result = await Utils.contract
          .contractInfo()
          .call()
          .catch((e) => console.log("upload_fund: catch err: ", e));
        console.log(result, "result after upload _fund");
        return result;
      } catch (err) {
        console.log("upload_amount: catch err: ", err);
      }
    },
  };

  const contract_info = async () => {
    try {
      const contract_details = await utils_methods
        .contract_info()
        .catch((e) => {
          console.log(e);
        });
      if (contract_details) {
        set_contract_details({
          TotalFundsUploaded: Utils.tronWeb.fromSun(
            Utils.tronWeb.toDecimal(contract_details.TotalFundsUploaded)
          ),
          TotalFundsWithdrawn: Utils.tronWeb.fromSun(
            Utils.tronWeb.toDecimal(contract_details.TotalFundsWithdrawn)
          ),
          Balance: Utils.tronWeb.fromSun(
            Utils.tronWeb.toDecimal(contract_details.Balance)
          ),
        });
      } else {
        props.global_error({
          success: false,
          message: "Unable to get contract stats. Please refresh",
          heading: "Contract Info",
        });
      }
    } catch (e) {}
  };

  const upload_fund = async () => {
    try {
      if (!!(parseInt(input.upload_amount, 10) > 2)) {
        set_loading({ ...loading, upload_fund_loading: true });
        const upload_ret = await utils_methods
          .upload_amount(parseInt(input.upload_amount, 10), user_details.upline)
          .catch((e) => {
            return { error: true, message: e };
          });
        if (!!upload_ret) {
          props.global_error({
            success: true,
            message:
              "Funds successfully uploaded, please wait for a few minues for transaction to be confirmed",
            heading: "Upload Funds",
          });
          set_loading({ ...loading, upload_fund_loading: false });
        } else {
          throw new MyError(`Unable to upload funds now. try again later.`);
        }
      } else {
        throw new MyError(`Minimum amount is 2TRX`);
      }
    } catch (err) {
      console.log("upload-fund: catch err: ", err);
      props.global_error({
        success: false,
        message: err.message,
        heading: "Upload Funds",
      });
      set_loading({ ...loading, upload_fund_loading: false });
    }
  };

  const startEventListener = () => {
    // Utils.contract.eventVote().watch((err) => {
    //     if(err){
    //     return console.log('Failed to bind the event', err);
    //     }
    //     window.location.reload()
    // })
  };
  console.log(Utils.tronWeb, "contract_details");
  console.log(user_details, "user_details");
  return (
    <React.Fragment>
        <div className="main--body">
     
        <div className="preloader">
            <div className="preloader-wrapper">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <a href="#0" className="scrollToTop"><i className="fas fa-angle-up"></i></a>
        <div className="overlay"></div>
       
        <header className="header-section">
            <div className="header-top">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <ul className="support-area">
                               {/* <!-- <li>
                                    <a href="#0"><i className="flaticon-support"></i>Support</a>
                                </li>
                                <li>
                                    <a href="Mailto:info@trontree.com"><i className="flaticon-email"></i>info@trontree.com </a>
                                </li>--> */}
                            </ul>
                        </div>
                        <div className="col-6">                            
                            <ul className="cart-area">
                                <li>
                                    <i className="flaticon-globe"></i>
                                    <div className="select-area">
                                        <select className="select-bar">
                                            <option value="en">English</option>
                                            <option value="bn">Bangla</option>
                                            <option value="sp">Spanish</option>
                                        </select>
                                    </div>
                                </li>
                               {/* <!-- <li>
                                    <a href="#0"><i className="flaticon-shopping-cart"></i>My cart <span>0</span></a>
                                </li>--> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="container">
                    <div className="header-area">
                        <div className="logo">
                            <a href="index.html">
                                <img src="assets/images/logo/logo.png" alt="logo"/>
                            </a>
                        </div>
                        <ul className="menu">
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>
                                <a href="#aboutus">About Us</a>
                            </li>
                            <li>
                                <a href="#process">Process</a>
                            </li>
                            <li>
                                <a href="#referralincentive">Referral Plan</a>
                            </li>
                            <li>
                                <a href="#faq">FAQ</a>
                            </li>
                         
                             <li className="pr-0">
                                <a href="#" ><i className="fa fa-telegram" aria-hidden="true" style={{
                                  fontSize:'30px'
                                }} ></i></a>
                            </li>
                            
                             <li className="pr-0">
                                <a href="dashboard.html" className="custom-button" >SIGN IN</a>
                                <div className="modal fade" id="modalRegisterForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
								  aria-hidden="true">
								  <div className="modal-dialog" role="document">
								    <div className="modal-content">
								      <div className="modal-header">
								        <h4 className="modal-title w-100 font-weight-bold">Login</h4>
								        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
								          <span aria-hidden="true">&times;</span>
								        </button>
								      </div>
								      <div className="modal-body mx-3">
								        <div className="md-form">
								          <label for="orangeForm-name">Your Name</label>
								          <input type="text" id="orangeForm-name" className="form-control validate"/>
								        </div>
								        <div className="md-form">
								          <label for="orangeForm-email">Your Email</label>
								          <input type="email" id="orangeForm-email" className="form-control validate"/>
								        </div>
								        <div className="md-form">
								          <label for="phone no">Your Number</label>
								          <input type="text" id="orangeForm-email" className="form-control validate"/>
								        </div>
								        <div className="md-form">
								          <label for="orangeForm-pass">Your Password</label>
								          <input type="password" id="orangeForm-pass" className="form-control validate"/>
								        </div>

								      </div>
								      <div className="modal-footer d-flex justify-content-center">
								        <button className="btn btn-deep-orange">Sign up</button>
								      </div>
								    </div>
								  </div>
								</div>
                            </li>
                           
                        </ul>
                        <div className="header-bar d-lg-none">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
   
        <section className="banner-section" id="home">
            <div className="banner-bg d-lg-none">
                <img src="assets/images/banner/banner-bg2.jpg" alt="banner"/>
            </div>
            <div className="banner-bg d-lg-block bg_img" data-background="assets/images/banner/banner.jpg">
             
                <div className="chart-2 wow fadeInDown" data-wow-delay="1s" data-wow-duration=".7s">
                    <img src="assets/images/banner/chart2.png" alt="banner"/>
                </div>
                <div className="chart-3 wow fadeInRight" data-wow-delay="1.5s" data-wow-duration=".7s">
                    <img src="assets/images/banner/chart3.png" alt="banner"/>
                </div>
             
            </div>
            <div className="animation-area d-none d-lg-block">
                <div className="plot">
                    <img src="assets/images/banner/plot.png" alt="banner"/>
                </div>
                <div className="element-1 wow fadeIn" data-wow-delay="1s">
                    <img src="assets/images/banner/light.png" alt="banner"/>
                </div>
                <div className="element-2 wow fadeIn" data-wow-delay="1s">
                    <img src="assets/images/banner/coin1.png" alt="banner"/>
                </div>
                <div className="element-3 wow fadeIn" data-wow-delay="1s">
                    <img src="assets/images/banner/coin2.png" alt="banner"/>
                </div>
                <div className="element-4 wow fadeIn" data-wow-delay="1s">
                    <img src="assets/images/banner/coin3.png" alt="banner"/>
                </div>
                <div className="element-5 wow fadeIn" data-wow-delay="1s">
                    <img src="assets/images/banner/coin4.png" alt="banner"/>
                </div>
                <div className="element-6 wow fadeIn" data-wow-delay="1s">
                    <img src="assets/images/banner/coin5.png" alt="banner"/>
                </div>
                <div className="element-7 wow fadeIn" data-wow-delay="1s">
                    <img src="assets/images/banner/coin6.png" alt="banner"/>
                </div>
                <div className="element-8 wow fadeIn" data-wow-delay="1s">
                    <img src="assets/images/banner/sheild.png" alt="banner"/>
                </div>
                <div className="element-9 wow fadeIn" data-wow-delay="1s">
                    <img src="assets/images/banner/coin7.png" alt="banner"/>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-7 col-lg-6 offset-lg-6 offset-xl-6">
                        <div className="banner-content">
                            <h3 className="title">Grow your Funds</h3>
                            <b>1% per day,</b> <span>@ upto 30% per month </span>
                            <p className="special_className">Unbeatable referral program to earn much more
                            </p>
                            <p>A Highly Mathematical Calculation with the transparency of Blockchain Smart Contract.</p>
                            <div className="button-group">
                                <a href="#0" className="custom-button">VIEW CONTRACT</a>
                                <a href="https://www.youtube.com/watch?v=GT6-H4BRyqQ" className="popup video-button"><i className="flaticon-play"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     
        <div className="counter-section">
            <div className="container">
                <div className="row align-items-center mb-30-none justify-content-center">
                    <div className="col-sm-6 col-md-3">
                        <div className="counter-item">
                            <div className="counter-thumb">
                                <img src="assets/images/icons/1c.png" alt="counter"/>
                            </div>
                            <div className="counter-content">
                                <div className="counter-header">
                                    <h3 className="title odometer" data-odometer-final="174">174</h3><h3 className="title">M</h3>
                                </div>
                                <p>Contract Balance</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="counter-item">
                            <div className="counter-thumb">
                                <img src="assets/images/icons/2c.png" alt="counter"/>
                            </div>
                            <div className="counter-content">
                                <div className="counter-header">
                                    <h3 className="title odometer" data-odometer-final="174">174</h3><h3 className="title">M</h3>
                                </div>
                                <p>Participant</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="counter-item">
                            <div className="counter-thumb">
                                <img src="assets/images/icons/3c.png" alt="counter"/>
                            </div>
                            <div className="counter-content">
                                <div className="counter-header">
                                    <h3 className="title odometer" data-odometer-final="174">174</h3><h3 className="title">M</h3>
                                </div>
                                <p>Today Withdrawal</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="counter-item">
                            <div className="counter-thumb">
                                <img src="assets/images/icons/4c.png" alt="counter"/>
                            </div>
                            <div className="counter-content">
                                <div className="counter-header">
                                    <h3 className="title odometer" data-odometer-final="174">174</h3><h3 className="title">M</h3>
                                </div>
                                <p>Secure Funds</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <section className="about-section padding-top padding-bottom" id="about">
            <div className="container" id="aboutus">
                <div className="row align-items-center">
                    <div className="col-lg-6 d-none d-lg-block rtl">
                        <img src="assets/images/about/about.png" alt="about"/>
                    </div>
                    <div className="col-lg-6">
                        <div className="section-header left-style">
                            <span className="cate"  style={{
                                  textAlign:'left'
                                }}>WELCOME TO Tron Tree</span>
                            <h2 className="title" style={{textAlign:'left'}}>About Us</h2>
                            <p  style={{
                                textAlign:'left'
                                }}>TronTree is a great concept for you based on a Highly Mathematical Calculation, in which you start with a small amount of money. A tremendous opportunity for you to achieve financial freedom.
                            </p>
                        </div>
                        <div className="about--content">
                            <div className="about-item">
                                <div className="about-thumb">
                                    <img src="assets/images/icons/realistic.png" alt="about"/>
                                </div>
                                <div className="about-content">
                                    <h5 className="title">Realistic Offer</h5>
                                    <p>
                                        Realistic growth offer @1% per day
                                    </p>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="about-thumb">
                                     <img src="assets/images/icons/fast-withdrawals.png" alt="about"/>
                                </div>
                                <div className="about-content">
                                    <h5 className="title">Fast Withdrawals</h5>
                                    <p>
                                        Quick fund withdrawal in every 24 hours 
                                    </p>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="about-thumb">
                                     <img src="assets/images/icons/secure-for-all.png" alt="about"/>
                                </div>
                                <div className="about-content">
                                    <h5 className="title">Secure for all</h5>
                                    <p>
                                        Secure Fund” for last wave participants
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="feature-section padding-top padding-bottom bg_img" data-background="./assets/images/feature/feature-bg.png" id="feature">
            <div className="ball-1" data-paroller-factor="-0.30" data-paroller-factor-lg="0.60"
            data-paroller-type="foreground" data-paroller-direction="horizontal">
                <img src="assets/images/balls/ball1.png" alt="balls" />
            </div>
            <div className="ball-2" data-paroller-factor="-0.30" data-paroller-factor-lg="0.60"
            data-paroller-type="foreground" data-paroller-direction="horizontal">
                <img src="assets/images/balls/ball2.png" alt="balls" />
            </div>
            <div className="ball-3" data-paroller-factor="0.30" data-paroller-factor-lg="-0.30"
            data-paroller-type="foreground" data-paroller-direction="horizontal">
                <img src="assets/images/balls/ball3.png" alt="balls" />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-10">
                        <div className="section-header">
                            <span className="cate">Our Amazing Features</span>
                            <h2 className="title">
                                Why Should your Start with us
                            </h2>
                            <p className="mw-100">
                                Tron Tree is a concept based on highly Mathematical Calculations that has been developed with over 20 years of experience
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center feature-wrapper">
                    <div className="col-md-6 col-sm-10 col-lg-3">
                        <div className="feature-item">
                            <div className="feature-thumb">
                                <img src="assets/images/icons/smart.png" alt="feature"/>
                            </div>
                            <div className="feature-content">
                                <h5 className="title">Smart</h5>
                                <p>100% Decentralize, Fully Automatic, No Admin Control, Developed on Tron Blockchain Smart Contract</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-10 col-lg-3">
                        <div className="feature-item">
                            <div className="feature-thumb">
                                <img src="assets/images/icons/simple.png" alt="feature"/>
                            </div>
                            <div className="feature-content">
                                <h5 className="title">Simple </h5>
                                <p>24 Hour withdrawal, Simple User Interface, Simple Upload, withdrawal, transfer and compound process</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-10 col-lg-3">
                        <div className="feature-item">
                            <div className="feature-thumb">
                                 <img src="assets/images/icons/secure.png" alt="feature"/>
                            </div>
                            <div className="feature-content">
                                <h5 className="title">Secure</h5>
                                <p>100% Transparent, No Third Party Interference, A unique “Secure Fund” for last wave participants</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-10 col-lg-3">
                        <div className="feature-item">
                            <div className="feature-thumb">
                                <img src="assets/images/icons/stable.png" alt="feature"/>
                            </div>
                            <div className="feature-content">
                                <h5 className="title">Stable</h5>
                                <p>No Scope of Manipulation and Greedy Investor, Highly Mathematical Calculation for long term stability</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
        <section className="get-section padding-top padding-bottom" id="process">
            <div className="container" >
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <div className="section-header">
                            <span className="cate">get to know</span>
                            <h2 className="title">how we work?</h2>
                            <p>
                                Follow these simple steps and Grow you funds!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="hover-tab">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 d-lg-block d-none">
                            <div className="hover-tab-area">
                                <div className="tab-area">
                                    <div className="tab-item active first">
                                        <img src="assets/images/how/how01.png" alt="how"/>
                                    </div>
                                    <div className="tab-item second">
                                        <img src="assets/images/how/how02.png" alt="how"/>
                                    </div>
                                    <div className="tab-item third">
                                        <img src="assets/images/how/how03.png" alt="how"/>
                                    </div>
                                    <div className="tab-item third">
                                        <img src="assets/images/how/how03.png" alt="how"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-9">
                            <div className="hover-tab-menu">
                                <ul className="tab-menu">
                                    <li className="active">
                                        <div className="menu-thumb mt0" style={{
                                          marginBlockStart:'auto'
                                        }}>
                                            <span>
                                                01
                                            </span>
                                        </div>
                                        <div className="menu-content">
                                            <h5 className="title">Connect with us</h5>
                                            <p>Connect your Tron Wallet to trontree.io and upload your fund directly from your wallet to start a growth cycle.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="menu-thumb">
                                            <span>
                                                02
                                            </span>
                                        </div>
                                        <div className="menu-content">
                                            <h5 className="title">Start Growth Cycle</h5>
                                            <p>
                                                Transfer the fund to the growth cycle and start it. Now leisurely enjoy the growth on daily growth cycle fund.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="menu-thumb">
                                            <span>
                                                03
                                            </span>
                                        </div>
                                        <div className="menu-content">
                                            <h5 className="title">Withdrawal</h5>
                                            <p>
                                                Withdrawal the daily growth to the wallet as per your convenience. This is the income that one earns without doing work at all.
                                            </p>
                                        </div>
                                    </li>
                                     {/* <!-- <li>
                                        <div className="menu-thumb">
                                            <span>
                                                04
                                            </span>
                                        </div>
                                        <div className="menu-content">
                                            <h5 className="title">Re-start growth cycle</h5>
                                            <p>
                                                Once the growth cycle is over, start again. In this way, start the growth cycle again and enjoy financial freedom
                                            </p>
                                        </div>
                                    </li> --> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="call-section call-overlay bg_img" data-background="assets/images/call/call-bg.jpg">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="call--item">
                            <span className="cate">Start Growing your Fund</span>
                            <h3 className="title">1% per day, @ upto 30% per month</h3>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="call-button">
                            <a href="Tel:0939303" className="call">
                                <img src="assets/images/call/icon02.png" alt="call"/>
                            </a>
                            <a href="#0" className="custom-button"> Start Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
        <section className="affiliate-programe" id="affiliate" >
            <div className="container" id="referralincentive">
                <div className="row">
                    <div className="col-lg-7 padding-bottom padding-top">
                        <div className="section-header left-style">
                            <span className="cate">What You’ll Get As</span>
                            <h2 className="title fz-md-49">Referral Programm</h2>
                            <p>
                                The referral incentive is an opportunity for those participants who want to increase their ongoing growth cycle fund infinitely by referring the TronTree concept to other people. It is not compulsory, but optional. Through this you can increase the growth fund infinitely many times and can get a stable income.
                            </p>
                        </div>
                        <div className="affiliate-wrapper">
                            <div className="affiliate-item">
                                <div className="affiliate-inner">
                                    <div className="affiliate-thumb">
                                        <img src="assets/images/man1.png" alt=""/>
                                        <span className="remainder">5%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="affiliate-item cl-two">
                                <div className="affiliate-inner">
                                    <div className="affiliate-thumb">
                                        <img src="assets/images/man2.png" alt=""/>
                                        <span className="remainder">6%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="affiliate-item cl-three">
                                <div className="affiliate-inner">
                                    <div className="affiliate-thumb">
                                        <img src="assets/images/man3.png" alt=""/>
                                        <span className="remainder">7%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 d-lg-block d-none">
                        <div className="afiliate-thumb">
                            <img src="assets/images/affiliate/affiliate.png" alt="affiliate"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
<section className="offer-section padding-top padding-bottom pb-max-md-0" id="plan">
            <div className="ball-group-1" data-paroller-factor="-0.30" data-paroller-factor-lg="0.60" data-paroller-type="foreground" data-paroller-direction="horizontal"  style={{
              transform:'translate(71px, 0px)',  transition:"transform 0.1s ease 0s", willChange:'transform'
            }}>
                <img src="./assets/images/balls/ball-group1.png" alt="balls"/>
            </div>
            <div className="ball-group-2" data-paroller-factor="0.30" data-paroller-factor-lg="-0.30" data-paroller-type="foreground" data-paroller-direction="horizontal"  style={{
              transform:'translate(-71px, 0px)',  transition:"transform 0.1s ease 0s", willChange:'transform'
            }}>
                <img src="./assets/images/balls/ball-group2.png" alt="balls"/>
            </div>
            <div className="container" >
              <div className="row">
                    <div className="col-md-6 section_left_content">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-xl-12">
                        <div className="section-header">
                            <h2 className="title">Referral Incentive</h2>
                            
                            <p>
                               In level incentive, you start as a participant and then, as you become a leader and manager, you get best of incentives on a team of up to 50 levels.
                            </p>
                            <img src="assets/images/footer/sender.png" style={{width:'80%'}}/>
                        </div>
                    </div>
                </div>
                </div>
               
                <div className="col-md-6">
               <div className="table100 table1">
<table style={{width:'100%'}}  className="table1">
<thead>
<tr className="table100-head">
<th className="column1">Levels</th>
<th className="column2">Percentage</th>
<th className="column3">Positions</th>
</tr>
</thead>
<tbody>
<tr>
<td className="column1">Level 1</td>
<td className="column2">5%</td>
<td className="column3">Participant</td>
</tr>
<tr>
<td className="column1">Level 2</td>
<td className="column2">3%</td>
<td className="column3">Leader</td>
</tr>
<tr>
<td className="column1">Level 3</td>
<td className="column2">2%</td>
<td className="column3">Leader</td>
</tr>
<tr>
<td className="column1">Level 4</td>
<td className="column2">1%</td>
<td className="column3">Leader</td>
</tr>
<tr>
<td className="column1">Level 5 to 10</td>
<td className="column2">0.5%</td>
<td className="column3">Manager</td>
</tr>
<tr>
<td className="column1">Level 11 to 20</td>
<td className="column2">0.2%</td>
<td className="column3">Manager</td>
</tr>
<tr>
<td className="column1">Level 21 to 30</td>
<td className="column2">0.1%</td>
<td className="column3">Manager</td>
</tr>
<tr>
<td className="column1">Level 31 to 50</td>
<td className="column2">0.05%</td>
<td className="column3">Manager</td>
</tr>

</tbody>
</table>
</div>  
                
                </div>  </div>
            </div>
        </section>
       
<section className="offer-section padding-top padding-bottom pb-max-md-0" id="plan">
            <div className="ball-group-1" data-paroller-factor="-0.30" data-paroller-factor-lg="0.60" data-paroller-type="foreground" data-paroller-direction="horizontal" style={{
              transform:'translate(-19px, 0px)',  transition:"transform 0.1s ease 0s", willChange:'transform'
            }}>
                <img src="./assets/images/balls/ball-group1.png" alt="balls"/>
            </div>
            <div className="ball-group-2" data-paroller-factor="0.30" data-paroller-factor-lg="-0.30" data-paroller-type="foreground" data-paroller-direction="horizontal" style={{
              transform:'translate(19px, 0px)',  transition:"transform 0.1s ease 0s", willChange:'transform'
            }} >
                <img src="./assets/images/balls/ball-group2.png" alt="balls"/>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-7">
                       <div className="table100 table2">
<table style={{width:'100%'}}  className="table2">
<thead>
<tr className="table100-head">
<th className="column11">Club Name </th>
<th className="column22">Fund</th>
<th className="column33">Entry Up To</th>
<th className="column44">Distribution</th>
<th className="column55">Period</th>
</tr>
</thead>
<tbody>
<tr>
<td className="column11">Silver Club</td>
<td className="column22">50000 TRX</td>
<td className="column33">3rd Cycle</td>
<td className="column44">0.25%</td>
<td className="column55">100 Days</td>
</tr>
<tr>
<td className="column11">Gold Club</td>
<td className="column22">100000 TRX</td>
<td className="column33">4thCycle</td>
<td className="column44">0.25%</td>
<td className="column55">100 Days</td>
</tr>
<tr>
<td className="column11">Diamond Club</td>
<td className="column22">200000 TRX</td>
<td className="column33">5thCycle</td>
<td className="column44">0.25%</td>
<td className="column55">100 Days</td>
</tr>
<tr>
<td className="column11">Platinum Club</td>
<td className="column22">500000 TRX</td>
<td className="column13">6thCycle</td>
<td className="column44">0.25%</td>
<td className="column55">100 Days</td>
</tr>

</tbody>
</table>
</div>
                    </div>
                    
                    <div className="col-lg-5">
                        <div className="section-header">
                            <h2 className="title">Big Shot Club</h2>
                            <p>
                                This is for those participants who have understood the power of the trontree concept and participate with more funds. big shot pool has four clubs.
                            </p>
                        </div>
                    </div>
                     
                </div>
                <div className="offer-wrapper">
                  
                </div>
            </div>
        </section>
        
        <section className="call-section call-overlay bg_img" data-background="assets/images/call/call-bg.jpg">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-7 col-xl-6">
                        <div className="call-item text-center text-sm-left">
                            <div className="call-icon">
                                <img src="assets/images/call/icon01.png" alt="call"/>
                            </div>
                            <div className="call-content">
                                <h5 className="title">For more Information about our unbeatable Referral Program</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-xl-6 text-center text-sm-left text-md-right">
                        <a href="#0" className="custom-button">download pdf<i className="flaticon-right"></i></a>
                    </div>
                </div>
            </div>
        </section>
     
        <section className="profit-section padding-top" id="profit">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                        <div className="section-header">
                            <span className="cate">Calculate the Amazing Growth</span>
                            <h2 className="title">You Can Earn</h2>
                            <p>Calculate your funds growth before making an investment.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div className="profit-bg bg_img" data-background="assets/images/profit/profit-bg.png">
                    <div className="animation-group">
                        <div className="platform">
                            <img src="assets/images/profit/platform.png" alt="profit"/>
                        </div>
                        <div className="light">
                            <img src="assets/images/profit/light.png" alt="profit"/>
                        </div>
                        <div className="coin-1 wow fadeOutDown" data-wow-delay="1s">
                            <img src="assets/images/profit/coin6.png" alt="profit"/>
                        </div>
                        <div className="coin-2 wow fadeOutDown" data-wow-delay="1s">
                            <img src="assets/images/profit/coin2.png" alt="profit"/>
                        </div>
                        <div className="coin-3 wow fadeOutDown" data-wow-delay="1s">
                            <img src="assets/images/profit/coin3.png" alt="profit"/>
                        </div>
                        <div className="coin-4 wow fadeOutDown" data-wow-delay="1s">
                            <img src="assets/images/profit/coin4.png" alt="profit"/>
                        </div>
                        <div className="coin-5 wow fadeOutDown" data-wow-delay="1s">
                            <img src="assets/images/profit/coin5.png" alt="profit"/>
                        </div>
                        <div className="coin-6 wow fadeOutDown" data-wow-delay="1s">
                            <img src="assets/images/banner/coin1.png" alt="profit"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="calculate-wrapper tab">
                    <div className="calculate--area">
                        <div className="calculate-area">
                            <div className="calculate-item">
                                <h5 className="title" data-serial="01">Enter TRX Fund</h5>
                                <select className="select-bar">
                                    <option value="01">120% daily for 50 days</option>
                                    <option value="02">110% daily for 30 days</option>
                                    <option value="03">105% daily for 20 days</option>
                                    <option value="04">102% daily for 10 days</option>
                                    <option value="05">101% daily for 5 days</option>
                                </select>
                            </div>
                            <div className="calculate-item">
                                <h5 className="title" data-serial="02">Enter Months</h5>
                                <ul className="tab-menu">
                                    <li>usd</li>
                                    <li className="active">btc</li>
                                    <li>eth</li>
                                    <li>rub</li>
                                </ul>
                            </div>
                            <div className="calculate-item">
                                <h5 className="title" data-serial="03">Enter the amount</h5>
                                <input type="number" value="100"/>
                            </div>
                        </div>
                        <div className="tab-area">
                            <div className="tab-item">
                                <div className="profit-calc">
                                    <div className="item">
                                        <span className="cate">Approx. Total Cycles</span>
                                        <h2 className="title cl-theme-1">0.026400 USD</h2>
                                    </div>
                                    <div className="item">
                                        <span className="cate">Total Profit</span>
                                        <h2 className="title cl-theme">1.320000 USD</h2>
                                    </div>
                                </div>
                                <div className="invest-range-area">
                                    <div className="main-amount">
                                        <input type="text" className="calculator-invest" id="usd-amount" readonly/>
                                    </div>
                                    <div className="invest-amount" data-min="1.00 USD" data-max="1000 USD">
                                        <div id="usd-range" className="invest-range-slider"></div>
                                    </div>
                                    <button type="submit" className="custom-button">join now</button>
                                </div>
                            </div>
                            <div className="tab-item active">
                                <div className="profit-calc">
                                    <div className="item">
                                        <span className="cate">Daily Profit</span>
                                        <h2 className="title cl-theme">1.320000 BTC</h2>
                                    </div>
                                    <div className="item">
                                        <span className="cate">Total Profit</span>
                                        <h2 className="title cl-theme">1.320000 BTC</h2>
                                    </div>
                                </div>
                                <div className="invest-range-area">
                                    <div className="main-amount">
                                        <input type="text" className="calculator-invest" id="btc-amount" readonly/>
                                    </div>
                                    <div className="invest-amount" data-min="1.00 BTC" data-max="1000 BTC">
                                        <div id="btc-range" className="invest-range-slider"></div>
                                    </div>
                                    <button type="submit" className="custom-button">join now</button>
                                </div>
                            </div>
                            <div className="tab-item">
                                <div className="profit-calc">
                                    <div className="item">
                                        <span className="cate">Daily Profit</span>
                                        <h2 className="title cl-theme-1">0.026400 ETH</h2>
                                    </div>
                                    <div className="item">
                                        <span className="cate">Total Profit</span>
                                        <h2 className="title cl-theme">1.320000 ETH</h2>
                                    </div>
                                </div>
                                <div className="invest-range-area">
                                    <div className="main-amount">
                                        <input type="text" className="calculator-invest" id="eth-amount" readonly/>
                                    </div>
                                    <div className="invest-amount" data-min="1.00 ETH" data-max="1000 ETH">
                                        <div id="eth-range" className="invest-range-slider"></div>
                                    </div>
                                    <button type="submit" className="custom-button">join now</button>
                                </div>
                            </div>
                            <div className="tab-item">
                                <div className="profit-calc">
                                    <div className="item">
                                        <span className="cate">Daily Profit</span>
                                        <h2 className="title cl-theme-1">0.026400 RUB</h2>
                                    </div>
                                    <div className="item">
                                        <span className="cate">Total Profit</span>
                                        <h2 className="title cl-theme">1.320000 RUB</h2>
                                    </div>
                                </div>
                                <div className="invest-range-area">
                                    <div className="main-amount">
                                        <input type="text" className="calculator-invest" id="rub-amount" readonly/>
                                    </div>
                                    <div className="invest-amount" data-min="1.00 RUB" data-max="1000 RUB">
                                        <div id="rub-range" className="invest-range-slider"></div>
                                    </div>
                                    <button type="submit" className="custom-button">join now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="latest-transaction padding-top padding-bottom" id="transaction">
            <div className="transaction-bg bg_img" data-background="assets/images/transaction/transaction-bg.png">
                <span className="d-none">Image</span>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                        <div className="section-header">
                            <h2 className="title">Monthly Income Feed</h2>
                            <p>Our goal is to simplify investing so that anyone can be an investor.Withthis in mind, 
                            we hand-pick the investments we offer on our platform.</p>
                        </div>
                    </div>
                </div>
                <div className="tab transaction-tab d-flex flex-wrap justify-content-center">
                    <ul className="tab-menu">
                        <li className="active">
                            <div className="thumb">
                                <i className="flaticon-wallet"></i>
                            </div>
                            <div className="content">
                                <span className="d-block">last</span>
                                <span className="d-block">Cycles</span>
                            </div>
                        </li>
                        <li>
                            <div className="thumb">
                                <i className="flaticon-atm"></i>
                            </div>
                            <div className="content">
                                <span className="d-block">last</span>
                                <span className="d-block">Withdrawals</span>
                            </div>
                        </li>
                        <li>
                            <div className="thumb">
                                <i className="flaticon-team"></i>
                            </div>
                            <div className="content">
                                <span className="d-block">last</span>
                                <span className="d-block">Transfers</span>
                            </div>
                        </li>
                    </ul>
                    <div className="tab-area">
                        <div className="tab-item active">
                            <div className="row justify-content-center mb-30-none">
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">KimHowell21</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction01.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 BTC</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">ildar25864</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction02.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 ETH</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">Buha74</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction03.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 LTC</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">Eduardo54</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction04.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-item">
                            <div className="row justify-content-center mb-30-none">
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">Doug9544</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction07.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 USD</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">Hector 951</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction08.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 LTC</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">KimHowell21</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction01.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 BTC</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">ildar25864</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction02.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 ETH</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-item">
                            <div className="row justify-content-center mb-30-none">
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">Buha74</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction03.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 LTC</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">Eduardo54</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction04.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">Pedro33</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction05.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 USD</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-3 col-sm-6">
                                    <div className="transaction-item">
                                        <div className="transaction-header">
                                            <h5 className="title">Nelson35</h5>
                                            <span className="date">December 24, 17:57</span>
                                        </div>
                                        <div className="transaction-thumb">
                                            <img src="assets/images/transaction/transaction06.png" alt="transaction"/>
                                        </div>
                                        <div className="transaction-footer">
                                            <span className="amount">Amount</span>
                                            <h5 className="sub-title">0.00449721 XRP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="client-section padding-bottom padding-top">
            <div className="background-map">
                <img src="assets/images/client/client-bg.png" alt="client"/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10">
                        <div className="section-header left-style">
                            <span className="cate">TESTIMONIALS</span>
                            <h2 className="title"><span>40,000</span> HAPPY CLIENTS AROUND THE WORLD</h2>
                            <p className="mw-500">
                                We have many happy investors invest with us .Some impresions from our Customers!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-9">
                        <div className="m--30">
                            <div className="client-slider owl-carousel owl-theme">
                                <div className="client-item">
                                    <div className="client-content">
                                        <p>
                                            Perfect work to start on, support is awesome
                                        </p>
                                        <div className="rating">
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star-half-alt"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="client-thumb">
                                        <a href="#0">
                                            <img src="assets/images/client/client01.png" alt="client"/>
                                        </a>
                                    </div>
                                </div>
                                <div className="client-item">
                                    <div className="client-content">
                                        <p>
                                            Very easy to use, perfect for invest
                                        </p>
                                        <div className="rating">
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star-half-alt"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="client-thumb">
                                        <a href="#0">
                                            <img src="assets/images/client/client02.png" alt="client"/>
                                        </a>
                                    </div>
                                </div>
                                <div className="client-item">
                                    <div className="client-content">
                                        <p>
                                            Awesome Trontree most profitable site!
                                        </p>
                                        <div className="rating">
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star"></i>
                                            </span>
                                            <span>
                                                <i className="fas fa-star-half-alt"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="client-thumb">
                                        <a href="#0">
                                            <img src="assets/images/client/client03.png" alt="client"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                                <div className="addmore_testomial">
                                    <button type="submit" className="custom-button">Add Your Testimonial</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       

        <section className="bg_img hero-section-2" data-background="assets/images/about/hero-bg3.jpg" style={{
          backgroundImage:'assets/images/about/hero-bg3.jpg'
        }} >
            <div className="container" >
                <div className="hero-content text-white">
                    <h1 className="title">faq</h1>
                </div>
            </div>
            <div className="hero-shape">
                <img className="wow slideInUp" src="assets/images/about/hero-shape1.png" alt="about" data-wow-duration="1s" style={{
                  visibility:'visible', animationDuration:'1s', animationName:'slideInUp'
                }}/>
            </div>
        </section>

        <section className="faq-section padding-top padding-bottom mb-xl-5" id="faq">
            <div className="ball-group-1" data-paroller-factor="-0.30" data-paroller-factor-lg="0.60" data-paroller-type="foreground" data-paroller-direction="horizontal"   style={{
              transform:'transform: translate(-246px, 0px)',  transition:"transform 0.1s ease 0s", willChange:'transform'
            }} >
                <img src="assets/images/balls/ball-group7.png" alt="balls"/>
            </div>
            <div className="ball-group-2 rtl" data-paroller-factor="0.30" data-paroller-factor-lg="-0.30" data-paroller-type="foreground" data-paroller-direction="horizontal"  style={{
              transform:'transform: translate(246px, 0px)',  transition:"transform 0.1s ease 0s", willChange:'transform'
            }} >
                <img src="assets/images/balls/ball-group8.png" alt="balls"/>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="section-header">
                            <span className="cate">You have questions</span>
                            <h2 className="title">
                                we have answers
                            </h2>
                            <p className="mw-100">
                                Do not hesitate to send us an email if you can't find what you're looking for.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="tab faq-tab">
                    <ul className="tab-menu">
                        <li>BASIC </li>
                        <li className="active">FINANCIAL</li>
                        <li>Affiliate</li>
                    </ul>
                    <div className="tab-area">
                        <div className="tab-item">
                            <div className="faq-wrapper">
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">What is the minimum percentage that an investor can earn on Trontree?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item active open">
                                    <div className="faq-title">
                                        <h5 className="title">Can i invest using cryptocurrency?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">What are the minimum and maximum deposit amounts?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">How long will the money arrive in my account after the withdrawal process?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">What payment system can i use to withdraw?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-item active">
                            <div className="faq-wrapper">
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">What is the minimum percentage that an investor can earn on Trontree?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item active open">
                                    <div className="faq-title">
                                        <h5 className="title">Can i invest using cryptocurrency?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">What are the minimum and maximum deposit amounts?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">How long will the money arrive in my account after the withdrawal process?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">What payment system can i use to withdraw?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-item">
                            <div className="faq-wrapper">
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">What is the minimum percentage that an investor can earn on Trontree?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item active open">
                                    <div className="faq-title">
                                        <h5 className="title">Can i invest using cryptocurrency?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">What are the minimum and maximum deposit amounts?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">How long will the money arrive in my account after the withdrawal process?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq-item">
                                    <div className="faq-title">
                                        <h5 className="title">What payment system can i use to withdraw?</h5>
                                        <span className="right-icon"></span>
                                    </div>
                                    <div className="faq-content">
                                        <p>
                                            Ea commodi eius nisi fugiat eligendi neque repellendus vero, aliquam temporibus, dicta optio eveniet saepe. Beatae hic fugiat qui possimus doloribus? Ratione, molestiae magnam.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <footer className="footer-section">
            <div className="newslater-section padding-bottom">
                <div className="container">
                    <div className="newslater-area">
                        <div className="newslater-content padding-bottom padding-top">
                            <span className="cate">SUBSCRIBE TO Trontree</span>
                            <h3 className="title">To Get Exclusive Benefits</h3>
                            <form className="newslater-form">
                                <input type="text" placeholder="Enter Your Email Here" required/>
                                <button type="submit">subscribe</button>
                            </form>
                        </div>
                        <div className="newslater-thumb">
                            <img src="assets/images/footer/footer.png" alt="footer"/>
                            <div className="coin-1">
                                <img src="assets/images/footer/Coin_01.png" alt="footer"/>
                            </div>
                            <div className="coin-2">
                                <img src="assets/images/footer/Coin_02.png" alt="footer"/>
                            </div>
                            <div className="coin-3">
                                <img src="assets/images/footer/Coin_03.png" alt="footer"/>
                            </div>
                            <div className="coin-4">
                                <img src="assets/images/footer/Coin_04.png" alt="footer"/>
                            </div>
                            <div className="coin-5">
                                <img src="assets/images/footer/Coin_05.png" alt="footer"/>
                            </div>
                            <div className="coin-6">
                                <img src="assets/images/footer/Coin_06.png" alt="footer"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="footer-top">
                    <div className="logo">
                        <a href="index.html">
                            <img src="assets/images/logo/footer-logo.png" alt="logo" />
                        </a>
                    </div>
                    <ul className="links">
                        <li>
                            <a href="#0">About</a>
                        </li>
                        <li>
                            <a href="#0">Affiliates</a>
                        </li>
                        <li>
                            <a href="#0">Plans</a>
                        </li>
                        <li>
                            <a href="#0">FAQ</a>
                        </li>
                        <li>
                            <a href="#0">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-area">
                        <div className="left">
                            <p>&copy; 2020 <a href="#0">Trontree</a> | All right reserved</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </footer>
             
    </div>

      <Notif
        global_error={props.global_error}
        global_error_ret={props.global_error_ret}
        global_error_clr={props.global_error_clr}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  global_store: state.global_store,
  global_error_ret: state.global_store.global_error_ret,
});

export default connect(mapStateToProps, {
  global_error,
  global_error_clr,
})(Participant);
