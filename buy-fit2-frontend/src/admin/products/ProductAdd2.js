import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Add() {


    const [selectedImage, setSelectedImage] = useState(null);
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
        console.log(JSON.stringify(selectedImage));
        
    }

    async function base64ConversionForImages(e) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            setSelectedImage(reader.result);
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    return (
        <div className="container">
                <form onSubmit={(e) => onSubmit(e)}>
                   
                    <input name="file" type="file" className="form-control"
                         onChange={(e) => base64ConversionForImages(e)}></input>

                    <button type="submit" className="btn btn-danger">追加</button>
                </form>
        </div>
    )
}
