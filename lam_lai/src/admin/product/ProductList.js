// import { Link, useLocation } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import Swal from 'sweetalert2';
// import './list.css';
//
// export default function ProductList() {
//     const [products, setProducts] = useState([]);
//     const location = useLocation();
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalItems, setTotalItems] = useState(0); // To keep track of total items
//     const [searchName, setSearchName] = useState("");
//     const [searchCategory, setSearchCategory] = useState("");
//     const [sortOrder, setSortOrder] = useState(""); // To keep track of sorting order
//     const itemsPerPage = 2;
//
//     const getProducts = async (page, name = "", category = "", sortOrder = "") => {
//         try {
//             const query = `?_sort=${sortOrder ? 'name' : 'id'}&_order=${sortOrder || 'desc'}&_page=${page}&_limit=${itemsPerPage}`
//                 + (name ? `&name_like=${name}` : "")
//                 + (category ? `&category_like=${category}` : "");
//
//             const response = await fetch(`http://localhost:4000/product${query}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 const total = response.headers.get('x-total-count'); // Get total count from headers
//                 setProducts(data);
//                 setTotalItems(parseInt(total));
//             } else {
//                 throw new Error("Failed to fetch products");
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Unable to get the data',
//             });
//         }
//     };
//
//     useEffect(() => {
//         getProducts(currentPage, searchName, searchCategory, sortOrder);
//     }, [location, currentPage, searchName, searchCategory, sortOrder]);
//
//     const deleteProduct = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:4000/product/${id}`, {
//                 method: "DELETE"
//             });
//             if (!response.ok) {
//                 throw new Error();
//             }
//             getProducts(currentPage, searchName, searchCategory, sortOrder);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Deleted!',
//                 text: 'The product has been deleted.',
//             });
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Unable to delete the product',
//             });
//         }
//     };
//
//     const confirmDelete = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 deleteProduct(id);
//             }
//         });
//     };
//
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };
//
//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };
//
//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };
//
//     const handleSearch = () => {
//         setCurrentPage(1); // Reset to the first page on search
//         getProducts(1, searchName, searchCategory, sortOrder);
//     };
//
//     const handleSort = () => {
//         const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
//         setSortOrder(newSortOrder);
//     };
//
//     return (
//         <div className="container my-4">
//             <h2 className="text-center mb-4">Products</h2>
//             <div className="row mb-3">
//                 <div className="col-md-4">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search by name"
//                         value={searchName}
//                         onChange={(e) => setSearchName(e.target.value)}
//                     />
//                 </div>
//                 <div className="col-md-4">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search by category"
//                         value={searchCategory}
//                         onChange={(e) => setSearchCategory(e.target.value)}
//                     />
//                 </div>
//                 <div className="col-md-4">
//                     <button className="btn btn-primary" onClick={handleSearch}>Search</button>
//                     <Link className="btn btn-primary ms-2" to="/admin/product/create" role="button">Create Product</Link>
//                 </div>
//             </div>
//             <table className="table">
//                 <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th onClick={handleSort} style={{ cursor: 'pointer' }}>
//                         Name {sortOrder && (sortOrder === "asc" ? "↑" : "↓")}
//                     </th>
//                     <th>Brand</th>
//                     <th>Category</th>
//                     <th>Price</th>
//                     <th>Description</th>
//                     <th>Image</th>
//                     <th>Create At</th>
//                     <th>Action</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {products.length > 0 ? (
//                     products.map((product, index) => (
//                         <tr key={index}>
//                             <td>{product.id}</td>
//                             <td>{product.name}</td>
//                             <td>{product.brand}</td>
//                             <td>{product.category}</td>
//                             <td>{product.price}$</td>
//                             <td>{product.description}</td>
//                             <td>{product.imageFilename}</td>
//                             <td>{product.createAt ? product.createAt.slice(0, 10) : 'N/A'}</td>
//                             <td style={{ width: "10px", whiteSpace: "nowrap" }}>
//                                 <a className="btn btn-primary btn-sm me-1" href={`/admin/product/edit/${product.id}`}>Edit</a>
//                                 <button type="button" className="btn btn-danger btn-sm" onClick={() => confirmDelete(product.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))
//                 ) : (
//                     <tr>
//                         <td colSpan="9" className="text-center">No products available</td>
//                     </tr>
//                 )}
//                 </tbody>
//             </table>
//             <div className="pagination">
//                 <button onClick={handlePreviousPage} className="btn btn-sm btn-outline-primary" disabled={currentPage === 1}>
//                     Previous
//                 </button>
//                 {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
//                     <button key={page} onClick={() => handlePageChange(page)} className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}>
//                         {page}
//                     </button>
//                 ))}
//                 <button onClick={handleNextPage} className="btn btn-sm btn-outline-primary" disabled={currentPage === totalPages}>
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// }
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import './list.css';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0); // To keep track of total items
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // To keep track of sorting order
    const itemsPerPage = 2;
