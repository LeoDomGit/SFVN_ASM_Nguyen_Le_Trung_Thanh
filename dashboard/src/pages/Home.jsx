import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
function Home() {
    const Swal = require('sweetalert2')
    const api = process.env.REACT_APP_API_URL;
    const [cateshow, setCateshow] = useState(false);
    const [categories, setCateArr] = useState([]);
    const [category, setCate] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(0);
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
            }
        ]
    });
    const submitCate = () => {
        if (category === '') {
            notyf.open({
                type: 'error',
                message: 'Category is required',
            });
        } else {
            axios.post(api + 'admin/category', {
                name: category
            }).then((res) => {
                if (res.data.check == true) {
                    setCateArr(res.data.cates);
                    notyf.open({
                        type: 'success',
                        message: 'Created successfully',
                    });
                    setCate('');
                    setCateshow(false);
                } else if (res.data.check == false) {
                    if (res.data.msg.name) {
                        notyf.open({
                            type: 'error',
                            message: res.data.msg.name,
                        });
                    }
                }
            })
        }
    }
    const submitEdit = () => {
        if (category === '') {
            notyf.open({
                type: 'error',
                message: 'Category is required',
            });
        } else if (id === 0) {
            notyf.open({
                type: 'error',
                message: 'ID is required',
            });
        }
        else {
            axios.post(api + 'admin/category/edit', {
                id: id,
                name: category
            }).then((res) => {
                if (res.data.check == true) {
                    setCateArr(res.data.cates);
                    notyf.open({
                        type: 'success',
                        message: 'Updated successfully',
                    });
                    setCate('');
                    setCateshow(false);
                } else if (res.data.check == false) {
                    if (res.data.msg.name) {
                        notyf.open({
                            type: 'error',
                            message: res.data.msg.name,
                        });
                    }
                }
            })
        }
    }
    const customizeCate = (id, old) => {
        Swal.fire({
            text: "Do you want change or remove?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Change",
            denyButtonText: `Remove`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setCate(old);
                setCateshow(true);
                setEdit(true);
                setId(id);
            } else if (result.isDenied) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "It can't be undone",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post(api + 'admin/category/delete', {
                            id: id
                        }).then((res) => {
                            if (res.data.check == true) {
                                notyf.open({
                                    type: 'success',
                                    message: 'Deleted successfully',
                                });
                                setCateArr(res.data.cates);
                            } else if (res.data.check == false) {
                                if (res.data.msg) {
                                    notyf.open({
                                        type: 'error',
                                        message: res.data.msg,
                                    });
                                }
                            }
                        })
                    }
                });
            }
        });
    }
    useEffect(() => {
        fetch(api + 'admin/category').then(res => res.json()).then((res) => {
            setCateArr(res)
        })
    }, [])
    return (
        <>
            <Navbar />
            <div className='home container-fluid'>
                <Modal show={cateshow} onHide={() => setCateshow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Categories</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type='text' value={category} onChange={(e) => setCate(e.target.value)} className='form-control' />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setCateshow(false)}>
                            Close
                        </Button>
                        {!edit && (
                            <Button variant="primary" onClick={() => submitCate()}>
                                Save
                            </Button>
                        )}
                        {edit && (
                            <Button variant="primary" onClick={() => submitEdit()}>
                                Edit
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
                {/* ============================ */}

                <div style={{ margin: '0px auto' }} className='row container mt-3'>
                    <table className="mx-auto text-center table table-primary">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                                <th scope="col"><button onClick={() => setCateshow(true)} className='w-100 btn btn-outline-primary'>Create Category</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 && categories.map((item, index) => (
                                <tr>
                                    <th scope="row">{++index}</th>
                                    <td >{item.name}</td>
                                    <td >{item.status == 0 ? 'Đang khoá' : 'Đang mở'}</td>
                                    <td colSpan={2}>
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            id={'button-addon' + index}
                                            onClick={() => customizeCate(item.id, item.name)}
                                        >
                                            Options
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div >
        </>
    )
}

export default Home