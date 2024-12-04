"use strict";

/* Package System */
import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { connect } from "react-redux";

/* Application */
import Action from "@libs/Action";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import HideOnScroll from "@views/Default/Components/HideOnScroll";
import Search from "@views/Default/Components/Search";
import Image from "next/image";
//import Notification from '@views/Default/Components/Notification';
import User from "@views/Default/Components/User";

/* Package style */
import CssBaseline from "@mui/material/CssBaseline";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgTransparent: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 0) {
      this.setState({ bgTransparent: false });
    } else {
      this.setState({ bgTransparent: true });
    }
  };

  handleClickOutSide = () => {
    let _status = this.props.stateStatus.open;
    if (
      _status.search == true ||
      _status.notification == true ||
      _status.user == true
    ) {
      this.props.resetOpen();
    }
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...this.props}>
          <AppBar
            id="nl-header"
            color="inherit"
            className={this.state.bgTransparent == true ? "transparent" : ""}
          >
            <Toolbar>
              <div
                id="nl-header__mastehead"
                className={
                  this.state.bgTransparent == true ? "transparent" : ""
                }
              >
                <div className="d-flex">
                  <div
                    id="guide-nav"
                    className="guide-render d-none d-lg-block"
                  >
                    <nav id="guide-menu">
                      <ul>
                        <li>
                          <Link href="/">
                            <a
                              title="Trang chủ"
                              className={
                                this.props.router.query.pages[0] == "homepage"
                                  ? "active"
                                  : ""
                              }
                            >
                              Trang chủ
                            </a>
                          </Link>
                        </li>
                        <li>
                          <div className="logo">
                            <Link href="/">
                              <a title="MCV">
                                <Image
                                  className="img-fluid"
                                  alt="Logo"
                                  src="/images/logomcv.png"
                                  width={165}
                                  height={80}
                                />
                              </a>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <Link href="/news">
                            <a
                              title="Tin tức"
                              className={
                                this.props.router?.query?.pages &&
                                this.props.router.query.pages[0] == "news"
                                  ? "active"
                                  : ""
                              }
                            >
                              Tin tức
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div id="guide-nav-mb" className="guide-render">
                    <div className="logo">
                      <Link href="/">
                        <a title="MCV">
                          <Image
                            className="img-fluid"
                            alt="Logo"
                            src="/images/logomcv.png"
                            width={165}
                            height={80}
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateStatus: state.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  let _action = new Action();

  return {
    resetOpen: () => {
      dispatch(_action.resetOpen());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
