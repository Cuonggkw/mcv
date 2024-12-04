"use strict";

/* Package System */
import React from "react";
import { connect } from "react-redux";
import Action from "@libs/Action";

/* Package Application */
import { fetchApi, changeToSlug } from "@helpers/Common";

/* Package style */
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      dataPage: [],
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.dataPage.length == 0) {
      this.getData();
    }
  }

  getData = () => {
    try {
      this._isMounted &&
        fetchApi(process.env.API_URL + "news-all?limit=10000&fqnull=deleted_at")
          .then(
            (result) =>
              this._isMounted &&
              this.setState({
                dataPage: result.data.data,
              })
          )
          .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let _data =
      typeof this.state.dataPage[0] !== "undefined"
        ? this.state.dataPage[0]
        : [];
    return (
      <React.Fragment>
        {_data?.id && (
          <>
            <div id="nl-main">
              <section className="sl-section">
                <div className="container">
                  <div className="sl-section__content swpBtn-center">
                    <div className="container-item">
                      <div className="container-item-l">
                        <div className="container-item-title">{_data.name}</div>
                        <div className="container-item-image">
                          <img
                            className="img-fluid"
                            alt={_data.name}
                            src={
                              _data.image_url != null
                                ? `${_data.image_url}`
                                : `${_data.wp_images}&w=828&q=100`
                            }
                          />
                        </div>
                        <div
                          className="container-item-desc"
                          dangerouslySetInnerHTML={{ __html: _data.excerpt }}
                        ></div>
                      </div>
                      <div className="container-item-r"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
