import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
// console.log(product===null?"111":"hhh")
  return (
    <>
    {product ? (
      <div className="card" key={product._id}>
      <div className="card__side card__side--front" style={{backgroundImage:`url(${product.image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center center"}}>
      </div>
      <div className="card__side card__side--back">
          <h2>{product.name}</h2>
          <p className="price text-center">$ {product.price}</p>
        <div className="text-center">
          <Rating rating={product.rating} numReviews={product.numReviews} />
        <Link to={`/product/${product._id}`} className="btn btn--white">
            SHOPPING NOW
        </Link>
        </div>
      </div>
    </div>
    ):(
      <p>Not Found</p>
    )}
    </>
  );
}
