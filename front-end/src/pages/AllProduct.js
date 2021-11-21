import React, { useEffect, useState } from "react";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/action/productAction";
import Filter from "../components/filter";
export default function AllProduct() {
  const productList = useSelector((state) => state.ProductList);
  const { loading, error, products } = productList;
  const [inputVal, setInputVal] = useState("");
  const [filter, setFilter] = useState({
    sort: "",
    category: "",
    inputVal:"",
    products: products,
  });
  const sortProducts = (event) => {
    const sort = event.target.value;
    setFilter((state) => ({
      sort: sort,
      products: products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  const filterProducts = (event) => {
    if (event.target.value === "") {
      setFilter({ category: event.target.value, products: products });
    } else {
      setFilter({
        category: event.target.value,
        products: products.filter((product) =>
          product.category.includes(event.target.value)
        ),
      });
    }
  };
 const searchProducts = (e)=>{
  
  if (e.target.value === "") {
    setFilter({ search: e.target.value, products: products });
  } else {
    setFilter({
      search: e.target.value,
      products: products.filter((product) =>
        product.name.includes(e.target.value)
      ),
    });
  }
 }
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
        <div className="row filter-item">
        <div style={{ position: "relative", marginTop: "10px" }}>
            <span style={{ position: "absolute", top: "8px", left: "4px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-search"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </span>

            <input
              placeholder="Search By Name"
              type="text"
              value={inputVal}
              onChange={(e)=>{setInputVal(e.target.value)}}
            />
          </div>
          <Filter
            category={filter.category}
            sort={filter.sort}
            inputVal={filter.search}
            filterProducts={filterProducts}
            sortProducts={sortProducts}
            searchProducts={searchProducts}
          ></Filter>
        </div>
      </main>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row center">
            {(filter.products.length === 0 ? products : filter?.products)
              .filter((item) => item.name.includes(inputVal))
              .map((product) => (
                <Product  key={product._id} product={product} />
              ))
              }
          </div>
        </>
      )}
    </>
  );
}
