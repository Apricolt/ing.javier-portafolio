# Configuración de EmailJS para el Formulario de Contacto

## Problema en Despliegue
El formulario no funciona en despliegue porque las variables de entorno no están configuradas.

## Variables de Entorno Requeridas

Necesitas configurar estas variables de entorno:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aquí
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_aquí
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aquí
```

## Cómo Obtener los Valores

1. Ve a [EmailJS](https://www.emailjs.com/)
2. Crea una cuenta gratuita o inicia sesión
3. En el dashboard:
   - **Service ID**: Ve a "Email Services" → selecciona tu servicio → copia el Service ID
   - **Template ID**: Ve a "Email Templates" → selecciona tu template → copia el Template ID
   - **Public Key**: Ve a "Account" → "API Keys" → copia la Public Key

## Configuración Local

1. Crea un archivo `.env.local` en la raíz del proyecto:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

## Configuración en Vercel (Despliegue)

1. Ve a tu proyecto en Vercel Dashboard
2. Ve a "Settings" → "Environment Variables"
3. Agrega cada variable:
   - Name: `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - Value: tu service ID real
   - Environment: Production (y Preview si quieres)
4. Repite para las otras dos variables
5. Redeploy tu aplicación

## Configuración en Netlify

1. Ve a tu sitio en Netlify Dashboard
2. Ve a "Site settings" → "Environment variables"
3. Agrega las tres variables con sus valores reales
4. Redeploy tu sitio

## Template de EmailJS Sugerido

En EmailJS, crea un template con este contenido:

```
Asunto: Nuevo mensaje desde tu Portfolio - {{from_name}}

Contenido:
Nuevo mensaje de contacto desde tu portfolio:

Nombre: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu formulario de contacto.
```

## Verificación

Después de configurar las variables:
1. Redeploy tu aplicación
2. Prueba el formulario en el sitio desplegado
3. Revisa la consola del navegador para errores 