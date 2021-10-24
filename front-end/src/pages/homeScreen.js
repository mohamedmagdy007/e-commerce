import React, { useEffect } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/action/productAction";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  const productList = useSelector((state) => state.ProductList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <section style={{ backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 30%)), url(${"/images/hero-1.jpg"})`}}>
        <div className="row top" style={{justifyContent:"center"}}>
          <div className="text-center">
            <h1 className="heading">Creative Design <br/> Modern &amp; Exclusive Furniture</h1>
              <button className="link-red">SHOPING NOW</button>
          </div>
        </div>
      </section>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <div className="row center" style={{margin:"20px 0"}}>
          {products.slice(0,4).map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        <div className="row center" style={{padding:"10px 0"}}>
            <Link className="link-red" to="/productsAll">Show More</Link>
        </div>
        </>
      )}
    </>
  );
}
