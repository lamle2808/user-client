import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PaymentCallback = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Lấy các tham số từ URL
    const queryParams = new URLSearchParams(location.search);
    const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
    const vnp_TxnRef = queryParams.get("vnp_TxnRef");
    const vnp_Amount = queryParams.get("vnp_Amount");
    const vnp_BankCode = queryParams.get("vnp_BankCode");
    
    // Lưu thông tin thanh toán vào localStorage
    if (vnp_ResponseCode) {
      localStorage.setItem("payment_result", JSON.stringify({
        vnp_ResponseCode,
        vnp_TxnRef,
        vnp_Amount,
        vnp_BankCode,
        timestamp: new Date().getTime()
      }));
    }
    
    // Nếu có data user, sử dụng để cập nhật thông tin thanh toán
    const dataUser = localStorage.getItem("data");
    
    const processPaymentResult = async () => {
      try {
        if (vnp_ResponseCode === "00") {
          // Nếu có dataUser, cập nhật trạng thái thanh toán
          if (dataUser) {
            await axios.post("/api/v1/payments/updatePaymentStatus", {
              orderId: vnp_TxnRef,
              responseCode: vnp_ResponseCode
            });
          }
          
          // Thanh toán thành công, chuyển đến trang thành công
          history.push("/SuccessOrder");
        } else {
          // Thanh toán thất bại
          toast.error("Thanh toán không thành công. Vui lòng thử lại!");
          history.push("/");
        }
      } catch (error) {
        console.error("Lỗi xử lý kết quả thanh toán:", error);
        toast.error("Có lỗi xảy ra khi xử lý thanh toán");
        history.push("/");
      }
    };

    processPaymentResult();
  }, [history, location.search]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      flexDirection: "column"
    }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Đang xử lý...</span>
      </div>
      <p style={{ marginTop: 16 }}>Đang xử lý kết quả thanh toán...</p>
    </div>
  );
};

export default PaymentCallback; 