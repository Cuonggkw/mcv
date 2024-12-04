"use strict";

/* Package System */
import React from "react";
import Link from "next/link";

/* Application */
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@mui/material/Button";
import { fetchApi, changeToSlug } from "@helpers/Common";

/* Package style */
//import 'swiper/swiper-bundle.min.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
import { isIOS } from "react-device-detect";
import Countdown from "react-countdown";
class Banner extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      banners: [],
      hideDescription: false,
    };
  }

  getHomeBanner = () => {
    let _result = [];
    _result.push({
      type: "cover",
      id: "",
      title: "Bạn muốn trở thành nhân vật xuất hiện trên MCV Network?",
      thumbnail: "/images/banner1.png",
      link: "",
    });
    return _result;
  };

  componentDidMount() {
    this._isMounted = true;
    Promise.all([this.getHomeBanner()])
      .then((resp) => {
        let _banners = resp[0].concat(
          typeof resp[1] !== "undefined" ? resp[1] : []
        );
        this.setState({ banners: _banners });
      })
      .catch((e) => console.log(e));
  }

  hanldeDownload = () => {
    let _linkDL = isIOS == true ? "" : "";
    window.location = _linkDL;
  };

  handleLink = (e) => {
    console.log("handleLink", e);
    let _link = e.currentTarget.dataset.link;
    if (_link && _link != "null") window.location = _link;
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.banners && this.state.banners.length > 0 && (
          <>
            <section
              className={
                "nl-banner" + (this.state.banners.length == 1 ? " only" : "")
              }
            >
              <div className="nl-banner__inner">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  speed={700}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {this.state.banners.map((banner, k) => (
                    <SwiperSlide key={"banner_" + k}>
                      <div className="nl-banner__image">
                        {banner.type == "cover" ? (
                          <a
                            onClick={this.handleLink}
                            data-link={banner.link}
                            title={banner.title}
                          >
                            <img
                              className="img-fluid"
                              alt={banner.title}
                              src={banner.thumbnail}
                            />
                            <div className="des-fluid">{banner.title}</div>
                          </a>
                        ) : (
                          <Link
                            href={
                              "/live/" +
                              changeToSlug(banner.title) +
                              "/" +
                              banner.id
                            }
                          >
                            <a title={banner.title}>
                              <img
                                className="img-fluid"
                                alt={banner.title}
                                src={banner.thumbnail}
                              />
                            </a>
                          </Link>
                        )}
                      </div>

                      <div className="nl-banner__ctn">
                        <div className="container">
                          <div
                            className={
                              "block text-start " +
                              (this.state.hideDescription ? "scale" : "")
                            }
                          >
                            {banner.type == "cover" ? (
                              banner.link &&
                              banner.link != "null" && (
                                <a
                                  onClick={this.handleLink}
                                  data-link={banner.link}
                                  title={banner.title}
                                >
                                  <Button
                                    variant="contained"
                                    className="nl-button"
                                  >
                                    Xem ngay
                                  </Button>
                                </a>
                              )
                            ) : (
                              <Link
                                href={
                                  "/live/" +
                                  changeToSlug(banner.title) +
                                  "/" +
                                  banner.id
                                }
                              >
                                <a>
                                  <Button
                                    variant="contained"
                                    className="nl-button"
                                  >
                                    <Countdown
                                      date={banner.startTime}
                                      renderer={({ completed }) => {
                                        if (completed)
                                          return (
                                            <>
                                              <i className="fas fa-play"></i>{" "}
                                              Xem ngay
                                            </>
                                          );
                                        return (
                                          <>
                                            {" "}
                                            <i className="fas fa-play"></i> Live
                                            sắp tới
                                          </>
                                        );
                                      }}
                                    />
                                  </Button>
                                </a>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default Banner;
