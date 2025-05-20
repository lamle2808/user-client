import { Box, TextField, styled, Button, Avatar } from "@mui/material";

export const TextInput = styled(TextField)(() => ({
  marginTop: 20,
  '& label.Mui-focused': {
    color: '#146C94',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#146C94',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#146C94',
    },
  },
}));

export const DividerBox = styled(Box)(() => ({
  height: 2,
  width: "40vw",
  marginLeft: "19%",
  backgroundColor: "#CCCCCC",
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: '4px solid #fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export const UpdateButton = styled(Button)(({ theme }) => ({
  width: 300,
  borderRadius: 30,
  backgroundColor: '#146C94',
  color: 'white',
  textTransform: 'none',
  padding: '10px 0',
  fontWeight: 600,
  transition: 'all 0.3s',
  boxShadow: '0 4px 6px rgba(20, 108, 148, 0.2)',
  '&:hover': {
    backgroundColor: '#1c98d0',
    boxShadow: '0 6px 10px rgba(20, 108, 148, 0.3)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0 2px 4px rgba(20, 108, 148, 0.3)',
  },
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  width: 500,
  maxWidth: '90%',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
}));

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.default",
  border: "2px solid gray",
  boxShadow: 24,
  color: "text.primary",
  p: 4,
  borderRadius: 5,
};
