import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useOktaAuth } from "@okta/okta-react";

export default function Cart() {

    const { authState } = useOktaAuth();
    const { productId } = useParams();

    const [ isAddedToCart, setIsAddedToCart ] = useState(false);

    

    useEffect(() => {
        const isAdded = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/products/isaddedtocart/${productId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const fetched = await fetch(url, requestOptions);
                if (!fetched.ok) {
                    throw new Error('エラーが発生しました。')
                }
                const fetchedJson = await fetched.json();
                setIsAddedToCart(fetchedJson);
            }
        }

        isAdded().catch((error) => {
            console.log("There was an error calling isAdded()");
        });

    }, [authState, productId])

  return (
    <div className="container mt-5">
        <h1 className="display-2">{isAddedToCart}</h1>
    </div>
  )
}
