import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import * as bookService from "../../service/BookService";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './css/BookForm.css';
import * as categoryService from "../../service/CategoryService";


function CreateBook() {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        getAllCategories()
    }, [])
    const book = {
        id: "",
        title: "",
        amount: "",
        publicationDate: "",
        category: ""
    }
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
        value.amount = +value.amount
        value.category = JSON.parse(value.category)
        await bookService.saveBook(value)
        toast.success("Thêm mới thành công")
        navigate("/books")
    }
    const handleBack = (navigate) => {
        navigate('/books');
    };

    return (
        <div className="update-book-container">
            <Formik initialValues={book} onSubmit={saveBook} validationSchema={Yup.object(validateBook)}>
                <Form>
                    <h1>Thêm mới sách</h1>
                    <div>
                        <label>ID:</label>
                        <Field name="id"></Field>
                        <ErrorMessage name="id" component="span"></ErrorMessage> <br></br>
                    </div>
                    <div>
                        <label>Title</label>
                        <Field name="title"></Field>
                        <ErrorMessage name="title" component="span"></ErrorMessage> <br></br>
                    </div>
                    <div>
                        <label>Amount</label>
                        <Field name="amount"></Field><br></br>
                        <ErrorMessage name="amount" component="span"></ErrorMessage> <br></br>
                    </div>
                    <div>
                        <label>Publication Date</label>
                        <Field name="publicationDate" component="input" type="date"/>
                        <ErrorMessage name="publicationDate" component="span"></ErrorMessage> <br></br>
                    </div>
                    <div>
                        <label>Category</label>
                        <Field as="select" name='category'>
                            <option value="">--Choose category--</option>
                            {category.map(category => (
                                <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="span"></ErrorMessage> <br></br>
                    </div>
                    <div>
                        <button type="submit">Thêm mới</button>
                    </div>
                    <div>
                        <button type="button" onClick={() => handleBack(navigate)}>Trở về</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateBook;