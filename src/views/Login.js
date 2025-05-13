import "../styles/Login.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";

import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../stores/AuthContext"; // Import useAuth từ context

import { useHistory } from "react-router-dom";

import { useState } from "react";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
// Import thêm icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faKey, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const { setIsLoggedIn } = useAuth();

  const history = useHistory();

  const handleOnChangeInput = (e) => {
    if (e.target.classList.contains("inputEmail")) {
      setEmail(e.target.value);
    } else {
      setPassWord(e.target.value);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      passWordA: password,
    };

    try {
      const response = axios.post("/api/v1/auth/login", formData);

      const data = await response;
      console.log(data);

      if (data.data) {
        localStorage.setItem("data", JSON.stringify(data.data));
        localStorage.setItem("token", JSON.stringify(data.data.token));
        toast.success(
          `Chào mừng ${data.data.firstName} ${data.data.lastName} đã quay trở lại!`
        );
        setIsLoggedIn(true);

        history.push("/");
      }

      console.log(data);
    } catch (error) {
      console.log(error.message);

      toast.error(`Sai tài khoản hoặc mật khẩu!`);
    }
  };

  const handleF = () => {
    Swal.fire({
      title: "Vui lòng điền Email",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      reverseButtons: true,
      preConfirm: async (login) => {
        try {
          axios
            .get(`/api/v1/sendMail/resetPassword/${login}`)
            .then(function (response) {
              return response.json();
            })
            .catch(function (error) {
              console.log(error);
            });
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Thành công",
          text: "Đã gửi mật khẩu mới về email của bạn",
          icon: "success",
        });
      }
    });
  };

  return (
    <form className="containerLogin justify-content-center bgLogin">
        <div className="containerLogo">
        <h2>Đăng nhập</h2>
        <img className="logoLogin" src={logo} alt="Logo"></img>
        </div>

      <div className="input-group">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
          <input
            type="email"
          className="form-control inputEmail"
            placeholder="Nhập email"
            name="email"
            value={email}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>
      
      <div className="input-group">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faLock} />
        </span>
          <input
            type="password"
            className="form-control inputPassword"
            name="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => handleOnChangeInput(e)}
          />
        </div>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheck1"
            />
            <label
            className="form-check-label"
              htmlFor="customCheck1"
            >
              Lưu tài khoản
            </label>
        </div>
          <Typography
          style={{ 
            cursor: "pointer",
            color: "#0288d1",
            fontSize: "14px",
            fontWeight: "500"
          }}
            onClick={handleF}
          >
          <FontAwesomeIcon icon={faKey} className="me-1" />
          Quên mật khẩu?
          </Typography>
        </div>

      <div className="d-grid mb-4">
          <button
            type="submit"
          className="btn btn-primary"
            onClick={(e) => handleSignIn(e)}
          >
            Đăng nhập
          </button>
        </div>

      <div className="text-center mb-3">
        <span style={{ fontSize: "14px", color: "#666" }}>Bạn chưa có tài khoản? </span>
      </div>

      <Link className="nav-item btn btn-primary" to="/Register">
        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
        Đăng ký tài khoản
      </Link>
    </form>
  );
};
export default Login;
