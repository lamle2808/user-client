import "../styles/Categories.scss";

const categoriesData = [
  {
    name: "Điện thoại di động",
    image:
      "https://www.zdnet.com/a/img/resize/06119597d8fde27e3074dc3bb4a9ce0f1851280a/2023/04/24/4e586f53-afa2-452d-baf4-cc7c78c2c5fb/samsung-galaxy-a54-5g.jpg?auto=webp&fit=crop&height=900&width=1200",
  },
  {
    name: "Tai nghe",
    image: "https://cdn.mos.cms.futurecdn.net/kbrdKHwjXBwSp9uiY8hejP.jpg",
  },
  {
    name: "Đồng hồ thông minh",
    image: "https://i.imgur.com/Ya0OXCv.png",
  },
  {
    name: "Bàn phím",
    image:
      "https://product.hstatic.net/200000722513/product/ban-phim-co-gaming-dareu-ek87-v2-led-rgb-05_31d3a72e1fc743028a90949c84c38f3d.png",
  },
  {
    name: "Màn hình máy tính",
    image:
      "https://www.globalbrand.com.bd/image/cache/catalog/Monitor/ASUS-ProArt-Display-PA328QV-31.5-inch-Professional-Monitor-1200x630h.jpg",
  },
  {
    name: "Chuột",
    image:
      "https://cdn.tgdd.vn/Products/Images/86/299928/chuot-khong-day-logitech-m171-thumb2-600x600.jpeg",
  },
  {
    name: "Smart TV",
    image:
      "https://bizweb.dktcdn.net/100/441/580/products/artboard-1-100.jpg?v=1636621671780",
  },
  {
    name: "Laptop",
    image: "https://i.imgur.com/6pK5oZl.jpg",
  },

  {
    name: "Tai nghe Bluetooth",
    image:
      "https://chiaki.vn/upload/product/2022/05/tai-nghe-bluetooth-ap-2-khong-day-ban-cao-cap-627a2bf496d5f-10052022161012.jpg",
  },
  {
    name: "Phụ kiện",
    image:
      "https://vcdn-sohoa.vnecdn.net/2019/06/04/41rB4ZxIMBL-A-5807-1559646993.jpg",
  },
  {
    name: "Apple",
    image:
      "https://yt3.googleusercontent.com/WoDkWmAjQ5Dbw-ccjqFku8ThK2UYcqaOqq25PBE9eGb_S-vsqxiKU2kL2kZJVz_BcAMv3WUWsA=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "SamSung",
    image:
      "https://bizweb.dktcdn.net/100/177/937/products/galaxy-z-flip4-highlights-kv-jpeg.jpg?v=1662958737853",
  },
];

const Categories = () => {
  return (
    <div
      className="container-fluid shadow-sm p-3 mb-5 rounded"
      style={{ backgroundColor: "white" }}
    >
      <div className="row mt-2 g-4">
        {categoriesData.map((category, index) => (
          <div className="col-md-2" key={index}>
            <div className="cardcate p-1">
              <div className="d-flex flex-column align-items-center p-2">
                <div
                  className="circle-image"
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "#ccc",
                  }}
                >
                  <img
                    src={category.image}
                    height="150px"
                    width="150px"
                    style={{ objectFit: "cover" }}
                    alt={`Category ${index}`}
                  />
                </div>
                <div className="lh-1 imagename">
                  <span>{category.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
