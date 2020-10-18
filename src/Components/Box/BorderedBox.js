import React from "react"

const BorderedBox = (props) => {
    return <React.Fragment>
         <div className={`${props.className} border_box `} >
<span className="heading-primary--form_heading border_box_heading">{props.heading?props.heading:'Heading'}</span>
            <div className='border_box_background'>
                <img src="/img/box_background.png" className="desktop" />
            </div>
             {props.children}
         </div>
    </React.Fragment>
}

export default BorderedBox