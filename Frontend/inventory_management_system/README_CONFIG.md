# Cấu hình Inventory Management System

## Thiết lập biến môi trường

### 1. Tạo file .env

Trong thư mục `Frontend/inventory_management_system/`, tạo file `.env`:

```env
REACT_APP_NETWORK_IP=192.168.0.7
REACT_APP_API_PORT=3002
```

**Lưu ý:** File `.env` sẽ bị git ignore, không được commit lên repository.

### 2. File .env đã được tạo sẵn

Hệ thống đã tạo sẵn file `.env` với giá trị mặc định. Bạn có thể chỉnh sửa trực tiếp file này hoặc copy từ `env-example.txt`:

```bash
cp env-example.txt .env
```

### 2. Thay đổi giá trị theo môi trường của bạn

- `REACT_APP_NETWORK_IP`: Địa chỉ IP của máy tính chạy backend server
- `REACT_APP_API_PORT`: Port của backend server (mặc định: 3002)

### 3. Ví dụ cho các môi trường khác nhau

**Máy tính cá nhân:**
```env
REACT_APP_NETWORK_IP=192.168.0.7
REACT_APP_API_PORT=3002
```

**Máy tính công ty:**
```env
REACT_APP_NETWORK_IP=10.0.0.50
REACT_APP_API_PORT=3002
```

**Server production:**
```env
REACT_APP_NETWORK_IP=your-server-ip
REACT_APP_API_PORT=3002
```

### 3. Sử dụng script cập nhật IP (khuyến nghị)

Sử dụng npm script để cập nhật IP một cách dễ dàng:

```bash
# Cập nhật IP và port
npm run update-ip 192.168.1.100 3002

# Chỉ cập nhật IP (port mặc định 3002)
npm run update-ip 192.168.1.100
```

Hoặc chạy trực tiếp script:

```bash
node update-ip.js 192.168.1.100 3002
```

### 4. Khởi động lại ứng dụng

Sau khi thay đổi file `.env`, cần khởi động lại frontend:

```bash
cd Frontend/inventory_management_system
npm start
```

### 5. Kiểm tra cấu hình

Mở Developer Console (F12) để kiểm tra IP được sử dụng trong QR codes.