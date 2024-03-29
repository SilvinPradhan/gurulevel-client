import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("e-learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      console.log({ name, email, password });
      router.push("/login");
      toast.success(`Welcome to Gurulevel, ${name}. Procees to login.`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <>
      <div className="jumbotron text-right navBorder">
        <h3 className="navTitle">Sign Up</h3>
        <p className="lead">
          Unleash your <span className="author">potential!</span>
        </p>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={name}>Name</label>
            <input
              type={"name"}
              className="form-control  mb-4 p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e-learner"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor={email}>E-mail</label>
            <input
              type={"email"}
              className="form-control mb-4 p-3"
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
            className="btn btn-success col-12 p-2"
            type="submit"
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Register"}
          </button>
        </form>
        <p className="lead-2 text-center p-3">
          Already registered?
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
