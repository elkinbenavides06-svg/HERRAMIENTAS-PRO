/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, ArrowRightLeft } from 'lucide-react';

interface ConverterToolProps {
  id: string;
}

interface Unit {
  name: string;
  factor: number; // Factor relative to a base unit
}

export default function ConverterTools({ id }: ConverterToolProps) {
  const [val, setVal] = useState('1');
  const [res, setRes] = useState('1');
  const [copied, setCopied] = useState(false);

  // Define units configurations for each converter
  const getUnitConfig = (): { baseUnit: string; units: { [key: string]: Unit } } => {
    switch (id) {
      case 'length-conv':
        return {
          baseUnit: 'm',
          units: {
            'mm': { name: 'Milímetros (mm)', factor: 0.001 },
            'cm': { name: 'Centímetros (cm)', factor: 0.01 },
            'm': { name: 'Metros (m)', factor: 1 },
            'km': { name: 'Kilómetros (km)', factor: 1000 },
            'in': { name: 'Pulgadas (in)', factor: 0.0254 },
            'ft': { name: 'Pies (ft)', factor: 0.3048 },
            'yd': { name: 'Yardas (yd)', factor: 0.9144 },
            'mi': { name: 'Millas (mi)', factor: 1609.344 },
          },
        };
      case 'weight-conv':
        return {
          baseUnit: 'g',
          units: {
            'mg': { name: 'Miligramos (mg)', factor: 0.001 },
            'g': { name: 'Gramos (g)', factor: 1 },
            'kg': { name: 'Kilogramos (kg)', factor: 1000 },
            'oz': { name: 'Onzas (oz)', factor: 28.3495 },
            'lb': { name: 'Libras (lb)', factor: 453.592 },
            'ton': { name: 'Toneladas (ton)', factor: 1000000 },
          },
        };
      case 'area-conv':
        return {
          baseUnit: 'm2',
          units: {
            'cm2': { name: 'Centímetros Cuadrados (cm²)', factor: 0.0001 },
            'm2': { name: 'Metros Cuadrados (m²)', factor: 1 },
            'km2': { name: 'Kilómetros Cuadrados (km²)', factor: 1000000 },
            'ha': { name: 'Hectáreas (ha)', factor: 10000 },
            'ac': { name: 'Acres (ac)', factor: 4046.856 },
            'ft2': { name: 'Pies Cuadrados (ft²)', factor: 0.0929 },
          },
        };
      case 'volume-conv':
        return {
          baseUnit: 'l',
          units: {
            'ml': { name: 'Mililitros (ml)', factor: 0.001 },
            'l': { name: 'Litros (l)', factor: 1 },
            'm3': { name: 'Metros Cúbicos (m³)', factor: 1000 },
            'gal': { name: 'Galones (US gal)', factor: 3.78541 },
            'cup': { name: 'Tazas (cup)', factor: 0.24 },
            'oz_fl': { name: 'Onzas Líquidas (fl oz)', factor: 0.02957 },
          },
        };
      case 'speed-conv':
        return {
          baseUnit: 'm_s',
          units: {
            'm_s': { name: 'Metros por Segundo (m/s)', factor: 1 },
            'km_h': { name: 'Kilómetros por Hora (km/h)', factor: 1 / 3.6 },
            'mph': { name: 'Millas por Hora (mph)', factor: 0.44704 },
            'knot': { name: 'Nudos (kt)', factor: 0.51444 },
          },
        };
      case 'time-conv':
        return {
          baseUnit: 's',
          units: {
            'ms': { name: 'Miliseconduos (ms)', factor: 0.001 },
            's': { name: 'Segundos (s)', factor: 1 },
            'min': { name: 'Minutos (min)', factor: 60 },
            'h': { name: 'Horas (h)', factor: 3600 },
            'day': { name: 'Días (d)', factor: 86400 },
            'week': { name: 'Semanas (w)', factor: 604800 },
            'year': { name: 'Años (y)', factor: 31536000 },
          },
        };
      case 'bytes-conv':
        return {
          baseUnit: 'b',
          units: {
            'b': { name: 'Bytes (B)', factor: 1 },
            'kb': { name: 'Kilobytes (KB)', factor: 1024 },
            'mb': { name: 'Megabytes (MB)', factor: 1024 * 1024 },
            'gb': { name: 'Gigabytes (GB)', factor: 1024 * 1024 * 1024 },
            'tb': { name: 'Terabytes (TB)', factor: 1024 * 1024 * 1024 * 1024 },
          },
        };
      case 'freq-conv':
        return {
          baseUnit: 'hz',
          units: {
            'hz': { name: 'Hercios (Hz)', factor: 1 },
            'khz': { name: 'Kilohercios (kHz)', factor: 1000 },
            'mhz': { name: 'Megahercios (MHz)', factor: 1000000 },
            'ghz': { name: 'Gigahercios (GHz)', factor: 1000000000 },
          },
        };
      case 'currency-conv':
        return {
          baseUnit: 'eur',
          units: {
            'eur': { name: 'Euro (EUR)', factor: 1 },
            'usd': { name: 'Dólar (USD)', factor: 0.92 },
            'gbp': { name: 'Libra Esterlina (GBP)', factor: 1.18 },
            'mxn': { name: 'Peso Mexicano (MXN)', factor: 0.051 },
            'jpy': { name: 'Yen Japonés (JPY)', factor: 0.0058 },
            'cad': { name: 'Dólar Canadiense (CAD)', factor: 0.67 },
          },
        };
      default:
        return { baseUnit: 'm', units: {} };
    }
  };

  const config = getUnitConfig();
  const unitKeys = Object.keys(config.units);

  const [fromUnit, setFromUnit] = useState(unitKeys[0] || 'm');
  const [toUnit, setToUnit] = useState(unitKeys[1] || 'km');

  // Specific state for Temperature
  const [tempInput, setTempInput] = useState('100');
  const [tempCelsius, setTempCelsius] = useState('');
  const [tempFahrenheit, setTempFahrenheit] = useState('');
  const [tempKelvin, setTempKelvin] = useState('');

  useEffect(() => {
    // Sync default unit selections when converter changes
    const keys = Object.keys(getUnitConfig().units);
    if (keys.length >= 2) {
      setFromUnit(keys[0]);
      setToUnit(keys[1]);
    }
  }, [id]);

  useEffect(() => {
    if (id === 'temp-conv') {
      calculateTemperature();
    } else {
      calculateStandard();
    }
  }, [id, val, fromUnit, toUnit, tempInput]);

  const calculateStandard = () => {
    const inputVal = parseFloat(val);
    if (isNaN(inputVal)) {
      setRes('0');
      return;
    }

    const fromUnitInfo = config.units[fromUnit];
    const toUnitInfo = config.units[toUnit];
    if (!fromUnitInfo || !toUnitInfo) return;

    // Convert to base unit first, then to target unit
    const valueInBase = inputVal * fromUnitInfo.factor;
    const valueInTarget = valueInBase / toUnitInfo.factor;

    // Beautiful precision formatting
    if (valueInTarget === 0) {
      setRes('0');
    } else if (Math.abs(valueInTarget) < 0.00001) {
      setRes(valueInTarget.toExponential(6));
    } else {
      setRes(parseFloat(valueInTarget.toFixed(6)).toString());
    }
  };

  const calculateTemperature = () => {
    const inputVal = parseFloat(tempInput);
    if (isNaN(inputVal)) {
      setTempCelsius('');
      setTempFahrenheit('');
      setTempKelvin('');
      return;
    }

    // Default assume Celsius as input, let's offer full dashboard conversions
    const C = inputVal;
    const F = (C * 9/5) + 32;
    const K = C + 273.15;

    setTempCelsius(`${C.toFixed(2)} °C`);
    setTempFahrenheit(`${F.toFixed(2)} °F`);
    setTempKelvin(`${K.toFixed(2)} K`);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCopy = () => {
    const text = id === 'temp-conv'
      ? `Celsius: ${tempCelsius}, Fahrenheit: ${tempFahrenheit}, Kelvin: ${tempKelvin}`
      : `${val} ${fromUnit} = ${res} ${toUnit}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {id === 'temp-conv' ? (
        // --- Temperature Specific Layout ---
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">Escala Celsius Base</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase">Temperatura en °C</label>
              <input
                type="number"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          {/* Temperature outputs */}
          <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800 bg-slate-50/20 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white text-center uppercase tracking-wider text-slate-400">Escalas Equivalentes</h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950/20">
                <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">{tempCelsius || '-'}</div>
                <div className="text-[10px] text-slate-500 mt-1">Celsius</div>
              </div>
              <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800/40">
                <div className="font-mono font-bold text-slate-800 dark:text-white text-sm">{tempFahrenheit || '-'}</div>
                <div className="text-[10px] text-slate-500 mt-1">Fahrenheit</div>
              </div>
              <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800/40">
                <div className="font-mono font-bold text-slate-800 dark:text-white text-sm">{tempKelvin || '-'}</div>
                <div className="text-[10px] text-slate-500 mt-1">Kelvin</div>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              {copied ? <Check size={14} className="text-green-300" /> : <Copy size={14} />}
              <span>Copiar Conversión</span>
            </button>
          </div>
        </div>
      ) : (
        // --- Standard Universal Unit Converter Layout ---
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Inputs Panel */}
          <div className="space-y-4 rounded-xl bg-slate-50 p-6 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider text-slate-400 mb-2">Unidad Origen y Destino</h3>
            
            <div className="space-y-4">
              {/* From Unit */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 mb-1.5 uppercase">De ({fromUnit.toUpperCase()})</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    className="col-span-1 rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none focus:border-indigo-500"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="col-span-2 rounded-lg border border-slate-200 bg-white p-2 text-xs dark:border-slate-800 dark:bg-slate-900 outline-none"
                  >
                    {unitKeys.map(k => (
                      <option key={k} value={k}>{config.units[k].name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center py-1">
                <button
                  onClick={handleSwap}
                  className="rounded-full bg-indigo-50 p-2.5 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:hover:bg-indigo-900 transition-all shadow-sm"
                  title="Intercambiar unidades"
                >
                  <ArrowRightLeft size={16} className="transform rotate-90 md:rotate-0" />
                </button>
              </div>

              {/* To Unit */}
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 mb-1.5 uppercase">A ({toUnit.toUpperCase()})</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs dark:border-slate-800 dark:bg-slate-900 outline-none"
                >
                  {unitKeys.map(k => (
                    <option key={k} value={k}>{config.units[k].name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Output Screen */}
          <div className="flex flex-col justify-center rounded-xl border border-indigo-100 bg-indigo-50/50 p-8 dark:border-indigo-950/40 dark:bg-indigo-950/20 text-center min-h-[220px]">
            <div className="text-xs uppercase font-bold text-indigo-500 mb-1 tracking-wider">Conversión de Unidades</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mb-3">
              {val} {config.units[fromUnit]?.name || ''} equivale a:
            </div>
            
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white break-all mb-4">
              {res} <span className="text-sm font-sans font-normal text-slate-500 dark:text-slate-400">{toUnit}</span>
            </div>

            <button
              onClick={handleCopy}
              className="mx-auto flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-slate-700 shadow hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 transition-colors"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              <span>Copiar resultado</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
