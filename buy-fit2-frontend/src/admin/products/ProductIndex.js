import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Index() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8080/admin/products")
        setProducts(result.data);
    };

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

    return (
        <div className="container">
            <h1 className="display-2">商品</h1>
            <a href="/admin/products/add" className="btn btn-primary mb-5">追加</a>

            {products.length == 0 &&
                <h4>商品を追加してください。</h4>
            }

            <div>
                <table className="table">
                    <tr>
                        <th>商品名</th>
                        <th>イメージ</th>
                        <th>カテゴリー</th>
                        <th>価格</th>
                        <th>変更</th>
                        <th>削除</th>
                    </tr>
                    {
                        products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{product.productName}</td>
                                <td>{product.image}</td>
                                <td>{product.price}</td>
                                <td><Link
                                    to={`/admin/products/edit/${product.id}`}
                                    className="btn btn-outline-primary mx-2">変更</Link></td>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => submitDelete(product.id)}
                                >削除</button>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}
