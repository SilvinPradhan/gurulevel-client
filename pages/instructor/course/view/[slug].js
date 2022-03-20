import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    loadCourse();
  }, [slug]);
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };
  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {course && (
          <div className="container-fluid pt-1">
            <div className="col pt-2">
              <Avatar
                size={150}
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="px-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primar">{course.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-150px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>
                  <div className="d-flex pt-4">
                    <Tooltip title="Edit">
                      <EditOutlined className="h5 pointer text-warning mr-4" />
                    </Tooltip>
                    <Tooltip title="Publish">
                      <EditOutlined className="h5 pointer text-danger mr-4" />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ReactMarkdown source={course.description} />
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
