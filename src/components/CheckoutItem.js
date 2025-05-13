import "../styles/CheckoutItem.scss";
const CheckoutItem = (props) => {
  return (
    <tr key={props.index}>
      {console.log(props)}
      <th scope="row">{props.index}</th>
      <td>
        <b>{props.data.product.productName}</b>
        <p>{props.data.product.price} VND</p>
      </td>
      <td>
        {
          <img
            alt=""
            style={{ height: "100%" }}
            src={
              props.data.product.imageProducts.length > 0
                ? props.data.product.imageProducts[0].imageLink
                : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png"
            }
          ></img>
        }
      </td>
      <td>{props.data.quantity}</td>
      <td>{props.data.quantity * props.data.product.price}</td>
    </tr>
  );
};
export default CheckoutItem;
