import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { Notyf } from 'notyf';

function Users() {
    const [show1, setShow1] = useState(false);
    const api = process.env.REACT_APP_API_URL;
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [rolename, setRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [idRole, setidRole] = useState(0);
    // =====================
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState(0);
    const [users, setUsers] = useState([]);
    //===================================
    const submitCreateUser = () => {
        if (username == '') {
            notyf.open({
                type: 'error',
                message: 'Username is required',
            });
        } else if (email == '') {
            notyf.open({
                type: 'error',
                message: 'Email is required',
            });
        } else if (userRole == 0) {
            notyf.open({
                type: 'error',
                message: 'RoleId is required',
            });
        } else {
            var formData = new FormData();
            formData.append('name', username);
            formData.append('email', email);
            formData.append('idRole', userRole);
            axios.post(api + 'admin/users', formData).then((res) => {
                if (res.data.check == true) {
                    notyf.open({
                        type: 'success',
                        message: 'User created successfully',
                    })
                    window.location.reload();
                } else if (res.data.check == false) {
                    if (res.data.msg.name) {
                        notyf.open({
                            type: 'error',
                            message: res.data.msg.name,
                        })
                    } else if (res.data.msg.email) {
                        notyf.open({
                            type: 'error',
                            message: res.data.msg.email,
                        })
                    } else if (res.data.msg.idRole) {
                        notyf.open({
                            type: 'error',
                            message: res.data.msg.idRole,
                        })
                    }

                }
            });
        }

    }
    const createRole = () => {
        setRole('');
        setShow1(true)
    }
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
                background: '#39cced',
                duration: 2000,
                dismissible: true,
                icon: '<i class="bi bi-bag-check-fill"></i>',
            }
        ]
    });
    const createUser = () => {
        setUsername('');
        setEmail('');
        setShow2(true)
    }
    //===================================
    const submitEditRole = () => {
        if (rolename == '') {
            notyf.open({
                type: 'error',
                message: 'Role is required',
            });
        } else {
            axios.post(api + 'admin/roles/edit', {
                id: idRole,
                name: rolename
            }).then((res) => {
                if (res.data.check == true) {
                    setRoles(res.data.roles);
                    notyf.open({
                        type: 'success',
                        message: 'Updated successfully',
                    });
                    setRole('');
                    setidRole(0);
                    setShow1(false);
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
    const customRole = (id, name) => {
        setRole(name);
        setidRole(id);
        Swal.fire({
            icon: 'question',
            text: "Edit or Delete",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Change",
            denyButtonText: `Remove`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setShow1(true);
            } else if (result.isDenied) {
                Swal.fire({
                    icon: 'question',
                    text: "Are you sure",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Yes",
                    denyButtonText: `No`
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        axios.post(api + 'admin/roles/delete', {
                            id: id
                        }).then((res) => {
                            if (res.data.check == true) {
                                notyf.open({
                                    type: 'success',
                                    message: 'Deleted successfully',
                                });
                                setRoles(res.data.roles);
                            } else if (res.data.check == false) {
                                if (res.data.msg.id) {
                                    notyf.open({
                                        type: 'error',
                                        message: res.data.msg.id,
                                    });
                                } else if (res.data.msg) {
                                    notyf.open({
                                        type: 'error',
                                        message: res.data.msg,
                                    });
                                }
                            }
                        })
                    } else if (result.isDenied) {

                    }

                });
            }

        });
    }
    const submitCreateRole = () => {
        if (rolename == '') {
            notyf.open({
                type: 'error',
                message: 'Rolename is required',
            });
        } else {
            axios.post(api + 'admin/roles', {
                name: rolename
            }).then((res) => {
                if (res.data.check == true) {
                    setRoles(res.data.roles);
                    notyf.open({
                        type: 'success',
                        message: 'Created successfully',
                    });
                    setRole('');
                    setShow1(false);
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
    const deleteUser = (id) => {
        Swal.fire({
            icon: 'question',
            text: "Do you want to delete the users?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.post(api + 'admin/users/delete', {
                    id: id
                }).then((res) => {
                    if (res.data.check == true) {
                        notyf.open({
                            type: 'error',
                            message: 'Deleted successfully',
                        });
                        setUsers(res.data.users);
                    } else if (res.data.check == false) {
                        if (res.data.msg.id) {
                            notyf.open({
                                type: 'error',
                                message: res.data.msg.id,
                            });
                        } else if (res.data.msg) {
                            notyf.open({
                                type: 'error',
                                message: res.data.msg,
                            });
                        }
                    }
                })
            } else if (result.isDenied) {
            }
        });
    }
    useEffect(() => {
        fetch(api + 'admin/roles').then(res => res.json()).then((res) => {
            setRoles(res);
        })
        fetch(api + 'admin/users').then(res => res.json()).then((res) => {
            setUsers(res);
        })
    }, []);
    return (
        <>
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Role Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" value={rolename} onChange={(e) => setRole(e.target.value)} className='form-control' placeholder="Role" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    {idRole != 0 &&

                        <Button variant="primary" onClick={(e) => submitEditRole()}>
                            Edit
                        </Button>}
                    {idRole == 0 && (
                        <Button variant="primary" onClick={(e) => submitCreateRole()}>
                            Save
                        </Button>

                    )}
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>User Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} className='form-control mb-2' placeholder="Username" />
                    <input type="text" onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder="Email" />
                    <select onChange={(e) => setUserRole(e.target.value)} defaultValue={0} className="form-control mt-2">
                        <option disabled value={0}>Select Role</option>
                        {roles && roles.length > 0 && roles.map((role, index) => (
                            <option key={index} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => submitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <Navbar />
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-md-2'>
                    </div>
                    <div className='col-md'>
                        <div className='row'>
                            <div className='col-md'>
                            </div>
                            <div className='col-md-2'>
                                <button onClick={() => createRole()} className='w-100 btn btn-primary'>Create Role</button>
                                <button onClick={() => createUser()} className='w-100 mt-2 btn btn-primary'>Create User</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-2'>
                        <ul className="list-group">
                            {roles.length > 0 && roles.map((role, index) => (
                                <li key={index} className="list-group-item pointer" onClick={(e) => customRole(role.id, role.name)}>
                                    {role.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='col-md-8'>
                        <table className="table">
                            <thead className='table-primary'>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length == 0 && (
                                    <tr>
                                        <td className='table-secondary border' colSpan={4}> <b>Users is emty</b></td>
                                    </tr>
                                )}
                                {users && users.length > 0 && users.map((user, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>

                                            <button onClick={(e) => deleteUser(user.id)} className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users