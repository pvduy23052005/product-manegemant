# Dự Án Website Thương Mại Điện Tử Mini

Một ứng dụng web được xây dựng bằng **Node.js**, **Express.js**, và **Pug** , Dự án bao gồm đầy đủ các luồng chức năng cho người dùng (Client) và quản trị viên (Admin), tích hợp upload ảnh lên Cloud và xác thực qua Email.

## Công Nghệ Sử Dụng

* **Backend:** Node.js, Express.js
* **Frontend (SSR):** Pug Template Engine, Bootstrap 5
* **Cơ sở dữ liệu:** MongoDB (sử dụng Mongoose)
* **Lưu trữ ảnh:** Cloudinary
* **Xác thực:** Cookie/Session
* **Tiện ích:** Nodemailer (Gửi email xác nhận đơn hàng/OTP)

##  Tính Năng Chính

Dựa trên danh sách phát triển, dự án bao gồm các chức năng sau:

###  Phía Khách Hàng (Client)
* **Tài khoản & Bảo mật:**
    * Đăng ký & Đăng nhập tài khoản.
    * Đăng xuất an toàn.
    * **Quên mật khẩu:** Quy trình gửi mã OTP về email để đổi mật khẩu mới.
* **Hiển thị sản phẩm:**
    * Trang chủ: Hiển thị sản phẩm nổi bật.
    * Danh mục: Xem sản phẩm theo từng danh mục.
    * Tìm kiếm: Tìm kiếm sản phẩm theo từ khóa.
    * Chi tiết: Xem thông tin chi tiết của từng sản phẩm.
* **Giỏ hàng (Cart):**
    * Thêm sản phẩm vào giỏ hàng.
    * Cập nhật số lượng sản phẩm.
    * Xóa sản phẩm khỏi giỏ.
    * Tính tổng tiền đơn hàng.
    * Thanh toán đơn hàng (Checkout).

### Phía Quản Trị (Admin)
* **Bảo mật & Phân quyền:**
    * Đăng nhập trang quản trị.
    * **Private Routes:** Middleware bảo vệ các route admin, ngăn chặn truy cập trái phép.
* **Quản lý sản phẩm:**
    * Thêm mới, Xem, Sửa, Xóa sản phẩm (CRUD).
    * Upload ảnh trực tiếp lên Cloudinary.
* **Quản lý tài khoản:**
    * Xem danh sách tài khoản.
    * Tạo tài khoản mới từ trang admin.
* **Theo dõi hoạt động (Audit Log):**
    * Ghi nhận lịch sử: "Thêm bởi ai", "Cập nhật bởi ai", "Xóa bởi ai" (giúp quản lý trách nhiệm nhân sự).

## Hướng Dẫn Cài Đặt (Cách Truyền Thống)

Yêu cầu máy tính đã cài đặt Node.js và MongoDB.

1.  **Clone dự án về máy**
    ```bash
    git clone [https://github.com/pvduy23052005/product-management.git](https://github.com/pvduy23052005/product-management.git)
    cd product-management
    ```

2.  **Cài đặt thư viện**
    ```bash
    npm install
    ```

3.  **Cấu hình biến môi trường (.env)**
    Tạo file `.env` tại thư mục gốc và điền thông tin:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/ten_database_cua_ban
    
    # Cloudinary
    CLOUD_NAME=xxx
    CLOUD_KEY=xxx
    CLOUD_SECRET=xxx

    # Email
    EMAIL_USER=xxx@gmail.com
    EMAIL_PASS=xxx

    # Session
    SESSION_SECRET=secret_key
    ```

4.  **Chạy dự án**
    ```bash
    npm start
    # Hoặc chế độ dev: npm run dev
    ```
5.  **Truy cập**
    * Client: `http://localhost:5555` .
    * Addmin: `http://localhost:5555/admin/dashboard` .


## Cấu Trúc Thư Mục

```text
├── public/           # File tĩnh (CSS, JS, Images)
├── views/            # Giao diện (Pug Templates)
├── routes/           # Định tuyến (Client & Admin)
├── controllers/      # Logic xử lý (Product, Cart, Order)
├── models/           # Schema MongoDB (Product, Order, User)
├── middlewares/      # Auth, Upload, Validation
├── config/           # Config Database, Cloudinary
├── .env              # Biến môi trường
└── index.js          # Entry point
