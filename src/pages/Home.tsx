/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  FileText,
  Calculator,
  RefreshCw,
  AlignLeft,
  Image as ImageIcon,
  Code,
  Shield,
  Zap,
  Lock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Clock,
  Heart
} from 'lucide-react';
import { TOOLS, CATEGORIES } from '../data/tools';
import AdSensePlaceholder from '../components/AdSensePlaceholder';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Get matching icons for categories
  const getCatIcon = (id: string) => {
    switch (id) {
      case 'pdf': return FileText;
      case 'calculadoras': return Calculator;
      case 'conversores': return RefreshCw;
      case 'texto': return AlignLeft;
      case 'imagenes': return ImageIcon;
      case 'desarrolladores': return Code;
      default: return FileText;
    }
  };

  // Static stats for marketing
  const stats = [
    { num: '54+', label: 'Herramientas Pro' },
    { num: '100%', label: 'Gratis y sin Registro' },
    { num: '0%', label: 'Datos Guardados (100% Local)' },
    { num: '< 1s', label: 'Tiempo de Respuesta' },
  ];

  // Popular and recent tools
  const popularTools = TOOLS.slice(0, 6);
  const recentTools = TOOLS.slice(10, 16);

  // General Platform FAQs
  const homeFaqs = [
    { q: '¿Tengo que registrarme o pagar algo para usar las herramientas?', a: 'No, absolutamente todas nuestras utilidades son 105% gratuitas y no requieren ningún tipo de registro, inicio de sesión o suscripción de pago.' },
    { q: '¿Es seguro subir mis documentos o fotos a la plataforma?', a: 'Es totalmente seguro. A diferencia de otros portales, nosotros realizamos todo el procesamiento de tus archivos en el cliente (dentro de tu propio navegador web) usando JavaScript. Tus datos, fotos y documentos nunca se envían a ningún servidor de internet.' },
    { q: '¿Funciona sin conexión a internet?', a: 'Sí, la gran mayoría de herramientas (como conversores, calculadoras, modificadores de texto y hashes) pueden funcionar completamente sin conexión una vez que la página ha cargado.' },
    { q: '¿Cómo añaden nuevas herramientas?', a: 'Contamos con una arquitectura modular en la que registramos nuevas herramientas de forma estructurada semanalmente para mantener el portal al día con las necesidades de productividad de nuestros usuarios.' }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION WITH SEARCH */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 to-transparent pt-20 pb-16 dark:from-indigo-950/20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 mb-6">
            <Sparkles size={12} className="animate-pulse" />
            <span>50+ herramientas de productividad gratuitas en un solo lugar</span>
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-tight">
            Todas tus herramientas <br />
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-indigo-300">
              en un solo lugar, 100% local
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Unifica tus PDFs, calcula tus finanzas, edita fotos, formatea textos y automatiza tareas repetitivas de forma inmediata y con privacidad garantizada.
          </p>

          {/* Large intelligent search bar */}
          <form onSubmit={handleSearchSubmit} className="mx-auto mt-10 max-w-2xl relative">
            <div className="flex items-center rounded-full bg-white p-2 shadow-xl border border-slate-100 dark:border-slate-800 dark:bg-slate-900 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <Search className="ml-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar herramientas... (ej: 'unir pdf', 'imc', 'lorem')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow shadow-indigo-600/20"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* AdSense slot below Hero */}
      <AdSensePlaceholder type="banner" />

      {/* 2. CATEGORIES OVERVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Explora las categorías de herramientas
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Selecciona una categoría para ver todo el catálogo estructurado de utilidades online listas para producción.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = getCatIcon(cat.id);
            return (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}`}
                className="group rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-500 dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-indigo-400 transition-all flex items-start gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <Icon size={22} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-3 group-hover:translate-x-1 transition-transform">
                    Ver herramientas <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR TOOLS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Herramientas más populares
            </h2>
          </div>
          <Link to="/tools" className="text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400">
            Ver todas las herramientas
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((t) => {
            const Icon = getCatIcon(t.category);
            return (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="rounded-xl border border-slate-100 bg-white p-5 hover:shadow-md hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:bg-slate-900 transition-all block"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50/50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">{t.title}</h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {t.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* AdSense Between large items */}
      <AdSensePlaceholder type="banner" />

      {/* 4. RECENT ADDITIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Añadidas recientemente
            </h2>
          </div>
          <Link to="/tools" className="text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400">
            Catálogo completo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTools.map((t) => {
            const Icon = getCatIcon(t.category);
            return (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="rounded-xl border border-slate-100 bg-white p-5 hover:shadow-md hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:bg-slate-900 transition-all block"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50/50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">{t.title}</h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {t.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. BENEFITS BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-900/5 dark:bg-slate-900 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/20">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Privacidad Certificada</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No recopilamos tus datos, archivos o información confidencial. Todo el procesamiento se realiza en el navegador de manera 100% local.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/20">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Velocidad Extrema</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Sin tiempos de espera, sin servidores sobrecargados. Las herramientas se procesan con la potencia de tu propio ordenador para mayor velocidad.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/20">
                <Lock size={20} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Sin Límite, Sin Coste</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Usa las herramientas de manera ilimitada en cualquier momento, de forma completamente gratuita y sin anuncios invasivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATISTICS BANNER */}
      <section className="bg-indigo-600 py-12 dark:bg-indigo-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl md:text-4xl font-black text-white">{s.num}</div>
                <div className="text-xs text-indigo-100 font-medium tracking-wider uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GENERAL ACCORDION FAQS */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-8">
          Preguntas frecuentes generales
        </h2>
        <div className="space-y-4">
          {homeFaqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-800/60 dark:bg-slate-900/40">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <HelpCircle size={16} className="text-indigo-500" />
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA CALLOUT SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-indigo-50 p-8 dark:bg-indigo-950/20 text-center border border-indigo-100/50 dark:border-indigo-900/20 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">¿Necesitas una herramienta específica?</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
            Dinos qué calculadora, conversor o procesador de archivos te gustaría ver en la plataforma y nuestro equipo de desarrollo lo agregará en próximas actualizaciones.
          </p>
          <Link
            to="/contact"
            className="rounded-full bg-slate-900 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 hover:bg-slate-800 px-6 py-2.5 text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Sugerir herramienta</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
