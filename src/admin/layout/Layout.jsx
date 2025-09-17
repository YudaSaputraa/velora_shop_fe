import React, { useEffect, useState } from "react";
import { Menus } from "./Menus";
import { useNavigate } from "react-router-dom";
import Protected from "../../components/auth/Protected";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../api/slice/AuthSlice";
import { useLogoutMutation } from "../../api/req/ApiAuth";
import { toast } from "react-toastify";
import { useGetOrdersQuery } from "../../api/req/ApiOrder";
const Layout = ({ children, pageName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000000);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [logout, { isSuccess, data, error, isLoading }] = useLogoutMutation();
  const { data: rawData = {} } = useGetOrdersQuery({
    search,
    page,
    limit,
  });

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
  const waitingOrdersCount =
    rawData?.data?.filter(
      (order) => (order.status_order || "").toLowerCase() === "waiting"
    ).length || 0;

  return (
    <div className="min-vh-100 bg-light">
      <Protected roles={["admin"]} />
      <div className="container-fluid bg-velora-secondary">
        <header className="navbar navbar-dark sticky-top flex-md-nowrap p-2">
          <a
            className="navbar-brand fw-bold col-md-3 col-lg-2 me-0 px-5"
            href="/"
          >
            VELORA
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
                className="btn btn-danger"
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
                      className={`nav-item rounded mx-2 my-1 ${
                        isActive ? "sidebar-item-active" : "sidebar-item"
                      }`}
                      onClick={() => navigate(menu.link)}
                    >
                      <div className="position-relative nav-link d-flex align-items-center gap-2 pointer py-2">
                        <Icon size={20} strokeWidth={2.2} />
                        <p className="m-0">{menu.label}</p>

                        {menu.label === "Orders" && (
                          <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {waitingOrdersCount}
                            <span className="visually-hidden">
                              waiting order
                            </span>
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom bg-white border p-2 rounded shadow">
              <h3 className="h4">{pageName}</h3>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
