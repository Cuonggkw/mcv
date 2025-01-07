"use strict";

/* Package System */
import React from "react";
import Link from 'next/link';
import {withRouter} from 'next/router';
import {connect} from 'react-redux';

/* Application */
import {OPEN_NOTIFICATION_M,OPEN_USER_M,OPEN_MODAL} from '@config/ActionTypes';
import Action from '@libs/Action';
import {IconButton} from '@mui/material';


class NavigatorMobile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isOpenMenu: false,
		};
	}

	handleToggleNoti=()=>{
		this.props.setStatus(OPEN_NOTIFICATION_M,!this.props.stateStatus.open.notification);
	}

	handleIsOpenMenu = () => {
		this.setState({
			isOpenMenu: !this.state.isOpenMenu,
		})
	}

	render(){
		let { isOpenMenu } = this.state;
		return(
			<>
				<div id="nl-navMobile">
					<IconButton className="mobile__icon" onClick={this.handleIsOpenMenu}>
						<i className={`menu-mobile fas ${isOpenMenu ? "fa-times" : "fa-bars"}`}></i>
					</IconButton>
					{isOpenMenu &&
						<div className="nav-background" onClick={this.handleIsOpenMenu}>
						<li className="list-frame"><Link href="/news" className="list-title"><a>Trang chủ</a></Link></li>
						<li data-slug="gioi-thieu">
							<Link href="/news" className="list-title"><a>Giới thiệu</a></Link>
							<svg className="menu_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128128z" /></svg>
						</li>
						<li>
							<Link href="/news" className="list-title"><a>Dịch vụ</a></Link>
							<svg className="menu_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128128z" /></svg>
						</li>
						<li>
							<Link href="/news" className="list-title"><a>Đội ngũ bác sĩ</a></Link>
						</li>
						<li>
							<Link href="/news" className="list-title"><a>Hỗ trợ khách hàng</a></Link>
							<svg className="menu_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128128z" /></svg>
						</li>
						<li>
							<Link href="/news" className="list-title"><a>Dành cho doanh nghiệp</a></Link>
							<svg className="menu_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128128z" /></svg>
						</li>
						<li>
							<Link href="/news" className="list-title"><a>Tin tức</a></Link>
							<svg className="menu_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128128z" /></svg>
						</li>
					</div>
					}
				</div>
			</>
		)
	}
}

const mapStateToProps=state=>{
	return {
		stateStatus:state.status,
		stateUser:state.user
	}
}

const mapDispatchToProps=dispatch=>{
	let _action = new Action();

	return{
		setStatus:(type,val)=>{dispatch(_action.setStatus(type,val))},
		resetOpen:()=>{dispatch(_action.resetOpen())},
		setVerifyOTP:(type,val)=>{dispatch(_action.setVerifyOTP(type,val))}
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavigatorMobile));