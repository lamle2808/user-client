import { useState } from "react";
import "../styles/Register.scss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faLocationDot, 
  faCalendarDays, 
  faLock, 
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("0");
  const [phone, setPhone] = useState("");
  const history = useHistory();

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
      case "password":
        setPassword(value);
        break;
      case "rPassword":
        setRPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== rPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không giống nhau.");
      return;
    } else if (
      email === "" &&
      password === "" &&
      firstName === "" &&
      lastName === "" &&
      phone === ""
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    } else {
      axios
        .post("http://localhost:8521/api/v1/auth/register", {
          email: email,
          passWordA: password,
          enable: true,
          roles: [{ id: 1 }],
        })
        .then((response) => {
          const account = { id: response.data.id };
          const customerData = {
            firstName,
            lastName,
            email,
            dateOfBirth: birthDay,
            sex: parseInt(sex),
            phone,
            address,
            account,
            avatar: null,
          };

          axios
            .post("/api/v1/customer/createOrUpdate", customerData)
            .then((response) => {
              // Xử lý khi tạo khách hàng thành công
              console.log("Khách hàng đã được tạo:", response.data);
              toast.success(`Chúc mừng bạn đã đăng ký thành công!`);
              history.push("/login");
            })
            .catch((error) => {
              // Xử lý khi có lỗi xảy ra
              toast.error(error.message || "Đã có lỗi xảy ra.");
            });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Đã có lỗi xảy ra.");
        });
    }
  };

  return (
    <div className="containerRegister">
          <div className="containerLogo">
        <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
        <img className="logoLogin" src={logo} alt="Logo"></img>
          </div>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-container">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="text"
                placeholder="Nhập họ"
                id="fName"
                name="fName"
                value={firstName}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-container">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <input
                type="text"
                id="lName"
                name="lName"
                value={lastName}
                className="form-control"
                placeholder="Nhập tên"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="input-container">
          <FontAwesomeIcon icon={faLocationDot} className="icon" />
              <input
                type="text"
                id="address"
                placeholder="Nhập địa chỉ"
                name="address"
                value={address}
                className="form-control"
                onChange={handleChange}
                required
              />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-container">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập địa chỉ Email"
                value={email}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-container">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Số điện thoại"
                value={phone}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
              <label htmlFor="birthday" className="lbInput">
              <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
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

          <div className="col-md-6">
            <label className="lbInput">Giới tính:</label>
            <div className="radio-container">
              <label>
                <input
                  type="radio"
                  id="female"
                  name="sex"
                  value="0"
                  checked={sex === "0"}
                  onChange={handleChange}
                />
                Nữ
              </label>
              <label>
                <input
                  type="radio"
                  id="male"
                  name="sex"
                  value="1"
                  checked={sex === "1"}
                  onChange={handleChange}
                />
                Nam
              </label>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="input-container">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={password}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-container">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                id="rPassword"
                name="rPassword"
                placeholder="Nhập lại mật khẩu"
                value={rPassword}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
          Đăng ký
        </button>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <Link to="/login" className="btn btn-secondary w-100">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Quay lại trang đăng nhập
        </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
