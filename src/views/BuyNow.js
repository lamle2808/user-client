import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Chip,
  Tooltip,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotesIcon from '@mui/icons-material/Notes';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './BuyNow.css';

const steps = [
  { label: 'Xác nhận đơn hàng', icon: <ShoppingBagIcon /> },
  { label: 'Thanh toán', icon: <PaymentIcon /> },
  { label: 'Hoàn tất', icon: <CheckCircleOutlineIcon /> },
];

function BuyNow() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("Thanh toán khi nhận hàng");
  const [sale, setSale] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const [note, setNote] = useState("");
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const history = useHistory();
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/v1/products/getById/${id}`)
      .then(function (response) {
        console.log( response.data);
        setData(response.data);
        setImage(response.data.imageProducts[0].imageLink);
        setSale(response.data.sale?.discount || 0);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        toast.error("Không thể tải thông tin sản phẩm");
      });
  }, [id]);

  const inputQuantity = (e) => {
    if (e > data.quantity || e < 0) {
      toast.error("Vui lòng nhập số khác");
    } else {
      setQuantity(e);
    }
  };
  
  const checkQ = (e) => {
    if (e === "down") {
      if (quantity === 1) {
        setQuantity(1);
      } else {
        setQuantity(quantity - 1);
      }
    } else {
      if (quantity > data.quantity) {
        toast.error("Vui lòng nhập số khác");
        setQuantity(1);
      } else {
        setQuantity(quantity + 1);
      }
    }
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    const idSpec = 0;
    const size = localStorage.getItem("data_size");
    const color = localStorage.getItem("data_color");
    if (size && color && data.productSpecification) {
      data.productSpecification.forEach(item => {
        if (item.size === size && item.color === color) {
          idSpec = item.id;
        }
      });
    }
    const orderData = {
      note,
      customer: {
        id: dataUser.id,
      },
      statusOrder: value === "Thanh toán khi nhận hàng" ? 1 : 3,
      paymentType: value,
      statusPayment: value === "Thanh toán khi nhận hàng" ? 0 : 1,
      orderDetails: [
        {
          quantity: quantity,
          product: {
            id: data.id,
          },
          productSpecification: {
            id: idSpec,
          },
        },
      ],
    };
    
    axios
      .post(`/api/v1/orders/createNow`, orderData)
      .then(function (response) {
        if (value === "Thanh toán online") {
          axios
            .post("/api/v1/payments/paymentWithVNPAY", {
              idOrder: response.data.id,
              price: sale
                ? data.price -
                  ((data.price * data.sale?.discount) / 100) * quantity
                : data.price * quantity,
              returnUrl: window.location.origin + "/payment-callback"
            })
            .then(function (response) {
              setActiveStep(2);
              window.open(response.data.url, "_self");
            })
            .catch(function (error) {
              console.log(error);
              setIsSubmitting(false);
              toast.error("Lỗi khi xử lý thanh toán");
            });
        } else {
          setActiveStep(2);
          toast.success("Đặt hàng thành công");
          setTimeout(() => {
            history.push("/");
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsSubmitting(false);
        toast.error("Có lỗi xảy ra khi đặt hàng");
      });
  };
  
  const calculateFinalPrice = () => {
    if (sale && data.sale?.discount) {
      return data.price - ((data.price * data.sale.discount) / 100) * quantity;
    } else {
      return data.price * quantity;
    }
  };
  
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h5">Đang tải thông tin đơn hàng...</Typography>
      </Box>
    );
  }

  return (
    <Box className="buy-now-container" sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={() => (
              <Avatar 
                sx={{ 
                  bgcolor: activeStep >= index ? '#146C94' : '#e0e0e0',
                  color: 'white',
                  width: 35,
                  height: 35
                }}
              >
                {step.icon}
              </Avatar>
            )}>
              <Typography sx={{ fontWeight: activeStep === index ? 'bold' : 'normal' }}>
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {data !== "" ? (
          <>
            <Box sx={{ flex: 1 }}>
              <Card sx={{ mb: 3 }} elevation={2} className="product-card">
                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ p: 2 }}>
                  <CardMedia
                    sx={{ 
                      height: 150, 
                      width: 150,
                      objectFit: 'contain',
                      borderRadius: 1,
                      bgcolor: '#f9f9f9'
                    }}
                    image={image}
                    title={data.productName}
                    component="img"
                    alt="Hình ảnh sản phẩm"
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                      {data.productName || ""}
                    </Typography>
                    
                    <Chip 
                      label={`${data.brand?.name || ""}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        Đơn giá:
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: sale ? '#999' : 'text.primary', 
                          textDecoration: sale ? 'line-through' : 'none'
                        }}
                      >
                        {formatCurrency(data.price)}
                      </Typography>
                      
                      {sale && data.sale?.discount ? (
                        <Typography variant="body1" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                          {formatCurrency(data.price - (data.price * data.sale.discount / 100))}
                        </Typography>
                      ) : null}
                      
                      {sale && data.sale?.discount ? (
                        <Chip 
                          label={`-${data.sale.discount}%`}
                          size="small"
                          color="error"
                          sx={{ height: 20 }}
                        />
                      ) : null}
                    </Box>
                    
                    <Stack
                      direction="row"
                      sx={{ display: 'flex', alignItems: 'center', mt: 2 }}
                    >
                      <Typography sx={{ mr: 2 }}>Số lượng:</Typography>
                      <IconButton
                        aria-label="giảm"
                        size="small"
                        onClick={() => checkQ("down")}
                        sx={{ 
                          color: '#146C94',
                          border: '1px solid #ddd',
                          borderRadius: '4px 0 0 4px'
                        }}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                      <OutlinedInput
                        type="number"
                        id="quantity-input"
                        value={quantity}
                        sx={{ 
                          height: '40px', 
                          width: '60px',
                          '& input': { textAlign: 'center' },
                          borderRadius: 0
                        }}
                        onChange={(e) => inputQuantity(Number(e.target.value))}
                      />
                      <IconButton
                        aria-label="tăng"
                        size="small"
                        onClick={() => checkQ("up")}
                        sx={{ 
                          color: '#146C94',
                          border: '1px solid #ddd',
                          borderRadius: '0 4px 4px 0'
                        }}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Stack>
              </Card>
              
              <Paper elevation={2} sx={{ p: 3, mb: 3 }} className="payment-options">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PaymentIcon sx={{ color: '#146C94', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Phương thức thanh toán
                  </Typography>
                </Box>
                
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <RadioGroup
                    name="payment-method"
                    value={value}
                    onChange={handleChange}
                  >
                    <Paper variant="outlined" sx={{ mb: 2, p: 1, borderColor: value === "Thanh toán khi nhận hàng" ? '#146C94' : 'divider' }}>
                      <FormControlLabel
                        value="Thanh toán khi nhận hàng"
                        control={<Radio color="primary" />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccountBalanceWalletIcon sx={{ mr: 1, color: '#e63946' }} />
                            <Typography>Thanh toán khi nhận hàng (COD)</Typography>
                          </Box>
                        }
                      />
                    </Paper>
                    
                    <Paper variant="outlined" sx={{ p: 1, borderColor: value === "Thanh toán online" ? '#146C94' : 'divider' }}>
                      <FormControlLabel
                        value="Thanh toán online"
                        control={<Radio color="primary" />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CreditCardIcon sx={{ mr: 1, color: '#146C94' }} />
                            <Typography>Thanh toán trực tuyến (VNPAY)</Typography>
                          </Box>
                        }
                      />
                    </Paper>
                  </RadioGroup>
                </FormControl>
              </Paper>
              
              <Paper elevation={2} sx={{ p: 3 }} className="note-section">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotesIcon sx={{ color: '#146C94', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Ghi chú đơn hàng
                  </Typography>
                </Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Nhập ghi chú cho đơn hàng (không bắt buộc)"
                  sx={{ mt: 1 }}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Paper>
            </Box>
            
            <Box sx={{ width: { xs: '100%', md: '380px' } }}>
              <Paper elevation={3} sx={{ overflow: 'hidden' }} className="order-summary">
                <Box sx={{ bgcolor: '#146C94', p: 2, color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ReceiptIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Tổng kết đơn hàng
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2">
                    {quantity} sản phẩm
                  </Typography>
                </Box>
                
                <Box sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">Tổng tiền hàng</Typography>
                      <Typography variant="body1">
                        {formatCurrency(data.price * quantity)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">Giảm giá</Typography>
                      <Typography variant="body1" sx={{ color: sale ? 'error.main' : 'text.secondary' }}>
                        {sale && data.sale?.discount ? 
                          `-${formatCurrency((data.price * data.sale.discount / 100) * quantity)}` : 
                          '0 đ'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">Phí vận chuyển</Typography>
                      <Typography variant="body1">
                        0 đ
                      </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Tổng thanh toán
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                        {formatCurrency(calculateFinalPrice())}
                      </Typography>
                    </Box>
                    
                    <Alert severity="info" icon={<LocalShippingIcon />} sx={{ mt: 2 }}>
                      Đơn hàng sẽ được giao trong vòng 3-5 ngày làm việc
                    </Alert>
                    
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ 
                        mt: 2, 
                        py: 1.5,
                        bgcolor: '#e63946',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: '#c1121f',
                        },
                      }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="buy-button"
                    >
                      {isSubmitting ? 'Đang xử lý...' : 'HOÀN TẤT ĐẶT HÀNG'}
                    </Button>
                    
                    <Typography variant="caption" sx={{ textAlign: 'center', display: 'block' }}>
                      Bằng cách nhấn vào nút này, bạn đồng ý với các điều khoản và điều kiện mua hàng
                    </Typography>
                  </Stack>
                </Box>
              </Paper>
            </Box>
          </>
        ) : null}
      </Stack>
    </Box>
  );
}

export default BuyNow;
