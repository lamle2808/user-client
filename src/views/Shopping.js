import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../components/Item";
import "../styles/Shopping.scss";
import Filter from "../components/Filter";
import { useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";

const Shopping = () => {
  // state cua search
  const location = useLocation();
  const { searchValue } = location.state || { searchValue: "" };

  // ===
  const [dataPhone, setDataPhone] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============xử lý filter
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  let filteredProducts;

  const style = [
    { top: "-6em" },
    {
      bottom: "270px",
    },
  ];

  useEffect(() => {
    setLoading(true);
    
    if (searchValue === "") {
      // Fetch data when searchValue is empty
      async function fetchData() {
        try {
          let res = await axios.get("api/v1/products/getAll");
          let data = res && res.data ? res.data : [];
          setDataPhone(data.filter(item => item.loHang !== null));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }

      fetchData();
    } else {
      // Fetch data based on searchValue
      async function fetchData() {
        try {
          let res = await axios.get(`api/v1/products/getByName/${searchValue}`);
          let data = res && res.data ? res.data : [];
          setDataPhone(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setDataPhone([]);
          setLoading(false);
        }
      }

      fetchData();
    }
  }, [searchValue]);

  useEffect(() => {
    async function fetchCategoryAndBrand() {
      try {
        const resCate = await axios.get("api/v1/category/getAll");
        const dataCate = resCate.data || [];
        setCategory(dataCate);

        const resBrand = await axios.get("api/v1/brands/getAllBrand");
        const dataBrand = resBrand.data || [];
        setBrand(dataBrand);
      } catch (error) {
        console.error("Error fetching category and brand data:", error);
      }
    }

    fetchCategoryAndBrand(); // Fetch category and brand data
  }, []);

  if (selectedCategory.length === 0 && selectedBrand.length === 0) {
    //nếu filter rỗng thì LẤY dataPhone
    filteredProducts = dataPhone.filter(item => {
      // Lọc theo khoảng giá
      return item.price >= priceRange.min && item.price <= priceRange.max;
    });
  } else {
    // không rỗng thì lọc
    filteredProducts = dataPhone.filter((item) => {
      return (
        (selectedCategory.includes(String(item.category.id)) ||
        selectedBrand.includes(String(item.brand.id))) &&
        // Thêm điều kiện lọc theo khoảng giá
        item.price >= priceRange.min && item.price <= priceRange.max
      );
    });
  }

  // Hiển thị không có sản phẩm
  const renderNoProducts = () => {
    return (
      <div className="no-products">
        <div className="icon">
          <SearchIcon style={{ fontSize: 50 }} />
        </div>
        <h4>Không tìm thấy sản phẩm nào</h4>
        <p>
          {searchValue
            ? `Không tìm thấy sản phẩm nào cho từ khóa "${searchValue}"`
            : "Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn"}
        </p>
      </div>
    );
  };

  return (
    <div className="shopping">
      <div className="container-fluid shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row">
          <div className="col-md-3">
            {/* Phần Filter */}
            <Filter
              category={category} // Truyền danh sách danh mục từ API vào Filter
              brand={brand} // Truyền danh sách thương hiệu từ API vào Filter
              setSelectedCategory={setSelectedCategory}
              setSelectedBrand={setSelectedBrand}
              setPriceRange={setPriceRange}
            />
          </div>
          <div className="col-md-9">
            {/* Tiêu đề và thông tin tìm kiếm */}
            <div className="shopping-header">
              <h2>
                <CategoryIcon style={{ marginRight: 10 }} />
                {searchValue ? `Kết quả tìm kiếm: "${searchValue}"` : "Tất cả sản phẩm"}
              </h2>
              <p>{filteredProducts.length} sản phẩm được tìm thấy</p>
            </div>
            
            {/* Danh sách sản phẩm */}
            {loading ? (
              <div className="loading-products">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Đang tải...</span>
                </div>
                <p>Đang tải sản phẩm...</p>
              </div>
            ) : (
              <div className="row">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                      <Item children={item} style={style} />
                    </div>
                  ))
                ) : (
                  renderNoProducts()
                )}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
