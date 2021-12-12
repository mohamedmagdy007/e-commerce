import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <>
      <div className="card" key={product._id}>
        <div className="card-hover">
          <img
            src={`${product.image}`}
            className="img-prodcut"
            alt={`${product.image}`}
          />
          <Link to={`/product/${product._id}`} className="details">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-search"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </Link>
        </div>
        <div className="row">
          <h2>{product.name}</h2>
          <p className="price text-center">$ {product.price}</p>
        </div>
      </div>
    </>
  );
}
