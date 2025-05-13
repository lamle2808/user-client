// import Address from "./Address";
import { useEffect, useState } from "react";

const FormCheckOut = ({ note, setNote }) => {
  const [user, setUser] = useState();
  // const [note, setNote] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("data");
    setUser(JSON.parse(data));
  }, []);
  if (!user) {
    return <div>Đang tải...</div>;
  }
  return (
    <form className="needs-validation" noValidate>
      <div className="row g-3">
        <div className="col-sm-12">
          <label htmlFor="firstName" className="form-label">
            Người nhận hàng
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder=""
            disabled
            value={`${user.lastName} ${user.firstName}  `}
            required
          />
          <div className="invalid-feedback">Valid first name is required.</div>
        </div>

        <div className="col-12">
          <label htmlFor="phoneNumber" className="form-label">
            Số điện thoại nhận hàng
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            disabled
            value={`${user.phone}  `}
            required
          />
          <div className="invalid-feedback">
            Vui lòng nhập số điện thoại nhận hàng
          </div>
        </div>

        <div className="col-md-12">
          <label htmlFor="address" className="form-label">
            Địa chỉ nhận hàng
          </label>

          <input
            type="text"
            className="form-control"
            id="address"
            disabled
            value={`${user.address}  `}
            placeholder=""
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="note" className="form-label">
            Ghi chú
          </label>

          <input
            type="text"
            className="form-control"
            id="address"
            onChange={(e) => setNote(e.target.value)}
            value={`${note}`}
            placeholder=""
            required
          />
        </div>
      </div>

      <hr className="my-4" />
    </form>
  );
};
export default FormCheckOut;
