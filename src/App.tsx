/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Main Site Shell Layout
import Layout from './components/Layout';
import ToolWrapper from './components/ToolWrapper';

// Main Pages
import Home from './pages/Home';
import ToolList from './pages/ToolList';
import Categories from './pages/Categories';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Search from './pages/Search';
import StaticPage from './pages/StaticPage';

// Tool Segment Renderers
import TextTools from './components/tools/TextTools';
import CalculatorTools from './components/tools/CalculatorTools';
import PdfTools from './components/tools/PdfTools';
import ConverterTools from './components/tools/ConverterTools';
import ImageTools from './components/tools/ImageTools';
import DevTools from './components/tools/DevTools';

// Registry Data
import { TOOLS } from './data/tools';

// Dynamic Tool Switcher Page
function ToolDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const tool = TOOLS.find((t) => t.id === id);

  if (!tool) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Herramienta No Encontrada</h2>
        <p className="text-xs text-slate-500">Lo sentimos, la utilidad solicitada no está registrada en el catálogo actual.</p>
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline">
          <ArrowLeft size={14} /> Volver a Inicio
        </Link>
      </div>
    );
  }

  // Choose corresponding renderer based on category
  const renderToolBody = () => {
    switch (tool.category) {
      case 'texto':
        return <TextTools id={tool.id} />;
      case 'calculadoras':
        return <CalculatorTools id={tool.id} />;
      case 'pdf':
        return <PdfTools id={tool.id} />;
      case 'conversores':
        return <ConverterTools id={tool.id} />;
      case 'imagenes':
        return <ImageTools id={tool.id} />;
      case 'desarrolladores':
        return <DevTools id={tool.id} />;
      default:
        return (
          <div className="text-center py-8 text-slate-400 text-xs">
            Próximamente disponible. Estamos trabajando en este módulo.
          </div>
        );
    }
  };

  return (
    <ToolWrapper tool={tool}>
      {renderToolBody()}
    </ToolWrapper>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Main Landing Route */}
          <Route path="/" element={<Home />} />

          {/* Catalog Listing */}
          <Route path="/tools" element={<ToolList />} />

          {/* Dynamic Tool Executable Route */}
          <Route path="/tools/:id" element={<ToolDetailsPage />} />

          {/* Categories Grid Pages */}
          <Route path="/categories/:id" element={<Categories />} />

          {/* Blog Ecosystem */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Intelligent search result page */}
          <Route path="/search" element={<Search />} />

          {/* Static informational and legal pages mapped individually */}
          <Route path="/about" element={<StaticPage id="about" />} />
          <Route path="/contact" element={<StaticPage id="contact" />} />
          <Route path="/privacy-policy" element={<StaticPage id="privacy" />} />
          <Route path="/terms" element={<StaticPage id="terms" />} />
          <Route path="/disclaimer" element={<StaticPage id="disclaimer" />} />
          <Route path="/cookies" element={<StaticPage id="cookies" />} />

          {/* Fallback Catch-all -> Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
