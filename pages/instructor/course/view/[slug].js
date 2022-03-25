import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Button, Image, Modal, Tooltip } from "antd";
import { CheckOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

const CourseView = () => {
  const [course, setCourse] = useState({});

  // lessons - Modal
  const [visible, setVisible] = useState(false);

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
          <div className="container">
            <div className="mb-2">
              <Image
                width={250}
                src={course.image ? course.image.Location : "/course.png"}
                alt={course.name}
              />
            </div>

            <div className="d-flex justify-content-between">
              <div>
                <h5
                  className="mt-2 text-primary mb-3"
                  style={{ fontSize: "20px" }}
                >
                  {course.name}
                </h5>
                <div className="d-flex justify-content-between">
                  <p
                    style={{ marginTop: "-10px", fontSize: "14px" }}
                    className="badge bg-success"
                  >
                    {course.lessons && course.lessons.length} Lessons
                  </p>
                  <p
                    style={{
                      marginLeft: "5px",
                      marginTop: "-10px",
                      fontSize: "15px",
                      fontStyle: "italic",
                    }}
                    className="badge bg-secondary"
                  >
                    #{course.category}
                  </p>
                </div>
              </div>
              <div>
                <Tooltip title="Edit" className="px-2">
                  <EditOutlined className="h5 pointer text-warning mr-4" />
                </Tooltip>
                <Tooltip title="Publish" className="px-2">
                  <CheckOutlined className="h5 pointer text-danger mr-4" />
                </Tooltip>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <ReactMarkdown children={course && course.description} />
              </div>
            </div>
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-3 text-center modalColor"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Lessons
              </Button>
            </div>
            <br />
            <Modal
              title="Add Lessons"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              Add lesson component goes here
            </Modal>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
