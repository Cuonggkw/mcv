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

  async componentDidUpdate(prevProps,prevState){
		if(this.state.dataPage.length==0){
			this.getData();
		}
	}

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && fetchApi(process.env.API_URL + "news-all?limit=10000&fqnull=deleted_at").then((result) => this._isMounted && this.setState({
      dataPage: result.data.data,
    })).catch((e) => console.log(e));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let { dataPage } = this.state;
    return (
      <React.Fragment>
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
                          link={"news/" + item.slug}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
      </React.Fragment>
    );
  }
}
