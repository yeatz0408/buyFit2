import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Index() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const result = await axios.get("http://localhost:8080/admin/categories")
        setCategories(result.data);
    };

    const deleteCategory = async (id) => {
        await axios.delete(`http://localhost:8080/admin/categories/delete/${id}`);
        loadCategories();
    }

    const submitDelete = (id) => {
        confirmAlert({
            message: '削除しますか？',
            buttons: [
                {
                    label: 'はい',
                    onClick: () => deleteCategory(id)
                },
                {
                    label: 'いいえ',
                }
            ]
        });
    }

    return (
        <div className="container">
            <h1 className="display-2">カテゴリー</h1>
            <a href="/admin/categories/add" className="btn btn-primary mb-5">追加</a>

            {categories.length == 0 &&
                <h4>カテゴリーを追加してください。</h4>
            }

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>カテゴリー名</th>
                            <th>slug</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category, index) => (
                                <tr key={category.id}>
                                    <td>{category.catName}</td>
                                    <td>{category.slug}</td>
                                    <td><Link
                                        to={`/admin/categories/edit/${category.id}`}
                                        className="btn btn-outline-primary mx-2">変更</Link></td>
                                    <td><button
                                        className="btn btn-danger mx-2"
                                        onClick={() => submitDelete(category.id)}
                                    >削除</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
