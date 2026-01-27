const axios = require('axios');
const fs = require('fs');

const API_BASE_URL = 'http://localhost:3002';

async function testQRForms() {
  console.log('🧪 Testing QR Forms with i18n...\n');

  console.log('📝 Test 1: Create Product Form - Vietnamese');
  try {
    const response = await axios.get(`${API_BASE_URL}/create-product-form`, {
      params: { lang: 'vi' },
      headers: {
        'Accept-Language': 'vi',
        'X-Language': 'vi'
      }
    });
    
    console.log('✅ Vietnamese form loaded successfully');
    console.log('📄 Content includes:', response.data.includes('Tạo sản phẩm mới') ? 'Vietnamese text ✓' : 'Missing Vietnamese text ✗');
    
    fs.writeFileSync('test-create-form-vi.html', response.data);
    console.log('💾 Saved to test-create-form-vi.html');
  } catch (error) {
    console.log('❌ Vietnamese form error:', error.response?.status || error.message);
  }

  console.log('');

  console.log('📝 Test 2: Create Product Form - Japanese');
  try {
    const response = await axios.get(`${API_BASE_URL}/create-product-form`, {
      params: { lang: 'ja' },
      headers: {
        'Accept-Language': 'ja',
        'X-Language': 'ja'
      }
    });
    
    console.log('✅ Japanese form loaded successfully');
    console.log('📄 Content includes:', response.data.includes('新規商品登録') ? 'Japanese text ✓' : 'Missing Japanese text ✗');
    
    fs.writeFileSync('test-create-form-ja.html', response.data);
    console.log('💾 Saved to test-create-form-ja.html');
  } catch (error) {
    console.log('❌ Japanese form error:', error.response?.status || error.message);
  }

  console.log('');

  console.log('📝 Test 3: Testing form language detection...');
  
  const testCases = [
    { lang: 'vi', name: 'Vietnamese', expectedText: 'Tạo sản phẩm mới' },
    { lang: 'ja', name: 'Japanese', expectedText: '新規商品登録' },
    { lang: 'fr', name: 'French (fallback)', expectedText: 'Tạo sản phẩm mới' },
  ];

  for (const testCase of testCases) {
    try {
      const response = await axios.get(`${API_BASE_URL}/create-product-form`, {
        headers: {
          'X-Language': testCase.lang
        }
      });
      
      const hasExpectedText = response.data.includes(testCase.expectedText);
      console.log(`${testCase.name}: ${hasExpectedText ? '✅' : '❌'} ${hasExpectedText ? 'Correct' : 'Incorrect'} language`);
      
    } catch (error) {
      console.log(`${testCase.name}: ❌ Error -`, error.response?.status || error.message);
    }
  }

  console.log('\n🎉 QR Forms i18n testing completed!');
  console.log('📁 Check the generated HTML files to inspect the forms manually.');
}

testQRForms().catch(console.error);