import { Link } from "react-router-dom";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function CartPage() {
  fetch("/api/test-get")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <>
      <div className="container">
        <p>Your cart is empty.</p>
      </div>
      <div className="container">
        <p style={{fontSize: "25px"}}>Overall Total: $0.00</p>
      </div>
    </>
  );
}

export default CartPage;
