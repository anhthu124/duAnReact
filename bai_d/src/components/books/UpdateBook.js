import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import * as bookService from "../../service/BookService";
import {toast} from "react-toastify";
import './css/BookForm.css';
import * as categoryService from "../../service/CategoryService";

const UpdateBook = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const book = location.state?.book;
    useEffect(() => {
        getAllCategories()
    }, [])
    const getAllCategories = async () => {
        const categories = await categoryService.getALlCategory();
        setCategory(categories);
    }
    const validateBook = {
        id: Yup.string().required("Please enter number")
            .min(0, "Please enter a number more than 0")
            .typeError("Please enter only number"),
        title: Yup.string().required("Please enter a title")
            .matches(/^[A-Za-z0-9 ]{3,100}$/, "Please enter a title"),
        amount: Yup.number().required("Please enter a number")
            .min(0, "Please enter a number more than 0")
            .typeError("Please enter only number"),
        publicationDate: Yup.date().required("Please enter dd/mm/yy"),
        category: Yup.string().required("Please choose a category"),
    }
    const saveBook = async (value) => {
        value.id = +value.id;
        value.amount = +value.amount
        value.category = JSON.parse(value.category)
        await bookService.updateBook(value.id, value)
        toast.success("Cập nhật thành công")
        navigate("/books")
    }
    const handleBack = (navigate) => {
        navigate('/books');
    };

    return (
        <div className="update-book-container">
            <h1>Cập nhật sách</h1>
            <Formik
                initialValues={{
                    id: book.id,
                    title: book.title,
                    amount: book.amount,
                    publicationDate: book.publicationDate,
                    category: JSON.stringify(book.category)
                }}
                onSubmit={saveBook}
                validationSchema={Yup.object(validateBook)}>
                <Form>
                    <div>
                        <label>Tiêu đề</label>
                        <Field name="title"/>
                        <ErrorMessage name="title" component="span"></ErrorMessage> <br></br>
                    </div>
                    <div>
                        <label>Số lượng</label>
                        <Field name="amount" type="number"/>
                        <ErrorMessage name="amount" component="span"></ErrorMessage> <br></br>
                    </div>
                    <div>
                        <label>Publication Date</label>
                        <Field name="publicationDate" type="date"/>
                        <ErrorMessage name="publicationDate" component="span"></ErrorMessage> <br></br>
                    </div>
                    <div>
                        <label>Category</label>
                        <Field as="select" name='category'>
                            <option value={JSON.stringify(category)}>{category.name}</option>
                            {category.map(category => (
                                <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="span"></ErrorMessage> <br></br>
                    </div>
                    <div>
                        <button type="submit">Cập nhật</button>
                    </div>
                    <div>
                        <button type="button" onClick={() => handleBack(navigate)}>Trở về</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default UpdateBook;
