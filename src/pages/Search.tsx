/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight, ArrowLeft } from 'lucide-react';
import { TOOLS } from '../data/tools';
import AdSensePlaceholder from '../components/AdSensePlaceholder';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<typeof TOOLS>([]);

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const matched = TOOLS.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some(tag => tag.toLowerCase().includes(q))
      );
      setResults(matched);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="space-y-8 pb-16">
      {/* Title block */}
      <div className="space-y-3">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800">
          <ArrowLeft size={14} /> Volver a Inicio
        </Link>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
          Resultados de búsqueda: <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">"{query}"</span>
        </h1>
        <p className="text-xs text-slate-400">Encontramos {results.length} coincidencias en el catálogo de herramientas.</p>
      </div>

      <AdSensePlaceholder type="banner" />

      {/* Grid listing search results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((t) => (
            <Link
              key={t.id}
              to={`/tools/${t.id}`}
              className="group rounded-2xl border border-slate-200/60 bg-white p-5 hover:shadow-md hover:border-indigo-500 dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-indigo-400 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  {t.title
                }</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {t.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800 flex justify-end items-center">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Abrir herramienta <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="font-bold text-slate-800 dark:text-slate-200">No encontramos coincidencias</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Intenta buscar términos más generales como "pdf", "convertir", "calcular", "lorem", "base64" para dar con la herramienta adecuada.
          </p>
          <Link
            to="/tools"
            className="inline-block rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 px-4 py-2 text-xs font-semibold"
          >
            Ver catálogo completo
          </Link>
        </div>
      )}

      <AdSensePlaceholder type="banner" />
    </div>
  );
}
