import "bootstrap/dist/css/bootstrap.min.css";

import { toast } from "react-toastify";
import axios from "axios";
import "../styles/Personal.scss";

import FormatDate2Input from "../utils/FormatDate2Input";
import { useHistory } from "react-router-dom";
import { useAuth } from "../stores/AuthContext"; // Import useAuth từ context

import { useEffect, useState } from "react";

import ListOrder from "../components/ListOrder";
const Personal = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [flag, setFlag] = useState();
  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState(0);
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [account, setAccount] = useState();
  const { setIsLoggedIn } = useAuth();

  // ==========================================

  const SignOut = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    setIsLoggedIn(false);

    history.push("/login");
  };
  //   ======
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "lName":
        setLastName(value);
        break;
      case "fName":
        setFirstName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "birthday":
        setBirthDay(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "sex":
        setSex(value);
        break;

      default:
        break;
    }
  };
  //   ===================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const customerData = {
      id: id,
      firstName,
      lastName,
      email,
      dateOfBirth: birthDay,
      sex: parseInt(sex),
      phone,
      address,
      account,
      customerType: "customer",
      avatar: null,
    };

    console.log(customerData);
    axios
      .post(
        "http://localhost:8521/api/v1/customer/createOrUpdate",
        customerData
      )
      .then((response) => {
        // Xử lý khi tạo khách hàng thành công
        console.log("Khách hàng đã được tạo:", response.data);
        localStorage.setItem("data", JSON.stringify(response.data));
        setFlag(!flag);

        toast.success(`Cập nhật thành công`);
      })
      .catch((error) => {
        // Xử lý khi có lỗi xảy ra
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau");

        console.log(error);
      });
  };

  //   ===========================

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("data"));
    setUser(temp);
    if (temp) {
      // Nếu có dữ liệu từ người dùng đã có
      setEmail(temp.email || "");
      setFirstName(temp.firstName || "");
      setLastName(temp.lastName || "");
      setBirthDay(FormatDate2Input(temp.dateOfBirth) || "");

      setAddress(temp.address || "");
      setSex(String(temp.sex) || "0");
      console.log(temp.sex);
      setPhone(temp.phone || "");
      setAccount(temp.account);
      setId(temp.id);
    }
  }, [flag]);
  //   ========
  return (
    <>
      <div className="containerPerson">
        <div className="containerChild ">
          <div className="row">
            <div className="col-12">
              <h3>Hồ Sơ Của Tôi</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="item">
                <label htmlFor="fName" className="lbInput">
                  Họ
                </label>
                <input
                  type="fName"
                  id="fName"
                  name="fName"
                  value={firstName}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-6">
              <div className="item">
                <label htmlFor="lName" className="lbInput">
                  Tên
                </label>
                <input
                  type="lName"
                  id="lName"
                  name="lName"
                  value={lastName}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="item">
                <label htmlFor="address" className="lbInput">
                  Địa chỉ:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="item">
                <label htmlFor="email" className="lbInput">
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-6">
              <div className="item">
                <label htmlFor="phone" className="lbInput">
                  Số điện thoại:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="item">
                <label htmlFor="birthday" className="lbInput">
                  Ngày sinh:
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={birthDay}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-6">
              <label className="lbInput">Giới tính:</label>

              <div className="item row">
                <div className="col-6 ">
                  <input
                    type="radio"
                    id="female"
                    name="sex"
                    value="0"
                    checked={sex === "0"}
                    onChange={handleChange}
                  />
                  <label htmlFor="female">Nữ</label>
                </div>

                <div className="col-6">
                  <input
                    type="radio"
                    id="male"
                    name="sex"
                    value="1"
                    checked={sex === "1"}
                    onChange={handleChange}
                  />
                  <label htmlFor="male">Nam</label>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 pt-xl-3">
              <div className="item">
                <button
                  className="submitBtn btn btn-primary"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ContainerAvatar">
          <img
            className="imgItem"
            src={
              user && user.avatar
                ? user.avatar.imageLink
                : "https://lagrotteduyeti.com/wp-content/themes/themify-music/themify/img/non-skin.gif"
            }
            alt="Avatar"
          />
          <div className="btnAvatar">
            <button type="button" class="btn btn-secondary">
              Chọn ảnh
            </button>
          </div>
        </div>

        <div className="ContainerOut">
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => SignOut()}
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* =============== */}

      <div className="containerOrder">
        <ListOrder />
        {/* <OrderDetail /> */}
        {/* <OrderTracking /> */}
      </div>
    </>
  );
};
export default Personal;
