import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export const Categories = () => {
    
    const [categories, setCategories] = useState([]);
    const loadCats = async () => {
        const result = await axios.get("http://localhost:8080/admin/categories")
        setCategories(result.data);
    };

    useEffect(() => {
        loadCats();
    }, []);
    
    return (
        <div style={{ marginTop: "20px" }}>
            <h3 className="display-10">商品カテゴリー</h3>
            <ul className="list-group">
                <li className="list-group-item taller-li">
                    <a href="/category/all" className="nav-link">全て</a>
                </li>
                {
                    categories.map((category) => (
                        <li className="list-group-item">
                            <NavLink className="nav-link" to={``}>{category.catName}</NavLink>
                        </li>
                    ))
                }
            </ul>

            <div >Add your Cart icon here</div>
        </div>
    );
}