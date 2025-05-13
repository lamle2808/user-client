import "../styles/OrderDetail.scss";
import OrderTracking from "./OrderTracking";
import { useLocation } from "react-router-dom";

const OrderDetail = () => {
  function calculateTotal(orderDetails) {
    return orderDetails.reduce((total, orderDetail) => {
      const productTotal = orderDetail.quantity * orderDetail.product.price;
      return total + productTotal;
    }, 0);
  }

  const location = useLocation();
  const order = location.state.orderData;

  return (
    <div className="container-xxl DetailContainer">
      <div className="h-container" style={{ justifyContent: "space-around" }}>
        <div style={{ fontSize: "25px" }}>CHI TIẾT ĐƠN HÀNG {order.id}</div>
      </div>

      <div
        className="h-container"
        style={{
          justifyContent: "space-around",

          textDecoration: "underline",
        }}
      >
        Thông tin khách hàng
      </div>

      <div className="h-container">
        <div> Mã khách hàng : {order.customer.id}</div>
        <div>
          Họ tên : {order.customer.lastName} {order.customer.firstName}
        </div>
      </div>
      <div className="h-container">
        <div>Địa chỉ nhận hàng : {order.customer.address}</div>
        <div> Số điện thoại : {order.customer.phone}</div>
      </div>

      {/* ==================NHÂN VIÊN=================================== */}
      <hr />

      {order.employee ? (
        <>
          <div className="h-container">Thông tin nhân viên</div>
          <div className="h-container">
            <div> Mã nhân viên : {order.employee.id}</div>
            <div>
              Họ tên : {order.employee.lastName} {order.employee.firstName}
            </div>
          </div>
          <div className="h-container">
            <div> Số điện thoại : {order.employee.phone}</div>
          </div>
        </>
      ) : (
        <></>
      )}

      <OrderTracking orderStatus={order.statusOrder} />

      {/* ===============================ĐƠN HÀNG =============================== */}
      <div key={order.id} className="order-item">
        <div className="headerOrder">
          <div className="h-container">
            <span style={{ marginLeft: "2em", color: "#9DB2BF" }}>
              Ngày tạo đơn:{" "}
              <span style={{ color: "#9DB2BF" }}>
                {new Date(order.date).toLocaleDateString()}
              </span>
            </span>
            <span style={{ color: "#F0F0F0" }}>
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
                className="imgOrderDetail"
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
            {/* <button onClick={() => cancelOrder(order.id)}>Hủy đơn hàng</button> */}
            <button className="btn btn-danger">Hủy đơn hàng</button>
          </div>
        </div>
      </div>

      {/* =====ORDER TRACKING */}
    </div>
  );
};
export default OrderDetail;
