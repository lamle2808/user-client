const Filter = ({ category, brand, setSelectedCategory, setSelectedBrand, setPriceRange }) => {
  // Import useState
  const { useState } = require("react");
  
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState('');

  // Xử lý input giá
  const handleMinPriceChange = (e) => {
    // Chỉ cho phép nhập số
    const value = e.target.value.replace(/[^\d]/g, '');
    setMinPrice(value);
    setError('');
  };

  const handleMaxPriceChange = (e) => {
    // Chỉ cho phép nhập số
    const value = e.target.value.replace(/[^\d]/g, '');
    setMaxPrice(value);
    setError('');
  };

  // Định dạng số có dấu phẩy ngăn cách hàng nghìn
  const formatCurrency = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Xử lý khi nhấn nút Áp dụng
  const handleApplyPriceFilter = () => {
    if (minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice)) {
      setError('Giá tối thiểu không thể lớn hơn giá tối đa');
      return;
    }
    
    // Gọi hàm lọc giá từ component cha
    setPriceRange({
      min: minPrice ? parseInt(minPrice) : 0,
      max: maxPrice ? parseInt(maxPrice) : Infinity
    });
  };

  // ===========================Xử Lý filter danh mục và thương hiệu ============
  const handleCategoryChange = (event) => {
    const categoryId = event.target.id.split("-")[1];
    setSelectedCategory((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      }
      return [...prevSelected, categoryId];
    });
  };

  const handleBrandChange = (event) => {
    const brandId = event.target.id.split("-")[1];
    setSelectedBrand((prevSelected) => {
      if (prevSelected.includes(brandId)) {
        return prevSelected.filter((id) => id !== brandId);
      }
      return [...prevSelected, brandId];
    });
  };

  return (
    <div
      className="container-xs shadow-none p-3 mb-5 bg-body-tertiary rounded"
      style={{ color: "#333" }}
    >
      <div className="d-flex flex-column bd-highlight mb-3">
        <div className="p-2 bd-highlight shadow p-3 mb-2 bg-body-tertiary rounded">
          <label className="form-label fw-bold mb-3">Thương hiệu</label>
          {brand &&
            brand.length > 0 &&
            brand.map((item) => (
              <div className="form-check" key={item.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleBrandChange}
                  value=""
                  id={`categoryCheckbox-${item.id}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`categoryCheckbox-${item.id}`}
                >
                  {item.name}
                </label>
              </div>
            ))}
        </div>
        {/* ============ */}

        <div className="rangePrice p-2 bd-highlight shadow p-3 mb-2 bg-body-tertiary rounded">
          <label htmlFor="customRange3" className="form-label fw-bold mb-3">
            Loại sản phẩm
          </label>

          {category &&
            category.length > 0 &&
            category.map((item) => (
              <div className="form-check" key={item.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleCategoryChange}
                  value=""
                  id={`categoryCheckbox-${item.id}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`categoryCheckbox-${item.id}`}
                >
                  {item.categoryName}
                </label>
              </div>
            ))}
        </div>
      </div>

      <div className="rangePrice p-2 bd-highlight shadow p-3 mb-2 bg-body-tertiary rounded">
        <label htmlFor="customRange3" className="form-label fw-bold mb-3">
          Khoảng giá
        </label>
        <div className="d-flex flex-column">
          <div className="input-group mb-3">
            <span className="input-group-text fw-bold" style={{ width: '60px', justifyContent: 'center' }}>Từ</span>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập giá tối thiểu"
              aria-label="Minimum amount" 
              value={formatCurrency(minPrice)}
              onChange={handleMinPriceChange}
              style={{ height: '45px', fontSize: '16px' }}
            />
            <span className="input-group-text" style={{ width: '70px', justifyContent: 'center' }}>VND</span>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text fw-bold" style={{ width: '60px', justifyContent: 'center' }}>Đến</span>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập giá tối đa"
              aria-label="Maximum amount"
              value={formatCurrency(maxPrice)}
              onChange={handleMaxPriceChange}
              style={{ height: '45px', fontSize: '16px' }}
            />
            <span className="input-group-text" style={{ width: '70px', justifyContent: 'center' }}>VND</span>
          </div>
          
          {error && <div className="text-danger mb-2">{error}</div>}
          
          <button 
            className="btn btn-primary w-100 mt-2" 
            onClick={handleApplyPriceFilter}
            style={{ 
              height: '45px', 
              backgroundColor: '#0288d1', 
              borderColor: '#0288d1',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};
export default Filter;
