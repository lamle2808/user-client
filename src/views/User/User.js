import { Box, Stack, Typography } from "@mui/material";
import Left from "./Left";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PaidIcon from "@mui/icons-material/Paid";
import RedeemIcon from "@mui/icons-material/Redeem";
import { BoxItem, BtnDetail } from "./Style";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarsIcon from "@mui/icons-material/Stars";
function User() {
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get(`/api/v1/customer/getByPhone/${dataUser.phone}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dataUser.phone]);

  return (
    <Box
      sx={{ flex: 1, display: "flex", justifyContent: "center", marginTop: 2 }}
    >
      <Stack direction={"row"} sx={{ width: "80vw" }} gap={5}>
        <Left />
        <Box sx={{ width: "100%" }}>
          <Stack direction={"row"} gap={5} sx={{ width: "100%" }}>
            <Box
              sx={{
                backgroundColor: "white",
                flex: 1,
                textAlign: "center",
                paddingTop: 2,
                border: "1px solid black",
                borderRadius: 5,
              }}
            >
              <img src={logo} alt="avatar" width={50} />
              <Typography variant="h6">Xin chào</Typography>

              <Typography variant="h4">
                {data.lastName + " " + data.firstName}
              </Typography>
              <Stack
                direction={"row"}
                sx={{
                  padding: 2,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Box>
                  <Typography variant="subtitle1">Ngày tham gia</Typography>
                  <CalendarMonthIcon sx={{ fontSize: 60, color: "#63C0EA" }} />
                  <Typography variant="subtitle1">26/2/2017</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1">Hạng thành viên</Typography>
                  <WorkspacePremiumIcon
                    sx={{ fontSize: 60, color: "#F1B69B" }}
                  />
                  <Typography variant="subtitle1">Bạc</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1">Điểm tích lũy</Typography>
                  <PaidIcon sx={{ fontSize: 60, color: "#E5A8F3" }} />
                  <Typography variant="subtitle1">20000</Typography>
                </Box>
              </Stack>
            </Box>
            <Box
              sx={{
                width: 300,

                paddingTop: 2,
                border: "1px solid black",
                borderRadius: 5,
                backgroundColor: "#1a8dc1",
                color: "white",
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Chương trình nổi bật
                </Typography>
                <ul style={{ fontSize: 20 }}>
                  <li>Chương trình khuyến mãi Black Friday</li>
                  <li>Chương trình khuyến mãi Back to school</li>
                  <li>Chương trình khuyến mãi 20/11</li>
                </ul>
              </Box>
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <BoxItem sx={{ backgroundColor: "#63C0EA" }}>
              <RedeemIcon sx={{ fontSize: 60 }} />
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                Ưu đãi của bạn
              </Typography>

              <Typography variant="h5" sx={{ marginTop: 2 }}>
                0 ưu đãi
              </Typography>
              <BtnDetail variant="contained" sx={{ marginTop: 5 }}>
                Xem chi tiết
              </BtnDetail>
            </BoxItem>
            <BoxItem sx={{ backgroundColor: "#E5A8F3" }}>
              <LocalShippingIcon sx={{ fontSize: 60 }} />
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                Đơn hàng của bạn
              </Typography>
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                6 đơn hàng
              </Typography>
              <BtnDetail variant="contained" sx={{ marginTop: 5 }}>
                Xem chi tiết
              </BtnDetail>
            </BoxItem>
            <BoxItem sx={{ backgroundColor: "#F1B69B" }}>
              <StarsIcon sx={{ fontSize: 60 }} />
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                Hạng thành viên
              </Typography>
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                Khách hàng
              </Typography>

              <BtnDetail variant="contained" sx={{}}>
                Xem chi tiết
              </BtnDetail>
            </BoxItem>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default User;
