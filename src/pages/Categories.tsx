/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Calculator, RefreshCw, AlignLeft, Image as ImageIcon, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import { TOOLS, CATEGORIES } from '../data/tools';
import AdSensePlaceholder from '../components/AdSensePlaceholder';

export default function Categories() {
  const { id } = useParams<{ id: string }>();

  const category = CATEGORIES.find(c => c.id === id);
  const categoryTools = TOOLS.filter(t => t.category === id);

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

  if (!category) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Categoría no encontrada</h2>
        <p className="text-xs text-slate-500">La sección que estás buscando no existe o ha sido reestructurada.</p>
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline">
          <ArrowLeft size={14} /> Volver a la página principal
        </Link>
      </div>
    );
  }

  const Icon = getCatIcon(category.id);

  return (
    <div className="space-y-10 pb-16">
      {/* Back button and title */}
      <div className="space-y-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white">
          <ArrowLeft size={14} /> Todas las categorías
        </Link>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-slate-50 p-6 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/60">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
            <Icon size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider">{category.title}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{category.description}</p>
          </div>
        </div>
      </div>

      <AdSensePlaceholder type="banner" />

      {/* Grid listing category specific tools */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Herramientas en esta categoría ({categoryTools.length})</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((t) => (
            <Link
              key={t.id}
              to={`/tools/${t.id}`}
              className="group rounded-2xl border border-slate-200/60 bg-white p-5 hover:shadow-md hover:border-indigo-500 dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-indigo-400 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {t.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800 flex justify-end items-center">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Ejecutar herramienta <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <AdSensePlaceholder type="banner" />
    </div>
  );
}
