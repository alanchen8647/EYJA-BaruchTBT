import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

interface CartPageProps {
  cartItems: { title: string; price: string }[];
  total: number;
  clearCart: () => void;   // ✅ add this
}

function CartPage({ cartItems, total, clearCart }: CartPageProps) {  // ✅ accept it here
  fetch("/api/test-get")
    .then((response) => response.json())
    .then((data) => console.log(data));

  const hasItems = cartItems.length > 0;

  return (
    <>
      <div className="container my-4">
        {hasItems ? (
          <>
            <h2>Your Cart</h2>
            <ul className="list-group mb-3">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{item.title}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="container mb-4">
        <p style={{ fontSize: "25px" }}>
          Overall Total: ${total.toFixed(2)}
        </p>

        <button
          className="btn btn-success"
          disabled={!hasItems}
          onClick={clearCart}
        >
          Checkout
        </button>
      </div>
    </>
  );
}

export default CartPage;
