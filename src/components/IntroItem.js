import { useState, useEffect } from "react";
import "../styles/IntroItem.scss";
import axios from "axios";
import { Box, Button, Stack, Paper, Typography, Divider } from "@mui/material";

const IntroItem = (props) => {
  const [value, setValue] = useState("");
  const [heightBox, setHeight] = useState(true);
  const [productInfo, setProductInfo] = useState(null);

  // Lấy dữ liệu sản phẩm
  useEffect(() => {
    axios
      .get(`/api/v1/products/getById/${props.data}`)
      .then(function (response) {
        setValue(response.data.description);
        setProductInfo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.data]);

  const handleHeight = () => {
    setHeight(!heightBox);
  };

  return (
    <div className="intro-container">
      <Paper elevation={2} className="product-info-paper">
        <h4 className="info-title">Mô tả sản phẩm</h4>
        <Divider sx={{ mb: 2 }} />
        
        <div
          className="product-description"
          style={{
            height: heightBox ? 150 : "auto",
            maxHeight: heightBox ? 150 : "none",
            overflow: heightBox ? "hidden" : "visible",
            transition: "all 0.3s ease",
          }}
          dangerouslySetInnerHTML={{
            __html:
              value ||
              "<p style='text-align: center; padding: 20px;'>Chưa có mô tả sản phẩm</p>",
          }}
        ></div>
        
        {value && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="outlined"
              onClick={handleHeight}
              className="toggle-btn"
            >
              {heightBox ? "Xem chi tiết" : "Thu gọn"}
            </Button>
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default IntroItem;
