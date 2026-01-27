#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envFiles = {
  production: '.env.production',
  local: '.env.local',
  development: '.env.development'
};

const args = process.argv.slice(2);
const environment = args[0];

if (!environment || !envFiles[environment]) {
  console.log('Usage: node switch-env.js [production|local|development]');
  console.log('');
  console.log('Available environments:');
  console.log('  production  - Use production API (Vercel)');
  console.log('  local       - Use local network IP');
  console.log('  development - Use localhost');
  console.log('');
  console.log('Examples:');
  console.log('  node switch-env.js production');
  console.log('  node switch-env.js local');
  console.log('  node switch-env.js development');
  process.exit(1);
}

const sourceFile = envFiles[environment];
const targetFile = '.env';

try {
  const content = fs.readFileSync(sourceFile, 'utf8');
  fs.writeFileSync(targetFile, content);
  
  console.log(`✅ Switched to ${environment} environment`);
  console.log(`📄 Copied ${sourceFile} to ${targetFile}`);
  console.log('');
  console.log('Current configuration:');
  console.log(content);
  
  if (environment === 'production') {
    console.log('🌐 Using production API: https://phong-production-backend.vercel.app');
  } else if (environment === 'local') {
    console.log('🏠 Using local network API');
  } else if (environment === 'development') {
    console.log('💻 Using localhost API');
  }
  
} catch (error) {
  console.error(`❌ Error switching environment: ${error.message}`);
  process.exit(1);
}