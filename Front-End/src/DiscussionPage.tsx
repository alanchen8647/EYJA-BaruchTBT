import { Link } from "react-router-dom";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function DiscussionPage() {
  fetch("/api/test-get")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <>
      <div className="container my-5">
        <div className="card" style={{ width: "18rem;", border: "3px solid black" }}>
          <div className="card-body">
            <h5 className="card-title">Best textbook for studying art history?</h5>
            <p className="card-text">
              Hey guys, I'm currently taking an art history class where we go over art from 
              the Paleolithic era to the age of the Roman Empire. I already have a textbook, but I'm
              very interested in this topic and would like to study more about it on my personal time. 
              Does anyone know any textbooks sold on this website that's good for studying art history?
            </p>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="card" style={{ width: "18rem;", border: "3px solid black"}}>
          <div className="card-body">
            <h5 className="card-title">Anyone willing to trade an "Advanced Calculus Fundamentals of Mathematics by Carlos Polanco" 
              textbook for a "calculus by Gilbert Strang" textbook?
            </h5>
            <p className="card-text">
              So, I made a stupid mistake and bought "calculus by Gilbert Strang" for my advanced calculus class, 
              when I should have bought "Advanced Calculus Fundamentals of Mathematics by Carlos Polanco". I'm 
              not gonna lie, I really don't want to spend more money and wait for a new textbook. I know that this 
              sort of defeats the purpose of this website, but is anyone willing to trade their textbook for mine? 
              My textbook is still is mint condition and I'm available for a few days, so anyone who wants my textbook 
              can get it as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <button className="btn btn-primary">Make a Post</button>
      </div>
      
    </>
  );
}

export default DiscussionPage;
