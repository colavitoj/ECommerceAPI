import React, { useState } from 'react';
import './App.css';

function App() {
    const [products, setProducts] = useState([
        { name: 'product1', price: 100.00 },
        { name: 'product2', price: 100.00 },
    ]);

    function addProduct() {
        setProducts(prevState => [...prevState, {name: 'product' + (prevState.length +1), price: 300.00}])
    }

    return (
    <div className="App">
          <h1>ECommerceApp</h1>
          <ul>
              {products.map((item, index) => (
                  <li key={index}>{item.name} - {item.price}</li>
              ))}
            </ul>
            <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
