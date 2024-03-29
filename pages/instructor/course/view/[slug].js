import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Button, Image, Modal, Tooltip, List, Avatar } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  UploadOutlined,
  WarningFilled,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";

const CourseView = () => {
  const [course, setCourse] = useState({});

  // lessons - Modal
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  // track progress
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    loadCourse();
  }, [slug]);
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  // Add Lesson functions
  const handleAddLesson = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({ ...values, title: "", content: "", video: {} });
      setProgress(0);
      setUploadButtonText("Upload a Video");
      setVisible(false);
      setCourse(data);
      toast("Lesson added successfully!");
    } catch (err) {
      console.log(err);
      toast("Lesson could not be added!");
    }
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      // once response is received
      // console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video Lesson could not be uploaded.");
    }

    // console.log("video upload handled");
  };

  const handleVideoRemoval = async () => {
    // console.log("Remove video");
    try {
      setUploading(true);
      // video: values.video
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setProgress(0);
      setUploading(false);
      setUploadButtonText("Add Another Video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video Removal Failed!");
    }
  };

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to publish this course?"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      toast("Your course is live.");
    } catch (err) {
      toast("Your course could not be published.");
    }
  };
  const handleUnPublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you unpublish this course, it will no longer be live!"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);
      toast("Your course has been unpublished!");
    } catch (err) {
      console.log("could not unpublish this course...", err);
      toast("Course could not be unpublished.");
    }
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
                  <EditOutlined
                    className="h5 pointer text-warning mr-4"
                    onClick={() =>
                      router.push(`/instructor/course/edit/${slug}`)
                    }
                  />
                </Tooltip>

                {course.lessons && course.lessons.length < 5 ? (
                  <Tooltip title="Five lessons required to publish">
                    <WarningFilled className="h5 text-danger" />
                  </Tooltip>
                ) : course.published ? (
                  <Tooltip title="Revert">
                    <CloseOutlined
                      onClick={(e) => handleUnPublish(e, course._id)}
                      className="h5 text-danger"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Publish">
                    <CheckOutlined
                      onClick={(e) => handlePublish(e, course._id)}
                      className="h5"
                      style={{ color: "#4100d9" }}
                    />
                  </Tooltip>
                )}
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
              <AddLessonForm
                values={values}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemoval={handleVideoRemoval}
              />
            </Modal>
            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length
                    ? course.lessons.length + "Lessons"
                    : "Start adding lessons..."}
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
