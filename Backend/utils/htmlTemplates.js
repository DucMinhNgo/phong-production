const { t } = require('../translations');

const generateHTML = (language, templateType, data = {}) => {
  const translate = (key, fallback) => t(language, key, fallback);

  const baseStyles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
        background-color: #f8f9fa;
        max-width: 400px;
        margin: 0 auto;
      }
      .container {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      .form-group {
        margin-bottom: 20px;
        text-align: left;
      }
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
      }
      input {
        width: 100%;
        padding: 12px;
        border: 2px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        box-sizing: border-box;
      }
      input:focus {
        border-color: #007bff;
        outline: none;
      }
      .button {
        background-color: #007bff;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        width: 100%;
        margin-top: 10px;
      }
      .button:hover {
        background-color: #0056b3;
      }
      .button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
      .success { color: #28a745; font-size: 20px; margin-bottom: 15px; }
      .error { color: #dc3545; font-size: 14px; margin-top: 10px; }
      .product-info {
        background-color: #e9ecef;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
        font-size: 14px;
      }
    </style>
  `;

  switch (templateType) {
    case 'deliveryForm':
      return `
        <html>
          <head>
            <title>${translate('Nhập số lượng giao đánh bóng')} - ${data.productName}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${baseStyles}
          </head>
          <body>
            <div class="container">
              <div class="success">🚛</div>
              <h2>${translate('Nhập số lượng giao đánh bóng')}</h2>
              <div class="product-info">
                <strong>${data.productName}</strong><br>
                ${translate('table.lotNumber')}: ${data.productBarcode}
              </div>
              ${data.userName ? `
              <div class="product-info" style="background-color: #d4edda; border: 1px solid #c3e6cb;">
                <strong>👤 ${translate('users.userName')}:</strong> ${data.userName}<br>
                <strong>🏷️ ${translate('form.employeeCode')}:</strong> ${data.employeeCode}
              </div>
              ` : ''}
              <form id="deliverForm">
                <div class="form-group">
                  <label for="quantity">${translate('Nhập số lượng giao đánh bóng')}:</label>
                  <input type="number" id="quantity" name="quantity" min="0" required placeholder="${translate('Nhập số lượng giao đánh bóng')}">
                </div>
                <button type="submit" class="button" id="submitBtn">${translate('form.submit')}</button>
              </form>
              <div id="message"></div>
            </div>
            <script>
              const form = document.getElementById('deliverForm');
              const submitBtn = document.getElementById('submitBtn');
              const messageDiv = document.getElementById('message');

              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const quantity = document.getElementById('quantity').value;

                if (!quantity || quantity < 0) {
                  messageDiv.innerHTML = '<div class="error">${translate('validation.quantityRequired')}</div>';
                  return;
                }

                submitBtn.disabled = true;
                submitBtn.textContent = '${translate('common.loading')}';

                try {
                  const response = await fetch('/update-delivery/${data.productId}?quantity=' + quantity, {
                    method: 'GET'
                  });

                  if (response.ok) {
                    messageDiv.innerHTML = '<div style="color: #28a745; font-size: 16px; margin-top: 15px;">✅ ${translate('success.productDelivered')}</div>';
                    setTimeout(() => {
                      window.close();
                    }, 2000);
                  } else {
                    throw new Error('${translate('error.serverError')}');
                  }
                } catch (error) {
                  messageDiv.innerHTML = '<div class="error">${translate('error.serverError')}</div>';
                  submitBtn.disabled = false;
                  submitBtn.textContent = '${translate('form.submit')}';
                }
              });
            </script>
          </body>
        </html>
      `;

    case 'receiveForm':
      return `
        <html>
          <head>
            <title>${translate('form.receivedQuantity')} - ${data.productName}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${baseStyles}
          </head>
          <body>
            <div class="container">
              <div class="success">📦</div>
              <h2>${translate('form.receivedQuantity')}</h2>
              <div class="product-info">
                <strong>${data.productName}</strong><br>
                ${translate('table.lotNumber')}: ${data.productBarcode}<br>
                ${translate('Nhập số lượng giao đánh bóng')}: ${data.shippingQuantity || translate('common.noData')}
              </div>
              ${data.userName ? `
              <div class="product-info" style="background-color: #d4edda; border: 1px solid #c3e6cb;">
                <strong>👤 ${translate('users.userName')}:</strong> ${data.userName}<br>
                <strong>🏷️ ${translate('form.employeeCode')}:</strong> ${data.employeeCode}
              </div>
              ` : ''}
              <form id="receiveForm">
                <div class="form-group">
                  <label for="quantity">${translate('form.receivedQuantity')}:</label>
                  <input type="number" id="quantity" name="quantity" min="0" required placeholder="${translate('form.receivedQuantity')}">
                </div>
                <button type="submit" class="button" id="submitBtn">${translate('form.submit')}</button>
              </form>
              <div id="message"></div>
            </div>
            <script>
              const form = document.getElementById('receiveForm');
              const submitBtn = document.getElementById('submitBtn');
              const messageDiv = document.getElementById('message');

              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const quantity = document.getElementById('quantity').value;

                if (!quantity || quantity < 0) {
                  messageDiv.innerHTML = '<div class="error">${translate('validation.quantityRequired')}</div>';
                  return;
                }

                submitBtn.disabled = true;
                submitBtn.textContent = '${translate('common.loading')}';

                try {
                  const response = await fetch(window.location.origin + '/update-received/${data.productId}?quantity=' + quantity, {
                    method: 'GET'
                  });

                  if (response.ok) {
                    messageDiv.innerHTML = '<div style="color: #28a745; font-size: 16px; margin-top: 15px;">✅ ${translate('success.productReceived')}</div>';
                    setTimeout(() => {
                      window.close();
                    }, 2000);
                  } else {
                    throw new Error('${translate('error.serverError')}');
                  }
                } catch (error) {
                  messageDiv.innerHTML = '<div class="error">${translate('error.serverError')}</div>';
                  submitBtn.disabled = false;
                  submitBtn.textContent = '${translate('form.submit')}';
                }
              });
            </script>
          </body>
        </html>
      `;

    case 'successPage':
      return `
        <html>
          <head>
            <title>${translate('common.success')}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                background-color: #f0f8ff;
              }
              .success {
                color: #28a745;
                font-size: 24px;
                margin-bottom: 20px;
              }
              .message {
                font-size: 18px;
                color: #333;
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body>
            <div class="success">✅</div>
            <div class="message">${data.message}</div>
            ${data.userInfo || ''}
          </body>
        </html>
      `;

    case 'createProductForm':
      return `
        <html>
          <head>
            <title>${translate('main.addNewProduct')}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${baseStyles}
            <style>
              body {
                background-color: #eff4ef;
              }
              .logo {
                color: #007bff;
                font-size: 24px;
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">📦</div>
              <h2>${translate('main.addNewProduct')}</h2>
              <form id="createProductForm">
                <div class="form-group">
                  <label for="productName">${translate('form.productName')}:</label>
                  <input type="text" id="productName" name="productName" required placeholder="${translate('form.productName')}">
                </div>
                <div class="form-group">
                  <label for="productBarcode">${translate('form.lotNumber')}:</label>
                  <input type="text" id="productBarcode" name="productBarcode" required placeholder="${translate('form.lotNumber')}" maxlength="20">
                </div>
                <button type="submit" class="button" id="submitBtn">${translate('form.submit')}</button>
              </form>
              <div id="message"></div>
            </div>

            <script>
              const form = document.getElementById('createProductForm');
              const submitBtn = document.getElementById('submitBtn');
              const messageDiv = document.getElementById('message');

              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const productName = document.getElementById('productName').value.trim();
                const productBarcode = document.getElementById('productBarcode').value.trim();

                if (!productName || !productBarcode) {
                  messageDiv.innerHTML = '<div class="error">${translate('validation.allFieldsRequired')}</div>';
                  return;
                }

                if (productBarcode.length > 20) {
                  messageDiv.innerHTML = '<div class="error">${translate('validation.lotNumberTooLong')}</div>';
                  return;
                }

                submitBtn.disabled = true;
                submitBtn.textContent = '${translate('common.loading')}';

                try {
                  const response = await fetch('/insertproduct', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept-Language': '${language}',
                      'X-Language': '${language}'
                    },
                    body: JSON.stringify({
                      ProductName: productName,
                      ProductBarcode: productBarcode
                    })
                  });

                  const data = await response.json();

                  if (response.status === 201) {
                    const successMessage = data.message || '${translate('success.productCreated')}';
                    messageDiv.innerHTML = '<div style="color: #28a745; font-size: 16px; margin-top: 15px;">✅ ' + successMessage + '</div>';
                    form.reset();
                    setTimeout(() => {
                      window.close();
                    }, 2000);
                  } else if (response.status === 422) {
                    const errorMessage = data.message || '${translate('error.duplicateEntry')}';
                    messageDiv.innerHTML = '<div class="error">' + errorMessage + '</div>';
                  } else {
                    const errorMessage = data.message || '${translate('error.serverError')}';
                    messageDiv.innerHTML = '<div class="error">' + errorMessage + '</div>';
                  }
                } catch (error) {
                  messageDiv.innerHTML = '<div class="error">${translate('error.serverError')}</div>';
                } finally {
                  submitBtn.disabled = false;
                  submitBtn.textContent = '${translate('form.submit')}';
                }
              });
            </script>
          </body>
        </html>
      `;

    case 'deviceRegistrationForm':
      return `
        <html>
          <head>
            <title>${translate('users.addNewUser')}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${baseStyles}
            <style>
              body {
                background-color: #e3f2fd;
              }
              .device-info {
                background-color: #f1f8e9;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                font-size: 12px;
                font-family: monospace;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success">👤</div>
              <h2>${translate('users.addNewUser')}</h2>
              
              <div class="device-info">
                <strong>Device ID:</strong> ${data.deviceId}<br>
                <strong>IP:</strong> ${data.ip}<br>
                <strong>Browser:</strong> ${data.browser}<br>
                <strong>OS:</strong> ${data.os}
              </div>
              
              <form id="registerForm">
                <div class="form-group">
                  <label for="userName">${translate('users.userName')}:</label>
                  <input type="text" id="userName" name="userName" required placeholder="${translate('users.userName')}">
                </div>
                <div class="form-group">
                  <label for="employeeCode">${translate('form.employeeCode', 'Mã nhân viên')}:</label>
                  <input type="text" id="employeeCode" name="employeeCode" required placeholder="${translate('form.employeeCode', 'Mã nhân viên')}">
                </div>
                <button type="submit" class="button" id="submitBtn">${translate('form.submit')}</button>
              </form>
              <div id="message"></div>
            </div>

            <script>
              const form = document.getElementById('registerForm');
              const submitBtn = document.getElementById('submitBtn');
              const messageDiv = document.getElementById('message');

              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const userName = document.getElementById('userName').value.trim();
                const employeeCode = document.getElementById('employeeCode').value.trim();

                if (!userName || !employeeCode) {
                  messageDiv.innerHTML = '<div class="error">${translate('validation.allFieldsRequired')}</div>';
                  return;
                }

                submitBtn.disabled = true;
                submitBtn.textContent = '${translate('common.loading')}';

                try {
                  const response = await fetch('/register-device', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept-Language': '${language}',
                      'X-Language': '${language}'
                    },
                    body: JSON.stringify({
                      userName: userName,
                      employeeCode: employeeCode
                    })
                  });

                  const data = await response.json();

                  if (response.ok) {
                    messageDiv.innerHTML = '<div style="color: #28a745; font-size: 16px; margin-top: 15px;">✅ ' + data.message + '</div>';
                    form.reset();
                    setTimeout(() => {
                      window.close();
                    }, 3000);
                  } else {
                    messageDiv.innerHTML = '<div class="error">' + data.message + '</div>';
                  }
                } catch (error) {
                  messageDiv.innerHTML = '<div class="error">${translate('error.serverError')}</div>';
                } finally {
                  submitBtn.disabled = false;
                  submitBtn.textContent = '${translate('form.submit')}';
                }
              });
            </script>
          </body>
        </html>
      `;

    case 'userRegistrationRequired':
      return `
        <html>
          <head>
            <title>${translate('auth.registrationRequired')}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${baseStyles}
            <style>
              body {
                background-color: #fff3cd;
              }
              .warning {
                color: #856404;
                font-size: 24px;
                margin-bottom: 20px;
              }
              .device-info {
                background-color: #f1f8e9;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                font-size: 12px;
                font-family: monospace;
              }
              .action-info {
                background-color: #e3f2fd;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                font-size: 14px;
                color: #1976d2;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="warning">⚠️</div>
              <h2>${translate('auth.registrationRequired')}</h2>
              
              <div class="action-info">
                <strong>${translate('auth.actionNotAllowed')}</strong><br>
                ${data.actionType === 'delivery' ? translate('auth.deliveryRequiresRegistration') : 
                  data.actionType === 'receive' ? translate('auth.receiveRequiresRegistration') :
                  data.actionType === 'assembling' ? 'Bạn cần đăng ký làm người dùng để có thể quét sản phẩm lắp ráp' :
                  'Bạn cần đăng ký làm người dùng để có thể quét sản phẩm nhập kho'}
              </div>
              
              <div class="device-info">
                <strong>Device ID:</strong> ${data.deviceInfo.deviceId}<br>
                <strong>IP:</strong> ${data.deviceInfo.ip}<br>
                <strong>Browser:</strong> ${data.deviceInfo.browser}<br>
                <strong>OS:</strong> ${data.deviceInfo.os}
              </div>
              
              <form id="registerForm">
                <div class="form-group">
                  <label for="userName">${translate('users.userName')}:</label>
                  <input type="text" id="userName" name="userName" required placeholder="${translate('users.userName')}">
                </div>
                <div class="form-group">
                  <label for="employeeCode">${translate('form.employeeCode')}:</label>
                  <input type="text" id="employeeCode" name="employeeCode" required placeholder="${translate('form.employeeCode')}">
                </div>
                <button type="submit" class="button" id="submitBtn">${translate('auth.registerAndContinue')}</button>
              </form>
              <div id="message"></div>
            </div>

            <script>
              const form = document.getElementById('registerForm');
              const submitBtn = document.getElementById('submitBtn');
              const messageDiv = document.getElementById('message');

              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const userName = document.getElementById('userName').value.trim();
                const employeeCode = document.getElementById('employeeCode').value.trim();

                if (!userName || !employeeCode) {
                  messageDiv.innerHTML = '<div class="error">${translate('validation.allFieldsRequired')}</div>';
                  return;
                }

                submitBtn.disabled = true;
                submitBtn.textContent = '${translate('common.loading')}';

                try {
                  const response = await fetch('/register-device', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept-Language': '${language}',
                      'X-Language': '${language}'
                    },
                    body: JSON.stringify({
                      userName: userName,
                      employeeCode: employeeCode
                    })
                  });

                  const data = await response.json();

                  if (response.ok) {
                    messageDiv.innerHTML = '<div style="color: #28a745; font-size: 16px; margin-top: 15px;">✅ ' + data.message + '</div>';
                    setTimeout(() => {
                      // Redirect to original URL after successful registration
                      window.location.href = '${data.redirectUrl}';
                    }, 2000);
                  } else {
                    messageDiv.innerHTML = '<div class="error">' + data.message + '</div>';
                  }
                } catch (error) {
                  messageDiv.innerHTML = '<div class="error">${translate('error.serverError')}</div>';
                } finally {
                  submitBtn.disabled = false;
                  submitBtn.textContent = '${translate('auth.registerAndContinue')}';
                }
              });
            </script>
          </body>
        </html>
      `;

    case 'assemblingForm':
      return `
        <html>
          <head>
            <title>${translate('form.assemblingQuantity')} - ${data.productName}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${baseStyles}
          </head>
          <body>
            <div class="container">
              <div class="success">🔧</div>
              <h2>${translate('form.assemblingQuantity')}</h2>
              <div class="product-info">
                <strong>${data.productName}</strong><br>
                ${translate('table.lotNumber')}: ${data.productBarcode}<br>
                ${translate('form.receivedQuantity')}: ${data.receivedQuantity || translate('common.noData')}
              </div>
              ${data.userName ? `
              <div class="product-info" style="background-color: #d4edda; border: 1px solid #c3e6cb;">
                <strong>👤 ${translate('users.userName')}:</strong> ${data.userName}<br>
                <strong>🏷️ ${translate('form.employeeCode')}:</strong> ${data.employeeCode}
              </div>
              ` : ''}
              <form id="assemblingForm">
                <div class="form-group">
                  <label for="quantity">${translate('form.assemblingQuantity')}:</label>
                  <input type="number" id="quantity" name="quantity" min="0" required placeholder="${translate('form.assemblingQuantity')}">
                </div>
                <button type="submit" class="button" id="submitBtn">${translate('form.submit')}</button>
              </form>
              <div id="message"></div>
            </div>
            <script>
              const form = document.getElementById('assemblingForm');
              const submitBtn = document.getElementById('submitBtn');
              const messageDiv = document.getElementById('message');

              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const quantity = document.getElementById('quantity').value;

                if (!quantity || quantity < 0) {
                  messageDiv.innerHTML = '<div class="error">${translate('validation.quantityRequired')}</div>';
                  return;
                }

                submitBtn.disabled = true;
                submitBtn.textContent = '${translate('common.loading')}';

                try {
                  const response = await fetch(window.location.origin + '/update-assembling/${data.productId}?quantity=' + quantity, {
                    method: 'GET'
                  });

                  if (response.ok) {
                    messageDiv.innerHTML = '<div style="color: #28a745; font-size: 16px; margin-top: 15px;">✅ ${translate('success.productAssembled')}</div>';
                    setTimeout(() => {
                      window.close();
                    }, 2000);
                  } else {
                    const errorData = await response.text();
                    messageDiv.innerHTML = '<div class="error">' + errorData + '</div>';
                  }
                } catch (error) {
                  messageDiv.innerHTML = '<div class="error">${translate('error.serverError')}</div>';
                } finally {
                  submitBtn.disabled = false;
                  submitBtn.textContent = '${translate('form.submit')}';
                }
              });
            </script>
          </body>
        </html>
      `;

    case 'warehousingForm':
      return `
        <html>
          <head>
            <title>${translate('form.warehousingQuantity')} - ${data.productName}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${baseStyles}
          </head>
          <body>
            <div class="container">
              <div class="success">📦</div>
              <h2>${translate('form.warehousingQuantity')}</h2>
              <div class="product-info">
                <strong>${data.productName}</strong><br>
                ${translate('table.lotNumber')}: ${data.productBarcode}<br>
                ${translate('form.assemblingQuantity')}: ${data.assemblingQuantity || translate('common.noData')}
              </div>
              ${data.userName ? `
              <div class="product-info" style="background-color: #d4edda; border: 1px solid #c3e6cb;">
                <strong>👤 ${translate('users.userName')}:</strong> ${data.userName}<br>
                <strong>🏷️ ${translate('form.employeeCode')}:</strong> ${data.employeeCode}
              </div>
              ` : ''}
              <form id="warehousingForm">
                <div class="form-group">
                  <label for="quantity">${translate('form.warehousingQuantity')}:</label>
                  <input type="number" id="quantity" name="quantity" min="0" required placeholder="${translate('form.warehousingQuantity')}">
                </div>
                <button type="submit" class="button" id="submitBtn">${translate('form.submit')}</button>
              </form>
              <div id="message"></div>
            </div>
            <script>
              const form = document.getElementById('warehousingForm');
              const submitBtn = document.getElementById('submitBtn');
              const messageDiv = document.getElementById('message');

              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const quantity = document.getElementById('quantity').value;

                if (!quantity || quantity < 0) {
                  messageDiv.innerHTML = '<div class="error">${translate('validation.quantityRequired')}</div>';
                  return;
                }

                submitBtn.disabled = true;
                submitBtn.textContent = '${translate('common.loading')}';

                try {
                  const response = await fetch(window.location.origin + '/update-warehousing/${data.productId}?quantity=' + quantity, {
                    method: 'GET'
                  });

                  if (response.ok) {
                    messageDiv.innerHTML = '<div style="color: #28a745; font-size: 16px; margin-top: 15px;">✅ ${translate('success.productWarehoused')}</div>';
                    setTimeout(() => {
                      window.close();
                    }, 2000);
                  } else {
                    const errorData = await response.text();
                    messageDiv.innerHTML = '<div class="error">' + errorData + '</div>';
                  }
                } catch (error) {
                  messageDiv.innerHTML = '<div class="error">${translate('error.serverError')}</div>';
                } finally {
                  submitBtn.disabled = false;
                  submitBtn.textContent = '${translate('form.submit')}';
                }
              });
            </script>
          </body>
        </html>
      `;

    case 'countdownPage':
      return `
        <html>
          <head>
            <title>⏰ Đếm ngược thời gian chờ</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .container {
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.1);
                max-width: 500px;
                width: 90%;
              }
              .icon {
                font-size: 60px;
                margin-bottom: 20px;
              }
              .title {
                font-size: 24px;
                color: #333;
                margin-bottom: 30px;
                font-weight: 600;
              }
              .countdown {
                font-size: 72px;
                font-weight: bold;
                color: #007bff;
                margin: 30px 0;
                font-family: 'Courier New', monospace;
                text-shadow: 2px 2px 4px rgba(0,123,255,0.3);
                transition: all 0.3s ease;
              }
              .countdown.warning {
                color: #ffc107;
                text-shadow: 2px 2px 4px rgba(255,193,7,0.3);
              }
              .countdown.danger {
                color: #dc3545;
                text-shadow: 2px 2px 4px rgba(220,53,69,0.3);
                animation: pulse 0.5s infinite;
              }
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
              }
              .unit {
                font-size: 18px;
                color: #666;
                margin-top: 10px;
                font-weight: 500;
              }
              .progress-bar {
                width: 100%;
                height: 8px;
                background-color: #e9ecef;
                border-radius: 4px;
                margin: 20px 0;
                overflow: hidden;
              }
              .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #28a745, #ffc107, #dc3545);
                border-radius: 4px;
                transition: width 1s ease;
              }
              .info {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                margin-top: 20px;
                font-size: 14px;
                color: #666;
              }
              .skip-btn {
                background-color: #6c757d;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                margin-top: 20px;
                transition: background-color 0.3s ease;
              }
              .skip-btn:hover {
                background-color: #5a6268;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon">⏰</div>
              <div class="title">${data.message}</div>

              <div class="progress-bar">
                <div class="progress-fill" id="progressFill" style="width: 0%"></div>
              </div>

              <div class="countdown" id="countdown">${data.remainingSeconds}</div>
              <div class="unit" id="unitLabel">${data.remainingSeconds === 1 ? 'giây' : 'giây'}</div>

              <div class="info">
                <strong>Thông tin sản phẩm:</strong><br>
                ${data.productName}<br>
                <strong>Bước tiếp theo:</strong> ${data.nextStep}<br>
                <strong>Thời gian chờ tối thiểu:</strong> ${data.minimumMinutes} phút
              </div>

              <button class="skip-btn" onclick="skipCountdown()">Bỏ qua đếm ngược</button>
            </div>

            <script>
              let remainingTime = ${data.remainingSeconds};
              const totalTime = ${data.totalSeconds};
              const countdownElement = document.getElementById('countdown');
              const unitElement = document.getElementById('unitLabel');
              const progressFill = document.getElementById('progressFill');

              function updateDisplay() {
                const minutes = Math.floor(remainingTime / 60);
                const seconds = remainingTime % 60;

                // Hiển thị theo giây khi dưới 1 phút
                if (remainingTime < 60) {
                  countdownElement.textContent = remainingTime;
                  unitElement.textContent = remainingTime === 1 ? 'giây' : 'giây';

                  // Thay đổi màu sắc khi còn ít thời gian
                  countdownElement.className = 'countdown';
                  if (remainingTime <= 10) {
                    countdownElement.classList.add('danger');
                  } else if (remainingTime <= 30) {
                    countdownElement.classList.add('warning');
                  }
                } else {
                  countdownElement.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
                  unitElement.textContent = 'phút';
                  countdownElement.className = 'countdown';
                }

                // Cập nhật progress bar
                const progressPercent = ((totalTime - remainingTime) / totalTime) * 100;
                progressFill.style.width = progressPercent + '%';

                remainingTime--;

                if (remainingTime < 0) {
                  // Thời gian đã hết, chuyển sang bước tiếp theo
                  window.location.href = '${data.nextUrl}';
                }
              }

              function skipCountdown() {
                if (confirm('Bạn có chắc muốn bỏ qua thời gian chờ?')) {
                  window.location.href = '${data.nextUrl}';
                }
              }

              // Cập nhật mỗi giây
              setInterval(updateDisplay, 1000);

              // Cập nhật ngay lập tức
              updateDisplay();
            </script>
          </body>
        </html>
      `;

    case 'errorPage':
      return `
        <html>
          <head>
            <title>${translate('messages.error')}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                background-color: #ffebee;
              }
              .error {
                color: #dc3545;
                font-size: 24px;
                margin-bottom: 20px;
              }
              .message {
                font-size: 18px;
                color: #333;
                margin-bottom: 30px;
              }
            </style>
          </head>
          <body>
            <div class="error">❌</div>
            <div class="message">${data.message}</div>
          </body>
        </html>
      `;

    default:
      return `
        <html>
          <head>
            <title>Template not found</title>
            <meta charset="UTF-8">
          </head>
          <body>
            <h1>Template not found</h1>
          </body>
        </html>
      `;
  }
};

module.exports = { generateHTML };