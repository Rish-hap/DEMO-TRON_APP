import React from "react"
import Card from "../Components/Card";
import Button from "../Components/Buttons";
import Row from "../Components/Table/Row"
import Utils from '../utils';
function MyError(message){
    this.message = message;
  }
  MyError.prototype = new Error()
  

const WithdrawFunds = (props) => {
    const [gf, set_gf] = React.useState({
        amount:0,
        deposit:0
    })
    const [uf, set_uf] = React.useState({
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
    },[props.wf, props.uf])

    const withdraw_funds = async () => {
        try {
            let amount = gf.deposit + uf.deposit
           if(!!((amount) > 0)){
              set_loading(true)  
              const withdraw_ret =  await Utils.contract
              .withdrawFunds(Utils.tronWeb.toSun(gf.deposit), Utils.tronWeb.toSun(uf.deposit))
              .send({ callValue:0 })
              .catch((e) => console.log("withdraw_fund: catch err: ", e))
              if(!!withdraw_ret){
                props.global_error({
                  success:true,
                  message:"Funds successfully transfered, please wait for a few minues for transaction to be confirmed",
                  heading:'Withdraw Funds'
                })
                set_loading(false)  
              }else{
                throw new MyError(`Unable to withdraw funds now. try again later.`)
              }
              
           }else{
            throw new MyError(`Enter amount to be withdrawn`)
           }                      
         
        } catch (err) {
          console.log("withdraw fund: catch err: ", err)
          props.global_error({
            success:false,
            message:err.message,
            heading:'Upload Funds'
          })
          set_loading(false)  
        }
      }

    return <React.Fragment>
            <div className="upload_funds_wrapper mobile_margin_top" style={{ position: "relative" }}  >
                <span className="heading-primary--table_heading ">
                Withdraw Funds
                </span>
                <Card>
                    <div className="u-margin-top-medium">
                        <Row heading="Growth Fund"  data={gf} set_value ={set_gf} />
                        <Row heading="Uplaoded Fund"  data={uf} set_value ={set_uf} />
                        <div className="flex-tray">
                            <span className="flex-tray-30 form-text justify-content_center red-text">
                                Total Amount
                            </span>
                            <span className="flex-tray-30 form-text">
                                    {gf.deposit + uf.deposit}
                            </span>
                            <span className="flex-tray-30">
                            <Button
                                id="withdraw_funds_button"
                                loading= {!!loading}
                                onClick={(e) => {
                                if (!!e) {
                                    withdraw_funds()
                                }
                                }}
                                className="cycle_button btn_class btn_class--red"
                            >
                                Withdraw
                            </Button>
                            </span>
                        </div>

                    </div>
                </Card>
            </div>
    </React.Fragment>
}

export default  WithdrawFunds