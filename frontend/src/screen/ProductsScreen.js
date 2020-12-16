import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import classnames from "classnames";

import {
  saveProduct,
  listProducts,
  deleteProduct,
} from '../actions/productActions';
import Spinner from './Spinner/Spinner'

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    errors
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    errors: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  return <>
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible &&
        <div className="form">
          <form onSubmit={submitHandler}>
            <div className="form-container">
              <h2>Create Product</h2>
              {loadingSave && <Spinner />}

              <div className="input-field col s12">
                <input
                  type="text"
                  id="name"
                  value={name}
                  error={errors && errors.name}
                  className={classnames("", {
                    invalid: errors && errors.name
                  })}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors && errors.name}</span>
              </div>

              <div className="input-field col s12">
                <input
                  type="text"
                  id="price"
                  value={price}
                  error={errors && errors.price}
                  className={classnames("", {
                    invalid: errors && errors.price
                  })}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="price">Price</label>
                <span className="red-text">{errors && errors.price}</span>
              </div>

              <div className="input-field col s12">
                <input
                  type="text"
                  id="image"
                  value={image}
                  error={errors && errors.image}
                  // className={classnames("", {
                  //   invalid: errors && errors.image
                  // })}
                  onChange={(e) => setImage(e.target.value)}
                />
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
                <label htmlFor="image">Image</label>
                <span className="red-text">{errors && errors.image}</span>
              </div>




              <div className="input-field col s12">
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  error={errors && errors.brand}
                  // className={classnames("", {
                  //   invalid: errors && errors.brand
                  // })}
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
                <label htmlFor="brand">Brand</label>
                <span className="red-text">{errors && errors.brand}</span>
              </div>

              <div className="input-field col s12">
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  error={errors && errors.countInStock}
                  // className={classnames("", {
                  //   invalid: errors && errors.countInStock
                  // })}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
                <label htmlFor="countInStock">CountInStock</label>
                <span className="red-text">{errors && errors.countInStock}</span>

              </div>

              <div className="input-field col s12">
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  error={errors && errors.category}
                  // className={classnames("", {
                  //   invalid: errors && errors.category
                  // })}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
                <label htmlFor="name">Category</label>
                <span className="red-text">{errors && errors.category}</span>
              </div>

              <div className="input-field col s12">
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  error={errors && errors.description}
                  // className={classnames("", {
                  //   invalid: errors && errors.description
                  // })}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label htmlFor="description">Description</label>
                <span className="red-text">{errors && errors.description}</span>
              </div>

              <div className="col s12 center" >
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable green accent-3"
                >{id ? 'Update' : 'Create'}
                </button>

                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable red accent-3"
                  onClick={() => setModalVisible(false)}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      }

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
}
export default ProductsScreen;