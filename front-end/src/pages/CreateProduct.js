import React,{useState,useEffect} from 'react'
import LoadingBox from "../components/LoadingBox";
import axios from 'axios';
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import {createProduct} from '../store/action/productAction'
export default function CreateProduct(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setNumReviews] = useState('');
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
  
    const dispatch = useDispatch();
    const productCreate = useSelector((state) => state.productCreate);
    const {
      loading:loadingCreate,
      error,
      success,
    } = productCreate;
    useEffect(() => {
        if (success) {
          dispatch({ type: "PRODUCT_CREATE_RESET" });
         props.history.push('/productslist');
        }
      }, [dispatch,success,props.history]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProduct({
          name,
          price,
          image,
          category,
          brand,
          rating,
          numReviews,
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
          <h1>Create Product</h1>
        </div>
       
        {loadingCreate ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <div>
          <img className="rounded-circle" src={image} />
          </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                placeholder="Enter price"
                min="0"
                value={price}
                required
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
                 required
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
                required
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
                required
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="number"
                min="0"
                placeholder="Enter countInStock"
                value={countInStock}
                required
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="rating">Rating</label>
              <input
                id="rating"
                type="number"
                min="0"
                max="5"
                placeholder="Enter Rating"
                value={rating}
                required
                onChange={(e) => setRating(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="numReviews">Number Reviews</label>
              <input
                id="numReviews"
                type="number"
                min="0"
                placeholder="Enter number reviews"
                value={numReviews}
                required
                onChange={(e) => setNumReviews(e.target.value)}
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
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Create Product
              </button>
            </div>
          </>
         )}  
      </form>
    </main>
    )
}
