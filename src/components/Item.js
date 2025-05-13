import "../styles/Item.scss";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { handleTop } from "../assets/action/Action";

function Item(props) {
  const [data, setData] = useState(props);
  const [img, setImg] = useState();
  const history = useHistory();
  const [das, setDas] = useState("");
  const [hasPrice, setHasPrice] = useState(true);
  // =============

  useEffect(() => {
    // Xử lý hình ảnh
    props && props.children.imageProducts && props.children.imageProducts.length > 0
      ? setImg(props.children.imageProducts[0].imageLink)
      : setImg(
          "https://media.istockphoto.com/id/936182806/vi/vec-to/kh%C3%B4ng-c%C3%B3-d%E1%BA%A5u-hi%E1%BB%87u-h%C3%ACnh-%E1%BA%A3nh-kh%E1%BA%A3-d%E1%BB%A5ng.jpg?s=612x612&w=0&k=20&c=AqTYDe8XDlTT4HlkKmWrI57391QNOV0zZeC7u8TKYiE="
        );
    setData(props);

    // Xử lý giá
    if (!props.children || !props.children.price || props.children.price === 0) {
      setHasPrice(false);
      setDas(0);
    } else {
      setHasPrice(true);
    if (props.children.sale !== null) {
      setDas(
        props.children.price -
          props.children.price * (props.children.sale.discount / 100)
      );
    } else {
      setDas(props.children.price);
      }
    }
  }, [props]);

  const handleView = () => {
    const currentPath = window.location.pathname;
    const newPath = `/Shopping/${data.children.id}`;
    handleTop();
    if (currentPath.match(/\/Shopping\/SP\d{4}/)) {
      const updatedPath = currentPath.replace(/\/Shopping\/SP\d{4}/, newPath);
      window.location.href = `${window.location.origin}${updatedPath}`;
    } else {
      history.push(newPath);
    }
  };

  // Định dạng số tiền
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="item-wrapper">
      <div className="col hp cardItemH">
        <div className="card h-100 shadow-sm">
          <div className="img-container" onClick={() => handleView()}>
            <img
              src={img}
              className="card-img-top"
              alt={data.children ? data.children.productName : "Product Title"}
            />
          </div>

          {props.children && props.children.sale !== null ? (
            <div className="label-top shadow-sm">
              <div className="text-white">
                {props.children.sale.discount || ""} %
              </div>
            </div>
          ) : null}

          <div className="card-body">
            <h5 className="card-title">
              <div onClick={() => handleView()}>
                {props.children ? (props.children.productName || "Sản phẩm mới") : "Sản phẩm mới"}
              </div>
            </h5>

            <div className="clearfix mb-3">
              {hasPrice ? (
                <>
                  <span className="price-tag">
                    {formatPrice(das)} <span>₫</span>
                  </span>
                  {props.children && props.children.sale !== null && (
                    <span className="original-price">
                      {formatPrice(props.children.price)} ₫
              </span>
                  )}
                </>
              ) : (
                <span className="price-coming-soon">Đang cập nhật</span>
              )}
            </div>

            <div className="clearfix mb-1 card-actions">
              <span className="float-start">
                <div>
                  <i className="fas fa-star rating-star"></i>
                  <span className="rating-text">4.5</span>
                </div>
              </span>

              <span className="float-end">
                <button className="btn-quick-view" onClick={() => handleView()}>
                  <i className="fas fa-eye"></i>
                </button>
                <button className="btn-add-wishlist">
                  <i className="far fa-heart"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
