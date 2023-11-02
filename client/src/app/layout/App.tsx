import { useEffect, useState } from "react"
import Product from "../models/Product";
import Catalog from "../../features/catalog/Catalog";

function App() {
const [products, setProducts] = useState<Product[]>([]);

useEffect(() =>{
  fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => setProducts(data));
},[]);

function addProduct() {
  setProducts(prevState => ([...products,{
    id: prevState.length + 101,
    name: "Product " + (prevState.length + 1),
    price: (100 *  prevState.length) + 100,
    description: "description test",
    brand: "some brand",
    pictureUrl: ""
  }]));
}

  return (
    <div>
      <h1>Renn Store</h1>
      <Catalog products={products} addProduct={addProduct}/>
    </div>
  )
}

export default App