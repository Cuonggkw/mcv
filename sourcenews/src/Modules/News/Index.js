"use strict";

/* Package System */
import React from "react";
import Link from "next/link";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Header from "@views/Default/Components/Header";
import { withRouter } from "next/router";

/* Package Application */
import Card from "@views/Default/Components/Card";
import { fetchApi, changeToSlug } from "@helpers/Common";

/* Package style */
export default class extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      dataPage: [],
      hiddenView: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
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
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let { dataPage } = this.state;
    return (
      <React.Fragment>
        <div className="nl-main-1">
          <section className="section">
            <div className="container-header">
              <div className="header">
                <div className="phone">
                  <svg className="icon" viewBox="0 0 512 512">
                    <path d="M497.4 361.8l-112-48a24 24 0 0 0 -28 6.9l-49.6 60.6A370.7 370.7 0 0 1 130.6 204.1l60.6-49.6a23.9 23.9 0 0 0 6.9-28l-48-112A24.2 24.2 0 0 0 122.6 .6l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.3 24.3 0 0 0 -14-27.6z" />
                  </svg>
                  <a href="#" className="phone_number">
                    +84 1234 56789
                  </a>
                </div>

                <div className="clock">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
                  </svg>
                  <span className="clocl_time">
                    Thứ 2 - Chủ Nhật 9:00 - 20:00
                  </span>
                </div>
              </div>

              <div className="header-frame">
                <div className="location">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z" />
                  </svg>
                  <a href="#" className="address">
                    37 đường 70 Yên Xá, Tân Triều, Thanh Trì, Hà Nội
                  </a>
                </div>
                <div className="language">
                  <a href="#" className="lg_vn">
                    Tiếng Việt
                  </a>
                  <svg
                    className="icon-down"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" />
                  </svg>
                </div>
                <div className="networking">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.7 226.4 209.3 245V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V501C413.3 482.4 504 379.8 504 256z" />
                  </svg>
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
                  </svg>
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                  </svg>
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="menu-bar">
              <div className="logo-modal">
                <img className="logo" src="/images/logo_andat.png" />
              </div>
              <div className="menu">
                <ul className="menu-list">
                  <li className="list-frame">
                    <a href="/" className="list-title">
                      Trang chủ
                    </a>
                  </li>
                  <li className="list-frame">
                    <a href="#" className="list-title">
                      Giới thiệu
                    </a>
                    <svg
                      className="icon-menu"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                    </svg>
                  </li>
                  <li className="list-frame">
                    <a href="#" className="list-title">
                      Dịch vụ
                    </a>
                    <svg
                      className="icon-menu"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                    </svg>
                  </li>
                  <li className="list-frame">
                    <a href="#" className="list-title">
                      Bác sĩ
                    </a>
                  </li>
                  <li className="list-frame">
                    <a href="#" className="list-title">
                      Cơ sở hạ tầng
                    </a>
                    <svg
                      className="icon-menu"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                    </svg>
                  </li>
                  <li className="list-frame">
                    <a href="#" className="list-title">
                      Tin tức
                    </a>
                  </li>
                  <li className="list-frame">
                    <a href="#" className="list-title">
                      Hỗ trợ khách hàng
                    </a>
                  </li>
                  <li className="list-frame">
                    <a href="#" className="list-title">
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </div>
              <button className="booking">
                <svg
                  className="icon_calendar"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z" />
                </svg>
                <span href="#" className="booking_title">
                  Đặt lịch khám
                </span>
              </button>
            </div>
          </section>
          <section className="page-title">
            {/* <img className="banner-img" src="/images/baner_andat.png" /> */}
            <div className="overlay">
              <h1 className="title-archive">Archive title</h1>
              <Link href="/">
                <a title="Trang chủ" className="home">
                  <span className="home-span">Trang chủ</span> / Archive title
                </a>
              </Link>
            </div>
          </section>
          <section className="section-rectangle">
            <img className="img-recta" src="/images/new/image-1.jfif" />
            <div className="title-recta">
              <div className="recta_header">
                MCV S&E ký kết hợp tác truyền thông chiến lược với GIGA Digital
              </div>
              <div className="recta_time">21:20 - 23/08/2022</div>
              <div className="content-recta">
                Vào ngày 13/10, Công ty Cổ phần Thể thao và Giải trí MCV (MCV
                S&E) và Công ty TNHH GIGA Distribution (GIGA Digital) đã chính
                thức ký kết hợp tác chiến lược. Hai đơn vị cùng hướng tới mục
                tiêu mang đến những giá trị thiết thực trong lĩnh lực truyền
                thông trên nền tảng truyền thông số, nâng tầm độ nhận diện
                thương hiệu trên thị trường.
              </div>
            </div>
          </section>
          {this.state.dataPage && this.state.dataPage.length > 0 && (
            <section className="sl-section">
              <div className="container">
                <div className="sl-section__content swpBtn-center">
                  <div className="row">
                    {this.state.dataPage.map((item) => (
                      <div key={item.id} className="col-lg-4 col-md-4 col-sm-6">
                        <Card
                          title={item.title}
                          image={item.image_url != null ? `${item.image_url}` : ``}
                          backgroundBody="gray"
                          onClickValue={item.id}
                          link={"news/" + item.title}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </React.Fragment>
    );
  }
}
