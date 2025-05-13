import "../styles/Nav.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useAuth } from "../stores/AuthContext"; // Import useAuth từ context
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Avatar, Box, Button, Stack, Typography, Badge, InputAdornment } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HowToRegIcon from "@mui/icons-material/HowToReg";

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
      <nav 
        className={`navbar navbar-expand-lg sticky-top navbar-light shadow-sm ${scrolled ? 'scrolled' : ''}`} 
        style={{
          height: '44px', 
          minHeight: '44px', 
          padding: 0,
          background: 'linear-gradient(90deg, #0288d1 0%, #03A9F4 100%)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        <div className="container" style={{height: '44px', padding: '0 10px'}}>
          <div className="navbar-brand" style={{margin: 0, padding: 0}}>
            <Link className="nav-link" to="/" style={{padding: 0}}>
              <img className="logo" alt="Logo" src={logo} style={{height: '28px', width: 'auto', marginRight: '5px'}} />
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
            style={{
              padding: '0 5px', 
              fontSize: '0.8rem',
              border: '1px solid rgba(255,255,255,0.7)'
            }}
          >
            <span className="navbar-toggler-icon" style={{width: '1em', height: '1em', filter: 'brightness(0) invert(1)'}}></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="search-container mx-auto d-flex align-items-center justify-content-center" style={{height: '32px', maxWidth: '520px'}}>
              <div className="input-group" style={{height: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', width: '100%'}}>
                <span className="input-group-text" style={{ 
                  height: '32px', 
                  padding: '0 8px', 
                  backgroundColor: 'white', 
                  borderColor: '#e0e0e0',
                  borderRight: 'none',
                  borderRadius: '4px 0 0 4px'
                }}>
                  <SearchIcon fontSize="small" style={{ fontSize: '16px', color: '#666' }} />
                </span>
                <input
                  type="text"
                  value={searchInput || ''}
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm..."
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ 
                    height: '32px', 
                    fontSize: '13px', 
                    padding: '0 10px',
                    borderLeft: 'none',
                    borderRight: 'none',
                    boxShadow: 'none',
                    borderColor: '#e0e0e0'
                  }}
                />
                <button 
                  className="btn search-button"
                  onClick={search}
                  disabled={!searchInput || searchInput.trim() === ''}
                  style={{ 
                    background: 'linear-gradient(to right, #FFB700, #FFA000)',
                    color: '#fff', 
                    fontWeight: 'bold',
                    padding: '0 12px',
                    borderRadius: '0 4px 4px 0',
                    height: '32px',
                    minWidth: '80px',
                    textTransform: 'none',
                    fontSize: '13px',
                    boxShadow: 'none',
                    border: 'none'
                  }}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
            
            <ul className="navbar-nav ms-auto nav-icons" style={{marginTop: 0, marginBottom: 0}}>
              <li className="nav-item" style={{margin: '0 5px'}}>
                <Link className="nav-link" to="/Shopping" style={{padding: '2px 8px'}}>
                  <Stack direction="column" alignItems="center" spacing={0}>
                    <ListIcon sx={{ fontSize: '18px', color: 'white' }} />
                    <Typography variant="caption" sx={{ fontSize: '10px', color: 'white', marginTop: '1px !important' }}>Sản phẩm</Typography>
                  </Stack>
                </Link>
              </li>
              
              <li className="nav-item" style={{margin: '0 5px'}}>
                <Link className="nav-link" to="/Cart" style={{padding: '2px 8px'}}>
                  <Stack direction="column" alignItems="center" spacing={0}>
                    <Badge 
                      badgeContent={cartCount} 
                      color="error" 
                      max={99} 
                      sx={{ 
                        '& .MuiBadge-badge': { 
                          fontSize: '8px', 
                          height: '14px', 
                          minWidth: '14px', 
                          padding: '0 2px',
                          background: '#FF5252'
                        } 
                      }}
                    >
                      <ShoppingBasketIcon sx={{ fontSize: '18px', color: 'white' }} />
                    </Badge>
                    <Typography variant="caption" sx={{ fontSize: '10px', color: 'white', marginTop: '1px !important' }}>Giỏ hàng</Typography>
                  </Stack>
                </Link>
              </li>

              {isLoggedIn || user ? (
                <li className="nav-item" style={{margin: '0 5px'}}>
                  <Link className="nav-link" to="/User" style={{padding: '2px 8px'}}>
                    <Stack direction="column" alignItems="center" spacing={0}>
                      <Avatar
                        alt={user?.firstName || "User"}
                        src={user?.avatar?.imageLink || ""}
                        sx={{ width: 18, height: 18, border: '1px solid white' }}
                      />
                      <Typography variant="caption" sx={{ fontSize: '10px', color: 'white', marginTop: '1px !important' }}>
                        {user?.firstName || "Cá nhân"}
                      </Typography>
                    </Stack>
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item" style={{margin: '0 5px'}}>
                    <Link className="nav-link" to="/Register" style={{padding: '2px 8px'}}>
                      <Stack direction="column" alignItems="center" spacing={0}>
                        <HowToRegIcon sx={{ fontSize: '18px', color: 'white' }} />
                        <Typography variant="caption" sx={{ fontSize: '10px', color: 'white', marginTop: '1px !important' }}>Đăng ký</Typography>
                      </Stack>
                    </Link>
                  </li>
                  <li className="nav-item" style={{margin: '0 5px'}}>
                    <Link className="nav-link" to="/login" style={{padding: '2px 8px'}}>
                      <Stack direction="column" alignItems="center" spacing={0}>
                        <LoginIcon sx={{ fontSize: '18px', color: 'white' }} />
                        <Typography variant="caption" sx={{ fontSize: '10px', color: 'white', marginTop: '1px !important' }}>Đăng nhập</Typography>
                      </Stack>
                    </Link>
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
