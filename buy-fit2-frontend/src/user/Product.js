import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Pagination } from '../util/Pagination';
import DOMPurify from 'dompurify';

export default function Product() {

    const paginate = (pageNumber) => setCurrentPage(pageNumber - 1);
    let perPage = 6;
    const { slug } = useParams();

    // data from database
    const [products, setProducts] = useState([]);

    // pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const loadProducts = async () => {

        const baseUrl = "http://localhost:8080/products";

        let url = `${baseUrl}/${slug}?page=${currentPage}&size=${perPage}`;

        if (!slug || slug === '') {
            console.log("Entered the if");
            url = `${baseUrl}?page=${currentPage}&size=${perPage}`;
        }

        console.log(url);

        const result = await axios.get(url);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
        console.log(result.data.content);
    };

    useEffect(() => {
        loadProducts();
    }, [currentPage, slug]);

    return (
        <div class="container-fluid mt-5">
            <div class="row">
                <div class="col"></div>
                {/* <div class="col-8"> */}
                <div>

                    <h2 class="display-3 mb-5" >{slug}</h2>

                    <div class="row">

                        {products.map((product) => (
                            <div class="col-4">
                                <p>
                                    <img style={{width:"200px"}} src={product.img}/>
                                </p>
                                <h4 >{product.productName}</h4>
                                <div className="desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
                                <p>{product.price}円</p>
                                <div style={{position: "relative"}}>
                                    <p>
                                        <a class="btn btn-primary addToCart">カートに入れる</a>
                                    </p>
                                    {/* <div class="btn btn-sm btn-success productAdded">カートに入れました。</div> */}
                                </div>
                                <br></br>
                            </div>
                        ))
                        }
                    </div>
                    <br></br>
                    <div className='d-flex justify-content-center text-center'>
                        <Pagination currentPage={currentPage + 1} totalPages={totalPages} paginate={paginate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
