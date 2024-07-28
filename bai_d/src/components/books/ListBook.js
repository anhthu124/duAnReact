import React, {useEffect, useState} from "react";
import * as bookService from "../../service/BookService";
import {NavLink, useNavigate} from "react-router-dom";
import './css/BookList.css' ;
import {toast} from "react-toastify";
import ConfirmDelete from "./ConfirmDelete";
import * as categoryService from "../../service/CategoryService";


function ListBook() {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [publicationDate, setPublicationDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [category, setCategory] = useState("");
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getAll(searchTerm, publicationDate, endDate, category)
        getAllCategories()
    }, [])

    const getAll = async (title, publicationDate, endDate, category) => {
        const books = await bookService.getAllBooks(title, publicationDate, endDate, category);
        setBooks(books);
    };
    const getAllCategories = async () => {
        const categories = await categoryService.getALlCategory();
        setCategoryList(categories);
    }

    const handleDeleteBook = async (id) => {
        const success = await bookService.deleteBook(id);
        if (success) {
            setBooks(books.filter(book => book.id !== id));
            toast.success("Xóa thành công")
        } else {
            toast.error("Xóa thất bại")
        }
    };

    const handleUpdate = (selectedBook) => {
        setBook(selectedBook);
        navigate("/books/UpdateBook", {state: {book: selectedBook}});
    };
    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        let allBooks;
        if (category === " ") {
            allBooks = await bookService.getAllBooks(searchTerm, publicationDate, endDate);
        } else {
            allBooks = await bookService.getAllBooks(searchTerm, publicationDate, endDate, category);
        }
        setBooks(allBooks);
    };
    const confirmDeleteBook = (id) => {
        setBookToDelete(id);
        setShowConfirm(true);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setBookToDelete(null);
    };

    const deleteConfirmedBook = async () => {
        if (bookToDelete) {
            await handleDeleteBook(bookToDelete);
            setShowConfirm(false);
            setBookToDelete(null);
        }
    };
    // const filterBooksByDate = (books, startDate, endDate) => {
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);
    //
    //     return books.filter(book => {
    //         const publicationDate = new Date(book.publicationDate);
    //         return (!startDate || publicationDate >= start) && (!endDate || publicationDate <= end);
    //     });
    // };
    const handleChange = (event) => {
        const selectedValue = event.target.value;

        if (selectedValue !== " ") {
            try {
                const selectedCategory = JSON.parse(selectedValue);
                setCategory(selectedCategory);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            setCategory(" ");
        }
    };

    return (
        <div>
            <h1>List Of Books</h1>
            <form onSubmit={(e) => handleSearchSubmit(e)}>
                <label>Tiêu đề </label>
                <input
                    type="text"
                    placeholder="Tìm kiếm sách..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <br></br> <label>Ngày bắt đầu </label>
                <input
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                />
                <br></br> <label>Ngày kết thúc </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />
                <br></br> <label>Category </label>
                <select id="category" onChange={handleChange}>
                    <option value=" ">--All Category--</option>
                    {categoryList.map((category) => (
                        <option key={category.id} value={JSON.stringify(category)}>{category.name} </option>
                    ))}
                </select>
                <br></br><br></br>
                <button type="submit">Tìm kiếm</button>
            </form>
            <table>
                <thead>
                <tr>
                    <th>Tiêu đề</th>
                    <th>Số lượng</th>
                    <th>Ngày xuất bản</th>
                    <th>Thể loại</th>
                    <th>Tác vụ</th>
                </tr>
                </thead>
                <tbody>
                {
                    books.map((book) =>
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.amount}</td>
                            <td>{book.publicationDate}</td>
                            <td>{book.category.name}</td>
                            <td>
                                <button onClick={() => handleUpdate(book)}>
                                    <NavLink to="/books/UpdateBook">Cập nhật</NavLink>
                                </button>
                                <button onClick={() => confirmDeleteBook(book.id)}>Xóa</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showConfirm && (
                <ConfirmDelete
                    onConfirm={deleteConfirmedBook}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    )
}

export default ListBook;