import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateCartMutation } from "../api/req/ApiCart";

const Counter = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.price);

  const { isSignin, user } = useSelector((state) => state.auth);
  const [createCart, { data, isLoading, isSuccess, error, reset }] =
    useCreateCartMutation();

  const createCartHandler = () => {
    createCart({
      products: [{ id: product.id, quantity: quantity, price: price }],
    });
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuy = () => {
    if (!isSignin) {
      return toast.info("Please login first!");
    }
    if (!user?.address.id) {
      return toast.info("Please complete your address!");
    }
    const checkoutProduct = [
      {
        id: product.id,
        name: product.name,
        img: product.images[0].link,
        price: product.price,
        quantity,
        subtotal: price,
        stock: product.stock,
        weight: quantity * product.weight,
      },
    ];

    sessionStorage.setItem("checkout_product", JSON.stringify(checkoutProduct));

    navigate("/checkout");
  };

  useEffect(() => {
    setPrice(quantity * product.price);
  }, [quantity]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="rounded p-2 bg-white border border-2 shadow w-100 d-flex flex-column gap-2">
      <p className="m-0 h6">Quantity</p>

      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex gap-1 align-items-center p-1 rounded border">
          <button className="btn btn-pill btn-light" onClick={decreaseQuantity}>
            -
          </button>
          <p className="m-0 text-center text-secondary" style={{ width: 40 }}>
            {quantity}
          </p>
          <button className="btn btn-pill btn-light" onClick={increaseQuantity}>
            +
          </button>
        </div>

        <p className="m-0">
          Total Stock: <strong>{product.stock}</strong>
        </p>
      </div>

      <div className="d-flex align-items-center justify-content-between">
        <p className="m-0 fw-bold text-muted">Subtotal</p>
        <p className="m-0 fw-bold">{`Rp ${parseFloat(price).toLocaleString(
          "id-ID"
        )}`}</p>
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-outline-success" onClick={handleBuy}>
          Buy
        </button>
        <button className="btn btn-velora-success" onClick={createCartHandler}>
          + Cart
        </button>
      </div>
    </div>
  );
};

export default Counter;
