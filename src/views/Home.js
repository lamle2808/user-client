import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import HomeShopping from "../components/HomeShopping";
import Menu from "../components/Menu";
import HoverMenu from "../components/HoverMenu";
import { Link } from "react-router-dom";
import "../styles/ListItem.scss";
import "../styles/Home.scss";

// Thêm import các hình ảnh thumbnail
import thumbai1 from "../assets/images/thumbai_1.png";
import thumbai2 from "../assets/images/thumbai_2.png";
import thumbai3 from "../assets/images/thumbai_3.png";

// Material UI imports
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const Home = () => {
  const [hovered, setHovered] = useState(false);
  const [data, setData] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Banner content với thêm thuộc tính image
  const bannerContent = [
    {
      title: "Giá Mềm - Xài Bền - Mặc Sướng",
      priceLabel: "Chi từ",
      price: "68.000đ",
      image: thumbai3
    },
    {
      title: "Thời Trang Mới Nhất 2023",
      priceLabel: "Giảm tới",
      price: "50%",
      image: thumbai1
    },
    {
      title: "Bộ Sưu Tập Hè",
      priceLabel: "Từ",
      price: "99.000đ",
      image: thumbai2
    }
  ];
  
  // Sử dụng Unsplash cho các hình ảnh danh mục
  const categories = [
    { 
      id: 1, 
      name: "Áo thun", 
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: 2, 
      name: "Quần Jean", 
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: 3, 
      name: "Giày", 
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: 4, 
      name: "Túi xách", 
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
    }
  ];
  
  // Xử lý điều hướng slider
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerContent.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerContent.length - 1 : prev - 1));
  };
  
  // Tự động chuyển slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, [currentSlide]);
  
  // Thêm useEffect để cập nhật hình nền khi slide thay đổi
  useEffect(() => {
    const sliderContainer = document.querySelector('.main-slider-container');
    if (sliderContainer) {
      // Xóa tất cả các class slide-bg cũ
      sliderContainer.classList.remove('slide-bg-0', 'slide-bg-1', 'slide-bg-2');
      // Thêm class mới tương ứng với slide hiện tại
      sliderContainer.classList.add(`slide-bg-${currentSlide}`);
      // Thiết lập hình nền trực tiếp từ JavaScript
      sliderContainer.style.backgroundImage = `url(${bannerContent[currentSlide].image})`;
    }
  }, [currentSlide]);
  
  // Thêm useEffect để giải quyết vấn đề hiển thị
  useEffect(() => {
    // Đảm bảo chỉ có một menu hiển thị
    const fixDuplicateMenu = () => {
      const menus = document.querySelectorAll('.menu-container');
      if (menus.length > 1) {
        for (let i = 1; i < menus.length; i++) {
          menus[i].style.display = 'none';
        }
      }
    };
    
    fixDuplicateMenu();
    
    // Fix khoảng trống mênh mông ở đầu trang
    document.querySelector('.navbar-wrapper').style.position = 'sticky';
    document.querySelector('.navbar-wrapper').style.top = '0';
    document.querySelector('.navbar-wrapper').style.zIndex = '1000';
    
    // Khởi tạo banner-menu-container ngay sau navbar
    const homePage = document.querySelector('.home-container');
    if (homePage) {
      homePage.style.marginTop = '0';
      homePage.style.paddingTop = '0';
    }
  }, []);
  
  return (
    <div className="home-container">
      {/* Banner & Menu */}
      <div className="banner-menu-container">
        <div className="menu-section">
          <div className="menu-wrapper">
            <Menu hovered={hovered} setHovered={setHovered} setData={setData} />
            <HoverMenu hovered={hovered} setHovered={setHovered} data={data} />
          </div>
        </div>
        <div className="main-slider-container">
          <div className="main-slider-content">
            <h2 className="main-slider-title">{bannerContent[currentSlide].title}</h2>
            <div className="main-slider-price-container">
              <p className="price-before">{bannerContent[currentSlide].priceLabel}</p>
              <p className="price-current">{bannerContent[currentSlide].price}</p>
            </div>
          </div>
        </div>
        
        {/* Phần nút điều hướng được chuyển xuống dưới banner */}
        <div className="slider-navigation-container">
          <div className="slider-navigation">
            <button className="nav-left" onClick={prevSlide}>
              <NavigateBeforeIcon />
            </button>
            <button className="nav-right" onClick={nextSlide}>
              <NavigateNextIcon />
            </button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <Container maxWidth="lg">
        <div className="features-container">
          <div className="feature-item">
            <LocalShippingIcon fontSize="large" color="primary" />
            <h4>Giao hàng miễn phí</h4>
            <p>Đơn hàng trên 500k</p>
          </div>
          <div className="feature-item">
            <CardGiftcardIcon fontSize="large" color="primary" />
            <h4>Quà tặng hấp dẫn</h4>
            <p>Cho đơn hàng mới</p>
          </div>
          <div className="feature-item">
            <VerifiedUserIcon fontSize="large" color="primary" />
            <h4>Bảo hành</h4>
            <p>Đổi trả trong 30 ngày</p>
          </div>
          <div className="feature-item">
            <HeadsetMicIcon fontSize="large" color="primary" />
            <h4>Hỗ trợ 24/7</h4>
            <p>Hotline: 1900-1234</p>
          </div>
        </div>
      </Container>

      {/* Banner khuyến mãi */}
      <Container maxWidth="lg">
        <div className="promo-banner">
          <h3>GIẢM GIÁ MÙA HÈ - LÊN ĐẾN 50%</h3>
          <Link to="/Shopping">
            <button className="btn-buy-now">
              MUA NGAY <ArrowForwardIcon fontSize="small" />
            </button>
          </Link>
        </div>
      </Container>

      {/* Sản phẩm nổi bật */}
      <div className="section-title">
        <h1>Sản phẩm nổi bật</h1>
      </div>
      <ListItem />

      {/* Danh mục nổi bật */}
      <Container maxWidth="lg">
        <div className="category-section">
          <h2>DANH MỤC NỔI BẬT</h2>
          <div className="category-grid">
            {[
              { 
                id: 1, 
                name: "Áo thun cổ tròn tay ngắn", 
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              },
              { 
                id: 5, 
                name: "Quần tây", 
                image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              },
              { 
                id: 14, 
                name: "Áo khoác Hoodie", 
                image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              },
              { 
                id: 20, 
                name: "Túi đeo", 
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              },
              { 
                id: 22, 
                name: "Giày casual", 
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              },
              { 
                id: 4, 
                name: "Áo sơ mi tay dài", 
                image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              },
              { 
                id: 19, 
                name: "Nón", 
                image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              },
              { 
                id: 6, 
                name: "Ví", 
                image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              }
            ].map(category => (
              <Link key={category.id} to={`/Shopping?category=${category.id}`} className="category-card">
                <div className="category-image-container">
                  <img src={category.image} alt={category.name} className="category-image" />
                </div>
                <div className="category-name">
                  <h3>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
      
      {/* Newsletter Section */}
      <Container maxWidth="lg">
        <Paper elevation={0} className="newsletter-section">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Đăng ký nhận thông tin
              </Typography>
              <Typography variant="body1" paragraph>
                Để nhận thông tin về các sản phẩm mới và ưu đãi đặc biệt, hãy đăng ký nhận bản tin của chúng tôi.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="newsletter-form">
                <input type="email" placeholder="Email của bạn" />
                <button>Đăng ký</button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
