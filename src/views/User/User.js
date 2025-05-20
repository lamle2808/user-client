import { Box, Stack, Typography, Paper, Avatar, Card, CardContent, CardActions, Button, Grid } from "@mui/material";
import Left from "./Left";
import { useEffect, useState } from "react";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RedeemIcon from "@mui/icons-material/Redeem";
import { BtnDetail } from "./Style";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DiscountIcon from "@mui/icons-material/Discount";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useHistory } from "react-router-dom";

function User() {
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const [data, setData] = useState("");
  const history = useHistory();
  
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

  // Định dạng ngày tham gia từ API hoặc sử dụng ngày mặc định
  const formatJoinDate = () => {
    if (data && data.dateOfBirth) {
      const date = new Date(data.dateOfBirth);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    return "26/2/2017"; // Ngày mặc định
  };

  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center", marginTop: 2, backgroundColor: "#f5f5f5", pb: 4 }}>
      <Stack direction={"row"} sx={{ width: "90vw", maxWidth: 1200 }} gap={3}>
        <Left />
        <Box sx={{ width: "100%" }}>
          {/* Thông tin người dùng */}
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              p: 3,
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              flexWrap: {xs: "wrap", md: "nowrap"}
            }}
          >
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              flexDirection: {xs: "column", md: "row"},
              width: "100%"
            }}>
              {data && data.avatar && data.avatar.imageLink ? (
                <Avatar 
                  src={data.avatar.imageLink} 
                  alt={data.firstName} 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mr: {xs: 0, md: 3},
                    mb: {xs: 2, md: 0},
                    boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.2)"
                  }} 
                />
              ) : (
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mr: {xs: 0, md: 3},
                    mb: {xs: 2, md: 0},
                    bgcolor: "primary.main",
                    boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.2)"
                  }}
                >
                  <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
                </Avatar>
              )}
              
              <Box sx={{ 
                flex: 1,
                textAlign: {xs: "center", md: "left"},
                mb: {xs: 2, md: 0}
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
                  {data?.lastName} {data?.firstName}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
                  {data?.email}
                </Typography>
                <Stack 
                  direction="row" 
                  alignItems="center" 
                  sx={{ 
                    mt: 1,
                    justifyContent: {xs: "center", md: "flex-start"}
                  }}
                >
                  <CalendarMonthIcon sx={{ fontSize: 18, color: "primary.main", mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Ngày tham gia: {formatJoinDate()}
                  </Typography>
                </Stack>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => history.push("/Account")}
                sx={{ 
                  borderRadius: 2,
                  textTransform: "none",
                  px: 3
                }}
              >
                Cập nhật thông tin
              </Button>
            </Box>
          </Paper>

          {/* Chương trình khuyến mãi */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              backgroundImage: "linear-gradient(120deg, #1976d2, #64b5f6)",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, display: "flex", alignItems: "center" }}>
                  <DiscountIcon sx={{ mr: 1 }} /> Chương trình khuyến mãi nổi bật
                </Typography>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Typography variant="body1" sx={{ mb: 0.5 }}>Khuyến mãi Black Friday - Giảm đến 50%</Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 0.5 }}>Chương trình Back to School - Mua 2 tặng 1</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Ưu đãi 20/11 - Nhập mã giảm 20%</Typography>
                  </li>
                </ul>
              </Box>
              <Button 
                variant="contained"
                sx={{ 
                  backgroundColor: "white", 
                  color: "#1976d2", 
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  mt: {xs: 2, md: 0}
                }}
              >
                Xem tất cả
              </Button>
            </Box>
          </Paper>

          {/* Các thẻ thông tin */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: "100%", 
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                transition: "transform 0.2s", 
                "&:hover": { transform: "translateY(-5px)" } 
              }}>
                <CardContent sx={{ textAlign: "center", pt: 4 }}>
                  <Box sx={{ mb: 2, display: "inline-flex", p: 1.5, borderRadius: "50%", bgcolor: "#bbdefb" }}>
                    <RedeemIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Ưu đãi của bạn</Typography>
                  <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>0 ưu đãi hiện có</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                  <Button 
                    variant="outlined" 
                    sx={{ borderRadius: 2, textTransform: "none" }}
                  >
                    Xem chi tiết
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: "100%", 
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                transition: "transform 0.2s", 
                "&:hover": { transform: "translateY(-5px)" } 
              }}>
                <CardContent sx={{ textAlign: "center", pt: 4 }}>
                  <Box sx={{ mb: 2, display: "inline-flex", p: 1.5, borderRadius: "50%", bgcolor: "#c8e6c9" }}>
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 40, color: "#388e3c" }} />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Đơn hàng của bạn</Typography>
                  <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>6 đơn hàng đã mua</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                  <Button 
                    variant="outlined" 
                    color="success"
                    onClick={() => history.push("/History")}
                    sx={{ borderRadius: 2, textTransform: "none" }}
                  >
                    Xem chi tiết
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: "100%", 
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                transition: "transform 0.2s", 
                "&:hover": { transform: "translateY(-5px)" } 
              }}>
                <CardContent sx={{ textAlign: "center", pt: 4 }}>
                  <Box sx={{ mb: 2, display: "inline-flex", p: 1.5, borderRadius: "50%", bgcolor: "#ffcdd2" }}>
                    <FavoriteIcon sx={{ fontSize: 40, color: "#d32f2f" }} />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Sản phẩm yêu thích</Typography>
                  <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>Lưu sản phẩm yêu thích</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                  <Button 
                    variant="outlined" 
                    color="error"
                    sx={{ borderRadius: 2, textTransform: "none" }}
                  >
                    Xem danh sách
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}

export default User;
