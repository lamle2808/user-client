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
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleSocialHover = (social) => {
    setHoveredSocial(social);
  };

  const handleSocialLeave = () => {
    setHoveredSocial(null);
  };

  const socialStyles = (social) => ({
    color: hoveredSocial === social ? "#fff" : social === "facebook" ? "#1877F2" : social === "instagram" ? "#E4405F" : social === "twitter" ? "#1DA1F2" : "#FF0000",
    backgroundColor: hoveredSocial === social ? social === "facebook" ? "#1877F2" : social === "instagram" ? "#E4405F" : social === "twitter" ? "#1DA1F2" : "#FF0000" : "transparent",
    transition: "all 0.3s ease",
    transform: hoveredSocial === social ? "scale(1.2)" : "scale(1)",
  });

  return (
    <Paper elevation={3} sx={{ mt: 5 }}>
      <Box 
        sx={{
          background: "linear-gradient(135deg, #19547b 0%, #2a5298 100%)",
          color: "#fff",
          pt: 6,
          pb: 4,
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
                        height: 60, 
                        borderRadius: 8,
                        background: "#fff",
                        padding: 5,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                      }} 
                    />
                  </Link>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      background: "linear-gradient(90deg, #fff 0%, #e0e0e0 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                    }}
                  >
                    L & T
                  </Typography>
                </Stack>
                
                <Typography variant="subtitle1" sx={{ opacity: 0.9, maxWidth: 300 }}>
                  L & T Fashion - Thương hiệu đẳng cấp trong lĩnh vực thời trang, mang đến phong cách trẻ trung và hiện đại cho giới trẻ Việt Nam.
                </Typography>
                
                <Stack direction="row" spacing={1} mt={1}>
                  <IconButton 
                    size="large" 
                    onMouseEnter={() => handleSocialHover("facebook")}
                    onMouseLeave={handleSocialLeave}
                    sx={{ 
                      ...socialStyles("facebook"),
                      boxShadow: hoveredSocial === "facebook" ? "0 4px 12px rgba(24, 119, 242, 0.4)" : "none"
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton 
                    size="large" 
                    onMouseEnter={() => handleSocialHover("instagram")}
                    onMouseLeave={handleSocialLeave}
                    sx={{ 
                      ...socialStyles("instagram"),
                      boxShadow: hoveredSocial === "instagram" ? "0 4px 12px rgba(228, 64, 95, 0.4)" : "none"
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton 
                    size="large"
                    onMouseEnter={() => handleSocialHover("twitter")}
                    onMouseLeave={handleSocialLeave}
                    sx={{ 
                      ...socialStyles("twitter"),
                      boxShadow: hoveredSocial === "twitter" ? "0 4px 12px rgba(29, 161, 242, 0.4)" : "none"
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton 
                    size="large"
                    onMouseEnter={() => handleSocialHover("youtube")}
                    onMouseLeave={handleSocialLeave}
                    sx={{ 
                      ...socialStyles("youtube"),
                      boxShadow: hoveredSocial === "youtube" ? "0 4px 12px rgba(255, 0, 0, 0.4)" : "none"
                    }}
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
                sx={{ mb: 2, borderBottom: "2px solid #fff", pb: 1, display: "inline-block" }}
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
                      "&:hover": { 
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "translateX(5px)",
                        transition: "all 0.3s ease"
                      } 
                    }}
                  >
                    <ListItemText 
                      primary={text} 
                      primaryTypographyProps={{ 
                        fontSize: 15,
                        fontWeight: 400,
                        transition: "all 0.3s ease",
                        "&:hover": { fontWeight: 500 }
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
                sx={{ mb: 2, borderBottom: "2px solid #fff", pb: 1, display: "inline-block" }}
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
                      "&:hover": { 
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "translateX(5px)",
                        transition: "all 0.3s ease"
                      }
                    }}
                  >
                    <ListItemText 
                      primary={text} 
                      primaryTypographyProps={{ 
                        fontSize: 15,
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
                sx={{ mb: 2, borderBottom: "2px solid #fff", pb: 1, display: "inline-block" }}
              >
                Liên hệ
              </Typography>
              
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon fontSize="small" color="inherit" />
                  <Typography variant="body2">
                    Số 177/6C Nguyễn Trí Phương, Dĩ An, Bình Dương
                  </Typography>
                </Stack>
                
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneIcon fontSize="small" color="inherit" />
                  <Typography variant="body2">
                    +84 987 654 321
                  </Typography>
                </Stack>
                
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailIcon fontSize="small" color="inherit" />
                  <Typography variant="body2">
                    contact@ltfashion.com
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 5, mb: 3, backgroundColor: "rgba(255,255,255,0.2)" }} />
          
          <Typography 
            variant="body2" 
            align="center"
            sx={{ opacity: 0.8 }}
          >
            © {new Date().getFullYear()} L&T Fashion. Tất cả các quyền được bảo lưu.
          </Typography>
        </Container>
      </Box>
    </Paper>
  );
}

export default FooterA;
