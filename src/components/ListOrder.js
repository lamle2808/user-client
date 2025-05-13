import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Order.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OrderDetail from "./OrderDetail";
import { toast } from "react-toastify";
const ListOrder = () => {
  const [listOrder, setListOrder] = useState([]);
  const [user, setUser] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("data"));
    setUser(temp);
  }, []);

  const cancelOrder = (id) => {
    const form = {
      id: id,
      statusOrder: "Hủy",
    };
    axios
      .post(`/api/v1/orders/saveOrUpdate`, form)
      .then((res) => {
        console.log(res.data);
        //   history.push("/Personal");
        toast.success("Bạn đã hủy đơn hàng thành công");
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra vui lòng thử lại sau!");
        console.log(error);
      });
  };

  const handleViewOrderDetail = (order) => {
    history.push(`/OrderDetail/${order.id}`, { orderData: order });
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/v1/orders/getByCustomer/${user.id}`)
        .then((res) => {
          setListOrder(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);
  function calculateTotal(orderDetails) {
    return orderDetails.reduce((total, orderDetail) => {
      const productTotal = orderDetail.quantity * orderDetail.product.price;
      return total + productTotal;
    }, 0);
  }

  return (
    <div className="container-xxl ">
      {listOrder.map((order) => (
        <div key={order.id} className="order-item">
          <div className="headerOrder">
            <div className="h-container">
              <span style={{ marginLeft: "2em", color: "#9DB2BF" }}>
                Ngày tạo đơn:{" "}
                <span style={{ color: "#9DB2BF" }}>
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </span>
              <span style={{ color: "#9DB2BF" }}>
                Trạng thái: {order.statusOrder}
              </span>
            </div>
            <div className="h-container">
              <span style={{ color: "#DDE6ED", marginLeft: "2em" }}>
                {" "}
                {order.id}
              </span>
              <span style={{ color: "#9DB2BF" }}>Thanh toán khi nhận hàng</span>
            </div>
          </div>
          {order.orderDetails.map((orderDetail) => (
            <div className="orderItemContainer">
              <span className="h-container" style={{ color: "#176B87" }}>
                {orderDetail.product.productName}
                <span style={{ marginInline: "1em" }}>
                  x{orderDetail.quantity}
                </span>
              </span>
              <div key={orderDetail.id} className="h-container orderDetails">
                <img
                  src={
                    orderDetail.product.imageProducts.length > 0
                      ? orderDetail.product.imageProducts[0].imageLink
                      : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png"
                  }
                  alt="Product"
                />
                <span className="totalOrder" style={{ color: "#176B87" }}>
                  {orderDetail.quantity * orderDetail.product.price} VND
                </span>
              </div>
            </div>
          ))}
          <div className="footerOrder">
            <div
              className="h-container mx-4"
              style={{ justifyContent: "right", color: "#E74646" }}
            >
              Tổng tiền: {calculateTotal(order.orderDetails).toFixed(2)} VND
            </div>
            <div
              className="h-container px-2"
              style={{ justifyContent: "right", paddingBottom: "1em" }}
            >
              <button
                className="btn btn-danger"
                onClick={() => cancelOrder(order.id)}
              >
                Hủy đơn hàng
              </button>
              {/* <button className="btn btn-danger">Hủy đơn hàng</button> */}
              <button
                className="btn btn-light mx-2"
                onClick={() => {
                  //   handleShowOrderDetail(order);
                  handleViewOrderDetail(order);
                }}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      ))}
      {showOrderDetail && (
        <OrderDetail setShowOrderDetail={setShowOrderDetail} />
      )}
    </div>
  );
};

export default ListOrder;
