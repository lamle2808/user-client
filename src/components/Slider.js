import React, { useState, useEffect } from "react";
import "../styles/Slider.scss";
import thum1 from "../assets/images/thumbai_1.png";
import thum2 from "../assets/images/thumbai_2.png";
import thum3 from "../assets/images/thumbai_3.png";

const slides = [
  {
    image: thum1,
    title: "Săn sale cực sốc",
    text: "Ưu đại đến 50%.",
  },
  {
    image: thum2,
    title: "Thời trang từ bình dân đến cao cấp",
    text: "Các mẫu đến từ các nhãn hàng cao cấp",
  },
  {
    image: thum3,
    title: "Đổi điểm lấy quà",
    text: "Thi bao nhiêu điểm giảm liền bấy nhiêu.",
  },
];

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const changeSlide = () => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const slideInterval = setInterval(changeSlide, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="main-slider">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
        >
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item ${
                  index === activeSlide ? "active" : ""
                }`}
              >
                <img
                  src={slide.image}
                  className="d-block w-100 slide-image"
                  alt={`Slide ${index + 1}`}
                />
                <div className="slide-caption">
                  <h5>{slide.title}</h5>
                  <p>{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-indicators-container">
            <div className="carousel-indicators">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={index}
                  className={index === activeSlide ? "active" : ""}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="thumbnail-container">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            className="thumbnail-image"
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
