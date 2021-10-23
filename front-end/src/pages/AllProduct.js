import React, { useEffect, useState } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/action/productAction";
export default function AllProduct() {
  const productList = useSelector((state) => state.ProductList);
  const { loading, error, products } = productList;
  const [inputVal, setInputVal] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      <div
        className="heading-banner"
        style={{
          backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 30%)), url("images/1.jpg")`,
        }}
      >
        <h1>SHOP</h1>
      </div>
      <main>
        <div className="row">
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", top: "8px", right: "4px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-search"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#000000"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </span>

            <input
              placeholder="Search"
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
          </div>
        </div>
      </main>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row prosucts-item">
            {products
              .filter((item) => item.name.includes(inputVal))
              .map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
}
