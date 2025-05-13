import { Box, Stack, Typography } from "@mui/material";
import Left from "../User/Left";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { BoxItem } from "./Style";
import HandymanIcon from "@mui/icons-material/Handyman";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
function Support() {
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
          <Stack direction={"row"} gap={5} p={2} sx={{ width: "100%" }}>
            <BoxItem direction={"row"} gap={3}>
              <HeadsetMicIcon sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="subtitle1">
                  Tư vấn mua hàng (8h00 - 22h00)
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "red" }}>
                  1800.0000
                </Typography>
              </Box>
            </BoxItem>
            <BoxItem direction={"row"} gap={3}>
              <HandymanIcon sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="subtitle1">
                  Bảo hành (8h00 - 22h00)
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "red" }}>
                  1800.0000
                </Typography>
              </Box>
            </BoxItem>
          </Stack>
          <Stack direction={"row"} gap={5} p={2} sx={{ width: "100%" }}>
            <BoxItem direction={"row"} gap={3}>
              <ThumbsUpDownIcon sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="subtitle1">
                  Khiếu nại (8h00 - 22h00)
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "red" }}>
                  1800.0000
                </Typography>
              </Box>
            </BoxItem>
            <BoxItem direction={"row"} gap={3}>
              <MarkEmailUnreadIcon sx={{ fontSize: 50 }} />
              <Box>
                <Typography variant="subtitle1">Email</Typography>
                <Typography variant="subtitle1" sx={{ color: "red" }}>
                  1800.0000
                </Typography>
              </Box>
            </BoxItem>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Support;
