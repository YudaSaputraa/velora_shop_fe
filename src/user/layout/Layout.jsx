import React, { useEffect } from "react";
import { Menus } from "./Menus";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Protected from "../../components/auth/Protected";
import { useLogoutMutation } from "../../api/req/ApiAuth";
import { toast } from "react-toastify";
import { setLogout } from "../../api/slice/AuthSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logout, { isSuccess, data, error, isLoading }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      dispatch(setLogout());
      navigate("/");
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  const location = useLocation();

  return (
    <div className="min-vh-100 bg-light">
      <Protected roles={["user"]} />
      <div className="container-fluid bg-velora-secondary">
        <header className="navbar navbar-dark sticky-top flex-md-nowrap p-2 bg-velora-secondary text-white">
          <a
            className="navbar-brand col-md-3 col-lg-2 me-0 px-5"
            href="/user-dashboard"
          >
            {user?.name || "Username"}
          </a>
          <button
            className="position-absolute  d-md-none collapsed btn btn-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>

          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <button
                className="btn btn-velora-accent"
                disabled={isLoading}
                onClick={logout}
              >
                <i className="bi bi-box-arrow-left"></i>
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="container-fluid">
        <div className="row" style={{ minHeight: "93vh" }}>
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse border shadow"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                {Menus.map((menu, i) => {
                  const Icon = menu.icon;
                  const isActive = location.pathname === menu.link;
                  return (
                    <li
                      key={i}
                      className={`nav-item rounded mx-2 my-1 ${isActive ? "sidebar-item-active" : "sidebar-item"}`}
                      onClick={() => navigate(menu.link)}
                    >
                      <div className="nav-link d-flex align-items-center gap-2 pointer py-2">
                        <Icon size={20} strokeWidth={2.2} />
                        <p className="m-0">{menu.label}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
