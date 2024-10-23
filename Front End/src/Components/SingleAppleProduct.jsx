import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_API;

function SingleAppleProduct() {
  const [product, setProduct] = useState(null); // Initialize as null to handle loading state
  const { product_url } = useParams(); // Extract product_url from URL

  useEffect(() => {
    console.log("Fetching product for URL:", product_url);
    // Fetch the single product based on product_url
    fetch(`${backendUrl}/iphones/${product_url}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data); // Set the fetched product data
      })
      .catch(() => console.log("Error: unable to fetch!!!"));
  }, [product_url]);

  // Handle loading or error state
  if (!product) {
    return <div>Loading...</div>; // Show a loading indicator while the data is being fetched
  }

  // Display the product details
  return (
    <div className="text-center w-100 mt-5">
      <div>
        <div className="product-title">{product.product_name}</div>
        <div className="product-brief">{product.product_brief_description}</div>
      </div>
      <div>
        <div>{`Starting at ${product.starting_price}`}</div>
        <div className="starting-price">{product.price_range}</div>
        <div className="text-wrap px-5">{product.product_description}</div>
      </div>
      <div className="product-image">
        <img src={product.product_img} alt={product.product_name} />
      </div>
    </div>
  );
}

export default SingleAppleProduct;
