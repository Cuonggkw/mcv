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
      this._isMounted && fetchApi(process.env.API_URL + `doctor-all?limit=${this.state.limit}&offset=${(this.state.page - 1)*this.state.limit}&fqnull=deleted_at`).then((result) => this._isMounted && this.setState({
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
          {this.state.dataPage && this.state.dataPage.length > 0 && (
            <section className="sl-section">
              <div className="service">
                <div className="title-component">
                  <h3>Đội ngũ bác sĩ</h3>
                  <div className="border-title"></div>
                </div>
                <p className="service_infor">Đội ngũ bác sĩ tại phòng khám An Đạt là những chuyên gia uy tín, tận tâm và có kinh nghiệm. Với kiến thức sâu rộng và tay nghề xuất sắc, họ cam kết mang lại chăm sóc y tế hàng đầu cho mọi bệnh nhân.</p>
              </div>
              <div className="container">
                <div className="sl-section__content swpBtn-center">
                  <div className="row">
                    {this.state.dataPage.map((item) => (
                      <div key={item.id} className="col-lg-4 col-md-4 col-sm-6 col-mobile">
                        <Card
                          title={item.name}
                          image={item.avatar != null ? `${process.env.CDN_URL_S3}/${item.avatar}` : ``}
                          backgroundBody="gray"
                          date={item.created_at}
                          onClickValue={item.id}
                          // link={"tin-tuc/" + item.slug}
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
