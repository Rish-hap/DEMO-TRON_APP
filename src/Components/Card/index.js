import React from "react"

const Card = (props) => {
    return <React.Fragment>
          <div className={`${props.className} card`} >
            {props.children}
           </div>
    </React.Fragment>
}
export default Card