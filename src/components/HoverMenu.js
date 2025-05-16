import { Box, Paper, Stack, Typography } from "@mui/material";
import {
  dataWomen,
  dataMen,
  dataKids,
  dataAccessories
} from "../assets/action/Data";
import { 
  aoThunData, 
  aoKhoacData, 
  aoSoMiData, 
  quanShortData, 
  quanDaiData, 
  phuKienData 
} from "../assets/action/CategoryData";
import { useEffect, useState, useRef } from "react";
import { TextMenu } from "../assets/style/Style";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "../styles/HoverMenu.scss";

function HoverMenu({ hovered, setHovered, data }) {
  const [daa, setDaa] = useState("");
  const timerRef = useRef(null);
  
  // Xử lý khi rời khỏi menu với delay
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setHovered(false);
    }, 800); // Delay 800ms trước khi ẩn menu
  };
  
  // Xử lý khi di chuột vào, hủy bỏ timer nếu có
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setHovered(true);
  };
  
  // Xóa timer khi component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    switch (data) {
      case "1": // Tất cả quần áo -> dataWomen
        setDaa(dataWomen);
        break;
      case "12,7,11": // Quần áo nữ
        setDaa(dataWomen);
        break;
      case "8,9": // Quần áo nam
        setDaa(dataMen);
        break;
      case "5,6": // Quần áo trẻ em
        setDaa(dataKids);
        break;
      case "10": // Phụ kiện
        setDaa(phuKienData);
        break;
      case "3,2,4": // Túi xách, Giày dép
        setDaa(dataAccessories);
        break;
      // Thêm case mới cho các danh mục sản phẩm
      case "ao-thun":
        setDaa(aoThunData);
        break;
      case "ao-khoac":
        setDaa(aoKhoacData);
        break;
      case "ao-so-mi":
        setDaa(aoSoMiData);
        break;
      case "quan-short":
        setDaa(quanShortData);
        break;
      case "quan-dai":
        setDaa(quanDaiData);
        break;
      default:
        break;
    }
  }, [data]);
  const history = useHistory();

  const handled = (as) => {
    // Đóng hover menu ngay lập tức khi click vào một mục
    setHovered(false);
    history.push(`/Find/${data + ":" + as}`);
  };
  
  // Tạo class cho Paper dựa vào trạng thái hover
  const paperClass = `hover-menu-paper ${hovered ? 'visible' : 'hidden'}`;
  
  // Tạo layout cho menu hiển thị theo cột
  const renderCategoryColumn = (category) => (
    <Box className="hover-menu-category-column" key={category.id}>
      <Typography variant="h6" className="hover-menu-category-title">
        {category.id}
      </Typography>
      <Box className="hover-menu-items-wrapper">
        {category.type.map((item, index) => (
          <TextMenu
            variant="body2"
            className="hover-menu-item"
            key={index}
            onClick={() => handled(item.name)}
          >
            {item.name}
          </TextMenu>
        ))}
      </Box>
    </Box>
  );
  
  return (
    <Paper
      className={paperClass}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="hover-bridge"></div>
      <Stack className="hover-menu-stack">
        {daa && daa.map(renderCategoryColumn)}
      </Stack>
    </Paper>
  );
}

export default HoverMenu;
