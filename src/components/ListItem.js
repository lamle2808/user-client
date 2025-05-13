import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";
import "../styles/ListItem.scss"; // Import CSS

const ListItem = () => {
  const [dataPhone, setDataPhone] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Number of items to display per page

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < dataPhone.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    axios
      .get("/api/v1/products/getSPNB")
      .then(function (response) {
        setDataPhone(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container-fluid py-2 list-container">
        <div className="btn-left">
          <button
            className="btn btn-previous"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <span>&#60;</span>
          </button>
        </div>
        <div className="btn-right">
          <button
            className="btn btn-next"
            onClick={handleNext}
            disabled={currentIndex >= dataPhone.length - itemsPerPage}
          >
            <span>&#62;</span>
          </button>
        </div>
        <div className="row">
          {dataPhone !== "" ? (
            dataPhone
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((item, index) => (
                <div className="col-3" key={index}>
                  <Item children={item} />
                </div>
              ))
          ) : (
            <div className="col-12 text-center">
              <p>Đang tải sản phẩm...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListItem;
