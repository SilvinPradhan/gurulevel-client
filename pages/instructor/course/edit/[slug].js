import React, { useState, useEffect } from "react";
// import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CreateCourseForm from "../../../../components/forms/CreateCourseForm";

import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

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
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Choose Image");

  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setValues(data);
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
        .put("/api/course", {
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
    </InstructorRoute>
  );
};

export default EditForm;
