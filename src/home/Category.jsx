import React from "react";

const Category = ({ name, icon, id, setCategory, selectedId }) => {
  const handleSearchByCategory = (id) => {
    setCategory(id);
  };
  return (
    <div
      className={`d-flex gap-2 p-2 rounded border pointer category-item ${
        selectedId === id ? "category-item-active" : ""
      }`}
      onClick={() => handleSearchByCategory(id)}
    >
      <img
        src={icon}
        alt={name}
        className="rounded"
        style={{ width: "24px", height: "24px", objectFit: "cover" }}
      />
      <p className="m-0">{name}</p>
    </div>
  );
};

export default Category;
