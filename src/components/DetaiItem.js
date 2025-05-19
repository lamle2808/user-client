import DetailImg from "./DetailImg";
import "../styles/DetailItem.scss";
import { withRouter } from "react-router-dom";
import DetailItemDescription from "./DetailItemDescription";
import IntroItem from "./IntroItem";
import ListItem from "./ListItem";
import { Box, Container, Paper } from "@mui/material";

const DetailItem = (props) => {
  return (
    <div className="ContainerDetail">
      {/* Phần thông tin chính của sản phẩm */}
      <Paper elevation={2} className="product-main-container shadow-sm mb-4">
        <div className="product-main-row">
          <DetailImg data={props.match.params.id} />
          <DetailItemDescription data={props.match.params.id} />
        </div>
      </Paper>
      
      {/* Phần mô tả sản phẩm */}
      <IntroItem data={props.match.params.id} />
      
      {/* Phần sản phẩm đề xuất */}
      <Box className="product-recommendations">
        <ListItem />
      </Box>
    </div>
  );
};

export default withRouter(DetailItem);
