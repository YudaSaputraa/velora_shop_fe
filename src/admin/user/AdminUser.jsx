import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import TableComponent from "../table/TableComponent";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../api/req/ApiUser";
import MetaData from "../../components/meta/MetaData";

const AdminUser = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: rawData = {},
    isLoading,
    isSuccess,
    error,
  } = useGetAllUsersQuery({ search, page, limit });
  const { data = [], totalPages, totalUsers } = rawData;

  const [
    deleteUser,
    {
      data: delUser,
      isLoading: isLoadingDelUser,
      isSuccess: isSuccessDelUser,
      error: errorDelUser,
      reset: resetDelUser,
    },
  ] = useDeleteUserMutation();

  const handleDeleteUser = (id) => {
    const userId = parseInt(id);
    deleteUser(userId);
  };
  useEffect(() => {
    if (isSuccessDelUser) {
      toast.success(delUser.message);
      resetDelUser();
    }
    if (errorDelUser) {
      toast.error(error.delUser.message);
      resetDelUser();
    }
  }, [isSuccessDelUser, errorDelUser, resetDelUser]);

  return (
    <Layout pageName={"Users"}>
      <MetaData
        title={`(${totalUsers}) Users`}
        desc={"Ecommerce easy shopping"}
      />
      <TableComponent
        page={page}
        setPages={(e) => setPage(e)}
        totalPages={totalPages}
        totalData={totalUsers}
        setLimit={(e) => setLimit(e)}
        setSearch={(e) => setSearch(e)}
        height={"75vh"}
      >
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th className="text-center align-middle">No</th>
              <th className="text-center align-middle">Name</th>
              <th className="text-center align-middle">Email</th>
              <th className="text-center align-middle">Phone</th>
              <th className="text-center align-middle">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, i) => (
              <tr key={i}>
                <td className="text-center align-middle">{i + 1}</td>
                <td className="text-center align-middle">{user.name}</td>
                <td className="text-center align-middle">{user.email}</td>
                <td className="text-center align-middle">{`+62${user.phone}`}</td>
                <td className="text-center align-middle">
                  <div className="d-flex justify-content-center gap-2">
                    {/* <button
                      className="btn btn-velora-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#${id}`}
                      onClick={() => setUserDetail(user)}
                    >
                      Detail
                    </button> */}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      {isLoadingDelUser ? "Loading.." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableComponent>
    </Layout>
  );
};

export default AdminUser;
