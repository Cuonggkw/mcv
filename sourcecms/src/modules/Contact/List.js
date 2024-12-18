"use strict";

/* Package System */
import React from "react";

/* Package Application */
import ListLayout from "@views/Admin/Components/ListLayout";

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <React.Fragment>
        {/*  
					maxWidthPopup: xl,lg,md,sm,xs
					isBtnAdd={true} -- Nút thêm
					search={true} -- tìm kiếm
					export={true} -- xuất dữ liệu
					isBtnFilter={true} -- bộ lọc
					hideAction={true} -- List ẩn hành động
					data -- các trường trong update/add
				*/}
        <ListLayout
          nameDisplay={"Quản lý người dùng"}
          isBtnAdd={true}
          maxWidthPopup="lg"
          columns={[
            { key: "full_name", label: "Họ và tên", type: "text" },
            { key: "email", label: "Email", type: "text" },
            { key: "phone_number", label: "Số điện thoại", type: "text" },
            { key: "note", label: "Ghi chú", type: "text" },
            {
              key: "created_at",
              label: "Ngày tạo",
              type: "dateTime",
              width: 120,
            },
          ]}
        />
      </React.Fragment>
    );
  }
}

export default List;