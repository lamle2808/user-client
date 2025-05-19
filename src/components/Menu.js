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
  
  // Style chung cho text
  const textStyle = {
    fontSize: "15px", 
    fontWeight: 500, 
    letterSpacing: "0.8px", 
    textTransform: "uppercase"
  };
  
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
          style={{ padding: "12px 16px", cursor: "pointer" }}
          data-category="ao-thun"
        >
          <ListItemText 
            primary="Áo Thun" 
            primaryTypographyProps={{ style: textStyle }}
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "ao-khoac" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("ao-khoac")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("ao-khoac", "Áo khoác")}
          style={{ padding: "12px 16px", cursor: "pointer" }}
          data-category="ao-khoac"
        >
          <ListItemText 
            primary="Áo Khoác" 
            primaryTypographyProps={{ style: textStyle }}
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "ao-so-mi" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("ao-so-mi")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("ao-so-mi", "Áo sơ mi")}
          style={{ padding: "12px 16px", cursor: "pointer" }}
          data-category="ao-so-mi"
        >
          <ListItemText 
            primary="Áo Sơ Mi" 
            primaryTypographyProps={{ style: textStyle }}
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "quan-short" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("quan-short")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("quan-short", "Quần short")}
          style={{ padding: "12px 16px", cursor: "pointer" }}
          data-category="quan-short"
        >
          <ListItemText 
            primary="Quần Short" 
            primaryTypographyProps={{ style: textStyle }}
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "quan-dai" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("quan-dai")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("quan-dai", "Quần dài")}
          style={{ padding: "12px 16px", cursor: "pointer" }}
          data-category="quan-dai"
        >
          <ListItemText 
            primary="Quần Dài" 
            primaryTypographyProps={{ style: textStyle }}
          />
        </ListButton>

        <ListButton
          className={`menu-item ${activeCategory.current === "10" && hovered ? "menu-item-active" : ""}`}
          onMouseEnter={() => handleMouseEnter("10")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCategoryClick("10", "Phụ kiện")}
          style={{ padding: "12px 16px", cursor: "pointer" }}
          data-category="10"
        >
          <ListItemText 
            primary="Phụ kiện" 
            primaryTypographyProps={{ style: textStyle }}
          />
        </ListButton>
      </List>
    </div>
  );
};
export default Menu;