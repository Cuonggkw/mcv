"use strict";

/* Package System */
import React, { useState } from "react";
import { connect } from "react-redux";
// import DatePicker from 'react-datepicker';
import Link from "next/link";

/* Application */
import Button from "@mui/material/Button";
import Spinkit from "@views/Default/Components/Spinkit";
import Action from "@libs/Action";
import { OPEN_MODAL } from "@config/ActionTypes";

import {fetchApi, putApi, postApi, validationForm, getMsg} from "@helpers/Common";
import OtpInput from "react-otp-input";
import axios from "axios";
import Router from "next/router"
import { validate } from "uuid";

/* Package style */
class Tag extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      status: {loading: false},
      countdown: 60,
      msg: "",
      values: "",
      validation: {},
      dataPage: [],
    };
  }

  async componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidUpdate(prevProps, prevState) {
  }


  render() {
    let _data = typeof this.state.dataPage[0] !== "undefined" ? this.state.dataPage[0] : [];

    // console.log(this.state.dataPageNew);
    return (
      <React.Fragment>
       <div className="tag_card">
        <div className="tag_card-tem">
          <span>Thẻ:</span>
          <div></div>
        </div>
        <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
