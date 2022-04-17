import React from "react";
import { Avatar, List } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Item } = List;

const CourseLessons = ({ lessons, setPreview, modal, setModal }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col lesson-list">
            {lessons && <h5>{lessons.length} Lessons</h5>}
            <hr />
            <List
              itemLayout="horizontal"
              dataSource={lessons}
              renderItem={(item, index) => {
                return (
                  <Item>
                    <Item.Meta
                      avatar={
                        <Avatar style={{ backgroundColor: "#5a1dde" }}>
                          {index + 1}
                        </Avatar>
                      }
                      title={item.title}
                    />
                    {item.video && item.video !== null && item.free_preview && (
                      <span
                        onClick={() => {
                          setPreview(item.video.Location);
                          setModal(!modal);
                        }}
                      >
                        <EyeOutlined
                          style={{ color: "#5a1dde", cursor: "pointer" }}
                        />
                      </span>
                    )}
                  </Item>
                );
              }}
            ></List>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseLessons;
