import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { NETWORK_IP, API_PORT, API_BASE_URL } from '../config'

// QR Code component using online service - Read only for mobile scanning
const QRCode = ({ value, size = 120 }) => {
    // Convert localhost URLs to network IP for mobile scanning
    let networkValue = value;
    if (value.includes('localhost:3002')) {
        networkValue = value.replace('localhost:3002', `${NETWORK_IP}:${API_PORT}`);
    }

    // Encode URL for QR code
    const encodedValue = encodeURIComponent(networkValue);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedValue}`;

    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <img
                src={qrUrl}
                alt="QR Code"
                style={{
                    width: size,
                    height: size,
                    border: '3px solid #007bff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,123,255,0.2)',
                    userSelect: 'none',
                    pointerEvents: 'none', // Prevent any click events
                    opacity: '1',
                    filter: 'none'
                }}
                title={`📱 Quét từ camera điện thoại (IP: ${NETWORK_IP})`}
                draggable="false"
            />
            {/* Invisible overlay to prevent any interaction */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: size,
                height: size,
                borderRadius: '8px',
                pointerEvents: 'none',
                backgroundColor: 'transparent'
            }} />
            {/* IP Address display */}
            <div style={{
                fontSize: '10px',
                color: '#666',
                marginTop: '5px',
                textAlign: 'center'
            }}>
                IP: {NETWORK_IP}:{API_PORT}
            </div>
        </div>
    );
};

export default function InsertUser() {
    const [userName, setUserName] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");
    const [deviceIP, setDeviceIP] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [qrVisible, setQrVisible] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate("");

    const setName = (e) => {
        setUserName(e.target.value);
    }

    const setCode = (e) => {
        setEmployeeCode(e.target.value);
    }

    const setIP = (e) => {
        setDeviceIP(e.target.value);
    }

    const addUser = async (e) => {
        e.preventDefault();

        if (!userName || !employeeCode) {
            setError("*Làm ơn nhập đầy đủ thông tin.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API_BASE_URL}/insertuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "UserName": userName,
                    "EmployeeCode": employeeCode,
                    "DeviceIP": deviceIP || null
                })
            });

            const data = await res.json();

            if (res.status === 201) {
                alert("Thêm người dùng thành công!");
                setUserId(data._id); // Store user ID for QR generation
                setQrVisible(true); // Show QR code for IP capture
                // Don't navigate yet, show QR for IP capture
            }
            else if (res.status === 422) {
                // Check if it's EmployeeCode or DeviceIP error
                if (data.includes("nhân viên")) {
                    setError("Mã số nhân viên đã tồn tại.");
                } else if (data.includes("IP")) {
                    setError("IP thiết bị đã được sử dụng bởi nhân viên khác.");
                } else {
                    setError(data);
                }
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

    const handleContinue = () => {
        navigate('/users');
    }

    return (
        <div className='container-fluid p-5'>
            <h1 className='text-center mb-5'>Thêm Người Dùng Mới</h1>

            {!qrVisible ? (
                <>
                    <div className="mt-4 row justify-content-center">
                        <div className="col-lg-5 col-md-5 col-12 fs-4 mb-4">
                            <label htmlFor="user_name" className="form-label fw-bold">Tên người dùng</label>
                            <input type="text" onChange={setName} value={userName} className="form-control fs-5" id="user_name" placeholder="Nhập tên người dùng" required />
                        </div>
                        <div className="col-lg-5 col-md-5 col-12 fs-4 mb-4">
                            <label htmlFor="employee_code" className="form-label fw-bold">Mã số nhân viên</label>
                            <input type="text" onChange={setCode} value={employeeCode} className="form-control fs-5" id="employee_code" placeholder="Nhập mã số nhân viên" required />
                        </div>
                        <div className="col-lg-5 col-md-5 col-12 fs-4 mb-4">
                            <label htmlFor="device_ip" className="form-label fw-bold">IP thiết bị <small className="text-muted">(tùy chọn)</small></label>
                            <input type="text" onChange={setIP} value={deviceIP} className="form-control fs-5" id="device_ip" placeholder="Nhập IP thiết bị hoặc để trống để quét QR" />
                            <small className="form-text text-muted">Bạn có thể để trống và quét QR sau để lưu IP thiết bị.</small>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center mt-4'>
                        <NavLink to="/users" className='btn btn-secondary me-4 fs-4 px-4 py-2'>Huỷ bỏ</NavLink>
                        <button type="submit" onClick={addUser} className="btn btn-primary fs-4 px-4 py-2" disabled={loading}>
                            {loading ? 'Đang thêm...' : 'Thêm người dùng'}
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        {error && <div className="text-danger fs-5 fw-bold">{error}</div>}
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <h3 className="mb-4 text-success">✅ Người dùng đã được tạo thành công!</h3>
                    <p className="mb-4">Bây giờ hãy quét mã QR dưới đây bằng camera điện thoại để lưu IP thiết bị:</p>

                    <div className="mb-4">
                        <QRCode
                            value={`${API_BASE_URL}/capture-user-ip/${userId}`}
                            size={150}
                        />
                        <div style={{
                            fontSize: '14px',
                            marginTop: '15px',
                            color: '#495057',
                            fontWeight: '500',
                            lineHeight: '1.4',
                            maxWidth: '400px',
                            margin: '15px auto 0'
                        }}>
                            📱 Quét mã QR này bằng camera điện thoại để tự động lưu IP thiết bị của bạn
                        </div>
                    </div>

                    <div className="alert alert-info mb-4" style={{ fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
                        <strong>Lưu ý:</strong> Đảm bảo điện thoại của bạn đang kết nối cùng mạng WiFi với máy tính này.
                        <br />IP hiện tại: <code>{NETWORK_IP}:{API_PORT}</code>
                    </div>

                    <div className='d-flex justify-content-center mt-4'>
                        <button onClick={() => setQrVisible(false)} className='btn btn-outline-secondary me-3 fs-5 px-4 py-2'>
                            ← Quay lại form
                        </button>
                        <button onClick={handleContinue} className="btn btn-success fs-5 px-4 py-2">
                            Tiếp tục đến danh sách →
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}