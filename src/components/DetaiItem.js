import DetailImg from "./DetailImg";
import "../styles/DetailItem.scss";
import { withRouter } from "react-router-dom";
import DetailItemDescription from "./DetailItemDescription";

import IntroItem from "./IntroItem";
import ListItem from "./ListItem";

const DetailItem = (props) => {
  return (
    <div className="ContainerDetail container-fluid shadow-sm p-3 mb-5 bg-white rounded">
      <div className="row">
        <DetailImg data={props.match.params.id} />

        <DetailItemDescription data={props.match.params.id} />
      </div>

      <div className="row mt-2">
        <IntroItem data={props.match.params.id} />
      </div>
      <div className="row mt-2">
        <ListItem />
      </div>
    </div>
  );
};
export default withRouter(DetailItem);
