import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CreateProduct() {
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const product = Object.fromEntries(formData.entries());

        // const name = {
        //     name: max(100, "Tên không được dài quá 100 ký tự")
        //         .matches(/^[A-Za-z ]{3,100}$/, "Tên không đúng định dạng. Ví dụ: Le A"),
        //
        // }
        // Custom validation for image filename
        // const imageFilename = formData.get('imageFilename');
        // if (imageFilename && !imageFilename.toLowerCase().endsWith('.jpg')) {
        //     setValidationErrors({ im
        //     ageFilename: 'Image must be a .jpg file' });
        //     return;
        // }
        const name = formData.get('name');
                // name: max(100, "Tên không được dài quá 100 ký tự")
        // if (name && !name.toLowerCase().startsWith('ab')) {
        //     setValidationErrors({ name: 'Name must be a AB' });
        //     return;
        // }

        // có ảnh
       // if (!product.name || !product.brand || !product.category || !product.price || !product.description || !product.imageFilename)
            if (!product.name || !product.category || !product.price  ) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please fill all the fields!'
            });
            return;
        }

        Swal.fire({
            icon: 'question',
            title: 'Do you want to create ?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch("http://localhost:8080/product", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(product),
                    });
                    const data = await response.json();

                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Product created successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/admin/product");
                    } else if (response.status === 400) {
                        setValidationErrors(data.errors);  // Assuming 'data.errors' contains validation errors
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Unable to create the product!'
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
                    <h2 className="text-center mb-5">Thêm mới sản phẩm</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Tên sản phẩm</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" />
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>
                        </div>
                        {/*<div className="row mb-3">*/}
                        {/*    <label className="col-sm-4 col-form-label">Brand</label>*/}
                        {/*    <div className="col-sm-8">*/}
                        {/*        <input className="form-control" name="brand" />*/}
                        {/*        <span className="text-danger">{validationErrors.brand}</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label"> Loại sản phẩm</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="category">
                                    <option value='Thể loại khác'>Thể loại khác</option>
                                    <option value='Quần áo mùa xuân'>Quần áo mùa xuân</option>
                                    <option value='Quần áo mùa hạ'>Quần áo mùa hạ</option>
                                    <option value='Quần áo mùa thu'>Quần áo mùa thu</option>
                                    <option value='Quần áo mùa Đông'>Quần áo mùa Đông</option>
                                </select>
                                <span className="text-danger">{validationErrors.category}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Số lượng sản phẩm </label>
                            <div className="col-sm-8">
                                <input className="form-control" name="price" type="number" step="0.01" min="1" />
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>
                        {/*<div className="row mb-3">*/}
                        {/*    <label className="col-sm-4 col-form-label">Description</label>*/}
                        {/*    <div className="col-sm-8">*/}
                        {/*        <textarea className="form-control" name="description" />*/}
                        {/*        <span className="text-danger">{validationErrors.description}</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*cột ảnh*/}
                        {/*<div className="row mb-3">*/}
                        {/*    <label className="col-sm-4 col-form-label">Image</label>*/}
                        {/*    <div className="col-sm-8">*/}
                        {/*        <input className="form-control" name="imageFilename" />*/}
                        {/*        <span className="text-danger">{validationErrors.imageFilename}</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Ngày nhập  </label>
                        <div className="col-sm-8">
                            <input className="form-control" type='date' name="createAt" />
                            <span className="text-danger">{validationErrors.createAt}</span>
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
