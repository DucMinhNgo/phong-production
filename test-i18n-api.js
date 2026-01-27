const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'https://phong-production-backend.vercel.app';

async function testAPI() {
  console.log('🧪 Testing i18n API functionality...\n');

  console.log('📝 Test 1: Vietnamese API call');
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: {
        'Accept-Language': 'vi',
        'X-Language': 'vi'
      }
    });
    console.log('✅ Vietnamese response:', response.data.message);
    console.log('🔤 Language:', response.data.language);
  } catch (error) {
    console.log('❌ Vietnamese error:', error.response?.data?.message || error.message);
  }

  console.log('');

  console.log('📝 Test 2: Japanese API call');
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: {
        'Accept-Language': 'ja',
        'X-Language': 'ja'
      }
    });
    console.log('✅ Japanese response:', response.data.message);
    console.log('🔤 Language:', response.data.language);
  } catch (error) {
    console.log('❌ Japanese error:', error.response?.data?.message || error.message);
  }

  console.log('');

  console.log('📝 Test 3: Invalid language (should fallback to Vietnamese)');
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: {
        'Accept-Language': 'fr',
        'X-Language': 'fr'
      }
    });
    console.log('✅ Fallback response:', response.data.message);
    console.log('🔤 Language:', response.data.language);
  } catch (error) {
    console.log('❌ Fallback error:', error.response?.data?.message || error.message);
  }

  console.log('');

  console.log('📝 Test 4: No language header (should default to Vietnamese)');
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    console.log('✅ Default response:', response.data.message);
    console.log('🔤 Language:', response.data.language);
  } catch (error) {
    console.log('❌ Default error:', error.response?.data?.message || error.message);
  }

  console.log('\n🎉 i18n API testing completed!');
}

testAPI().catch(console.error);