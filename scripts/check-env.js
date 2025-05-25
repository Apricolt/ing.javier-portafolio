#!/usr/bin/env node

/**
 * Script para verificar las variables de entorno de EmailJS
 */

const fs = require('fs');
const path = require('path');

// Función para cargar variables de entorno desde .env.local
function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('📄 Contenido del archivo .env.local:');
    console.log(envContent);
    console.log('---');
    
    const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    
    lines.forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
        console.log(`✓ Cargada: ${key.trim()} = ${value}`);
      }
    });
    
    console.log('\n📄 Archivo .env.local encontrado y cargado\n');
  } else {
    console.log('❌ Archivo .env.local no encontrado\n');
  }
}

// Cargar variables de entorno
loadEnvLocal();

const requiredEnvVars = [
  'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
  'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID',
  'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'
];

console.log('🔍 Verificando variables de entorno de EmailJS...\n');

let allConfigured = true;
const results = {};

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  const isConfigured = Boolean(value && value.trim() !== '');
  
  results[varName] = {
    configured: isConfigured,
    value: isConfigured ? '✅ Configurada' : '❌ Falta'
  };
  
  if (!isConfigured) {
    allConfigured = false;
  }
});

// Mostrar resultados
requiredEnvVars.forEach(varName => {
  console.log(`${varName}: ${results[varName].value}`);
});

console.log('\n' + '='.repeat(50));

if (allConfigured) {
  console.log('✅ ¡Todas las variables de entorno están configuradas!');
  console.log('El formulario de contacto debería funcionar correctamente.');
} else {
  console.log('❌ Faltan variables de entorno.');
  console.log('\n📝 Para solucionarlo:');
  console.log('1. Crea un archivo .env.local en la raíz del proyecto');
  console.log('2. Agrega las variables faltantes con sus valores reales');
  console.log('3. Para despliegue, configura estas variables en tu plataforma');
  console.log('\n📖 Más información en: EMAILJS_CONFIG.md');
}

console.log('\n🌐 Entorno actual:', process.env.NODE_ENV || 'development');

// Salir con código de error si falta alguna variable
process.exit(allConfigured ? 0 : 1); 