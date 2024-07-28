import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditProduct() {
    const [validationErrors, setValidationErrors] = useState({});
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const { id } = useParams(); // Assuming you're using a route parameter to get the product id

    useEffect(() => {
        // Fetch the existing product data
        async function fetchProduct() {
            try {
                const response = await fetch(`http://localhost:8080/product/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setProduct(data);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Unable to fetch the product data!'
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Unable to connect to the server!'
                });
            }
        }

        fetchProduct();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedProduct = Object.fromEntries(formData.entries());

        if (!updatedProduct.name ||  !updatedProduct.category || !updatedProduct.price) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please fill all the fields!'
            });
            return;
        }

        Swal.fire({
            icon: 'question',
            title: 'Do you want to update the product?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:8080/product/${id}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedProduct),
                    });
                    const data = await response.json();

                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Product updated successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/admin/product");
                    } else if (response.status === 400) {
                        setValidationErrors(data.errors);  // Assume 'data.errors' contains the validation errors from the backend
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Unable to update the product!'
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Unable to connect to the server!'
                    });
                }
            }
        });
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">chỉnh sửa sản phẩm </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Mã sản phẩm </label>
                            <div className="col-sm-8">
                                <input readOnly className="form-control" value={product.id || ""} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Tên sản phẩm </label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" defaultValue={product.name || ""} />
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>
                        </div>
                        {/*<div className="row mb-3">*/}
                        {/*    <label className="col-sm-4 col-form-label">Brand</label>*/}
                        {/*    <div className="col-sm-8">*/}
                        {/*        <input className="form-control" name="brand" defaultValue={product.brand || ""} />*/}
                        {/*        <span className="text-danger">{validationErrors.brand}</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Loại sản phẩm</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="category" defaultValue={product.category || ""}>
                                    <option value='Other'>Thể loại khác</option>
                                    <option value='Phones'>Quần áo mùa xuân</option>
                                    <option value='Computers'>Quần áo mùa hạ </option>
                                    <option value='Accessories'>Quần áo mùa thu</option>
                                    <option value='Printers'>Quần áo mùa Đông</option>
                                </select>
                                <span className="text-danger">{validationErrors.category}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Số lượng</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="price" type="number" step="0.01" min="1" defaultValue={product.price || ""} />
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>
                        {/*<div className="row mb-3">*/}
                        {/*    <label className="col-sm-4 col-form-label">Description</label>*/}
                        {/*    <div className="col-sm-8">*/}
                        {/*        <textarea className="form-control" name="description" defaultValue={product.description || ""} />*/}
                        {/*        <span className="text-danger">{validationErrors.description}</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*cmt ảnh*/}
                        {/*<div className="row mb-3">*/}
                        {/*    <label className="col-sm-4 col-form-label">Image</label>*/}
                        {/*    <div className="col-sm-8">*/}
                        {/*        <input className="form-control" name="imageFilename" defaultValue={product.imageFilename || ""} />*/}
                        {/*        <span className="text-danger">{validationErrors.imageFilename}</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Ngày nhập kho</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="createAt" type='date' defaultValue={product.createAt || ""} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to='/admin/product'>Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
