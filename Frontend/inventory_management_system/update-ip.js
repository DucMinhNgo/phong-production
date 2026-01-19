#!/usr/bin/env node

/**
 * Script to update IP address in .env file
 * Usage: node update-ip.js [new-ip] [port]
 * Example: node update-ip.js 192.168.1.100 3001
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node update-ip.js [new-ip] [port]');
  console.log('Example: node update-ip.js 192.168.1.100 3001');
  process.exit(1);
}

const newIP = args[0];
const newPort = args[1] || '3001';

const envContent = `REACT_APP_NETWORK_IP=${newIP}
REACT_APP_API_PORT=${newPort}`;

try {
  fs.writeFileSync(envPath, envContent);
  console.log(`✅ Updated .env file:`);
  console.log(`   REACT_APP_NETWORK_IP=${newIP}`);
  console.log(`   REACT_APP_API_PORT=${newPort}`);
  console.log('\n🔄 Please restart the frontend server to apply changes.');
} catch (error) {
  console.error('❌ Error updating .env file:', error.message);
  process.exit(1);
}