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
} from "@mui/material";
import Left from "../User/Left";
import logo from "../../assets/images/logo.png";
import { TextInput } from "./Style";
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

  const handleChange = (event) => {
    setSex(event.target.value);
  };

  const handleSubmit = (e) => {
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
        toast.success("Thành công");
      })
      .catch(function (error) {
        console.log(error);
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
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // Ref cho input file
  const imageInputRef = createRef();
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
          }}
        >
          <input
            type="file"
            ref={imageInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button onClick={handleImageClick}>
            <Avatar
              alt="Remy Sharp"
              src={ava || logo}
              sx={{ width: 100, height: 100 }}
            />
          </Button>

          <Box
            sx={{
              width: 500,
            }}
          >
            <Stack direction={"row"} sx={{ marginTop: 5 }} gap={5}>
              <TextField
                id="standard-basic"
                label="Họ"
                variant="standard"
                value={lName}
                fullWidth
                onChange={(e) => setLName(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="Tên"
                variant="standard"
                value={fName}
                fullWidth
                onChange={(e) => setFName(e.target.value)}
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
              sx={{ padding: 5, justifyContent: "center" }}
            >
              {done ? (
                <Button
                  variant="outlined"
                  sx={{
                    width: 300,
                    borderRadius: 5,
                    backgroundColor: "#146C94",
                    color: "white",
                    ":hover": {
                      backgroundColor: "#1c98d0",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Cập nhật
                </Button>
              ) : (
                <Box
                  sx={{
                    width: 300,
                    borderRadius: 5,
                    backgroundColor: "#146C94",
                    color: "white",
                    height: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress color="inherit" />
                </Box>
              )}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Account;
