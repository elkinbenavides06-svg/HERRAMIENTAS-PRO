/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, FileText, ArrowRight } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blog';
import { TOOLS } from '../data/tools';
import AdSensePlaceholder from '../components/AdSensePlaceholder';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_ARTICLES.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Artículo no encontrado</h2>
        <p className="text-xs text-slate-500">La guía o artículo que intentas leer no existe o ha sido modificado.</p>
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline">
          <ArrowLeft size={14} /> Volver al blog
        </Link>
      </div>
    );
  }

  // Find related tools by matching keywords with relatedTools names
  const relatedTools = TOOLS.filter(tool =>
    post.relatedTools.includes(tool.id)
  ).slice(0, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-16">
      {/* Back button and post content */}
      <div className="lg:col-span-3 space-y-6">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <ArrowLeft size={14} /> Volver al blog
        </Link>

        <article className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 dark:bg-slate-900/40 dark:border-slate-800/60">
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
            <span className="flex items-center gap-1"><User size={12} /> Equipo Editorial</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded dark:bg-indigo-950/40 dark:text-indigo-400">
              #{post.category}
            </span>
          </div>

          {/* Ad before content */}
          <AdSensePlaceholder type="banner" />

          {/* Markdown simulated/structural reading section */}
          <div className="prose dark:prose-invert max-w-none text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={index} className="text-sm font-bold text-slate-900 dark:text-white pt-4 pb-1">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              if (paragraph.startsWith('-')) {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1.5 py-2">
                    {paragraph.split('\n').map((item, idx) => (
                      <li key={idx}>{item.replace('-', '').trim()}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-slate-600 dark:text-slate-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Ad inside body */}
          <AdSensePlaceholder type="banner" />
        </article>
      </div>

      {/* Sidebar with related tools */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/20 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Herramientas Recomendadas</h3>
          
          {relatedTools.length > 0 ? (
            <div className="space-y-3">
              {relatedTools.map((t) => (
                <Link
                  key={t.id}
                  to={`/tools/${t.id}`}
                  className="block p-3 rounded-xl bg-white border border-slate-100 hover:border-indigo-500 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-indigo-400 transition-all group"
                >
                  <h4 className="font-bold text-xs text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {t.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Explora nuestro catálogo completo con más de 50 herramientas de productividad listas para producción.
            </p>
          )}

          <Link
            to="/tools"
            className="w-full flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800/60"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Sidebar responsive banner */}
        <AdSensePlaceholder type="sidebar" />
      </div>
    </div>
  );
}
