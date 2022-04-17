import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { Progress, Switch } from "antd";
import ReactPlayer from "react-player";

const UpdateLessonForm = ({
  current,
  setCurrent,
  uploading,
  handleUpdateLesson,
  uploadVideoButtonText,
  handleVideo,
  progress,
}) => {
  return (
    <div className="container pt-3">
      {/* {JSON.stringify(current)} */}
      <form onSubmit={handleUpdateLesson}>
        <input
          type={"text"}
          className="form-control square"
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          placeholder="Title"
          autoFocus
          required
        />
        <TextArea
          className="form-control mt-3"
          cols={7}
          rows={7}
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          value={current.content}
          required
        />
        <div
          className="pt-2"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <div>
            <label className="btn btn-dark btn-block text-left mt-3">
              {uploadVideoButtonText}
              <input
                onChange={handleVideo}
                type="file"
                accept="video/*"
                hidden
                required
              />
            </label>
            {!uploading && current.video && current.video.Location && (
              <div className="pt-2 d-flex justify-content-center">
                <ReactPlayer
                  url={current.video.Location}
                  width={"410px"}
                  height={"240px"}
                  controls
                />
              </div>
            )}
          </div>
          {progress > 0 && (
            <Progress className="pt-2" percent={progress} steps={10} />
          )}
          <div className="d-flex justify-content-between">
            <span className="pt-3">Preview</span>
            <Switch
              className="float-right mt-2"
              disabled={uploading}
              checked={current.free_preview}
              name="Free_Preview"
              onChange={(v) => setCurrent({ ...current, free_preview: v })}
            />
          </div>
          <br />
          <button
            onClick={handleUpdateLesson}
            style={{ maxWidth: "40%" }}
            className="btn btn-block col mt-2 modalColor"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
