import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Left from "../User/Left";
import { TextInput } from "../Account/Style";
import { useState } from "react";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
function FPassword() {
  const [pass, setPass] = useState("");
  const [newP, setNewP] = useState("");
  const [error, setPasswordError] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const [showPass, setShowPass] = useState(false);
  const [showPassO, setShowPassO] = useState(false);
  const handleChange = () => {
    if (pass !== "" && newP !== "" && error === false) {
      axios
        .post("/api/v1/accounts/changePasswrod", {
          email: dataUser.email,
          passwordOld: pass,
          passwordNew: newP,
        })
        .then(function (response) {
          toast.success(`Đổi thành công`);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      toast.error(`Vui lòng nhập chính xác thông tin`);
    }
  };
  const handleChanglePassword = (e) => {
    if (regpass.test(e)) {
      setNewP(e);
      setPasswordError(false);
    } else {
      setNewP(e);
      setPasswordError(true);
    }
  };
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        marginTop: 2,
        paddingBottom: 2,
      }}
    >
      <Stack direction={"row"} sx={{ width: "80vw" }} gap={5}>
        <Left />
        <Stack
          sx={{
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            borderRadius: 5,
            paddingTop: 3,
          }}
        >
          <Typography variant="h4">Đổi mật khẩu</Typography>
          <Box>
            <TextInput
              id="standard-basic"
              label="Mật khẩu cũ"
              variant="standard"
              value={pass || ""}
              fullWidth
              type={showPassO ? "text" : "password"}
              onChange={(e) => setPass(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={showPassO ? "Hiện" : "Ẩn"}>
                      <IconButton onClick={() => setShowPassO(!showPassO)}>
                        {showPassO ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <TextInput
              id="standard-basic"
              label="Mật khẩu mới"
              variant="standard"
              value={newP || ""}
              type={showPass ? "text" : "password"}
              fullWidth
              error={error}
              onChange={(e) => handleChanglePassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={showPass ? "Hiện" : "Ẩn"}>
                      <IconButton onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ marginTop: 5 }}>
            <Button variant="contained" onClick={handleChange}>
              Đổi
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default FPassword;
