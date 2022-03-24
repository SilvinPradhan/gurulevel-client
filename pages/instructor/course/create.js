import React, { useState } from "react";
// import axios from "axios";
import { Card, Col, Row } from "antd";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CreateCourseForm from "../../../components/forms/CreateCourseForm";

import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button, Modal, Tooltip } from "antd";

const CreateCourse = () => {
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
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Choose Image");
  const [modalValues, setModalValues] = useState({
    spin: false,
    visible: false,
  });

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
        .post("/api/course", {
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
      console.log(data);
      toast("Successfully Added the course. Now start adding lessons!");
      router.push("/instructor");
    } catch (err) {
      console.log(err);
      toast(err.response.data);
    }
  };

  // modal
  const displayModal = () => {
    setModalValues({
      ...modalValues,
      visible: true,
    });
  };

  const handleOk = () => {
    setModalValues({ ...modalValues, visible: false });
  };

  const handleCancel = () => {
    setModalValues({ ...modalValues, visible: false });
  };

  const { visible } = modalValues;
  return (
    <InstructorRoute>
      <div className="jumbotron text-center">
        <h3 className="navTitle">Create Course</h3>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "-14px", marginBottom: "7px" }}
      >
        <Tooltip title="Follow this Markdown">
          <Button className="modalColor" onClick={displayModal}>
            Open Markdown
          </Button>
        </Tooltip>
        <Modal
          title="Markdown for Description"
          visible={visible}
          centered
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
        >
          <h5>Overview to Markdown</h5>
          <span>usage, examples, links, snippets, and more.</span>
          <div className="site-card-wrapper container-fluid">
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Header" bordered={true}>
                  <div className="container row">
                    <ul style={{ textDecoration: "none" }}>
                      <li># h1</li>
                      <li>## h2</li>
                      <li>### h3</li>
                      <li>#### h4</li>
                      <li>##### h5</li>
                      <li>###### h6</li>
                    </ul>
                    <hr />
                    <p>Header 1</p>
                    <span>========</span>
                    <hr />
                    <p>Header 2</p>
                    <span>- - - - - - - -</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Emphasis" bordered={true}>
                  <p>*italic*</p>
                  <p>_italic_</p>
                  <hr />
                  <p>**italic**</p>
                  <p>__bold__</p>
                  <hr />
                  <p>***bold italic***</p>
                  <p>___bold italic___</p>
                  <hr />
                  <p>~~strikethrough~~</p>
                  <hr />
                  <p className="text-primary">`code`</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Lists" bordered={true}>
                  <p>* Item 1</p>
                  <p>* Item 2</p>
                  <hr />
                  <p>- Item 1</p>
                  <p>- Item 2</p>
                  <hr />
                  <p>- [ ] Checkbox off</p>
                  <p>- [x] Checkbox on</p>
                  <hr />
                  <p>1. Item 1</p>
                  <p>2. Item 2</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Images" bordered={true}>
                  <p>![Image alt text](/path/to/img.jpg)</p>
                  <p>![Image alt text](/path/to/img.jpg "title")</p>
                  <p>![Image alt text][img]</p>
                  <hr />
                  <p>[img]: http://foo.com/img.jpg</p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Code" bordered={true}>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp; 4 space indent</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp; makes a code block</p>
                  <hr />
                  <p>
                    ```
                    <br />
                    code fences
                    <br />
                    ```
                  </p>
                  <hr />
                  <p>
                    ```js
                    <br />
                    codeFences.withLanguage()
                    <br />
                    ```
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Links" bordered={true}>
                  <p>[link](http://google.com)</p>
                  <hr />
                  <p>
                    [link][google] <br />
                    [google]: http://google.com
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Blockqoutes" bordered={true}>
                  <p>
                    &gt; This is
                    <br /> &gt; a blockquote <br />
                    &gt; <br />
                    &gt; &gt; Nested
                    <br /> &gt; &gt; Blockquote
                  </p>
                </Card>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
      <div style={{ width: "70%", margin: "0 auto", position: "relative" }}>
        <CreateCourseForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImage={handleImage}
          handleImageRemove={handleImageRemove}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
        />
      </div>
    </InstructorRoute>
  );
};

export default CreateCourse;
