import { Link } from "react-router-dom";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function SellPage() {
  fetch("/api/test-get")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <>
      <div className="container my-3" style={{textDecoration: "underline"}}>
        <h1>Sell Page</h1>
      </div>
      <form>
        <div className="container my-5">
          <div className="mb-4">
            <label htmlFor="formGroupExampleInput" className="form-label" style={{fontWeight: "bold"}}>
              Textbook Title
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="E.g. Calculus by Gilbert Strang"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="formGroupExampleInput2" className="form-label" style={{fontWeight: "bold"}}>
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="E.g. Math"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="formGroupExampleInput" className="form-label" style={{fontWeight: "bold"}}>
              Course Number
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="E.g. MTH 3150"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="formGroupExampleInput2" className="form-label" style={{fontWeight: "bold"}}>
              Condition
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="E.g. Used, new, worn-out"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="formGroupExampleInput" className="form-label" style={{fontWeight: "bold"}}>
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="E.g. $50.00"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label" style={{fontWeight: "bold"}}>
              Seller Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="E.g. Phone number or Email"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Add Textbook
          </button>
        </div>
      </form>
    </>
  );
}

export default SellPage;
