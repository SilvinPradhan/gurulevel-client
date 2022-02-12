import { useState } from "react";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ name, email, password });
  };
  return (
    <>
      <div className="jumbotron text-right navBorder">
        <h3 className="navTitle">Sign Up</h3>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <div class="form-group mb-4">
            <label for={name}>Name</label>
            <input
              type={"name"}
              className="form-control p-3"
              value={name}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e-learner"
              autoFocus
            />
          </div>

          <div class="form-group mb-4">
            <label for={email}>E-mail</label>
            <input
              type={"email"}
              className="form-control p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
              autoComplete={false}
              placeholder="e-learner@example.com"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div class="form-group">
            <label for={password}>Password</label>
            <input
              type={"password"}
              className="form-control mb-4 p-3"
              value={password}
              autoComplete={false}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-block btn-success p-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
