/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogArticle } from '../types';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'como-calcular-porcentajes-facilmente',
    title: 'Cómo calcular porcentajes fácilmente en tu día a día',
    summary: 'Aprende las fórmulas matemáticas sencillas para calcular descuentos, aumentos e incrementos porcentuales en pocos segundos.',
    category: 'Calculadoras',
    date: '2026-06-15',
    readTime: '4 min',
    relatedTools: ['percentage-calc', 'discount-calc', 'vat-calc'],
    content: `El cálculo de porcentajes es una de las operaciones matemáticas más comunes en nuestro día a día. Ya sea que estés intentando calcular el precio de un artículo rebajado en una tienda, determinando el impuesto sobre el valor añadido (IVA) de una factura, o calculando la propina en un restaurante, saber cómo obtener porcentajes te ahorrará tiempo y te dará seguridad financiera.

### ¿Qué es un porcentaje?
Un porcentaje es simplemente una fracción cuyo denominador es siempre 100. Se representa con el símbolo \`%\` y expresa cuántas partes de un total de 100 representa una cantidad determinada. Por ejemplo, decir que el 20% de las personas prefieren el té es equivalente a decir que 20 de cada 100 personas tienen esa preferencia.

### 1. Cómo calcular un porcentaje básico
Para calcular el porcentaje de una cantidad, la fórmula básica es multiplicar la cantidad inicial por el porcentaje que deseas obtener, y luego dividir el resultado por 100.

**Fórmula:** 
$$\\text{Resultado} = \\frac{\\text{Cantidad} \\times \\text{Porcentaje}}{100}$$

*Ejemplo:* Si quieres calcular el 15% de 80 euros:
$$(80 \\times 15) / 100 = 1200 / 100 = 12 \\text{ euros}$$

### 2. Cómo calcular un descuento
Cuando compramos en rebajas, solemos ver carteles como "30% de descuento". Para calcular el precio final de forma rápida, puedes seguir este truco mental: resta el porcentaje de rebaja a 100%, y calcula ese porcentaje restante.

*Ejemplo:* Si una camisa de 50 euros tiene un 30% de descuento, pagarás el 70% de su valor original.
$$50 \\times 0.70 = 35 \\text{ euros}$$

### Conclusión
Si prefieres evitar hacer cálculos manuales o quieres comprobar que tus cuentas son 100% correctas, te recomendamos utilizar nuestra **Calculadora de Porcentajes** o la **Calculadora de Descuentos**, que harán este trabajo por ti de manera instantánea y gratuita.`
  },
  {
    slug: 'que-es-el-imc-y-como-interpretarlo',
    title: '¿Qué es el Índice de Masa Corporal (IMC) y cómo interpretarlo?',
    summary: 'Descubre qué mide realmente el IMC, las categorías oficiales de peso establecidas por la OMS y los límites de este indicador de salud.',
    category: 'Salud',
    date: '2026-06-28',
    readTime: '5 min',
    relatedTools: ['bmi-calc'],
    content: `El Índice de Masa Corporal (IMC) es un indicador antropométrico sumamente popular que relaciona el peso de una persona con su estatura. Es utilizado de manera universal por médicos, nutricionistas e instituciones de salud pública para clasificar de manera rápida el estado ponderal de un individuo y evaluar potenciales riesgos metabólicos.

### ¿Cómo se calcula el IMC?
El cálculo del IMC es una operación aritmética muy simple. Se divide el peso corporal (expresado en kilogramos) entre la estatura al cuadrado (expresada en metros).

**Fórmula:**
$$\\text{IMC} = \\frac{\\text{Peso (kg)}}{\\text{Estatura (m)}^2}$$

*Ejemplo:* Si pesas 75 kg y mides 1.75 metros, el cálculo sería:
$$1.75 \\times 1.75 = 3.0625$$
$$\\text{IMC} = 75 / 3.0625 \\approx 24.49$$

### Rangos de clasificación según la OMS
La Organización Mundial de la Salud (OMS) establece los siguientes intervalos estándar para adultos mayores de 18 años:

1. **Bajo peso (< 18.5):** Indica que el peso está por debajo de lo saludable, lo cual puede comprometer el sistema inmune o indicar deficiencias nutricionales.
2. **Peso normal (18.5 - 24.9):** Es el rango óptimo asociado a una mayor longevidad y menor incidencia de enfermedades crónicas.
3. **Sobrepeso (25.0 - 29.9):** Indica un exceso de peso que, aunque no es considerado una enfermedad per se, eleva los factores de riesgo de padecer hipertensión o problemas cardiovasculares.
4. **Obesidad (\\ge 30.0):** Clasificada como una afección médica crónica en la que se acumula grasa en exceso, dividida en grado I, grado II y obesidad mórbida.

### ¿Cuándo puede fallar el IMC?
Es importante recalcar que el IMC es un estimador general y no mide la composición corporal directa. No distingue entre masa muscular (magra) y masa grasa. Por ello, atletas de alto rendimiento con alta masa muscular pueden dar resultados de "sobrepeso" o incluso "obesidad" sin tener exceso de grasa.

Para conocer tu índice al instante, introduce tus datos en nuestra **Calculadora de IMC** en la sección de calculadoras de salud.`
  },
  {
    slug: 'guia-formatos-imagen-jpg-png-webp',
    title: 'La guía definitiva de formatos de imagen: JPG vs PNG vs WEBP',
    summary: 'Aprende las diferencias entre los formatos de imagen más populares de internet, cuándo usarlos y cómo optimizar la velocidad de tu web.',
    category: 'Optimización Web',
    date: '2026-07-02',
    readTime: '6 min',
    relatedTools: ['compress-image', 'convert-image', 'resize-image'],
    content: `En el diseño y desarrollo web moderno, optimizar el rendimiento y los tiempos de carga es vital para complacer a tus visitantes y obtener una buena puntuación en los algoritmos de búsqueda de Google (Core Web Vitals). Uno de los factores que más influyen en el peso de una página web son las imágenes. Elegir el formato adecuado y comprimirlas correctamente puede reducir el peso de una web en más de un 70%.

A continuación, comparamos los tres formatos principales de la web: JPG, PNG y WEBP.

### 1. JPG / JPEG (Joint Photographic Experts Group)
Es el abuelo de los formatos digitales en internet. Es un formato de compresión con pérdida, lo que significa que elimina cierta información imperceptible del archivo original para reducir su peso drásticamente.

*   **Puntos Fuertes:** Excelente para fotografías con millones de colores y gradientes de color complejos.
*   **Puntos Débiles:** No soporta fondos transparentes. Pierde nitidez en líneas rectas, textos o gráficos con bordes definidos.
*   **¿Cuándo usarlo?:** Para imágenes de cabecera de artículos, fotografías realistas de productos o galerías fotográficas.

### 2. PNG (Portable Network Graphics)
PNG fue creado como una alternativa mejorada a GIF. Utiliza compresión sin pérdida (lossless), por lo que conserva toda la calidad de renderizado original del gráfico.

*   **Puntos Fuertes:** Soporta fondos transparentes impecables (canal alfa) y textos con nitidez extrema.
*   **Puntos Débiles:** Los archivos fotográficos tienden a pesar muchísimo en comparación con JPG.
*   **¿Cuándo usarlo?:** Logotipos, iconos de interfaces, capturas de pantalla de interfaces de software o gráficos lineales con texto.

### 3. WEBP (El formato moderno de Google)
WEBP es un formato de imagen de nueva generación lanzado por Google para ofrecer una compresión superior en internet. Soporta tanto compresión con pérdida como sin pérdida, transparencias y animaciones.

*   **Puntos Fuertes:** Consigue un peso de un 25% a un 35% menor que JPG y PNG manteniendo la misma calidad de visualización.
*   **Puntos Débiles:** Compatibilidad absoluta en navegadores antiguos (aunque hoy en día el 98% de los navegadores modernos lo soportan perfectamente).
*   **¿Cuándo usarlo?:** ¡En casi todo! Es el estándar recomendado para el SEO moderno.

### ¿Cómo optimizar tus imágenes fácilmente?
Para que tu web cargue a la velocidad de la luz, puedes usar nuestra herramienta **Comprimir Imagen** para reducir las KB de tus JPG/PNG, o **Convertir Formato de Imagen** para transformarlas en el moderno formato WEBP sin perder calidad visual de forma 100% gratuita.`
  },
  {
    slug: 'como-unir-multiples-pdfs-gratis',
    title: 'Cómo unir múltiples PDFs en un solo documento sin instalar programas',
    summary: 'Aprende a combinar, ordenar y fusionar tus archivos PDF en uno solo de forma rápida, segura y enteramente desde tu navegador.',
    category: 'Productividad',
    date: '2026-07-08',
    readTime: '3 min',
    relatedTools: ['merge-pdf', 'split-pdf', 'delete-pages'],
    content: `¿Alguna vez has tenido que escanear varios documentos por separado y luego te has visto obligado a enviarlos en varios correos electrónicos diferentes? Reunir todos tus recibos, contratos o apuntes en un único documento de formato PDF es clave para mantener la organización y proyectar una imagen profesional.

Tradicionalmente, para unir PDFs era necesario descargar costosas licencias de Adobe Acrobat o instalar programas de dudosa procedencia que consumían recursos de tu ordenador. Hoy en día, gracias a las APIs web modernas, puedes realizar esta tarea en un instante y con seguridad absoluta sin instalar nada.

### Pasos para unir tus archivos PDF online gratis:
1.  **Reúne tus archivos:** Pon en una carpeta de tu ordenador todos los PDFs que quieres fusionar.
2.  **Sube los documentos:** Arrastra los archivos dentro de la caja de subida de nuestra herramienta **Unir PDF**.
3.  **Ordena a tu gusto:** Puedes arrastrar las miniaturas de los archivos hacia arriba o hacia abajo para establecer el orden exacto de lectura que prefieras.
4.  **Fusiona y descarga:** Haz clic en el botón de fusionar. El proceso tarda milisegundos y te dará el documento final de inmediato.

### Privacidad ante todo
Un error común al unir PDFs online es utilizar servicios que suben tus archivos confidenciales a servidores remotos en la nube. Con nuestra plataforma, la combinación de archivos se realiza **dentro de tu propio navegador web** usando la potencia de JavaScript y WebAssembly. Tus contratos y facturas nunca viajan por la red ni se almacenan en servidores ajenos, ofreciendo la máxima privacidad y cumplimiento de RGPD.`
  }
];
