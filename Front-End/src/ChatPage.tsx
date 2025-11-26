import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Profile from "../images/profile.png";

function ChatPage() {
  return (
    <>
      <div className="Container my-5">
        <div className="row">
          <div className="col-5">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={Profile}
                    className="img-fluid rounded-start"
                    alt="Generic profile picture"
                    width={"50px"}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="ps-auto">
              <img
                src={Profile}
                className="img-fluid"
                alt="Generic profile pircture"
                width={"50px"}
              />{" "}
              User01
            </div>
            <div className="card">
              <div className="card-body">
                This is some text within a card body.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
