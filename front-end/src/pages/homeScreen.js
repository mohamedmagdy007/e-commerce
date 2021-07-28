import React, { useEffect } from "react";

import Product from '../components/Product';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/action/productAction";


export default function HomeScreen(){
  const productList = useSelector((state)=>state.ProductList)
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(listProducts())
  },[dispatch]);
    return (
      <>
      {loading ? (
        <LoadingBox></LoadingBox>)
      : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
        ):(
        <div className="row center">
        {products.map((product)=>(
          <Product key={product._id} product={product}/>
          ))
        }  
      </div>
      )}
      </>
        )
}