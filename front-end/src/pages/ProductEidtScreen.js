import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProducts } from '../store/action/productAction';
import {updateProduct} from "../store/action/productAction";
import LoadingBox from '../components/LoadingBox';
import axios from 'axios';
import MessageBox from '../components/MessageBox';
export default function ProductEidteScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate,success: successUpdate,} = productUpdate;

    const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
      if (successUpdate) {
       props.history.push('/productslist');
      }
      if (!product || product._id !== productId||successUpdate) {
        dispatch({ type: "PRODUCT_UPDATE_RESET" });
        dispatch(detailsProducts(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setBrand(product.brand);
        setDescription(product.description);
      }
    }, [product, dispatch, productId,successUpdate,props.history]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
          _id: productId,
          name,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
        }));
      };
      
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
      const  onImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${userInfo.token}`,
        },
      });
      setImage(data);
     
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
}
    return (
        <main>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <div>
          <img className="rounded-circle" src={image} alt={"image"} />
          </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                 onChange={onImageChange}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </main>
    )
}
