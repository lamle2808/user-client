import React from "react";
import "../../styles/ConfirmOrder.scss";
import { 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography 
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ConfirmOrder = ({
  cart,
  value,
  setPopupVisible,
  user,
  handleConfirm,
  total,
}) => {
  // Format giá theo định dạng Việt Nam
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  return (
    <Dialog 
      open={true} 
      onClose={() => setPopupVisible(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 1,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        px: 3,
        py: 2
      }}>
        <Typography variant="h6" fontWeight="bold">
          Xác nhận đơn hàng
        </Typography>
        <IconButton 
          edge="end" 
          onClick={() => setPopupVisible(false)}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 3 }}>
        <Stack spacing={3}>
          {/* Thông tin người nhận */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#1976d2' }}>
              Thông tin người nhận
            </Typography>
            
            <Stack spacing={1.5} sx={{ pl: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Tên người nhận
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {user.lastName}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Địa chỉ giao hàng
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {user.address}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Số điện thoại nhận hàng
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {user.phone}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Phương thức thanh toán
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {value}
                </Typography>
              </Box>
            </Stack>
          </Box>
          
          <Divider />
          
          {/* Chi tiết đơn hàng */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#1976d2' }}>
              Chi tiết đơn hàng
            </Typography>
            
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #f0f0f0' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="center">Màu sắc</TableCell>
                    <TableCell align="center">Kích thước</TableCell>
                    <TableCell align="right">Đơn giá</TableCell>
                    <TableCell align="right">Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2">
                          {item.product.productName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {item.quantity}
                      </TableCell>
                      <TableCell align="center">
                        {item.productSpecification ? item.productSpecification.color : "Chưa chọn"}
                      </TableCell>
                      <TableCell align="center">
                        {item.productSpecification ? item.productSpecification.size : "Chưa chọn"}
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(item.product.price)} đ
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(item.quantity * item.product.price)} đ
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          
          {/* Tổng cộng */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            bgcolor: '#f9f9f9',
            p: 2,
            border: '1px solid #f0f0f0'
          }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Tổng cộng:
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" color="error.main">
              {formatPrice(total)} VND
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #e0e0e0' }}>
        <Button 
          onClick={() => setPopupVisible(false)}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Hủy
        </Button>
        <Button 
          onClick={handleConfirm}
          variant="contained"
          sx={{ 
            bgcolor: '#e11b1e', 
            '&:hover': { bgcolor: '#c4151a' } 
          }}
        >
          Xác nhận thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmOrder;
