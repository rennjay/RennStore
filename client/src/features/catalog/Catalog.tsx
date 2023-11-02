import Product from "../../app/models/Product";

interface Props{
    products: Product[];
    addProduct: () => void;
}

export default function Catalog({products, addProduct}:Props){
    return(
    <>
    <ul>
        {
          products.map((product, index) => <li key={index}>{product.name} - {product.price}</li>)
        }
      </ul>
      <button onClick={addProduct}>Add product</button>
    </>);
}
