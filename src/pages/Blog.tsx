/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blog';
import AdSensePlaceholder from '../components/AdSensePlaceholder';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_ARTICLES.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Blog Title Banner */}
      <section className="text-center max-w-3xl mx-auto py-6">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Blog de productividad y guías
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Consejos profesionales, tutoriales paso a paso y guías de optimización para potenciar tus flujos de trabajo cotidianos y digitales.
        </p>
      </section>

      {/* Blog Search filter */}
      <div className="flex max-w-md mx-auto items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 dark:bg-slate-900 dark:border-slate-800">
        <Search size={18} className="text-slate-400 mr-2" />
        <input
          type="text"
          placeholder="Buscar artículos del blog..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-900 dark:text-white outline-none"
        />
      </div>

      <AdSensePlaceholder type="banner" />

      {/* Grid listing blog posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-slate-200/60 bg-white hover:shadow-md transition-all flex flex-col dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
            >
              {/* Header color block / placeholder instead of images for optimal speed */}
              <div className="h-40 bg-gradient-to-br from-indigo-500/10 to-indigo-600/30 dark:from-indigo-950/40 dark:to-indigo-900/10 p-6 flex flex-col justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  <span className="text-[9px] font-extrabold uppercase bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded shadow-sm">
                    {post.category}
                  </span>
                </div>
                <BookOpen size={28} className="text-indigo-600 dark:text-indigo-400 opacity-60 self-end" />
              </div>

              {/* Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                    <User size={12} /> Equipo Editorial
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Leer completo</span> <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-xs">No se encontraron artículos que coincidan con la búsqueda.</p>
        </div>
      )}

      <AdSensePlaceholder type="banner" />
    </div>
  );
}
