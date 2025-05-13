import { List, ListItemIcon, ListItemText } from "@mui/material";
import React, { useRef, useEffect } from "react";
import "../styles/Menu.scss";
import { useHistory } from "react-router-dom";

import { Icon } from '@iconify/react';
import WalletIcon from '@mui/icons-material/Wallet'; // Phụ kiện
import LocalMallIcon from "@mui/icons-material/LocalMall"; // Túi xách, giày dép
import { ListButton } from "../assets/style/Style";

const Menu = ({ hovered, setHovered, setData }) => {
  const history = useHistory();
  const timerRef = useRef(null);
  const activeCategory = useRef(null);
  
  // Thêm delay khi rời khỏi menu chính
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setHovered(false);
    }, 800); // Tăng delay thành 800ms để có thời gian di chuyển chuột
  };
  
  // Khi di chuột vào item, hủy timer và hiển thị hover menu tương ứng
  const handleMouseEnter = (category) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    activeCategory.current = category;
    setHovered(true);
    setData(category);
    
    // Đảm bảo menu active được cuộn vào view nếu cần
    const menuItem = document.querySelector(`.menu-item[data-category="${category}"]`);
    if (menuItem) {
      menuItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
  
  // Hàm xử lý khi click vào danh mục
  const handleCategoryClick = (category, searchKey) => {
    // Chuyển hướng đến trang Find với tham số phù hợp
    history.push(`/Find/${category}:${searchKey}`);
  };
  
  // Hủy timer khi component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  return (
    <div className="menu-container">
      <List
        className="menu-list"
        component="nav"
      >
        <ListButton
          className={`menu-item ${activeCategory.current === "ao-thun" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("ao-thun")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("ao-thun", "Áo thun")}
          style={{ width: "100%", padding: "14px 24px", cursor: "pointer" }}
          data-category="ao-thun"
        >
          <ListItemText 
            primary="Áo Thun" 
            style={{ 
              color: "#222", 
              fontSize: "16px", 
              fontWeight: 600, 
              letterSpacing: 0.2, 
              padding: 0 
            }} 
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "ao-khoac" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("ao-khoac")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("ao-khoac", "Áo khoác")}
          style={{ width: "100%", padding: "14px 24px", cursor: "pointer" }}
          data-category="ao-khoac"
        >
          <ListItemText 
            primary="Áo Khoác" 
            style={{ 
              color: "#222", 
              fontSize: "16px", 
              fontWeight: 600, 
              letterSpacing: 0.2, 
              padding: 0 
            }} 
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "ao-so-mi" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("ao-so-mi")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("ao-so-mi", "Áo sơ mi")}
          style={{ width: "100%", padding: "14px 24px", cursor: "pointer" }}
          data-category="ao-so-mi"
        >
          <ListItemText 
            primary="Áo Sơ Mi" 
            style={{ 
              color: "#222", 
              fontSize: "16px", 
              fontWeight: 600, 
              letterSpacing: 0.2, 
              padding: 0 
            }} 
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "quan-short" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("quan-short")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("quan-short", "Quần short")}
          style={{ width: "100%", padding: "14px 24px", cursor: "pointer" }}
          data-category="quan-short"
        >
          <ListItemText 
            primary="Quần Short" 
            style={{ 
              color: "#222", 
              fontSize: "16px", 
              fontWeight: 600, 
              letterSpacing: 0.2, 
              padding: 0 
            }} 
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "quan-dai" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("quan-dai")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("quan-dai", "Quần dài")}
          style={{ width: "100%", padding: "14px 24px", cursor: "pointer" }}
          data-category="quan-dai"
        >
          <ListItemText 
            primary="Quần Dài" 
            style={{ 
              color: "#222", 
              fontSize: "16px", 
              fontWeight: 600, 
              letterSpacing: 0.2, 
              padding: 0 
            }} 
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "10" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("10")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("10", "Phụ kiện")}
          style={{ width: "100%", padding: "14px 24px", cursor: "pointer" }}
          data-category="10"
        >
          <ListItemText 
            primary="Phụ kiện" 
            style={{ 
              color: "#222", 
              fontSize: "16px", 
              fontWeight: 600, 
              letterSpacing: 0.2, 
              padding: 0 
            }} 
          />
        </ListButton>
      </List>
    </div>
  );
};
export default Menu;