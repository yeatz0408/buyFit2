import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Index() {

    // data from database
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);

    

    useEffect(() => {
        loadProducts();
        loadCats();
    }, [currentPage]);

    const loadProducts = async () => {

        const baseUrl = "http://localhost:8080/admin/products";

        const url = `${baseUrl}?page=${currentPage}&size=3`;

        const result = await axios.get(url);
        setProducts(result.data.content);
    };

    const loadCats = async () => {
        const results = await axios.get("http://localhost:8080/admin/categories");
        

        const loadedCats = {};

        for (const cat of results.data) {
            loadedCats[cat["id"]] = cat["catName"];           
        }

        setCategories(loadedCats);
    }

    const deleteProducts = async (id) => {
        await axios.delete(`http://localhost:8080/admin/products/delete/${id}`);
        loadProducts();
    }

    const submitDelete = (id) => {
        confirmAlert({
            message: '削除しますか？',
            buttons: [
                {
                    label: 'はい',
                    onClick: () => deleteProducts(id)
                },
                {
                    label: 'いいえ',
                }
            ]
        });
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ?
        booksPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <h1 className="display-2">商品</h1>
            <a href="/admin/products/add" className="btn btn-primary mb-5">追加</a>

            {products.length == 0 &&
                <h4>商品を追加してください。</h4>
            }

            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>イメージ</th>
                        <th>商品名</th>
                        <th>カテゴリー</th>
                        <th>価格</th>
                        <th>変更</th>
                        <th>削除</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={product.id}>
                                <td><img src={product.img}
                                    width='50' height='50' alt='No Image' /></td>
                                <td>{product.productName}</td>
                                <td>{categories[product.categoryId]}</td>
                                <td>{product.price}</td>
                                <td><Link
                                    to={`/admin/products/edit/${product.id}`}
                                    className="btn btn-outline-primary mx-2">変更</Link></td>
                                <td><button
                                    className="btn btn-danger mx-2"
                                    onClick={() => submitDelete(product.id)}
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
