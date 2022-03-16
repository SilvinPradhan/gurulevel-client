import React, { useState, useEffect } from "react";
// import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CreateCourseForm from "../../../components/forms/CreateCourseForm";

import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";

const CreateCourse = () => {
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
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };
  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
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
      const res = await axios.post("/api/course/remove-image", { image });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <InstructorRoute>
      <div className="jumbotron text-center">
        <h3 className="navTitle">Create Course</h3>
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
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CreateCourse;
