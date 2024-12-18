"use strict";

/* Package System */
import React from "react";
import Link from "next/link";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Header from "@views/Default/Components/Header";
import { withRouter } from "next/router";
import { Pagination, Stack } from "@mui/material";

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
      isLoading: false,
      limit: props?.limit ?? 6,
      page: 1,
      total: 0,
    };
  }

  async componentDidUpdate(prevProps,prevState){
		if(this.state.dataPage.length == 0){
			this.getData();
		}
	}

  handlePagination = async (e, page) => {
    this.setState({ page: page }, () => this.getData());
  };

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  getData = () => {
    try {
      this._isMounted && fetchApi(process.env.API_URL + `news-all?limit=${this.state.limit}&offset=${(this.state.page - 1)*this.state.limit}&fqnull=deleted_at`).then((result) => this._isMounted && this.setState({
        dataPage: result.data.data,
        total: result.data.total
      })).catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
    };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <React.Fragment>
        <div className="sl-section">
          <div className="ractangle">
            <div className="ractangle_img">
              <img src="/images/new/header.png"/>
            </div>
            <div className="ractangle_title">
              <div className="ractangle_title-header">
              MCV S&E ký kết hợp tác truyền thông chiến lược với GIGA Digital
              </div>
              <div className="ractangle_title-time">21:20 - 23/08/2022</div>
              <div className="ractangle_title-content">Vào ngày 13/10, Công ty Cổ phần Thể thao và Giải trí MCV (MCV S&E) và Công ty TNHH GIGA Distribution (GIGA Digital) đã chính thức ký kết hợp tác chiến lược.
              Hai đơn vị cùng hướng tới mục tiêu mang đến những giá trị thiết thực trong lĩnh lực truyền thông trên nền tảng truyền thông số, nâng tầm độ nhận diện thương hiệu trên thị trường.</div>
            </div>
          </div>
        </div>
          {this.state.dataPage && this.state.dataPage.length > 0 && (
            <section className="sl-section">
              <div className="container">
                <div className="sl-section__content swpBtn-center">
                  <div className="row">
                    {this.state.dataPage.map((item) => (
                      <div key={item.id} className="col-lg-4 col-md-4 col-sm-6">
                        <Card
                          title={item.title}
                          image={item.image_url != null ? `${process.env.CDN_URL_S3}/${item.image_url}` : ``}
                          backgroundBody="gray"
                          date={item.created_at}
                          onClickValue={item.id}
                          link={"tin-tuc/" + item.slug}
                        />
                      </div>
                    ))}
                  </div>
                    <div className="card-footer_limit">
                      <div className="d-flex justify-content-between wp-100">
                        {this.state.total > this.state.limit && (
                          <Stack spacing={2} className="pagination">
                            <Pagination
                              count={
                                Math.ceil(this.state.total / this.state.limit) > Math.ceil(10000 / this.state.limit)
                                ? Math.ceil(10000 / this.state.limit)
                                : Math.ceil(this.state.total / this.state.limit)
                              }
                              shape="rounded"
                              onChange={this.handlePagination}
                              // page={this.state.page}
                            />
                          </Stack>
                        )}
                </div>
                    </div>
                  </div>
                
              </div>
            </section>
          )}
      </React.Fragment>
    );
  }
}
