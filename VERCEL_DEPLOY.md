# Deploy Group 4 Frontend to Vercel

## Hướng dẫn deploy frontend lên Vercel kết nối với backend API

### Bước 1: Chuẩn bị
1. Đảm bảo đã commit tất cả thay đổi
2. Push code lên GitHub repository

### Bước 2: Deploy lên Vercel
1. Truy cập [Vercel](https://vercel.com)
2. Đăng nhập bằng GitHub account
3. Click "New Project"
4. Import repository: `nguyenhaphuongtan-dot/group-4--project`
5. Cấu hình như sau:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### Bước 3: Environment Variables
Trong Vercel dashboard, thêm các environment variables:
```
REACT_APP_API_URL=https://group4-backend-api.onrender.com
REACT_APP_API_BASE_URL=https://group4-backend-api.onrender.com/api
REACT_APP_ENV=production
```

### Bước 4: Custom Domain (Optional)
- Trong Vercel dashboard → Settings → Domains
- Thêm custom domain hoặc sử dụng domain mặc định: `*.vercel.app`

### Bước 5: Cấu hình CORS trên Backend
Đảm bảo backend API cho phép domain Vercel:
- Thêm Vercel domain vào CORS whitelist
- Cập nhật `FRONTEND_URL` trong backend environment

### API Endpoints đã được cấu hình:
- **Authentication**: Login, Register, Logout, Refresh Token
- **User Management**: Profile, Avatar, Password change
- **Admin**: User & Role management
- **Advanced**: Analytics, Logs, System info

### Files đã tạo:
- `vercel.json` - Cấu hình deploy Vercel
- `frontend/.env.production` - Environment cho production
- `frontend/.env.local` - Environment cho development
- `frontend/src/config/api.js` - API configuration
- `frontend/src/services/api.js` - API service layer

### Test Connection:
Sau khi deploy, test kết nối:
1. Kiểm tra network tab trong browser
2. Test API calls tới `https://group4-backend-api.onrender.com`
3. Verify authentication flow hoạt động

### Link dự kiến:
- **Frontend**: `https://group4-frontend-[random].vercel.app`
- **Backend**: `https://group4-backend-api.onrender.com`