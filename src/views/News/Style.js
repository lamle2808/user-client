import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Card } from '@mui/material';

// Styled components cho trang News

export const HeroBanner = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '70vh',
  overflow: 'hidden',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    height: '50vh',
  },
}));

export const BannerContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '15%',
  left: '10%',
  color: 'white',
  maxWidth: '50%',
  [theme.breakpoints.down('md')]: {
    bottom: '10%',
    left: '5%',
    maxWidth: '90%',
  },
}));

export const BannerTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  fontSize: '3.5rem',
  textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));

export const BannerSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontSize: '1.5rem',
  fontWeight: 500,
  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.2rem',
  },
}));

export const ActionButton = styled(Button)(({ theme, darkBg }) => ({
  backgroundColor: darkBg ? '#146C94' : 'white',
  color: darkBg ? 'white' : 'black',
  fontWeight: 600,
  borderRadius: 0,
  padding: '12px 30px',
  '&:hover': {
    backgroundColor: darkBg ? '#0D5D81' : 'rgba(255,255,255,0.8)',
    transform: 'translateY(-2px)',
    boxShadow: darkBg ? '0 4px 8px rgba(13, 93, 129, 0.3)' : '0 4px 8px rgba(0,0,0,0.1)',
  },
  transition: 'all 0.3s ease',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
  },
}));

export const CollectionCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: '700px',
  borderRadius: 0,
  boxShadow: 'none',
  overflow: 'hidden',
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    height: '300px',
  },
}));

export const CardOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '50%',
  background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
  zIndex: 1,
});

export const CardContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '10%',
  left: '8%',
  color: 'white',
  maxWidth: '80%',
  zIndex: 2,
  [theme.breakpoints.down('md')]: {
    bottom: '8%',
    left: '5%',
  },
}));

export const PromoTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  backgroundColor: theme.palette.error.main,
  color: 'white',
  padding: '4px 12px',
  fontWeight: 600,
  zIndex: 2,
}));

export const FullWidthBanner = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  [theme.breakpoints.down('md')]: {
    height: '300px',
  },
}));

export const CenteredBannerContent = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  textAlign: 'center',
  width: '80%',
  zIndex: 2,
});

export const BannerOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
  zIndex: 1,
}); 