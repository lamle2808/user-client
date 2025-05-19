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
      <div className="product-image-container">
        <div className="main-image">
          <button className="nav-btn nav-btn-left" onClick={preBtn}>
            &#10094;
          </button>
          <img src={activeImg} alt="product" />
          <button className="nav-btn nav-btn-right" onClick={nextBtn}>
            &#10095;
          </button>
        </div>
        
        <div className="thumbnails-container">
          <ul className="thumbnails-list" ref={imageListRef}>
            {listImg.length > 0 &&
              listImg.map((item, index) => (
                <li
                  key={index}
                  className={`thumb-item ${activeIndex === index ? "active-thumb" : ""}`}
                  onClick={(event) => handleActive(index, event)}
                >
                  <img src={item.imageLink} alt={`thumbnail-${index}`} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailImg;
