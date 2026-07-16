/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tool } from '../types';

export const CATEGORIES = [
  { id: 'pdf', title: 'PDF', description: 'Unir, dividir, comprimir y convertir documentos PDF', icon: 'FileText' },
  { id: 'calculadoras', title: 'Calculadoras', description: 'Calculadoras matemáticas, financieras y de salud', icon: 'Calculator' },
  { id: 'conversores', title: 'Conversores', description: 'Conversión de unidades de longitud, peso, monedas y más', icon: 'RefreshCw' },
  { id: 'texto', title: 'Texto', description: 'Contador de palabras, formateadores y conversores de texto', icon: 'AlignLeft' },
  { id: 'imagenes', title: 'Imágenes', description: 'Comprimir, redimensionar, recortar y generar códigos QR', icon: 'Image' },
  { id: 'desarrolladores', title: 'Desarrolladores', description: 'UUID, hashes, formateador de JSON y timestamps', icon: 'Code' }
] as const;

export const TOOLS: Tool[] = [
  // --- PDF TOOLS ---
  {
    id: 'pdf-to-word',
    title: 'PDF a Word',
    description: 'Extrae el texto de un archivo PDF y conviértelo a formato Word editable en segundos.',
    category: 'pdf',
    seoTitle: 'Convertir PDF a Word Gratis Online - Editable',
    seoDescription: 'Convierte tus archivos PDF a documentos de Word editables online. Extrae texto de forma rápida, segura y 100% gratuita sin instalar software.',
    guide: [
      'Selecciona o arrastra tu archivo PDF en la zona de carga.',
      'Haz clic en "Convertir a Word" para procesar el documento.',
      'Descarga tu archivo editable en formato Word (.docx o .txt) al instante.'
    ],
    faqs: [
      { q: '¿La conversión mantiene el formato del documento?', a: 'Sí, nuestra herramienta intenta conservar la estructura, el diseño y los saltos de línea del archivo PDF original.' },
      { q: '¿Es seguro subir mis documentos PDF?', a: 'Por supuesto. Todos los archivos se procesan de forma local en tu navegador y no se guardan en ningún servidor externo.' }
    ],
    related: ['word-to-pdf', 'pdf-to-jpg', 'compress-pdf'],
    keywords: ['pdf to word', 'pdf a word', 'convertir pdf', 'doc', 'docx']
  },
  {
    id: 'word-to-pdf',
    title: 'Word a PDF',
    description: 'Crea un documento PDF profesional a partir de texto o archivos de texto plano de manera inmediata.',
    category: 'pdf',
    seoTitle: 'Convertir Word o Texto a PDF Gratis Online',
    seoDescription: 'Crea y exporta documentos PDF a partir de archivos de texto o redactando directamente. Rápido, profesional y con formato limpio.',
    guide: [
      'Escribe o pega el texto que deseas en el editor de pantalla.',
      'Dale formato al documento si lo deseas utilizando las opciones visuales.',
      'Haz clic en "Generar PDF" y guárdalo en tu ordenador.'
    ],
    faqs: [
      { q: '¿Puedo subir un archivo .txt?', a: 'Sí, puedes pegar el contenido de cualquier archivo de texto en el editor para exportarlo como PDF.' }
    ],
    related: ['pdf-to-word', 'jpg-to-pdf', 'merge-pdf'],
    keywords: ['word to pdf', 'convertir word a pdf', 'crear pdf']
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF a JPG',
    description: 'Extrae imágenes y genera vistas de páginas de tus archivos PDF para guardarlas como JPG.',
    category: 'pdf',
    seoTitle: 'Convertir PDF a JPG Gratis Online - Extraer Páginas',
    seoDescription: 'Extrae imágenes y convierte cada página de tu PDF en una imagen JPG de alta resolución. Proceso rápido en el navegador sin descargas.',
    guide: [
      'Sube tu archivo PDF utilizando el selector de archivos.',
      'Selecciona si deseas extraer imágenes individuales o páginas completas.',
      'Descarga un archivo ZIP o las imágenes JPG individuales.'
    ],
    faqs: [
      { q: '¿Qué calidad tendrán las imágenes obtenidas?', a: 'Las imágenes se extraen con la resolución original del PDF, garantizando la máxima claridad posible.' }
    ],
    related: ['jpg-to-pdf', 'pdf-to-word', 'split-pdf'],
    keywords: ['pdf a jpg', 'pdf to jpg', 'extraer imagenes pdf', 'convertir pdf a imagen']
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG a PDF',
    description: 'Convierte tus fotos e imágenes en un único documento PDF ordenado y profesional.',
    category: 'pdf',
    seoTitle: 'Convertir JPG a PDF Gratis Online - Fotos a PDF',
    seoDescription: 'Une tus imágenes JPG, PNG o WEBP en un solo archivo PDF limpio y ordenado. Arrastra, ordena tus fotos y genera tu documento gratis.',
    guide: [
      'Selecciona una o más imágenes desde tu equipo.',
      'Arrastra las imágenes para ordenarlas como desees dentro del PDF.',
      'Haz clic en "Generar PDF" para descargar el documento resultante.'
    ],
    faqs: [
      { q: '¿Qué formatos de imagen se aceptan?', a: 'Puedes subir imágenes JPG, JPEG, PNG y WEBP para unirlas en un único PDF.' }
    ],
    related: ['pdf-to-jpg', 'merge-pdf', 'compress-pdf'],
    keywords: ['jpg a pdf', 'jpg to pdf', 'imagenes a pdf', 'unir fotos en pdf']
  },
  {
    id: 'merge-pdf',
    title: 'Unir PDF',
    description: 'Combina múltiples archivos PDF en un solo documento organizado según tus necesidades.',
    category: 'pdf',
    seoTitle: 'Unir PDF Online Gratis - Combinar Archivos PDF',
    seoDescription: 'Une dos o más archivos PDF en un solo documento de forma rápida y sencilla. Cambia el orden de los archivos antes de fusionarlos de forma segura.',
    guide: [
      'Sube los archivos PDF que deseas combinar.',
      'Reordena los archivos arrastrándolos en la pantalla.',
      'Haz clic en "Unir PDFs" y descarga el archivo unificado.'
    ],
    faqs: [
      { q: '¿Hay un límite de archivos para unir?', a: 'Puedes unir tantos archivos como necesites. Todo el procesamiento se realiza localmente, por lo que es rápido y seguro.' }
    ],
    related: ['split-pdf', 'delete-pages', 'compress-pdf'],
    keywords: ['unir pdf', 'merge pdf', 'combinar pdf', 'fusionar pdf']
  },
  {
    id: 'split-pdf',
    title: 'Dividir PDF',
    description: 'Separa un archivo PDF en páginas individuales o extrae un rango específico para crear uno nuevo.',
    category: 'pdf',
    seoTitle: 'Dividir PDF Online Gratis - Separar Páginas PDF',
    seoDescription: 'Divide tus archivos PDF de forma rápida. Extrae páginas individuales, rangos personalizados o divide todo el documento en partes de manera sencilla.',
    guide: [
      'Sube el documento PDF que quieres dividir.',
      'Introduce el rango de páginas (ej. 1-3) o selecciona páginas individuales.',
      'Descarga los archivos PDF resultantes con las páginas deseadas.'
    ],
    faqs: [
      { q: '¿Puedo extraer solo una página?', a: 'Sí, puedes seleccionar extraer una sola página y guardarla como un archivo PDF independiente.' }
    ],
    related: ['merge-pdf', 'extract-pages', 'delete-pages'],
    keywords: ['dividir pdf', 'split pdf', 'separar pdf', 'extraer paginas pdf']
  },
  {
    id: 'compress-pdf',
    title: 'Comprimir PDF',
    description: 'Reduce el tamaño de tu archivo PDF manteniendo la calidad visual para compartirlo más fácilmente por correo o web.',
    category: 'pdf',
    seoTitle: 'Comprimir PDF Gratis Online - Reducir Tamaño PDF',
    seoDescription: 'Optimiza y reduce el tamaño de tus PDF online gratis. Consigue un archivo más ligero sin perder calidad de lectura de forma segura.',
    guide: [
      'Selecciona el PDF que pesa demasiado.',
      'Elige el nivel de compresión que prefieras (Recomendado, Alto o Bajo).',
      'Haz clic en "Comprimir" y descarga el PDF optimizado con su peso reducido.'
    ],
    faqs: [
      { q: '¿Perderé mucha calidad al comprimir mi PDF?', a: 'Nuestra herramienta utiliza algoritmos de optimización que reducen los datos redundantes y comprimen imágenes sin afectar de forma notable la legibilidad del texto.' }
    ],
    related: ['merge-pdf', 'pdf-to-jpg', 'protect-pdf'],
    keywords: ['comprimir pdf', 'compress pdf', 'reducir pdf', 'bajar peso pdf']
  },
  {
    id: 'rotate-pdf',
    title: 'Rotar PDF',
    description: 'Gira las páginas de tus documentos PDF de forma individual o conjunta a la orientación correcta.',
    category: 'pdf',
    seoTitle: 'Rotar PDF Online Gratis - Girar Páginas PDF',
    seoDescription: '¿Tienes un PDF al revés o en horizontal? Rota páginas de tu PDF individualmente o todas juntas y descárgalo con la orientación ideal.',
    guide: [
      'Carga el archivo PDF que deseas girar.',
      'Rota cada página haciendo clic en los botones de giro (90°, 180°, 270°).',
      'Haz clic en "Guardar y Descargar" para obtener tu PDF corregido.'
    ],
    faqs: [
      { q: '¿Puedo rotar solo páginas específicas?', a: 'Sí, puedes rotar páginas de forma independiente sin alterar la orientación del resto del documento.' }
    ],
    related: ['delete-pages', 'merge-pdf', 'add-numbers'],
    keywords: ['rotar pdf', 'rotate pdf', 'girar pdf', 'voltear pdf']
  },
  {
    id: 'delete-pages',
    title: 'Eliminar páginas PDF',
    description: 'Elimina las páginas innecesarias de un archivo PDF y descarga un documento limpio.',
    category: 'pdf',
    seoTitle: 'Eliminar Páginas de un PDF Gratis Online',
    seoDescription: 'Quita hojas innecesarias de tus documentos PDF de forma fácil. Selecciona las páginas que no quieres y obtén un archivo PDF limpio y listo.',
    guide: [
      'Sube tu archivo PDF al cargador de la página.',
      'Visualiza las páginas del documento y selecciona las que desees eliminar.',
      'Haz clic en "Eliminar Páginas" y guarda tu nuevo PDF sin las páginas no deseadas.'
    ],
    faqs: [
      { q: '¿Puedo deshacer la selección?', a: 'Sí, puedes activar o desactivar las páginas antes de realizar el corte definitivo.' }
    ],
    related: ['extract-pages', 'split-pdf', 'rotate-pdf'],
    keywords: ['eliminar paginas pdf', 'borrar hojas pdf', 'quitar hojas de pdf']
  },
  {
    id: 'extract-pages',
    title: 'Extraer páginas PDF',
    description: 'Selecciona y descarga únicamente las páginas que te interesan de un documento PDF grande.',
    category: 'pdf',
    seoTitle: 'Extraer Páginas de un PDF Gratis Online',
    seoDescription: 'Selecciona y quédate solo con las hojas que necesitas de cualquier PDF. Extrae páginas sueltas o rangos enteros de forma ultra segura.',
    guide: [
      'Sube el documento PDF del cual quieres extraer páginas.',
      'Haz clic en las miniaturas de las páginas que deseas conservar.',
      'Pulsa en "Extraer Páginas" y descarga un nuevo PDF que incluya únicamente tu selección.'
    ],
    faqs: [
      { q: '¿El archivo original sufre modificaciones?', a: 'No, tu archivo original permanece intacto en tu ordenador; se descarga una copia modificada.' }
    ],
    related: ['delete-pages', 'split-pdf', 'merge-pdf'],
    keywords: ['extraer paginas pdf', 'obtener hojas pdf', 'sacar paginas pdf']
  },
  {
    id: 'add-numbers',
    title: 'Agregar números de página',
    description: 'Añade números de página a tus PDF con personalización de posición, tipografía y estilo.',
    category: 'pdf',
    seoTitle: 'Numerar Páginas de un PDF Gratis Online',
    seoDescription: 'Añade números de página de manera automática a tus archivos PDF. Elige la posición (arriba, abajo, izquierda, derecha) y dale estilo profesional.',
    guide: [
      'Sube tu documento PDF.',
      'Configura la posición (cabecera o pie de página), el estilo de numeración y el formato de visualización.',
      'Haz clic en "Agregar Números" y descarga el archivo numerado.'
    ],
    faqs: [
      { q: '¿Puedo excluir la primera página?', a: 'Sí, puedes marcar la opción para no mostrar la numeración en la portada del archivo.' }
    ],
    related: ['rotate-pdf', 'protect-pdf', 'merge-pdf'],
    keywords: ['numerar pdf', 'agregar numeros pdf', 'paginar pdf online']
  },
  {
    id: 'protect-pdf',
    title: 'Proteger PDF',
    description: 'Encripta y añade una contraseña fuerte a tus archivos PDF para evitar accesos no autorizados.',
    category: 'pdf',
    seoTitle: 'Proteger PDF con Contraseña Gratis Online',
    seoDescription: 'Protege tu privacidad bloqueando tus archivos PDF con una contraseña de encriptación fuerte. Proceso 100% local, seguro y privado.',
    guide: [
      'Selecciona el PDF que deseas encriptar.',
      'Introduce y confirma la contraseña de seguridad que quieres asignar.',
      'Haz clic en "Bloquear PDF" y guarda tu archivo cifrado de forma segura.'
    ],
    faqs: [
      { q: '¿Qué tipo de cifrado se utiliza?', a: 'Utilizamos cifrado estándar compatible con cualquier visor de PDF que requiera contraseña para su apertura.' }
    ],
    related: ['unlock-pdf', 'compress-pdf', 'add-numbers'],
    keywords: ['proteger pdf', 'cifrar pdf', 'password pdf', 'bloquear pdf']
  },
  {
    id: 'unlock-pdf',
    title: 'Desbloquear PDF',
    description: 'Elimina de forma permanente la contraseña de apertura y restricciones de un archivo PDF si conoces la clave.',
    category: 'pdf',
    seoTitle: 'Quitar Contraseña a un PDF Online Gratis',
    seoDescription: 'Desbloquea archivos PDF protegidos quitando la contraseña. Ideal para archivos personales que ya no necesitan cifrado.',
    guide: [
      'Sube tu PDF protegido.',
      'Introduce la contraseña actual del archivo.',
      'Haz clic en "Desbloquear" para generar una versión libre y sin contraseñas para el futuro.'
    ],
    faqs: [
      { q: '¿Puedo desbloquear un PDF si olvidé la contraseña?', a: 'No, por razones de seguridad debes conocer la contraseña actual para descifrar el PDF y remover el candado de forma legítima.' }
    ],
    related: ['protect-pdf', 'compress-pdf', 'split-pdf'],
    keywords: ['desbloquear pdf', 'quitar contraseña pdf', 'descifrar pdf']
  },

  // --- CALCULATORS ---
  {
    id: 'basic-calc',
    title: 'Calculadora básica',
    description: 'Realiza sumas, restas, multiplicaciones, divisiones y operaciones sencillas de forma rápida.',
    category: 'calculadoras',
    seoTitle: 'Calculadora Básica Online Gratis - Simple y Rápida',
    seoDescription: 'Calculadora online simple para tus operaciones aritméticas del día a día. Sencilla, intuitiva, con soporte para teclado y responsive.',
    guide: [
      'Introduce las cifras usando la pantalla táctil, el ratón o el teclado numérico.',
      'Selecciona la operación aritmética (+, -, *, /).',
      'Presiona el botón de igual (=) para visualizar el resultado instantáneamente.'
    ],
    faqs: [
      { q: '¿Puedo usar el teclado físico?', a: 'Sí, la calculadora está optimizada para recibir comandos numéricos y operaciones directamente desde tu teclado.' }
    ],
    related: ['scientific-calc', 'percentage-calc', 'three-rule-calc'],
    keywords: ['calculadora', 'calculadora basica', 'sumar', 'restar', 'operaciones simples']
  },
  {
    id: 'scientific-calc',
    title: 'Calculadora científica',
    description: 'Lleva a cabo cálculos avanzados como funciones trigonométricas, exponenciales, logaritmos y raíces.',
    category: 'calculadoras',
    seoTitle: 'Calculadora Científica Online Gratis Avanzada',
    seoDescription: 'Realiza cálculos complejos en línea con nuestra calculadora científica gratuita. Soporta sen, cos, tan, logaritmos, raíces y potencias.',
    guide: [
      'Introduce tus fórmulas numéricas en la barra de cálculo.',
      'Usa las teclas científicas para aplicar funciones matemáticas complejas (SIN, COS, TAN, log, etc.).',
      'Haz clic en "=" para resolver fórmulas avanzadas en tiempo real.'
    ],
    faqs: [
      { q: '¿Permite cálculo en radianes y grados?', a: 'Sí, puedes conmutar entre los modos DEG (grados) y RAD (radianes) fácilmente.' }
    ],
    related: ['basic-calc', 'percentage-calc', 'compound-calc'],
    keywords: ['calculadora cientifica', 'calculadora avanzada', 'trigonometria', 'raices', 'seno cosenos']
  },
  {
    id: 'percentage-calc',
    title: 'Calculadora de porcentajes',
    description: 'Calcula aumentos, disminuciones, proporciones y variaciones de porcentaje rápidamente.',
    category: 'calculadoras',
    seoTitle: 'Calculadora de Porcentajes Online Gratis',
    seoDescription: 'Aprende a calcular porcentajes fácilmente. Obtén incrementos, descuentos, porcentajes de una cifra y diferencias relativas al instante.',
    guide: [
      'Selecciona el tipo de cálculo de porcentaje que necesitas.',
      'Introduce los valores numéricos correspondientes en las casillas.',
      'Obtén el resultado matemático calculado al instante.'
    ],
    faqs: [
      { q: '¿Qué operaciones cubre?', a: 'Cubre: cuánto es el X% de un número, qué porcentaje es un número de otro, y cambios porcentuales (incrementos/decrementos).' }
    ],
    related: ['discount-calc', 'vat-calc', 'three-rule-calc'],
    keywords: ['calcular porcentaje', 'sacar porciento', 'porcentajes online', 'calculadora de porcentaje']
  },
  {
    id: 'vat-calc',
    title: 'Calculadora de IVA',
    description: 'Calcula el IVA, desglosa el impuesto o súmalo a cualquier precio base con tasas personalizadas.',
    category: 'calculadoras',
    seoTitle: 'Calculadora de IVA Gratis Online - Añadir y Desglosar',
    seoDescription: 'Calcula el impuesto sobre el valor añadido (IVA) de tus facturas o productos. Desglosa o suma el IVA con tasas de España, México y otros países.',
    guide: [
      'Introduce la cantidad base o el total facturado.',
      'Selecciona el porcentaje de IVA aplicable (ej. 21%, 16%, 10% o personalizado).',
      'Selecciona si deseas "Sumar IVA" o "Desglosar IVA" para ver el detalle de inmediato.'
    ],
    faqs: [
      { q: '¿Qué es desglosar el IVA?', a: 'Consiste en calcular el importe original neto antes de impuestos a partir del precio final de venta.' }
    ],
    related: ['discount-calc', 'percentage-calc', 'mortgage-calc'],
    keywords: ['calculadora de iva', 'calcular iva', 'desglosar iva', 'iva españa', 'iva mexico']
  },
  {
    id: 'discount-calc',
    title: 'Calculadora de descuentos',
    description: 'Averigua el precio final y el ahorro neto de cualquier rebaja antes de realizar tus compras.',
    category: 'calculadoras',
    seoTitle: 'Calculadora de Descuentos Online - Precio Rebajado',
    seoDescription: 'Calcula el precio final de un artículo rebajado. Descubre cuánto ahorras y el costo neto de cualquier oferta de forma ultra rápida.',
    guide: [
      'Escribe el precio de venta original del artículo.',
      'Introduce el porcentaje de descuento que se ofrece (ej. 20%).',
      'Visualiza el precio final rebajado y el total de dinero que te ahorras.'
    ],
    faqs: [
      { q: '¿Puedo añadir un descuento adicional o impuestos?', a: 'Sí, puedes incluir rebajas extra acumulables sobre el primer descuento de forma sencilla.' }
    ],
    related: ['percentage-calc', 'vat-calc', 'basic-calc'],
    keywords: ['calcular descuento', 'precio rebajado', 'descuentos rebajas', 'ahorro compras']
  },
  {
    id: 'bmi-calc',
    title: 'Calculadora de IMC',
    description: 'Determina tu Índice de Masa Corporal y conoce tu estado de peso según la Organización Mundial de la Salud.',
    category: 'calculadoras',
    seoTitle: 'Calculadora de IMC Gratis - Índice de Masa Corporal',
    seoDescription: 'Calcula tu IMC online de forma instantánea. Descubre si estás en tu peso ideal, bajo peso, sobrepeso u obesidad según directrices de la OMS.',
    guide: [
      'Selecciona tu género, e introduce tu peso actual en kilogramos.',
      'Introduce tu estatura exacta en centímetros (o metros).',
      'Haz clic en "Calcular IMC" y conoce tu puntuación junto con tu categoría nutricional.'
    ],
    faqs: [
      { q: '¿Qué es el IMC?', a: 'El Índice de Masa Corporal es una medida de asociación entre el peso y la talla de un individuo ideada por la OMS para clasificar el estado nutricional.' }
    ],
    related: ['age-calc', 'basic-calc', 'length-conv'],
    keywords: ['imc', 'calcular imc', 'indice de masa corporal', 'peso ideal', 'salud imc']
  },
  {
    id: 'age-calc',
    title: 'Calculadora de edad',
    description: 'Calcula tu edad exacta expresada en años, meses, semanas, días, horas e incluso minutos.',
    category: 'calculadoras',
    seoTitle: 'Calculadora de Edad Exacta Online Gratis',
    seoDescription: 'Calcula tu edad de forma exacta al segundo. Descubre cuántos años, meses, días, minutos y segundos llevas en el mundo con tu fecha de nacimiento.',
    guide: [
      'Introduce tu fecha exacta de nacimiento en el selector.',
      'Opcionalmente, especifica la fecha objetivo (por defecto es el día de hoy).',
      'Haz clic en "Calcular Edad" y lee la ficha detallada de tu tiempo de vida.'
    ],
    faqs: [
      { q: '¿Tiene en cuenta los años bisiestos?', a: 'Sí, todos nuestros algoritmos temporales contemplan con precisión absoluta los años bisiestos del calendario gregoriano.' }
    ],
    related: ['bmi-calc', 'time-conv', 'basic-calc'],
    keywords: ['calcular edad', 'cuantos años tengo', 'edad en dias', 'fecha nacimiento edad']
  },
  {
    id: 'mortgage-calc',
    title: 'Calculadora de hipoteca',
    description: 'Estima la cuota mensual de tu hipoteca, los intereses totales y el cuadro de amortización esperado.',
    category: 'calculadoras',
    seoTitle: 'Calculadora de Hipoteca Gratis - Simular Cuota Mensual',
    seoDescription: 'Simula las mensualidades de tu hipoteca. Calcula el coste de tu préstamo bancario introduciendo el capital, plazo de años y tasa de interés.',
    guide: [
      'Introduce el precio del inmueble o el capital del préstamo solicitado.',
      'Define la tasa de interés anual fija (TIN) acordada.',
      'Establece el plazo de amortización expresado en años.',
      'Obtén el pago mensual calculado y el total de interés acumulado al finalizar el préstamo.'
    ],
    faqs: [
      { q: '¿Qué es el interés compuesto en la hipoteca?', a: 'La mayoría de hipotecas emplean el sistema de amortización francés, donde al principio se pagan más intereses y menos capital.' }
    ],
    related: ['compound-calc', 'vat-calc', 'percentage-calc'],
    keywords: ['calcular hipoteca', 'simulador hipotecas', 'cuota hipoteca mensual', 'prestamo vivienda']
  },
  {
    id: 'compound-calc',
    title: 'Interés compuesto',
    description: 'Calcula el crecimiento a largo plazo de tus ahorros o inversiones aplicando capitalizaciones periódicas.',
    category: 'calculadoras',
    seoTitle: 'Calculadora de Interés Compuesto Online Gratis',
    seoDescription: 'Calcula el crecimiento futuro de tu dinero. Compara el efecto del interés compuesto con aportaciones periódicas mensuales o anuales fácilmente.',
    guide: [
      'Sube tu capital inicial de inversión.',
      'Establece la tasa de interés anual esperada (%) y la periodicidad del interés.',
      'Especifica el número de años y las contribuciones periódicas adicionales.',
      'Revisa la proyección detallada año a año del crecimiento de tu patrimonio.'
    ],
    faqs: [
      { q: '¿Qué diferencia hay con el interés simple?', a: 'En el interés compuesto, los intereses devengados al final de cada periodo se suman al capital, generando nuevos intereses.' }
    ],
    related: ['mortgage-calc', 'percentage-calc', 'basic-calc'],
    keywords: ['interes compuesto', 'calcular interes compuesto', 'ahorro inversion', 'crecimiento dinero']
  },
  {
    id: 'three-rule-calc',
    title: 'Regla de tres',
    description: 'Resuelve de forma instantánea cualquier proporción directa o inversa de la regla de tres simple.',
    category: 'calculadoras',
    seoTitle: 'Calculadora de Regla de Tres Simple Online',
    seoDescription: 'Calcula proporciones directas e inversas. Resuelve la incógnita X en tu regla de tres matemática de forma rápida, limpia y guiada.',
    guide: [
      'Selecciona si la proporción es Directa (más es más) o Inversa (más es menos).',
      'Rellena los tres valores conocidos (A, B y C).',
      'Visualiza el resultado numérico exacto calculado de la incógnita X.'
    ],
    faqs: [
      { q: '¿Cuándo usar una regla de tres directa?', a: 'Cuando las magnitudes son proporcionales: si una se duplica, la otra también (ej. más peso de fruta, mayor precio total).' }
    ],
    related: ['percentage-calc', 'basic-calc', 'scientific-calc'],
    keywords: ['regla de tres', 'calcular regla de tres', 'proporciones directas', 'regla de tres simple']
  },

  // --- CONVERTERS ---
  {
    id: 'length-conv',
    title: 'Longitud',
    description: 'Convierte unidades de distancia de manera instantánea: metros, kilómetros, millas, pulgadas, pies y más.',
    category: 'conversores',
    seoTitle: 'Conversor de Unidades de Longitud Online Gratis',
    seoDescription: 'Convierte distancias de manera rápida. Pasa de metros a pies, kilómetros a millas, centímetros a pulgadas de manera exacta.',
    guide: [
      'Introduce el valor numérico que quieres transformar.',
      'Selecciona la unidad de origen (ej. Metros) y la unidad de destino (ej. Pies).',
      'Lee la equivalencia numérica y la fórmula empleada.'
    ],
    faqs: [],
    related: ['area-conv', 'volume-conv', 'weight-conv'],
    keywords: ['conversor longitud', 'metros a pies', 'pulgadas a centimetros', 'unidades de medida']
  },
  {
    id: 'weight-conv',
    title: 'Peso y Masa',
    description: 'Transfiere medidas de masa rápidamente: kilogramos, gramos, libras, onzas y toneladas.',
    category: 'conversores',
    seoTitle: 'Conversor de Peso y Masa Online Gratis',
    seoDescription: 'Convierte fácilmente entre kilogramos, gramos, libras, onzas y toneladas con cálculos exactos y rápidos.',
    guide: ['Escribe el valor de peso.', 'Configura las unidades origen y fin.', 'Copia el resultado matemático.'],
    faqs: [],
    related: ['length-conv', 'volume-conv', 'bytes-conv'],
    keywords: ['conversor peso', 'kilogramos a libras', 'gramos a onzas', 'masa']
  },
  {
    id: 'area-conv',
    title: 'Área',
    description: 'Convierte medidas de superficie como metros cuadrados, hectáreas, acres y pies cuadrados.',
    category: 'conversores',
    seoTitle: 'Conversor de Unidades de Área y Superficie',
    seoDescription: 'Pasa de metros cuadrados a hectáreas, acres, kilómetros cuadrados de forma simple y en tiempo real.',
    guide: ['Introduce la superficie.', 'Selecciona la unidad origen y destino.', 'Descubre el resultado en segundos.'],
    faqs: [],
    related: ['length-conv', 'volume-conv', 'weight-conv'],
    keywords: ['conversor area', 'superficie', 'metros cuadrados a hectareas', 'acres']
  },
  {
    id: 'volume-conv',
    title: 'Volumen',
    description: 'Transfiere capacidades como litros, mililitros, galones, metros cúbicos y tazas.',
    category: 'conversores',
    seoTitle: 'Conversor de Volumen y Capacidad Online',
    seoDescription: 'Convierte entre litros, mililitros, galones americanos, metros cúbicos, tazas y onzas líquidas de forma instantánea.',
    guide: ['Sube el valor de volumen.', 'Selecciona los campos de origen y destino.', 'Recibe la conversión final.'],
    faqs: [],
    related: ['length-conv', 'area-conv', 'temp-conv'],
    keywords: ['conversor volumen', 'litros a galones', 'mililitros a tazas', 'capacidad']
  },
  {
    id: 'temp-conv',
    title: 'Temperatura',
    description: 'Convierte grados Celsius, Fahrenheit y Kelvin al instante con fórmulas físicas precisas.',
    category: 'conversores',
    seoTitle: 'Conversor de Temperatura - Celsius, Fahrenheit, Kelvin',
    seoDescription: 'Calcula temperaturas exactas de forma instantánea. Convierte entre grados centígrados, Fahrenheit y escala Kelvin con fórmulas completas.',
    guide: ['Escribe la temperatura numérica.', 'Elige Celsius, Fahrenheit o Kelvin en el origen.', 'Visualiza las conversiones a todas las demás escalas simultáneamente.'],
    faqs: [],
    related: ['speed-conv', 'time-conv', 'volume-conv'],
    keywords: ['conversor temperatura', 'celsius a fahrenheit', 'kelvin a celsius', 'grados']
  },
  {
    id: 'speed-conv',
    title: 'Velocidad',
    description: 'Pasa entre kilómetros por hora (km/h), millas por hora (mph), metros por segundo y nudos de forma inmediata.',
    category: 'conversores',
    seoTitle: 'Conversor de Unidades de Velocidad Online',
    seoDescription: 'Calculadora para transformar velocidades entre km/h, mph, metros por segundo y nudos con soporte de conversión instantáneo.',
    guide: ['Introduce la velocidad.', 'Selecciona las unidades de escala.', 'Lee el resultado de equivalencia.'],
    faqs: [],
    related: ['temp-conv', 'time-conv', 'length-conv'],
    keywords: ['conversor velocidad', 'km/h a mph', 'metros por segundo', 'nudos']
  },
  {
    id: 'time-conv',
    title: 'Tiempo',
    description: 'Transfiere lapsos de tiempo de segundos, minutos, horas, días, semanas y años de forma simple.',
    category: 'conversores',
    seoTitle: 'Conversor de Unidades de Tiempo Gratis',
    seoDescription: 'Herramienta de conversión temporal. Pasa minutos a horas, días a semanas, años a días de manera sencilla y ágil.',
    guide: ['Escribe el periodo temporal.', 'Selecciona las métricas que te interesan.', 'Obtén la descomposición completa.'],
    faqs: [],
    related: ['age-calc', 'speed-conv', 'bytes-conv'],
    keywords: ['conversor tiempo', 'segundos a minutos', 'horas a dias', 'tiempo exacto']
  },
  {
    id: 'currency-conv',
    title: 'Monedas',
    description: 'Calcula conversiones monetarias actualizadas entre dólares (USD), euros (EUR), pesos y libras esterlinas.',
    category: 'conversores',
    seoTitle: 'Conversor de Divisas y Monedas Online Gratis',
    seoDescription: 'Calcula el tipo de cambio entre las principales monedas del mundo: Dólar, Euro, Peso Mexicano, Libra y más con ratios actualizados.',
    guide: ['Sube el importe en tu moneda base.', 'Elige la divisa de origen y de destino.', 'Mira la conversión financiera calculada.'],
    faqs: [],
    related: ['bytes-conv', 'freq-conv', 'vat-calc'],
    keywords: ['conversor monedas', 'divisas', 'dolares a euros', 'pesos a dolares', 'tipo de cambio']
  },
  {
    id: 'bytes-conv',
    title: 'Bytes y Datos',
    description: 'Calcula conversiones informáticas exactas entre Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB) y Terabytes (TB).',
    category: 'conversores',
    seoTitle: 'Conversor de Unidades de Almacenamiento - Bytes, MB, GB',
    seoDescription: 'Convierte datos informáticos con precisión matemática. Pasa de Megabytes a Gigabytes, Bytes a Kilobytes y más en base 1024 o base 1000.',
    guide: ['Añade el valor de almacenamiento.', 'Configura las unidades del chip.', 'Lee la correspondencia de archivos.'],
    faqs: [],
    related: ['freq-conv', 'time-conv', 'weight-conv'],
    keywords: ['conversor bytes', 'megabytes a gigabytes', 'kb a mb', 'datos almacenamiento']
  },
  {
    id: 'freq-conv',
    title: 'Frecuencia',
    description: 'Convierte frecuencias entre hercios (Hz), kilohercios (kHz), megahercios (MHz) y gigahercios (GHz).',
    category: 'conversores',
    seoTitle: 'Conversor de Frecuencia Online - Hz, kHz, MHz',
    seoDescription: 'Pasa frecuencias de hercios a megahercios y gigahertz de manera fácil con nuestra calculadora de frecuencias de física.',
    guide: ['Rellena la cantidad de ciclos por segundo.', 'Elige la escala de hercios.', 'Visualiza las equivalencias físicas.'],
    faqs: [],
    related: ['bytes-conv', 'time-conv', 'speed-conv'],
    keywords: ['conversor frecuencia', 'hercios a kilohercios', 'hz a mhz', 'frecuencia fisica']
  },

  // --- TEXT TOOLS ---
  {
    id: 'word-count',
    title: 'Contador de palabras',
    description: 'Analiza tu texto para contar palabras, caracteres, oraciones y estimar el tiempo de lectura óptimo.',
    category: 'texto',
    seoTitle: 'Contador de Palabras y Caracteres Gratis Online',
    seoDescription: 'Cuenta palabras, letras, caracteres, párrafos y líneas de tu texto en tiempo real. Incluye tiempo estimado de lectura para SEO y redactores.',
    guide: [
      'Pega o escribe tu contenido en el cuadro de texto.',
      'Revisa las estadísticas dinámicas de inmediato en los paneles superiores.',
      'Copia o limpia el texto cuando lo desees.'
    ],
    faqs: [
      { q: '¿Se cuentan los espacios?', a: 'El analizador muestra dos métricas: caracteres totales con espacios y caracteres netos sin incluir los espacios en blanco.' }
    ],
    related: ['char-count', 'remove-spaces', 'lorem-ipsum'],
    keywords: ['contador de palabras', 'contar caracteres', 'contar letras', 'analizador de texto']
  },
  {
    id: 'char-count',
    title: 'Contador de caracteres',
    description: 'Especializado en medir la longitud de tu texto para publicaciones con límites estrictos de redes sociales.',
    category: 'texto',
    seoTitle: 'Contador de Caracteres Online con Límites de Redes Sociales',
    seoDescription: 'Controla la longitud de tus textos. Compara tu recuento de letras con los límites oficiales de Twitter (X), Facebook, Instagram y Meta titles.',
    guide: ['Escribe tu borrador en la caja.', 'Mira cómo avanza el medidor de límite para cada red social.', 'Pulsa copiar para llevar el post a tu red favorita.'],
    faqs: [],
    related: ['word-count', 'uppercase-text', 'slug-gen'],
    keywords: ['contar caracteres', 'limites redes sociales', 'longitud twitter', 'letras post']
  },
  {
    id: 'remove-spaces',
    title: 'Eliminar espacios',
    description: 'Limpia tu texto removiendo espacios dobles, saltos de línea vacíos y espacios extras innecesarios.',
    category: 'texto',
    seoTitle: 'Eliminar Espacios en Blanco de un Texto Online',
    seoDescription: 'Limpia textos eliminando espacios duplicados, tabulaciones y saltos de línea de forma rápida para programadores y redactores.',
    guide: ['Carga el texto desordenado.', 'Elige el modo de limpieza (Espacios duplicados, Todos los espacios, Saltos de línea).', 'Obtén el texto optimizado al instante.'],
    faqs: [],
    related: ['word-count', 'capitalize-text', 'lowercase-text'],
    keywords: ['eliminar espacios', 'quitar espacios dobles', 'limpiar texto', 'formatear parrafos']
  },
  {
    id: 'uppercase-text',
    title: 'Convertir a Mayúsculas',
    description: 'Transforma cualquier texto o párrafo completamente a letras mayúsculas con un solo clic.',
    category: 'texto',
    seoTitle: 'Convertir Texto a Mayúsculas Online Gratis',
    seoDescription: 'Pasa cualquier texto a mayúsculas sostenidas de forma instantánea. Copia el resultado y ahorra tiempo de reescritura manual.',
    guide: ['Pega tu texto en minúsculas.', 'La conversión a mayúsculas se realiza al instante de escribir o pulsar el botón.', 'Copia el bloque listo al portapapeles.'],
    faqs: [],
    related: ['lowercase-text', 'capitalize-text', 'word-count'],
    keywords: ['texto mayusculas', 'convertir mayusculas', 'pasar a mayusculas', 'letras grandes']
  },
  {
    id: 'lowercase-text',
    title: 'Convertir a Minúsculas',
    description: 'Cambia de forma masiva textos enteros a minúsculas, arreglando palabras mal escritas con bloqueo de mayúsculas.',
    category: 'texto',
    seoTitle: 'Convertir Texto a Minúsculas Online Gratis',
    seoDescription: 'Pasa textos de mayúsculas a minúsculas de manera fácil y rápida en tu navegador de forma gratuita.',
    guide: ['Pega el texto que quieres transformar.', 'La herramienta lo convertirá todo a letras minúsculas inmediatamente.', 'Copia el texto final limpio.'],
    faqs: [],
    related: ['uppercase-text', 'capitalize-text', 'remove-spaces'],
    keywords: ['pasar a minusculas', 'texto minuscula', 'convertidor minusculas', 'corregir mayusculas']
  },
  {
    id: 'capitalize-text',
    title: 'Capitalizar texto',
    description: 'Pon en mayúscula la primera letra de cada frase o palabra de tu texto, ideal para títulos y redacciones formales.',
    category: 'texto',
    seoTitle: 'Capitalizar Texto Online - Primera Letra en Mayúscula',
    seoDescription: 'Convierte tus títulos colocando la primera letra de cada palabra o frase en mayúscula. Excelente formato para SEO, libros y redacciones.',
    guide: ['Introduce tus párrafos.', 'Selecciona el método de capitalización ("Tipo Título" o "Inicio de Frase").', 'Copia el resultado estilizado.'],
    faqs: [],
    related: ['uppercase-text', 'lowercase-text', 'lorem-ipsum'],
    keywords: ['capitalizar texto', 'primera letra mayuscula', 'formato titulo', 'capitalizar online']
  },
  {
    id: 'lorem-ipsum',
    title: 'Generador Lorem Ipsum',
    description: 'Crea textos de relleno de muestra personalizados en párrafos, palabras o listas para tus diseños web.',
    category: 'texto',
    seoTitle: 'Generador de Lorem Ipsum Gratis - Texto de Relleno',
    seoDescription: 'Genera texto simulado Lorem Ipsum para tus prototipos web, editoriales o maquetaciones. Elige el número de párrafos o palabras que necesitas.',
    guide: ['Selecciona si deseas generar párrafos, palabras o elementos de lista.', 'Ajusta la cantidad deseada.', 'Copia el bloque de texto ficticio generado.'],
    faqs: [],
    related: ['word-count', 'slug-gen', 'base64-encode'],
    keywords: ['lorem ipsum', 'texto de relleno', 'generador de texto ficticio', 'maquetacion web']
  },
  {
    id: 'slug-gen',
    title: 'Generador de Slugs',
    description: 'Crea URLs amigables (slugs) y optimizadas para SEO a partir de cualquier título de artículo o herramienta.',
    category: 'texto',
    seoTitle: 'Generador de Slugs Online - URLs Amigables SEO',
    seoDescription: 'Transforma títulos complejos con caracteres especiales en slugs limpios, URL-safe y optimizados para el posicionamiento de tus páginas web.',
    guide: ['Escribe el título de tu artículo o categoría.', 'Configura si deseas separar con guiones, remover palabras vacías, o pasar a minúsculas.', 'Copia la URL amigable limpia generada.'],
    faqs: [],
    related: ['char-count', 'lorem-ipsum', 'base64-encode'],
    keywords: ['slug generator', 'urls amigables', 'seo url', 'generar slug']
  },
  {
    id: 'base64-encode',
    title: 'Base64 Codificar',
    description: 'Codifica cualquier texto plano a formato Base64 de forma rápida y segura en el lado del cliente.',
    category: 'texto',
    seoTitle: 'Codificar Texto a Base64 Gratis Online',
    seoDescription: 'Convierte textos planos en cadenas codificadas Base64 de forma segura. Proceso local inmediato ideal para desarrolladores y analistas.',
    guide: ['Introduce el texto legible.', 'Observa la cadena Base64 generada automáticamente.', 'Copia la codificación con un clic.'],
    faqs: [],
    related: ['base64-decode', 'hash-gen', 'uuid-gen'],
    keywords: ['base64 encode', 'codificar base64', 'encriptar base64', 'dev tools']
  },
  {
    id: 'base64-decode',
    title: 'Base64 Decodificar',
    description: 'Decodifica de manera segura cadenas cifradas en Base64 de vuelta a su texto legible original.',
    category: 'texto',
    seoTitle: 'Decodificar Base64 a Texto Online Gratis',
    seoDescription: 'Sube o pega cadenas codificadas en Base64 y recupéralas en texto legible original. Conversión local, instantánea y segura sin servidores.',
    guide: ['Pega el código Base64 en el cajetín de entrada.', 'La herramienta resolverá la decodificación inmediatamente.', 'Copia el texto plano descifrado resultante.'],
    faqs: [],
    related: ['base64-encode', 'json-validate', 'timestamp-conv'],
    keywords: ['base64 decode', 'decodificar base64', 'traducir base64', 'texto plano base64']
  },

  // --- IMAGES ---
  {
    id: 'compress-image',
    title: 'Comprimir imagen',
    description: 'Reduce el peso en KB de tus fotos JPG, PNG o WEBP ajustando la calidad visual en tiempo real en el navegador.',
    category: 'imagenes',
    seoTitle: 'Comprimir Imágenes Gratis Online - Reducir Peso de Fotos',
    seoDescription: 'Reduce el tamaño de tus fotos online. Comprime imágenes JPG, PNG y WEBP ajustando la calidad para optimizar tu web o subir archivos rápido.',
    guide: [
      'Sube la foto que desees optimizar (JPG, PNG o WEBP).',
      'Desplaza la barra de calidad para ver el tamaño estimado final y la vista previa.',
      'Descarga tu imagen comprimida optimizada.'
    ],
    faqs: [
      { q: '¿Mis imágenes se suben a internet?', a: 'No. Toda la compresión se ejecuta localmente mediante la API Canvas de tu propio navegador web, manteniendo tu privacidad intacta.' }
    ],
    related: ['resize-image', 'convert-image', 'crop-image'],
    keywords: ['comprimir imagen', 'optimizar foto', 'reducir peso kb', 'bajar tamaño imagen']
  },
  {
    id: 'resize-image',
    title: 'Redimensionar imagen',
    description: 'Cambia el ancho y alto en píxeles de cualquier imagen manteniendo o desbloqueando la proporción original.',
    category: 'imagenes',
    seoTitle: 'Redimensionar Imagen Gratis Online - Cambiar Pixeles',
    seoDescription: 'Ajusta el tamaño en píxeles de tus fotos. Modifica ancho y alto de imágenes JPG, PNG y WEBP conservando la proporción de forma fácil.',
    guide: ['Sube tu imagen.', 'Introduce los nuevos valores de ancho o alto en píxeles.', 'Haz clic en "Guardar Imagen" con el nuevo tamaño.'],
    faqs: [],
    related: ['compress-image', 'convert-image', 'crop-image'],
    keywords: ['redimensionar imagen', 'cambiar pixeles', 'ancho y alto foto', 'escalar imagen']
  },
  {
    id: 'convert-image',
    title: 'Convertir formato de imagen',
    description: 'Convierte de manera fluida tus archivos fotográficos entre JPG, PNG y formato moderno optimizado WEBP.',
    category: 'imagenes',
    seoTitle: 'Convertir Formato de Imagen - JPG, PNG, WEBP Online',
    seoDescription: 'Convierte tus fotos al formato que necesites gratis. Convierte JPG a PNG, PNG a WEBP, WEBP a JPG de forma inmediata y sin límite.',
    guide: ['Sube una foto.', 'Selecciona el formato de salida deseado (WEBP, PNG, JPG).', 'Descarga el nuevo archivo en el formato seleccionado.'],
    faqs: [],
    related: ['compress-image', 'resize-image', 'qr-gen'],
    keywords: ['convertir imagen', 'jpg a png', 'png a webp', 'webp a jpg', 'formato foto']
  },
  {
    id: 'crop-image',
    title: 'Recortar imagen',
    description: 'Selecciona la sección importante de una foto con un encuadre preciso para recortarla de inmediato.',
    category: 'imagenes',
    seoTitle: 'Recortar Imagen Online Gratis - Encuadre Fácil',
    seoDescription: 'Recorta fotos online gratis de forma interactiva. Selecciona el área que deseas conservar de tu imagen y descárgala recortada al instante.',
    guide: ['Sube tu imagen al panel.', 'Usa las esquinas del recuadro interactivo para enfocar tu sección favorita.', 'Pulsa en "Recortar y Descargar" para guardar el resultado.'],
    faqs: [],
    related: ['resize-image', 'compress-image', 'convert-image'],
    keywords: ['recortar imagen', 'recortar foto', 'crop image online', 'cortar bordes imagen']
  },
  {
    id: 'qr-gen',
    title: 'Generador QR',
    description: 'Crea códigos QR personalizados para enlaces, textos, correos o claves de Wi-Fi de forma gratuita.',
    category: 'imagenes',
    seoTitle: 'Generar Código QR Gratis Online - Personalizado',
    seoDescription: 'Genera códigos QR gratis para tu negocio, web o enlaces. Introduce un texto o URL, personaliza los colores y descárgalo como imagen.',
    guide: [
      'Elige el tipo de datos (URL, Texto, Teléfono, Wi-Fi).',
      'Escribe la información que contendrá el QR.',
      'Personaliza el color del código y descárgalo como un archivo de imagen listo para imprimir.'
    ],
    faqs: [
      { q: '¿Los códigos QR generados caducan?', a: 'No, son códigos QR estáticos, por lo que funcionarán de por vida de forma gratuita sin límites de escaneo.' }
    ],
    related: ['qr-read', 'convert-image', 'uuid-gen'],
    keywords: ['generador qr', 'crear codigo qr', 'qr online gratis', 'hacer codigo qr']
  },
  {
    id: 'qr-read',
    title: 'Lector de QR',
    description: 'Escanea y decodifica cualquier código QR subiendo una imagen o utilizando la cámara del dispositivo.',
    category: 'imagenes',
    seoTitle: 'Lector de Código QR Online - Escanear desde Imagen',
    seoDescription: 'Escanea códigos QR gratis online de forma rápida. Sube una foto de un código QR o actívalo con la webcam para leer su contenido en segundos.',
    guide: ['Selecciona una imagen que contenga un código QR o activa la cámara.', 'Nuestra app detectará y procesará el código de inmediato.', 'Copia el enlace o texto decodificado que se muestra en pantalla.'],
    faqs: [],
    related: ['qr-gen', 'convert-image', 'json-validate'],
    keywords: ['lector qr', 'escanear qr', 'leer qr online', 'escanear qr con foto']
  },

  // --- DEV TOOLS ---
  {
    id: 'uuid-gen',
    title: 'UUID Generator',
    description: 'Genera identificadores únicos universales (UUID v4) aleatorios de alta seguridad para desarrollo.',
    category: 'desarrolladores',
    seoTitle: 'Generador UUID v4 Online - Identificadores Únicos',
    seoDescription: 'Genera cadenas de UUID versión 4 aleatorias seguras de forma masiva o individual. Herramienta gratuita e indispensable para desarrolladores.',
    guide: [
      'Selecciona el número de identificadores UUID que necesitas generar.',
      'Elige si deseas que estén en mayúsculas o minúsculas.',
      'Haz clic en "Generar" y copia el listado al portapapeles.'
    ],
    faqs: [
      { q: '¿Qué es un UUID v4?', a: 'Es un identificador único universal de 128 bits generado mediante números pseudoaleatorios, con una probabilidad de colisión prácticamente nula.' }
    ],
    related: ['hash-gen', 'json-format', 'base64-encode'],
    keywords: ['uuid generator', 'generador uuid', 'guid generator', 'ids unicos', 'dev tools']
  },
  {
    id: 'hash-gen',
    title: 'Hash Generator',
    description: 'Genera firmas criptográficas MD5, SHA-1 y SHA-256 a partir de cualquier cadena de texto localmente.',
    category: 'desarrolladores',
    seoTitle: 'Generador de Hashes Online - MD5, SHA-1, SHA-256',
    seoDescription: 'Genera firmas criptográficas para tus textos. Calcula instantáneamente hashes MD5, SHA-1, SHA-224, SHA-256, SHA-384 y SHA-512 de forma segura.',
    guide: ['Escribe o pega el texto base.', 'Visualiza las diferentes sumas de verificación criptográficas en tiempo real.', 'Copia el hash deseado con un solo clic.'],
    faqs: [],
    related: ['uuid-gen', 'base64-encode', 'json-validate'],
    keywords: ['hash generator', 'md5', 'sha256', 'sha1', 'encriptar texto']
  },
  {
    id: 'json-format',
    title: 'Formateador JSON',
    description: 'Embellece y ordena estructuras de datos JSON desordenadas con sangría personalizable.',
    category: 'desarrolladores',
    seoTitle: 'Formateador de JSON Online - JSON Beautifier',
    seoDescription: 'Formatea, embellece y ordena tus códigos JSON para que sean legibles. Elige el tamaño de tabulación e indenta tus estructuras de datos gratis.',
    guide: ['Pega tu código JSON sin formato en el cuadro izquierdo.', 'Selecciona el nivel de sangría (2 o 4 espacios).', 'Copia el JSON embellecido y formateado del panel derecho.'],
    faqs: [],
    related: ['json-validate', 'uuid-gen', 'timestamp-conv'],
    keywords: ['json formatter', 'formateador json', 'beautify json', 'ordenar json']
  },
  {
    id: 'json-validate',
    title: 'JSON Validator',
    description: 'Comprueba si una cadena JSON es sintácticamente válida y localiza los errores de parseo detalladamente.',
    category: 'desarrolladores',
    seoTitle: 'Validar JSON Online - Verificar Sintaxis JSON',
    seoDescription: 'Valida tus cadenas de texto JSON. Descubre si tu código cumple con la especificación RFC 8259 y localiza la línea exacta de errores de sintaxis.',
    guide: ['Pega el código JSON que genera dudas.', 'La herramienta analizará la estructura sintáctica en tiempo real.', 'Lee la confirmación de validez o la descripción del error de parseo.'],
    faqs: [],
    related: ['json-format', 'base64-decode', 'hash-gen'],
    keywords: ['json validator', 'validar json', 'comprobar json', 'json error parse']
  },
  {
    id: 'timestamp-conv',
    title: 'Timestamp Converter',
    description: 'Convierte marcas de tiempo Unix (segundos/milisegundos) a fechas legibles y viceversa de forma sencilla.',
    category: 'desarrolladores',
    seoTitle: 'Conversor de Unix Timestamp a Fecha Online',
    seoDescription: 'Convierte marcas de tiempo de Unix (timestamps) a fechas humanas en UTC o zona horaria local, o transforma cualquier fecha en época Unix.',
    guide: [
      'Introduce el timestamp de Unix para pasarlo a fecha, o selecciona una fecha y hora en el calendario para calcular su timestamp Unix.',
      'Obtén los resultados desglosados en zona horaria local, UTC, hora ISO y formato relativo.'
    ],
    faqs: [
      { q: '¿Qué es el Unix epoch?', a: 'Es el número de segundos transcurridos desde el 1 de enero de 1970 a las 00:00:00 UTC, utilizado como estándar de conteo de tiempo en informática.' }
    ],
    related: ['uuid-gen', 'json-format', 'time-conv'],
    keywords: ['timestamp converter', 'unix time', 'convertir fecha a unix', 'epoca unix', 'dev tools']
  }
];
