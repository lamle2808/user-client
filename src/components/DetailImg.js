import { useState, useRef } from "react";
import "../styles/DetailImg.scss";
import { useEffect } from "react";
import axios from "axios";
const DetailImg = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [listImg, setListImg] = useState([]);
  const [activeImg, setActiveImg] = useState(
    "https://concrete.store/Content/images/not-available.jpg"
  );

  const imageListRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/v1/products/getById/${props.data}`)
      .then(function (res) {
        setListImg(res.data.imageProducts);
        setActiveImg(res.data.imageProducts[0].imageLink);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.data]);

  const handleActive = (index, event) => {
    setActiveIndex(index);
    setActiveImg(event.target.src);

    imageListRef.current.children[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const nextBtn = () => {
    const numberOfLi = imageListRef.current.children.length;

    if (activeIndex < numberOfLi - 1) {
      setActiveIndex(activeIndex + 1);
      setActiveImg(
        imageListRef.current.children[activeIndex + 1].children[0].src
      );
      imageListRef.current.children[activeIndex + 1].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };
  const preBtn = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setActiveImg(
        imageListRef.current.children[activeIndex - 1].children[0].src
      );
      imageListRef.current.children[activeIndex - 1].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };
  return (
    <div className="detailItemContainer">
      <div className="detailImg">
        <img src={activeImg} alt="item" />
        <div className="divChild">
          <button className="btnPre" onClick={() => nextBtn()}>
            &#10095;
          </button>

          <button
            className="btnNext"
            onClick={() => {
              preBtn();
            }}
          >
            &#10094;
          </button>

          <ul className="itemChild" ref={imageListRef}>
            {listImg.length > 0 &&
              listImg.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`img ${
                      activeIndex === index ? "activeImg" : ""
                    }`}
                    onClick={(event) => handleActive(index, event)}
                  >
                    <img src={item.imageLink} alt="item" />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default DetailImg;
