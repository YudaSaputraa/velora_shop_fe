import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ roles }) => {
  const navigate = useNavigate();
  const { user, signin } = useSelector((state) => state.auth);

  useState(() => {
    const timeout = setTimeout(() => {
      if (!user || !roles.includes(user.level) || !signin) {
        navigate("/signin");
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [user, signin, roles]);
  return null;
};

export default Protected;
