import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";
import "../styles/ListItem.scss"; // Import CSS

const ListItem = () => {
  const [dataPhone, setDataPhone] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6; // Số sản phẩm hiển thị mỗi trang

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
    setLoading(true);
    axios
      .get("/api/v1/products/getSPNB")
      .then(function (response) {
        setDataPhone(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="recommended-products-section">
      <div className="container-fluid">
        <div className="section-header">
          <h3 className="section-title">Dành cho bạn</h3>
          <p className="section-subtitle">Những sản phẩm phù hợp với phong cách của bạn</p>
        </div>
        
        <div className="list-container">
          {loading ? (
            <div className="loading-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
              <p>Đang tải sản phẩm...</p>
            </div>
          ) : dataPhone && dataPhone.length > 0 ? (
            <>
              <div className="btn-left">
                <button
                  className="btn btn-previous"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  <span>&#10094;</span>
                </button>
              </div>
              
              <div className="btn-right">
                <button
                  className="btn btn-next"
                  onClick={handleNext}
                  disabled={currentIndex >= dataPhone.length - itemsPerPage}
                >
                  <span>&#10095;</span>
                </button>
              </div>
              
              <div className="product-row">
                {dataPhone
                  .slice(currentIndex, currentIndex + itemsPerPage)
                  .map((item, index) => (
                    <div className="product-column" key={index}>
                      <Item children={item} />
                    </div>
                  ))}
                
                {/* Thêm thẻ placeholder để fill kín hàng ngang */}
                {Array.from({ length: Math.max(0, itemsPerPage - dataPhone.slice(currentIndex, currentIndex + itemsPerPage).length) }).map((_, idx) => (
                  <div className="product-column" key={`placeholder-${idx}`}>
                    <div className="item-wrapper placeholder-item">
                      <div className="col hp cardItemH">
                        <div className="card h-100 shadow-sm" style={{
                          background:'#f6f6f6',
                          border:'1.5px dashed #e1bea5',
                          minHeight: '350px',
                          display:'flex',
                          alignItems:'center',
                          justifyContent:'center'
                        }}>
                          <span style={{color:'#c86e52',fontWeight:600,opacity:0.5}}>Đang cập nhật...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-products">
              <p>Không có sản phẩm đề xuất nào</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListItem;