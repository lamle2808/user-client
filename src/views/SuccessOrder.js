import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const SuccessOrder = () => {
  const history = useHistory();
  const location = useLocation();
  const [countdown, setCountdown] = useState(3);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Kiểm tra xem người dùng có đến từ trang thanh toán không
    const queryParams = new URLSearchParams(location.search);
    const fromPayment = queryParams.get("payment") === "success";
    const orderId = queryParams.get("orderId");
    
    // Hiển thị thông báo thành công
    if (fromPayment) {
      toast.success("Thanh toán thành công! Cảm ơn bạn đã mua hàng");
    } else {
      toast.success("Đặt hàng thành công! Cảm ơn bạn đã mua hàng");
    }
    
    // Nếu có orderId, lấy thông tin chi tiết đơn hàng
    if (orderId) {
      axios.get(`/api/v1/orders/getOrderById/${orderId}`)
        .then(response => {
          setOrderDetails(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Lỗi khi lấy thông tin đơn hàng:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    
    // Countdown và chuyển trang
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          history.push("/");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(countdownInterval);
    };
  }, [history, location.search]);

  const cardStyle = {
    background: "white",
    padding: "60px",
    borderRadius: "4px",
    boxShadow: "0 2px 3px #C8D0D8",
    with: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    textAlign: "center",
    margin: "0 auto",
  };

  const iconStyle = {
    color: "#9ABC66",
    fontSize: "100px",
    lineHeight: "200px",
    marginLeft: "-15px",
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div style={cardStyle}>
      <div
        style={{
          borderRadius: "200px",
          height: "200px",
          width: "200px",
          background: "#F8FAF5",
          margin: "0 auto",
        }}
      >
        <i className="checkmark" style={iconStyle}>
          ✓
        </i>
      </div>
      <h1
        style={{
          color: "#88B04B",
          fontFamily: "Nunito Sans",
          fontWeight: 900,
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        Đặt hàng thành công!
      </h1>
      
      {orderDetails && !loading && (
        <div style={{
          background: "#f8f9fa",
          padding: "15px",
          borderRadius: "5px",
          margin: "10px auto 20px",
          border: "1px solid #e9ecef",
          maxWidth: "80%",
          textAlign: "left"
        }}>
          <h4 style={{ color: "#495057", marginBottom: "10px", textAlign: "center" }}>Chi tiết đơn hàng #{orderDetails.id}</h4>
          
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ flex: "1", minWidth: "250px", padding: "0 10px" }}>
              <p style={{ margin: "5px 0", color: "#495057", fontWeight: "bold" }}>Thông tin khách hàng:</p>
              <p style={{ margin: "5px 0", color: "#495057" }}>
                Tên: {orderDetails.customer.lastName} {orderDetails.customer.firstName}
              </p>
              <p style={{ margin: "5px 0", color: "#495057" }}>
                Email: {orderDetails.customer.email}
              </p>
              <p style={{ margin: "5px 0", color: "#495057" }}>
                Điện thoại: {orderDetails.customer.phone || "Chưa cung cấp"}
              </p>
            </div>
            
            <div style={{ flex: "1", minWidth: "250px", padding: "0 10px" }}>
              <p style={{ margin: "5px 0", color: "#495057", fontWeight: "bold" }}>Thông tin thanh toán:</p>
              <p style={{ margin: "5px 0", color: "#495057" }}>
                Phương thức: {orderDetails.paymentType}
              </p>
              <p style={{ margin: "5px 0", color: "#495057" }}>
                Trạng thái: <span style={{ color: "#28a745", fontWeight: "bold" }}>Đã thanh toán</span>
              </p>
              <p style={{ margin: "5px 0", color: "#495057" }}>
                Ngày đặt: {new Date(orderDetails.date).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
          
          <hr style={{ margin: "15px 0" }} />
          
          <p style={{ margin: "5px 0", color: "#495057", fontWeight: "bold" }}>Sản phẩm:</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {orderDetails.orderDetails.map((item, index) => (
              <li key={index} style={{ 
                margin: "8px 0",
                padding: "8px",
                backgroundColor: "#fff",
                borderRadius: "4px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{item.product.productName}</span>
                  <span>x{item.quantity}</span>
                  <span>{formatPrice(item.product.price * item.quantity)} đ</span>
                </div>
                {item.productSpecification && (
                  <div style={{ 
                    display: "flex", 
                    gap: "10px", 
                    marginTop: "5px",
                    fontSize: "13px"
                  }}>
                    {item.productSpecification.size && (
                      <span style={{ 
                        backgroundColor: "rgba(0,0,0,0.05)", 
                        padding: "3px 8px", 
                        borderRadius: "4px",
                        display: "inline-flex"
                      }}>
                        <span style={{ fontWeight: "bold", marginRight: "4px" }}>Size:</span> 
                        {item.productSpecification.size}
                      </span>
                    )}
                    {item.productSpecification.color && (
                      <span style={{ 
                        backgroundColor: "rgba(0,0,0,0.05)", 
                        padding: "3px 8px", 
                        borderRadius: "4px",
                        display: "inline-flex"
                      }}>
                        <span style={{ fontWeight: "bold", marginRight: "4px" }}>Màu:</span> 
                        {item.productSpecification.color}
                      </span>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          <div style={{ 
            marginTop: "15px", 
            textAlign: "right", 
            fontWeight: "bold",
            fontSize: "16px",
            color: "#dc3545"
          }}>
            Tổng cộng: {formatPrice(orderDetails.orderDetails.reduce(
              (sum, item) => sum + (item.product.price * item.quantity), 0
            ))} đ
          </div>
        </div>
      )}
      
      <p
        style={{
          color: "#404F5E",
          fontFamily: "Nunito Sans",
          fontSize: "20px",
          margin: "0",
        }}
      >
        Chúng tôi đã nhận được đơn đặt hàng của bạn! Chúng tôi đang tiến hành
        gửi hàng cho bạn ! <br />
        Cảm ơn bạn đã mua hàng tại shop !
      </p>
      <p
        style={{
          color: "#88B04B",
          fontFamily: "Nunito Sans",
          fontSize: "16px",
          margin: "20px 0",
        }}
      >
        Đang chuyển hướng về trang chủ sau {countdown} giây...
      </p>
      <hr />
      <a href="/" style={{ textDecoration: "none" }}>
        Tiếp tục mua sắm ngay
      </a>
    </div>
  );
};

export default SuccessOrder;
