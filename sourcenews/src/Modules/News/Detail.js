"use strict";

/* Package System */
import React from "react";
import { connect } from "react-redux";
import Action from "@libs/Action";
import Link from "next/link";
import Datlich from "@modules/News/Components/Datlich";
import Tags from "@modules/News/Components/Tags";

/* Package Application */
import { fetchApi, changeToSlug } from "@helpers/Common";

/* Package style */
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      dataPage: [],
      dataPin: [],
      dataPageNew: []
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    this.getData();
    this.getDataPin();
    this.getPageNew();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.dataPage.length === 0) {
      this.getData();
    }

    if(this.state.dataPin.length === 0 && !prevState.dataPin.length){
      this.getDataPin();
    }

    if(this.state.dataPageNew.length === 0 && !prevState.dataPageNew.length){
      this.getPageNew();
    }
  }

  getData = () => {
    try {
      this._isMounted && fetchApi(process.env.API_URL+ "news-all?fq=slug:" + this.props.slug).then(result => this._isMounted&&this.setState({
				dataPage: result.data.data
			})).catch(e=>console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  getDataPin = () => {
    try {
      this._isMounted && fetchApi(process.env.API_URL + "get-category").then((result) => this._isMounted && this.setState({
        dataPin: result.data.data
      })).catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  getPageNew = () => {
    try {
      this._isMounted && fetchApi(process.env.API_URL + "news-all").then((result) => this._isMounted && this.setState({
        dataPageNew: result.data.data
      })).catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    let _data = typeof this.state.dataPage[0] !== "undefined" ? this.state.dataPage[0] : [];

    // console.log(this.state.dataPageNew);
    return (
      <React.Fragment>
        {_data?.id && (
          <>
            <div id="nl-main_detail">
              <section className="sl-section">
                  <div className="sl-section__content">
                    <div className="container-item">
                      <div className="container-item-l">
                        <div className="breadcrumbss">
                          <div className="link">
                            <div className="content_homepage"><Link href="/news"><a>Trang chủ</a></Link></div>
                          </div>
                          <div className="separator">
                            <div className="text">/</div>
                          </div>
                          <div className="linkk">
                            <div className="content_news">Tin tức</div>
                          </div>
                          <div className="separator">
                            <div className="text">/</div>
                          </div>
                          <div className="container_item">{_data.title}</div>
                        </div>
                        <div className="container-item-title">{_data.title}</div>
                        <div className="btn-infor">
                          <div className="infor_admin">
                            <div className="text-consion">Đăng bởi</div>
                            <div className="text-consions">Admin</div>
                          </div>
                          <div className="infor_content">
                            <svg className="infor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/></svg>
                            <div className="date">21:20 - 23/08/2022</div>
                          </div>
                          <div className="infor_content">
                            <svg className="infor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z"/></svg>
                            <div className="view">1,9K lượt xem</div>
                          </div>
                        </div>
                        <div className="container-item-image">
                          <img
                            className="img-fluid_detail"
                            src={_data.image_url != null ? `${process.env.CDN_URL_S3}/${_data.image_url}` : ``}
                          />
                        </div>
                        <div className="describe">
                          <div className="describe_icon">
                            <img className="quote_icon" alt="" src="/images/quote.png" />
                          </div>
                          <p className="describe_title">
                            Bệnh tim mạch là các tình trạng liên quan đến sức khỏe của trái tim, sự hoạt động của các mạch máu gây suy yếu khả năng làm việc của tim. Hệ quả là làm gián đoạn hoặc không cung cấp đủ oxy đến não và các bộ phận khác trong cơ thể, khiến các cơ quan ngừng trệ hoạt động, dẫn đến tử vong.
                          </p>
                        </div>
                        <div className="infor_title">
                          <div className="infor_header">Thông tin chung</div>
                          <div dangerouslySetInnerHTML={{__html: _data.content}}></div>
                        </div>
                        <div className="menu"><img className="chedo" alt="" src="/images/che-do.png" /></div>

                        <Datlich />
                        <Tags data={this.state.dataPage} tag_id/>
                      </div>
                      <div className="container-item-2">
                        <div className="container_service">
                          <div className="servicee">
                          <div className="service-tem">
                            <div className="service-content">
                              <span className="service-header">Dịch vụ</span>
                              <div className="rectangle"></div>
                            </div>
                          </div>
                          </div>
                          <div className="news-imagee">
                          {this.state.dataPin && this.state.dataPin.length > 0 &&
                          this.state.dataPin.map((item)=>(
                            <div key={item.id} className="travel">
                              <div className="chriven-image">
                                <img alt="" src="/images/right-chevron.png" />
                              </div>
                              <div className="travell-content">{item.name}</div>
                            </div>
                          ))}
                          </div>
                        </div>
                        <div className="outstanding">
                          <div className="outstanding_header">
                            <span className="outstanding_title">Bài viết nổi bật</span>
                            <div className="rectangle"></div>
                          </div>
                          <div className="outstanding_img">
                            {this.state.dataPageNew && this.state.dataPageNew.length > 0 &&
                            this.state.dataPageNew.slice(0, 4).map((item) => (
                              <div key={item.id} className="outs_travel">
                                <div className="outs_image">
                                  <img alt="" src={`${process.env.CDN_URL_S3}/${item.image_url}`} />
                                </div>
                                <div className="outs_content">{item.title}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="communication">
                          <div className="commu_header">
                            <div className="commu_title">Truyền thông</div>
                            <div className="rectangle"></div>
                          </div>
                          <div className="commu_image">
                            {this.state.dataPageNew && this.state.dataPageNew.length > 0 &&
                              this.state.dataPageNew.slice(2, 6).map((item) => (
                                <div key={item.id} className="outs_travel">
                                  <div className="outs_image">
                                    <img alt="" src={`${process.env.CDN_URL_S3}/${item.image_url}`} />
                                  </div>
                                  <div className="outs_content">{item.title}</div>
                              </div>
                              ))}
                          </div>
                        </div>
                        <div className="description">
                          <img alt="" src="/images/phu-khoa.png" />
                        </div>
                      </div>
                    </div>
                    <div className="container-card">
                      <div className="outstanding_header">
                        <span className="outstanding_title">Bài viết liên quan</span>
                        <div className="rectangle"></div>
                      </div>
                      <div className="card_image">
                            {this.state.dataPageNew && this.state.dataPageNew.length > 0 &&
                              this.state.dataPageNew.slice(2, 6).map((item) => (
                                <div key={item.id} className="card_travel">
                                  <div className="card_img">
                                    <img alt="" src={`${process.env.CDN_URL_S3}/${item.image_url}`} />
                                  </div>
                                  <div className="card_content">{item.title}</div>
                              </div>
                              ))}
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
