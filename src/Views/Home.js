import React from "react"

const Home  = (props) => {
    return ( <React.Fragment>
        <header id="header" className="d-flex align-items-center">
          <div className="container d-flex align-items-center">
      
            <div className="logo mr-auto">
               <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
            </div>
      
            <nav className="nav-menu d-none d-lg-block">
              <ul>
                <li className="active"><a href="#hero">Home</a></li>
                <li className="drop-down"><a href="">About us</a>
                  <ul>
                    <li><a href="#cta">Basic Matter</a></li>
                    <li><a href="#">Concept</a></li>
                    <li><a href="#">White Paper</a></li>
                  </ul>
                </li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#">Join us</a></li>
                <li><a href="#">Login</a></li>
              </ul>
            </nav>
          </div>
        </header>
      
        <section id="hero">
      
          <div className="container">
            <div className="row">
              <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <div>
                  <img src="assets/img/ethertree.png" className="img-fluid" style={{height:'50px'}} />
                  <br/>
                  <br/>
                  <h4>Smart, Simple, Secure, Stable</h4>
                  <p>Raise funds with the power Highly Mathematical Calculation. Very low risk with the transparency of Blockchain Smart Contract. Let’s start growing funds <span>@1.25%</span> per day, Net <span>30%</span> per month</p>
                  <a href="#" className="btn-get-started scrollto">Join Community today</a>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 hero-img in-down">
                <img src="assets/img/logo.png" className="img-fluid" alt="" style={{height:'300px'}} />
              </div>
            </div>
          </div>
      
        </section>
      
        <section id="counts" className="counts section-bg">
            <div className="container">
      
              <div className="row justify-content-end">
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="assets/img/icons/balance.svg" className="img-fluid" />
                      <span data-toggle="counter-up">1349</span>
                    <p>Contract Balance</p>
                  </div>
                </div>
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="assets/img/icons/participants.svg" className="img-fluid" />
                      <span data-toggle="counter-up">65</span>
                    <p>Participants</p>
                  </div>
                </div>
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="assets/img/icons/withdrawal.svg" className="img-fluid" />
                      <span data-toggle="counter-up">960</span>
                    <p>Today's withdrawal</p>
                  </div>
                </div>
      
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                      <img src="assets/img/icons/secure-fund.svg" className="img-fluid" />
                      <span data-toggle="counter-up">500</span>
                    <p>Secure Fund</p>
                  </div>
                </div>
      
              </div>
      
            </div>
          </section>
      
          <section id="about" className="about">
            <div className="container">
      
              <div className="row">
                <div className="col-xl-5 col-lg-5 d-flex justify-content-center video-box align-items-stretch">
                  <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" target="_blank" className="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
                </div>
      
                <div className="col-xl-7 col-lg-7 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
                  <p>Developed with the network marketing experience of more than 20 years, Ether Tree allows you to grow your fund through the power of circulation. An authenticated and trusted platform with superb and systematic mechanism. The global community is ready to move towards financial freedom. </p>
      
                </div>
              </div>
      
            </div>
          </section>
      
      
      
       <section className="about">
        <div className="container">
          <div className="icon-boxes text-center">
             <h3>Our Process</h3>
          </div>
        </div>
      </section>
      
      <section id="section_hiw" className="user-land-history cryp-section" style={{paddingTop:0}}>
          <div className="container" style={{position:'relative', zIndex:'2'}}>
            
              
            
              <div className="user-land-history__items">
                  <div className="row">
                      
                      
                      <div className="col-md-6 js-animate translate40">
                          <div className="history-item history-item--congress history-item--congress-spain history-item--left">
                              <div className="history-item__wrapper">
                                  <img src=""
                                   style={{position:'absolute', top:'-32px', left:'-32px', display:'block', width:'128px', height:'128px'}}
                                   /> 
                                  <h3 className="history-item__title">Registration</h3>
                                  <div className="history-item__place history-item__place-guarantee"> Step 1</div>
                                  <p className="history-item__desc">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe
                                       
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-6 js-animate translate40">
                          <div className="history-item history-item--blockchain history-item--right">
                              <div className="history-item__wrapper">
                              <img src=""
                                   style={{position:'absolute', top:'-32px', left:'-32px', display:'block', width:'128px', height:'128px'}}
                                   /> 
                                  <h3 className="history-item__title">Wallet Registration</h3>
                                  <div className="history-item__place history-item__place-guarantee"> Step 2</div>
                                  <p className="history-item__desc">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-6 js-animate translate40">
                          <div className="history-item history-item--leadership history-item--munich history-item--left">
                              <div className="history-item__wrapper">
                              <img src=""
                                   style={{position:'absolute', top:'-32px', left:'-32px', display:'block', width:'128px', height:'128px'}}
                                   /> 
                                  <h3 className="history-item__title">Principal Fund Deposit</h3>
                                  <div className="history-item__place history-item__place-guarantee"> Step 3</div>
                                  <p className="history-item__desc">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-6 js-animate translate40">
                          <div className="history-item history-item--blockchain history-item--right">
                              <div className="history-item__wrapper" >
                              <img src=""
                                   style={{position:'absolute', top:'-32px', left:'-32px', display:'block', width:'128px', height:'128px'}}
                                   /> 
                                  <h3 className="history-item__title">Start Growth Cycle</h3>
                                  <div className="history-item__place history-item__place-guarantee"> Step 4</div>
                                  <p className="history-item__desc">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-6 js-animate translate40">
                          <div className="history-item history-item--leadership history-item--berlin history-item--left">
                              <div className="history-item__wrapper">
                              <img src=""
                                   style={{position:'absolute', top:'-32px', left:'-32px', display:'block', width:'128px', height:'128px'}}
                                   /> 
                                  <h3 className="history-item__title">Withdrawal Compound</h3>
                                  <div className="history-item__place history-item__place-guarantee"> Step 5</div>
                                  <p className="history-item__desc">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe
                                  </p>
                              </div>
                          </div>
                      </div>
                      
                      <div className="col-md-6 js-animate translate40" >
                          <div className="history-item history-item--leadership history-item--koln history-item--right">
                              <div className="history-item__wrapper" style={{background:'#3bb83b'}} >
                              <img src=""
                                   style={{position:'absolute', top:'-32px', left:'-32px', display:'block', width:'128px', height:'128px'}}
                                   /> 
                                  
                                  <h3 className="history-item__title">Restart Growth Cycle</h3>
                                  <div className="history-item__place history-item__place-guarantee"> Step 6</div>
                                  <p className="history-item__desc">
                                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe
                                  </p>
                              </div>
                          </div>
                      </div>
                      
                  </div>
              </div>
              
              
      
          </div>
       
      </section>
      
      <section className="user-land-advantages  cryp-section translate40 js-animate" style={{background:'#2a2d33'}}>
      
          <span className="user-land-advantages__left"></span>
          <span className="user-land-advantages__right"></span>
          <div className="container">
              <div className="section-title">
                <h2 style={{color:'#fff'}}>Advantages</h2>
              </div>
              
              <div className="row">
                  <div className="col-md-5">
                      <div className="user-land-advantage__item js-animate translate40">
                          <div className="user-land-advantage__value">Smart</div>
                          <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                      </div>
                      <div className="user-land-advantage__item js-animate translate40">
                          <div className="user-land-advantage__value">Simple</div>
                          <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                      </div>
                  </div>
                  
                      
                  <div className="col-md-2 text-center js-animate translate40">
                    <img src="assets/img/ether-logo.png" className="img-fluid" style={{height:'60%'}} />
                  </div>
                  
                  <div className="col-md-5 ">
                      <div className="user-land-advantage__item user-land-advantage__item--right js-animate translate40">
                        
                          <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                          <div className="user-land-advantage__value">Secure</div>
                      </div>
                      <div className="user-land-advantage__item user-land-advantage__item--right js-animate translate40">
                        
                          <div className="user-land-advantage__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe</div>
                          <div className="user-land-advantage__value">Stable</div>
                      </div>
      
                  </div>
              </div>
              
          </div>
      
      </section>
      
      
      
      
 <section className="advantage section bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Advantages</h2>
                
              </div> 
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 align-self-center">
        
        <div className="service-block shadow">
        <img src="assets/img/icons/smart.svg" className="img-fluid" />
        <h3>Smart</h3>
      </div>
        
        <div className="service-block shadow">
        <img src="assets/img/icons/simple.svg" className="img-fluid" />
        <h3>Simple</h3>
      </div>
            </div>
            
        <div className="col-lg-4 m-auto">
          <div className="app-preview">
            <img src="assets/img/ether-logo.png" />        
          </div>
        </div>
      
        <div className="col-lg-4 col-md-6 align-self-center">
        
        <div className="service-block shadow">
        <img src="assets/img/icons/secure.svg" className="img-fluid" />
        <h3>Secure</h3>
      </div>
      
        <div className="service-block shadow">
        <img src="assets/img/icons/stable.svg" className="img-fluid" />
        <h3>Stable</h3>
      </div>
      
            </div>
          </div>
        </div>
      </section> 
      
      <section className="about">
        <div className="container">
          <div className="icon-boxes text-center">
             <h3 style={{marginBottom:'5%'}}>Our Process</h3>
          </div>
            
            <div className="row justy-content-center">
                <div className="col-lg-3 col-sm-6 col-md-6">
                    <div className="text-center">
                        <div className="process">
                          <img src="assets/img/process/upload.jpg" className="img-fluid" />
                        </div>
                        <h4>Upload fund</h4>
                        <p>Register and Deposit your funds in Smart Contract</p>
                    </div>
                </div>
      
                <div className="col-lg-3 col-sm-6 col-md-6">
                    <div className="text-center">
                        <div className="process">
                          <img src="assets/img/process/start-cycle.jpg" className="img-fluid" />
                        </div>
                        <h4>Start Cycle</h4>
                        <p>Start your 15 days Funds Grow Cycle by clicking on “start” Button</p>
                    </div>
                </div>
      
                <div className="col-lg-3 col-sm-6 col-md-6">
                    <div className="text-center">
                        <div className="process">
                          <img src="assets/img/process/growth.jpg" className="img-fluid" />
                        </div>
                        <h4>Enjoy Growth</h4>
                        <p>Watch the growth of fund @1.25% per day</p>
                    </div>
                </div>
      
                <div className="col-lg-3 col-sm-6 col-md-6">
                    <div className="text-center">
                        <div className="process">
                          <img src="assets/img/process/withdrawal.jpg" className="img-fluid" />
                        </div>
                        <h4>Withdrawal</h4>
                        <p>Enjoy growth fund after the end of every fund grow cycle </p>
                    </div>
                </div>
            </div>
        </div> 
      </section> 
      
        <section className="services section-bg">
            <div className="container" data-aos="fade-up">
      
              <div className="section-title">
                <h2>3 Steps of Abundance</h2>
              </div>
      
              <div className="row">
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                  <div className="icon-box iconbox-blue">
                    <div className="icon">
                      <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="none" strokeWidth="0" fill="#f5f5f5" d="M300,521.0016835830174C376.1290562159157,517.8887921683347,466.0731472004068,529.7835943286574,510.70327084640275,468.03025145048787C554.3714126377745,407.6079735673963,508.03601936045806,328.9844924480964,491.2728898941984,256.3432110539036C474.5976632858925,184.082847569629,479.9380746630129,96.60480741107993,416.23090153303,58.64404602377083C348.86323505073057,18.502131276798302,261.93793281208167,40.57373210992963,193.5410806939664,78.93577620505333C130.42746243093433,114.334589627462,98.30271207620316,179.96522072025542,76.75703585869454,249.04625023123273C51.97151888228291,328.5150500222984,13.704378332031375,421.85034740162234,66.52175969318436,486.19268352777647C119.04800174914682,550.1803526380478,217.28368757567262,524.383925680826,300,521.0016835830174"></path>
                      </svg>
                      <i className="bx bxs-cloud-upload"></i>
                    </div>
                    <h4><a href="">Fund Upload</a></h4>
                  </div>
                </div>
      
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
                  <div className="icon-box iconbox-orange ">
                    <div className="icon">
                      <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="none" strokeWidth="0" fill="#f5f5f5" d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"></path>
                      </svg>
                      <i className="bx bxs-pie-chart"></i>
                    </div>
                    <h4><a href="">Growth Compound</a></h4>
                  </div>
                </div>
      
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="300">
                  <div className="icon-box iconbox-pink">
                    <div className="icon">
                      <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="none" strokeWidth="0" fill="#f5f5f5" d="M300,541.5067337569781C382.14930387511276,545.0595476570109,479.8736841581634,548.3450877840088,526.4010558755058,480.5488172755941C571.5218469581645,414.80211281144784,517.5187510058486,332.0715597781072,496.52539010469104,255.14436215662573C477.37192572678356,184.95920475031193,473.57363656557914,105.61284051026155,413.0603344069578,65.22779650032875C343.27470386102294,18.654635553484475,251.2091493199835,5.337323636656869,175.0934190732945,40.62881213300186C97.87086631185822,76.43348514350839,51.98124368387456,156.15599469081315,36.44837278890362,239.84606092416172C21.716077023791087,319.22268207091537,43.775223500013084,401.1760424656574,96.891909868211,461.97329694683043C147.22146801428983,519.5804099606455,223.5754009179313,538.201503339737,300,541.5067337569781"></path>
                      </svg>
                      <i className="bx bx-money"></i>
                    </div>
                    <h4><a href="">Incentive Compound</a></h4>
                  </div>
                </div>
      
              </div>
      
            </div>
          </section>
      
          <section className="levels section-bg">
            <div className="container" data-aos="fade-up">
      
              <div className="section-title">
                <h2>50 Levels referral program</h2>
                <p>Ether Tree system provides a 50 level referral program in which you can start as a participant and then you become a trainer and a manager… it is such a tremendous referral program that raises your growth cycle fund exorbitantly, raising your growth fund you get after every growth cycle constantly. You also get a great stable financial freedom that you always expect from a referral program. </p>
      
                <p style={{color:'#D40000'}}>Referral others is not mediatory to withdrawal the growth fund after every cycle</p>
      
                <a href="#" className="btn-get-started scrollto animate__animated animate__fadeInUp">Join Community today</a>
              </div>
      
              <div className="row">
                
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
                  <div className="icon-box">
                    <h4><a href="">Level 1</a></h4>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
                  <div className="icon-box">
                    <h4><a href="">Level 2</a></h4>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
                  <div className="icon-box">
                    <h4><a href="">Level 3</a></h4>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
                  <div className="icon-box">
                    <h4><a href="">Level 4</a></h4>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
                  <div className="icon-box">
                    <h4><a href="">Level 5</a></h4>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
                  <div className="icon-box">
                    <h4><a href="">Level 6</a></h4>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
                  <div className="icon-box">
                    <h4><a href="">Level 7</a></h4>
                  </div>
                </div>
      
              </div>
      
            </div>
          </section>
      
          <section id="cta" className="cta">
            <div className="container" data-aos="zoom-in">
              <div className="text-center">
                <h3>About us</h3>
                <p>The state of art concept based on advanced mathematical calculations in which you earn with a growth of 1.25% per day, net 30% per month, by initiating / starting with a little spare fund. </p>
                <a className="cta-btn" href="#">Join us</a>
              </div>
            </div>
          </section>
     
      
          <section id="faq" className="faq section-bg">
            <div className="container" data-aos="fade-up">
      
              <div className="section-title">
                <h2>Frequently Asked Questions</h2>
              </div>
      
              <div className="faq-list">
                <ul>
                  <li data-aos="fade-up">
                    <i className="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" className="collapse" href="#faq-list-1">Non consectetur a erat nam at lectus urna duis? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-1" className="collapse show" data-parent=".faq-list">
                      <p>
                        Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                      </p>
                    </div>
                  </li>
      
                  <li data-aos="fade-up" data-aos-delay="100">
                    <i className="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" href="#faq-list-2" className="collapsed">Feugiat scelerisque varius morbi enim nunc? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-2" className="collapse" data-parent=".faq-list">
                      <p>
                        Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                      </p>
                    </div>
                  </li>
      
                  <li data-aos="fade-up" data-aos-delay="200">
                    <i className="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" href="#faq-list-3" className="collapsed">Dolor sit amet consectetur adipiscing elit? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-3" className="collapse" data-parent=".faq-list">
                      <p>
                        Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                      </p>
                    </div>
                  </li>
      
                  <li data-aos="fade-up" data-aos-delay="300">
                    <i className="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" href="#faq-list-4" className="collapsed">Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-4" className="collapse" data-parent=".faq-list">
                      <p>
                        Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in.
                      </p>
                    </div>
                  </li>
      
                  <li data-aos="fade-up" data-aos-delay="400">
                    <i className="bx bx-help-circle icon-help"></i> <a data-toggle="collapse" href="#faq-list-5" className="collapsed">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                    <div id="faq-list-5" className="collapse" data-parent=".faq-list">
                      <p>
                        Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque.
                      </p>
                    </div>
                  </li>
      
                </ul>
              </div>
      
            </div>
          </section>
      
        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
      
                <div className="col-lg-4 col-md-6">
                  <div className="footer-info">
                    <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
                    <p>
                       Raise funds with the power Highly Mathematical Calculation. Very low risk with the transparency of Blockchain Smart Contract. Let’s start growing funds @1.25% per day, Net 30% per month
                    </p>
                    <div className="social-links mt-3">
                      <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                      <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                      <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                      <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                      <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                  </div>
                </div>
      
                <div className="col-lg-4 col-md-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Why we</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Our Process</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">3 Steps of Abundance</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Incentive Levels</a></li>
                  </ul>
                </div>
      
                <div className="col-lg-4 col-md-6 footer-links">
                  <h4>Other Links</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Testimony</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      
          <div className="container">
            <div className="copyright">
              &copy; Copyright <strong><span>Ether Tree</span></strong>. All Rights Reserved
            </div>
          </div>
        </footer>
       </React.Fragment>
      )
}

export default Home