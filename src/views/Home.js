import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import HomeShopping from "../components/HomeShopping";
import Menu from "../components/Menu";
import HoverMenu from "../components/HoverMenu";
import { Link } from "react-router-dom";
import "../styles/ListItem.scss";
import "../styles/Home.scss";
// Import các icon
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  const [hovered, setHovered] = useState(false);
  const [data, setData] = useState("");
  
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
    document.querySelector('.navbar-wrapper').style.backgroundColor = '#03A9F4';
    
    // Khởi tạo banner-menu-container ngay sau navbar
    const homePage = document.querySelector('.home-container');
    if (homePage) {
      homePage.style.marginTop = '0';
      homePage.style.paddingTop = '0';
    }
    
    // Xử lý sự kiện di chuột toàn trang để cải thiện hover menu
    const handleGlobalMouseMove = (e) => {
      const menuContainer = document.querySelector('.menu-container');
      const hoverMenuPaper = document.querySelector('.hover-menu-paper');
      
      if (menuContainer && hoverMenuPaper) {
        const menuRect = menuContainer.getBoundingClientRect();
        const hoverMenuRect = hoverMenuPaper.getBoundingClientRect();
        
        // Kiểm tra xem chuột đang ở trong menu chính hoặc hover menu
        const isInMenuOrHoverMenu = 
          (e.clientX >= menuRect.left && e.clientX <= menuRect.right && 
          e.clientY >= menuRect.top && e.clientY <= menuRect.bottom) ||
          (e.clientX >= hoverMenuRect.left && e.clientX <= hoverMenuRect.right && 
          e.clientY >= hoverMenuRect.top && e.clientY <= hoverMenuRect.bottom) ||
          // Kiểm tra khu vực cầu nối giữa menu chính và hover menu (bên phải menu chính)
          (e.clientX >= menuRect.right && e.clientX <= hoverMenuRect.left && 
          e.clientY >= menuRect.top && e.clientY <= menuRect.bottom);
        
        // Nếu chuột di chuyển quá xa khỏi cả hai menu, đóng hover menu
        if (!isInMenuOrHoverMenu && 
            (e.clientX < menuRect.left - 50 || 
            e.clientX > hoverMenuRect.right + 50 || 
            e.clientY < menuRect.top - 50 || 
            e.clientY > menuRect.bottom + 50)) {
          setHovered(false);
        }
      }
    };
    
    // Đăng ký sự kiện di chuột toàn trang
    document.addEventListener('mousemove', handleGlobalMouseMove);
    
    // Tạo cầu nối giữa menu chính và hover menu
    const createMenuBridge = () => {
      const menuItems = document.querySelectorAll('.menu-item');
      
      menuItems.forEach(item => {
        item.addEventListener('mouseleave', (e) => {
          // Kiểm tra xem chuột có di chuyển sang phải không
          if (e.clientX > item.getBoundingClientRect().right) {
            // Nếu chuột di chuyển sang phải (hướng tới hover menu)
            // Tạo một element tạm thời để "bắc cầu" giữa hai menu
            const bridge = document.createElement('div');
            bridge.className = 'menu-bridge';
            bridge.style.position = 'absolute';
            bridge.style.top = `${item.getBoundingClientRect().top}px`;
            bridge.style.left = `${item.getBoundingClientRect().right}px`;
            bridge.style.width = '20px';
            bridge.style.height = `${item.offsetHeight}px`;
            bridge.style.zIndex = '999';
            document.body.appendChild(bridge);
            
            // Xóa bridge sau khi chuột đã di chuyển qua
            setTimeout(() => {
              if (bridge && bridge.parentNode) {
                bridge.parentNode.removeChild(bridge);
              }
            }, 500);
          }
        });
      });
    };
    
    // Gọi hàm tạo cầu nối
    setTimeout(createMenuBridge, 500);
    
    // Clean up khi component unmount
    return () => {
      // Hủy đăng ký sự kiện khi component unmount
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      
      // Xử lý cleanup cho các bridge
      const bridges = document.querySelectorAll('.menu-bridge');
      bridges.forEach(bridge => {
        if (bridge && bridge.parentNode) {
          bridge.parentNode.removeChild(bridge);
        }
      });
    };
  }, [setHovered]);
  
  return (
    <div className="home-container" style={{ marginTop: 0, paddingTop: 0 }}>
      {/* Banner & Menu */}
      <div className="banner-menu-container" style={{ marginTop: 0 }}>
        <div className="menu-section">
          <div className="menu-wrapper">
            <Menu hovered={hovered} setHovered={setHovered} setData={setData} />
            <HoverMenu hovered={hovered} setHovered={setHovered} data={data} />
          </div>
        </div>
        <div className="main-slider-container">
          <div className="main-slider-content">
            <h2 className="main-slider-title">Giá Mềm - Xài Bền - Mặc Sướng</h2>
            <div className="main-slider-price-container">
              <p className="price-before">Chi từ</p>
              <p className="price-current">68.000đ</p>
            </div>
            <div className="slider-navigation">
              <button className="nav-left">&lt;</button>
              <button className="nav-right">&gt;</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Banner khuyến mãi */}
      <div className="promo-banner">
        <h3>GIẢM GIÁ MÙA HÈ - LÊN ĐẾN 50%</h3>
        <Link to="/Shopping">
          <button className="btn-buy-now">
            MUA NGAY <ArrowForwardIcon fontSize="small" />
          </button>
        </Link>
      </div>
      
      {/* Các tính năng */}
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

      {/* Sản phẩm nổi bật */}
      <div className="section-title">
        <h1 className="text-center">Sản phẩm nổi bật</h1>
      </div>
      <ListItem />

      {/* Danh mục nổi bật */}
      <div className="category-section">
        <h2>DANH MỤC NỔI BẬT</h2>
        <div className="category-grid">
          {categories.map(category => (
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

      {/* Dành cho bạn */}
      <div className="section-title">
        <h1 className="text-center">Dành cho bạn</h1>
      </div>
      <HomeShopping />
    </div>
  );
};

export default Home;
