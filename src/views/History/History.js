import { Box, CircularProgress, Stack } from "@mui/material";
import Left from "../User/Left";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckStatus, CheckStatusPay, ValueDate } from "./Style";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function History() {
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const [data, setData] = useState("");
  const historyasd = useHistory();
  useEffect(() => {
    axios
      .get(`/api/v1/orders/getByCustomer/${dataUser.id}`)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dataUser.id]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Người mua",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      renderCell: (params) => <CheckStatus {...params} />,
      flex: 1,
    },
    {
      field: "statusPayment",
      headerName: "Thanh toán",
      renderCell: (params) => <CheckStatusPay {...params} />,
      flex: 1,
    },
    {
      field: "paymentType",
      headerName: "Phương thức",

      flex: 1,
    },
    {
      field: "date",
      headerName: "Ngày lập",
      flex: 1,
      renderCell: (params) => <ValueDate {...params} />,
    },
  ];
  const handleOnCellClick = (params) => {
    historyasd.push(`/History/${params.id}`);
  };
  const datatable = () => {
    if (Array.isArray(data) && data.length !== 0) {
      return (
        <Box height="70vh" width="98%">
          <DataGrid
            rowHeight={50}
            rows={data.map((item) => ({
              id: item.id,
              name: item.customer.lastName + " " + item.customer.firstName,
              status: item.statusOrder,
              date: item.date,
              statusPayment: item.statusPayment,
              paymentType: item.paymentType,
            }))}
            density="comfortable"
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                csvOptions: {
                  fields: ["tid", "name", "description"],
                  utf8WithBom: true,
                  fileName: "TableTagData",
                },
              },
            }}
            onCellDoubleClick={handleOnCellClick}
            getRowHeight={() => "auto"}
            sx={{
              backgroundColor: "white",
              "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                py: 1,
              },
              "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                py: "8px",
              },
              "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                py: "10px",
              },
            }}
          />
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            height: "80vh",
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
        <Box sx={{ width: "100%" }}>{datatable()}</Box>
      </Stack>
    </Box>
  );
}

export default History;
