import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function Bills() {
    const api = process.env.REACT_APP_API_URL;
    const [page, setPage] = useState(1);
    const [pageNumbers, setPageArr] = useState([]);
    const [bills, setBill] = useState([]);
    const [singleBill, setSingle] = useState({});
    const [billDetail, setBillDetail] = useState([]);
    const [idBill, setId] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        fetch(api + 'admin/bills').then(res => res.json()).then((res) => {
            setBill(res.data);
            const pageNumbers = Array.from({ length: res.last_page }, (_, index) => index + 1);
            setPageArr(pageNumbers);
        })
    }, [page])
    useEffect(() => {
        if (idBill != 0) {
            fetch(api + 'admin/bills/' + idBill).then(res => res.json()).then((res) => {
                setSingle(res.bill);
                setBillDetail(res.list);
                var total = 0;
                res.list.forEach(el => {
                    total = total + (el.qty * el.price);
                });
                setTotal(total)
            })
        }
    }, [idBill])
    return (
        <>
            <Navbar />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className='col-md-5'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Bills</th>
                                    <th scope="col">Create_at</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.length > 0 && bills.map((item, index) => (
                                    <tr>
                                        <td scope="row">{++index}</td>
                                        <td className='text-start' >
                                            <b>  Customer : {item.user.name}</b> <br />
                                            <b>  Email : {item.user.email} </b><br />
                                            <b> Phone : {item.user.email}</b> <br />
                                        </td>
                                        <td>
                                            <b>{formatDate(item.created_at)}</b>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={(e) => setId(item.id)}>Detail</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {pageNumbers.length > 1 && (
                    <div className='row'>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                {pageNumbers.map((pageNumber) => (
                                    <li key={pageNumber} class="page-item"><a onClick={(e) => setPage(pageNumber)} class={page == pageNumber ? "page-link active" : "page-link"} href="#">{pageNumber}</a></li>

                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
                {billDetail.length > 0 && (
                    <div className="row mt-2">
                        <hr />
                        <h4 className='text-start'>Bill Detail</h4>
                        <div className='col-md-4'>
                            <h4>Customer name : {singleBill.user.name}</h4>
                            <h4>Customer phone : {singleBill.phone}</h4>
                            <h4>Customer email : {singleBill.user.email}</h4>
                            <h4>Customer address : {singleBill.address}</h4>

                        </div>
                        <div className='col-md-7'>
                            <table class="table">
                                <thead className='table-primary'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Unit</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {billDetail.map((item, index) => (
                                        <tr>
                                            <th scope="row">{++index}</th>
                                            <td>{item.name}</td>
                                            <td>{item.unit}</td>
                                            <td>{item.price}</td>
                                            <td>{item.qty}</td>
                                            <td>{Intl.NumberFormat("en-US").format(
                                                Number(item.qty * item.price)
                                            )}</td>

                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={5}>
                                            Total
                                        </td>
                                        <td>
                                            {Intl.NumberFormat("en-US").format(
                                                Number(total)
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                )}

            </div>

        </>
    )
}

export default Bills