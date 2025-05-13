import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";
import "../styles/ListItem.scss"; // Import CSS

const HomeShopping = () => {
  const [dataPhone, setDataPhone] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Giữ 4 item giống như ListItem
  const style = [
    { top: "-6em" },
    { bottom: "270px" }
  ];

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
    async function fetchData() {
      try {
        let res = await axios.get("/api/v1/products/getAll");
        let data = res && res.data ? res.data : [];
        setDataPhone(data.filter(item => item.loHang !== null));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
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
          {dataPhone.length > 0 ? (
            dataPhone
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((item, index) => (
                <div className="col-3" key={index}>
                  <Item children={item} style={style} />
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

export default HomeShopping;
