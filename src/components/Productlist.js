import React, { useState, useEffect } from "react";
const Productlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  });

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  return (
    <div className="">
      <h3>Product listing component</h3>
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
      </ul>
    </div>
  );
};

export default Productlist;
