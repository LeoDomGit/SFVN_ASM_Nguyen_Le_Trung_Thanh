import React, { useEffect, useState } from 'react'

function Sidebar({ onCategoryChange }) {
    const url = process.env.REACT_APP_API_URL;
    const [category, setCategories] = useState([]);
    const [cateId, setCateId] = useState(0);
    const handleRadioChange = (e) => {
        console.log(e.target.value);
        const categoryValue = e.target.value;
        setCateId(categoryValue);
        onCategoryChange(categoryValue);
    };

    useEffect(() => {
        fetch(url + 'cates').then(res => res.json()).then((res) => {
            setCategories(res);
        });
    }, []);
    return (
        <>
            <div className="w-100">
                <ul className="list-group">
                    {category.length > 0 && category.map((item, index) => (
                        <li key={index} className="list-group-item">
                            <div className="input-group">
                                <div className="input-group-text">
                                    <input
                                        className="form-check-input mt-0"
                                        type="radio"
                                        defaultValue=""
                                        value={item.id}
                                        name='category'
                                        onChange={handleRadioChange}
                                        aria-label="Radio button for following text input"
                                    />
                                </div>
                                <span className="form-control">{item.name}</span>
                            </div>
                        </li>
                    ))}


                </ul>

            </div>
        </>
    )
}

export default Sidebar