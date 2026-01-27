# Hệ thống Đa ngôn ngữ (Internationalization - i18n)

## Tổng quan

Dự án này đã được tích hợp hệ thống đa ngôn ngữ hỗ trợ tiếng Việt và tiếng Nhật
cho cả frontend (React) và backend (Node.js/Express).

## Tính năng

### Frontend

- ✅ Hỗ trợ tiếng Việt và tiếng Nhật
- ✅ Chuyển đổi ngôn ngữ real-time
- ✅ Lưu trữ ngôn ngữ trong localStorage
- ✅ Context API để quản lý state
- ✅ CSS tùy chỉnh cho từng ngôn ngữ
- ✅ Component Language Switcher

### Backend

- ✅ Middleware translation
- ✅ API responses đa ngôn ngữ
- ✅ Hỗ trợ header Accept-Language
- ✅ QR form với đa ngôn ngữ

## Cấu trúc File

### Frontend

```
src/
├── contexts/
│   └── LanguageContext.js          # Context quản lý ngôn ngữ
├── translations/
│   ├── vi.js                       # Bản dịch tiếng Việt
│   ├── ja.js                       # Bản dịch tiếng Nhật
│   └── index.js                    # Export translations
├── components/
│   └── LanguageSwitcher.js         # Component chuyển đổi ngôn ngữ
├── i18n.css                        # CSS hỗ trợ đa ngôn ngữ
└── App.js                          # App với LanguageProvider
```

### Backend

```
Backend/
├── translations/
│   ├── vi.js                       # Bản dịch tiếng Việt
│   ├── ja.js                       # Bản dịch tiếng Nhật
│   └── index.js                    # Translation utilities
├── utils/
│   └── htmlTemplates.js            # HTML templates với i18n
└── Routes/
    └── router.js                   # Routes với translation middleware
```

## Cách sử dụng

### Frontend

#### 1. Sử dụng hook useLanguage

```javascript
import { useLanguage } from "../contexts/LanguageContext";

function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useLanguage();

  return (
    <div>
      <h1>{t("nav.title")}</h1>
      <button onClick={() => changeLanguage("ja")}>
        Switch to Japanese
      </button>
    </div>
  );
}
```

#### 2. Thêm bản dịch mới

Trong `src/translations/vi.js`:

```javascript
export const vi = {
  newSection: {
    title: "Tiêu đề mới",
    description: "Mô tả mới",
  },
};
```

Trong `src/translations/ja.js`:

```javascript
export const ja = {
  newSection: {
    title: "新しいタイトル",
    description: "新しい説明",
  },
};
```

#### 3. Sử dụng trong component

```javascript
const { t } = useLanguage();
return <h1>{t("newSection.title")}</h1>;
```

### Backend

#### 1. Sử dụng trong routes

```javascript
router.get("/api/example", (req, res) => {
  // req.t() đã có sẵn nhờ middleware
  res.json({
    message: req.t("success.dataRetrieved"),
    data: someData,
  });
});
```

#### 2. Thêm bản dịch mới

Trong `Backend/translations/vi.js`:

```javascript
module.exports = {
  newCategory: {
    message: "Thông báo mới",
  },
};
```

#### 3. Sử dụng với HTML templates

```javascript
const { generateHTML } = require("../utils/htmlTemplates");

router.get("/form/:id", (req, res) => {
  const html = generateHTML(req.language, "deliveryForm", {
    productName: "Sản phẩm A",
    productId: req.params.id,
  });
  res.send(html);
});
```

## API Endpoints với i18n

### Gửi ngôn ngữ từ client

1. **Header**: `Accept-Language: vi` hoặc `Accept-Language: ja`
2. **Query parameter**: `?lang=vi` hoặc `?lang=ja`

### Response format

```javascript
{
  "message": "Sản phẩm đã được tạo thành công", // Localized message
  "data": { ... }                               // Actual data
}
```

## Ngôn ngữ được hỗ trợ

| Mã ngôn ngữ | Tên ngôn ngữ | Flag |
| ----------- | ------------ | ---- |
| `vi`        | Tiếng Việt   | 🇻🇳   |
| `ja`        | 日本語       | 🇯🇵   |

