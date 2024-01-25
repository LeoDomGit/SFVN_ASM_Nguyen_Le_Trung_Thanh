import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Notyf } from 'notyf';
import axios from 'axios';
import Cookies from 'js-cookie';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
    const CheckLogin = () => {
        if (email == '' || password == '') {
            notyf.open({
                type: 'error',
                message: 'Email and password are required',
            });
        } else {
            axios.post(process.env.REACT_APP_API_URL + 'admin/users/checkLogin', {
                email: email,
                password: password
            }).then((res) => {
                if (res.data.check == true) {
                    Cookies.set('token', res.data.token);
                    notyf.open({
                        type: 'success',
                        message: 'Login successfully',
                    });
                    window.location.replace('/products');
                } else if (res.data.check == false) {
                    if (res.data.msg.email) {
                        notyf.open({
                            type: 'error',
                            message: res.data.msg.email,
                        });
                    } else if (res.data.msg.password) {
                        notyf.open({
                            type: 'error',
                            message: res.data.msg.password,
                        });
                    } else if (res.data.msg) {
                        notyf.open({
                            type: 'error',
                            message: res.data.msg,
                        });
                    }
                }
            })
        }
    }
    return (
        <>
            <div style={{ width: '30%', margin: '10% auto', minHeight: '300px', padding: '30px 30px 30px 30px', boxShadow: '3px 5px 3px 5px grey' }} className="align-middle">
                <h4 className="text-center">Login</h4>
                <div className='row'>
                    <input type='text' className='form-control mb-3' onChange={(e) => setEmail(e.target.value)} placeholder='Email'></input>
                    <input type='password' className='form-control mb-3' onChange={(e) => setPassword(e.target.value)} placeholder='Password'></input>
                    <button className='btn btn-primary' onClick={(e) => CheckLogin()}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login