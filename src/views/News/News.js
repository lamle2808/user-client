import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Paper,
} from '@mui/material';

// Import các styled components
import {
  HeroBanner,
  BannerContent,
  BannerTitle,
  BannerSubtitle,
  ActionButton,
  SectionTitle,
  CollectionCard,
  CardOverlay,
  CardContent as StyledCardContent,
  PromoTag,
  FullWidthBanner,
  CenteredBannerContent,
  BannerOverlay
} from './Style';

// Banner placeholder images - Thông thường sẽ được thay thế bằng hình ảnh thực từ backend
const BANNER_1 = "https://cmsv2.yame.vn/uploads/7f60936b-9142-4099-afbb-02f48d7accbf/thoi_trang_mac_suong_gia_tot.jpg?quality=80&w=1280&h=0";
// Hoặc nếu đã có URL trực tiếp từ máy chủ:
const BANNER_2 = "https://cmsv2.yame.vn/uploads/5c2200bc-fb4f-4af1-af14-31a5e5bbd653/Doraemon.jpg?quality=80&w=0&h=0";
const BANNER_3 = "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/sportswear-FW23-adifom-stan-smith-ch2-m-masthead-d_tcm337-1036890.jpg";

const COLLECTION_1 = "https://cdn2.yame.vn/pimg/ao-thun-co-tron-tay-ngan-soi-nhan-tao-thoang-mat-tron-dang-om-the-thao-beginner-01-0023139/1ac33240-f647-0d00-c943-001bc4aa1c53.jpg?w=540&h=756&c=true&v=052025";
const COLLECTION_2 = "https://cdn2.yame.vn/pimg/ao-so-mi-co-be-tay-dai-vai-cotton-tham-hut-tron-dang-rong-gia-tot-seventy-seven-50-vol-24-0024387/51904a0c-3e09-6800-2d03-001c6b3116e1.jpg?w=540&h=756&c=true&v=052025";
const COLLECTION_3 = "https://cdn2.yame.vn/pimg/ao-thun-co-tron-tay-ngan-vai-cotton-2-chieu-mac-mat-bieu-tuong-dang-rong-danh-cho-fan-one-piece-m13-0023705/dd1532e9-2b35-5a00-c558-001c698d5778.jpg?w=540&h=756&c=true&v=052025";
const COLLECTION_4 = "https://cdn2.yame.vn/pimg/ao-thun-co-tron-tay-dai-vai-cotton-mac-am-bieu-tuong-dang-rong-4fan-dragon-ball-z-38-vol-24-0024400/f88467bb-e8d6-4100-eb07-001c61b24339.jpg?w=540&h=756&c=true&v=052025";

const PROMO_1 = "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/adidas-mco-april-2023-launch-GLPs_viVN_tcm337-1012589.jpg";
const PROMO_2 = "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/viVN_tcm337-1013173.jpg";

