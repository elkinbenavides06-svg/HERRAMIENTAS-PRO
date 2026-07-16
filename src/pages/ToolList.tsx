/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Calculator, RefreshCw, AlignLeft, Image as ImageIcon, Code, ArrowRight } from 'lucide-react';
import { TOOLS, CATEGORIES } from '../data/tools';
import AdSensePlaceholder from '../components/AdSensePlaceholder';

export default function ToolList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = TOOLS.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.keywords.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="space-y-10 pb-16">
      {/* Title Header Banner */}
      <section className="text-center max-w-3xl mx-auto py-6">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Catálogo completo de herramientas
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Explora, filtra y encuentra de forma instantánea cualquiera de nuestras 50+ herramientas profesionales de procesamiento local gratuito.
        </p>
      </section>

      {/* Filter and Search Panel */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50 p-4 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800">
        {/* Search bar inside list */}
        <div className="flex items-center w-full md:max-w-md bg-white border border-slate-200 rounded-xl px-3 py-2 dark:bg-slate-900 dark:border-slate-700">
          <Search size={18} className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Escribe para filtrar utilidades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-900 dark:text-white outline-none"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto overflow-x-auto py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <AdSensePlaceholder type="banner" />

      {/* Grid of tools */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((t) => {
            const Icon = getCatIcon(t.category);
            return (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="group rounded-2xl border border-slate-200/60 bg-white p-5 hover:shadow-md hover:border-indigo-500 dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-indigo-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {t.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {t.description}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {t.category}
                  </span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Abrir <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="font-bold text-slate-800 dark:text-slate-200">No encontramos herramientas coincidentes</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Prueba a buscar con otras palabras clave o restablece la selección de categorías para explorar todo el catálogo.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 px-4 py-2 text-xs font-semibold"
          >
            Ver todo el catálogo
          </button>
        </div>
      )}

      <AdSensePlaceholder type="banner" />
    </div>
  );
}
