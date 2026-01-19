import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function InsertProduct() {
    const [productName, setProductName] = useState("");
    const [productBarcode, setProductBarcode] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setProductName(e.target.value);
    }

    const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };

    const addProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productBarcode) {
            setError("*Làm ơn nhập đầy đủ thông tin.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3001/insertproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "ProductName": productName, "ProductBarcode": productBarcode })
            });

            await res.json();

            if (res.status === 201) {
                alert("Thêm sản phẩm thành công!");
                setProductName("");
                setProductBarcode("");
                navigate('/products');
            }
            else if (res.status === 422) {
                alert("Sản phẩm với số hiệu lố này đã tồn tại.");
            }
            else {
                setError("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (err) {
            setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container-fluid p-5'>
             <h1 className='text-center mb-5'>Enter Product Information</h1>

            <div className="mt-4 row justify-content-center">
                <div className="col-lg-5 col-md-5 col-12 fs-4 mb-4">
                    <label htmlFor="product_name" className="form-label fw-bold">Tên hàng</label>
                    <input type="text" onChange={setName} value={productName} className="form-control fs-5" id="product_name" placeholder="Nhập tên hàng" required />
                </div>
                <div className="col-lg-5 col-md-5 col-12 fs-4 mb-4">
                    <label htmlFor="product_barcode" className="form-label fw-bold">Số hiệu lố</label>
                    <input type="number" onChange={setBarcode} value={productBarcode} maxLength={12} className="form-control fs-5" id="product_barcode" placeholder="Nhập số hiệu lố" required />
                </div>
            </div>

            <div className='d-flex justify-content-center mt-4'>
                <NavLink to="/products" className='btn btn-secondary me-4 fs-4 px-4 py-2'>Huỷ bỏ</NavLink>
                <button type="submit" onClick={addProduct} className="btn btn-primary fs-4 px-4 py-2" disabled={loading}>
                    {loading ? 'Đang thêm...' : 'Thêm'}
                </button>
            </div>

            <div className="text-center mt-4">
                {error && <div className="text-danger fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}
