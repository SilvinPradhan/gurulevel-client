import React, { useState, useEffect } from "react";
// import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CreateCourseForm from "../../../../components/forms/CreateCourseForm";

import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Avatar, List, Modal, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";

const { Item } = List;

const EditForm = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    category: "",
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
    lessons: [],
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Choose Image");
  // state for lesson update
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload Video");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios
          .post("/api/course/upload-image", {
            image: uri,
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
        console.log("Image uploaded", data);
        // set image in the state, set loading to false
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try again!");
        // TransformStream("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async () => {
    // console.log("REMOVED IMAGE");
    try {
      setValues({ ...values, loading: true });
      const res = await axios
        .post("/api/course/remove-image", { image })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image could not be deleted.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios
        .put(`/api/course/${slug}`, {
          ...values,
          image,
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      toast("Course successfully updated!");
      // router.push("/instructor");
    } catch (err) {
      console.log(err);
      toast(err.response.data);
    }
  };
  const handleDrag = (e, index) => {
    // console.log("ON drop", index);
    e.dataTransfer.setData("itemIndex", index);
  };
  const handleDrop = async (e, index) => {
    // console.log("ON deag", index);
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;

    let allLessons = values.lessons;

    let movingItem = allLessons[movingItemIndex];
    allLessons.splice(movingItemIndex, 1);
    allLessons.splice(targetItemIndex, 0, movingItem);
    setValues({ ...values, lessons: [...allLessons] });

    // save new lessons  order in database
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });
    console.log("Lessons rearranged => ", data.lessons);
    toast("Lessons re-arranged successfully!");
  };
  const handleDelete = async (index) => {
    const answer = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    if (!answer) return;
    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    setValues({ ...values, lessons: allLessons });
    //send request to the server
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log("lesson deleted", data);
  };

  // lesson update functions
  const handleVideo = async (e) => {
    console.log("handle video");
    // remove previous video
    if (current.video && current.video.Location) {
      const removeLessonVideo = await axios.post(
        `/api/course/video-remove/${values.instructor._id}`,
        current.video
      );
      console.log("Removed ==>", removeLessonVideo);
    }
    // finally upload update video
    const file = e.target.files[0];
    setUploadVideoButtonText(file.name);
    setUploading(true);

    // send video form data
    const videoData = new FormData();
    videoData.append("video", file);
    videoData.append("courseId", values._id);
    // save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );
    console.log(data);
    setCurrent({ ...current, video: data });
    setUploading(false);
    setProgress(0);
  };
  const handleUpdateLesson = async (e) => {
    console.log("handle update lesson");
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload Video");
    setVisible(false);
    // update UI
    if (data.ok) {
      let arr = values.lessons;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, lessons: arr });
      toast("Lesson has been successfully updated!");
    }
  };

  return (
    <InstructorRoute>
      <div className="jumbotron text-center">
        <h3 className="navTitle">Edit Course</h3>
      </div>
      <div style={{ width: "70%", margin: "0 auto", position: "relative" }}>
        <CreateCourseForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImage={handleImage}
          values={values}
          setValues={setValues}
          preview={preview}
          handleImageRemove={handleImageRemove}
          uploadButtonText={uploadButtonText}
          editPage={true}
        />
      </div>
      <hr />
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>
            {values && values.lessons && values.lessons.length
              ? values.lessons.length + " Lessons"
              : "First create lessons to edit."}
          </h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                  onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                  }}
                ></Item.Meta>
                <DeleteOutlined
                  onClick={() => handleDelete(index)}
                  className="text-danger"
                />
              </Item>
            )}
          />
        </div>
      </div>
      <Modal
        title="Update Lesson"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          progress={progress}
          uploading={uploading}
        />
      </Modal>
    </InstructorRoute>
  );
};

export default EditForm;
