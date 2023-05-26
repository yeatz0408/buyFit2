import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Navbar } from './components/Navbar';
import PageIndex from './admin/pages/PageIndex';
import PageAdd from './admin/pages/PageAdd'
import PageEdit from './admin/pages/PageEdit'
import CategoryIndex from './admin/categories/CategoryIndex'
import CategoryAdd from './admin/categories/CategoryAdd'
import CategoryEdit from './admin/categories/CategoryEdit'
import ProductIndex from './admin/products/ProductIndex'
import ProductAdd from './admin/products/ProductAdd'
import ProductEdit from './admin/products/ProductEdit'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Page from './user/Page';
import Product from './user/Product';
import { Categories } from './util/Categories';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget'

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  // const navigate = useNavigate();

  const customAuthHandler = () => {
    // navigate('/login');
    <Route path="/login" element={<LoginWidget config={oktaConfig} />} />

  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    // navigate(toRelativeUrl(originalUri || '/', window.location.origin), { replace: true });
    return <Product />
  };

  return (
    <div className="App">
      <Router>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
          <Navbar admin={true} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-2">
                <Categories />
              </div>
              <div className="col-10">
                <Routes>
                  <Route path="/" element={<Page />} />

                  <Route path="/admin/pages" element={<PageIndex />} />
                  <Route path="/admin/pages/add" element={<PageAdd />} />
                  <Route path="/admin/pages/edit/:id" element={<PageEdit />} />

                  <Route path="/admin/categories" element={<CategoryIndex />} />
                  <Route path="/admin/categories/add" element={<CategoryAdd />} />
                  <Route path="/admin/categories/edit/:id" element={<CategoryEdit />} />

                  <Route path="/admin/products" element={<ProductIndex />} />
                  <Route path="/admin/products/add" element={<ProductAdd />} />
                  <Route path="/admin/products/edit/:id" element={<ProductEdit />} />

                  <Route path="/pages/:slug" element={<Page />} />
                  <Route path="/products" element={<Product />} />
                  <Route path="/products/:slug" element={<Product />} />

                  <Route path="/login" element={<LoginWidget config={oktaConfig} />} />
                  <Route path="/login/callback" element={<LoginCallback />} />
                </Routes>
              </div>
            </div>
          </div>
        </Security>
      </Router>
    </div>
  );
};
