module.exports = {
  apps: [{
    name: 'inventory-frontend',
    script: 'npx',
    args: 'serve -s build -l 3000',
    cwd: './Frontend/inventory_management_system',
    env: {
      NODE_ENV: 'production',
      REACT_APP_USE_PRODUCTION: 'true'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
};