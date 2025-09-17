import React, { useEffect, useState } from "react";
import {
  useCreateCartMutation,
  useUpdateCartItemMutation,
} from "../../api/req/ApiCart";

const Products = ({ product, onSelect, cartId }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);
  const [weight, setWeight] = useState(product.weight);
  const [isChecked, setIsChecked] = useState(false);
  const unitPrice = product.price / product.quantity;

  const [updateCartItem, { data, isLoading, isSuccess, error, reset }] =
    useUpdateCartItemMutation();

  const increaseQuantity = async () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);

      await updateCartItem({
        cartId,
        productId: product.id,
        quantity: quantity + 1,
        price: (quantity + 1) * unitPrice,
      });
    }
  };

  const decreaseQuantity = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);

      await updateCartItem({
        cartId,
        productId: product.id,
        quantity: quantity - 1,
        price: (quantity - 1) * unitPrice,
      });
    }
  };

  useEffect(() => {
    setPrice(quantity * unitPrice);
    setWeight((product.weight / product.quantity) * quantity);
  }, [quantity]);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onSelect(product, quantity, weight, price, newCheckedState);
  };

  return (
    <div className="row align-items-center bg-white p-2 rounded border shadow">
      <div className="col-lg-3 col-6 mb-2">
        <div className="d-flex gap-2">
          <input
            type="checkbox"
            name="check"
            id="check"
            className="form-check-input pointer"
            onChange={handleCheckboxChange}
          />
          <div className="overflow-hidden" style={{ height: 100, width: 100 }}>
            <img
              src={product.img}
              width="100%"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-6">
        <p className="m-0">{product.name}</p>
        <p className="m-0 text-muted">{`${weight} gram`}</p>
        <p className="h6">{`Rp ${parseFloat(price).toLocaleString(
          "id-ID"
        )}`}</p>
      </div>
      <div className="col-lg-3 col-6">
        <div className="d-flex gap-1 align-items-center justify-content-between border rounded p-1">
          <button
            className="btn btn-pill bg-velora-success"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <p className="m-0 text-center text-secondary" style={{ width: 50 }}>
            {quantity}
          </p>
          <button
            className="btn btn-pill bg-velora-primary"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
