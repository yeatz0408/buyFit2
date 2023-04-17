import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Index() {

    const [pages, setPages] = useState([]);

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = async () => {
        const result = await axios.get("http://localhost:8080/admin/pages")
        setPages(result.data);
    };

    const noPages = () => {
        if (pages.length != 0 ) {
            
        } 
        
        return null;
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
                        <th>変更</th>
                        <th>削除</th>
                    </tr>
                    {
                        pages.map((page, index) => (
                            <tr key={page.id}>
                                <td>{page.title}</td>
                                <td>{page.slug}</td>
                                <td><a>変更</a></td>
                                <td><a>削除</a></td>
                            </tr>

                        ))
                    }
                </table>
            </div>
        </div>
    )
}
