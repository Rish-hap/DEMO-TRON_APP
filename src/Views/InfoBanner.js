import React from "react"

const InfoBanner = (props) => {
   console.log(props,"props in InfoBanner")

    if(!props.tron_web.installed){
        return <React.Fragment>
                 <section id="cta" className="cta">
            <div className="container" data-aos="zoom-in">
                <div className="text-center">
                    <h3>Install TronLink</h3>
                    <p>
                       It seems that you don't have TronLink installed yet please install TronLink to Continue
                    </p>
                    <a className="cta-btn" href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">
                      Install TronLink
                    </a>
                </div>
            </div>
      </section>
        </React.Fragment>
    }else if(!props.tron_web.loggedIn){
       return <React.Fragment>
                     <section id="cta" className="cta">
            <div className="container" data-aos="zoom-in">
                <div className="text-center">
                    <h3>Login to TronLink</h3>
                    <p>
                     It seems that you have not logged in to your TronLink account. Please login on TronLink account to continue
                    </p>
                    <a className="cta-btn" href="#">
                     Log In
                    </a>
                </div>
            </div>
      </section>
        </React.Fragment>
    }
}
export default InfoBanner