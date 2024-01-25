import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import { Notyf } from 'notyf';
import { useParams } from 'react-router-dom';
import 'notyf/notyf.min.css';

function AddProduct() {
    const api = process.env.REACT_APP_API_URL;
    const [categories, setCategories] = useState([]);
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [image, setImg] = useState('');

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [idCate, setIdcate] = useState(0);
    const { id } = useParams();
    const notyf = new Notyf({
        duration: 1000,
        position: {
            x: 'right',
            y: 'top',
        },
        types: [
            {
                type: 'warning',
                background: 'orange',
                icon: {
                    className: 'material-icons',
                    tagName: 'i',
                    text: 'warning'
                }
            },
            {
                type: 'error',
                background: 'indianred',
                duration: 2000,
                dismissible: true
            },
            {
                type: 'success',
                background: '#7dd3e8',
                duration: 2000,
                dismissible: true
            }
        ]
    });
    const submitProduct = () => {
        if (name == '') {
            notyf.open({
                type: 'error',
                message: 'Product name is required',
            });
        } else if (unit == '') {
            notyf.open({
                type: 'error',
                message: 'Unit is required',
            });
        } else if (price <= 0) {
            notyf.open({
                type: 'error',
                message: 'Price is not positive',
            });
        } else if (quantity <= 0) {
            notyf.open({
                type: 'error',
                message: 'Quantity is not positive',
            });
        } else if (idCate == 0) {
            notyf.open({
                type: 'error',
                message: 'Category is not required',
            });
        } else {
            var formData = new FormData();
            formData.append('name', name);
            formData.append('unit', unit);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('idCate', idCate);
            formData.append('file', file);
            axios.post(api + 'admin/products', formData).then((res) => {
                if (res.data.check == true) {
                    notyf.open({
                        type: 'success',
                        message: 'Product created successfully',
                    })
                    window.location.replace('/products');

                }
            })
        }
    }
    useEffect(() => {
        fetch(api + 'admin/category').then(res => res.json()).then((res) => {
            setCategories(res)
        });
        if (id) {
            fetch(api + 'admin/products/' + id).then(res => res.json()).then((res) => {
                setName(res.name);
                setUnit(res.unit);
                setImg(res.image);
                setQuantity(res.quantity);
                setIdcate(res.idCate);
                setPrice(res.price);
            });
        }
    }, [id]);
    const submitEdit = () => {
        if (name == '') {
            notyf.open({
                type: 'error',
                message: 'Product name is required',
            });
        } else if (unit == '') {
            notyf.open({
                type: 'error',
                message: 'Unit is required',
            });
        } else if (price <= 0) {
            notyf.open({
                type: 'error',
                message: 'Price is not positive',
            });
        } else if (quantity <= 0) {
            notyf.open({
                type: 'error',
                message: 'Quantity is not positive',
            });
        } else if (idCate == 0) {
            notyf.open({
                type: 'error',
                message: 'Category is not required',
            });
        } else {
            var formData = new FormData();
            formData.append('name', name);
            formData.append('id', id);
            formData.append('unit', unit);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('idCate', idCate);
            if (file !== null) {
                formData.append('image', file);
            }
            axios.post(api + 'admin/products/update', formData).then((res) => {
                if (res.data.check == true) {
                    notyf.open({
                        type: 'success',
                        message: 'Product updated successfully',
                    })
                    window.location.replace('/products');
                }
            })
        }
    }

    return (
        <>
            <Navbar />
            <div className='home container-fluid'>
                {!id && (
                    <div className='row mt-4'>
                        <div className='col-md-4 text-start'>
                            <input className='form-control mb-3 mt-3' value={name} onChange={(e) => setName(e.target.value)} placeholder='ProductName' />
                            <input className='form-control mb-3' value={unit} onChange={(e) => setUnit(e.target.value)} placeholder='Unit' />
                            <input className='form-control mb-3' value={quantity} onChange={(e) => setQuantity(e.target.value)} type='number' placeholder='Quantity' />
                            <input className='form-control mb-3' value={price} onChange={(e) => setPrice(e.target.value)} type='number' placeholder='Price' />
                            <select className='form-control mb-3' onChange={(e) => setIdcate(e.target.value)} defaultValue={0}>
                                <option disabled value={0}>Select Category</option>
                                {categories.length > 0 && categories.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                            <button className='btn btn-primary mt-3 w-50 ' onClick={(e) => submitProduct()}>Add</button>
                        </div>
                        <div className='col-md-3'>
                            {file !== null && (
                                <img src={URL.createObjectURL(file)} className='img-fluid' />
                            )}
                        </div>
                    </div>
                )}
                {id && (
                    <div className='row mt-4'>
                        <div className='col-md-4 text-start'>
                            <input className='form-control mb-3 mt-3' value={name} onChange={(e) => setName(e.target.value)} placeholder='ProductName' />
                            <input className='form-control mb-3' value={unit} onChange={(e) => setUnit(e.target.value)} placeholder='Unit' />
                            <input className='form-control mb-3' value={quantity} onChange={(e) => setQuantity(e.target.value)} type='number' placeholder='Quantity' />
                            <input className='form-control mb-3' value={price} onChange={(e) => setPrice(e.target.value)} type='number' placeholder='Price' />
                            <select className='form-control mb-3' onChange={(e) => setIdcate(e.target.value)} defaultValue={idCate}>
                                <option disabled value={0}>Select Category</option>
                                {categories.length > 0 && categories.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                            <button className='btn btn-primary mt-3 w-50 ' onClick={(e) => submitEdit()}>Edit</button>
                        </div>
                        <div className='col-md-3'>
                            {image != '' && (
                                <>
                                    <img src={process.env.REACT_APP_IMG_URL + image} className='img-fluid' />
                                    <span>Old Image</span>
                                </>

                            )}
                            {file !== null && (
                                <img src={URL.createObjectURL(file)} className='img-fluid' />
                            )}
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}

export default AddProduct