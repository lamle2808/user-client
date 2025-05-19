import "../styles/CheckoutItem.scss";
import { Box, Typography } from "@mui/material";

const CheckoutItem = (props) => {
  // Định dạng giá tiền
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  return (
    <tr key={props.index}>
      <th scope="row">{props.index + 1}</th>
      <td>
        <div className="product-details">
          <div className="product-name">{props.data.product.productName}</div>
          <div className="product-price">{formatPrice(props.data.product.price)} VND</div>
          
          {/* Hiển thị thông tin size và màu sắc */}
          {props.data.productSpecification && (
            <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
              {props.data.productSpecification.size && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.8rem'
                  }}
                >
                  <span style={{ fontWeight: 'bold', marginRight: '4px' }}>Size:</span> {props.data.productSpecification.size}
                </Typography>
              )}
              
              {props.data.productSpecification.color && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.8rem'
                  }}
                >
                  <span style={{ fontWeight: 'bold', marginRight: '4px' }}>Màu:</span> {props.data.productSpecification.color}
                </Typography>
              )}
            </Box>
          )}
        </div>
      </td>
      <td className="text-center">
        {
          <img
            className="product-image"
            alt={props.data.product.productName}
            src={
              props.data.product.imageProducts.length > 0
                ? props.data.product.imageProducts[0].imageLink
                : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png"
            }
          />
        }
      </td>
      <td className="text-center">{props.data.quantity}</td>
      <td className="price-value text-end">{formatPrice(props.data.quantity * props.data.product.price)} đ</td>
    </tr>
  );
};

export default CheckoutItem;
