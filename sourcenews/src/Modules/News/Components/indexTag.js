"use strict";

/* Package System */
import React, { useState } from "react";
import { connect } from "react-redux";
// import DatePicker from 'react-datepicker';
import Link from "next/link";


import {fetchApi, putApi, postApi} from "@helpers/Common";

/* Package style */
export default class extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      dataPage: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  getData = () => {
    try {
      this._isMounted && console.log(window.location.search.split("=")[0]);
      this._isMounted && fetchApi(process.env.API_URL + `news-all?s=${window.location.search.split("=")[1]}|tag_id`)
      .then(result => this._isMounted && this.setState({dataPage: result.data.data,}))
      .catch(e=>console.log(e));
      } catch (e) {
        console.log(e);
      }
    };


  // getData = () => {
  
  // };



  render() {
    let _data = typeof this.state.dataPage[0] !== "undefined" ? this.state.dataPage[0] : [];
    return (
      <React.Fragment>
        <body>
          <section id="nl-main_tag">
            {this.state.dataPage && this.state.dataPage.length > 0 && (
              <>
                {this.state.dataPage.map((item) => (
                  <div key={item.id} className="cartTinTuc">
                    <Link href={`/tin-tuc/${item.slug}`}>
                      <img
                        className="menuBarIcon"
                        loading="eager"
                        alt=""
                        src={item.image_url != null ? `${process.env.CDN_URL_S3}/${item.image_url}` : ``}
                      />                    
                    </Link>
                  
                    <div className="partnerLogos">
                      <Link href={`/tin-tuc/${item.slug}`}>
                        <a>
                          <div className="mcvSeK1">{item.title}</div>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
          </section>
        </body>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     stateStatus: state.status,
//     stateUser: state.user,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   let _action = new Action();

//   return {
//     setStatus: (type, val) => {
//       dispatch(_action.setStatus(type, val));
//     },
//     setValueStatus: (type, val) => {
//       dispatch(_action.setValueStatus(type, val));
//     },
//   };
// };