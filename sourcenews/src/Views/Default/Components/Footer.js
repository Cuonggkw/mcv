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
          <div className="nl-footer__top">
            <div className="container">
              <div className="inner_footer">
                <div className="logo">
                  <a title="MCV">
                    <img alt="Logo" src="/images/logo_andat.png" width="120" />
                  </a>
                </div>
                <div className="content">
                  <p>
                    Phòng khám đa khoa quốc tế An Đạt mong muốn chung tay góp
                    sức cho ngành y tế nước nhà tạo nên một cộng đồng khỏe mạnh,
                    một xã hội an yên và hạnh phúc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="nl-footer__middle">
            <div className="container">
              <div className="line"></div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="ctn">
                    <h3>CÔNG TY CỔ PHẦN TẬP ĐOÀN MCV</h3>
                    {/* <p>Trụ sở: 18Bis/22/1I Nguyễn Thị Minh Khai, P. Đa Kao, Q. 1, TP HCM</p> */}
                    <p>MST: 0102 154 249</p>
                    <p>
                      Văn phòng: 19A, E Office Park, KCX Tân Thuận, P. Tân Thuận
                      Đông, Q. 7, TP HCM
                    </p>
                    <p>
                      ĐT:{" "}
                      <a href="tel:02462752435" title="024 6275 2435">
                        024 6275 2435
                      </a>{" "}
                      | Email:{" "}
                      <a href="mailto:info@mcv.com.vn" title="info@mcv.com.vn">
                        info@mcv.com.vn
                      </a>
                    </p>
                    <p>
                      0102154249 do Sở KHDT Hà Nội cấp ngày 30/01/2007, thay đổi
                      lần thứ 04 ngày 30/11/2016
                    </p>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="row">
                    {/* <div className="col-md-4">
											<dl>
												<dt>Hỗ trợ</dt>
												<dd>
													<Link href='https://mcv.com.vn/lien-he'><a title="Liên hệ hỗ trợ">Liên hệ hỗ trợ</a></Link>
													<a title="Trung tâm trợ giúp">Trung tâm trợ giúp</a>
												</dd>
											</dl>
										</div>
										<div className="col-md-4">
											<dl>
												<dt>Hợp tác</dt>
												<dd>
													<a title="Liên hệ quảng cáo">Liên hệ quảng cáo</a>
													<a title="Liên hệ hợp tác">Liên hệ hợp tác</a>
												</dd>
											</dl>
										</div> */}
                    <div className="col-md-4">
                      <dl>
                        <dt>Pháp lý</dt>
                        <dd>
                          <Link href="/privacy">
                            <a title="Chính sách quyền riêng tư">
                              Chính sách quyền riêng tư
                            </a>
                          </Link>
                          <Link href="/terms">
                            <a title="Điều khoản sử dụng">Điều khoản sử dụng</a>
                          </Link>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="line"></div>
            </div>
          </div>

          <div className="nl-footer__bottom">
            <div className="container">
              <p className="text-center">
                Copyright © 2023 MCV Group Corporation. All Rights Reserved.
              </p>
            </div>
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
