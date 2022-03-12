import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";

const InstructorRoute = ({ children }) => {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      if (data.ok) setConfirm(true);
    } catch (err) {
      console.log(err);
      setConfirm(false);
      router.push("/");
    }
  };

  return (
    <>
      {!confirm ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-2 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <InstructorNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorRoute;
