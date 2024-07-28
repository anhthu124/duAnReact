import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ProductList from "./admin/product/ProductList";
import CreateProduct from "./admin/product/CreateProduct";
import EditProduct from "./admin/product/EditProduct";

import NotFound from "./admin/product/NotFound";
function App() {
  return (
      <BrowserRouter>
          {/*<Navbar/>*/}
          <Routes>
              {/*<Route path="/" element={<Home/>}/>*/}
              {/*<Route path="/contact" element={<Contact/>}/>*/}
              <Route path="/admin/product" element={<ProductList/>}/>
              <Route path="/admin/product/create" element={<CreateProduct/>}/>
              <Route path="/admin/product/edit/:id" element={<EditProduct/>}/>
              <Route path="*" element={<NotFound/>}/>
          </Routes>
          {/*<Footer/>*/}
      </BrowserRouter>
  );
}

export default App;
