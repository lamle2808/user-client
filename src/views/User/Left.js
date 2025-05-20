import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuth } from "../../stores/AuthContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Left() {
  const history = useHistory();
  const location = useLocation();
  const { setIsLoggedIn } = useAuth();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
  }, [location]);

  const handleOut = () => {
    localStorage.removeItem("data");
    setIsLoggedIn(false);
    history.push("/");
    window.location.reload();
  };

  const menuItems = [
    {
      text: "Trang chủ",
      icon: <DashboardIcon />,
      path: "/User",
    },
    {
      text: "Lịch sử mua hàng",
      icon: <CategoryIcon />,
      path: "/History",
    },
    {
      text: "Tài khoản của bạn",
      icon: <AccountCircleIcon />,
      path: "/Account",
    },
    {
      text: "Hỗ trợ",
      icon: <HeadsetMicIcon />,
      path: "/Support",
    },
    {
      text: "Đổi mật khẩu",
      icon: <LockResetIcon />,
      path: "/ForgotPass",
    },
    {
      text: "Đăng xuất",
      icon: <ExitToAppIcon />,
      action: handleOut,
    },
  ];

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        width: 300, 
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ 
        padding: '20px 16px', 
        background: 'linear-gradient(135deg, #146C94 0%, #19A7CE 100%)',
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
          Tài khoản của tôi
        </Typography>
      </Box>
      
      <List sx={{ py: 2 }}>
        {menuItems.map((item, index) => (
          <Box key={index}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={item.action || (() => history.push(item.path))}
                sx={{
                  py: 1.5,
                  pl: 3,
                  position: 'relative',
                  backgroundColor: activeItem === item.path ? 'rgba(20, 108, 148, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(20, 108, 148, 0.12)',
                  },
                  '&::before': activeItem === item.path ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: '70%',
                    borderRadius: '0px 3px 3px 0px',
                    backgroundColor: '#146C94',
                  } : {},
                  transition: 'all 0.2s',
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40, 
                  color: activeItem === item.path ? '#146C94' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: activeItem === item.path ? 600 : 400,
                    color: activeItem === item.path ? '#146C94' : 'inherit'
                  }} 
                />
              </ListItemButton>
            </ListItem>
            {index < menuItems.length - 1 && (
              <Divider variant="middle" sx={{ my: 0.5 }} />
            )}
          </Box>
        ))}
      </List>
    </Paper>
  );
}

export default Left;
