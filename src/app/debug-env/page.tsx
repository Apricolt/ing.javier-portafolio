"use client";

import Link from "next/link";

export default function DebugEnv() {
  const vars = {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Debug Variables de Entorno</h1>
      
      <div className="space-y-4">
        {Object.entries(vars).map(([key, value]) => (
          <div key={key} className="p-4 bg-gray-800 rounded-lg">
            <div className="font-mono text-sm">
              <span className="text-blue-400">{key}:</span>{" "}
              <span className={value ? "text-green-400" : "text-red-400"}>
                {value || "❌ NO CONFIGURADA"}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Estado:</h2>
        <div className={`text-lg font-semibold ${
          Object.values(vars).every(v => v) ? "text-green-400" : "text-red-400"
        }`}>
          {Object.values(vars).every(v => v) 
            ? "✅ Todas las variables configuradas" 
            : "❌ Faltan variables de entorno"
          }
        </div>
      </div>
      
      <div className="mt-8">
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Volver al Portfolio
        </Link>
      </div>
    </div>
  );
} 