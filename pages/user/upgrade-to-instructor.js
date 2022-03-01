import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import { Button } from "antd";
import {
  UserSwitchOutlined,
  LoadingOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
// import UserRoute from "../../components/routes/UserRoute";

const UpgradeToInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const upgradeToInstructor = () => {
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast.error("Stripe onboarding unsuccessful.");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="jumbotron text-center">
        <h3 className="navTitle">Upgrade to Instructor</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <div className="pt-4">
                <UserSwitchOutlined className="display-1 pb-3" />
                <br />
                <h3>
                  Setup{" "}
                  <span style={{ color: "whitesmoke", fontFamily: "cursive" }}>
                    payout
                  </span>
                  &nbsp; to publish course on GuruLevel!
                </h3>
                <p className="lead" style={{ fontWeight: "inherit" }}>
                  We partner with <span style={{ color: "blue" }}>Stripe</span>{" "}
                  for quick and secure transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <Button
              className="mb-3"
              type="primary"
              shape="round"
              size="large"
              onClick={upgradeToInstructor}
              disabled={
                (user && user.role && user.role.includes("Instructor")) ||
                loading
              }
              icon={
                loading ? (
                  <LoadingOutlined />
                ) : (
                  <DollarCircleOutlined twoToneColor="#52c41a" />
                )
              }
            >
              {loading ? "Processing" : "Payout Setup"}
            </Button>
            <p className="lead">
              You will be redirected to Stripe to complete the onboarding
              process.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradeToInstructor;
