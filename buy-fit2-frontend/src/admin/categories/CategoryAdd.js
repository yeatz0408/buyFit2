import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Add() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [category, setCategory] = useState({
        title: "",
        slug: "",
        content: ""
    })

    const { name, slug } = category;

    const onInputChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {

        // e.preventDefault();

        await axios.post("http://localhost:8080/admin/categories/add", category);
        setCategory({
            name: "",
            slug: "",
        });
    }

    return (
        <div className="container">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h1 className="text-center m-4">カテゴリー追加</h1>

                <form onSubmit={handleSubmit((e) => onSubmit(e))}>

                    <div className="form-group">
                        <label htmlFor="name" className="form-label">カテゴリー名</label>
                        <input name="name" type="text" className="form-control"
                            placeholder="カテゴリー名" value={name} 
                            {...register('name', { required: true, minLength: 2, maxLength: 30 })}
                            onChange={(e) => onInputChange(e)}
                        ></input>
                        {errors.name && errors.name.type === "required" &&
                            <span className="panel-footer text-danger">カテゴリー名を入力ください</span>}
                        {errors.name && errors.name.type === "minLength" &&
                            <span className="panel-footer text-danger">２文字以上でお願いします</span>}
                        {errors.name && errors.name.type === "maxLength" &&
                            <span className="panel-footer text-danger">30文字以下でお願いします</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="slug" className="form-label">Slug</label>
                        <input name="slug" type="text" className="form-control"
                            placeholder="Slug" value={slug} onChange={(e) => onInputChange(e)}
                        ></input>
                    </div>

                    <button type="submit" className="btn btn-danger">追加</button>
                    <Link to="/admin/categories" className="btn btn-danger mx-2 px-1" >取り消し</Link>

                </form>
            </div>
        </div>
    )
}
