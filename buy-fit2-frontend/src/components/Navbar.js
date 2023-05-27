import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from './../util/SpinnerLoading'

export const Navbar = () => {

    // OktaAuthentication code
    const { oktaAuth, authState } = useOktaAuth();

    const handleLogout = async () => oktaAuth.signOut();
    console.log(authState);


    // normal code
    // const [categories, setCategories] = useState([]);
    // const loadCats = async () => {
    //     const result = await axios.get("http://localhost:8080/admin/categories")
    //     setCategories(result.data);
    // };

    const [pages, setPages] = useState([]);
    const loadPages = async () => {
        const result = await axios.get("http://localhost:8080/pages/all")
        setPages(result.data);
    }

    useEffect(() => {
        //        loadCats();
        loadPages();
    }, []);

    if (!authState) {
        return <SpinnerLoading />
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="/">BuyFit</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {authState.isAuthenticated && authState.accessToken?.claims?.userType === 'admin' ?

                <div>
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
                </div>
                :
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        {pages.map((page) => (
                            <li className="nav-item active">
                                <NavLink className="nav-link" to={`/pages/${page.slug}`}>{page.title}</NavLink>
                            </li>
                        ))}

                    </ul>
                </div>
            }

            {!authState.isAuthenticated ?
                <div className='nav-item m-1'>
                    <Link type='button' className='btn btn-outline-light' to="/login">ログイン</Link>
                </div>
                :
                <div className='nav-item m-1'>
                    <a type='button' className='btn btn-outline-light' onClick={handleLogout}>ログアウト</a>
                </div>
            }
        </nav>

    )
}