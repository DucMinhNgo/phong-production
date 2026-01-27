import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { API_BASE_URL, NETWORK_IP, API_PORT } from '../config';

// QR Code component for product confirmation
const ProductQRCode = ({ value, size = 150 }) => {
    // Convert localhost URLs to network IP for mobile scanning
    let networkValue = value;
    if (value.includes('localhost:3002')) {
        networkValue = value.replace('localhost:3002', `${NETWORK_IP}:${API_PORT}`);
    }

    // Encode URL for QR code
    const encodedValue = encodeURIComponent(networkValue);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedValue}`;

    return (
        <div style={{ textAlign: 'center', position: 'relative', margin: '20px 0' }}>
            <img
                src={qrUrl}
                alt="QR Code xác nhận sản phẩm"
                style={{
                    width: size,
                    height: size,
                    border: '3px solid #28a745',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(40,167,69,0.2)',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    opacity: '1',
                    filter: 'none'
                }}
                title={`📱 Quét từ camera điện thoại để xác nhận (IP: ${NETWORK_IP})`}
                draggable="false"
            />
            <div style={{
                fontSize: '12px',
                color: '#666',
                marginTop: '10px',
                textAlign: 'center'
            }}>
                IP: {NETWORK_IP}:{API_PORT}
            </div>
            <div style={{
                fontSize: '14px',
                color: '#28a745',
                marginTop: '8px',
                fontWeight: '500'
            }}>
                {value.includes('create-product-form') ? 'Quét QR để tạo sản phẩm mới' : 'Quét QR để xác nhận'}
            </div>
        </div>
    );
};

export default function InsertProduct() {

    return (
        <div className='container-fluid p-5'>
            <h1 className='text-center mb-5'>Thêm mặt hàng mới
                <br />新規商品登録
            </h1>

            <div className="text-center">
                <div className="alert alert-info mb-4" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                    <strong>📱 Hướng dẫn tạo sản phẩm:</strong><br />
                    1. Quét QR code bên dưới bằng camera điện thoại<br />
                    2. Nhập thông tin sản phẩm trực tiếp từ điện thoại<br />
                    3. Sản phẩm sẽ được tạo ngay lập tức
                </div>

                <ProductQRCode value={`${API_BASE_URL}/create-product-form`} size={200} />

                <div style={{
                    fontSize: '16px',
                    color: '#007bff',
                    marginTop: '20px',
                    fontWeight: '500'
                }}>
                    📱 Quét từ camera điện thoại để tạo sản phẩm mới
                </div>
            </div>

            <div className='d-flex justify-content-center mt-5'>
                <NavLink to="/products" className='btn btn-secondary fs-4 px-4 py-2'>Quay lại danh sách</NavLink>
            </div>
        </div>
    )
}
