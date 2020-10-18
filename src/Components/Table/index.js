import React from "react"
import Row from "./Row"
import Card from "../Card"
import AnimatedMount from "../../HOC/AnimatedMount"
const Table = (props) => {
    return <React.Fragment>
        <span className="heading-primary--table_heading ">{props.heading?props.heading:'Heading'}</span>
        <Card>
            <div className="table_wrap">
            {props.children}
            </div>
        </Card>
    </React.Fragment>
}
export default AnimatedMount({
    unmountedStyle: {
      opacity: 0,
      transform: 'translate3d(0, -2rem, 0)',
      transition: 'opacity 100ms ease-out, transform 100ms ease-out',
    },
    mountedStyle: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: 'opacity .5s ease-out, transform .5s ease-out',
    },
  })(Table) 