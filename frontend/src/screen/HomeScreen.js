import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Spinner from './Spinner/Spinner'

function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return loading ? <Spinner /> : error ? (
    <h4 className="center">Something went wrong</h4>
  ) : (
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <Link to={"/product/" + product._id}>
                <img className="product-img" src={product.image} alt="product" />
              </Link>
              <div className="title">
                <p className="product-name">
                  <Link to={"/product/" + product._id}>{product.name}</Link>
                </p>
                <p className="product-brand">{product.brand}</p>
                <p className="product-price">{product.price}</p>
                <p className="product-rating">
                  {product.rating} star ({product.numReview} review)
             </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
}
export default HomeScreen;
