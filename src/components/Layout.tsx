/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  FileText,
  Calculator,
  RefreshCw,
  AlignLeft,
  Image as ImageIcon,
  Code,
  Info,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'PDF', path: '/categories/pdf', icon: FileText },
    { name: 'Calculadoras', path: '/categories/calculadoras', icon: Calculator },
    { name: 'Conversores', path: '/categories/conversores', icon: RefreshCw },
    { name: 'Texto', path: '/categories/texto', icon: AlignLeft },
    { name: 'Imágenes', path: '/categories/imagenes', icon: ImageIcon },
    { name: 'Desarrolladores', path: '/categories/desarrolladores', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-black shadow-sm shadow-indigo-600/30">
                H
              </span>
              <span>
                Herramientas<span className="text-indigo-600 dark:text-indigo-400">Pro</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link to="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Todas las herramientas
              </Link>
              
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 200)}
                  className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Categorías
                  <ChevronDown size={14} className={`transform transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {categoriesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-56 rounded-xl border border-slate-100 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                    >
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link
                            key={cat.path}
                            to={cat.path}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Icon size={16} className="text-slate-400 dark:text-slate-500" />
                            {cat.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Blog
              </Link>
              <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Sobre nosotros
              </Link>
              <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-64">
              <input
                type="text"
                placeholder="Buscar herramienta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-10 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:focus:border-indigo-400 dark:focus:bg-slate-950"
              />
              <button type="submit" className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
                <Search size={16} />
              </button>
            </form>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar herramienta..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-4 pr-10 text-sm outline-none dark:border-slate-800 dark:bg-slate-900"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-slate-400">
                  <Search size={16} />
                </button>
              </form>

              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      className="flex items-center gap-2 rounded-lg p-2 text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 dark:text-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Icon size={14} className="text-indigo-500" />
                      {cat.name}
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 font-medium text-slate-700 dark:text-slate-300 text-sm">
                <Link to="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Todas las herramientas
                </Link>
                <Link to="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Blog
                </Link>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Sobre nosotros
                </Link>
                <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Contacto
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Branding and short info */}
            <div className="md:col-span-1 space-y-4">
              <Link to="/" className="flex items-center gap-2 font-sans text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-black shadow-sm">
                  H
                </span>
                <span>Herramientas<span className="text-indigo-600 dark:text-indigo-400">Pro</span></span>
              </Link>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Plataforma líder en utilidades, calculadoras y herramientas online 100% gratuitas, seguras y sin registro. Todo el procesamiento se realiza localmente en tu navegador para proteger tu privacidad.
              </p>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
                Categorías
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/categories/pdf" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Documentos PDF</Link>
                </li>
                <li>
                  <Link to="/categories/calculadoras" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Calculadoras</Link>
                </li>
                <li>
                  <Link to="/categories/conversores" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Conversores de Unidades</Link>
                </li>
                <li>
                  <Link to="/categories/texto" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Procesadores de Texto</Link>
                </li>
                <li>
                  <Link to="/categories/imagenes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Edición de Imágenes</Link>
                </li>
                <li>
                  <Link to="/categories/desarrolladores" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Herramientas Dev</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
                Recursos
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog y Tutoriales</Link>
                </li>
                <li>
                  <Link to="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Todas las herramientas</Link>
                </li>
                <li>
                  <Link to="/search" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Buscador Inteligente</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
                Legal e Información
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Quiénes Somos</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contacto</Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Política de Privacidad</Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Términos y Condiciones</Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Descargo de Responsabilidad</Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Política de Cookies</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Herramientas Pro. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span>Sitemap</span>
              <span>•</span>
              <span>robots.txt</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
