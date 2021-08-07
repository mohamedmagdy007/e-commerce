import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props){
    const {product} = props;
    return (
        <div className="card" key={product._id}>
                <div className="card-header">
                    <Link to={`/product/${product._id}`}>
                        <span className="price">
                            $ {product.price}
                        </span>
                        <img className="medium" src={product.image} alt="product" />
                    </Link>
                </div>
                <div className="card-body">
                <Link to={`/product/${product._id}`}>
                        <h2>{product.name}</h2>
                    </Link>
                    <div className="text-center">
                    <Rating rating={product.rating} numReviews={product.numReviews}/>
                    </div>
                </div>
            </div>
    )
}