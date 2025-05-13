import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const CheckStatus = ({ value }) => {
  if (value === "1") {
    return <div>Đang xử lý</div>;
  } else if (value === "2") {
    return <div>Đang vận chuyển</div>;
  } else if (value === "3") {
    return <div>Hoàn thành</div>;
  } else {
    return <div>Đã hủy</div>;
  }
};
export const CheckStatusPay = ({ value }) => {
  if (value === 0) {
    return <div>Chưa thanh toán</div>;
  } else if (value === 1) {
    return <div>Đã thanh toán</div>;
  } else {
    <div>""</div>;
  }
};
export const ValueDate = ({ value }) => {
  const dateObject = new Date(value);
  const day = dateObject.getDate(); // Lấy ngày
  const month = dateObject.getMonth() + 1; // Lấy tháng (lưu ý: tháng trong JavaScript bắt đầu từ 0 nên phải cộng thêm 1)
  const year = dateObject.getFullYear(); // Lấy năm
  const hours = dateObject.getHours(); // Lấy giờ
  const minutes = dateObject.getMinutes(); // Lấy phút
  const date = `${hours}:${minutes} - ${day}/${month}/${year}`;
  return <div>{date}</div>;
};
export const ValueDate2 = (value) => {
  const dateObject = new Date(value);
  const day = dateObject.getDate(); // Lấy ngày
  const month = dateObject.getMonth() + 1; // Lấy tháng (lưu ý: tháng trong JavaScript bắt đầu từ 0 nên phải cộng thêm 1)
  const year = dateObject.getFullYear(); // Lấy năm
  const hours = dateObject.getHours(); // Lấy giờ
  const minutes = dateObject.getMinutes(); // Lấy phút
  const date = `${hours}:${minutes} - ${day}/${month}/${year}`;
  return date;
};
export const StackNav = styled(Stack)({
  width: "80%",
  backgroundColor: "white",
  justifyContent: "space-between",
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 20,
  border: "1px solid black",
  marginTop: 10,
});
export const BoxBtn = styled(Box)({
  backgroundColor: "white",
  padding: 10,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const GridBox = styled(Grid)({
  border: "1px solid black",
  borderRadius: 20,
  paddingTop: 2,
  paddingBottom: 10,
  backgroundColor: "white",
});
export const SaleDis = ({ value }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`/api/v1/sales/getById/${value.sale}`)
      .then((res) => {
        setData(res.data.discount);
      })
      .catch((error) => console.log(error));
  }, [value]);
  return (
    <Stack direction={"column"}>
      <Typography sx={{ textDecoration: "line-through" }}>
        {value.price} đ
      </Typography>
      <Typography>
        {(value.price - value.price * (data / 100))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
        đ
      </Typography>
    </Stack>
  );
};
