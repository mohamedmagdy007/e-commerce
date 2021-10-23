import React, { useEffect } from 'react';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/action/productAction";
import {deleteProduct} from '../store/action/productAction'
import { Link } from 'react-router-dom';

export default function ProductListScreen(props) {
    const productList = useSelector((state)=>state.ProductList)
    const { loading, error, products } = productList;
    const productDelete = useSelector((state) => state.productDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = productDelete;
    const dispatch = useDispatch();
    useEffect(()=>{
      if(successDelete){
        dispatch({ type: "PRODUCT_DELETE_RESET"});
      }
      dispatch(listProducts())
    },[dispatch , successDelete]);
  const deleteHandler = (product) => {
    if(window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };

    return (
        <main>
     <div className="row">
        <h1>Products</h1>
        <Link className="link-button-primary" to="/products/create">
          Create Product
        </Link>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      { loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small btn-primary"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small btn-danger"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
    )
}
