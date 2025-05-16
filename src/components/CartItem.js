// CartItem.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Typography,
  Alert,
  Divider,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningIcon from "@mui/icons-material/Warning";

const CartItem = (props) => {
  const { item, selected, onSelect } = props;
  console.log(props);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.quantity * item.product.price);
  const [stockQuantity] = useState(null);
  const [outOfStock] = useState(false);

  // Format giá theo định dạng Việt Nam
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN");
  };

  // Cập nhật lại giá khi quantity thay đổi
  useEffect(() => {
    setPrice(quantity * item.product.price);
  }, [quantity, item.product.price]);

  const handleQuantityItemPlus = async () => {
    // Kiểm tra tồn kho trước khi tăng số lượng
    if (stockQuantity !== null && quantity >= stockQuantity) {
      toast.error(
        `Sản phẩm "${
          item.product.productName || "Không xác định"
        }" chỉ còn ${stockQuantity} trong kho!`
      );
      return;
    }

    try {
      axios.post("/api/v1/shoppingCartDetails/saveOrUpdate", {
        id: item.id,
        product: { id: item.product.id },
        shoppingCart: { id: item.shoppingCart.id },
        quantity: quantity + 1,
      });

      setQuantity(quantity + 1);
      props.updateCart();
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  const handleQuantityItemMinus = async () => {
    if (quantity === 1) {
      try {
        await axios.delete(`/api/v1/shoppingCartDetails/delete/${item.id}`);

        props.updateCart();
        toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } else {
      try {
        axios.post("/api/v1/shoppingCartDetails/saveOrUpdate", {
          id: item.id,
          product: { id: item.product.id },
          shoppingCart: { id: item.shoppingCart.id },
          quantity: quantity - 1,
        });

        setQuantity(quantity - 1);
        props.updateCart();
        toast.success("Cập nhật sản phẩm thành công");
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) return;

    // Kiểm tra giới hạn tồn kho
    if (stockQuantity !== null && value > stockQuantity) {
      toast.error(
        `Sản phẩm "${
          item.product.productName || "Không xác định"
        }" chỉ còn ${stockQuantity} trong kho!`
      );
      return;
    }

    setQuantity(value);
  };

  const handleInputBlur = () => {
    try {
      axios.post("/api/v1/shoppingCartDetails/saveOrUpdate", {
        id: item.id,
        product: { id: item.product.id },
        shoppingCart: { id: item.shoppingCart.id },
        quantity: quantity,
      });

      props.updateCart();
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/shoppingCartDetails/delete/${item.id}`);

      props.updateCart();
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  const productImage =
    item.product.imageProducts && item.product.imageProducts.length > 0
      ? item.product.imageProducts[0].imageLink
      : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png";

  if (false) {
    return (
      <Box sx={{ p: 2, borderBottom: "1px solid #f0f0f0", opacity: 0.7 }}>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Đang tải thông tin sản phẩm...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, borderBottom: "1px solid #f0f0f0" }}>
      {outOfStock && (
        <Alert severity="error" icon={<WarningIcon />} sx={{ mb: 2 }}>
          Sản phẩm "{item.product.productName || "Không xác định"}" đã hết hàng!
          Vui lòng xóa sản phẩm khỏi giỏ hàng.
        </Alert>
      )}

      {!outOfStock && stockQuantity !== null && stockQuantity < quantity && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Sản phẩm "{item.product.productName || "Không xác định"}" chỉ còn{" "}
          {stockQuantity} sản phẩm trong kho. Vui lòng giảm số lượng.
        </Alert>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Checkbox */}
        <Checkbox
          checked={selected}
          onChange={onSelect}
          disabled={outOfStock}
        />

        {/* Product Image */}
        <Box
          component="img"
          src={productImage}
          alt={item.product.productName || "Không xác định"}
          sx={{
            width: 80,
            height: 80,
            objectFit: "cover",
            border: "1px solid #f0f0f0",
            opacity: outOfStock ? 0.5 : 1,
          }}
        />

        {/* Product Details */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "medium",
              mb: 0.5,
              color: outOfStock ? "text.disabled" : "text.primary",
            }}
          >
            {item.product.productName || "Không xác định"}
          </Typography>

          <Typography
            variant="body2"
            color={outOfStock ? "text.disabled" : "text.secondary"}
            sx={{ mb: 1 }}
          >
            Đơn giá: {formatPrice(item.product.price)} VND
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <IconButton
              size="small"
              onClick={handleDelete}
              sx={{ color: "text.secondary", mr: 1 }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>

            {stockQuantity !== null && stockQuantity > 0 && (
              <Typography variant="caption" color="success.main">
                Còn {stockQuantity} sản phẩm
              </Typography>
            )}
          </Box>
        </Box>

        {/* Quantity Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "4px",
            overflow: "hidden",
            opacity: outOfStock ? 0.5 : 1,
          }}
        >
          <IconButton
            onClick={handleQuantityItemMinus}
            sx={{
              borderRadius: 0,
              p: 0.5,
            }}
            disabled={outOfStock}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <TextField
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            variant="standard"
            disabled={outOfStock}
            InputProps={{
              disableUnderline: true,
              inputProps: {
                min: 1,
                style: {
                  textAlign: "center",
                  width: "30px",
                  padding: "0px",
                },
              },
            }}
          />

          <IconButton
            onClick={handleQuantityItemPlus}
            sx={{
              borderRadius: 0,
              p: 0.5,
            }}
            disabled={
              outOfStock ||
              (stockQuantity !== null && quantity >= stockQuantity)
            }
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Price */}
        <Box sx={{ width: 120, textAlign: "right" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color={outOfStock ? "text.disabled" : "inherit"}
          >
            {formatPrice(price)} VND
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
