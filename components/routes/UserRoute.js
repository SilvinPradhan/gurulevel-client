import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

const UserRoute = ({ children }) => {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if (data.ok) setConfirm(true);
    } catch (err) {
      console.log(err);
      setConfirm(false);
      router.push("/login");
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
        <>{children}</>
      )}
    </>
  );
};

export default UserRoute;
