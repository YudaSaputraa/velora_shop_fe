import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/meta/MetaData";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setShow] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Data wajib diisi");
    }

    const data = { username, email, password };
  };

  return (
    <div className="liquid-glass-page">
      <MetaData title={"SignUp"} desc={"Ecommerce easy shopping"} />
      <div className="liquid-blob primary"></div>
      <div className="liquid-blob secondary"></div>
      <form
        className="glass-card d-flex flex-column gap-2"
        onSubmit={loginHandler}
      >
        <h4 className="glass-title">Create Account</h4>
        <p className="glass-subtitle">Sign up to start shopping at Velora</p>

        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nama Lengkap"
          className="form-control glass-input"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="form-control glass-input"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type={isShow ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password"
          className="form-control glass-input"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="d-flex justify-content-between align-items-center">
          <div className="form-check">
            <input
              type="checkbox"
              name="check"
              id="check"
              className="form-check-input pointer"
              onChange={() => setShow(!isShow)}
            />
            <label htmlFor="check" className="form-check-label glass-footer">
              Show Password
            </label>
          </div>

          <p
            className="m-0 pointer glass-footer"
            onClick={() => navigate("/signin")}
          >
            Already have an account?
          </p>
        </div>

        <div className="text-end mt-2">
          <button type="submit" className="btn btn-velora-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
