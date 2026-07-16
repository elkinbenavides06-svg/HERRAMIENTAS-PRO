/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, Play, AlertCircle, RefreshCw } from 'lucide-react';

interface DevToolsProps {
  id: string;
}

export default function DevTools({ id }: DevToolsProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // --- 1. UUID Generator State ---
  const [uuidCount, setUuidCount] = useState(5);
  const [uuidList, setUuidList] = useState<string[]>([]);
  const [uuidCase, setUuidCase] = useState<'lower' | 'upper'>('lower');

  // --- 2. Hash Generator State ---
  const [hashInput, setHashInput] = useState('Hola Mundo');
  const [hashes, setHashes] = useState<{ md5: string; sha1: string; sha256: string }>({ md5: '', sha1: '', sha256: '' });

  // --- 3. JSON Formatter & Validator State ---
  const [jsonInput, setJsonInput] = useState('{"nombre":"Juan","edad":30,"ciudad":"Bogotá","hobbies":["leer","programar"]}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonIndent, setJsonIndent] = useState<2 | 4>(2);
  const [jsonStatus, setJsonStatus] = useState<{ valid: boolean; msg: string } | null>(null);

  // --- 4. Timestamp Converter State ---
  const [tsInput, setTsInput] = useState(() => Math.floor(Date.now() / 1000).toString());
  const [tsDateString, setTsDateString] = useState('');
  const [dateInput, setDateInput] = useState(() => new Date().toISOString().substring(0, 16));
  const [dateToTsResult, setDateToTsResult] = useState('');

  useEffect(() => {
    setError('');
    runDevTool();
  }, [id, uuidCount, uuidCase, hashInput, jsonIndent, jsonInput, tsInput, dateInput]);

  const runDevTool = async () => {
    try {
      switch (id) {
        case 'uuid-gen':
          generateUUIDs();
          break;
        case 'hash-gen':
          await calculateHashes();
          break;
        case 'json-format':
          formatJSON();
          break;
        case 'json-validate':
          validateJSON();
          break;
        case 'timestamp-conv':
          convertTimestamp();
          break;
        default:
          break;
      }
    } catch (err) {
      setError('Ocurrió un error al procesar la herramienta de desarrollador.');
    }
  };

  // --- UUID V4 generator algorithm ---
  const generateUUIDs = () => {
    const list = [];
    for (let i = 0; i < uuidCount; i++) {
      // Standard UUID v4 generation pattern
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      list.push(uuidCase === 'lower' ? uuid : uuid.toUpperCase());
    }
    setUuidList(list);
  };

  // --- Web Crypto SHA & MD5 (using simple standard algorithms) ---
  const calculateHashes = async () => {
    if (!hashInput) {
      setHashes({ md5: '', sha1: '', sha256: '' });
      return;
    }

    try {
      // 1. SHA-256 & SHA-1 using Web Crypto API
      const msgBuffer = new TextEncoder().encode(hashInput);
      
      const hashBuffer256 = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
      const sha256Hex = hashArray256.map(b => b.toString(16).padStart(2, '0')).join('');

      const hashBuffer1 = await crypto.subtle.digest('SHA-1', msgBuffer);
      const hashArray1 = Array.from(new Uint8Array(hashBuffer1));
      const sha1Hex = hashArray1.map(b => b.toString(16).padStart(2, '0')).join('');

      // 2. MD5 client-side simple hashing implementation
      const md5Hex = calcMD5(hashInput);

      setHashes({ md5: md5Hex, sha1: sha1Hex, sha256: sha256Hex });
    } catch (err) {
      setError('No se pudo calcular la firma criptográfica en este navegador.');
    }
  };

  // Fast MD5 hashing script in pure JS (safe and lightweight)
  const calcMD5 = (str: string) => {
    let k = [], i = 0;
    for (; i < 64; i++) {
      k[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
    }
    let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476;
    let utf8 = unescape(encodeURIComponent(str));
    let len = utf8.length;
    let words = [];
    for (i = 0; i < len; i++) {
      words[i >> 2] |= utf8.charCodeAt(i) << ((i % 4) * 8);
    }
    words[len >> 2] |= 0x80 << ((len % 4) * 8);
    let wlen = ((len + 8) >> 6) * 16 + 14;
    words[wlen] = len * 8;
    for (i = 0; i < wlen; i += 16) {
      let a = h0, b = h1, c = h2, d = h3;
      for (let j = 0; j < 64; j++) {
        let f, g;
        if (j < 16) {
          f = (b & c) | (~b & d); g = j;
        } else if (j < 32) {
          f = (d & b) | (~d & c); g = (5 * j + 1) % 16;
        } else if (j < 48) {
          f = b ^ c ^ d; g = (3 * j + 5) % 16;
        } else {
          f = c ^ (b | ~d); g = (7 * j) % 16;
        }
        let temp = d;
        d = c;
        c = b;
        let x = words[i + g] || 0;
        let rot = [
          [7, 12, 17, 22], [5, 9, 14, 20], [4, 11, 16, 23], [6, 10, 15, 21]
        ][Math.floor(j / 16)][j % 4];
        let sum = a + f + k[j] + x;
        b = b + ((sum << rot) | (sum >>> (32 - rot)));
        a = temp;
      }
      h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0;
    }
    return [h0, h1, h2, h3].map(h => {
      let hex = '';
      for (let j = 0; j < 4; j++) {
        hex += ((h >> (j * 8)) & 0xff).toString(16).padStart(2, '0');
      }
      return hex;
    }).join('');
  };

  // --- JSON Formatter ---
  const formatJSON = () => {
    if (!jsonInput.trim()) {
      setJsonOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, jsonIndent));
      setError('');
    } catch (err: any) {
      setJsonOutput('');
      setError(`JSON Inválido: ${err.message}`);
    }
  };

  // --- JSON Validator ---
  const validateJSON = () => {
    if (!jsonInput.trim()) {
      setJsonStatus(null);
      return;
    }
    try {
      JSON.parse(jsonInput);
      setJsonStatus({ valid: true, msg: '¡Excelente! Estructura JSON 100% válida según la especificación RFC 8259.' });
      setError('');
    } catch (err: any) {
      setJsonStatus({ valid: false, msg: `Error de sintaxis: ${err.message}` });
    }
  };

  // --- Timestamp Converter ---
  const convertTimestamp = () => {
    // 1. Timestamp to Date
    const ts = parseInt(tsInput);
    if (isNaN(ts)) {
      setTsDateString('Timestamp inválido');
    } else {
      // Handle seconds vs milliseconds detection
      const date = new Date(tsInput.length <= 10 ? ts * 1000 : ts);
      if (isNaN(date.getTime())) {
        setTsDateString('Fecha Inválida');
      } else {
        setTsDateString(date.toLocaleString() + ' (Local) / ' + date.toUTCString() + ' (UTC)');
      }
    }

    // 2. Date to Timestamp
    if (dateInput) {
      const dateObj = new Date(dateInput);
      if (!isNaN(dateObj.getTime())) {
        setDateToTsResult(Math.floor(dateObj.getTime() / 1000).toString());
      }
    }
  };

  const handleCopyText = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* --- 1. UUID GENERATOR --- */}
      {id === 'uuid-gen' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Cantidad de UUIDs</label>
              <input
                type="number"
                min="1"
                max="50"
                value={uuidCount}
                onChange={(e) => setUuidCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-900 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Caja de Letras</label>
              <div className="flex rounded-lg bg-white p-1 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button onClick={() => setUuidCase('lower')} className={`flex-1 rounded-md py-1.5 text-xs font-semibold ${uuidCase === 'lower' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}>minúsculas</button>
                <button onClick={() => setUuidCase('upper')} className={`flex-1 rounded-md py-1.5 text-xs font-semibold ${uuidCase === 'upper' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}>MAYÚSCULAS</button>
              </div>
            </div>
            <div className="flex items-end">
              <button onClick={generateUUIDs} className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 py-2.5 text-xs font-semibold shadow transition-all">Generar UUIDs</button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Identificadores UUID v4 Generados</label>
              <button onClick={() => handleCopyText(uuidList.join('\n'))} className="flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline dark:text-indigo-400">
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                <span>Copiar todos</span>
              </button>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 space-y-1.5 overflow-x-auto">
              {uuidList.map((uuid, index) => (
                <div key={index} className="flex justify-between items-center group">
                  <span>{uuid}</span>
                  <button onClick={() => handleCopyText(uuid)} className="opacity-0 group-hover:opacity-100 text-indigo-500 hover:text-indigo-600 text-[10px] font-bold uppercase pl-4">copiar</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- 2. HASH GENERATOR --- */}
      {id === 'hash-gen' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Texto plano origen</label>
            <textarea
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Escribe el texto aquí para calcular sus firmas criptográficas..."
              rows={6}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 resize-none"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Algoritmos criptográficos</label>
            <div className="space-y-3 text-xs">
              {[
                { name: 'SHA-256 (Recomendado)', val: hashes.sha256 },
                { name: 'SHA-1', val: hashes.sha1 },
                { name: 'MD5', val: hashes.md5 },
              ].map((hash) => (
                <div key={hash.name} className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800/60 dark:bg-slate-900/40">
                  <div className="flex justify-between font-bold mb-1 text-slate-600 dark:text-slate-400">{hash.name}</div>
                  <div className="flex items-center justify-between font-mono break-all text-slate-800 dark:text-slate-200 gap-4">
                    <span>{hash.val || 'Esperando texto...'}</span>
                    {hash.val && (
                      <button onClick={() => handleCopyText(hash.val)} className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                        <Copy size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- 3. JSON FORMATTER & VALIDATOR --- */}
      {(id === 'json-format' || id === 'json-validate') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Input JSON desordenado o plano</label>
              {id === 'json-format' && (
                <div className="flex rounded bg-slate-100 p-0.5 dark:bg-slate-800 text-[10px] font-bold">
                  <button onClick={() => setJsonIndent(2)} className={`px-2 py-0.5 rounded ${jsonIndent === 2 ? 'bg-white shadow dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>Indentar 2</button>
                  <button onClick={() => setJsonIndent(4)} className={`px-2 py-0.5 rounded ${jsonIndent === 4 ? 'bg-white shadow dark:bg-slate-700 text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>Indentar 4</button>
                </div>
              )}
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"clave": "valor"}'
              rows={12}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-mono outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
              {id === 'json-format' ? 'JSON Formateado' : 'Resultado de validación'}
            </label>
            {id === 'json-format' ? (
              <div className="relative">
                <textarea
                  readOnly
                  value={jsonOutput}
                  placeholder="El JSON embellecido aparecerá aquí de forma automática..."
                  rows={12}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-mono outline-none dark:border-slate-800 dark:bg-slate-900/30 resize-none select-all"
                />
                {jsonOutput && (
                  <button onClick={() => handleCopyText(jsonOutput)} className="absolute right-4 top-4 rounded-lg bg-white dark:bg-slate-800 p-1.5 shadow-sm hover:bg-slate-50 border border-slate-100 dark:border-slate-700">
                    <Copy size={14} className="text-indigo-600 dark:text-indigo-400" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-[264px] rounded-xl border border-slate-200 bg-slate-50/20 p-6 dark:border-slate-800 text-center">
                {jsonStatus ? (
                  <div className="space-y-4">
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${jsonStatus.valid ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      <AlertCircle size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className={`font-bold text-sm ${jsonStatus.valid ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                        {jsonStatus.valid ? 'Estructura Correcta' : 'Sintaxis Incorrecta'}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">{jsonStatus.msg}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-400 dark:text-slate-500 space-y-2">
                    <Terminal size={32} className="mx-auto" />
                    <p className="text-xs">Introduce una cadena JSON para comprobar su validez estructural.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- 4. TIMESTAMP CONVERTER --- */}
      {id === 'timestamp-conv' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timestamp to Date */}
          <div className="space-y-4 rounded-xl bg-slate-50 p-6 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">Timestamp de Unix ➔ Fecha</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Época Unix (segundos)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tsInput}
                    onChange={(e) => setTsInput(e.target.value)}
                    className="flex-grow rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none"
                  />
                  <button onClick={() => setTsInput(Math.floor(Date.now() / 1000).toString())} className="rounded-lg bg-indigo-50 text-indigo-600 p-2.5 dark:bg-indigo-950 dark:text-indigo-400 hover:bg-indigo-100 transition-all">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold block text-slate-400 mb-1">Traducción de fecha:</span>
                <span className="font-mono">{tsDateString}</span>
              </div>
            </div>
          </div>

          {/* Date to Timestamp */}
          <div className="space-y-4 rounded-xl bg-slate-50 p-6 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">Fecha y Hora ➔ Unix Timestamp</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Selecciona fecha y hora</label>
                <input
                  type="datetime-local"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none"
                />
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold block text-slate-400 mb-1">Timestamp Unix obtenido:</span>
                <div className="flex justify-between items-center font-mono text-slate-800 dark:text-slate-200">
                  <span>{dateToTsResult || 'Calculando...'}</span>
                  {dateToTsResult && (
                    <button onClick={() => handleCopyText(dateToTsResult)} className="text-indigo-600 hover:text-indigo-700">
                      <Copy size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/40">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
