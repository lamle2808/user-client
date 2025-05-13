import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAuth } from "../../stores/AuthContext";
function Left() {
  const history = useHistory();
  const { setIsLoggedIn } = useAuth();

  const handleOut = () => {
    localStorage.removeItem("data");
    setIsLoggedIn(false);
    history.push("/");
    window.location.reload();
  };

  return (
    <Box p={1} sx={{ width: 300, bgcolor: "white", borderRadius: 5 }}>
      <Box>
        <List bgcolor="background.paper">
          <ListItem disablePadding>
            <ListItemButton onClick={() => history.push("/User")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Trang chủ" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Divider />
          <ListItem disablePadding sx={{ marginTop: 2, marginBottom: 2 }}>
            <ListItemButton onClick={() => history.push("/History")}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Lịch sử mua hàng" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Divider />
          <ListItem disablePadding sx={{ marginTop: 2, marginBottom: 2 }}>
            <ListItemButton onClick={() => history.push("/Account")}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Tài khoản của bạn" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Divider />
          <ListItem disablePadding sx={{ marginTop: 2, marginBottom: 2 }}>
            <ListItemButton onClick={() => history.push("/Support")}>
              <ListItemIcon>
                <HeadsetMicIcon />
              </ListItemIcon>
              <ListItemText primary="Hỗ trợ" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Divider />
          <ListItem disablePadding sx={{ marginTop: 2, marginBottom: 2 }}>
            <ListItemButton onClick={() => history.push("/ForgotPass")}>
              <ListItemIcon>
                <LockResetIcon />
              </ListItemIcon>
              <ListItemText primary="Đổi mật khẩu" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Divider />
          <ListItem disablePadding sx={{ marginTop: 2, marginBottom: 2 }}>
            <ListItemButton onClick={handleOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Divider />
        </List>
      </Box>
    </Box>
  );
}

export default Left;
