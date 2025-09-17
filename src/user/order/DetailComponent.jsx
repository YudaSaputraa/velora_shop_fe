import React from "react";
import { formatDateLocal } from "../../utils/FormatDate";
import { formatToIdr } from "../../utils/FormatToIdr";
import { MapPinHouse, PackageOpen, ShoppingCart } from "lucide-react";

const DetailComponent = ({ order, id }) => {
  const renderStatusBadge = (status) => {
    const normalized = (status || "").toLowerCase();
    const classMap = {
      shipping: "badge-status badge-status-processing",
      processing: "badge-status badge-status-shipping",
      rejected: "badge-status badge-status-rejected",
      waiting: "badge-status badge-status-waiting",
    };
    const cls =
      classMap[normalized] || "badge-status bg-velora-secondary text-white";
    return <span className={cls}>{status || "-"}</span>;
  };
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby="orderDetailLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-3">
          {/* Header */}
          <div className="modal-header bg-velora-primary text-white">
            <h5 className="modal-title fw-bold" id="orderDetailLabel">
              <span className="text-white">{order?.transaction_id}</span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {/* Address */}
            <div className="card border-0 shadow mb-4">
              <div className="card-body">
                <h6 className="fw-bold mb-3 d-flex align-items-center  gap-2">
                  <MapPinHouse />
                  Shipping Address
                </h6>
                <table className="table table-borderless table-sm align-middle mb-0">
                  <tbody>
                    <tr>
                      <td className="fw-semibold">Label</td>
                      <td>{order?.address?.label || "-"}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Detail</td>
                      <td>{order?.address?.detail || "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Info */}
            <div className="card border-0 shadow mb-4">
              <div className="card-body">
                <h6 className="fw-bold mb-3  d-flex align-items-center  gap-2">
                  <PackageOpen />
                  Order Information
                </h6>
                <table className="table table-borderless table-sm align-middle mb-0 w-100">
                  <tbody>
                    <tr>
                      <th
                        className="text-nowrap fw-semibold"
                        style={{ whiteSpace: "nowrap", width: "1%" }}
                      >
                        Transaction Status
                      </th>
                      <td>
                        <span
                          className="badge p-2 text-white"
                          style={{ backgroundColor: "var(--success-color)" }}
                        >
                          {order?.transaction_status}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-nowrap fw-semibold">Order Status</th>
                      <td>
                        <span className=" p-2">
                          {renderStatusBadge(order?.status_order)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-nowrap fw-semibold">
                        Tracking Number
                      </th>
                      <td>{order?.resi}</td>
                    </tr>
                    <tr>
                      <th className="text-nowrap fw-semibold">Date</th>
                      <td>{formatDateLocal(order?.created_at)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Products */}
            <div className="card border-0 shadow mb-4">
              <div className="card-body">
                <h6 className="fw-bold mb-3  d-flex align-items-center  gap-2">
                  <ShoppingCart />
                  Products
                </h6>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th className="fw-semibold">Image</th>
                        <th className="fw-semibold">Product</th>
                        <th className="fw-semibold">Qty</th>
                        <th className="fw-semibold">Price</th>
                        <th className="fw-semibold">Shipping</th>
                        <th className="fw-semibold">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.product?.map((item, i) => (
                        <tr key={i}>
                          <td style={{ width: "100px" }}>
                            <img
                              src={item?.img}
                              alt={item?.name}
                              className="img-fluid rounded shadow-sm"
                              style={{
                                maxHeight: "80px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>{item?.name}</td>
                          <td>{item?.quantity}</td>
                          <td>{formatToIdr(item?.price)}</td>
                          <td>{formatToIdr(item?.shipping)}</td>
                          <td>{formatToIdr(item?.price * item?.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="text-end">
              <h4 className="fw-bold text-velora-success">
                {formatToIdr(order?.gross_amount)}
              </h4>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-velora-accent-light">
            <button
              type="button"
              className="btn btn-velora-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
