import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import TableComponent from "../table/TableComponent";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../../api/req/ApiCategory";
import { toast } from "react-toastify";

const AdminCat = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const id = "addCategory";

  const [name, setName] = useState("");
  const { data: rawData, isLoading } = useGetCategoriesQuery({
    search,
    page,
    limit,
  });
  const [
    addCategoryData,
    { data, isLoading: isLoadingCategory, error, isSuccess, reset },
  ] = useAddCategoryMutation();

  const categories = rawData?.data;
  const addHandler = () => {
    const data = { name };
    addCategoryData(data);
  };
  const closeModalHandler = () => {
    setName("");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }
    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error]);
  return (
    <Layout pageName={"Daftar Kategori"}>
      <TableComponent
        page={page}
        setPages={(e) => setPage(e)}
        totalPages={rawData?.totalPages}
        totalData={rawData?.totalCategory}
        setLimit={(e) => setLimit(e)}
        setSearch={(e) => setSearch(e)}
        id={id}
        height={"75vh"}
      >
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th className="text-center align-middle">No</th>
              <th className="text-center align-middle">_id</th>
              <th className="text-center align-middle">Kategori</th>
              <th className="text-center align-middle">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, i) => (
              <tr key={i}>
                <td className="text-center align-middle">{i + 1}</td>
                <td className="text-center align-middle">{item.id}</td>
                <td className="text-center align-middle">{item.name}</td>
                <td className="text-center align-middle">
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-velora-primary">Detail</button>
                    <button className="btn btn-danger">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableComponent>

      <div
        className="modal fade"
        id={id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Category
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
              <input
                type="text"
                name="category"
                className="form-control"
                id="category_name"
                value={name || ""}
                placeholder="Category Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                disabled={isLoading}
                onClick={closeModalHandler}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-velora-primary"
                onClick={addHandler}
                disabled={isLoading}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCat;
