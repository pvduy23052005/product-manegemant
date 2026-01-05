# 1. Chọn Base Image (Môi trường nền: Node 18 bản nhẹ alpine)
FROM node:22-alpine

# 2. Tạo thư mục làm việc trong Container
WORKDIR /app

# 3. Copy file package.json trước (Để tận dụng cache của Docker)
COPY package*.json ./

# 4. Cài đặt các thư viện (dependencies)
RUN npm install

# 5. Copy toàn bộ code nguồn vào Container
COPY . .

# 6. Build TypeScript sang JavaScript (Nếu bạn dùng TS)
# Lưu ý: Trong package.json bạn cần có script "build": "tsc"

# 7. Mở port 5555 (Để bên ngoài truy cập được)
EXPOSE 5555

# 8. Lệnh chạy app khi container khởi động
# Lưu ý: Trong package.json script "start" nên là "node dist/index.js"
CMD ["npm", "start"]