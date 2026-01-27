import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { API_BASE_URL, NETWORK_IP, API_PORT } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

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
    const { t, currentLanguage } = useLanguage();

    return (
        <div className='container-fluid p-5'>
            <h1 className='text-center mb-5'>{t('main.addNewProduct')}</h1>

            <div className="text-center">
                <div className="alert alert-info mb-4" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                    <strong>📱 {t('main.qrInstructions')}</strong>
                </div>

                <ProductQRCode value={`${API_BASE_URL}/create-product-form?lang=${currentLanguage}`} size={200} />

                <div style={{
                    fontSize: '16px',
                    color: '#007bff',
                    marginTop: '20px',
                    fontWeight: '500'
                }}>
                    📱 {t('main.addNewProduct')}
                </div>
            </div>

            <div className='d-flex justify-content-center mt-5'>
                <NavLink to="/products" className='btn btn-secondary fs-4 px-4 py-2'>{t('common.goBack', 'Quay lại danh sách')}</NavLink>
            </div>
        </div>
    )
}
