import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Add() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [page, setPage] = useState({
        title: "",
        slug: "",
        content: ""
    })

    const { title, slug, content } = page;

    const onInputChange = (e) => {
        setPage({ ...page, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {

        // e.preventDefault();

        await axios.post("http://localhost:8080/admin/pages/add", page);
        setPage({
            title: "",
            slug: "",
            content: ""
        });
    }

    return (
        <div className="container">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h1 className="text-center m-4">ページ追加</h1>
                <a href="/admin/pages" className="btn btn-primary mb-5">前のページへ</a>

                <form onSubmit={handleSubmit((e) => onSubmit(e))}>

                    <div className="form-group">
                        <label htmlFor="title" className="form-label">タイトル</label>
                        <input name="title" type="text" className="form-control"
                            placeholder="タイトル" value={title} 
                            {...register('title', { required: true, minLength: 2, maxLength: 30 })}
                            onChange={(e) => onInputChange(e)}
                        ></input>
                        {errors.title && errors.title.type === "required" &&
                            <span className="panel-footer text-danger">タイトルを入力ください</span>}
                        {errors.title && errors.title.type === "minLength" &&
                            <span className="panel-footer text-danger">２文字以上でお願いします</span>}
                        {errors.title && errors.title.type === "maxLength" &&
                            <span className="panel-footer text-danger">30文字以下でお願いします</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="slug" className="form-label">Slug</label>
                        <input name="slug" type="text" className="form-control"
                            placeholder="Slug" value={slug} onChange={(e) => onInputChange(e)}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content" className="form-label">内容</label>
                        <textarea name="content" className="form-control"
                            placeholder="内容" value={content} 
                            {...register('content', { required: true, minLength: 5 })}
                            onChange={(e) => onInputChange(e)}
                        ></textarea>
                        {errors.content && errors.content.type === "required" &&
                            <span className="panel-footer text-danger">タイトルを入力ください</span>}
                        {errors.content && errors.content.type === "minLength" &&
                            <span className="panel-footer text-danger">5文字以上でお願いします</span>}
                    </div>

                    <button type="submit" className="btn btn-danger">追加</button>
                    <Link to="/admin/pages" className="btn btn-danger mx-2 px-1" >取り消し</Link>

                </form>
            </div>
        </div>
    )
}
