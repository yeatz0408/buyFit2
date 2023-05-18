import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function Add() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [editor, setEditor] = useState(null);
    let navigate = useNavigate();

    const [page, setPage] = useState({
        title: "",
        slug: "",
        content: ""
    })
    const { title, slug, content } = page;

    const onInputChange = (event, editor) => {
        if (event.target && event.target.name === "content") {
            setPage({ ...page, [event.target.name]: editor.getData });
          } else if (event.target && event.target.name) {
            setPage({ ...page, [event.target.name]: event.target.value });
          }
    }

    const onSubmit = async (e) => {

        // e.preventDefault();
        const updatedContent = await editor.getData();
        await axios.post("http://localhost:8080/admin/pages/add", { ...page, content: updatedContent });

        console.log(page);

        setPage({
            title: "",
            slug: "",
            content: ""
        });

        navigate("/admin/pages")
    }

    return (
        <div className="container">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h1 className="text-center m-4">ページ追加</h1>

                <form onSubmit={handleSubmit((event, editor) => onSubmit(event, editor))}>

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
                        <CKEditor name="content" id="content" editor={Editor}
                            style={{ height: '800px'}}
                            data={content} 
                            onChange={(event, editor) => onInputChange(event,editor)}
                            onReady={(editor) => setEditor(editor)}
                            // onReady={(editor) => {
                            //     // When the editor is ready, get its container element and set the height
                            //     const editorElement = editor.ui.getEditableElement();
                            //     editorElement.style.height = '400px';
                            // }}
                        />
                        {page.content.length < 6 === "minLength" &&
                            <span className="panel-footer text-danger">5文字以上でお願いします</span>}
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-danger">追加</button>
                    <Link to="/admin/pages" className="btn btn-danger mx-2 px-1" >取り消し</Link>

                </form>
            </div>
        </div>
    )
}
