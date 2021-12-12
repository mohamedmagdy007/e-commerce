import React from "react";

export default function Join() {
  return (
    <div
      className="container"
      style={{ marginTop: "100px", marginBottom: "100px" }}
    >
      <div className="vision" style={{ justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: "3rem" }}>
            Join our newsletter and get 20% off
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            sint unde quaerat ratione soluta veniam provident adipisci cumque
            eveniet tempore?
          </p>
        </div>
        <div className="row center" style={{ flexWrap: "nowrap" }}>
          <input placeholder="Enter Email" style={{ width: "250px" }} />
          <button style={{ backgroundColor: "#ab7a5f", color: "white" }}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
