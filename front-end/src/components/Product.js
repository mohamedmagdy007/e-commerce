import React from "react";
import Rating from "./Rating";

export default function Product(props){
    const {product} = props;
    return (
        <div className="card" key={product._id}>
                <div className="card-header">
                    <a href={`/product/${product._id}`}>
                        <span className="price">
                            $ {product.price}
                        </span>
                        <img className="medium" src={product.image} alt="product" />
                    </a>
                </div>
                <div className="card-body">
                <a href={`/product/${product._id}`}>
                        <h2>{product.name}</h2>
                    </a>
                 <Rating rating={product.rating} numReviews={product.numReviews}/>
                </div>
            </div>
    )
}