import {
  Box,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  CircularProgress,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import Left from "../User/Left";
import logo from "../../assets/images/logo.png";
import { TextInput, ProfileAvatar, UpdateButton, FormContainer } from "./Style";
import { createRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
function Account() {
  const dataUser = JSON.parse(localStorage.getItem("data"));
  console.log(dataUser);

  const [ava, setAva] = useState(dataUser.avatar.imageLink);
  const [fName, setFName] = useState(dataUser.firstName);
  const [lName, setLName] = useState(dataUser.lastName);
  const [email, setEmail] = useState(dataUser.email);
  const [address, setAddress] = useState(dataUser.address);
  const [phone, setPhone] = useState(dataUser.phone);
  const [birth, setBirth] = useState(dataUser.dateOfBirth);

  const [sex, setSex] = useState(dataUser.sex);
  const [done, setDone] = useState(true);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSex(event.target.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    axios
      .post(`/api/v1/customer/createOrUpdate`, {
        id: dataUser.id,
        account: dataUser.account,
        address: address,
        avatar: {
          id: id || dataUser.avatar.id,
        },
        shoppingCart: dataUser.shoppingCart,
        sex: sex,
        email: email,
        dateOfBirth: birth,
        firstName: fName,
        lastName: lName,
        phone: phone,
        customerType: "customer",
      })
      .then((res) => {
        localStorage.setItem("data", JSON.stringify(res.data));
        toast.success("Cập nhật thông tin thành công!");
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Đã có lỗi xảy ra khi cập nhật thông tin");
        setLoading(false);
      });
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setDone(false);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setAva(imageURL);
      const formData = new FormData();
      formData.append("multipartFile", selectedFile);
      axios
        .post("/api/v1/avatars/saveOrUpdate", formData)
        .then(function (response) {
          setDone(true);
          setId(response.data.id);
          toast.success("Cập nhật ảnh đại diện thành công!");
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Đã có lỗi khi tải ảnh lên");
          setDone(true);
        });
    }
  };

  // Ref cho input file
  const imageInputRef = createRef();
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction={"row"} sx={{ width: "100%" }} gap={5}>
        <Left />
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 5,
            p: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "150px",
              background: "linear-gradient(135deg, #146C94 0%, #19A7CE 100%)",
              zIndex: 0,
            }}
          />
          
          <Box sx={{ zIndex: 1, mt: 5, mb: 2 }}>
            <input
              type="file"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button onClick={handleImageClick}>
              <ProfileAvatar
                alt="Profile Picture"
                src={ava || logo}
              />
            </Button>
            <Typography variant="subtitle1" textAlign="center" sx={{ mt: 1 }}>
              {fName} {lName}
            </Typography>
          </Box>

          <FormContainer>
            <Typography variant="h5" fontWeight={600} textAlign="center" sx={{ mb: 4 }}>
              Thông tin cá nhân
            </Typography>
            
            <Stack direction={"row"} gap={3}>
              <TextField
                id="standard-basic"
                label="Họ"
                variant="standard"
                value={lName}
                fullWidth
                onChange={(e) => setLName(e.target.value)}
                sx={{
                  '& label.Mui-focused': {
                    color: '#146C94',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#146C94',
                  },
                }}
              />
              <TextField
                id="standard-basic"
                label="Tên"
                variant="standard"
                value={fName}
                fullWidth
                onChange={(e) => setFName(e.target.value)}
                sx={{
                  '& label.Mui-focused': {
                    color: '#146C94',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#146C94',
                  },
                }}
              />
            </Stack>

            <FormControl variant="standard" fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sex}
                label="Giới tính"
                onChange={handleChange}
                sx={{
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#146C94',
                  },
                }}
              >
                <MenuItem value={0}>Nam</MenuItem>
                <MenuItem value={1}>Nữ</MenuItem>
              </Select>
            </FormControl>

            <Box style={{ marginTop: 30 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  sx={{ width: "100%" }}
                  label="Ngày sinh"
                  value={dayjs(birth)}
                  openTo="year"
                  fullWidth
                  inputFormat="DD/MM/YYYY"
                  views={["year", "month", "day"]}
                  minDate={dayjs("1900-01-01")}
                  onChange={(newValue) => {
                    setBirth(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
            <TextInput
              id="standard-basic"
              label="Địa chỉ"
              variant="standard"
              value={address || "Không có"}
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextInput
              id="standard-basic"
              label="Số điện thoại"
              variant="standard"
              value={phone || "Không có"}
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextInput
              id="standard-basic"
              label="Email"
              variant="standard"
              value={email || "Không có"}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <Stack
              direction={"row"}
              sx={{ py: 4, justifyContent: "center" }}
            >
              {done ? (
                <UpdateButton
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Cập nhật thông tin"}
                </UpdateButton>
              ) : (
                <Box
                  sx={{
                    width: 300,
                    borderRadius: 30,
                    backgroundColor: '#146C94',
                    color: "white",
                    height: 48,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress color="inherit" size={24} />
                </Box>
              )}
            </Stack>
          </FormContainer>
        </Paper>
      </Stack>
    </Container>
  );
}

export default Account;
