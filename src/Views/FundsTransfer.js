import React from "react"
import Table from "../Components/Table"
import Button from "../Components/Buttons";
import Row from "../Components/Table/Row"
import Utils from '../utils';
function MyError(message){
    this.message = message;
  }
  MyError.prototype = new Error()
  


const FundsTransfer = (props) => {
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
    const [address, set_address] = React.useState("")
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

const address_change = (e)=>{
  console.log(e.target.value,"address")
  set_address(e.target.value)
}


const transfer_funds = async () => {
    try {
      if(!Utils.tronWeb.isAddress(address)){
        throw new MyError(`Enter a valid tron address`)
      }
        let amount = gf.deposit + uf.deposit +rf.deposit + ri.deposit
        console.log( gf.deposit , uf.deposit , rf.deposit, ri.deposit,"12121212121212>>>>>>>>>>>>>>>>>>")
        if(!!((amount) > 0)){
          set_loading(true)  
          const transfer_funds_ret =  await Utils.contract
          .transferFunds(address,Utils.tronWeb.toSun(uf.deposit), Utils.tronWeb.toSun(gf.deposit), Utils.tronWeb.toSun(rf.deposit), Utils.tronWeb.toSun(ri.deposit))
          .send({ callValue:0 })
          .catch((e) => console.log("withdraw_fund: catch err: ", e))
          if(!!transfer_funds_ret){
            props.global_error({
              success:true,
              message:"Funds successfully transfered, please wait for a few minues for transaction to be confirmed",
              heading:"Transfer funds"
            })
            set_loading(false)  
            console.log(transfer_funds_ret,"start_cycle_ret")
          }else{
            throw new MyError(`Unable to transfer funds now. try again later.`)
          }
          
        }else{
        throw new MyError(`Add amount to transfer funds`)
        }                      
      
    } catch (err) {
      console.log("Transfer funds: catch err: ", err)
      props.global_error({
        success:false,
        message:err.message,
        heading:'Transfer Funds'
      })
      set_loading(false)  
    }
}
    return (<React.Fragment>
          <Table heading="Fund Transfer">
            <Row    heading="Uploaded Fund"  data={uf} set_value={set_uf} row_type={props.row_type}/>
            <Row  heading="Received Fund"  data={rf} set_value={set_rf} row_type={props.row_type}/>
            <Row  heading="Growth Fund"    data={gf} set_value={set_gf} row_type={props.row_type}/>
            <Row  heading="Referral Incentive" data={ri} set_value={set_ri} row_type={props.row_type}/>
            {/* <Row  data={{amount:1000}} onChange={(val)=>console.log(val)} row_type={props.row_type}/> */}
            <div className="row_2_wrapper row_wrapper">
                <span className="row_item_3">
                  <text className="form-text red_color">Total Amount </text>
                </span>
                <span className="row_item_2">
                  <text className="form-text align_right">{gf.deposit + rf.deposit + uf.deposit + ri.deposit}</text>
                </span>

                <span className="row_2_item_half"></span>
              </div>

              <div className="row_2_wrapper row_wrapper">
                <span className="row_item_7">
                  <text className="form-text red_color">Address </text>
                  <input value={address} onChange={address_change} className="no_border_input" type="email" />
                </span>
                <span className="row_item_3">
                  <Button
                    id="transfer_funds_id"
                    loading={loading}
                    onClick={(e) => {
                      if (!!e) {
                        transfer_funds()
                      }
                    }}
                    className="cycle_button btn_class btn_class--black align_right"
                  >
                    Transfer
                  </Button>
                </span>
              </div>
            </Table>
    </React.Fragment>)
}

export default FundsTransfer