import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCart } from '../features/cartSlice';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
function Home() {
    const img = process.env.REACT_APP_IMG_URL
    const url = process.env.REACT_APP_API_URL
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageNumbers, setPageArr] = useState([]);
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
    const cart = useSelector(selectCart);
    const addToCartFunction = (item) => {
        dispatch(addToCart(item));
        notyf.open({
            type: 'success',
            message: 'Add one item to cart',
        });
    }
    const [products, setProduct] = useState([]);

    useEffect(() => {
        fetch(url + 'products?page=' + page).then(res => res.json()).then((res) => {
            setProduct(res.data);
            const pageNumbers = Array.from({ length: res.last_page }, (_, index) => index + 1);
            setPageArr(pageNumbers);
        });
    }, [page])
    return (
        <>
            <Navbar />
            <div className='container-fluid mt-4'>
                <div className='row'>
                    <div className='col-md-2'>
                        <Sidebar />
                    </div>
                    <div className='col-md'>
                        <div className='row'>
                            {products.length > 0 && products.map((item, index) => (
                                <div key={index} className='col-md-3 mb-3'>
                                    <div className="card border" style={{ width: "100%" }}>
                                        <img src={img + item.image} style={{ maxHeight: '200px', width: 'auto', margin: '0px auto', paddingTop: '30px' }} className="img-fluid" alt="..." />
                                        <div className="card-body text-center">
                                            <h5 className="text-center">{item.name}</h5>
                                            <p className="text-center">
                                                Price: {Intl.NumberFormat("en-US").format(
                                                    item.price
                                                )}
                                            </p>
                                            <button className="btn btn-primary text-center" onClick={(e) => addToCartFunction(item)}>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <div className='row '>
                    <div className='col-md-2 text-end'>

                    </div>
                    <div className='col-md text-end'>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                {pageNumbers.map((pageNumber) => (
                                    <li key={pageNumber} class="page-item"><a onClick={(e) => setPage(pageNumber)} class={page == pageNumber ? "page-link active" : "page-link"} href="#">{pageNumber}</a></li>

                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home