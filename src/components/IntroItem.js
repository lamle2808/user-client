import { useState, useEffect } from "react";
import "../styles/IntroItem.scss";

import axios from "axios";
import { Box, Button, Stack } from "@mui/material";

const IntroItem = (props) => {
  const [value, setValue] = useState("");
  const [heightBox, setHeight] = useState(true);
  const [spec, setSpec] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm xử lý thông số kỹ thuật trùng lặp
  const processSpecifications = (specifications) => {
    if (!specifications || !Array.isArray(specifications) || specifications.length === 0) {
      return [];
    }

    // Nhóm thông số theo tên
    const specGroups = {};
    specifications.forEach(spec => {
      if (!spec || !spec.specificationName) return;

      const name = spec.specificationName;
      const value = spec.specificationValue || "";

      if (!specGroups[name]) {
        specGroups[name] = new Set();
      }

      // Xử lý giá trị chứa dấu phẩy
      if (value.includes(",")) {
        value.split(",").forEach(v => {
          if (v.trim()) specGroups[name].add(v.trim());
        });
      } else if (value.trim()) {
        specGroups[name].add(value.trim());
      }
    });

    // Chuyển từ object thành mảng các đối tượng
    const result = [];
    for (const name in specGroups) {
      const values = Array.from(specGroups[name]);
      if (values.length > 0) {
        result.push({
          specificationName: name,
          specificationValue: values.sort().join(", ")
        });
      }
    }

    return result;
  };

  useEffect(() => {
    if (props.data) {
      setLoading(true);
      
      // Lấy thông tin sản phẩm
      axios
        .get(`/api/v1/products/getById/${props.data}`)
        .then(function (response) {
          console.log("Dữ liệu sản phẩm:", response.data);
          setValue(response.data.description || "");
          
          // Lưu data gốc để dùng nếu API mới không hoạt động
          const originalSpecs = response.data.specifications || [];
          
          // Thử gọi API mới
          axios.get(`/api/v1/productSpecifications/getUniqueSpecifications/${props.data}`)
            .then(function (specResponse) {
              console.log("Thông số kỹ thuật đã xử lý:", specResponse.data);
              
              if (specResponse.data && Array.isArray(specResponse.data) && specResponse.data.length > 0) {
                const filteredSpecs = specResponse.data.filter(
                  (item) => item && item.specificationValue && item.specificationValue !== ""
                );
                setSpec(filteredSpecs);
              } else {
                // Nếu API mới không trả về dữ liệu, tự xử lý dữ liệu gốc
                console.log("API mới không trả về dữ liệu, sử dụng dữ liệu gốc");
                const processedSpecs = processSpecifications(originalSpecs);
                setSpec(processedSpecs);
              }
              setLoading(false);
            })
            .catch(function (error) {
              console.log("Lỗi khi gọi API mới:", error);
              // Xử lý dữ liệu gốc nếu API mới lỗi
              const processedSpecs = processSpecifications(originalSpecs);
              setSpec(processedSpecs);
              setLoading(false);
            });
        })
        .catch(function (error) {
          console.log("Lỗi khi lấy dữ liệu sản phẩm:", error);
          setLoading(false);
        });
    }
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
            {loading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p>Đang tải thông tin...</p>
              </div>
            ) : (
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
                  __html: value || "<p style='text-align: center; padding: 20px;'>Chưa có mô tả sản phẩm</p>" 
                }}
              ></div>
            )}
          </Box>
          <Box
            sx={{
              width: 450,
              backgroundColor: "white",
              borderRadius: 5,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              overflow: "hidden",
              height: heightBox ? 200 : "auto",
            }}
          >
            <h4
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              Thông tin sản phẩm
            </h4>
            <div
              style={{ 
                overflow: heightBox ? "hidden" : "visible",
                height: heightBox ? 100 : "auto",
              }}
            >
              {loading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <p>Đang tải thông tin...</p>
                </div>
              ) : spec && spec.length > 0 ? (
                <table className="table">
                  <tbody>
                    {spec.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            width: 200,
                            backgroundColor:
                              index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                            padding: "8px",
                            fontWeight: "500",
                          }}
                        >
                          {item.specificationName}:
                        </td>
                        <td
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                            padding: "8px",
                          }}
                        >
                          {item.specificationValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <p>Chưa có thông tin chi tiết</p>
                </div>
              )}
            </div>
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
