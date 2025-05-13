import { Box, TextField, styled } from "@mui/material";

export const TextInput = styled(TextField)(() => ({
  marginTop: 20,
}));
export const DividerBox = styled(Box)(() => ({
  height: 2,
  width: "40vw",
  marginLeft: "19%",
  backgroundColor: "#CCCCCC",
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
