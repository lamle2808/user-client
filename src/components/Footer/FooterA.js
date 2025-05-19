import {
  Box,
  ListItemButton,
  ListItemText,
  Stack,
  List,
  Typography,
  IconButton,
  Container,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";

function FooterA() {
  return (
    <Box 
      sx={{
        backgroundColor: "#d4a793",
        color: "#333",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Link to="/">
                  <img 
                    src={logo} 
                    alt="L&T Fashion" 
                    style={{ 
                      height: 50, 
                      background: "#fff",
                      borderRadius: 4,
                      padding: 4
                    }} 
                  />
                </Link>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  L & T
                </Typography>
              </Stack>
              
              <Typography variant="body2" sx={{ mt: 1, mb: 2, color: "#333" }}>
                L & T Fashion - Thương hiệu đẳng cấp trong lĩnh vực thời trang, mang đến phong cách trẻ trung và hiện đại cho giới trẻ Việt Nam.
              </Typography>
              
              <Stack direction="row" spacing={1}>
                <IconButton 
                  size="small" 
                  sx={{ color: "#333", p: 0.5 }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  sx={{ color: "#333", p: 0.5 }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  sx={{ color: "#333", p: 0.5 }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  sx={{ color: "#333", p: 0.5 }}
                >
                  <YouTubeIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography 
              variant="h6" 
              fontWeight="bold"
              sx={{ mb: 2, borderBottom: "2px solid #333", pb: 1, display: "inline-block", color: "#333" }}
            >
              Cửa hàng
            </Typography>
            <List component="nav" disablePadding>
              {["Tất cả sản phẩm", "Giỏ hàng", "Cá nhân"].map((text) => (
                <ListItemButton 
                  key={text} 
                  component={Link} 
                  to="/"
                  sx={{ 
                    py: 0.5, 
                    px: 0,
                    color: "#333",
                    "&:hover": { 
                      backgroundColor: "transparent",
                      color: "#8b4513"
                    } 
                  }}
                >
                  <ListItemText 
                    primary={text} 
                    primaryTypographyProps={{ 
                      fontSize: 14,
                      fontWeight: 400
                    }} 
                  />
                </ListItemButton>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography 
              variant="h6" 
              fontWeight="bold"
              sx={{ mb: 2, borderBottom: "2px solid #333", pb: 1, display: "inline-block", color: "#333" }}
            >
              Chính sách mua hàng
            </Typography>
            <List component="nav" disablePadding>
              {[
                "Mua hàng và thanh toán Online", 
                "Mua hàng trả góp Online", 
                "Tra thông tin bảo hành"
              ].map((text) => (
                <ListItemButton 
                  key={text} 
                  component="a" 
                  href="#"
                  sx={{ 
                    py: 0.5,
                    px: 0,
                    color: "#333",
                    "&:hover": { 
                      backgroundColor: "transparent",
                      color: "#8b4513"
                    }
                  }}
                >
                  <ListItemText 
                    primary={text} 
                    primaryTypographyProps={{ 
                      fontSize: 14,
                      fontWeight: 400 
                    }} 
                  />
                </ListItemButton>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography 
              variant="h6" 
              fontWeight="bold"
              sx={{ mb: 2, borderBottom: "2px solid #333", pb: 1, display: "inline-block", color: "#333" }}
            >
              Liên hệ
            </Typography>
            
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <LocationOnIcon fontSize="small" sx={{ mt: 0.3, color: "#333" }} />
                <Typography variant="body2" sx={{ color: "#333" }}>
                  Số 123 Nguyễn Văn Linh, Quận 7, TP Hồ Chí Minh
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon fontSize="small" sx={{ color: "#333" }} />
                <Typography variant="body2" sx={{ color: "#333" }}>
                  +84 912 345 678
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon fontSize="small" sx={{ color: "#333" }} />
                <Typography variant="body2" sx={{ color: "#333" }}>
                  support@ltfashion.vn
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 3, backgroundColor: "rgba(51, 51, 51, 0.3)" }} />
        
        <Typography 
          variant="body2" 
          align="center"
          sx={{ opacity: 0.8, color: "#333" }}
        >
          © {new Date().getFullYear()} L&T Fashion. Tất cả các quyền được bảo lưu.
        </Typography>
      </Container>
    </Box>
  );
}

export default FooterA;
