import React, { useEffect, useState } from "react";
import { Select, Button, Avatar } from "antd";
const { Option } = Select;

const CreateCourseForm = ({
  handleChange,
  handleImage,
  handleSubmit,
  values,
  setValues,
  preview,
  uploadButtonText,
}) => {
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group pb-3">
        <input
          type={"text"}
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group pb-3">
        <textarea
          name="description"
          cols="7"
          placeholder="Add Course Description..."
          rows="7"
          value={values.description}
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-row pb-3">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <Select
                value={values.paid}
                size="large"
                style={{ width: "100%" }}
                onChange={(v) => setValues({ ...values, paid: !values.paid })}
              >
                <Option value={true}>Paid</Option>
                <Option value={false}>Free</Option>
              </Select>
            </div>
          </div>
          {values.paid && (
            <div className="col-md-6">
              <div className="form-group">
                <Select
                  defaultValue="$9.99"
                  style={{ width: "100%" }}
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size="large"
                >
                  {children}
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-group pb-3">
        <input
          type={"text"}
          name="category"
          className="form-control"
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
        ></input>
      </div>

      <div className="form-row pb-3 justify-content-center">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="btn btn-outline-primary text-left">
                {uploadButtonText}
                <input
                  type="file"
                  name="image"
                  onChange={handleImage}
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          {preview && (
            <div className="col-md-8">
              <div className="form-group">
                <Avatar width={200} src={preview} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row pb-3">
        <div className="col">
          <Button
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            className="btn btn-primary btn-lg"
            loading={values.loading}
            type="primary"
            size="large"
            shape="round"
          >
            {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateCourseForm;
