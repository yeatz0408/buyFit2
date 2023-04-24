import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Add() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [product, setProduct] = useState({
        productName: "",
        description: "",
        price: "",
        categoryId: ""
    })

    const { productName, description, price, categoryId } = product;

    const [categories, setCategories] = useState([]);

    const loadCats = async () => {
        const result = await axios.get("http://localhost:8080/admin/categories")
        setCategories(result.data);
    };

    useEffect(() => {
        loadCats();
    }, []);


    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {

        // e.preventDefault();

        await axios.post("http://localhost:8080/admin/products/add", product);
        setProduct({
            productName: "",
            description: "",
            price: "",
            categoryId: ""
        });
    }

    return (
        <div className="container">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h1 className="text-center m-4">商品追加</h1>

                <form onSubmit={handleSubmit((e) => onSubmit(e))} encType="multipart/form-data">

                    <div className="form-group">
                        <label htmlFor="productName" className="form-label">商品名</label>
                        <input name="productName" type="text" className="form-control"
                            placeholder="商品名" value={productName}
                            {...register('productName', { required: true, minLength: 2, maxLength: 30 })}
                            onChange={(e) => onInputChange(e)}
                        ></input>
                        {errors.productName && errors.productName.type === "required" &&
                            <span className="panel-footer text-danger">商品名を入力ください</span>}
                        {errors.productName && errors.productName.type === "minLength" &&
                            <span className="panel-footer text-danger">２文字以上でお願いします</span>}
                        {errors.productName && errors.productName.type === "maxLength" &&
                            <span className="panel-footer text-danger">30文字以下でお願いします</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">内容</label>
                        <textarea name="description" className="form-control"
                            placeholder="内容" value={description}
                            {...register('description', { required: true, minLength: 5 })}
                            onChange={(e) => onInputChange(e)}
                        ></textarea>
                        {errors.description && errors.description.type === "required" &&
                            <span className="panel-footer text-danger">内容を入力ください</span>}
                        {errors.description && errors.description.type === "minLength" &&
                            <span className="panel-footer text-danger">5文字以上でお願いします</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="file" className="form-label">イメージ</label>
                        <input name="file" type="file" className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price" className="form-label">価格</label>
                        <input name="price" type="number" className="form-control"
                            placeholder="価格" value={price}
                            {...register('price', { required: true, min: 1 })}
                            onChange={(e) => onInputChange(e)}
                        ></input>
                        {errors.price && errors.price.type === "required" &&
                            <span className="panel-footer text-danger">価格を入力ください</span>}
                        {errors.price && errors.price.type === "min" &&
                            <span className="panel-footer text-danger">1円以上でお願いします</span>}
                    </div>

                    <div class="form-group">
                        <label htmlFor="">Category:</label>
                        <select name="categoryId" className="form-control" {...register('categoryId', { min: 1 })}
                            onChange={(e) => onInputChange(e)}>
                            <option value="0">カテゴリー</option>
                            {
                                categories.map((category) => (
                                    <option value={category.id}>{category.catName}</option>
                                ))
                            }
                        </select>
                        {errors.categoryId && errors.categoryId.type === "min" &&
                            <span className="panel-footer text-danger">カテゴリーを選択してください。</span>}
                    </div>

                    <button type="submit" className="btn btn-danger">追加</button>
                    <Link to="/admin/products" className="btn btn-danger mx-2 px-1" >取り消し</Link>

                </form>
            </div>
        </div>
    )
}
