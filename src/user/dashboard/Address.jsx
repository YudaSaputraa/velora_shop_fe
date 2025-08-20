import React, { useState, useEffect } from "react";
import {
  useGetCityQuery,
  useGetDistrictQuery,
  useGetProvincesQuery,
  useGetVillageQuery,
} from "../../api/req/ApiAddress";
const Address = ({ user }) => {
  const [formData, setFormData] = useState({
    province_id: "",
    province: "",
    city_id: "",
    city: "",
    district_id: "",
    district: "",
    village_id: "",
    village: "",
    detail: "",
  });
  const { data: provinces } = useGetProvincesQuery();
  const { data: cities } = useGetCityQuery(formData.province_id, {
    skip: !formData.province_id,
  });
  const { data: districts } = useGetDistrictQuery(formData.city_id, {
    skip: !formData.city_id,
  });
  const { data: villages } = useGetVillageQuery(formData.district_id, {
    skip: !formData.district_id,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        province_id: user.address?.province_id || "",
        province: user.address?.province || "",
        city_id: user.address?.city_id || "",
        city: user.address?.city || "",
        district_id: user.address?.district_id || "",
        district: user.address?.district || "",
        village_id: user.address?.village_id || "",
        village: user.address?.village || "",
        detail: user.address?.detail || "",
      });
    }
  }, [user]);
  return (
    <form className="d-flex flex-column gap-3">
      <select
        name="provinces"
        id="province"
        className="form-select"
        value={formData.province_id || ""}
        onChange={(e) => console.log(e.target.value)}
      >
        <option value="" hidden>
          Provinsi
        </option>
        {provinces?.map((province, i) => (
          <option key={i} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>

      <select
        name="cities"
        id="city"
        className="form-select"
        value={formData.city_id || ""}
        onChange={(e) => console.log(e.target.value)}
      >
        <option value="" hidden>
          Kota / Kabupaten
        </option>
        {cities?.map((city, i) => (
          <option key={i} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <select
        name="district"
        id="district"
        className="form-select"
        value={formData.district_id || ""}
        onChange={(e) => console.log(e.target.value)}
      >
        <option value="" hidden>
          Kecamatan
        </option>
        {districts?.map((district, i) => (
          <option key={i} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>

      <select
        name="village"
        id="village"
        className="form-select"
        value={formData.village_id || ""}
        onChange={(e) => console.log(e.target.value)}
      >
        <option value="" hidden>
          Desa
        </option>
        {villages?.map((village, i) => (
          <option key={i} value={village.id}>
            {village.name}
          </option>
        ))}
      </select>

      <textarea
        name="address"
        id="address"
        value={formData.detail || ""}
        className="form-control"
        placeholder="Alamat Lengkap"
        rows={4}
      ></textarea>

      <div className="text-end">
        <button className="btn btn-velora-success">Update</button>
      </div>
    </form>
  );
};

export default Address;
