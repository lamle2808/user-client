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
  TextField
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WarningIcon from '@mui/icons-material/Warning';

const CartItem = (props) => {
  const { item, selected, onSelect } = props;
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.quantity * item.product.price);
  const [stockQuantity, setStockQuantity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  // Format giá theo định dạng Việt Nam
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  // Cập nhật lại giá khi quantity thay đổi
  useEffect(() => {
    setPrice(quantity * item.product.price);
  }, [quantity, item.product.price]);

  // Kiểm tra số lượng tồn kho khi component mount
  useEffect(() => {
    checkStockQuantity();
  }, []);

  // Hàm kiểm tra số lượng tồn kho
  const checkStockQuantity = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/products/getById/${item.product.id}`);
      const product = response.data;
      
      console.log("Dữ liệu sản phẩm đầy đủ:", JSON.stringify(product, null, 2));
      
      // Kiểm tra tất cả các trường hợp có thể chứa thông tin tồn kho
      let availableStock = null;
      
      // Trường hợp 1: Tìm trong specifications
      if (product.specifications && Array.isArray(product.specifications)) {
        // Tìm theo tên chính xác "Số lượng"
        let quantitySpec = product.specifications.find(
          spec => spec.specificationName === "Số lượng"
        );
        
        // Nếu không tìm thấy, thử tìm theo các tên khác có thể chứa thông tin tồn kho
        if (!quantitySpec) {
          quantitySpec = product.specifications.find(
            spec => spec.specificationName && (
              spec.specificationName.toLowerCase().includes("số lượng") ||
              spec.specificationName.toLowerCase().includes("tồn kho") ||
              spec.specificationName.toLowerCase().includes("quantity") ||
              spec.specificationName.toLowerCase().includes("stock")
            )
          );
        }
        
        if (quantitySpec && quantitySpec.specificationValue) {
          console.log(`Tìm thấy tồn kho trong specifications: ${quantitySpec.specificationName} = ${quantitySpec.specificationValue}`);
          const parsedValue = parseInt(quantitySpec.specificationValue.toString().trim(), 10);
          availableStock = !isNaN(parsedValue) ? parsedValue : null;
        }
      }
      
      // Trường hợp 2: Kiểm tra nếu có trường stock hoặc quantity trực tiếp trong sản phẩm
      if (availableStock === null) {
        if (product.stock !== undefined && product.stock !== null) {
          console.log(`Tìm thấy tồn kho trong trường stock: ${product.stock}`);
          const parsedValue = parseInt(product.stock.toString().trim(), 10);
          availableStock = !isNaN(parsedValue) ? parsedValue : null;
        } else if (product.quantity !== undefined && product.quantity !== null) {
          console.log(`Tìm thấy tồn kho trong trường quantity: ${product.quantity}`);
          const parsedValue = parseInt(product.quantity.toString().trim(), 10);
          availableStock = !isNaN(parsedValue) ? parsedValue : null;
        } else if (product.availableQuantity !== undefined && product.availableQuantity !== null) {
          console.log(`Tìm thấy tồn kho trong trường availableQuantity: ${product.availableQuantity}`);
          const parsedValue = parseInt(product.availableQuantity.toString().trim(), 10);
          availableStock = !isNaN(parsedValue) ? parsedValue : null;
        }
      }
      
      // Giá trị mặc định nếu không tìm thấy thông tin tồn kho
      if (availableStock === null) {
        console.log("Không tìm thấy thông tin tồn kho trong sản phẩm, mặc định là có tồn kho");
        availableStock = 999; // Giả định là có hàng nếu không tìm thấy thông tin
      }
      
      console.log(`Kết quả cuối cùng - Sản phẩm: ${item.product.productName}, Tồn kho: ${availableStock}`);
      
      setStockQuantity(availableStock);
      
      // Chỉ đánh dấu hết hàng khi chắc chắn đã tìm thấy thông tin tồn kho và giá trị là 0
      if (availableStock !== null && availableStock <= 0) {
        setOutOfStock(true);
        onSelect(false);
        toast.error(`Sản phẩm "${item.product.productName || "Không xác định"}" đã hết hàng!`);
      } else {
        // Nếu có tồn kho, đảm bảo outOfStock được đặt về false
        setOutOfStock(false);
        
        // Kiểm tra nếu số lượng hiện tại vượt quá tồn kho
        if (availableStock !== null && quantity > availableStock) {
          setQuantity(availableStock);
          updateCartItemQuantity(availableStock);
          toast.warning(`Số lượng sản phẩm "${item.product.productName || "Không xác định"}" đã được điều chỉnh về ${availableStock} (số lượng tối đa có sẵn)`);
        }
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra tồn kho:", error);
      // Trong trường hợp lỗi, không đánh dấu sản phẩm là hết hàng
      setOutOfStock(false);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (newQuantity) => {
    try {
      await axios.post("/api/v1/shoppingCartDetails/saveOrUpdate", {
        id: item.id,
        product: { id: item.product.id },
        shoppingCart: { id: item.shoppingCart.id },
        quantity: newQuantity,
      });
      props.updateCart();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  const handleQuantityItemPlus = async () => {
    // Kiểm tra tồn kho trước khi tăng số lượng
    if (stockQuantity !== null && quantity >= stockQuantity) {
      toast.error(`Sản phẩm "${item.product.productName || "Không xác định"}" chỉ còn ${stockQuantity} trong kho!`);
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
      toast.error(`Sản phẩm "${item.product.productName || "Không xác định"}" chỉ còn ${stockQuantity} trong kho!`);
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

  const productImage = item.product.imageProducts && item.product.imageProducts.length > 0
    ? item.product.imageProducts[0].imageLink
    : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png";

  if (loading) {
    return (
      <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', opacity: 0.7 }}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Đang tải thông tin sản phẩm...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
      {outOfStock && (
        <Alert 
          severity="error" 
          icon={<WarningIcon />}
          sx={{ mb: 2 }}
        >
          Sản phẩm "{item.product.productName || "Không xác định"}" đã hết hàng! Vui lòng xóa sản phẩm khỏi giỏ hàng.
        </Alert>
      )}
      
      {!outOfStock && stockQuantity !== null && stockQuantity < quantity && (
        <Alert 
          severity="warning"
          sx={{ mb: 2 }}
        >
          Sản phẩm "{item.product.productName || "Không xác định"}" chỉ còn {stockQuantity} sản phẩm trong kho. Vui lòng giảm số lượng.
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            objectFit: 'cover',
            border: '1px solid #f0f0f0',
            opacity: outOfStock ? 0.5 : 1
          }}
        />
        
        {/* Product Details */}
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'medium', 
              mb: 0.5,
              color: outOfStock ? 'text.disabled' : 'text.primary'
            }}
          >
            {item.product.productName || "Không xác định"}
          </Typography>
          
          <Typography 
            variant="body2" 
            color={outOfStock ? 'text.disabled' : 'text.secondary'} 
            sx={{ mb: 1 }}
          >
            Đơn giá: {formatPrice(item.product.price)} VND
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <IconButton 
              size="small"
              onClick={handleDelete}
              sx={{ color: 'text.secondary', mr: 1 }}
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
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflow: 'hidden',
          opacity: outOfStock ? 0.5 : 1
        }}>
          <IconButton 
            onClick={handleQuantityItemMinus}
            sx={{ 
              borderRadius: 0,
              p: 0.5
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
                  textAlign: 'center',
                  width: '30px',
                  padding: '0px'
                }
              }
            }}
          />
          
          <IconButton 
            onClick={handleQuantityItemPlus}
            sx={{ 
              borderRadius: 0,
              p: 0.5
            }}
            disabled={outOfStock || (stockQuantity !== null && quantity >= stockQuantity)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {/* Price */}
        <Box sx={{ width: 120, textAlign: 'right' }}>
          <Typography 
            variant="subtitle1" 
            fontWeight="bold"
            color={outOfStock ? 'text.disabled' : 'inherit'}
          >
            {formatPrice(price)} VND
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
