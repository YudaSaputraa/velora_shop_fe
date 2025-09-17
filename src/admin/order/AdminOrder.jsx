import React, { useState, useRef, useEffect } from "react";
import Layout from "../layout/Layout";
import TableComponent from "../table/TableComponent";
import {
  useCancelOrderMutation,
  useConfirmOrderMutation,
  useCreateResiMutation,
  useGetOrdersQuery,
} from "../../api/req/ApiOrder";
import { toast } from "react-toastify";
import MetaData from "../../components/meta/MetaData";

const AdminOrder = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const id = "ordersData";
  const idAddResi = "addResi";
  const fileInputRef = useRef(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [resi, setResi] = useState("");
  const [orderId, setOrderId] = useState("");

  const { data: rawData = {}, isLoading } = useGetOrdersQuery({
    search,
    page,
    limit,
  });
  const [
    createResi,
    {
      data: resiData,
      isLoading: resiLoad,
      isSuccess: successResi,
      error: resiError,
    },
  ] = useCreateResiMutation();
  const [
    confirmOrder,
    {
      data: confirmData,
      isLoading: confirmLoad,
      isSuccess: successConfirm,
      error: confirmError,
    },
  ] = useConfirmOrderMutation(orderId);
  const [
    rejectOrder,
    {
      data: rejectData,
      isLoading: rejectLoad,
      isSuccess: rejectSuccess,
      error: rejectError,
    },
  ] = useCancelOrderMutation(orderId);

  const closeModalHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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

  useEffect(() => {
    if (successResi) {
      toast.success(resiData.message);
      closeModalHandler();
      setOrderId("");
    }
    if (resiError) {
      toast.error(resiError.data.message);
      setOrderId("");
    }
  }, [successResi, resiError]);
  useEffect(() => {
    if (successConfirm) {
      closeModalHandler();
      toast.success(confirmData.message);
      setOrderId("");
    }
    if (confirmError) {
      toast.error(confirmError.data.message);
      setOrderId("");
    }
  }, [successConfirm, confirmError]);
  useEffect(() => {
    if (rejectSuccess) {
      closeModalHandler();
      toast.success(rejectData.message);
      setOrderId("");
    }
    if (rejectError) {
      toast.error(rejectError.data.message);
      setOrderId("");
    }
  }, [rejectSuccess, rejectError]);

  return (
    <Layout pageName={"Orders"}>
      <MetaData
        title={`(${rawData?.totalData}) Orders`}
        desc={"Ecommerce easy shopping"}
      />
      <TableComponent
        height={"75vh"}
        page={page}
        totalData={rawData?.totalData}
        setPages={setPage}
        totalPages={rawData?.totalPages}
        setSearch={setSearch}
      >
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Transaction Code</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Tracking Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, i) => (
              <tr key={i}>
                <td className="text-center align-middle">
                  {(page - 1) * limit + i + 1}
                </td>
                <td className="text-center align-middle">
                  {order.transaction_id}
                </td>
                <td>{order.user?.name}</td>
                <td>
                  {order.product?.map((item) => (
                    <p key={item.id}>{item.name}</p>
                  ))}
                </td>
                <td className="text-center align-middle">
                  {order.product?.map((item) => (
                    <p key={item.id}>{item.quantity}</p>
                  ))}
                </td>
                <td>{order.transaction_status}</td>
                <td className="text-center align-middle">
                  {renderStatusBadge(order.status_order)}
                </td>
                <td className="text-center align-middle">
                  {order.resi ? order.resi : "Data belum tersedia"}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn bg-velora-primary"
                      disabled={
                        order.status_order === "rejected" ||
                        order.status_order === "processing" ||
                        order.status_order === "shipping"
                      }
                      onClick={() => {
                        if (order?.id) {
                          confirmOrder(order.id);
                        } else {
                          toast.error("undefined order id");
                        }
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn bg-velora-secondary"
                      data-bs-toggle="modal"
                      data-bs-target={`#${id}`}
                      onClick={() => setOrderDetail(order)}
                    >
                      Detail
                    </button>
                    <button
                      className="btn bg-velora-success"
                      data-bs-toggle="modal"
                      disabled={
                        order.status_order === "rejected" &&
                        (!order.resi || order.resi.trim() === "")
                      }
                      data-bs-target={`#${idAddResi}`}
                      onClick={() => {
                        setOrderId(order?.id);
                        setResi("");
                      }}
                    >
                      Resi
                    </button>
                    <button
                      className="btn btn-danger"
                      disabled={
                        order.status_order === "processing" ||
                        order.status_order === "shipping"
                      }
                      onClick={() => {
                        if (order?.id) {
                          rejectOrder(order.id);
                        } else {
                          toast.error("undefined order id");
                        }
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableComponent>
      <div
        className="modal fade  modal-lg"
        id={id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {`Transaction ${orderDetail?.transaction_id}`}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModalHandler}
              ></button>
            </div>

            <div className="modal-body">
              <label>
                <strong>Recipient Data</strong>
              </label>
              <table className="table mt-2 table-borderless">
                <tbody>
                  <tr>
                    <td className="text-start pe-2">Recipient Name</td>
                    <td className="text-end">{orderDetail?.user?.name}</td>
                  </tr>
                  <tr>
                    <td className=" text-start pe-2">Phone</td>
                    <td className="text-end">{orderDetail?.user?.phone}</td>
                  </tr>
                  <tr>
                    <td className=" text-start pe-2">
                      Province / City / District / Village
                    </td>
                    <td className="text-end">
                      {`${orderDetail?.address?.province_name}, ${orderDetail?.address?.city_name}, ${orderDetail?.address?.district_name}, ${orderDetail?.address?.subdistrict_name}`}
                    </td>
                  </tr>
                  <tr>
                    <td className=" text-start pe-2">Address</td>
                    <td className="text-end">{orderDetail?.address?.detail}</td>
                  </tr>
                </tbody>
              </table>

              <label className="mt-3">
                <strong>Product Data</strong>
              </label>
              <table className="table mt-2 table-striped">
                <thead>
                  <tr>
                    <th>Product </th>
                    <th>Qty </th>
                    <th>Shipping </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail?.product.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.name}</td>
                      <td>{prod.quantity}</td>
                      <td>{`Rp ${parseFloat(prod.shipping).toLocaleString(
                        "id-ID"
                      )}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModalHandler}
              >
                Close
              </button>
              <button type="button" className="btn btn-velora-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* resi */}
      <div className="modal" id={idAddResi} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Input Resi</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Resi"
                value={resi || ""}
                onChange={(e) => setResi(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  {
                    console.log("SEND:", { id: orderId, resi });
                    createResi({ id: orderId, resi });
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
