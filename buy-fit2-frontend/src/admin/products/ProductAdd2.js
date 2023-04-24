import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Add() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [product, setProduct] = useState({
        productName: "dsafsdafsadfdas",
        description: "dafsdsafdsdsafdsaaf",
        image: "dsfkldsjalfsalkfja",
        slug: "dsajflkdsajlk",
        price: "1231",
        categoryId: "1"
    })

    const onSubmit = async (e) => {

        // e.preventDefault();

        await axios.post("http://localhost:8080/admin/products/add2", product);
        
    }

    return (
        <div className="container">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h1 className="text-center m-4">商品追加</h1>

                <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                   
                    <input name="file" type="file" className="form-control"></input>

                    <button type="submit" className="btn btn-danger">追加</button>
                </form>
            </div>
        </div>
    )
}
