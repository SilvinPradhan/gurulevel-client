import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { Progress, Tooltip } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const AddLessonForm = ({
  values,
  setValues,
  uploading,
  handleAddLesson,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemoval,
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
        <div
          className="pt-2"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <div>
            <label className="btn btn-dark btn-block text-left mt-3">
              {uploadButtonText}
              <input
                onChange={handleVideo}
                type="file"
                accept="video/*"
                hidden
              />
            </label>
            {!uploading && values.video.Location && (
              <Tooltip title="Remove">
                <span onClick={handleVideoRemoval} className="pt-1 pl-3">
                  <CloseCircleFilled className="text-danger pt-4 pointer" />
                </span>
              </Tooltip>
            )}
          </div>
          {progress > 0 && (
            <Progress className="pt-2" percent={progress} steps={10} />
          )}
          <br />
          <button
            onClick={handleAddLesson}
            style={{ maxWidth: "40%" }}
            className="btn btn-block col mt-2 modalColor"
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
