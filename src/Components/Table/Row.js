import React from "react"
import { is_positive_whole_number } from '../../utils/common_utilities'

const Row = (props) => {
  const [value, set_value] = React.useState(0)
    const add = () => {
     let deposit = parseFloat(value)
     if(deposit>=0){
        props.set_value({
            ...props.data,
            deposit:deposit
        })
     }
    }
    const clear = () => {
         set_value(0)
         props.set_value({
            ...props.data,
            deposit:0
        })
    }
    const input_change = (e) => {
            if(!!((!!is_positive_whole_number(e.target.value)) && (e.target.value <= parseFloat(props.data.amount)))){
                set_value(e.target.value)
            }
    }
    if(props.row_type==="second"){
        return <React.Fragment>
                <div className="row_wrapper">
                    <span className="row_item row_item_1">
                        <text className="form-text">Value 1</text>
                    </span>

                    <span className="row_item row_item_1">
                         <text className="form-text">Value 1</text>
                    </span>

                    <span className="row_item row_item_1">
                       <text className="form-text">Value 1</text>
                    </span>
                    <span className="row_item row_item_1">
                         <text className="form-text">Value 1</text>
                    </span>
                    <span className="row_item row_item_1">
                       <text className="form-text">Value 1</text>
                    </span>
                    <span className="row_item row_item_1">
                         <text className="form-text">Value 1</text>
                    </span>        
                </div>
        </React.Fragment>
    }
    return <React.Fragment>
                <div className="row_wrapper">
                    <span className="row_item row_item_3">  
                        <text className="form-text">{props.heading?props.heading:"Some Heading"}</text>
                    </span>

                    <span className="row_item row_item_2">
                            <text className="form-text">{props.data.amount}</text>
                    </span>

                    <span className="row_item row_item_2">
                        <input type="text" value={value} onChange={input_change} className="row_input"  />
                    </span>
                    <span className="row_item row_item_3">
                      <text onClick={add} className="form-text red_color u-cursor-pointer">Add +</text>
                      <text onClick = {clear} className="form-text u-cursor-pointer">Clear</text>
                    </span>     
                </div>
    </React.Fragment>
}
export default Row