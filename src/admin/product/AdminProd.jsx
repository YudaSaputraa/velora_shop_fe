import React, { useState, useRef, useEffect } from "react";
import Layout from "../layout/Layout";
import TableComponent from "../table/TableComponent";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../api/req/ApiProduct";
import { useGetCategoriesQuery } from "../../api/req/ApiCategory";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Images from "./Images";
import MetaData from "../../components/meta/MetaData";

const AdminProd = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(14);
  const fileInputRef = useRef(null);
  const [productDetail, setProductDetail] = useState("");
  const id = "addProduct";
  const [images, setImages] = useState([]);
  const [imagesCarousel, setImagesCarousel] = useState([]);
  const [value, setValue] = useState("");
  const [formDataProduct, setFormDataProduct] = useState({
    id: "",
    categoryId: "",
    name: "",
    price: "",
    capital: "",
    weight: "",
    stock: "",
  });

  const { data: rawData = {}, isLoading: productIsLoading } =
    useGetProductsQuery({ search, page, limit });
  const { data: rawDataCat, isLoading } = useGetCategoriesQuery({
    search: "",
    page: 1,
    limit: 1000,
  });
  const categories = rawDataCat?.data;
  const { data = [], totalPages, totalProducts } = rawData;
  const [
    addProductData,
    {
      data: productData,
      isLoading: isLoadingAddProd,
      isSuccess: isSuccessAddProd,
      error: errorAddProd,
      reset: resetAddProd,
    },
  ] = useAddProductMutation();

  const [
    deleteProduct,
    {
      data: deleteProd,
      isLoading: isLoadingDeleteProd,
      isSuccess: isSuccessDelProd,
      error: errorDelProd,
      reset: resetDelProd,
    },
  ] = useDeleteProductMutation(id);

  const handleDelete = (id) => {
    const productId = parseInt(id);
    deleteProduct(productId);
  };

  const addHandler = () => {
    const formData = new FormData();
    formData.append("id", productDetail.id ? productDetail.id : "");
    formData.append(
      "categoryId",
      formDataProduct.categoryId
        ? formDataProduct.categoryId
        : productDetail.category_id || ""
    );
    formData.append(
      "name",
      formDataProduct.name ? formDataProduct.name : productDetail.name || ""
    );
    formData.append(
      "price",
      formDataProduct.price ? formDataProduct.price : productDetail.price || ""
    );
    formData.append("desc", value ? value : productDetail.desc || "");
    formData.append(
      "capital",
      formDataProduct.capital
        ? formDataProduct.capital
        : productDetail.capital || ""
    );
    formData.append(
      "weight",
      formDataProduct.weight
        ? formDataProduct.weight
        : productDetail.weight || ""
    );
    formData.append(
      "stock",
      formDataProduct.stock ? formDataProduct.stock : productDetail.stock || ""
    );
    images.forEach((img) => {
      formData.append("images", img);
    });
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    // console.log(productDetail);

    addProductData(formData);
  };

  useEffect(() => {
    if (isSuccessAddProd) {
      toast.success(productData.message);
      setFormDataProduct({
        id: "",
        categoryId: "",
        name: "",
        price: "",
        capital: "",
        weight: "",
        stock: "",
      });
      setValue("");
      setImages([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      resetAddProd();
    }
    if (errorAddProd) {
      toast.error(errorAddProd.productData.message);
      reset();
    }
  }, [isSuccessAddProd, errorAddProd, resetAddProd]);

  useEffect(() => {
    if (productDetail) {
      setFormDataProduct({
        id: productDetail.id || "",
        categoryId: productDetail.category_id || "",
        name: productDetail.name || "",
        price: productDetail.price || "",
        capital: productDetail.capital || "",
        weight: productDetail.weight || "",
        stock: productDetail.stock || "",
      });
      setValue(productDetail.description || "");
    }
  }, [productDetail]);

  useEffect(() => {
    if (isSuccessDelProd) {
      toast.success(deleteProd.message);
      resetDelProd();
    }
    if (errorDelProd) {
      toast.error(errorDelProd.deleteProd.message);
      resetDelProd();
    }
  }, [isSuccessDelProd, errorDelProd, resetDelProd]);

  const closeModalHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Layout pageName={"Product"}>
      <MetaData title={"Products"} desc={"Ecommerce easy shopping"} />
      <TableComponent
        page={page}
        setPages={(e) => setPage(e)}
        totalPages={rawData?.totalPages}
        totalData={rawData?.totalProducts}
        setLimit={(e) => setLimit(e)}
        id={id}
        setSearch={(e) => setSearch(e)}
        height={"75vh"}
      >
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th className="text-center align-middle">No</th>
              <th className="text-center align-middle">Category</th>
              <th className="text-center align-middle">Image</th>
              <th className="text-center align-middle">Product</th>
              <th className="text-center align-middle">Capital</th>
              <th className="text-center align-middle">Price</th>
              <th className="text-center align-middle">Stock</th>
              <th className="text-center align-middle">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={i}>
                <td className="text-center align-middle">{i + 1}</td>
                <td className="text-center align-middle">
                  {item.category_name}
                </td>
                <td className="text-center align-middle">
                  <div
                    className="rounded overflow-hidden pointer"
                    style={{ height: 100, width: 100 }}
                    data-bs-toggle="modal"
                    data-bs-target="#images"
                    onClick={() => setImagesCarousel(item.images)}
                  >
                    <img
                      src={
                        item.images.length > 0
                          ? item.images[0].link
                          : "/image/no-data.png"
                      }
                      alt={`Gambar produk ${item.name}`}
                      width="100%"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </td>
                <td className="text-center align-middle">{item.name}</td>
                <td className="text-center align-middle">{`Rp ${parseFloat(
                  item.capital
                ).toLocaleString("id-ID")}`}</td>
                <td className="text-center align-middle">{`Rp ${parseFloat(
                  item.price
                ).toLocaleString("id-ID")}`}</td>
                <td className="text-center align-middle">{item.stock}</td>
                <td className="text-center align-middle">
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-velora-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#${id}`}
                      onClick={() => {
                        setProductDetail(item);
                        setValue(item.description);
                      }}
                    >
                      Detail
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
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
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Product
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
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Category
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  value={
                    formDataProduct.categoryId ||
                    productDetail.category_id ||
                    ""
                  }
                  onChange={(e) =>
                    setFormDataProduct((prev) => ({
                      ...prev,
                      categoryId: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    Choose Category
                  </option>
                  {categories?.map((category, i) => (
                    <option key={i} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                name="product"
                className="form-control mt-2"
                id="product_name"
                value={
                  formDataProduct.name
                    ? formDataProduct.name
                    : productDetail.name || ""
                }
                placeholder="Product Name"
                onChange={(e) =>
                  setFormDataProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                name="price"
                className="form-control mt-2"
                id="product_price"
                placeholder="Price"
                value={
                  formDataProduct.price
                    ? formDataProduct.price
                    : productDetail.price || ""
                }
                onChange={(e) =>
                  setFormDataProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
              {/* <input
                type="text"
                name="desc"
                className="form-control mt-2"
                id="product_desc"
                placeholder="Description"
                value={formDataProduct.desc ? formDataProduct.desc : ""}
                onChange={(e) =>
                  setFormDataProduct((prev) => ({
                    ...prev,
                    desc: e.target.value,
                  }))
                }
              /> */}
              <input
                type="number"
                name="capital"
                className="form-control mt-2"
                id="product_capital"
                placeholder="Capital"
                value={
                  formDataProduct.capital
                    ? formDataProduct.capital
                    : productDetail.capital || ""
                }
                onChange={(e) =>
                  setFormDataProduct((prev) => ({
                    ...prev,
                    capital: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                name="stock"
                className="form-control mt-2"
                id="product_stock"
                placeholder="Stock"
                value={
                  formDataProduct.stock
                    ? formDataProduct.stock
                    : productDetail.stock || ""
                }
                onChange={(e) =>
                  setFormDataProduct((prev) => ({
                    ...prev,
                    stock: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                name="weight"
                className="form-control mt-2"
                id="product_weight"
                placeholder="Weight in gram"
                value={
                  formDataProduct.weight
                    ? formDataProduct.weight
                    : productDetail.weight || ""
                }
                onChange={(e) =>
                  setFormDataProduct((prev) => ({
                    ...prev,
                    weight: e.target.value,
                  }))
                }
              />
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                className="form-control mt-2"
                onChange={(e) => setImages(Array.from(e.target.files))}
              />
              <div className="d-flex mt-2" style={{ height: 200 }}>
                <ReactQuill
                  style={{ width: "100%" }}
                  placeholder="Desctiption"
                  className="react-quill border border-2 rounded"
                  theme="snow"
                  value={value || productDetail.description || ""}
                  onChange={setValue}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                disabled={isLoadingAddProd}
                onClick={closeModalHandler}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-velora-primary"
                onClick={addHandler}
                disabled={isLoadingAddProd}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Images images={imagesCarousel} close={() => setImagesCarousel([])} />
    </Layout>
  );
};

export default AdminProd;
