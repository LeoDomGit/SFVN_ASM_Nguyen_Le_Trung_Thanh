import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, selectCart, updateQuantity, selectTotal, clearCart } from '../features/cartSlice';
import Swal from 'sweetalert2'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
function Cart() {
    const cart = useSelector(selectCart);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();
    const img = process.env.REACT_APP_IMG_URL;
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
            }, {
                type: 'success',
                background: '#39cced',
                duration: 2000,
                dismissible: true,
                icon: '<i class="bi bi-bag-check-fill"></i>',
            }
        ]
    });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const checkMail = (email) => {
        if (email.match(/(.+)@(gmail+)\.(com)/i)) {
            setEmail(email);
        }
    };
    const validPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    const checkPhone = (phone) => {
        if (phone.match(validPhone)) {
            setPhone(phone);
        }
    };
    const UpdateQuantity = (id, quantity) => {
        if (quantity == 0) {
            Swal.fire({
                icon: 'question',
                text: "Remove Item ?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Yes",
                denyButtonText: `No`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(removeFromCart(id));
                    notyf.open({
                        type: 'warning',
                        message: 'Remove successfully'
                    });
                }
            });
        } else {

            dispatch(updateQuantity([id, Number(quantity)]));
            notyf.open({
                type: 'warning',
                message: 'Update successfully'
            });

        }
    }
    const submitBills = () => {
        if (name == '' || email == '' || address == '' || phone == '' || cart.length == 0) {
            notyf.open({
                type: 'warning',
                message: 'Data is required'
            });
        } else {
            var arr = [];
            cart.forEach(el => {
                arr.push({ id: el.id, qty: el.qty });
            });
            var formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('products', JSON.stringify(arr));
            fetch(process.env.REACT_APP_API_URL + 'bill', {
                method: 'POST',
                body: formData
            }).then(res => res.json()).then((res) => {
                if (res.check == true) {
                    notyf.open({
                        type: 'success',
                        message: 'Book successfully'
                    });
                    dispatch(clearCart());
                    window.location.replace('/');
                }
            })
        }
    }
    useEffect(() => {

    }, [])
    return (
        <>
            <Navbar />
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-md-5'>
                        <table className="table">
                            <thead>
                                <tr className='table-dark'>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.length > 0 && cart.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row" >{++index}</th>
                                        <td style={{ width: '20%', verticalAlign: 'middle' }}>
                                            <img style={{ maxHeight: '200px', width: 'auto', verticalAlign: 'middle' }} src={img + item.image} />
                                        </td>
                                        <td style={{ width: '20%', verticalAlign: 'middle' }}><span>{item.name}</span></td>
                                        <td style={{ width: '20%', verticalAlign: 'middle' }}><span>{item.unit}</span></td>
                                        <td style={{ width: '20%', verticalAlign: 'middle' }}><input type='number' className='form-control' onChange={(e) => UpdateQuantity(item.id, e.target.value)} value={item.qty} /></td>
                                        <td style={{ width: '20%', verticalAlign: 'middle' }}><input type='number' disabled className='form-control' value={item.qty * item.price} /></td>
                                    </tr>

                                )
                                )}
                                {total != 0 && (
                                    <tr>
                                        <th colSpan={4} scope="row">Total</th>
                                        <th colSpan={4} scope="row">{Intl.NumberFormat("en-US").format(
                                            Number(total)
                                        )}</th>
                                    </tr>
                                )}
                                {!cart || cart.length == 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            <h3>Cart is empty</h3>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md'>
                    </div>
                    <div className='col-md-3 text-end'>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={name == '' ? 'form-control border-danger' : "form-control"}
                                placeholder="Receiver's name"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span className="input-group-text" id="basic-addon2">
                                Receiver name
                            </span>

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={phone == '' ? 'form-control border-danger' : "form-control"}
                                placeholder="Receiver's phone"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={(e) => checkPhone(e.target.value)}
                            />
                            <span className="input-group-text" id="basic-addon2">
                                Receiver phone
                            </span>

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={email == '' ? 'form-control border-danger' : "form-control"}
                                placeholder="Receiver's email"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={(e) => checkMail(e.target.value)}

                            />
                            <span className="input-group-text" id="basic-addon2">
                                Receiver email
                            </span>

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={address == '' ? 'form-control border-danger' : "form-control"}
                                placeholder="Address"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <span className="input-group-text" id="basic-addon2">
                                Address
                            </span>
                        </div>
                        <div className=" text-rightmb-3">
                            <button className="btn btn-primary" onClick={(e) => submitBills()}>Check Out</button>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Cart