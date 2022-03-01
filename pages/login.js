import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      // console.log("Response Data", data); // testing
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      window.localStorage.setItem("user", JSON.stringify(data));
      router.push("/user");
      toast.success(`We are always happy to see you.`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="jumbotron navBorder">
        <h3 className="navTitle">Sign In</h3>
        <p className="lead">
          Start Learning to your <span className="author">potential.</span>
        </p>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor={email}>E-mail</label>
            <input
              type={"email"}
              className="form-control p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
              placeholder="e-learner@example.com"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor={password}>Password</label>
            <input
              type={"password"}
              className="form-control mb-4 p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-success  col-12 p-2"
            type="submit"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Login"}
          </button>
        </form>
        <p className="lead-2 text-center pt-3">
          Not yet registered? &nbsp;
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>

        <p className="lead-3 text-center text-danger">
          <Link href={"/forgot-password"}>
            <a className="text-decoration-underline">Forgot Password ?</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
