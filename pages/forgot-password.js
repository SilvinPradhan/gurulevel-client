import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState("");

  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();
  useEffect(() => {
    if (user !== null) router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast.success("Please check your email to get the CODE.");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(email, code, newPassword);
    return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div className="jumbotron text-center navBorder">
        <h1 className="display-5 navTitle">Forgot Password</h1>
        <p className="lead">
          Don't worry! We got it all{" "}
          <span className="author">figured out.</span>
        </p>
        <p className="subTitle">
          Check for an email after completing these steps.
        </p>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type={"email"}
            className="form-control mb-2 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            required
          />
          {success && (
            <>
              <input
                type={"text"}
                className="form-control mb-2 p-3"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Code"
                required
              />
              <input
                type={"password"}
                className="form-control mb-2 p-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                required
              />
            </>
          )}
          <hr />
          <button
            className="btn btn-warning col-12 p-3"
            disabled={loading || !email}
          >
            {loading ? <SyncOutlined spin /> : "Change Password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
