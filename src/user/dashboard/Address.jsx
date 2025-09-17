import React, { useState, useEffect } from "react";
import {
  useAddAddressMutation,
  useGetCitiesMutation,
} from "../../api/req/ApiAddress";
import { toast } from "react-toastify";
import { useLoadUserMutation } from "../../api/req/ApiAuth";
const Address = ({ user }) => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [citiesResult, setCitiesResult] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const filteredResult = citiesResult?.filter((item) =>
    item.subdistrict_name.toLowerCase().includes(search.toLowerCase())
  );
  const [formData, setFormData] = useState({
    id: "",
    address_id: "",
    label: "",
    province_name: "",
    city_name: "",
    district_name: "",
    subdistrict_name: "",
    zip_code: "",
    detail: "",
  });

  const [
    getCities,
    {
      data: cities,
      isLoading: cIsLoading,
      isSuccess: cIsSuccess,
      error: cError,
      reset: cReset,
    },
  ] = useGetCitiesMutation(city, {
    skip: !city,
  });

  const [loadUser] = useLoadUserMutation();
  const [
    addAddress,
    {
      data: addressData,
      isSuccess: aIsSuccess,
      isLoading: aIsLoading,
      error: aError,
      reset: aReset,
    },
  ] = useAddAddressMutation();

  const getCitiesData = () => {
    getCities(city);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addAddress(formData);
    console.log(formData);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.address?.id || "",
        address_id: user.address?.address_id || "",
        label: user.address?.label || "",
        province_name: user.address?.province_name || "",
        city_name: user.address?.city_name || "",
        district_name: user.address?.district_name || "",
        subdistrict_name: user.address?.subdistrict_name || "",
        zip_code: user.address?.zip_code || "",
        detail: user.address?.detail || "",
      });
    }
  }, [user]);
  useEffect(() => {
    if (aIsSuccess) {
      toast.success(addressData.message);
      aReset();
    }
    if (aError) {
      toast.error(aError.data.message);
      aReset();
    }
  }, [aIsSuccess, aError, aReset]);

  useEffect(() => {
    if (cIsSuccess) {
      setCitiesResult(cities);
    }
    if (cError) {
      toast.error(cError.data.message);
      cReset();
    }
  }, [cIsSuccess, cError, cReset]);

  useEffect(() => {
    if (selectedCity) {
      setFormData({
        id: user.address?.id || "",
        address_id: selectedCity?.id,
        label: selectedCity?.label,
        province_name: selectedCity?.province_name,
        city_name: selectedCity?.city_name,
        district_name: selectedCity?.district_name,
        subdistrict_name: selectedCity?.subdistrict_name,
        zip_code: selectedCity?.zip_code,
        detail: user.address?.detail || "",
      });
    }
  }, [selectedCity]);
  return (
    <form className="d-flex flex-column gap-3" onSubmit={submitHandler}>
      <div className="d-flex gap-2">
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Enter your city"
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
          className="form-control"
        />

        <button
          type="button"
          className="btn btn-velora-secondary"
          onClick={getCitiesData}
        >
          {cIsLoading ? "Finding.." : "Find"}
        </button>
      </div>
      {citiesResult.length > 0 && (
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Enter district"
          className="form-control"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {filteredResult.length > 0 && (
        <select
          className="form-select"
          onChange={(e) => {
            const selected = citiesResult.find(
              (item) => item.id == e.target.value
            );
            setSelectedCity(selected);
          }}
        >
          <option value="" hidden>
            Choose Address
          </option>
          {filteredResult?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      )}

      <input
        type="text"
        name="label"
        id="label"
        value={formData.label}
        readOnly
        className="form-control"
      />
      <textarea
        name="detail"
        id="detail"
        value={formData.detail || ""}
        className="form-control"
        placeholder="Alamat Lengkap"
        rows={4}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, detail: e.target.value }))
        }
      ></textarea>

      <div className="text-end">
        <button type="submit" className="btn btn-velora-success">
          {aIsLoading ? "Loading.." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default Address;
