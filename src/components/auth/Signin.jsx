import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../api/req/ApiAuth";
import { setLogin } from "../../api/slice/AuthSlice";
import { toast } from "react-toastify";
import MetaData from "../../components/meta/MetaData";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin, { isLoading, error }] = useSigninMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const loginHandler = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await signin(data).unwrap();
      dispatch(setLogin(response.data));
      if (response.data.level === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }

    // console.log(data);
  };

  useEffect(() => {
    if (user.id) {
      if (user.level === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [user]);

  return (
    <div className="liquid-glass-page">
      <div className="liquid-blob primary"></div>
      <div className="liquid-blob secondary"></div>
      <form
        className="glass-card d-flex flex-column gap-2"
        onSubmit={loginHandler}
      >
        <MetaData title={"SignIn"} desc={"Ecommerce easy shopping"} />
        <h4 className="glass-title">Welcome</h4>
        <p className="glass-subtitle">Sign in to continue your shopping</p>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="form-control glass-input"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={isShow ? "text" : "password"}
          name="email"
          id="password"
          placeholder="Password"
          className="form-control glass-input"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
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
            onClick={() => navigate("/signup")}
          >
            Don’t have an account?
          </p>
        </div>

        <div className="text-end mt-2">
          <button
            type="submit"
            className="btn btn-velora-primary"
            disabled={isLoading}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
