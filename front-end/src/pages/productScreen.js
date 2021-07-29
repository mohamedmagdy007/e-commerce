import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProducts } from "../store/action/productAction";

export default function ProductScreen(props) {
  const id = props.match.params.id;
  const ProductDetails = useSelector((state) => state.productDetails);
  const [qty, setQty] = useState(1);
  const { loading, error, product } = ProductDetails;
  const dispatch = useDispatch();
  function addToCartHandler() {
    props.history.push(`/cart/${id}?qty=${qty}`);
  }
  useEffect(() => {
    dispatch(detailsProducts(id));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row top">
          <div className="col-2">
            <img className="large" src={product.image} alt={product.name} />
          </div>
          <div className="col-1">
            <ul>
              <li>{product.name}</li>
              <li>{product.brand}</li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>
              <li>Price : $ {product.price}</li>
              <li>
                <p>Description : {product.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div
              className="card-body"
              style={{
                border: "0.1rem #c0c0c0 solid",
                borderRadius: ".5rem",
                padding: "15px 15px 25px",
              }}
            >
              <ul>
                <li>
                  <div className="row">
                    <div>Price</div>
                    <div>{product.price}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="success">In Stock</span>
                      ) : (
                        <span className="error">Unavailable</span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                    <li>
                      <div className="row">
                        <div>Qty</div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={addToCartHandler}
                        className="primary block"
                      >
                        Add to Cart{" "}
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
