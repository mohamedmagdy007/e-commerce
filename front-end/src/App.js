import React from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import HomeScreen from './pages/homeScreen'
import ProductScreen from "./pages/productScreen";
function App() {
  return (
      <BrowserRouter>
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
        <Route path='/product/:id' component={ProductScreen} exact></Route>
        <Route path='/' component={HomeScreen} exact></Route>
    </main>
    <footer className="row center">Alt right reserved</footer>
</div>
</BrowserRouter>
  );
}

export default App;
