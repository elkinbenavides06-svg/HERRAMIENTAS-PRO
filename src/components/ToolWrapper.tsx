/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  FileText,
  Calculator,
  RefreshCw,
  AlignLeft,
  Image as ImageIcon,
  Code
} from 'lucide-react';
import { Tool } from '../types';
import { TOOLS, CATEGORIES } from '../data/tools';
import AdSensePlaceholder from './AdSensePlaceholder';

interface ToolWrapperProps {
  tool: Tool;
  children: React.ReactNode;
}

export default function ToolWrapper({ tool, children }: ToolWrapperProps) {
  const [copied, setCopied] = useState(false);

  const categoryInfo = CATEGORIES.find(c => c.id === tool.category);

  // Helper to get matching Category Icon
  const getCategoryIcon = () => {
    switch (tool.category) {
      case 'pdf': return FileText;
      case 'calculadoras': return Calculator;
      case 'conversores': return RefreshCw;
      case 'texto': return AlignLeft;
      case 'imagenes': return ImageIcon;
      case 'desarrolladores': return Code;
      default: return FileText;
    }
  };

  const Icon = getCategoryIcon();

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Usa esta herramienta gratuita online: ${tool.title}`)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  // Find related tools
  const relatedTools = TOOLS.filter(t => tool.related.includes(t.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Inicio
        </Link>
        <ChevronRight size={12} />
        {categoryInfo && (
          <>
            <Link to={`/categories/${tool.category}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {categoryInfo.title}
            </Link>
            <ChevronRight size={12} />
          </>
        )}
        <span className="text-slate-900 dark:text-slate-100 font-semibold truncate max-w-[200px] md:max-w-none">
          {tool.title}
        </span>
      </nav>

      {/* SEO rich intro block */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Icon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                {tool.title}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {tool.description}
              </p>
            </div>
          </div>

          {/* Share widget */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={handleShareCopy}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              <span>{copied ? 'Copiado!' : 'Copiar URL'}</span>
            </button>
            <button
              onClick={handleShareTwitter}
              className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors"
              title="Compartir en Twitter (X)"
            >
              <Twitter size={14} className="text-[#1DA1F2]" />
            </button>
            <button
              onClick={handleShareFacebook}
              className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors"
              title="Compartir en Facebook"
            >
              <Facebook size={14} className="text-[#1877F2]" />
            </button>
          </div>
        </div>
      </div>

      {/* AdSense Above Tool */}
      <AdSensePlaceholder type="banner" />

      {/* Core Tool Execution Workspace */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 md:p-8 mb-8">
        {children}
      </div>

      {/* AdSense Between content blocks */}
      <AdSensePlaceholder type="banner" />

      {/* Structured SEO Guide and FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Guide */}
          <section className="bg-white rounded-xl border border-slate-200/60 p-6 dark:bg-slate-900/50 dark:border-slate-800/60">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 text-xs font-bold">
                i
              </span>
              Cómo usar {tool.title} paso a paso
            </h2>
            <ol className="space-y-3.5 list-decimal list-inside text-sm text-slate-600 dark:text-slate-300">
              {tool.guide.map((step, idx) => (
                <li key={idx} className="leading-relaxed pl-1">
                  <span className="font-semibold text-slate-900 dark:text-slate-200">{step.split(':')[0]}</span>
                  {step.includes(':') ? step.substring(step.indexOf(':')) : ''}
                </li>
              ))}
            </ol>
          </section>

          {/* FAQs Accordion */}
          {tool.faqs.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Preguntas frecuentes sobre {tool.title}
              </h2>
              <div className="space-y-3">
                {tool.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-800/60 dark:bg-slate-900/40"
                  >
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar info & Related tools */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60 dark:bg-slate-900/30">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              Privacidad Garantizada
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tus archivos y datos nunca se suben a nuestros servidores. Todo el procesamiento de {tool.title} se realiza de manera 100% privada dentro de tu propio navegador web. Seguro, rápido y confidencial.
            </p>
          </div>

          <AdSensePlaceholder type="sidebar" />

          {/* Related Tools column list */}
          {relatedTools.length > 0 && (
            <div className="rounded-xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60 dark:bg-slate-900/30">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
                Herramientas Relacionadas
              </h3>
              <div className="space-y-3">
                {relatedTools.map((t) => (
                  <Link
                    key={t.id}
                    to={`/tools/${t.id}`}
                    className="group block rounded-lg border border-slate-100 p-3 hover:border-indigo-500 hover:bg-slate-50 dark:border-slate-800/50 dark:hover:border-indigo-400 dark:hover:bg-slate-800/50 transition-all"
                  >
                    <h4 className="font-semibold text-xs text-slate-900 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
                      {t.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {t.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
