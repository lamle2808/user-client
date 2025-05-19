import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmOrder from "./Forms/ConfirmOrder";
import CheckoutItem from "../components/CheckoutItem";
import FormCheckOut from "./Forms/FormCheckOut";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import "../styles/CheckOut.scss";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CheckOut = (props) => {
  const [cart, setCart] = useState([]);
  const history = useHistory();
  const [user, setUser] = useState();
  const [CartId, setCartId] = useState([]);
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [note, setNote] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [value, setValue] = useState("Thanh toán khi nhận hàng");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Định dạng giá tiền
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setCartId(props.location.state.listCheckout);
  }, [props.location.state.listCheckout]);

  // lấy thông tin user
  useEffect(() => {
    const data = localStorage.getItem("data");
    setUser(JSON.parse(data));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const tempCart = await Promise.all(
        CartId.map(async (item) => {
          return await fetchCartDetail(item);
        })
      );

      // Lọc ra những giá trị không null
      const filteredCart = tempCart.filter((item) => item !== null);
      setCart(filteredCart);

      // Tổng hợp tất cả các productSpecification từ các sản phẩm
      let allSpecs = [];
      filteredCart.forEach(item => {
        if (item.product && item.product.productSpecifications) {
          console.log("Thông số sản phẩm trong cart:", item.product.productSpecifications);
          allSpecs = [...allSpecs, ...item.product.productSpecifications];
        }
      });

      console.log("Danh sách tất cả thông số sản phẩm:", allSpecs);
    };

    fetchData();
  }, [CartId]);

  useEffect(() => {
    if (cart.length > 0) {
      setTotal(
        cart.reduce((total, item) => {
          return total + item.quantity * item.product.price;
        }, 0)
      );
    }
  }, [cart]);

  useEffect(() => {
    if (cart.length > 0) {
      setQuantity(
        cart.reduce((total, item) => {
          return total + item.quantity;
        }, 0)
      );
    }
  }, [cart]);

  // =========tạo order
  const handleConfirm = async () => {
    setIsSubmitting(true);

    // Log để kiểm tra dữ liệu giỏ hàng
    console.log("Thông tin giỏ hàng trước khi gửi:", cart);

    // Tạo dữ liệu đơn hàng với đầy đủ thông tin
    const orderData = {
      note,
      customer: {
        id: user.id, // Replace with actual customer ID
      },
      paymentType: value,
      statusPayment: value === "Thanh toán khi nhận hàng" ? 0 : 1,
      orderDetails: cart.map((item) => ({
        quantity: item.quantity,
        product: {
          id: item.product.id,
        },
        productSpecification: item.productSpecification ? {
          id: item.productSpecification.id,
          color: item.productSpecification.color,
          size: item.productSpecification.size
        } : null
      })),
    };

    console.log("Đang gửi đơn hàng với thông tin đầy đủ:", orderData);

    await axios
      .post(
        `/api/v1/orders/saveOrUpdate/${dataUser.shoppingCart.id}`,
        orderData
      )
      .then((res) => {
        console.log("đơn hàng đã được tạo:", res.data);
        if (value === "Thanh toán khi nhận hàng") {
          toast.success(`bạn đã tạo đơn hàng thành công`);
          history.push("/SuccessOrder");
        } else {
          axios
            .post("/api/v1/payments/paymentWithVNPAY", {
              idOrder: res.data.id,
              price: total,
            })
            .then(function (response) {
              window.open(response.data.url, "_self");
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        // Xử lý khi có lỗi xảy ra
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        console.log(error);
      });
  };

  // ====
  const fetchCartDetail = async (id) => {
    try {
      const response = await axios.get(
        `/api/v1/shoppingCartDetails/getById/${id}`
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("Dữ liệu chi tiết giỏ hàng:", data);
        return data;
      } else {
        console.log("Lỗi khi lấy dữ liệu");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleCheckOut = () => {
    setPopupVisible(true);
  };

  return (
    <div className="checkout-container container-lg">
      <div className="row">
        {cart.length > 0 ? (
          <div className="col-12">
            <div className="row">
              <div className="col-md-7 col-lg-7">
                <h4 className="checkout-title">Tiến hành thanh toán</h4>
                <a href="home" className="checkout-change-info">Thay đổi thông tin</a>
                <FormCheckOut
                  note={note}
                  setNote={setNote}
                />
              </div>
              <div className="col-md-5 col-lg-5">
                <Paper elevation={0} className="checkout-card">
                  <div className="checkout-card-header">
                    <Typography variant="subtitle1">
                      Thông tin đơn hàng
                    </Typography>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên sản phẩm</th>
                          <th scope="col" className="text-center">Hình ảnh</th>
                          <th scope="col" className="text-center">Số lượng</th>
                          <th scope="col" className="text-end">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.length > 0 &&
                          cart.map((item, index) => {
                            return item.quantity !== 0 ? (
                              <CheckoutItem
                                key={index}
                                data={item}
                                index={index}
                              />
                            ) : null;
                          })}

                        <tr className="sum">
                          <th colSpan="4" className="text-end">Tổng thành tiền:</th>
                          <th className="price-value text-end">{formatPrice(total)} đ</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Paper>
              </div>
            </div>

            <Divider sx={{ my: 3 }} />

            <FormControl className="checkout-payment">
              <FormLabel id="demo-controlled-radio-buttons-group">
                Phương thức thanh toán
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Thanh toán khi nhận hàng"
                  control={<Radio />}
                  label="Thanh toán khi nhận hàng"
                />
                <FormControlLabel
                  value="Thanh toán online"
                  control={<Radio />}
                  label="Thanh toán online"
                />
              </RadioGroup>
            </FormControl>
            <div className="row" style={{ marginTop: 20 }}>
              <button
                className="checkout-button w-100 btn"
                type="submit"
                onClick={handleCheckOut}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang xử lý...' : 'Tiếp tục để thanh toán'}
              </button>
            </div>
            {popupVisible && (
              <ConfirmOrder
                cart={cart}
                value={value}
                handleConfirm={handleConfirm}
                setPopupVisible={setPopupVisible}
                user={user}
                total={total}
              />
            )}
          </div>
        ) : (
          <div className="empty-cart">
            <ShoppingCartIcon className="empty-cart-icon" />
            <Typography>Bạn chưa chọn sản phẩm nào</Typography>
          </div>
        )}
      </div>
    </div>
  );
};
export default CheckOut;
