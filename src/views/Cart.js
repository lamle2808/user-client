// Cart.js
import React, { useState, useEffect, useCallback } from "react";

import CartItem from "../components/CartItem";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

const Cart = () => {
  const accessToken = localStorage.getItem("token");
  const [dataUser, setDataUser] = useState();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const datatemp = localStorage.getItem("data");
  const [CartId, setCartId] = useState();
  const history = useHistory();
  // state để theo dõi trạng thái đã chọn của từng sản phẩm
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedItemCount, setSelectedItemCount] = useState(0);

  const fetchData = useCallback(async () => {
    axios
      .get(`/api/v1/shoppingCarts/getById/${CartId}`)
      .then(function (response) {
        console.log(response.data);
        setCart(response.data.cartItems);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [CartId]);

  useEffect(() => {
    if (cart.length > 0) {
      setTotal(
        cart.reduce((total, item) => {
          const result = total + item.quantity * item.product.price;
          return result;
        }, 0)
      );
    }
  }, [cart]);

  useEffect(() => {
    if (datatemp) {
      const parsedData = JSON.parse(datatemp);
      setDataUser(parsedData);

      if (parsedData && parsedData.shoppingCart && parsedData.shoppingCart.id) {
        setCartId(parsedData.shoppingCart.id);
      }
    }
  }, [datatemp]);

  useEffect(() => {
    if (CartId) {
      fetchData();
    }
  }, [CartId, fetchData]);

  const updateCart = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      setQuantity(
        cart.reduce((total, item) => {
          return total + item.quantity;
        }, 0)
      );
    }
  }, [cart]);

  const handleSelectItem = (itemId, isSelected) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: isSelected,
    }));
  };

  useEffect(() => {
    if (selectedItems) {
      const count = Object.values(selectedItems).filter(
        (isSelected) => isSelected
      ).length;
      setSelectedItemCount(count);

      // Tính tổng tiền dựa trên selectedItems và cập nhật quantity
      const { updatedTotal, updatedQuantity } = cart.reduce(
        (acc, item) => {
          if (selectedItems[item.id]) {
            acc.updatedTotal += item.quantity * item.product.price;
            acc.updatedQuantity += item.quantity;
          }
          return acc;
        },
        { updatedTotal: 0, updatedQuantity: 0 }
      );

      setTotal(updatedTotal);
      setQuantity(updatedQuantity);
    }
  }, [selectedItems, cart]);

  useEffect(() => {
    if (selectedItems) {
      const count = Object.values(selectedItems).filter(
        (isSelected) => isSelected
      ).length;
      setSelectedItemCount(count);
    }
  }, [selectedItems]);

  const handleCheckOut = () => {
    const listCheckout = cart
      .filter((item) => selectedItems[item.id])
      .map((item) => item.id);

    history.push("/Checkout", { listCheckout });
  };

  return (
    <section className="h-100 gradient-custom">
      <div className="container-xxl py-5">
        <div className="row container-lg">
          <div className="col-md-8">
            <div
              className="card mb-4 item"
              style={{ width: "45em", maxWidth: "50em" }}
            >
              <div className="card-header">
                <h5 className="mb-0"> {cart.length} mặt hàng</h5>
              </div>

              <div className="card-body">
                {dataUser ? (
                  cart.map((item, index) => {
                    return item.quantity !== 0 ? (
                      <CartItem
                        item={item}
                        key={index}
                        token={accessToken}
                        setCart={setCart}
                        updateCart={updateCart}
                        selected={selectedItems[item.id] || false}
                        onSelect={() =>
                          handleSelectItem(item.id, !selectedItems[item.id])
                        }
                      />
                    ) : null;
                  })
                ) : (
                  <div>Bạn chưa đăng nhập</div>
                )}
              </div>
            </div>
          </div>
          {/* ============================= Total */}
          <div className="col-md-4">
            <div
              className="card mb-4 "
              style={{ width: "25em", maxWidth: "25em" }}
            >
              <div className="card-header py-3">
                <h5 className="mb-0">
                  Tổng kết{" "}
                  <span className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    {selectedItemCount} mặt hàng đã chọn
                  </span>
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Tổng tiền
                    <span>{`${total.toFixed(2)} VND`}</span>
                    <span className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      {quantity}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    {/* Shipping */}
                    <span></span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Tổng số tiền</strong>
                      <strong>
                        <p className="mb-0">(Đã bao gồm VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>{`${total.toFixed(2)} VND`}</strong>
                    </span>
                  </li>
                  <strong>Thời gian giao hàng dự kiến</strong>
                  <p className="mb-5">3 ngày từ khi đặt hàng thành công</p>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={() => handleCheckOut()}
                >
                  Tiến hành thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
