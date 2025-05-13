import {
  Box,
  ListItemButton,
  ListItemText,
  Stack,
  List,
  Typography,
  IconButton,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
function FooterA() {
  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "space-around",
        paddingTop: 2,
        backgroundColor: "#146C94",
        color: "white",
        paddingBottom: 2,
      }}
    >
      <Box sx={{ width: 300 }}>
        <Stack
          direction={"row"}
          gap={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Link className="nav-link text-uppercase" to="/">
            <i className="fa-solid fa-shop me-5  "></i>
            <img className="logo" alt="" src={logo}></img>
          </Link>
          <Typography variant="h3">L & T</Typography>
        </Stack>
        <Typography variant="subtitle1">
          L & T Fashion - Thương hiệu đẳng cấp trong lĩnh vực thời trang
        </Typography>
        <Stack direction={"row"} gap={3}>
          <IconButton aria-label="delete" size="large">
            <FacebookIcon sx={{ color: "blue" }} />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <InstagramIcon sx={{ color: "pink" }} />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <TwitterIcon sx={{ color: "lightblue" }} />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <YouTubeIcon sx={{ color: "red" }} />
          </IconButton>
        </Stack>
      </Box>

      <List sx={{ width: 200 }}>
        <Typography variant="h5" sx={{ marginLeft: 2, marginBottom: 2 }}>
          Cửa hàng
        </Typography>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Tất cả sản phẩm" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary=" Giỏ Hàng" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary=" Cá Nhân" />
        </ListItemButton>
      </List>

      <List>
        <Typography variant="h5" sx={{ marginLeft: 2, marginBottom: 2 }}>
          Chính sách và mua hàng
        </Typography>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Mua hàng và thanh toán Online" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Mua hàng trả góp Online" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Tra thông tin bảo hành" />
        </ListItemButton>
      </List>

      <List>
        <Typography variant="h5" sx={{ marginLeft: 2, marginBottom: 2 }}>
          Liên lạc
        </Typography>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Liên hệ hợp tác kinh doanh" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Tuyển dụng" />
        </ListItemButton>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary="Về chúng tôi" />
        </ListItemButton>
      </List>
    </Stack>
  );
}

export default FooterA;
