"use strict";

/* Package System */
import React from "react";
import Link from "next/link";

/* Package Application */
import FormLayout from "@views/Admin/Components/FormLayout";

/* Package style */

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/* TYPE : text,status,radio,select,select_multi,image,video,textarea,autoComplete (multiple:true),password,dateTime
					col:'left', col:'right'
					hideColRight={true} -- ẩn cột phải
				*/}
        <FormLayout
          getData={{ category_id: "categories?limit=10000&fqnull=deleted_at" }}
          fields={[
            {
              key: "title",
              label: "Tiêu đề",
              type: "text",
              col: "left",
              isRequied: true,
            },
          
            {
              key: "image_url",
              label: "Ảnh",
              type: "image",
              cdn: process.env.API_URL + "/",
              col: "left",
              isRequied: true,
            }, 
            {
              key: "slug",
              label: "Vai trò",
              type: "text",
              col: "left",
              isRequied: true,
            },
            {
              key: "content",
              label: "Trích",
              type: "text",
              col: "left",
              isRequied: true,
            },
            {
              key: "category_id",
              label: "Danh mục",
              type: "select",
              defaultValue: true,
              col: "left",
            },
            {
              key: "status",
              label: "Trạng thái",
              type: "status",
              defaultValue: true,
              col: "right",
            },
          ]}
        />
      </>
    );
  }
}

export default Form;
