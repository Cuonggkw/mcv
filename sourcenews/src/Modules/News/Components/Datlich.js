"use strict";

/* Package System */
import React from "react";
import { connect } from "react-redux";
import Action from "@libs/Action";
import Link from "next/link";

/* Package Application */
import { fetchApi, postApi, changeToSlug } from "@helpers/Common";

/* Package style */
class Datlich extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      appointmentSuccess: false,
      countdown: 60,
      msg: "",
      values: "",
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

  async componentDidUpdate(prevProps, prevState) {
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
    const {full_name, email, phone_number} = this.state;
    const formData = {
      full_name: full_name,
      email: email,
      phone_number: phone_number,
    };
    console.log(formData);
    this.setState({
      full_name: "",
      email: "",
      phone_number: ""
    });

    postApi(process.env.API_URL + "save-contact" + formData).then((res) => {
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
  };

  showSuccessNotification = () => {
    this.setState({successNotificationVisible: true}, () => {
      setTimeout(() => {
        this.setState({successNotificationVisible: false});
      }, 3000);
    })
  };

  render() {
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
            <div className="frame">
              <div className="frame_text">
                <form className="appointment_form">
                  <div className="colum">
                      <input
                      onChange={this.handleOnChange}
                      value={this.state.full_name}
                      className="input_name"
                      type="text"
                      name="full_name"
                      required
                      placeholder="Your Full Name *"/>

                      <input
                      onChange={this.handleOnChange}
                      value={this.state.email}
                      className="input_name"
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email *"/>

                      <input
                      onChange={this.handleOnChange}
                      value={this.state.phone_number}
                      className="input_name"
                      type="tel"
                      name="phone_number"
                      required
                      placeholder="Your Phone Number *"/>
                  </div>
                  <div className="bottom">
                    <button
                    onClick={this.handleSubmit}
                    type="submit"
                    form="appointment_form"
                    className="btn_submit"
                    >Gửi</button>
                  </div>
                </form>
              </div>
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
