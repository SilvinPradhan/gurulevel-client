/* Logic */
// once user completes the onboarding process
// user gets redirected back to /stripe/callback
// useEffect to make request to backend to fetch the updated user info from stripe
// this updated information must have payment_enabled set to true

import React, { useContext, useEffect } from "react";
import { Context } from "../../context";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";

const StripeCallback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      axios.post("/api/get-account-status").then((res) => {
        console.log(res);
        dispatch({
          type: "LOGIN",
          // set payload to updated account status in the response.data
          payload: res.data,
        });
        window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/instructor";
      });
    }
  }, [user]);
  return (
    <SyncOutlined
      spin
      className="d-flex
      justify-content-center
      display-1
      text-danger
      p-5"
    />
  );
};

export default StripeCallback;
