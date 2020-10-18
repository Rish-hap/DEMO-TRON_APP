import React from "react";
import {
  nonNegative,
  onlyAlphabets,
  onlyAlphabets2,
  is_positive_whole_number,
  uptoTwoDeciaml,
  validateNoSpace,
  uptoTwoDeciaml2,
  positiveNumbersUpto100,
  positiveNumbersIncludingZero,
  validateAlphaNumeric,
  only_alphabets,
} from "../../utils/common_utilities";
import SelectComponent from "../Select";
import AnimatedMount from "../../HOC/AnimatedMount";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { isValidPhoneNumber } from "react-phone-number-input";

import "./index.scss";
// import labelInfo from "img/labelInfo.png"
let labelInfo = "";

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      password: true,
      value: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick(e, name) {
    // e.preventDefault()
    // e.stopPropagation()
    // console.log(name, this.refs, "lololo ")
    // document.getElementById("up").click()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.error,
    });
  }

  handleOnChange(e) {
    if (this.props.type === "country") {
      if (!!this.state.error) {
        this.props.toggleError();
      }
      this.props.onChange(e, "country");
    } else if (this.props.type === "state") {
      if (!!this.state.error) {
        this.props.toggleError();
      }
      this.props.onChange(e, "state");
    } else {
      let validation = this.props.validationProps.validation;
      let validationProps = this.props.validationProps;
      let value = e.target.value;

      console.log(validation, "only_alphabets");
      if (!!validation) {
        if (validation === "only_alphabets") {
          if (!!only_alphabets(value)) {
            if (!!this.state.error) {
              this.props.toggleError();
            }
            this.props.onChange(e);
          } else {
            e.stopPropagation();
          }
        } else if (validation === "positive_greater_than_zero") {
          if (!!is_positive_whole_number(value)) {
            if (!!this.state.error) {
              this.props.toggleError();
            }
            this.props.onChange(e);
          } else {
            e.stopPropagation();
          }
        }
      } else {
        console.log("else -> input validation");
        if (!!this.state.error) {
          this.props.toggleError();
        }
        this.props.onChange(e);
      }
    }
  }

  render() {
    // console.log("this.propssssssssssssssssssssss", this.props)
    if (this.props.type === "state") {
      return (
        <div
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {!!this.props.infoId && (
                <React.Fragment>
                  {/* <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} /> */}
                  {/* <TooltipComponent heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} /> */}
                </React.Fragment>
              )}
            </label>
          )}
          <RegionDropdown
            id="region"
            labelType="full"
            blankOptionLabel="Enter State"
            className={`regin ${
              this.state.error ? "inputcomponent_error" : ""
            }`}
            country={this.props.country}
            value={this.props.value}
            onChange={(e) => this.handleOnChange(e)}
          />
          <span
            className={`inputcomponent_error_message ${
              !!this.state.error ? "display-block" : "display-none"
            }`}
          >
            {this.props.errorText}
          </span>
        </div>
      );
    } else if (this.props.type === "country") {
      return (
        <div
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {!!this.props.infoId && (
                <React.Fragment>
                  {/* <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} /> */}
                  {/* <TooltipComponent heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} /> */}
                </React.Fragment>
              )}
            </label>
          )}
          <CountryDropdown
            id="country"
            labelType="full"
            className={`country ${
              this.state.error ? "inputcomponent_error" : ""
            }`}
            placeholder="Enter Country"
            value={this.props.value}
            onChange={(e) => this.handleOnChange(e)}
          />
          <span
            className={`inputcomponent_error_message ${
              !!this.state.error ? "display-block" : "display-none"
            }`}
          >
            {this.props.errorText}
          </span>
        </div>
      );
    } else if (this.props.type === "text" || this.props.type === "number") {
      return (
        <div
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {!!this.props.infoId && (
                <React.Fragment>
                  {/* <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} /> */}
                  {/* <TooltipComponent heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} /> */}
                </React.Fragment>
              )}
            </label>
          )}
          <input
            disabled={!!this.props.disabled}
            // placeholder={!!this.props.value?this.props.value:this.props.label}
            placeholder={this.props.placeholder}
            id={this.props.name}
            onChange={(e) => this.handleOnChange(e)}
            style={this.props.inputStyle}
            type={this.props.type}
            required={this.props.required}
            value={this.props.value}
            step={this.props.step || "any"}
            className={
              !!this.state.error
                ? !!this.props.inputErrorClassName
                  ? this.props.inputErrorClassName
                  : "inputcomponent_error"
                : !!this.props.inputClassName
                ? `${this.props.inputClassName}`
                : `inputcomponent_input`
            }
          />
          <span
            className={`inputcomponent_error_message ${
              !!this.state.error ? "display-block" : "display-none"
            }`}
          >
            {this.props.errorText}
          </span>
        </div>
      );
    } else if (this.props.type === "dropdown") {
      // console.log(this.props, "props in dropdown")
      return (
        <div
          key={this.props.key}
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {!!this.props.infoId && (
                <React.Fragment>
                  {/* <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} /> */}
                  {/* <TooltipComponent heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} /> */}
                </React.Fragment>
              )}
            </label>
          )}
          {
            //  <select
            //  id={this.props.name}
            //  // placeholder={!!this.props.placeholder?this.props.placeholder:!!this.props.value?this.props.value:this.props.label}
            //  placeholder = {this.props.placeholder}
            //  className={!!this.state.error?`inputcomponent_error`:this.props.disabled?'inputcomponent_dropdown disable-dropdown':'inputcomponent_dropdown'}
            //  value={this.props.value}
            // style={this.props.inputStyle}
            //  onChange={(e) =>this.handleOnChange(e)}
            //  required
            //  disabled={!!this.props.disabled}
            //  >
            //  <option  disabled={!!this.props.disabled} value={undefined}>--SELECT ONE--</option>
            //  {this.props.options.map(item=>{
            //    return(
            //      <option  disabled={!!this.props.disabled} value={item.value}>{item.name}</option>
            //    )
            //  })}
            //  </select>
          }

          <SelectComponent
            id={this.props.name}
            // label="React Select"
            placeholder={this.props.placeholder}
            name={this.props.name}
            onChange={(e) => this.handleOnChange(e)}
            value={this.props.value}
            options={
              typeof this.props.options === "function"
                ? this.props.options()
                : this.props.options
            }
            disabled={this.props.disabled}
            className={this.props.className}
            style={this.props.style}
          />

          {
            // <input placeholder={this.props.placeholder} onChange={this.onChange}  type="select" required={this.props.required} value={this.state.value}  className={!!this.state.error?`inputcomponent_error`:'inputcomponent_input'} />
          }
          <span
            className={`inputcomponent_error_message ${
              !!this.state.error ? "display-block" : "display-none"
            }`}
          >
            {this.props.errorText}
          </span>
        </div>
      );
    } else if (this.props.type === "password") {
      return (
        <div
          key={this.props.key}
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {!!this.props.infoId && (
                <React.Fragment>
                  {/* <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} /> */}
                  {/* <TooltipComponent heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} /> */}
                </React.Fragment>
              )}
            </label>
          )}
          <input
            style={this.props.inputStyle}
            disabled={!!this.props.disabled}
            // placeholder={!!this.props.placeholder?this.props.placeholder:!!this.props.value?this.props.value:this.props.label}
            placeholder={this.props.placeholder}
            id={this.props.name}
            onChange={(e) => this.handleOnChange(e)}
            type={this.state.password ? "password" : "text"}
            required={this.props.required}
            value={this.props.value}
            className={
              !!this.state.error
                ? !!this.props.inputErrorClassName
                  ? this.props.inputErrorClassName
                  : "inputcomponent_error_auth"
                : !!this.props.inputClassName
                ? `${this.props.inputClassName}`
                : `inputcomponent_input`
            }
          />
          <span
            onClick={() => this.setState({ password: !this.state.password })}
            toggle="#password-field"
            className=" field-icon toggle-password"
          >
            {" "}
            <i
              style={{ color: "#000" }}
              className={
                this.state.password
                  ? "fa fa-fw fa-eye-slash password_eye"
                  : "fa fa-fw fa-eye password_eye"
              }
            />{" "}
          </span>
          <span
            className={`inputcomponent_error_message ${
              !!this.state.error ? "display-block" : "display-none"
            }`}
          >
            {this.props.errorText}
          </span>
        </div>
      );
    } else if (this.props.type === "textarea") {
      return (
        <div
          key={this.props.key}
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {!!this.props.infoId && (
                <React.Fragment>
                  {/* <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} /> */}
                  {/* <TooltipComponent heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} /> */}
                </React.Fragment>
              )}
            </label>
          )}
          <textarea
            style={this.props.inputStyle}
            disabled={!!this.props.disabled}
            id={this.props.name}
            // placeholder={!!this.props.placeholder?this.props.placeholder:!!this.props.value?this.props.value:this.props.label}
            placeholder={this.props.placeholder}
            rows={!!this.props.rows ? this.props.rows : 5}
            onChange={(e) => this.handleOnChange(e)}
            type={this.props.type}
            required={this.props.required}
            value={this.props.value}
            className={
              !!this.state.error
                ? `inputcomponent_error`
                : !!this.props.inputClassName
                ? `${this.props.inputClassName}`
                : `inputcomponent_input inputcomponent_textarea `
            }
          ></textarea>
          <span
            className={`inputcomponent_error_message ${
              !!this.props.error ? "display-block" : "display-none"
            }`}
          >
            {this.props.errorText}
          </span>
        </div>
      );
    } else if (this.props.type === "image") {
      return (
        <div
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {!!this.props.infoId && (
                <React.Fragment>
                  {/* <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} /> */}
                  {/* <TooltipComponent heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} /> */}
                </React.Fragment>
              )}
            </label>
          )}

          <div
            style={{ display: "flex" }}
            onClick={(e) => this.handleImageClick(e, this.props.name)}
            className=" inputcomponent_input  upload-fileUpload upload-btn upload-btn-orange"
          >
            <img
              style={{ display: "inline" }}
              src="https://image.flaticon.com/icons/svg/136/136549.svg"
              className="upload-icon"
            />
            {
              // <span className="upload-upl" id="upload">Upload document</span>
              // dfeidbfebfebfbfbbfeubeb
            }
            {
              // <input type="file" id="up"  onChange ={this.props.onChange} className="upload-upload upload-up" />
            }
            <input
              disabled={!!this.props.disabled}
              style={{ display: "inline" }}
              type="file"
              accept=".pdf, .docx, image/jpe ,image/png, image/jpeg"
              id={this.props.name}
              onChange={this.props.onChange}
              name="back_id"
              required={this.props.required}
            />
          </div>
        </div>
      );
    } else if (this.props.type === "newtext") {
      return (
        <div
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {!!this.props.infoId && (
                <React.Fragment>
                  {/* <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} /> */}
                  {/* <TooltipComponent heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} /> */}
                </React.Fragment>
              )}
            </label>
          )}
          <input
            disabled={!!this.props.disabled}
            // placeholder={!!this.props.value?this.props.value:this.props.label}
            placeholder={this.props.placeholder}
            id={this.props.name}
            onChange={(e) => this.handleOnChange(e)}
            style={this.props.inputStyle}
            type={this.props.type}
            required={this.props.required}
            value={this.props.value}
            step={this.props.step || "any"}
            className={
              !!this.state.error
                ? !!this.props.inputErrorClassName
                  ? this.props.inputErrorClassName
                  : "inputcomponent_error"
                : !!this.props.inputClassName
                ? `${this.props.inputClassName}`
                : `inputcomponent_input`
            }
          />
          <span
            className={`inputcomponent_error_message ${
              !!this.state.error ? "display-block" : "display-none"
            }`}
          >
            {this.props.errorText}
          </span>
        </div>
      );
    } else if (this.props.type === "date") {
      return (
        <div
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {!!this.props.infoId && (
                <React.Fragment>
                  {/* <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} /> */}
                  {/* <TooltipComponent heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} /> */}
                </React.Fragment>
              )}
            </label>
          )}
          <input
            disabled={!!this.props.disabled}
            // placeholder={!!this.props.value?this.props.value:this.props.label}
            placeholder={this.props.placeholder}
            id={this.props.name}
            onChange={(e) => this.handleOnChange(e)}
            style={this.props.inputStyle}
            type={this.props.type}
            required={this.props.required}
            value={this.props.value}
            step={this.props.step || "any"}
            className={
              !!this.state.error
                ? !!this.props.inputErrorClassName
                  ? this.props.inputErrorClassName
                  : "inputcomponent_error"
                : !!this.props.inputClassName
                ? `${this.props.inputClassName}`
                : `inputcomponent_input`
            }
          />
          <span
            className={`inputcomponent_error_message ${
              !!this.state.error ? "display-block" : "display-none"
            }`}
          >
            {this.props.errorText}
          </span>
        </div>
      );
    } else if (this.props.type === "newdropdown") {
      // console.log(this.props, "props in dropdown")
      return (
        <div
          key={this.props.key}
          style={{ ...this.props.inputWrapperStyle, marginTop: "10px" }}
          className={
            !!this.props.wrapperClass
              ? `${this.props.wrapperClass} inputcomponent_group`
              : "inputcomponent_group"
          }
        >
          {this.props.noLabel === true ? (
            ""
          ) : (
            <label
              style={this.props.inputLabelClass}
              style={{ color: "#909090", fontWeight: "400" }}
              className="inputcomponent_label"
            >
              {this.props.label}
              {
                // this.props.required===true?'*':''
              }
              {/* {!!this.props.infoId && <React.Fragment>
              <img data-for={this.props.infoId} data-tip='1' src={labelInfo} style={{ cursor: 'pointer', float: 'right', height: '15px', width: '15px' }} />
              <TooltipComponent place={`left`} heading={this.props.infoHeading} bodyText={this.props.infoText} id={this.props.infoId} />
            </React.Fragment>} */}
            </label>
          )}
          {
            //  <select
            //  id={this.props.name}
            //  // placeholder={!!this.props.placeholder?this.props.placeholder:!!this.props.value?this.props.value:this.props.label}
            //  placeholder = {this.props.placeholder}
            //  className={!!this.state.error?`inputcomponent_error`:this.props.disabled?'inputcomponent_dropdown disable-dropdown':'inputcomponent_dropdown'}
            //  value={this.props.value}
            // style={this.props.inputStyle}
            //  onChange={(e) =>this.handleOnChange(e)}
            //  required
            //  disabled={!!this.props.disabled}
            //  >
            //  <option  disabled={!!this.props.disabled} value={undefined}>--SELECT ONE--</option>
            //  {this.props.options.map(item=>{
            //    return(
            //      <option  disabled={!!this.props.disabled} value={item.value}>{item.name}</option>
            //    )
            //  })}
            //  </select>
          }

          <SelectComponent
            id={this.props.name}
            // label="React Select"
            placeholder={this.props.placeholder}
            name={this.props.name}
            onChange={(e) => this.handleOnChange(e)}
            value={this.props.value}
            options={
              typeof this.props.options === "function"
                ? this.props.options()
                : this.props.options
            }
            disabled={this.props.disabled}
            className={this.props.className}
            style={this.props.style}
            selectStyle={{
              borderRadius: 25,
            }}
          />

          {
            // <input placeholder={this.props.placeholder} onChange={this.onChange}  type="select" required={this.props.required} value={this.state.value}  className={!!this.state.error?`inputcomponent_error`:'inputcomponent_input'} />
          }
          <span
            className={`inputcomponent_error_message ${
              !!this.state.error ? "display-block" : "display-none"
            }`}
          >
            {this.props.errorText}
          </span>
        </div>
      );
    }
  }
}

export default AnimatedMount({
  unmountedStyle: {
    opacity: 0,
    transform: "translate3d(0, -2rem, 0)",
    transition: "opacity 100ms ease-out, transform 100ms ease-out",
  },
  mountedStyle: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    transition: "opacity .5s ease-out, transform .5s ease-out",
  },
})(InputComponent);
