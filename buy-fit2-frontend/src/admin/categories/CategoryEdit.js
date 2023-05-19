import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Edit() {

  const { id } = useParams();
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [category, setCategory] = useState({
    catName: "",
    slug: ""
  })

  const { catName, slug } = category;

  const onInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    await axios.put(`http://localhost:8080/admin/categories/edit/${id}`, category);
    navigate("/admin/categories");
  }

  const loadCategory = async () => {
    const result = await axios.get(`http://localhost:8080/admin/categories/edit/${id}`);
    setCategory(result.data);
  }

  useEffect(() => {
    loadCategory();
  }, [])


  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h1 className="text-center m-4">カテゴリー変更</h1>
        <a href="/admin/categories" className="btn btn-primary mb-5">全てのカテゴリーへ</a>

        <form onSubmit={handleSubmit((e) => onSubmit(e))}>

          <div className="form-group">
            <label htmlFor="catName" className="form-label">カテゴリー名</label>
            <input name="catName" type="text" className="form-control"
              placeholder="カテゴリー名" value={ catName }
              {...register('catName', { required: true, minLength: 2, maxLength: 30 })}
              onChange={(e) => onInputChange(e)}
            ></input>
            {errors.catName && errors.catName.type === "required" &&
              <span className="panel-footer text-danger">タイトルを入力ください</span>}
            {errors.catName && errors.catName.name === "minLength" &&
              <span className="panel-footer text-danger">２文字以上でお願いします</span>}
            {errors.catName && errors.catName.type === "maxLength" &&
              <span className="panel-footer text-danger">30文字以下でお願いします</span>}
          </div>

          <div className="form-group">
            <label htmlFor="slug" className="form-label">Slug</label>
            <input name="slug" type="text" className="form-control"
              placeholder="Slug" value={slug} onChange={(e) => onInputChange(e)}
            ></input>
          </div>
          <br/>
          <button type="submit" className="btn btn-danger">変更</button>
          <Link to="/admin/categories" className="btn btn-danger mx-2 px-1" >取り消し</Link>

        </form>
      </div>
    </div>
  )
}
