import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Pagination } from '../util/Pagination';
import DOMPurify from 'dompurify';
import { useOktaAuth } from "@okta/okta-react";

export default function Product() {

    // data from database
    const [products, setProducts] = useState([]);
    const [loadedCats, setLoadedCats] = useState([]);

    // pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [showAddedMessage, setShowAddedMessage] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const paginate = (pageNumber) => setCurrentPage(pageNumber - 1);
    let perPage = 6;
    const { authState } = useOktaAuth();
    const { slug } = useParams();

    const loadProducts = async () => {

        const baseUrl = "http://localhost:8080/products";

        let url = `${baseUrl}/${slug}?page=${currentPage}&size=${perPage}`;

        if (!slug || slug === '') {
            slug = "";

            url = `${baseUrl}/all?page=${currentPage}&size=${perPage}`;
        }

        const result = await axios.get(url);
        setProducts(result.data.content);
        setTotalPages(result.data.totalPages);
    };

    const loadCats = async () => {
        const result = await axios.get("http://localhost:8080/admin/categories")

        const tempLoadedCats = {}

        for (const cat of result.data) {
            tempLoadedCats[cat["slug"]] = cat["catName"];
        }

        setLoadedCats(tempLoadedCats);
        console.log(tempLoadedCats);
    };

    async function addToCart(product) {
        const url = `http://localhost:8080/products/addtocart/${product.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);

        setSelectedProduct(product);
        setShowAddedMessage(true);

        setTimeout(() => {
            setSelectedProduct(null);
            setShowAddedMessage(false);
        }, 3000);
    }

    useEffect(() => {
        loadProducts();
        loadCats();
    }, [currentPage, slug]);

    useEffect(() => {
        setCurrentPage(0);
    }, [slug])

    return (
        <div class="container-fluid mt-5">
            <div class="row">
                <div class="col"></div>
                {/* <div class="col-8"> */}
                <div>


                    {loadedCats[slug] ?
                        <h2 class="display-3 mb-5" >{loadedCats[slug]}</h2>
                        :
                        <h2 class="display-3 mb-5" >全ての商品</h2>
                    }
                    <br />

                    <div class="row">

                        {products.map((product) => (
                            <div class="col-4">
                                <p>
                                    <img style={{ width: "200px" }} src={product.img} />
                                </p>
                                <h4 >{product.productName}</h4>
                                <div className="desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
                                <p>{product.price}円</p>
                                <div style={{ position: "relative" }}>

                                    {
                                        authState.isAuthenticated ?
                                            <p>
                                                <button onClick={() => addToCart(product)} class="btn btn-primary addToCart">カートに入れる</button>
                                            </p>
                                            :
                                            <p>
                                                <NavLink className="btn btn-primary addToCart" to="/login">カートに入れる</NavLink>
                                            </p>

                                    }

                                    {selectedProduct === product && showAddedMessage ? (
                                        <div className="btn btn-sm btn-success fade-out"
                                            onAnimationEnd={() => setShowAddedMessage(false)}>
                                            カートに入れました。</div>
                                    ) : <div style={{ height: "40px" }}></div>}
                                </div>

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
