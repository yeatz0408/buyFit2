import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DOMPurify from 'dompurify';

export default function Index() {

    const { slug } = useParams();
    const [page, setPage] = useState([]);

    useEffect(() => {
        loadPage();
    }, [slug]);

    const loadPage = async () => {

        let slugForAxios = 'home';
        if (slug) {
            slugForAxios = slug;
        }

        const result = await axios.get(`http://localhost:8080/pages/${slugForAxios}`)
        setPage(result.data);
    };

    return (
        <div className="container mt-5">
            <h1 className="display-2">{page.title}</h1>

            <div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-7" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.content) }}></div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