## Thêm ngôn ngữ mới

### 1. Frontend

1. Tạo file `src/translations/[language_code].js`
2. Thêm vào `src/translations/index.js`:

```javascript
import { newLang } from "./newLang";

export const translations = {
  vi,
  ja,
  newLang, // Thêm ngôn ngữ mới
};

export const availableLanguages = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "newLang", name: "New Language", flag: "🏳️" }, // Thêm vào danh sách
];
```

### 2. Backend

1. Tạo file `Backend/translations/[language_code].js`
2. Thêm vào `Backend/translations/index.js`:

```javascript
const newLang = require("./newLang");

const translations = {
  vi,
  ja,
  newLang, // Thêm ngôn ngữ mới
};
```

## CSS và Styling

### Font families cho từng ngôn ngữ

```css
[lang="vi"] {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

[lang="ja"] {
  font-family: 'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'Meiryo', sans-serif;
}
```

### Responsive design

```css
@media (max-width: 768px) {
  [lang="ja"] {
    font-size: 0.9em;
  }
}
```

## Lưu ý quan trọng

1. **Fallback**: Nếu không tìm thấy bản dịch, hệ thống sẽ trả về key hoặc
   fallback text
2. **Default language**: Mặc định là tiếng Việt (`vi`)
3. **Storage**: Ngôn ngữ được lưu trong localStorage của browser
4. **QR Codes**: Các QR form sẽ tự động sử dụng ngôn ngữ hiện tại
5. **Real-time**: Chuyển đổi ngôn ngữ không cần reload trang

## Testing

### Kiểm tra frontend

1. Mở ứng dụng
2. Click vào Language Switcher ở navbar
3. Chọn ngôn ngữ khác
4. Kiểm tra tất cả text đã được dịch

### Kiểm tra backend

#### Sử dụng curl:
```bash
# Production API - Test với tiếng Việt
curl -H "X-Language: vi" https://phong-production-backend.vercel.app/products

# Production API - Test với tiếng Nhật
curl -H "X-Language: ja" https://phong-production-backend.vercel.app/products

# Local Development - Test với tiếng Việt
curl -H "X-Language: vi" http://localhost:3002/products
```

#### Sử dụng test script:
```bash
# Chạy script test tự động
node test-i18n-api.js
```

#### Kiểm tra QR forms:
```bash
# Test create product form với tiếng Việt
curl -H "X-Language: vi" "http://localhost:3002/create-product-form"

# Test create product form với tiếng Nhật
curl -H "X-Language: ja" "http://localhost:3002/create-product-form"

# Test delivery form với tiếng Việt
curl "http://localhost:3002/deliver-product/PRODUCT_ID?lang=vi"

# Test delivery form với tiếng Nhật
curl "http://localhost:3002/deliver-product/PRODUCT_ID?lang=ja"
```

#### Sử dụng QR forms test script:
```bash
# Chạy script test QR forms tự động
node test-qr-forms.js
```

## Troubleshooting

### Lỗi thường gặp

1. **Translation key không tìm thấy**: Kiểm tra key có tồn tại trong file
   translation
2. **Font không hiển thị đúng**: Kiểm tra CSS font-family cho ngôn ngữ đó
3. **LocalStorage không hoạt động**: Kiểm tra browser có hỗ trợ localStorage

### Debug

```javascript
// Trong component
const { t, currentLanguage } = useLanguage();
console.log("Current language:", currentLanguage);
console.log("Translation:", t("some.key"));
```

## Đóng góp

Khi thêm tính năng mới:

1. Luôn thêm translation cho cả tiếng Việt và tiếng Nhật
2. Test với cả hai ngôn ngữ
3. Cập nhật documentation nếu cần
4. Kiểm tra responsive design cho text dài

---

**Lưu ý**: Hệ thống này được thiết kế để dễ mở rộng và bảo trì. Mọi thay đổi nên
tuân theo pattern hiện tại để đảm bảo tính nhất quán.
