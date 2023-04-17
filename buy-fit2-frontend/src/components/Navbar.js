import React from 'react'

export default function navbar() {

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="/">BuyFit</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/admin/pages">ページ</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/admin/categories">カテゴリー</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/admin/products">商品</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
