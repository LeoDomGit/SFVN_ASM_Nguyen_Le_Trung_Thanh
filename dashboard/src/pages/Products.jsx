import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import { Link } from 'react-router-dom';
function Products() {
    const api = process.env.REACT_APP_API_URL;
    const image = process.env.REACT_APP_IMG_URL
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(api + 'admin/category').then(res => res.json()).then((res) => {
            setCategories(res)
        });
        fetch(api + 'admin/products').then(res => res.json()).then((res) => {
            setProducts(res);
        });
    }, []);
    return (
        <>
            <Navbar />
            <div className='home container-fluid'>
                <div className='row w-100 mt-2'>
                    <div className='col-md-2 sidebar pointer'>
                        <ul class="list-group">
                            {categories.length > 0 && categories.map((item, index) => (
                                <li class="list-group-item" key={index}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='col-md-8'>
                        <div className='row w-100'>
                            {products.length > 0 && products.map((product, index) => (
                                <div key={index} className='col-md-3  mb-3'>
                                    <div className="card" style={{ width: "100%" }}>
                                        <img style={{ maxHeight: '190px', width: 'auto', margin: '0px auto' }} src={image + product.image} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">
                                                Price:   {Intl.NumberFormat("en-US").format(
                                                    product.price
                                                )}
                                            </p>
                                            <Link to={"/edit/" + product.id} className="btn btn-primary">
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='col-md text-end'>
                        <Link to={'/add-product'} className='btn btn-outline-primary'>Add Product</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products