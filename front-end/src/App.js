import React from "react";
import data from './data';
function App() {
  return (
    <div className="grid-container">
    <header className="row">
        <div>
            <a className="brand" href="index.html">E-SHOP</a>
        </div>
        <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign in</a>
        </div>
    </header>
    <main>
        <div className="row center">
          {
            data.products.map((product)=>(
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
                    <div className="rating">
                        <span><i className="fa fa-star"></i> </span>
                        <span><i className="fa fa-star"></i> </span>
                        <span><i className="fa fa-star"></i> </span>
                        <span><i className="fa fa-star"></i> </span>
                        <span><i className="fa fa-star"></i> </span>
                    </div>
                </div>
            </div>
            ))
          }
            
        </div>
    </main>
    <footer className="row center">Alt right reserved</footer>
</div>
  );
}

export default App;
