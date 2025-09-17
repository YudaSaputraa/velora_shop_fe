import React, { useState, useRef, useEffect } from "react";
import Layout from "../layout/Layout";
import { useGetOrdersQuery } from "../../api/req/ApiOrder";
import { formatDateLocal } from "../../utils/FormatDate";
import { ShoppingBag } from "lucide-react";
import DetailComponent from "./DetailComponent";
import MetaData from "../../components/meta/MetaData";

const Order = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const id = "detailOrder";
  const { data: rawData, isLoading } = useGetOrdersQuery({
    search,
    page,
    limit,
  });

  const orders = rawData?.data;

  const renderStatusBadge = (status) => {
    const normalized = (status || "").toLowerCase();
    const classMap = {
      processing: "badge-status badge-status-processing",
      shipping: "badge-status badge-status-shipping",
      rejected: "badge-status badge-status-rejected",
      waiting: "badge-status badge-status-waiting",
    };
    const cls =
      classMap[normalized] || "badge-status bg-velora-secondary text-white";
    return <span className={cls}>{status || "-"}</span>;
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom bg-white border p-2 rounded shadow">
        <h3 className="h3">Transactions</h3>
      </div>
      <MetaData title={"Orders"} desc={"Ecommerce easy shopping"} />
      <div className="bg-white p-4 border shadow rounded orverflow-auto">
        {orders?.map((order, i) => (
          <div
            key={i}
            className="border shadow mt-2 rounded p-2 d-flex flex-column gap-2"
          >
            <div className="d-flex p-3 gap-2 flex-wrap rounded bg-velora-primary-light">
              <ShoppingBag strokeWidth="2px" />
              <p className="m-0">
                Shopping <span>{formatDateLocal(order?.created_at)}</span>
              </p>

              <p className=" m-0 ms-auto">{`${
                order?.status_order === "rejected"
                  ? "Rejected"
                  : order?.resi
                  ? order.resi
                  : "Awaiting confirmation"
              } `}</p>
            </div>
            <div className="row">
              {order?.product.map((product, idx) => (
                <div
                  key={idx}
                  className="col-lg-10 col-12 mb-3 d-flex align-items-center gap-3"
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={product?.img}
                      alt={product?.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div>
                    <p className="m-0 fw-bold">{product?.name}</p>

                    <p className="m-0 text-muted">x{product?.quantity}</p>
                  </div>
                </div>
              ))}
              <div className="col-lg-2 col-12">
                <p className="m-0 text-center">Total </p>
                <p className="m-0 text-center fw-bold">
                  {`Rp ${parseFloat(order?.gross_amount).toLocaleString(
                    "id-ID"
                  )}`}
                </p>
              </div>
            </div>
            <div className=" d-flex gap-2 align-items-center flex-wrap rounded">
              <p className="m-0">
                Status : {renderStatusBadge(order?.status_order)}
              </p>
              <button
                className="btn ms-auto btn-velora-success"
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
                onClick={() => setOrderDetail(order)}
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
      <DetailComponent order={orderDetail} id={id} />
    </Layout>
  );
};

export default Order;
