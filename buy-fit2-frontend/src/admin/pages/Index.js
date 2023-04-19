import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Index() {

    const [pages, setPages] = useState([]);

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = async () => {
        const result = await axios.get("http://localhost:8080/admin/pages")
        setPages(result.data);
    };

    const deletePage = async (id) => {

        await axios.delete(`http://localhost:8080/admin/pages/delete/${id}`);
        loadPages();
    }

    const submitDelete = (id) => {
        confirmAlert({
            message: '削除しますか？',
            buttons: [
              {
                label: 'はい',
                onClick: () => deletePage(id)
              },
              {
                label: 'いいえ',
              }
            ]
          });
    }

    return (
        <div className="container">
            <h1 className="display-2">ページ</h1>
            <a href="/admin/pages/add" className="btn btn-primary mb-5">追加</a>

            {pages.length == 0 &&
                <h4>ページを追加してください。</h4>
            }

            <div>
                <table className="table">
                    <tr>
                        <th>タイトル</th>
                        <th>スラグ</th>
                        <th></th>
                    </tr>
                    {
                        pages.map((page, index) => (
                            <tr key={page.id}>
                                <td>{page.title}</td>
                                <td>{page.slug}</td>
                                <td><Link
                                    to={`/admin/pages/edit/${page.id}`}
                                    className="btn btn-outline-primary mx-2">変更</Link></td>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => submitDelete(page.id)}
                                >削除</button>
                            </tr>

                        ))
                    }
                </table>
            </div>
        </div>
    )
}
