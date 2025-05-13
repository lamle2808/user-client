import { useState, useEffect } from "react";
import "../styles/IntroItem.scss";

import axios from "axios";
import { Box, Button, Stack } from "@mui/material";

const IntroItem = (props) => {
  const [value, setValue] = useState("");
  const [heightBox, setHeight] = useState(true);

  // Hàm xử lý thông số kỹ thuật trùng lặp
  useEffect(() => {
    axios
      .get(`/api/v1/products/getById/${props.data}`)
      .then(function (response) {
        // xử trí khi thành công
        setValue(response.data.description);
      })
      .catch(function (error) {
        // xử trí khi bị lỗi
        console.log(error);
      })
      .finally(function () {
        // luôn luôn được thực thi
      });
  }, [props.data]);
  const handleHeight = () => {
    setHeight(!heightBox);
  };

  return (
    <div className="container-fluid p-3 bg-light rounded ">
      <Box>
        <Stack
          direction={"row"}
          gap={5}
          sx={{
            justifyContent: "space-between",
            height: heightBox ? 200 : "auto",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              flex: 1,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              padding: 2,
              borderRadius: 5,
            }}
          >
            <h4
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              Mô tả sản phẩm
            </h4>

            <div
              className="product-description"
              style={{
                flex: 1,
                backgroundColor: "white",
                height: heightBox ? 100 : "auto",
                maxHeight: heightBox ? 100 : "none",
                overflow: heightBox ? "hidden" : "visible",
                transition: "all 0.3s ease",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  value ||
                  "<p style='text-align: center; padding: 20px;'>Chưa có mô tả sản phẩm</p>",
              }}
            ></div>
          </Box>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <Button
            variant="outlined"
            onClick={handleHeight}
            sx={{
              width: 400,
              borderRadius: 5,
              backgroundColor: "#146C94",
              color: "white",
              fontSize: 20,
              ":hover": {
                color: "black",
              },
            }}
          >
            {heightBox ? "Xem chi tiết" : "Thu gọn"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};
export default IntroItem;
