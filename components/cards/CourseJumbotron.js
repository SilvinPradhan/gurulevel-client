import React from "react";
import { currenyFormatter } from "../../utils/helpers";
import { Badge, Button } from "antd";
import {
  CheckSquareOutlined,
  GlobalOutlined,
  LoadingOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";

const CourseJumbotron = ({
  course,
  modal,
  setModal,
  preview,
  setPreview,
  user,
  loading,
  handleFreeEnrollment,
  handlePaidEnrollment,
  enrolled,
  setEnrolled,
}) => {
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;
  return (
    <div className="jumbotron">
      <div className="row">
        <div className="col-md-8">
          <h2 className="text-light font-weight-bold">{name}</h2>
          <p className="lead">
            {description && description.substring(0, 160)}...
          </p>
          <Badge
            count={category}
            style={{ backgroundColor: "#9543de" }}
            className="pb-4 mr-2"
          />
          <p>
            Created by:&nbsp;
            <span className="h6" style={{ textDecoration: "underline" }}>
              {instructor.name}
            </span>
          </p>

          <h4 className="text-light">
            {paid
              ? currenyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
          {/** Needs to be implemented */}

          <div className="d-flex flex-row">
            <div className="p-2">
              <p
                className="justify-content-center"
                style={{ display: "inline-block" }}
              >
                <CheckSquareOutlined style={{ color: "#fff" }} />
                &nbsp;
                <span>
                  Last Updated:&nbsp;
                  {new Date(updatedAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className="p-2">
              <p
                className="justify-content-center"
                style={{ display: "inline-block" }}
              >
                <GlobalOutlined style={{ color: "#fff" }} />
                <span>&nbsp;English</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {lessons[0].video && lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setModal(!modal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0].video.Location}
                width="100%"
                light={image.Location}
                height={"225px"}
              />
            </div>
          ) : (
            <img src={image.Location} alt={name} className="img img-fluid" />
          )}
          {/** NEroll button */}
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mt-2 mb-2"
              type={"danger"}
              block
              shape="round"
              icon={<SafetyOutlined />}
              size={"large"}
              disabled={loading}
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            >
              {user
                ? enrolled.status
                  ? "Go to Course"
                  : "Enroll"
                : "Login to Enroll"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseJumbotron;
