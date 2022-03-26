import TextArea from "antd/lib/input/TextArea";
import React from "react";

const AddLessonForm = ({
  values,
  setValues,
  uploading,
  handleAddLesson,
  uploadButtonText,
  handleVideo,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type={"text"}
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          values={values.title}
          placeholder="Title"
          autoFocus
          required
        />
        <TextArea
          className="form-control mt-3"
          cols={7}
          rows={7}
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          values={values.content}
          placeholder="Content"
        />
        <div className="d-flex justify-content-between pt-2">
          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>
          <button
            onClick={handleAddLesson}
            style={{ maxWidth: "40%" }}
            className="btn btn-block col mt-3 modalColor"
            loading={uploading}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLessonForm;
