import React from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";

const PreviewModal = ({ modal, setModal, preview }) => {
  return (
    <>
      <Modal
        title="Course Preview"
        visible={modal}
        onCancel={() => setModal(!modal)}
        width={720}
        footer={null}
      >
        <div className="wrapper">
          <ReactPlayer
            url={preview}
            playing={modal}
            controls={true}
            width="100%"
            height={"100%"}
          />
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
