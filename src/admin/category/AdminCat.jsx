import React, { useEffect, useState, useRef } from "react";
import Layout from "../layout/Layout";
import TableComponent from "../table/TableComponent";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../api/req/ApiCategory";
import { toast } from "react-toastify";
import MetaData from "../../components/meta/MetaData";

const AdminCat = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [image, setImage] = useState(null);
  const [catDetail, setCatDetail] = useState("");
  const fileInputRef = useRef(null);
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
  const [
    deleteCategory,
    {
      data: deleteCat,
      isLoading: isLoadingDeleteCat,
      isSuccess: isSuccessCat,
      error: errorCat,
      reset: resetCat,
    },
  ] = useDeleteCategoryMutation(id);

  const categories = rawData?.data;
  const addHandler = () => {
    const formData = new FormData();
    formData.append("id", catDetail.id ? catDetail.id : "");
    formData.append("name", name ? name : catDetail.name);
    formData.append("image", image);
    // addCategoryData(formData);
    console.log(formData);
  };
  const handleDeleteCat = (id) => {
    const categoryId = parseInt(id);
    deleteCategory(categoryId);
  };
  const closeModalHandler = () => {
    setName("");
    setImage(null);
    setCatDetail({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  useEffect(() => {
    if (isSuccessCat) {
      toast.success(deleteCat.message);
      resetCat();
    }
    if (errorCat) {
      toast.error(error.deleteCat.message);
      resetCat();
    }
  }, [isSuccessCat, errorCat, resetCat]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setName("");
      setImage(null);
      setCatDetail({});
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      reset();
    }
    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error, reset]);
  return (
    <Layout pageName={"Category"}>
      <MetaData title={"Admin Category"} desc={"Ecommerce easy shopping"} />
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
              <th className="text-center align-middle">Category</th>
              <th className="text-center align-middle">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, i) => (
              <tr key={i}>
                <td className="text-center align-middle">{i + 1}</td>
                <td className="text-center align-middle">{item.id}</td>
                <td className="text-center align-middle">
                  <div className="d-flex gap-2">
                    <img
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt={item.name}
                      className="circle"
                    />
                    <p className="m-0">{item.name}</p>
                  </div>
                </td>
                <td className="text-center align-middle">
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-velora-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#${id}`}
                      onClick={() => setCatDetail(item)}
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleDeleteCat(item.id)}
                      className="btn btn-danger"
                    >
                      {isLoadingDeleteCat ? "Loading.." : "Delete"}
                    </button>
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
                value={name ? name : catDetail.name || ""}
                placeholder="Category Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="form-control mt-2"
                onChange={(e) => setImage(e.target.files[0])}
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
