import React from "react"
import  Button from "../Buttons/index"

const Cycle = (props) => {
    return <React.Fragment>
            <div className="cycle_wrapper">
                    <span className="cycle_button_span">
                       <Button id="cycle_button" onClick={(e)=>{if(!!e){e.preventDefault() 
                         e.stopPropagation()}}} className="cycle_button btn_class btn_class--red">Cycle One</Button>
                    </span>
                    <span className="cycle_info_span">
                        <span className="cycle_info_child">
                                10-05-2020
                        </span>
                        <span className="cycle_info_child">
                                 25-05-2020
                        </span>
                        <span className="cycle_info_child">
                                 2500 TRON
                        </span>
                        <span className="cycle_info_child">
                                  200 TRON
                        </span>
                    </span>
            </div>
    </React.Fragment>
}

export default Cycle