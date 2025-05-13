import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Left from "../User/Left";
import { useEffect, useState } from "react";
import axios from "axios";
import { GridBox, SaleDis, ValueDate2 } from "./Style";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Detail() {
  const [data, setData] = useState("");
  const [sum, setSum] = useState("");
  const idO = useParams();
  const userId = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    axios
      .get(`/api/v1/orders/getOrderById/${idO.id}`)
      .then(function (response) {
        setData(response.data);
        setSum(
          response.data.orderDetails.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [idO.id]);

  const columns = [
    {
      field: "name",
      headerName: "Tên sản phẩm",
      flex: 1,
    },
    {
      field: "loai",
      headerName: "Loại",
      flex: 1,
    },
    {
      field: "brand",
      headerName: "Thương hiệu",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      flex: 0.5,
    },

    {
      field: "price",
      headerName: "Giá",
      renderCell: (params) => <SaleDis value={params.row} />,
      flex: 0.5,
    },
  ];
  const checkS = (value) => {
    if (value === "1") {
      return " Đang xử lý ";
    } else if (value === "2") {
      return " Đang vận chuyển";
    } else if (value === "3") {
      return " Hoàn thành";
    } else {
      return " Đã hủy";
    }
  };

  const handleError = () => {
    Swal.fire({
      title: "Điền lý do hủy",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      reverseButtons: "true",
      cancelButtonText: "Hủy",
      preConfirm: async (login) => {
        const stt = "0" + login;
        if (login !== "") {
          axios
            .post(`/api/v1/orders/updateStatus/${userId.id}`, [
              {
                statusOrder: stt,
                id: idO.id,
              },
            ])
            .then(function (response) {
              Swal.fire({
                title: "Thành công",
                icon: "success",
              });
              axios
                .get(`/api/v1/orders/getOrderById/${idO.id}`)
                .then((res) => {
                  setData(res.data);
                })
                .catch((error) => console.log(error));
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          Swal.fire({
            title: "Vui lòng điền lý do",
            icon: "error",
          });
        }
      },
    });
  };
  const BoxNav = () => {
    if (data.statusOrder.charAt(0) === "0") {
      return (
        <GridBox
          item
          md={4}
          sx={{
            width: 250,
            paddingLeft: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            Lý do
          </Typography>
          <Box>
            <Typography>{data.statusOrder.substring(1)}</Typography>
          </Box>
        </GridBox>
      );
    } else if (data.statusOrder !== "3") {
      return (
        <GridBox
          item
          md={4}
          sx={{
            width: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="error" onClick={handleError}>
            Hủy đơn
          </Button>
        </GridBox>
      );
    } else {
      return "";
    }
  };

  const checkData = () => {
    if (data !== "") {
      return (
        <Paper
          sx={{
            flex: 1,
            mx: "auto",
            width: "97%",
            p: 1,
            backgroundColor: "#E3EFFD",
          }}
        >
          <Stack direction="column" spacing={1} sx={{ height: 1 }}>
            <Typography
              variant="h4"
              sx={{ textAlign: "center" }}
            >{`Hóa đơn ${idO.id}`}</Typography>

            <Grid
              sx={{
                display: "flex",
                paddingLeft: 3,
                paddingRight: 3,
                justifyContent: "center",
              }}
            >
              <BoxNav />

              {/* {data.statusOrder !== "1" ? (
                <GridBox item md={4} sx={{ paddingLeft: 2, width: 300 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    Nhân viên
                  </Typography>

                  <Typography variant="body1">
                    Tên:{" "}
                    {data.employee !== ""
                      ? data.employee.lastName + " " + data.employee.firstName
                      : "Tên"}
                  </Typography>
                  <Typography variant="body1">
                    SDT: {data.employee !== "" ? data.employee.phone : "Email"}
                  </Typography>
                  <Typography variant="body1">
                    Email:{" "}
                    {data.employee !== "" ? data.employee.email : "Email"}
                  </Typography>
                </GridBox>
              ) : null} */}
            </Grid>
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                padding: 3,
              }}
            >
              <GridBox
                item
                md={4}
                sx={{
                  paddingLeft: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Thông tin khách hàng
                </Typography>
                <Typography variant="body1">
                  Họ và tên:
                  {" " + data.customer.lastName + " " + data.customer.firstName}
                </Typography>
                <Typography variant="body1">
                  Email: {data.customer.email}
                </Typography>
                <Typography variant="body1">
                  SDT: {data.customer.phone}
                </Typography>
                <Typography variant="body1">
                  Địa chỉ: {data.customer.address}
                </Typography>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    Ghi chú
                  </Typography>
                  <Typography>{data.note || "Không có"}</Typography>
                </Box>
              </GridBox>
              <GridBox
                item
                md={4}
                sx={{
                  paddingLeft: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Thông tin đơn
                </Typography>
                <Stack direction={"row"}>
                  <Typography variant="body1"> Trạng thái: </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {checkS(data.statusOrder)}
                  </Typography>
                </Stack>
                <Typography variant="body1">
                  Phương thức: {data.paymentType}
                </Typography>
                <Stack direction={"row"}>
                  <Typography variant="body1">Thanh toán: </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {data.statusPayment === 1
                      ? " Đã thanh toán"
                      : "Chưa thanh toán"}
                  </Typography>
                </Stack>
                <Typography variant="body1">
                  Tổng hóa đơn:{" "}
                  {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Typography>
                <Typography variant="body1">
                  Ngày lập: {ValueDate2(data.date)}
                </Typography>
              </GridBox>
            </Grid>

            {data !== "" ? (
              <DataGrid
                localeText={{
                  toolbarColumns: "Cột",
                  toolbarDensity: "Khoảng cách",
                  toolbarFilters: "Lọc",
                  toolbarExport: "Xuất ",
                }}
                rows={data.orderDetails.map((item) => ({
                  id: item.id,
                  name: item.product.productName,

                  price: item.product.price,
                  quantity: item.quantity,
                  sale: item.saleId,
                  loai: item.product.category.categoryName,
                  brand: item.product.brand.name,
                }))}
                columns={columns}
                sx={{ flex: 1, backgroundColor: "white", height: 500 }}
                hideFooter
              />
            ) : (
              <></>
            )}
          </Stack>
        </Paper>
      );
    } else {
      return (
        <Box
          sx={{
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
  };
  return (
    <Box
      sx={{ flex: 1, display: "flex", justifyContent: "center", marginTop: 2 }}
    >
      <Stack direction={"row"} sx={{ width: "80vw" }} gap={5}>
        <Left />
        <Box sx={{ width: "100%" }}>{checkData()}</Box>
      </Stack>
    </Box>
  );
}

export default Detail;