const News = () => {
  // Carousel items - Có thể dễ dàng thêm/bớt banner
  const carouselItems = [
    {
      image: BANNER_1,
      title: "SẢN PHẨM MỚI GIÁ CỰC SỐC",
      subtitle: "ÁO THUN GIÁ RẺ VÀ CHẤT LƯỢNG CAO",
      buttonText: "MUA NGAY",
      link: "/Shopping"
    },
    {
      image: BANNER_2,
      title: "CHẠY KHÔNG GIỚI HẠN",
      subtitle: "Supernova Rise - Đôi giày mang lại cảm giác êm ái vô tận",
      buttonText: "KHÁM PHÁ NGAY",
      link: "/Shopping"
    },
    {
      image: BANNER_3,
      title: "STAN SMITH ADIFOM",
      subtitle: "Phiên bản mới của biểu tượng vượt thời gian",
      buttonText: "MUA NGAY",
      link: "/Shopping"
    }
  ];

  // Collections - Bộ sưu tập
  const collections = [
    {
      image: COLLECTION_1,
      title: "BỘ SƯU TẬP BEGINNER",
      description: "NĂNG ĐỘNG, THỂ THAO",
      buttonText: "MUA NGAY",
      link: "/Shopping"
    },
    {
      image: COLLECTION_2,
      title: "THE STYLE OF ALL STYLE",
      description: "LỊCH LÃM, THỜI THƯỢNG, CÁ TÍNH",
      buttonText: "MUA NGAY",
      link: "/Shopping"
    },
    {
      image: COLLECTION_3,
      title: "ONE PIECE",
      description: "KHÁM PHÁ THẾ GIỚI HOẠT HÌNH YÊU THÍCH CỦA BẠN",
      buttonText: "KHÁM PHÁ NGAY",
      link: "/Shopping"
    },
    {
      image: COLLECTION_4,
      title: "DRAGON BALL Z",
      description: "KHÁM PHÁ THẾ GIỚI HOẠT HÌNH YÊU THÍCH CỦA BẠN",
      buttonText: "KHÁM PHÁ NGAY",
      link: "/Shopping"
    }
  ];

  // Promotions - Khuyến mãi
  const promotions = [
    {
      image: PROMO_1,
      title: "MỪNG KHAI TRƯƠNG",
      description: "Mua 2 sản phẩm - Giảm thêm 20%",
      code: "MCKTRG",
      expiryDate: "31/12/2023",
      buttonText: "MUA NGAY",
      link: "/Shopping"
    },
    {
      image: PROMO_2,
      title: "BLACK FRIDAY",
      description: "Giảm tới 50% cho nhiều sản phẩm",
      code: "BFRIDAY",
      expiryDate: "30/11/2023",
      buttonText: "XEM NGAY",
      link: "/Shopping"
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', pb: 8 }}>
      {/* Hero Banner Carousel */}
      <HeroBanner sx={{ height: '90vh' }}>
        {/* Thay đổi ảnh banner tại đây */}
        <Box 
          sx={{
            backgroundImage: `url(${carouselItems[0].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          <BannerContent>
            <BannerTitle variant="h2">
              {carouselItems[0].title}
            </BannerTitle>
            <BannerSubtitle variant="h5">
              {carouselItems[0].subtitle}
            </BannerSubtitle>
            <ActionButton 
              variant="contained" 
              size="large"
              href={carouselItems[0].link}
            >
              {carouselItems[0].buttonText}
            </ActionButton>
          </BannerContent>
        </Box>
      </HeroBanner>

      <Container maxWidth="xl">
        {/* Collections Section */}
        <Box sx={{ mb: 8 }}>
          <SectionTitle variant="h4">
            BỘ SƯU TẬP MỚI
          </SectionTitle>
          
          <Grid container spacing={3}>
            {collections.map((collection, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CollectionCard>
                  <CardMedia
                    component="img"
                    image={collection.image}
                    alt={collection.title}
                    sx={{ 
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  
                  <StyledCardContent>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
                      {collection.title}
                    </Typography>
                    <Typography sx={{ mb: 2, textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}>
                      {collection.description}
                    </Typography>
                    <ActionButton 
                      variant="contained"
                      href={collection.link}
                    >
                      {collection.buttonText}
                    </ActionButton>
                  </StyledCardContent>
                  
                  {/* Gradient overlay for better text readability */}
                  <CardOverlay />
                </CollectionCard>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Additional Banner */}
        <FullWidthBanner>
          <Box 
            sx={{
              backgroundImage: `url(${BANNER_3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              width: '100%',
              position: 'relative',
            }}
          >
            <BannerOverlay />
            <CenteredBannerContent>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
              }}>
                ĐĂNG KÝ NHẬN THÔNG TIN
              </Typography>
              <Typography variant="h6" sx={{ 
                mb: 3,
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>
                Đăng ký để nhận thông tin mới nhất về sản phẩm và ưu đãi đặc biệt
              </Typography>
              <Button 
                variant="outlined" 
                size="large"
                sx={{
                  bgcolor: 'transparent',
                  color: 'white',
                  borderColor: 'white',
                  fontWeight: 600,
                  borderRadius: 1,
                  padding: '10px 30px',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                  }
                }}
              >
                ĐĂNG KÝ NGAY
              </Button>
            </CenteredBannerContent>
          </Box>
        </FullWidthBanner>
      </Container>
    </Box>
  );
};

export default News; 