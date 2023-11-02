import { useEffect, useState } from "react"
import Product from "../models/Product";

function App() {
const [products, setProducts] = useState<Product[]>([]);

useEffect(() =>{
  fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => setProducts(data));
},[]);

  return (
    <div>
      <h1>Renn Store</h1>
      <ul>
        {
          products.map((product, index) => <li key={index}>{product.name} - {product.price}</li>)
        }
      </ul>
    </div>
  )
}

export default App
