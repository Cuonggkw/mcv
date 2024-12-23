"use strict";

/* Package System */
import React from "react";
import { connect } from "react-redux";
import Action from "@libs/Action";
import Link from "next/link";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {IconButton,Button, TextField, Stack, Select, MenuItem} from '@mui/material';
import moment from "moment";
import dayjs from 'dayjs';
/* Package Application */
import {validationForm, fetchApi, postApi, changeToSlug } from "@helpers/Common";
import { values } from "lodash";

/* Package style */
class Datlich extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      appointmentSuccess: false,
      countdown: 60,
      msg: "",
      values: {},
      validation: {},
      status: { loading: false },
    };
  }

  async componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleIsOpen = () => {
    this.setState({appointmentSuccess: true});
  }

  handleOnChange = (e)=> {
    let _value = e.target.type==="checkbox" ? e.target.checked : e.target.value;
		this.setState({values: {...this.state.values,[e.target.name] : _value}});
  };
  
  handleSucces = (message) => {
    this.setState({
      successMessage: message,
      errorMessage: null,
      isOpen: true,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if(Object.keys(this.props.stateUser).length > 0 && Object.keys(this.state.values).length==1){
			this.initPage();
		}
  }

  handleFailure = (error) => {
    this.setState({
      successMessage: null,
      errorMessage: error,
      isOpen: true,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this._isMounted){
      let formData = {
        full_name: this.state.values.full_name,
        email: this.state.values.email,
        phone_number: this.state.values.phone_number,
        booking: this.state.values.booking != null ? moment(this.state.values.booking).format("YYYY-MM-DD") : "",
      };
      // let _validation = validationForm({...formData},'profile');

      this._isMounted && postApi(process.env.API_URL + "save-contact", formData).then((res) => {
        if(res?.response?.data?.status === "error"){
          this.handleFailure(res?.response?.data?.errors?.[0]?.msg ?? "Appointment booking failed");
        }else{
          this.handleSucces("Appointment booked successfully");
          this.setState({
            values:{
              full_name: "",
              email: "",
              phone_number: "",
              booking: ""
            },
            appointmentSuccess: true});
        }
      }).catch((error) => {
        console.log(error);
        this.handleFailure("An error occurred while booking appointment");
      })
    }
    // console.log(formData);
    this.showSuccessNotification();
  };

  showSuccessNotification = () => {
    this.setState({successNotificationVisible: true}, () => {
      setTimeout(() => {
        this.setState({successNotificationVisible: false});
      }, 3000);
    })
  };

  render() {
    let _validation = this.state.validation;
		let {values} = this.state;
		let {loading} = this.state.status;
    return (
      <React.Fragment>
        <div className="content-table">
          <div className="table">
            <div className="text_table">
              <div className="table_image">
                <img alt="" src="/images/calendar1.png" />
              </div>
              <div className="infor_table">
                <div className="text_time">Đặt hẹn khám bệnh</div>
                <div className="lg_content">Vui lòng điền đầy đủ các trường yêu cầu</div>
              </div>
            </div>
            <form id="appointment-form" onSubmit={this.handleSubmit}>
              <div className="info">
              <div className="column">
                <div className="col-md-12 mb-4">
                  <input 
                    onChange={this.handleOnChange}
                    value={values.full_name || ""}
                    className="input_name"
                    type="text"
                    name="full_name"
                    required
                    placeholder="Your Full Name *"/>
                </div>
                <div className="col-md-12 mb-4">
                    <input
                    onChange={this.handleOnChange}
                    value={values.email || ""}
                    className="input_name"
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email *"/>
                </div>
                <div className="col-md-12 mb-4">
                    <input
                    onChange={this.handleOnChange}
                    value={values.phone_number || ""}
                    className="input_name"
                    type="number"
                    name="phone_number"
                    required
                    placeholder="Your Phone Number *"/>
                </div>
                <div className="col-md-12 mb-4">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
										<Stack spacing={3}>
											<DatePicker
												value={values?.booking??""}
												// maxDate={moment().endOf('y').subtract(1,'days')}
												minDate={moment().endOf('y').subtract(123,'y')}
												inputFormat="yyyy/MM/dd"
												inputProps={{ placeholder: "Thời gian khám" }}
                        onChange={(v) => {
                          this.setState({ values: {...this.state.values, booking: v}});
                          }}
															renderInput={(params) => {
																params.inputProps.disabled = true;
																return <TextField
																name= "booking"
																{...params}
															/>
															}}
														/>
										</Stack>
									</LocalizationProvider>
                  {/* {_validation.booking && <p className="text-error">{_validation.booking}</p>} */}
                </div>
              </div>
              <div className="bottom">
                    <Button disabled={(loading == true ? true : false)} type="submit" variant="contained"
                    className="btn_submit"
                    >Gửi</Button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateStatus: state.status,
    stateUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  let _action = new Action();

  return {
    setStatus: (type, val) => {
      dispatch(_action.setStatus(type, val));
    },
    setValueStatus: (type, val) => {
      dispatch(_action.setValueStatus(type, val));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Datlich);
