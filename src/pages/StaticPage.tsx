/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Send, CheckCircle, Mail, MapPin, AlertCircle } from 'lucide-react';
import AdSensePlaceholder from '../components/AdSensePlaceholder';

interface StaticPageProps {
  id?: string;
}

export default function StaticPage(props: StaticPageProps) {
  const { id: paramId } = useParams<{ id: string }>();
  const id = props.id || paramId;

  // --- Contact form states ---
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!nombre.trim() || !email.trim() || !msg.trim()) {
      setError('Por favor, rellena todos los campos obligatorios del formulario.');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, introduce una dirección de correo electrónico válida.');
      return;
    }

    // Success response
    setSuccess(true);
    setNombre('');
    setEmail('');
    setMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* --- ABOUT PAGE MODULE --- */}
      {id === 'about' && (
        <section className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 md:p-10 dark:bg-slate-900/40 dark:border-slate-800/60">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Sobre Nosotros</h1>
          
          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
            <p className="font-semibold text-indigo-600 dark:text-indigo-400">
              Bienvenido a Herramientas Pro, la plataforma líder de utilidades digitales totalmente gratuitas con procesamiento local garantizado.
            </p>
            <p>
              Nuestra misión es empoderar a profesionales, estudiantes y desarrolladores proporcionando herramientas de alta calidad y rendimiento extremo para realizar conversiones, cálculos financieros, modificaciones de texto, compresión de imágenes y edición de archivos PDF de manera instantánea y con absoluta privacidad.
            </p>
            <p>
              A diferencia de la mayoría de servicios web que requieren suscripciones premium o que recopilan de forma encubierta tus archivos cargados para procesarlos en servidores remotos, nuestra arquitectura innovadora realiza el 100% de las operaciones localmente dentro de tu navegador web usando APIs modernas de JavaScript. Esto nos permite garantizar:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Seguridad Absoluta:</strong> Tus documentos, fotos y contraseñas nunca abandonan tu máquina.</li>
              <li><strong>Velocidad Instantánea:</strong> Las operaciones son calculadas con los núcleos de tu procesador físico de forma local.</li>
              <li><strong>Sin Límites ni Registros:</strong> Acceso libre, ilimitado y gratis para todos los usuarios.</li>
            </ul>
          </div>
        </section>
      )}

      {/* --- CONTACT PAGE MODULE --- */}
      {id === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 dark:bg-slate-900/40 dark:border-slate-800/60">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Contacto y Sugerencias</h1>
            <p className="text-xs text-slate-500">¿Tienes alguna duda o quieres sugerirnos una nueva herramienta? Rellena el formulario de contacto y nuestro equipo responderá en menos de 24 horas.</p>
            
            {success ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-5 dark:bg-emerald-950/20 dark:border-emerald-900/40 text-center space-y-2">
                <CheckCircle className="mx-auto text-emerald-600 dark:text-emerald-400" size={32} />
                <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-400">¡Mensaje enviado con éxito!</h4>
                <p className="text-xs text-slate-500">Gracias por escribirnos. Nuestro equipo revisará tu mensaje y responderá a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 uppercase">Nombre completo</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej: Pedro Pérez"
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs outline-none dark:border-slate-800 dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 uppercase">Correo electrónico</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ej: pedro@example.com"
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs outline-none dark:border-slate-800 dark:bg-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 uppercase">Mensaje o Sugerencia</label>
                  <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Escribe detalladamente tu consulta o la herramienta que te gustaría sugerir..."
                    rows={6}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs outline-none dark:border-slate-800 dark:bg-slate-900 resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600 border border-red-100">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="rounded-full bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-xs font-bold text-white transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Enviar mensaje</span> <Send size={14} />
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/20 space-y-4 text-xs text-slate-600 dark:text-slate-400">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">Información de Soporte</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-indigo-500" />
                  <span>soporte@herramientasonline.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-500" />
                  <span>Madrid, España (Sede Principal)</span>
                </div>
              </div>
            </div>

            <AdSensePlaceholder type="sidebar" />
          </div>
        </div>
      )}

      {/* --- PRIVACY POLICY PAGE MODULE --- */}
      {id === 'privacy' && (
        <section className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 md:p-10 dark:bg-slate-900/40 dark:border-slate-800/60">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Política de Privacidad</h1>
          <p className="text-slate-400 text-xs">Última actualización: 13 de Julio de 2026</p>

          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">1. Principio de Procesamiento Local</h3>
            <p>
              En Herramientas Pro nos tomamos muy en serio la protección de los datos personales de nuestros usuarios. A diferencia de las plataformas tradicionales que transmiten la información del usuario a servidores centrales para procesarla, Herramientas Pro opera bajo el principio estricto de <strong>procesamiento del lado del cliente</strong>.
            </p>
            <p>
              Toda la lógica de procesamiento para manipular archivos PDF, comprimir imágenes, realizar cálculos matemáticos complejos, formatear cadenas de texto o encriptar datos ocurre en la memoria interna volátil de tu propio navegador mediante tecnologías web nativas. Tus archivos nunca se cargan en servidores de internet.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white text-sm">2. Cookies e Identificadores Analíticos</h3>
            <p>
              No utilizamos cookies persistentes para rastrear o perfilar tus intereses comerciales. Utilizamos almacenamiento temporal local de sesión o cookies estrictamente técnicas destinadas únicamente a almacenar preferencias de visualización del portal como el Tema Oscuro (Modo Noche) y la selección de la última pestaña o calculadora elegida.
            </p>
          </div>
        </section>
      )}

      {/* --- TERMS AND CONDITIONS PAGE MODULE --- */}
      {id === 'terms' && (
        <section className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 md:p-10 dark:bg-slate-900/40 dark:border-slate-800/60">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Términos y Condiciones de Uso</h1>
          <p className="text-slate-400 text-xs">Última actualización: 13 de Julio de 2026</p>

          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">1. Aceptación de los Términos</h3>
            <p>
              Al acceder y hacer uso de Herramientas Pro, declaras conocer, comprender y aceptar en su totalidad los presentes términos de uso. El portal proporciona acceso libre, gratuito e ilimitado a un conjunto de utilidades de productividad digital de procesamiento local.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white text-sm">2. Exención de Responsabilidad</h3>
            <p>
              Aunque nos esforzamos por mantener la máxima precisión y corrección científica en el desarrollo de nuestras calculadoras financieras, fiscales, matemáticas y procesadores de datos, todos los resultados y conversiones obtenidos en este sitio deben tomarse con fines exclusivamente informativos u orientativos. Herramientas Pro no se hace responsable de decisiones comerciales, contables, fiscales o legales tomadas en base a las estimaciones resultantes de la plataforma.
            </p>
          </div>
        </section>
      )}

      {/* --- COOKIES POLICY PAGE MODULE --- */}
      {id === 'cookies' && (
        <section className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 md:p-10 dark:bg-slate-900/40 dark:border-slate-800/60">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Política de Cookies</h1>
          <p className="text-slate-400 text-xs">Última actualización: 13 de Julio de 2026</p>

          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Uso de Cookies Técnicas</h3>
            <p>
              Nuestra plataforma utiliza únicamente almacenamiento técnico no-invasivo para el correcto funcionamiento de las características de la UI (Interfaz de Usuario) como recordar tu preferencia de Tema Claro o Tema Oscuro y garantizar la persistencia del estado en la calculadora actual. No utilizamos cookies de rastreo de perfiles comerciales invasivos.
            </p>
          </div>
        </section>
      )}

      {/* --- DISCLAIMER PAGE MODULE --- */}
      {id === 'disclaimer' && (
        <section className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 md:p-10 dark:bg-slate-900/40 dark:border-slate-800/60">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Aviso Legal</h1>
          <p className="text-slate-400 text-xs">Última actualización: 13 de Julio de 2026</p>

          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Información Corporativa</h3>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI), se hace constar que Herramientas Pro es una marca y portal administrado de forma independiente con la finalidad de ofrecer soporte técnico gratuito a usuarios de todo el mundo. El acceso es totalmente voluntario y gratuito.
            </p>
          </div>
        </section>
      )}

      <AdSensePlaceholder type="banner" />
    </div>
  );
}
