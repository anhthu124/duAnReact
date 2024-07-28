import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import ListBook from "./components/books/ListBook";
import CreateBook from "./components/books/CreateBook";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UpdateBook from "./components/books/UpdateBook";

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="nav-link-buttons">
                    <NavLink to="/books">Danh sách</NavLink>
                    <NavLink to="/books/CreateBook">Thêm mới</NavLink>
                </div>
                <Routes>
                    <Route path="/books" element={<ListBook/>}></Route>
                    <Route path="/books/CreateBook" element={<CreateBook/>}></Route>
                    <Route path="/books/UpdateBook" element={<UpdateBook/>}></Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default App;
