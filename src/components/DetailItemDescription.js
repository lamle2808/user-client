import { useState, useEffect, useRef } from "react";
import "../styles/DetailItemDescription.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
  Chip,
  Tooltip,
  Badge,
  Divider,
  Paper,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SyncIcon from "@mui/icons-material/Sync";
import SellIcon from "@mui/icons-material/Sell";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toast } from "react-toastify";

const DetailItemDescription = (props) => {
  const [dataDes, setDataDes] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [productStock, setProductStock] = useState(0);
  const [stockType, setStockType] = useState([]);
  const [loading, setLoading] = useState(true);

  // Thêm đếm ngược thời gian
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 30,
    seconds: 0,
  });

  const timerRef = useRef(null);

  const dataUser = JSON.parse(localStorage.getItem("data"));
  const history = useHistory();

  useEffect(() => {
    if (props.data) {
      setLoading(true);
      axios
        .get(`/api/v1/products/getById/${props.data}`)
        .then(function (response) {
          setDataDes(response.data);
          setStockType(response.data.productSpecifications);
          console.log(response.data.productSpecifications);
          // Tính giá sau khi giảm
          if (response.data.sale !== null) {
            setDiscountedPrice(
              response.data.price -
                response.data.price * (response.data.sale.discount / 100)
            );
          } else {
            setDiscountedPrice(response.data.price);
          }

          // Lấy thông tin kích thước và màu sắc từ thông số kỹ thuật
          const specs = response.data.productSpecifications || [];
          const sizes = [];
          const colors = [];
          let stock = 0;
          specs.forEach((spec) => {
            if (spec.size) {
              const size = spec.size.trim();
              sizes.push(size);
              stock += parseInt(spec.count) || 0;
              setProductStock(stock);
            }
            if (spec.color) {
              colors.push(spec.color.trim());
            }
          });

          // Nếu không có dữ liệu từ API, thêm dữ liệu mẫu cho UI
          if (sizes.length === 0) {
            setAvailableSizes(["S", "M", "L", "XL", "XXL"]);
          } else {
            setAvailableSizes([...new Set(sizes)]);
          }

          if (colors.length === 0) {
            setAvailableColors(["Đen", "Trắng", "Xám Đậm", "Xanh Navy"]);
          } else {
            setAvailableColors([...new Set(colors)]);
          }

          // Nếu có kích thước và màu sắc, chọn mặc định giá trị đầu tiên
          setSelectedSize(sizes.length > 0 ? sizes[0] : "M");
          setSelectedColor(colors.length > 0 ? colors[0] : "Đen");
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          // Dữ liệu mẫu nếu API lỗi
          setAvailableSizes(["S", "M", "L", "XL", "XXL"]);
          setAvailableColors(["Đen", "Trắng", "Xám Đậm", "Xanh Navy"]);
          setSelectedSize("M");
          setSelectedColor("Đen");
          setLoading(false);
        });
    }
  }, [props.data]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timerRef.current);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.warning("Vui lòng chọn kích thước và màu sắc!");
      return;
    }
    const newPath = `/BuyNow/${props.data}`;
    history.push(newPath);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.warning("Vui lòng chọn kích thước và màu sắc!");
      return;
    }

    if (!dataUser || !dataUser.shoppingCart) {
      toast.error("Vui lòng đăng nhập để mua hàng!");
      return;
    }

    axios
      .post("/api/v1/shoppingCartDetails/saveOrUpdate", {
        product: { id: dataDes.id },
        shoppingCart: { id: dataUser.shoppingCart.id },
        quantity: quantity,
        // Thêm thông tin về size và color nếu có API hỗ trợ
        // size: selectedSize,
        // color: selectedColor
      })
      .then(function () {
        toast.success("Thêm vào giỏ hàng thành công");
      })
      .catch(function () {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < productStock) {
      setQuantity(quantity + 1);
    } else {
      toast.warning("Số lượng đã đạt mức tối đa!");
    }
  };

  const handleColorbtn = (color) => {
    setSelectedColor(color);

    const matched = stockType.find(
      (spec) => spec.color === color && spec.size === selectedSize
    );

    if (matched) {
      setProductStock(matched.count);
      // console.log(selectedSize);
    } else {
      setProductStock(0); // hoặc null nếu không tìm thấy
    }
  };
  const handleSizebtn = (size) => {
    setSelectedSize(size);
    const matched = stockType.find(
      (spec) => spec.size === size && spec.color === selectedColor
    );
    if (matched) {
      setProductStock(matched.count);
    } else {
      setProductStock(0); // hoặc null nếu không tìm thấy
    }
  };
  const getColorStyle = (color) => {
    const colors = {
      Đen: "#000000",
      Trắng: "#FFFFFF",
      "Xám Đậm": "#555555",
      "Xanh Navy": "#000080",
      Đỏ: "#FF0000",
      Xanh: "#0000FF",
      Vàng: "#FFFF00",
      Hồng: "#FFC0CB",
    };

    return {
      display: "inline-block",
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      backgroundColor: colors[color] || "#CCCCCC",
      marginRight: "6px",
      border: color === "Trắng" ? "1px solid #ddd" : "none",
    };
  };

  if (loading) {
    return (
      <Box
        className="loading-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <Typography variant="body1" sx={{ color: "#666" }}>
          Đang tải thông tin sản phẩm...
        </Typography>
      </Box>
    );
  }

  if (!dataDes && !loading) {
    return (
      <Box
        className="error-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <Typography variant="body1" sx={{ color: "#e63946" }}>
          Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.
        </Typography>
      </Box>
    );
  }

  return (
    <div className="ContainerDes">
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        {/* Thông tin thương hiệu và loại sản phẩm */}
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          <Chip
            label={`Thương hiệu: ${dataDes.brand?.name || "Louis Viuton"}`}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Loại: ${
              dataDes.category?.categoryName || "Áo thun có trơn tay ngắn"
            }`}
            size="small"
            color="secondary"
            variant="outlined"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StarIcon sx={{ color: "#ffc107", fontSize: 18 }} />
            <StarIcon sx={{ color: "#ffc107", fontSize: 18 }} />
            <StarIcon sx={{ color: "#ffc107", fontSize: 18 }} />
            <StarIcon sx={{ color: "#ffc107", fontSize: 18 }} />
            <StarIcon sx={{ color: "#ffc107", fontSize: 18 }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              (124 đánh giá)
            </Typography>
          </Box>
        </Box>

        {/* Tên sản phẩm */}
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2, color: "#1A374D" }}
        >
          {dataDes.productName || "Áo Thun Beginner 03 Vol 24 Đen"}
        </Typography>

        {/* Giá sản phẩm */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
            pb: 2,
            borderBottom: "1px dashed #eee",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#e63946", fontWeight: "bold" }}
          >
            {discountedPrice > 0
              ? discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              : "90.000"}{" "}
            đ
          </Typography>

          {(dataDes.sale || discountedPrice === 0) && (
            <>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: "line-through",
                  color: "#666",
                }}
              >
                {dataDes.price > 0
                  ? dataDes.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : "100.000"}{" "}
                đ
              </Typography>

              <Chip
                label={`-${dataDes.sale?.discount || 10}%`}
                color="error"
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </>
          )}

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              bgcolor: "#f8f9fa",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              ml: "auto",
            }}
          >
            <VerifiedIcon sx={{ color: "#28a745", fontSize: 16, mr: 0.5 }} />
            <Typography
              variant="body2"
              sx={{ color: "#28a745", fontWeight: "medium" }}
            >
              Còn hàng
            </Typography>
          </Box>
        </Box>

        {/* Flash Sale (Nếu có) */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 1,
            border: "1px solid #ffcccc",
            bgcolor: "rgba(255, 240, 240, 0.7)",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
          className="flash-sale-box"
        >
          <FlashOnIcon sx={{ color: "#e63946", fontSize: 24 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#e63946" }}
            >
              FLASH SALE - Ưu đãi có hạn
            </Typography>
            <Typography variant="body2">
              Giảm thêm 5% khi nhập mã: <b>FASHION05</b>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              bgcolor: "#e63946",
              color: "white",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: "bold",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </Typography>
          </Box>
        </Box>

        {/* Màu sắc */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: "#1A374D" }}
          >
            Màu sắc:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {availableColors.map((color, index) => (
              <Button
                key={index}
                variant={selectedColor === color ? "contained" : "outlined"}
                onClick={() => handleColorbtn(color)}
                sx={{
                  minWidth: "80px",
                  height: "40px",
                  bgcolor: selectedColor === color ? "#146C94" : "white",
                  color: selectedColor === color ? "white" : "#333",
                  border: "1px solid #ddd",
                  "&:hover": {
                    bgcolor: selectedColor === color ? "#146C94" : "#f5f5f5",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <span style={getColorStyle(color)}></span>
                {color}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Kích thước */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: "#1A374D" }}
          >
            Kích thước:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {availableSizes.map((size, index) => (
              <Button
                key={index}
                variant={selectedSize === size ? "contained" : "outlined"}
                onClick={() => handleSizebtn(size)}
                sx={{
                  minWidth: "45px",
                  height: "45px",
                  bgcolor: selectedSize === size ? "#146C94" : "white",
                  color: selectedSize === size ? "white" : "#333",
                  border: "1px solid #ddd",
                  "&:hover": {
                    bgcolor: selectedSize === size ? "#146C94" : "#f5f5f5",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {size}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Số lượng */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: "#1A374D" }}
          >
            Số lượng:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                border: "1px solid #ddd",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <Button
                onClick={decreaseQuantity}
                sx={{
                  minWidth: "40px",
                  borderRadius: 0,
                  borderRight: "1px solid #ddd",
                }}
              >
                -
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "50px",
                }}
              >
                {quantity}
              </Box>
              <Button
                onClick={increaseQuantity}
                sx={{
                  minWidth: "40px",
                  borderRadius: 0,
                  borderLeft: "1px solid #ddd",
                }}
              >
                +
              </Button>
            </Box>

            <Typography variant="body2" sx={{ color: "#666", ml: 1 }}>
              <b>{productStock}</b> sản phẩm có sẵn
            </Typography>
          </Box>
        </Box>

        {/* Ưu đãi khi mua hàng */}
        <Box
          sx={{
            mb: 3,
            bgcolor: "#f9f9f9",
            p: 2,
            borderRadius: 2,
            border: "1px solid #eee",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: "#e63946" }}
          >
            ƯU ĐÃI KHI MUA HÀNG:
          </Typography>
          <Stack spacing={1.5}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LocalShippingIcon sx={{ color: "#e63946" }} />
              <Typography variant="body2">
                Miễn phí ship toàn quốc đơn hàng từ 300.000đ
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <SyncIcon sx={{ color: "#e63946" }} />
              <Typography variant="body2">
                Đổi trả miễn phí trong 30 ngày nếu sản phẩm lỗi
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <SellIcon sx={{ color: "#e63946" }} />
              <Typography variant="body2">
                Giảm 10% cho đơn hàng tiếp theo khi đánh giá 5 sao
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AssignmentReturnIcon sx={{ color: "#e63946" }} />
              <Typography variant="body2">
                Tích điểm đổi quà với mỗi đơn hàng thành công
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Nút mua hàng và thêm vào giỏ */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "8px",
              bgcolor: "#e63946",
              boxShadow: "0 4px 8px rgba(230, 57, 70, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 6px 12px rgba(230, 57, 70, 0.4)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "all 0.7s ease",
              },
              "&:hover::before": {
                left: "100%",
              },
            }}
          >
            <Button
              variant="contained"
              onClick={handleBuyNow}
              startIcon={<FlashOnIcon />}
              endIcon={<ArrowForwardIcon />}
              disabled={productStock === 0}
              sx={{
                width: "100%",
                bgcolor: "transparent",
                py: 2,
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "none",
                letterSpacing: "1px",
                "&:hover": {
                  bgcolor: "transparent",
                },
                zIndex: 1,
                "&.Mui-disabled": {
                  opacity: 0.5,
                  cursor: "not-allowed",
                  bgcolor: "gray",
                },
              }}
            >
              MUA NGAY
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleAddToCart}
              startIcon={<ShoppingCartIcon />}
              disabled={productStock === 0}
              sx={{
                flexGrow: 1,
                borderColor: "#146C94",
                color: "#146C94",
                py: 1.5,
                fontWeight: "bold",
                borderRadius: "4px",
                "&:hover": {
                  borderColor: "#146C94",
                  bgcolor: "rgba(20, 108, 148, 0.04)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(20, 108, 148, 0.2)",
                },
                transition: "all 0.3s ease",
                "&.Mui-disabled": {
                  opacity: 0.5,
                  cursor: "not-allowed",
                  bgcolor: "gray",
                },
              }}
            >
              THÊM VÀO GIỎ
            </Button>
          </Box>

          {/* Phương thức thanh toán */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              pt: 2,
              borderTop: "1px dashed #eee",
            }}
            className="payment-method-container"
          >
            <Tooltip title="Thanh toán an toàn" arrow>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#666",
                  fontSize: "0.75rem",
                  gap: 0.5,
                }}
                className="payment-icon"
              >
                <SecurityIcon fontSize="small" />
                <Typography variant="caption">Bảo mật</Typography>
              </Box>
            </Tooltip>

            <Tooltip title="Thanh toán khi giao hàng" arrow>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#666",
                  fontSize: "0.75rem",
                  gap: 0.5,
                }}
                className="payment-icon"
              >
                <PaymentIcon fontSize="small" />
                <Typography variant="caption">COD</Typography>
              </Box>
            </Tooltip>

            <Tooltip title="Thẻ tín dụng/ghi nợ" arrow>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#666",
                  fontSize: "0.75rem",
                  gap: 0.5,
                }}
                className="payment-icon"
              >
                <CreditCardIcon fontSize="small" />
                <Typography variant="caption">Thẻ ngân hàng</Typography>
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default DetailItemDescription;
