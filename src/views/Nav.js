import "../styles/Nav.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useAuth } from "../stores/AuthContext"; // Import useAuth từ context
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Avatar, Box, Button, Stack, Typography, Badge, InputAdornment, Tooltip } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LocalMallIcon from '@mui/icons-material/LocalMall';

const Nav = () => {
  const { isLoggedIn, searchInput, setSearchInput } = useAuth(); // Sử dụng useAuth để lấy trạng thái đăng nhập
  const history = useHistory();
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Xử lý hiệu ứng scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lấy số lượng sản phẩm trong giỏ hàng
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        try {
          const items = JSON.parse(cartItems);
          setCartCount(items.length);
        } catch (error) {
          console.error('Error parsing cart items:', error);
          setCartCount(0);
        }
      }
    };
    
    updateCartCount();
    
    // Lắng nghe sự kiện lưu vào localStorage
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const search = () => {
    if (!searchInput || searchInput.trim() === '') return;
    
    let searchValue = searchInput;
    history.push("/Shopping", { searchValue });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchInput && searchInput.trim() !== '') {
      let searchValue = searchInput;
      history.push("/Shopping", { searchValue });
    }
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      try {
        setUser(JSON.parse(data));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <div className="navbar-wrapper">
      <nav className={`navbar navbar-expand-lg sticky-top navbar-light ${scrolled ? 'scrolled' : ''}`}>
        <div className="container-fluid">
          <div className="navbar-brand">
            <Link className="nav-link" to="/">
              <img className="logo" alt="L&T Fashion" src={logo} />
              <span className="d-none d-md-block ms-2">L&T Fashion</span>
            </Link>
          </div>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="search-container mx-auto">
              <div className="input-group">
                <span className="input-group-text">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={searchInput || ''}
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm..."
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button 
                  className="btn search-button"
                  onClick={search}
                  disabled={!searchInput || searchInput.trim() === ''}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
            
            <ul className="navbar-nav ms-auto nav-icons">
              <li className="nav-item">
                <Tooltip title="Sản phẩm">
                  <Link className="nav-link" to="/Shopping">
                    <Stack direction="column" alignItems="center" spacing={0}>
                      <ListIcon />
                      <Typography variant="caption">Sản phẩm</Typography>
                    </Stack>
                  </Link>
                </Tooltip>
              </li>
              
              <li className="nav-item">
                <Tooltip title="Giỏ hàng">
                  <Link className="nav-link" to="/Cart">
                    <Stack direction="column" alignItems="center" spacing={0}>
                      <Badge 
                        badgeContent={cartCount} 
                        color="error" 
                        max={99}
                      >
                        <LocalMallIcon />
                      </Badge>
                      <Typography variant="caption">Giỏ hàng</Typography>
                    </Stack>
                  </Link>
                </Tooltip>
              </li>

              {isLoggedIn || user ? (
                <li className="nav-item">
                  <Tooltip title="Tài khoản">
                    <Link className="nav-link" to="/User">
                      <Stack direction="column" alignItems="center" spacing={0}>
                        <Avatar
                          alt={user?.firstName || "User"}
                          src={user?.avatar?.imageLink || ""}
                        />
                        <Typography variant="caption">
                          {user?.firstName || "Cá nhân"}
                        </Typography>
                      </Stack>
                    </Link>
                  </Tooltip>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Tooltip title="Đăng ký">
                      <Link className="nav-link" to="/Register">
                        <Stack direction="column" alignItems="center" spacing={0}>
                          <HowToRegIcon />
                          <Typography variant="caption">Đăng ký</Typography>
                        </Stack>
                      </Link>
                    </Tooltip>
                  </li>
                  <li className="nav-item">
                    <Tooltip title="Đăng nhập">
                      <Link className="nav-link" to="/login">
                        <Stack direction="column" alignItems="center" spacing={0}>
                          <LoginIcon />
                          <Typography variant="caption">Đăng nhập</Typography>
                        </Stack>
                      </Link>
                    </Tooltip>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
