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
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  
  handleSucces = (message) => {
    this.setState({
      successMessage: message,
      errorMessage: null,
      isOpen: true,
    });
  };

  // async componentDidUpdate(prevProps, prevState) {
  //   if(Object.keys(this.props.stateUser).length > 0 && Object.keys(this.state.values).length == 1){
	// 		this.initPage();
	// 	}
  // }

  handleFailure = (error) => {
    this.setState({
      successMessage: null,
      errorMessage: error,
      isOpen: true,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
      const formData = {
        full_name: this.state.full_name,
        email: this.state.email,
        phone_number: this.state.phone_number,
        booking: this.state.values.booking != null ? moment(this.state.values.booking).format("YYYY-MM-DD") : "",
      };
      this.showSuccessNotification();
      this.setState({
        full_name: "",
        email: "",
        phone_number: "",
        values: { booking: "Thời gian khám" },
      });

      this._isMounted && postApi(process.env.API_URL + "save-contact", formData).then((res) => {
        if(res?.response?.data?.status === "error"){
          this.handleFailure(res?.response?.data?.errors?.[0]?.msg ?? "Appointment booking failed");
        }else{
          this.handleSucces("Appointment booked successfully");
          this.setState({appointmentSuccess: true});
        }
      }).catch((error) => {
        console.log(error);
        this.handleFailure("An error occurred while booking appointment");
      })
    // console.log(formData);
  };

  showSuccessNotification = () => {
    this.setState({successNotificationVisible: true}, () => {
      setTimeout(() => {
        this.setState({successNotificationVisible: false});
      }, 3000);
    })
  };

  render() {
		let {values} = this.state;
		let {loading} = this.state.status;
    return (
      <React.Fragment>
        <div className="content-table">
          <div className="table-title">
            <div className="text_table">
              <div className="table_image">
                <img alt="" src="/images/calendar1.png" />
              </div>
              <div className="infor_table">
                <div className="text_time">Đặt hẹn khám bệnh</div>
                <div className="lg_content">Vui lòng điền đầy đủ các trường yêu cầu</div>
              </div>
            </div>
            <div className="booking-form">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="info">
              <div className="column">
                <div className="input-placeholder mb-4">
                  <input 
                    onChange={this.handleOnChange}
                    value={this.state.full_name}
                    className="input_name"
                    type="text"
                    name="full_name"
                    required
                    placeholder="Your Full Name *"/>
                </div>
                <div className="input-placeholder mb-4">
                    <input
                    onChange={this.handleOnChange}
                    value={this.state.email}
                    className="input_name"
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email *"/>
                </div>
                <div className="input-placeholder mb-4">
                    <input
                    onChange={this.handleOnChange}
                    value={this.state.phone_number}
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
												maxDate={moment().endOf('y').subtract(1,'days')}
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
