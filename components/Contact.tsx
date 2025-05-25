"use client";

import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'config-error'>('idle');

  // Función para validar email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para validar el formulario
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    return newErrors;
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo si existe
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Resetear status si había un error previo
    if (submitStatus === 'error' || submitStatus === 'config-error') {
      setSubmitStatus('idle');
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Configuración de EmailJS
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Verificar que las variables de entorno estén configuradas
      if (!serviceId || !templateId || !publicKey) {
        console.error('Variables de entorno de EmailJS no configuradas');
        console.error('Service ID:', serviceId ? 'Configurado' : 'FALTA');
        console.error('Template ID:', templateId ? 'Configurado' : 'FALTA');
        console.error('Public Key:', publicKey ? 'Configurado' : 'FALTA');
        setSubmitStatus('config-error');
        return;
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Javier',
        reply_to: formData.email,
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email enviado exitosamente:', response);
      setSubmitStatus('success');
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('Error al enviar email:', error);
      
      if (process.env.NODE_ENV === 'development') {
        console.error('Detalles del error:', {
          serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'OK' : 'FALTA',
          templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? 'OK' : 'FALTA',
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'OK' : 'FALTA'
        });
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto m-60" aria-label="Formulario de contacto">
      <header className="text-center m-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Contáctame
        </h2>
      </header>

      <article className="max-w-2xl mx-auto">

        {submitStatus === 'success' && (
          <aside className="mb-6 p-4 rounded-lg bg-[#3a1f69] text-white text-center" role="alert">
            ¡Mensaje enviado exitosamente! Te responderé pronto.
          </aside>
        )}
        
        {submitStatus === 'error' && (
          <aside className="mb-6 p-4 rounded-lg bg-red-600 text-white text-center" role="alert">
            Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
          </aside>
        )}

        {submitStatus === 'config-error' && (
          <aside className="mb-6 p-4 rounded-lg bg-orange-600 text-white text-center" role="alert">
            <div className="mb-2 font-medium">⚠️ Configuración Incompleta</div>
            <div className="text-sm">
              El formulario no está configurado correctamente. 
            </div>
          </aside>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} aria-label="Formulario de contacto" noValidate>
          <fieldset className="space-y-6" disabled={isSubmitting}>
            <div>
              <label htmlFor="name" className="block text-white mb-2">
                Nombre <span className="text-red-400" aria-label="campo requerido">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg bg-[#2d1b4d] text-white border transition-all duration-300 
                  placeholder:text-gray-400
                  [&:-webkit-autofill]:!bg-[#2d1b4d] [&:-webkit-autofill]:!text-white [&:-webkit-autofill]:!shadow-[inset_0_0_0px_1000px_#2d1b4d] [&:-webkit-autofill]:!border-purple-500
                  [&:-webkit-autofill:hover]:!bg-[#2d1b4d] [&:-webkit-autofill:hover]:!text-white [&:-webkit-autofill:hover]:!shadow-[inset_0_0_0px_1000px_#2d1b4d]
                  [&:-webkit-autofill:focus]:!bg-[#2d1b4d] [&:-webkit-autofill:focus]:!text-white [&:-webkit-autofill:focus]:!shadow-[inset_0_0_0px_1000px_#2d1b4d]
                  [&:-webkit-autofill:active]:!bg-[#2d1b4d] [&:-webkit-autofill:active]:!text-white [&:-webkit-autofill:active]:!shadow-[inset_0_0_0px_1000px_#2d1b4d]
                  [&:-webkit-autofill::selection]:!bg-purple-600 [&:-webkit-autofill::selection]:!text-white
                  ${errors.name 
                    ? 'border-red-500 focus:ring-2 focus:ring-red-600' 
                    : 'border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600'
                }`}
                placeholder="Tu nombre"
                required
                autoComplete="name"
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-red-400 text-sm" role="alert">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Email <span className="text-red-400" aria-label="campo requerido">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg bg-[#2d1b4d] text-white border transition-all duration-300 
                  placeholder:text-gray-400
                  [&:-webkit-autofill]:!bg-[#2d1b4d] [&:-webkit-autofill]:!text-white [&:-webkit-autofill]:!shadow-[inset_0_0_0px_1000px_#2d1b4d] [&:-webkit-autofill]:!border-purple-500
                  [&:-webkit-autofill:hover]:!bg-[#2d1b4d] [&:-webkit-autofill:hover]:!text-white [&:-webkit-autofill:hover]:!shadow-[inset_0_0_0px_1000px_#2d1b4d]
                  [&:-webkit-autofill:focus]:!bg-[#2d1b4d] [&:-webkit-autofill:focus]:!text-white [&:-webkit-autofill:focus]:!shadow-[inset_0_0_0px_1000px_#2d1b4d]
                  [&:-webkit-autofill:active]:!bg-[#2d1b4d] [&:-webkit-autofill:active]:!text-white [&:-webkit-autofill:active]:!shadow-[inset_0_0_0px_1000px_#2d1b4d]
                  [&:-webkit-autofill::selection]:!bg-purple-600 [&:-webkit-autofill::selection]:!text-white
                  ${errors.email 
                    ? 'border-red-500 focus:ring-2 focus:ring-red-600' 
                    : 'border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600'
                }`}
                placeholder="your@email.com"
                required
                autoComplete="email"
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-red-400 text-sm" role="alert">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white mb-2">
                Mensaje <span className="text-red-400" aria-label="campo requerido">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg bg-[#2d1b4d] text-white border transition-all duration-300 resize-none 
                  placeholder:text-gray-400
                  ${errors.message 
                    ? 'border-red-500 focus:ring-2 focus:ring-red-600' 
                    : 'border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600'
                }`}
                placeholder="Tu mensaje"
                required
                aria-describedby={errors.message ? "message-error" : undefined}
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-red-400 text-sm" role="alert">{errors.message}</p>
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`group w-full py-3 px-6 rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white text-lg font-medium relative overflow-hidden transform hover:scale-105 ${
              isSubmitting ? 'bg-gray-600 cursor-not-allowed' : ''
            }`}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </span>
            {!isSubmitting && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </button>
        </form>
      </article>
    </section>
  );
};

export default Contact; 