import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Avatar, Badge, Tooltip } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios
      .get("/api/instructor-courses")
      .catch(function (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
        console.log(err.config);
      });
    setCourses(data);
  };
  const myStyle = { marginTop: "-15px", fontSize: "10px", color: "green" };

  return (
    <InstructorRoute>
      <div className="jumbotron text-center">
        <h3 className="navTitle">Instructor Dashboard</h3>
      </div>
      {courses &&
        courses.map((course, index) => (
          <>
            <div className="d-flex border p-4" key={index}>
              <Avatar
                className="align-self-start mr-3"
                alt="Course Image"
                shape="square"
                size={130}
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="px-5">
                <Link
                  href={`/instructor/course/view/${course.slug}`}
                  className="pointer"
                >
                  <a className="mt-2 text-primary">
                    <h5 className="pt-2">{course.name}</h5>
                  </a>
                </Link>
                <p style={{ marginTop: "0px" }}>
                  <span className="badge bg-info">{course.lessons.length}</span>
                  Lessons
                </p>

                {course.lessons.length < 5 ? (
                  <h6 style={myStyle} className="text-warning">
                    Require 5 Lessons to Publish
                  </h6>
                ) : course.published ? (
                  <p style={myStyle}>
                    <Tooltip title="Course is Live" color={"red"}>
                      <Badge status="processing" color="#f50" text="Live" />
                    </Tooltip>
                  </p>
                ) : (
                  <h6 style={myStyle}>Ready to Publish</h6>
                )}
              </div>
              <div
                style={{ marginLeft: "auto" }}
                className="col-md-3 mt-5 text-center"
              >
                {course.published ? (
                  <Tooltip title="Published" placement="left">
                    <CheckCircleFilled
                      style={{ fontSize: "20px" }}
                      className="h5 pointer text-success"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Unpublished" placement="left">
                    <CloseCircleFilled
                      style={{ cursor: "pointer", fontSize: "25px" }}
                      className="h5 text-warning"
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </>
        ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;
