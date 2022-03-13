import React, { useState, useEffect } from "react";
// import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CreateCourseForm from "../../../components/forms/CreateCourseForm";

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
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };
  const handleImage = (e) => {
    e.preventDefault();
    console.log(values);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(values);
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
          values={values}
          setValues={setValues}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CreateCourse;
