// import React from "react";
// import Rating from "../components/Rating";
// import data from "../data";

// export default function ProductScreen(props){
//     const product = data.products.find((x)=>x._id=== props.match.params.id)
//     if(!product){
//         return <div>Product Not Found</div>
//     }
//     return(
//     <div className="row top">
//         <div className="col-2">
//         <img className="large" src={product.image} alt={product.name}/>
//         </div>
//         <div className="col-1">
//             <ul>
//                 <li>{product.name}</li>
//                 <li>{product.brand}</li>
//                 <li>
//                     <Rating rating={product.rating} numReviews={product.numReviews}/>
//                 </li>
//                 <li>Price : $ {product.price}</li>
//                 <li><p>Description : {product.description}</p></li>
//             </ul>
//         </div>
//         <div className="col-1">
//             <div className='card-body' style={{ border: "0.1rem #c0c0c0 solid",borderRadius:".5rem", padding: "15px 15px 25px"}}>
//                 <ul>
//                 <li>
//                     <div className="row">
//                         <div>Price</div>
//                             <div>
//                                 {product.price}
//                             </div>
//                         </div>
//                     </li>
//                     <li>
//                         <div className="row">
//                             <div>Status</div>
//                             <div>
//                                 {product.countInStock > 0 ? (
//                                 <span className="success">In Stock</span>
//                                 ):(
//                                 <span className='error'>Unavailable</span>)}
//                             </div>
//                         </div>
//                     </li>
//                     <li>
//                         <button className="primary block" >Add to Cart </button>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     </div>
//     ) 
// }