//validate
    const getProducts = async (page, name = "", category = "", sortOrder = "") => {
        try {
            const query = `?_sort=${sortOrder ? 'name' : 'id'}&_order=${sortOrder || 'desc'}&_page=${page}&_limit=${itemsPerPage}`
                + (name ? `&name_like=${name}` : "")
                + (category ? `&category_like=${category}` : "");

            const response = await fetch(`http://localhost:8080/product${query}`);
            if (response.ok) {
                const data = await response.json();
                const total = response.headers.get('x-total-count'); // Get total count from headers
                setProducts(data);
                setTotalItems(parseInt(total));
            } else {
                throw new Error("Failed to fetch products");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Unable to get the data',
            });
        }
    };
//Hiển thị danh sách
    useEffect(() => {
        getProducts(currentPage, searchName, searchCategory, sortOrder);
    }, [location, currentPage, searchName, searchCategory, sortOrder]);
//Xóa
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/product/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error();
            }
            getProducts(currentPage, searchName, searchCategory, sortOrder);
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The product has been deleted.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Unable to delete the product',
            });
        }
    };
//Xóa
    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
            }
        });
    };
//Xem chi tiết
    const showDetails = (product) => {
        Swal.fire({
            title: `<strong>Chi tiết sản phẩm</strong>`,
            html:
                `<b>Tên sản phẩm:</b> ${product.name}<br/>` +
                // `<b>Brand:</b> ${product.brand}<br/>` +
                `<b>Loại sản phẩm:</b> ${product.category}<br/>` +
                `<b>Số lượng sản phẩm:</b> ${product.price}<br/>` +
                // `<b>Description:</b> ${product.description}<br/>` +
                // `<b>Image Filename:</b> ${product.imageFilename}<br/>` +
                `<b>Ngày nhập sản phâm </b> ${product.createAt ? product.createAt.slice(0, 10) : 'N/A'}`,
            showCloseButton: true,
            focusConfirm: false,
        });
    };
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
//Tìm kiếm
    const handleSearch = () => {
        setCurrentPage(1); // Reset to the first page on search
        getProducts(1, searchName, searchCategory, sortOrder);
    };
//sắp xếp
    const handleSort = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
    };
//  giao diện
    // tìm kiếm
    return (
        <div className="container my-4">
            <h2 className="text-center mb-4"> Hệ thống quản lý sản phẩm</h2>
            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo tên"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiến theo thể loại"
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary" onClick={handleSearch}>Tìm kiếm</button>
                    <Link className="btn btn-primary ms-2" to="/admin/product/create" role="button">Thêm mới sản phẩm</Link>
                </div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Mã sản phẩm  </th>
                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                        Tên sản phẩm {sortOrder && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    {/*<th>Brand</th>*/}
                    <th>Loại sản phẩm </th>
                    <th>số lượng sản phẩm {sortOrder && (sortOrder === "desc" ? "↓" :"↑")} </th>
                    {/*<th>Description</th>*/}
                    {/*<th>Image</th>*/}
                    <th>Ngày nhập sản phẩm </th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            {/*<td>{product.brand}</td>*/}
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            {/*<td>{product.description}</td>*/}
                            {/*<td>{product.imageFilename}</td>*/}
                            <td>{product.createAt ? product.createAt.slice(0, 10) : 'N/A'}</td>
                            <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                <button className="btn btn-info btn-sm me-1" onClick={() => showDetails(product)}>!</button>
                                <a className="btn btn-primary btn-sm me-1" href={`/admin/product/edit/${product.id}`}>Edit</a>
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => confirmDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" className="text-center">No products available</td>
                    </tr>
                )}
                </tbody>
            </table>
            {/*//Phân trang*/}
            <div className="pagination">
                <button onClick={handlePreviousPage} className="btn btn-sm btn-outline-primary" disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                    <button key={page} onClick={() => handlePageChange(page)} className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}>
                        {page}
                    </button>
                ))}
                <button onClick={handleNextPage} className="btn btn-sm btn-outline-primary" disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );

}