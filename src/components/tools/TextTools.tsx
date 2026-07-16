/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, RotateCcw, AlertTriangle, FileText } from 'lucide-react';

interface TextToolProps {
  id: string;
}

export default function TextTools({ id }: TextToolProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Tool specific states
  const [loremType, setLoremType] = useState<'paragraphs' | 'words' | 'lists'>('paragraphs');
  const [loremCount, setLoremCount] = useState(3);
  const [removeSpacesMode, setRemoveSpacesMode] = useState<'all' | 'duplicate' | 'lines'>('duplicate');
  const [capitalizeMode, setCapitalizeMode] = useState<'sentence' | 'word'>('sentence');

  useEffect(() => {
    setError('');
    setOutput('');
    
    // For Lorem Ipsum, we pre-generate
    if (id === 'lorem-ipsum') {
      generateLorem();
    }
  }, [id, loremType, loremCount, removeSpacesMode, capitalizeMode]);

  // Main text processor
  const processText = (textValue: string) => {
    setInput(textValue);
    if (!textValue) {
      setOutput('');
      return;
    }

    try {
      switch (id) {
        case 'uppercase-text':
          setOutput(textValue.toUpperCase());
          break;
        case 'lowercase-text':
          setOutput(textValue.toLowerCase());
          break;
        case 'capitalize-text':
          if (capitalizeMode === 'sentence') {
            const sentences = textValue.split(/([.!?]\s+)/);
            const capitalized = sentences.map((s, idx) => {
              if (idx % 2 === 0 && s.length > 0) {
                return s.charAt(0).toUpperCase() + s.slice(1);
              }
              return s;
            });
            setOutput(capitalized.join(''));
          } else {
            const capitalized = textValue
              .toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            setOutput(capitalized);
          }
          break;
        case 'remove-spaces':
          if (removeSpacesMode === 'all') {
            setOutput(textValue.replace(/\s+/g, ''));
          } else if (removeSpacesMode === 'duplicate') {
            setOutput(textValue.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim());
          } else if (removeSpacesMode === 'lines') {
            setOutput(textValue.replace(/\n+/g, ' ').trim());
          }
          break;
        case 'slug-gen':
          const slug = textValue
            .toLowerCase()
            .trim()
            .normalize('NFD') // normalization for accents
            .replace(/[\u0300-\u036f]/g, '') // remove accent chars
            .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric except space and hyphen
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
          setOutput(slug);
          break;
        case 'base64-encode':
          try {
            setOutput(btoa(unescape(encodeURIComponent(textValue))));
          } catch (err) {
            setError('Error al codificar en Base64. Asegúrate de ingresar caracteres válidos.');
          }
          break;
        case 'base64-decode':
          try {
            setOutput(decodeURIComponent(escape(atob(textValue.trim()))));
          } catch (err) {
            setError('Cadena Base64 inválida. Comprueba la estructura del código.');
          }
          break;
        default:
          break;
      }
    } catch (err) {
      setError('Ocurrió un error inesperado al procesar el texto.');
    }
  };

  // Generate Lorem Ipsum
  const generateLorem = () => {
    const loremPhrases = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Aenean commodo ligula eget dolor. Aenean massa.',
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
      'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
      'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
      'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.',
      'Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
      'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.',
      'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.'
    ];

    let result = '';
    if (loremType === 'paragraphs') {
      const paragraphs = [];
      for (let i = 0; i < loremCount; i++) {
        const sentences = [];
        const sentenceCount = 4 + Math.floor(Math.random() * 4);
        for (let j = 0; j < sentenceCount; j++) {
          sentences.push(loremPhrases[Math.floor(Math.random() * loremPhrases.length)]);
        }
        paragraphs.push(sentences.join(' '));
      }
      result = paragraphs.join('\n\n');
    } else if (loremType === 'words') {
      const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');
      const wordsResult = [];
      for (let i = 0; i < loremCount * 10; i++) {
        wordsResult.push(words[i % words.length]);
      }
      result = wordsResult.join(' ') + '.';
    } else if (loremType === 'lists') {
      const items = [];
      for (let i = 0; i < loremCount; i++) {
        items.push(`• ${loremPhrases[i % loremPhrases.length]}`);
      }
      result = items.join('\n');
    }
    setOutput(result);
  };

  // Run initial lorem if trigger changes
  useEffect(() => {
    if (id === 'lorem-ipsum') {
      generateLorem();
    }
  }, [loremType, loremCount]);

  // Statistics calculation for counts
  const getStats = () => {
    const chars = input.length;
    const charsNoSpaces = input.replace(/\s+/g, '').length;
    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    const paragraphs = input.trim() ? input.split(/\n+/).filter(p => p.trim() !== '').length : 0;
    const readingTime = Math.ceil(words / 200); // 200 wpm avg
    return { chars, charsNoSpaces, words, paragraphs, readingTime };
  };

  const stats = getStats();

  const handleCopy = () => {
    const textToCopy = id === 'word-count' || id === 'char-count' ? input : output;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const textToDownload = id === 'word-count' || id === 'char-count' ? input : output;
    if (!textToDownload) return;
    const element = document.createElement('a');
    const file = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${id}_resultado.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header Config options based on Tool ID */}
      {id === 'lorem-ipsum' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Tipo de relleno</label>
            <div className="flex rounded-lg bg-white p-1 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              {(['paragraphs', 'words', 'lists'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setLoremType(type)}
                  className={`flex-1 rounded-md py-1.5 text-xs font-medium capitalize transition-all ${
                    loremType === type
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {type === 'paragraphs' ? 'Párrafos' : type === 'words' ? 'Palabras x10' : 'Listas'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Cantidad</label>
            <input
              type="number"
              min="1"
              max="100"
              value={loremCount}
              onChange={(e) => setLoremCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-indigo-400"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={generateLorem}
              className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
            >
              Generar texto de relleno
            </button>
          </div>
        </div>
      )}

      {id === 'remove-spaces' && (
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Modo de remoción de espacios</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'duplicate', label: 'Espacios duplicados y saltos extra' },
              { id: 'all', label: 'Eliminar TODOS los espacios en blanco' },
              { id: 'lines', label: 'Convertir saltos de línea en espacios' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setRemoveSpacesMode(mode.id as any);
                  // Trigger update manually with current input
                  setTimeout(() => processText(input), 10);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-all ${
                  removeSpacesMode === mode.id
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {id === 'capitalize-text' && (
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Estilo de capitalización</label>
          <div className="flex gap-2">
            {[
              { id: 'sentence', label: 'Primera letra al iniciar oraciones' },
              { id: 'word', label: 'Primera Letra De Cada Palabra (Tipo Título)' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setCapitalizeMode(mode.id as any);
                  setTimeout(() => processText(input), 10);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-all ${
                  capitalizeMode === mode.id
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Text Analytics Banner for word/char counts */}
      {(id === 'word-count' || id === 'char-count') && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{stats.words}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Palabras</div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="text-xl font-bold text-slate-900 dark:text-white">{stats.chars}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Caracteres (con esp)</div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="text-xl font-bold text-slate-900 dark:text-white">{stats.charsNoSpaces}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Letras (sin esp)</div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="text-xl font-bold text-slate-900 dark:text-white">{stats.paragraphs}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Párrafos</div>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">~{stats.readingTime} min</div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tiempo Lectura</div>
          </div>
        </div>
      )}

      {/* Editor Space Layout (Single Column / Dual Column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Box */}
        {id !== 'lorem-ipsum' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Texto de entrada</label>
              {input && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  <RotateCcw size={12} /> Limpiar
                </button>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => processText(e.target.value)}
              placeholder="Escribe o pega tu texto aquí para comenzar el procesamiento automático..."
              rows={12}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm font-sans outline-none focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:focus:border-indigo-400 dark:focus:bg-slate-900/50 resize-none"
            />
          </div>
        )}

        {/* Output Box */}
        <div className={`space-y-2 ${id === 'lorem-ipsum' ? 'md:col-span-2' : ''}`}>
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {id === 'word-count' || id === 'char-count' ? 'Vista previa del texto' : 'Resultado'}
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!(id === 'lorem-ipsum' ? output : (id === 'word-count' || id === 'char-count' ? input : output))}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-40 disabled:hover:bg-transparent dark:text-indigo-400 dark:hover:bg-indigo-950/30 transition-colors"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                <span>Copiar</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={!(id === 'lorem-ipsum' ? output : (id === 'word-count' || id === 'char-count' ? input : output))}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800/50 transition-colors"
              >
                <Download size={14} />
                <span>Descargar (.txt)</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              readOnly
              value={id === 'word-count' || id === 'char-count' ? input : output}
              placeholder="El resultado procesado aparecerá aquí de forma automática..."
              rows={12}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-mono outline-none dark:border-slate-800 dark:bg-slate-900/30 resize-none select-all"
            />
            {error && (
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 rounded-b-xl bg-red-50 p-3 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-400 border-t border-red-100 dark:border-red-900/40">
                <AlertTriangle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Helper for Character Limitations in Networks */}
      {id === 'char-count' && (
        <div className="rounded-xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Límites en Redes Sociales</h3>
          <div className="space-y-3 text-xs">
            {[
              { name: 'Twitter (X) - Post Estándar', limit: 280, count: stats.chars },
              { name: 'SMS - Mensaje Único', limit: 160, count: stats.chars },
              { name: 'Meta Titles (SEO de Google)', limit: 60, count: stats.chars },
              { name: 'Meta Descriptions (SEO)', limit: 160, count: stats.chars },
              { name: 'LinkedIn / Facebook Post sugerido', limit: 3000, count: stats.chars },
            ].map((network) => {
              const isOver = network.count > network.limit;
              const pct = Math.min(100, (network.count / network.limit) * 100);
              return (
                <div key={network.name} className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{network.name}</span>
                    <span className={`font-semibold ${isOver ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
                      {network.count} / {network.limit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${isOver ? 'bg-red-500' : 'bg-indigo-600'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
