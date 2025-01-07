"use strict";

/* Package System */
import React from "react";
import Link from "next/link";
import BackToTop from "@views/Default/Components/BackToTop";
import Fab from "@mui/material/Fab";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    return (
      <>
        <footer id="nl-footer">
          <div className="footer_top">
            <div className="nl-footer__top">
              <div className="inner_footer">
                <div className="logo">
                  <a title="MCV">
                    <img alt="Logo" src="/images/logo_andat.png" width="161" height="56" />
                  </a>
                </div>
                <div className="inner_content">Phòng khám đa khoa quốc tế An Đạt mong muốn chung tay góp sức cho ngành y tế nước nhà tạo nên một cộng đồng khỏe mạnh, một xã hội an yên và hạnh phúc.</div>
              </div>
            </div>

            <div className="nl-footer__middle">
                <p className="middle-text">Thông tin liên hệ</p>
                <div className="middle_loc">
                <svg className="loc_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"/></svg>
                <p className="loc_text">Số 37 đường 70 Yên Xá, Tân Triều, Thanh Trì, Hà Nội</p>
                </div>
                <div className="middle_phone">
                <svg className="phone__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M497.4 361.8l-112-48a24 24 0 0 0 -28 6.9l-49.6 60.6A370.7 370.7 0 0 1 130.6 204.1l60.6-49.6a23.9 23.9 0 0 0 6.9-28l-48-112A24.2 24.2 0 0 0 122.6 .6l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.3 24.3 0 0 0 -14-27.6z"/></svg>
                <p className="phone_text">Hotline: 0972 978 933</p>
                </div>
                <div className="middle_email">
                <svg className="email_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm0 48v40.8c-22.4 18.3-58.2 46.7-134.6 106.5-16.8 13.2-50.2 45.1-73.4 44.7-23.2 .4-56.6-31.5-73.4-44.7C106.2 199.5 70.4 171.1 48 152.8V112h416zM48 400V214.4c22.9 18.3 55.4 43.9 104.9 82.6 21.9 17.2 60.1 55.2 103.1 55 42.7 .2 80.5-37.2 103.1-54.9 49.5-38.8 82-64.4 104.9-82.7V400H48z"/></svg>
                <p className="email_text">Email: contact@andatclinic.com</p>
                </div>
            </div>

            <div className="nl-footer__bottom">
              <p className="bottom_title">Danh sách dịch vụ</p>
              <div className="bottom_text">Khám sức khoẻ tổng quát</div>
              <div className="bottom_text">Khám sức khoẻ lái xe</div>
              <div className="bottom_text">Tầm soát ung thư</div>
              <div className="bottom_text">Dịch vụ da liễu</div>
            </div>

            <div className="nl-footer__bottom">
              <p className="bottom_title">Hỗ trợ khách hàng</p>
              <div className="bottom_text">Liên hệ</div>
              <div className="bottom_text">Giới thiệu</div>
              <div className="bottom_text">Tuyển dụng</div>
              <div className="bottom_text">Chính sách bảo mật</div>
              <div className="bottom_text">Điều khoản dịch vụ</div>
            </div>
          </div>
          <div className="footer_bottom">
            <div className="line"></div>
            <div className="bottom_middle">
              <div className="bottom_header">Giấy phép kinh doanh số: 0109614417 do Sở kế hoạch và Đầu tư Tp Hà Nội cấp ngày 28/04/2021 I Người đại diện: Nguyễn Thị Hạnh
              </div>
              <p className="bottom_acc">Lượt truy cập trong ngày: 32,839</p>
            </div>
            <div className="bottom_title">© 2023 An Dat. All rights reserved</div>
          </div>
        </footer>
           

        <BackToTop {...this.props}>
          <Fab
            color="secondary"
            size="small"
            aria-label="scroll back to top"
            onClick={this.handleScrollTop}
          >
            <i className="fas fa-angle-up"></i>
          </Fab>
        </BackToTop>
      </>
    );
  }
}

export default Footer;
