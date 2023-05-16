import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Navbar = (props) => {

    const [categories, setCategories] = useState([]);

    const loadCats = async () => {
        const result = await axios.get("http://localhost:8080/admin/categories")
        setCategories(result.data);
    };

    useEffect(() => {
        loadCats();
    }, []);

    return (
        <>
            {props.admin ?


                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">BuyFit</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/admin/pages">ページ</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/admin/categories">カテゴリー</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/admin/products">商品</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                :
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">BuyFit</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            {categories.map((category) => (
                                <li className="nav-item active">
                                    <a className="nav-link" href="*">{category.catName}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            }
        </>
    )
}