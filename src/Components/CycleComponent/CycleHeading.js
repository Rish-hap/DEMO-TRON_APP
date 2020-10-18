import React from "react"

const CycleHeading = (props) => {
    return <React.Fragment>
            <div className="cycle_wrapper">
                    <span className="cycle_button_span">
                       {/* <Button id="cycle_button" onClick={(e)=>{if(!!e){e.preventDefault() 
                         e.stopPropagation()}}} className="cycle_button btn_class btn_class--red">Cycle One</Button> */}
                    </span>
                    <span className="cycle_info_span">
                        <span className="cycle_info_child">
                            <text className="heading_cycle">
                                Start Date:
                            </text>
                        </span>
                        <span className="cycle_info_child">
                            <text className="heading_cycle">
                                End Date:
                            </text>
                        </span>
                        <span className="cycle_info_child">
                            <text className="heading_cycle">
                               Fund:
                            </text>
                        </span>
                        <span className="cycle_info_child">
                            <text className="heading_cycle">
                              Growth:
                            </text>
                        </span>     
                    </span>
            </div>
    </React.Fragment>
}

export default CycleHeading