import React, { useEffect } from "react"
import InfoBanner from "./InfoBanner"

const NoTron = (props) => {

    useEffect(()=>{
        props.runScript()
    })
    return (
        <React.Fragment>
              <header id="header" className="d-flex align-items-center">
          <div className="container d-flex align-items-center">
      
            <div className="logo mr-auto">
               <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
            </div>
      
            <nav className="nav-menu d-none d-lg-block">
              <ul>
                {/* <li className="active"><a href="#hero">Home</a></li>
                <li className="drop-down"><a href="">About us</a>
                  <ul>
                    <li><a href="#cta">Basic Matter</a></li>
                    <li><a href="#">Concept</a></li>
                    <li><a href="#">White Paper</a></li>
                  </ul>
                </li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#">Join us</a></li>
                <li><a href="#">Login</a></li> */}
              </ul>
            </nav>
          </div>
        </header>
      
        <section id="hero">
      
          <div className="container">
            <div className="row">
              <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <div>
                  <img  src="assets/img/tron_tree_red.png" className="img-fluid" style={{height:'50px'}} />
                  <br/>
                  <br/>
                  <h4>Smart, Simple, Secure, Stable</h4>
                  <p>Raise funds with the power Highly Mathematical Calculation. Very low risk with the transparency of Blockchain Smart Contract. Let’s start growing funds <span>@1.25%</span> per day, Net <span>30%</span> per month</p>
                  <a href="#" className="btn-get-started scrollto">Join Community today</a>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 hero-img in-down">
                <img src="assets/img/spot_light.png" className="img-fluid" alt="" style={{height:'300px'}} />
              </div>
            </div>
          </div>
      
        </section>
      
      <InfoBanner tron_web={{
        loggedIn:false,
        installed:false
      }} />


      {/* <section className="user-land-advantages  cryp-section translate40 js-animate" style={{background:'#2a2d33'}}>
      
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
      
       */}
      
      
    
      
          {/* <section id="faq" className="faq section-bg">
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
       */}
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

export default NoTron