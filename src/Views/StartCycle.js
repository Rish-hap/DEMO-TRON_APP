import React from "react"
import Table from "../Components/Table"
import Button from "../Components/Buttons";
import Row from "../Components/Table/Row"
import Utils from '../utils';
function MyError(message){
    this.message = message;
  }
  MyError.prototype = new Error()
  


const StartCycle = (props) => {
    const [gf, set_gf] = React.useState({
        amount:0,
        deposit:0
    })
    const [uf, set_uf] = React.useState({
        amount:0,
        deposit:0
    })
    const [rf, set_rf] = React.useState({
        amount:0,
        deposit:0
    })
    const [ri, set_ri] = React.useState({
        amount:0,
        deposit:0
    })
    const [loading, set_loading] = React.useState(false)


    React.useEffect(()=>{
        set_gf({
            ...gf,
            amount:props.gf
        })
        set_uf({
            ...uf,
            amount:props.uf
        })

        set_rf({
            ...rf,
            amount:props.rf
        })
        set_ri({
            ...ri,
            amount:props.ri
        })
},[props.wf, props.uf, props.rf, props.ri])


    const start_cycle = async () => {
        try {
            let amount = gf.deposit + uf.deposit +rf.deposit + ri.deposit
           if(!!((amount) > 0)){
              set_loading(true)  
              const start_cycle_ret =  await Utils.contract
              .startCycle(Utils.tronWeb.toSun(uf.deposit), Utils.tronWeb.toSun(gf.deposit), Utils.tronWeb.toSun(rf.deposit), Utils.tronWeb.toSun(ri.deposit))
              .send({ callValue:0 })
              .catch((e) => console.log("withdraw_fund: catch err: ", e))
              if(!!start_cycle_ret){
                props.global_error({
                  success:true,
                  message:"Funds successfully transfered, please wait for a few minues for transaction to be confirmed",
                  heading:'Start Cycle'
                })
                set_loading(false)  
                console.log(start_cycle_ret,"start_cycle_ret")
              }else{
                throw new MyError(`Unable to start cycle now. try again later.`)
              }
              
           }else{
            throw new MyError(`Add amount to start cycle`)
           }                      
         
        } catch (err) {
          console.log("Start Cycle: catch err: ", err)
          props.global_error({
            success:false,
            message:err.message,
            heading:'Upload Funds'
          })
          set_loading(false)  
        }
    }
    return (<React.Fragment>
          <Table heading="Start Cycle">
          <Row    heading="Uploaded Fund"  data={uf} set_value={set_uf} row_type={props.row_type}/>
            <Row  heading="Received Fund"  data={rf} set_value={set_rf} row_type={props.row_type}/>
            <Row  heading="Growth Fund"    data={gf} set_value={set_gf} row_type={props.row_type}/>
            <Row  heading="Referral Incentive" data={ri} set_value={set_ri} row_type={props.row_type}/>
            {/* <Row  data={{amount:1000}} onChange={(val)=>console.log(val)} row_type={props.row_type}/> */}
              <div className="row_2_wrapper row_wrapper">
                <span className="row_2_item">
                  <span className="row_item row_item_3">
                    <text className="form-text red_color">C/F Amount </text>
                      <text className="form-text">{props.CF_Fund}</text>
                  </span>
                </span>

                <span className="row_2_item">
                  <span className="row_item row_item_3">
                    <text className="form-text red_color">New Fund</text>
                    <text className="form-text">{gf.deposit + rf.deposit + uf.deposit + ri.deposit}</text>
                  </span>
                </span>

                {window.screen.width > 767 && (
                  <span className="row_2_item"></span>
                )}
              </div>

              <div className="row_2_wrapper row_wrapper">
                <span className="row_2_item">
                  <span className="row_item row_item_3">
                    <text className="form-text red_color">Total Amount</text>
                    <text className="form-text">{gf.deposit + rf.deposit + uf.deposit + ri.deposit + props.CF_Fund}</text>
                  </span>
                </span>

                {window.screen.width > 767 && (
                  <span className="row_2_item"></span>
                )}

                <span className="row_2_item">
                  <Button
                    id="start_cycle_id"
                    loading={loading}
                    onClick={(e) => {
                      if (!!e) {
                        // e.preventDefault();
                        // e.stopPropagation();
                        start_cycle()
                      }
                    }}
                    className="cycle_button btn_class btn_class--red"
                  >
                    Start Cycle
                  </Button>
                </span>
              </div>
            </Table>
    </React.Fragment>)
}

export default StartCycle