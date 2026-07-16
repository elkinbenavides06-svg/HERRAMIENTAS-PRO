/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Copy, Check, Info, Calculator, AlertCircle, HelpCircle } from 'lucide-react';

interface CalculatorToolProps {
  id: string;
}

export default function CalculatorTools({ id }: CalculatorToolProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // --- 1. Basic & Scientific Calculator State ---
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  // --- 2. Percentage Calculator State ---
  const [pctVal1, setPctVal1] = useState('15');
  const [pctVal2, setPctVal2] = useState('200');
  const [pctRes, setPctRes] = useState('');

  // --- 3. VAT Calculator State ---
  const [vatAmount, setVatAmount] = useState('100');
  const [vatRate, setVatRate] = useState('21');
  const [vatAction, setVatAction] = useState<'add' | 'remove'>('add');
  const [vatDetails, setVatDetails] = useState<{ original: number; vat: number; total: number } | null>(null);

  // --- 4. Discount Calculator State ---
  const [discountPrice, setDiscountPrice] = useState('80');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [discountDetails, setDiscountDetails] = useState<{ original: number; saved: number; final: number } | null>(null);

  // --- 5. BMI (IMC) State ---
  const [bmiWeight, setBmiWeight] = useState('70');
  const [bmiHeight, setBmiHeight] = useState('175');
  const [bmiRes, setBmiRes] = useState<{ score: number; category: string; minWeight: number; maxWeight: number } | null>(null);

  // --- 6. Age Calculator State ---
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [ageRes, setAgeRes] = useState<{ years: number; months: number; days: number; totalDays: number; totalHours: number } | null>(null);

  // --- 7. Mortgage Calculator State ---
  const [mortgageCapital, setMortgageCapital] = useState('150000');
  const [mortgageRate, setMortgageRate] = useState('3.5');
  const [mortgageYears, setMortgageYears] = useState('25');
  const [mortgageRes, setMortgageRes] = useState<{ monthly: number; totalInterests: number; totalPay: number } | null>(null);

  // --- 8. Compound Interest State ---
  const [compoundPrincipal, setCompoundPrincipal] = useState('10000');
  const [compoundRate, setCompoundRate] = useState('6');
  const [compoundYears, setCompoundYears] = useState('10');
  const [compoundContribution, setCompoundContribution] = useState('100');
  const [compoundRes, setCompoundRes] = useState<{ finalBalance: number; totalPrincipal: number; totalContributions: number; totalInterests: number } | null>(null);

  // --- 9. Three Rule Calculator State ---
  const [threeA, setThreeA] = useState('10');
  const [threeB, setThreeB] = useState('50');
  const [threeC, setThreeC] = useState('20');
  const [threeX, setThreeX] = useState('');
  const [threeMode, setThreeMode] = useState<'direct' | 'inverse'>('direct');

  // Trigger calculations on state changes
  useEffect(() => {
    setError('');
    calculateTool();
  }, [
    id, pctVal1, pctVal2, vatAmount, vatRate, vatAction,
    discountPrice, discountPercent, bmiWeight, bmiHeight,
    birthDate, targetDate, mortgageCapital, mortgageRate, mortgageYears,
    compoundPrincipal, compoundRate, compoundYears, compoundContribution,
    threeA, threeB, threeC, threeMode
  ]);

  const calculateTool = () => {
    try {
      switch (id) {
        case 'percentage-calc': {
          const v1 = parseFloat(pctVal1);
          const v2 = parseFloat(pctVal2);
          if (isNaN(v1) || isNaN(v2)) return;
          const res = (v1 / 100) * v2;
          setPctRes(`${v1}% de ${v2} es ${res.toFixed(2)}`);
          break;
        }
        case 'vat-calc': {
          const base = parseFloat(vatAmount);
          const rate = parseFloat(vatRate);
          if (isNaN(base) || isNaN(rate)) return;
          if (vatAction === 'add') {
            const vat = (base * rate) / 100;
            const total = base + vat;
            setVatDetails({ original: base, vat, total });
          } else {
            const original = base / (1 + rate / 100);
            const vat = base - original;
            setVatDetails({ original, vat, total: base });
          }
          break;
        }
        case 'discount-calc': {
          const price = parseFloat(discountPrice);
          const disc = parseFloat(discountPercent);
          if (isNaN(price) || isNaN(disc)) return;
          const saved = (price * disc) / 100;
          const final = price - saved;
          setDiscountDetails({ original: price, saved, final });
          break;
        }
        case 'bmi-calc': {
          const w = parseFloat(bmiWeight);
          const h = parseFloat(bmiHeight) / 100; // in meters
          if (isNaN(w) || isNaN(h) || h === 0) return;
          const score = w / (h * h);
          let category = 'Normal';
          if (score < 18.5) category = 'Bajo peso (Delgadez)';
          else if (score < 25) category = 'Peso Normal (Saludable)';
          else if (score < 30) category = 'Sobrepeso (Pre-obesidad)';
          else category = 'Obesidad';

          const minWeight = 18.5 * (h * h);
          const maxWeight = 24.9 * (h * h);
          setBmiRes({ score, category, minWeight, maxWeight });
          break;
        }
        case 'age-calc': {
          if (!birthDate) return;
          const birth = new Date(birthDate);
          const target = new Date(targetDate);
          if (isNaN(birth.getTime()) || isNaN(target.getTime())) return;
          
          let years = target.getFullYear() - birth.getFullYear();
          let months = target.getMonth() - birth.getMonth();
          let days = target.getDate() - birth.getDate();

          if (days < 0) {
            months--;
            const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
            days += prevMonth.getDate();
          }
          if (months < 0) {
            years--;
            months += 12;
          }

          const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
          const totalHours = totalDays * 24;

          setAgeRes({ years, months, days, totalDays, totalHours });
          break;
        }
        case 'mortgage-calc': {
          const capital = parseFloat(mortgageCapital);
          const rate = parseFloat(mortgageRate) / 12 / 100; // monthly rate
          const months = parseFloat(mortgageYears) * 12;
          if (isNaN(capital) || isNaN(rate) || isNaN(months) || rate === 0 || months === 0) return;

          const monthly = (capital * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
          const totalPay = monthly * months;
          const totalInterests = totalPay - capital;

          setMortgageRes({ monthly, totalInterests, totalPay });
          break;
        }
        case 'compound-calc': {
          const p = parseFloat(compoundPrincipal);
          const r = parseFloat(compoundRate) / 100;
          const y = parseFloat(compoundYears);
          const c = parseFloat(compoundContribution);
          if (isNaN(p) || isNaN(r) || isNaN(y)) return;

          let balance = p;
          let totalContributions = 0;
          for (let i = 0; i < y * 12; i++) {
            balance = balance * (1 + r / 12) + c;
            totalContributions += c;
          }

          const totalPrincipal = p;
          const finalBalance = balance;
          const totalInterests = finalBalance - (totalPrincipal + totalContributions);

          setCompoundRes({ finalBalance, totalPrincipal, totalContributions, totalInterests });
          break;
        }
        case 'three-rule-calc': {
          const a = parseFloat(threeA);
          const b = parseFloat(threeB);
          const c = parseFloat(threeC);
          if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
            setError('Asegúrate de ingresar valores válidos mayores a cero en los casilleros de origen.');
            return;
          }
          let res = 0;
          if (threeMode === 'direct') {
            res = (b * c) / a;
          } else {
            res = (a * b) / c;
          }
          setThreeX(res.toFixed(4).replace(/\.?0+$/, ''));
          break;
        }
        default:
          break;
      }
    } catch (err) {
      setError('Error en la fórmula. Comprueba que los campos contengan valores numéricos coherentes.');
    }
  };

  // Basic/Scientific Key press handler
  const handleCalcBtn = (val: string) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === 'DEL') {
      setCalcInput(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        // Sanitize mathematical expression safely
        const sanitized = calcInput
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log')
          .replace(/pi/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/sqrt/g, 'Math.sqrt')
          .replace(/\^/g, '**');

        const evalResult = new Function(`return ${sanitized}`)();
        setCalcResult(String(evalResult));
      } catch (err) {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  const handleCopyResult = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* --- 1. BASIC & SCIENTIFIC CALCULATOR --- */}
      {(id === 'basic-calc' || id === 'scientific-calc') && (
        <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner dark:border-slate-800 dark:bg-slate-950">
          {/* Output Display */}
          <div className="mb-4 rounded-xl bg-white p-4 text-right shadow-sm dark:bg-slate-900">
            <div className="min-h-[24px] text-xs font-mono text-slate-400 dark:text-slate-500 overflow-x-auto whitespace-nowrap">
              {calcInput || '0'}
            </div>
            <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white truncate">
              {calcResult || '0'}
            </div>
          </div>

          {/* Button Grids */}
          <div className="grid grid-cols-4 gap-2 font-mono text-sm">
            {id === 'scientific-calc' && (
              <>
                {['sin(', 'cos(', 'tan(', 'pi'].map(k => (
                  <button key={k} onClick={() => handleCalcBtn(k)} className="rounded-lg bg-slate-200 p-2 font-semibold text-slate-700 hover:bg-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">{k}</button>
                ))}
                {['log(', 'ln(', 'sqrt(', '^'].map(k => (
                  <button key={k} onClick={() => handleCalcBtn(k)} className="rounded-lg bg-slate-200 p-2 font-semibold text-slate-700 hover:bg-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">{k}</button>
                ))}
              </>
            )}

            {/* Basic Numbers & Standard ops */}
            {['C', 'DEL', '(', ')'].map(k => (
              <button key={k} onClick={() => handleCalcBtn(k)} className="rounded-lg bg-slate-300 p-3 font-bold text-slate-800 hover:bg-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">{k}</button>
            ))}
            {['7', '8', '9', '/'].map(k => (
              <button key={k} onClick={() => handleCalcBtn(k)} className="rounded-lg bg-white p-3 font-semibold text-slate-800 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">{k}</button>
            ))}
            {['4', '5', '6', '*'].map(k => (
              <button key={k} onClick={() => handleCalcBtn(k)} className="rounded-lg bg-white p-3 font-semibold text-slate-800 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">{k}</button>
            ))}
            {['1', '2', '3', '-'].map(k => (
              <button key={k} onClick={() => handleCalcBtn(k)} className="rounded-lg bg-white p-3 font-semibold text-slate-800 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">{k}</button>
            ))}
            {['0', '.', '=', '+'].map(k => (
              <button
                key={k}
                onClick={() => handleCalcBtn(k)}
                className={`rounded-lg p-3 font-bold ${
                  k === '='
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'bg-white text-slate-800 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- 2. PERCENTAGE CALCULATOR --- */}
      {id === 'percentage-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Calcular Porcentaje de una Cantidad</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">¿Cuánto es el (%)?</label>
                <input type="number" value={pctVal1} onChange={(e) => setPctVal1(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">De la cantidad</label>
                <input type="number" value={pctVal2} onChange={(e) => setPctVal2(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
            </div>
          </div>
          {/* Result Card */}
          <div className="flex flex-col justify-center rounded-xl border border-indigo-100 bg-indigo-50/50 p-6 dark:border-indigo-950/40 dark:bg-indigo-950/20 text-center">
            <div className="text-xs uppercase font-bold text-indigo-500 mb-1">Resultado de Porcentaje</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{pctRes || 'Ingresa valores numéricos'}</div>
            {pctRes && (
              <button onClick={() => handleCopyResult(pctRes)} className="mx-auto mt-3 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 transition-colors">
                {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                <span>Copiar</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- 3. VAT CALCULATOR --- */}
      {id === 'vat-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Configuración del Impuesto (IVA)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Importe base o bruto</label>
                <input type="number" value={vatAmount} onChange={(e) => setVatAmount(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Tasa de IVA (%)</label>
                  <select value={vatRate} onChange={(e) => setVatRate(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none">
                    <option value="21">21% (España General)</option>
                    <option value="16">16% (México General)</option>
                    <option value="10">10% (España Reducido)</option>
                    <option value="4">4% (España Superreducido)</option>
                    <option value="19">19% (Chile / Alemania)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Acción</label>
                  <div className="flex rounded-lg bg-white p-1 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <button onClick={() => setVatAction('add')} className={`flex-1 rounded-md py-1 text-xs font-semibold ${vatAction === 'add' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}>Suma IVA</button>
                    <button onClick={() => setVatAction('remove')} className={`flex-1 rounded-md py-1 text-xs font-semibold ${vatAction === 'remove' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}>Desglosar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Result breakdown card */}
          {vatDetails && (
            <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800 bg-slate-50/20 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider text-slate-400 text-center">Ficha de Desglose de Factura</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                  <span className="text-slate-500">Importe Neto Base:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{vatDetails.original.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                  <span className="text-slate-500">Impuestos (IVA {vatRate}%):</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">+{vatDetails.vat.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-700 font-bold dark:text-slate-300 text-sm">TOTAL FINAL:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base">{vatDetails.total.toFixed(2)} €</span>
                </div>
              </div>
              <button onClick={() => handleCopyResult(`Base: ${vatDetails.original.toFixed(2)} €, IVA: ${vatDetails.vat.toFixed(2)} €, Total: ${vatDetails.total.toFixed(2)} €`)} className="w-full flex items-center justify-center gap-1 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-500 transition-colors">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>Copiar Resumen</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- 4. DISCOUNT CALCULATOR --- */}
      {id === 'discount-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Datos de la Oferta</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Precio Original (€)</label>
                <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Descuento (%)</label>
                <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
            </div>
          </div>
          {discountDetails && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-6 dark:border-emerald-950/40 dark:bg-emerald-950/10 space-y-4">
              <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-400 uppercase text-center tracking-wider">Ahorro y Precio Final</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-emerald-100/40 pb-2 dark:border-emerald-900/20">
                  <span className="text-emerald-600 dark:text-emerald-500">Precio inicial:</span>
                  <span className="font-mono font-semibold text-slate-600 dark:text-slate-400">{discountDetails.original.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between border-b border-emerald-100/40 pb-2 dark:border-emerald-900/20">
                  <span className="text-emerald-600 dark:text-emerald-500">Dinero que te ahorras:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">-{discountDetails.saved.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-800 font-bold dark:text-slate-300 text-sm">Pagas Neto:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-base">{discountDetails.final.toFixed(2)} €</span>
                </div>
              </div>
              <button onClick={() => handleCopyResult(`Precio Original: ${discountDetails.original} €, Descuento: ${discountPercent}%, Ahorras: ${discountDetails.saved.toFixed(2)} €, Precio Final: ${discountDetails.final.toFixed(2)} €`)} className="w-full flex items-center justify-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-500 transition-colors">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>Copiar Ahorro</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- 5. BMI (IMC) CALCULATOR --- */}
      {id === 'bmi-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Índice de Masa Corporal (IMC)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Peso actual (kg)</label>
                <input type="number" value={bmiWeight} onChange={(e) => setBmiWeight(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Estatura (cm)</label>
                <input type="number" value={bmiHeight} onChange={(e) => setBmiHeight(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
            </div>
          </div>
          {bmiRes && (
            <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800 bg-slate-50/20 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white text-center uppercase tracking-wider text-slate-400">Puntuación Nutricional</h3>
              <div className="text-center">
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{bmiRes.score.toFixed(1)}</div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">{bmiRes.category}</div>
              </div>
              <div className="space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Tu rango de peso saludable sugerido:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{bmiRes.minWeight.toFixed(1)}kg - {bmiRes.maxWeight.toFixed(1)}kg</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- 6. AGE CALCULATOR --- */}
      {id === 'age-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tiempo de Vida</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Fecha de nacimiento</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Fecha de referencia (Hoy)</label>
                <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
            </div>
          </div>
          {ageRes && (
            <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800 bg-slate-50/20 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white text-center uppercase tracking-wider text-slate-400">Edad Exacta</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950/20">
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{ageRes.years}</div>
                  <div className="text-[10px] text-slate-500">Años</div>
                </div>
                <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800/40">
                  <div className="text-lg font-bold text-slate-800 dark:text-white">{ageRes.months}</div>
                  <div className="text-[10px] text-slate-500">Meses</div>
                </div>
                <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800/40">
                  <div className="text-lg font-bold text-slate-800 dark:text-white">{ageRes.days}</div>
                  <div className="text-[10px] text-slate-500">Días</div>
                </div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Días transcurridos:</span>
                  <span className="font-mono font-semibold">{ageRes.totalDays.toLocaleString()} días</span>
                </div>
                <div className="flex justify-between">
                  <span>Horas totales:</span>
                  <span className="font-mono font-semibold">{ageRes.totalHours.toLocaleString()} horas</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- 7. MORTGAGE CALCULATOR --- */}
      {id === 'mortgage-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Simulador de Préstamo Hipotecario</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Capital Solicitado (€)</label>
                <input type="number" value={mortgageCapital} onChange={(e) => setMortgageCapital(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Interés Anual (%)</label>
                  <input type="number" step="0.1" value={mortgageRate} onChange={(e) => setMortgageRate(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Plazo (Años)</label>
                  <input type="number" value={mortgageYears} onChange={(e) => setMortgageYears(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
                </div>
              </div>
            </div>
          </div>
          {mortgageRes && (
            <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800 bg-slate-50/20 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white text-center uppercase tracking-wider text-slate-400">Cuota de Pago Estimada</h3>
              <div className="text-center">
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{mortgageRes.monthly.toFixed(2)} €</div>
                <div className="text-xs text-slate-500 mt-1">Al mes durante {mortgageYears} años</div>
              </div>
              <div className="space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Préstamo inicial:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{parseFloat(mortgageCapital).toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Total de Intereses:</span>
                  <span className="font-mono font-bold text-red-500">+{mortgageRes.totalInterests.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 dark:border-slate-800 font-bold">
                  <span className="text-slate-800 dark:text-slate-200">Total a devolver:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{mortgageRes.totalPay.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- 8. COMPOUND INTEREST --- */}
      {id === 'compound-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Parámetros de Inversión</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Capital Inicial (€)</label>
                <input type="number" value={compoundPrincipal} onChange={(e) => setCompoundPrincipal(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Interés Anual (%)</label>
                <input type="number" value={compoundRate} onChange={(e) => setCompoundRate(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Plazo (Años)</label>
                <input type="number" value={compoundYears} onChange={(e) => setCompoundYears(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase">Aporte mensual (€)</label>
                <input type="number" value={compoundContribution} onChange={(e) => setCompoundContribution(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
              </div>
            </div>
          </div>
          {compoundRes && (
            <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800 bg-slate-50/20 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white text-center uppercase tracking-wider text-slate-400">Proyección Futura de Ahorro</h3>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{compoundRes.finalBalance.toFixed(2)} €</div>
                <div className="text-xs text-slate-500 mt-1">Saldo final estimado al cabo de {compoundYears} años</div>
              </div>
              <div className="space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Capital inicial aportado:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{compoundRes.totalPrincipal.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Contribuciones adicionales:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">+{compoundRes.totalContributions.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold border-t border-slate-100 pt-2 dark:border-slate-800">
                  <span>Intereses devengados:</span>
                  <span className="font-mono">+{compoundRes.totalInterests.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- 9. THREE RULE CALCULATOR --- */}
      {id === 'three-rule-calc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/40">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Proporcionalidad Simple</h3>
              <div className="flex rounded-lg bg-white p-0.5 shadow-sm dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <button onClick={() => setThreeMode('direct')} className={`rounded-md px-3 py-1 text-xs font-semibold ${threeMode === 'direct' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}>Directa</button>
                <button onClick={() => setThreeMode('inverse')} className={`rounded-md px-3 py-1 text-xs font-semibold ${threeMode === 'inverse' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}>Inversa</button>
              </div>
            </div>
            
            {/* Visual Grid for A is to B, C is to X */}
            <div className="space-y-4">
              <div className="grid grid-cols-5 items-center gap-2">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Magnitud A</label>
                  <input type="number" value={threeA} onChange={(e) => setThreeA(e.target.value)} className="w-full text-center rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
                </div>
                <div className="text-center font-bold text-slate-400">➔</div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Produce B</label>
                  <input type="number" value={threeB} onChange={(e) => setThreeB(e.target.value)} className="w-full text-center rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-5 items-center gap-2">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Magnitud C</label>
                  <input type="number" value={threeC} onChange={(e) => setThreeC(e.target.value)} className="w-full text-center rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-slate-800 dark:bg-slate-900 outline-none" />
                </div>
                <div className="text-center font-bold text-slate-400">➔</div>
                <div className="col-span-2 rounded-lg bg-indigo-50 border border-indigo-200 p-2 text-center dark:bg-indigo-950/40 dark:border-indigo-900">
                  <label className="block text-[10px] uppercase font-bold text-indigo-500 mb-1">Incógnita (X)</label>
                  <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm h-[20px]">{threeX || '?'}</div>
                </div>
              </div>
            </div>
          </div>
          {threeX && (
            <div className="flex flex-col justify-center rounded-xl border border-indigo-100 bg-indigo-50/50 p-6 dark:border-indigo-950/40 dark:bg-indigo-950/20 text-center">
              <div className="text-xs uppercase font-bold text-indigo-500 mb-1">Fórmula Resuelta ({threeMode === 'direct' ? 'Directa' : 'Inversa'})</div>
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                {threeMode === 'direct' ? `X = (B × C) / A` : `X = (A × B) / C`}
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">X = {threeX}</div>
              <button onClick={() => handleCopyResult(threeX)} className="mx-auto mt-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 transition-colors">
                {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                <span>Copiar Incógnita X</span>
              </button>
            </div>
          )}
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
