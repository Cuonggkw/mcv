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

import {fetchApi, putApi, postApi} from "@helpers/Common";
import OtpInput from "react-otp-input";
import axios from "axios";
import Router from "next/router"
import { validate } from "uuid";
import { Tag } from "@mui/icons-material";

/* Package style */
class Tags extends React.Component {
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleToggle = () => {
    this.props.setStatus(OPEN_SEARCH, !this.props.stateStatus.open.search);
  };

  async componentDidUpdate(prevProps, prevState) {
    if(this.state.dataPage.length == 0 ){
      this.getData();
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  getData = async () => {
    try {
      // console.log("props",this.props.data[0].tag_id)
      const tag_id = this.props.data[0].tag_id.replace(/[\[\]']+/g, "");
      // console.log(tag_id);
      let data = await fetchApi(process.env.API_URL + "get-tags?fqin=id:" + tag_id).then((result) => result.data.data).catch(e=>console.log(e));
      this.setState({dataPage: data});
      } catch (e) {
        console.log(e);
      }
    };

  // getData = () => {
  // };
  render() {
    // console.log(this.state.dataPage?.length ? this.state.dataPage.map((item) => item?.slug?.trim()) : []);
    return (
      <React.Fragment>
        <div className="tag_card">
          <div className="tem">
            <span className="tem_header">Thẻ:</span>
            <div className="tem_tag">
              {this.state.dataPage && this.state.dataPage.length > 0 && 
              this.state.dataPage.map((item, index) => {
                return(
                  <div key={index} className="tag_card-tem">
                    <div className="tag_card-name" onClick={() => Router.push({pathname: "/tags", query: {tag: item.name}})}
                    >{item.name}</div>
                  </div>
                )
              })}
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
    setUser: (data) => {
      dispatch(_action.setUser(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
