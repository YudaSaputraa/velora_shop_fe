import React, { useState, useEffect, useRef, Fragment } from "react";
import Layout from "../layout/Layout";
import TableComponent from "../table/TableComponent";
import { useGetProfitQuery } from "../../api/req/ApiOrder";
import { formatToIdr } from "../../utils/FormatToIdr";
import { DownloadTableExcel } from "react-export-table-to-excel";
import MetaData from "../../components/meta/MetaData";

const AdminReport = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const tableRef = useRef(null);
  const { data: rawData } = useGetProfitQuery({ page, limit, search });

  const result = rawData?.data;
  const today = new Date();

  return (
    <Layout pageName={"Report"}>
      <MetaData title={"Admin Report"} desc={"Ecommerce easy shopping"} />
      <TableComponent
        height={"75vh"}
        page={page}
        setPages={(e) => setPage(e)}
        setLimit={(e) => setLimit(e)}
        setSearch={(e) => setSearch(e)}
        totalPages={rawData?.totalPages}
        totalData={rawData?.totalData}
      >
        <div className="d-flex justify-content-end">
          <DownloadTableExcel
            filename={`finance-report-${today.toISOString().split("T")[0]}`}
            sheet="report"
            currentTableRef={tableRef.current}
          >
            <button className="btn m-2 btn-velora-success">Export excel</button>
          </DownloadTableExcel>
        </div>
        <table ref={tableRef} className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Transaction Code</th>
              <th>Product</th>
              <th>Sale</th>
              <th>Capital</th>
              <th>Profit</th>
              <th>Total Profit</th>
            </tr>
          </thead>
          <tbody>
            {result?.map((item, i) => (
              <Fragment key={i}>
                <tr>
                  <td rowSpan={item.products.length}>
                    {(page - 1) * limit + i + 1}
                  </td>
                  <td rowSpan={item.products.length}>{item.transaction_id}</td>

                  <td>{item.products[0].name}</td>
                  <td>{formatToIdr(item.products[0].price)}</td>
                  <td>{formatToIdr(item.products[0].capital)}</td>
                  <td>{formatToIdr(item.products[0].profit)}</td>

                  <td rowSpan={item.products.length}>
                    {formatToIdr(item.total_profit)}
                  </td>
                </tr>
                {item.products?.slice(1).map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>
                      {parseFloat(item.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td>
                      {" "}
                      {parseFloat(item.capital).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td>
                      {" "}
                      {parseFloat(item.profit).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="7" className="text-end fw-bold">
                Total Penjualan
              </td>
            </tr>
          </tfoot>
        </table>
      </TableComponent>
    </Layout>
  );
};

export default AdminReport;
