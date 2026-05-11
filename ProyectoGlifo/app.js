/* GLIFO - Escritura Creativa con Palabras Clave */
/* Sistema de evaluación avanzada con retroalimentación contextual */

const keywordsEl = document.getElementById('keywords');
const poemEl = document.getElementById('poem');
const evaluateBtn = document.getElementById('evaluate');
const newWordsBtn = document.getElementById('newWords');
const refreshKeywordsBtn = document.getElementById('refreshKeywords');
const scrollToCardBtn = document.getElementById('scrollToCard');
const resultEl = document.getElementById('result');

/* Banco de palabras para generar combinaciones aleatorias */
const WORD_BANK = [
  'amor', 'soledad', 'alegría', 'tristeza', 'miedo', 'esperanza', 'furia', 'calma',
  'sueño', 'nostalgia', 'pasión', 'melancolía', 'éxtasis', 'angustia', 'paz',
  'mar', 'viento', 'fuego', 'tierra', 'cielo', 'luna', 'sol', 'estrella',
  'arena', 'montaña', 'río', 'bosque', 'tormenta', 'nieve', 'lluvia',
  'sombra', 'luz', 'espejo', 'camino', 'puerta', 'ventana', 'reloj', 'silencio',
  'recuerdo', 'destino', 'tiempo', 'espacio', 'infinito', 'laberinto', 'refugio'
];

/* Banco de calificadores para Puntos Fuertes */
const STRENGTH_PHRASES = {
  very_creative: [
    "🎨 ¡Desborda creatividad!",
    "🌟 Tu imaginación vuela alto",
    "✨ Un enfoque realmente original",
    "💫 La creatividad fluye en cada verso",
    "🎭 Excelente expresión artística",
    "🌈 Una visión poética única",
    "⭐ Brillante uso de la imaginación",
    "🦋 Metáforas que cautivan"
  ],
  good_vocabulary: [
    "📚 Vocabulario rico y variado",
    "🎯 Precisión léxica excelente",
    "💎 Palabras bien escogidas",
    "📖 Dominio del lenguaje notable",
    "🔤 Gran riqueza expresiva",
    "✨ Selección de términos acertada"
  ],
  emotional: [
    "💖 Transmite emociones genuinas",
    "🌊 Profundidad sentimental",
    "💗 Conexión emocional poderosa",
    "🎭 Autenticidad en cada verso",
    "🌟 Sensibilidad extraordinaria",
    "💫 Logra conmover al lector"
  ],
  structure: [
    "📐 Estructura poética sólida",
    "🎵 Buen ritmo y musicalidad",
    "📝 Organización cuidada",
    "🔷 Versos bien construidos",
    "⚡ Fluidez excelente",
    "🎨 Distribución equilibrada"
  ],
  keywords_excellent: [
    "🎯 Dominas las palabras clave",
    "🏆 Integración perfecta de términos",
    "💪 Uso magistral del vocabulario sugerido",
    "✨ Las palabras clave potencian tu poema",
    "🎨 Creatividad al incorporar los términos"
  ],
  imagery: [
    "🌅 Imágenes vívidas y sugerentes",
    "🎨 Metáforas que inspiran",
    "🖼️ Poesía visualmente rica",
    "🌈 Descripciones que pintan emociones",
    "✨ Capacidad para crear atmósferas"
  ]
};

/* Banco de consejos variados según características */
const ADVICE_BANK = {
  short_poem: [
    "💡 Tu poema es breve pero intenso. ¿Qué pasaría si añadieras una estrofa más desarrollando la idea principal?",
    "💡 Considera expandir tus imágenes poéticas. Un poema más largo permite mayor profundidad emocional.",
    "💡 Los grandes poemas a veces son breves, pero el tuyo podría beneficiarse de un verso más que cierre con fuerza.",
    "💡 Aprovecha cada palabra al máximo. En poemas cortos, cada término debe ser esencial y poderoso."
  ],
  long_poem: [
    "💡 Tu poema tiene buena extensión. Ahora revisa si cada verso añade algo nuevo a tu mensaje.",
    "💡 Los poemas extensos permiten desarrollar narrativas. ¿Hay alguna línea que puedas expandir aún más?",
    "💡 Excelente despliegue de ideas. Asegúrate de mantener el interés del lector de principio a fin.",
    "💡 La longitud te da espacio para explorar. ¿Podrías introducir un giro o revelación hacia el final?"
  ],
  no_punctuation: [
    "💡 La puntuación guía la respiración del lector. Prueba con puntos y comas para crear pausas dramáticas.",
    "💡 Los signos de puntuación son como las notas musicales en una partitura. ¡Úsalos para dirigir la lectura!",
    "💡 Un punto al final de una idea puede crear un silencio poderoso. Experimenta con diferentes pausas.",
    "💡 Las comas pueden crear ritmo, los puntos pueden enfatizar. Juega con ellos para dar musicalidad."
  ],
  good_punctuation: [
    "💡 ¡Excelente uso de la puntuación! Los puntos y comas crean un ritmo muy agradable.",
    "💡 Los signos de puntuación están bien ubicados. Eso demuestra dominio técnico.",
    "💡 La puntuación que usaste guía perfectamente la lectura emocional del poema.",
    "💡 Tus pausas están bien medidas. Eso demuestra sensibilidad poética."
  ],
  keyword_advice: [
    "💡 Las palabras clave son semillas poéticas. Plántalas en diferentes versos para que florezcan.",
    "💡 No solo menciones las palabras clave; juega con ellas, transformalas en metáforas.",
    "💡 Cada palabra clave debería aportar algo único. ¿Puedes darle un giro sorprendente?",
    "💡 La repetición creativa de palabras clave puede generar un estribillo poderoso.",
    "💡 Integra las palabras clave al final de los versos para darles más peso y resonancia."
  ],
  good_keyword_use: [
    "💡 ¡Brillante integración de palabras clave! Se sienten naturales y necesarias.",
    "💡 Las palabras clave están tan bien integradas que parecen hechas para tu poema.",
    "💡 Cada palabra clave aporta una capa nueva de significado. Excelente trabajo.",
    "💡 Transformaste las palabras sugeridas en imágenes propias. Eso es verdadera creación."
  ],
  repetition: [
    "💡 La repetición puede ser una herramienta poderosa, pero con moderación. Busca sinónimos creativos.",
    "💡 Varía tu vocabulario para mantener el interés. Un diccionario de sinónimos puede ser tu mejor aliado.",
    "💡 Palabras como '{word}' aparecen muy seguido. ¿Podrías usar pronombres o reformular?",
    "💡 La repetición excesiva resta fuerza. Dale espacio a cada palabra para que respire."
  ],
  short_lines: [
    "💡 Los versos cortos crean ritmo rápido. Combínalos con algunos más largos para variar.",
    "💡 Tus líneas son dinámicas. ¿Has considerado algún verso más extenso para crear contraste?",
    "💡 El verso corto es un latido. Úsalo para momentos de alta intensidad emocional.",
    "💡 Alternar versos cortos y largos puede crear una sinfonía poética muy interesante."
  ],
  long_lines: [
    "💡 Versos extensos permiten desarrollar ideas complejas. ¿Podrías cortar alguno para crear pausas?",
    "💡 Líneas largas crean un flujo continuo. A veces un corte estratégico puede generar más impacto.",
    "💡 Tus versos tienen desarrollo narrativo. Un verso corto de repente podría sorprender al lector.",
    "💡 El verso extenso invita a respirar profundo. Úsalo para momentos de reflexión."
  ],
  emotional_advice: [
    "💡 La emoción está presente, pero ¿puedes hacerla más tangible con imágenes concretas?",
    "💡 Un verso como 'siento {emoción}' gana fuerza si muestras por qué, no solo si lo dices.",
    "💡 Las emociones universales conectan mejor cuando se anclan en detalles específicos y personales.",
    "💡 No temas a la vulnerabilidad. Los mejores poemas nacen de la honestidad emocional."
  ],
  no_emotion: [
    "💡 ¿Qué sientes realmente al escribir? Conecta con esa emoción y déjala fluir en el papel.",
    "💡 Los grandes poemas hablan al corazón. Prueba a recordar un momento que te haya marcado.",
    "💡 La poesía es emoción hecha palabra. Permítete ser vulnerable y auténtico.",
    "💡 Un poema sin emoción es como un paisaje sin colores. Atrévete a sentir y a mostrar."
  ],
  imagery_advice: [
    "💡 Las metáforas transforman lo ordinario en extraordinario. ¿Qué comparaciones inesperadas se te ocurren?",
    "💡 La poesía vive en los detalles sensoriales: ¿qué ves, oyes, hueles, tocas?",
    "💡 Una imagen poderosa vale más que mil palabras abstractas. Busca lo concreto y sorprendente.",
    "💡 La naturaleza es una fuente inagotable de imágenes poéticas. Observa a tu alrededor."
  ],
  general_tips: [
    "💡 Lee tu poema en voz alta. El ritmo y la musicalidad se sienten mejor al hablarlo.",
    "💡 Los mejores poemas suelen reescribirse varias veces. No temas revisar y ajustar.",
    "💡 La poesía está en los espacios entre palabras. A veces lo que no se dice es tan importante.",
    "💡 Cada poeta desarrolla su voz con práctica constante. ¡Sigue escribiendo!",
    "💡 Un buen título puede transformar completamente la lectura de un poema.",
    "💡 Los versos libres te dan libertad, pero también requieren más cuidado con el ritmo."
  ]
};

/* Banco de problemas variados */
const ISSUES_BANK = {
  length: [
    "⚠️ El poema es demasiado breve para desarrollar completamente las ideas.",
    "⚠️ Necesitas más versos para explorar el potencial de las palabras clave.",
    "⚠️ La extensión actual limita la profundidad emocional del poema.",
    "⚠️ Considera añadir al menos una estrofa más para darle mayor cuerpo al poema."
  ],
  keywords_low: [
    "⚠️ Las palabras clave apenas están presentes. Intenta integrarlas como ejes del poema.",
    "⚠️ Usaste pocas palabras sugeridas. Son el esqueleto conceptual de tu ejercicio.",
    "⚠️ Las palabras clave deberían aparecer de manera orgánica en diferentes momentos.",
    "⚠️ Aprovecha las palabras clave como anclas temáticas alrededor de las cuales gire el poema."
  ],
  keywords_medium: [
    "⚠️ Integraste algunas palabras clave, pero podrías darles más protagonismo.",
    "⚠️ Las palabras clave están ahí, pero casi de pasada. Conviértelas en el centro de algunas imágenes.",
    "⚠️ Buen intento con las palabras clave. Ahora intenta que cada una inspire un verso completo."
  ],
  structure: [
    "⚠️ El poema se lee como un párrafo. Los saltos de línea son esenciales en poesía.",
    "⚠️ Añade versos y estrofas. La poesía vive en la respiración que crean los espacios.",
    "⚠️ Sin estructura visual, el poema pierde fuerza. Separa ideas en diferentes líneas.",
    "⚠️ Los saltos de línea no son decorativos: crean pausas y énfasis. ¡Úsalos!"
  ],
  repetition_found: [
    "⚠️ Hay palabras que se repiten con demasiada frecuencia, lo que resta variedad al texto.",
    "⚠️ La repetición excesiva de '{word}' cansa al lector. Busca sinónimos creativos.",
    "⚠️ Tu vocabulario es limitado en ciertos momentos. Un poema gana con léxico variado.",
    "⚠️ Palabras como '{word}' aparecen demasiado. ¿Podrías reformular algunas frases?"
  ],
  same_start: [
    "⚠️ Muchos versos comienzan de manera similar. Varía las primeras palabras para dinamizar.",
    "⚠️ La estructura se vuelve predecible cuando los inicios se repiten. Juega con diferentes construcciones.",
    "⚠️ Alterna sujetos, verbos y adverbios al inicio de los versos para crear sorpresa."
  ]
};

/* Función para obtener elemento aleatorio de un array */
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Función para obtener calificación según puntuación */
function getScoreQualifier(score, maxScore = 15) {
  const percentage = (score / maxScore) * 100;
  
  if (percentage >= 90) return "🏆 ¡Excelente! Obra maestra";
  if (percentage >= 80) return "✨ Muy destacado, casi perfecto";
  if (percentage >= 70) return "🌟 Buen trabajo, con gran potencial";
  if (percentage >= 60) return "📝 Sólido, vas por buen camino";
  if (percentage >= 50) return "🌱 Prometedor, sigue practicando";
  if (percentage >= 30) return "💪 Esfuerzo notable, a mejorar";
  return "📖 Un comienzo, el camino es largo";
}

/* Función para seleccionar puntos fuertes según características */
function getStrengths(analysis) {
  const strengths = [];
  
  if (analysis.score >= 12) {
    strengths.push(randomItem(STRENGTH_PHRASES.very_creative));
  }
  
  if (analysis.vocabularyRich) {
    strengths.push(randomItem(STRENGTH_PHRASES.good_vocabulary));
  }
  
  if (analysis.emotionalRich) {
    strengths.push(randomItem(STRENGTH_PHRASES.emotional));
  }
  
  if (analysis.goodStructure) {
    strengths.push(randomItem(STRENGTH_PHRASES.structure));
  }
  
  if (analysis.keywordUsage === 'excellent') {
    strengths.push(randomItem(STRENGTH_PHRASES.keywords_excellent));
  }
  
  if (analysis.hasImagery) {
    strengths.push(randomItem(STRENGTH_PHRASES.imagery));
  }
  
  // Si no hay puntos fuertes, añadir uno genérico alentador
  if (strengths.length === 0) {
    strengths.push("🌱 ¡Has comenzado! Cada intento te acerca a la maestría poética");
    strengths.push("💪 El primer paso es escribir. ¡Ya lo has dado!");
  }
  
  return strengths.slice(0, 4); // Máximo 4 puntos fuertes
}

/* Función para generar consejos personalizados */
function getPersonalizedAdvice(analysis, poem, keywords) {
  const advice = [];
  
  // Consejos basados en longitud
  if (analysis.wordCount < 15) {
    advice.push(randomItem(ADVICE_BANK.short_poem));
  } else if (analysis.wordCount > 100) {
    advice.push(randomItem(ADVICE_BANK.long_poem));
  }
  
  // Consejos basados en puntuación
  if (analysis.punctCount === 0 && analysis.wordCount > 40) {
    advice.push(randomItem(ADVICE_BANK.no_punctuation));
  } else if (analysis.punctCount > 5) {
    advice.push(randomItem(ADVICE_BANK.good_punctuation));
  }
  
  // Consejos basados en uso de palabras clave
  if (keywords.length > 0) {
    if (analysis.keywordPercentage >= 0.7) {
      advice.push(randomItem(ADVICE_BANK.good_keyword_use));
    } else if (analysis.keywordPercentage >= 0.3) {
      advice.push(randomItem(ADVICE_BANK.keyword_advice));
    } else if (analysis.keywordPercentage > 0) {
      advice.push(randomItem(ADVICE_BANK.keyword_advice));
    }
  }
  
  // Consejos basados en longitud de versos
  if (analysis.avgLineLength < 5 && analysis.lineCount > 3) {
    advice.push(randomItem(ADVICE_BANK.short_lines));
  } else if (analysis.avgLineLength > 15 && analysis.lineCount > 2) {
    advice.push(randomItem(ADVICE_BANK.long_lines));
  }
  
  // Consejos sobre emociones
  if (analysis.emotionalCount === 0) {
    advice.push(randomItem(ADVICE_BANK.no_emotion));
  } else if (analysis.emotionalCount < 2) {
    advice.push(randomItem(ADVICE_BANK.emotional_advice));
  }
  
  // Consejos sobre imágenes poéticas
  if (analysis.imageryScore < 2) {
    advice.push(randomItem(ADVICE_BANK.imagery_advice));
  }
  
  // Consejos generales si hay pocos específicos
  if (advice.length < 2) {
    advice.push(randomItem(ADVICE_BANK.general_tips));
  }
  
  return advice.slice(0, 3); // Máximo 3 consejos
}

/* Función para generar problemas variados */
function getIssues(analysis) {
  const issues = [];
  
  if (analysis.wordCount < 15) {
    issues.push(randomItem(ISSUES_BANK.length));
  }
  
  if (analysis.keywordPercentage < 0.3 && analysis.keywordPercentage > 0) {
    issues.push(randomItem(ISSUES_BANK.keywords_low));
  } else if (analysis.keywordPercentage < 0.6 && analysis.keywordPercentage >= 0.3) {
    issues.push(randomItem(ISSUES_BANK.keywords_medium));
  } else if (analysis.keywordPercentage === 0 && keywords.length > 0) {
    issues.push("⚠️ No se detectó ninguna palabra clave. ¡Son el corazón del ejercicio!");
  }
  
  if (analysis.lineCount < 2) {
    issues.push(randomItem(ISSUES_BANK.structure));
  }
  
  if (analysis.repetitions.length > 0) {
    let issue = randomItem(ISSUES_BANK.repetition_found);
    issue = issue.replace('{word}', analysis.repetitions[0]);
    issues.push(issue);
  }
  
  if (analysis.sameStartRatio > 0.6 && analysis.lineCount >= 3) {
    issues.push(randomItem(ISSUES_BANK.same_start));
  }
  
  return issues.slice(0, 3); // Máximo 3 problemas
}

/* Normalización y utilidades */
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim();
}

function splitKeywords(k) {
  if (!k) return [];
  return k.split(',').map(s => s.trim()).filter(Boolean).map(normalize);
}

function generateRandomKeywords(count = 4) {
  const shuffled = [...WORD_BANK];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const selected = shuffled.slice(0, count);
  const capitalized = selected.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalized;
}

function updateKeywordsDisplay() {
  const newKeywords = generateRandomKeywords(4);
  keywordsEl.value = newKeywords.join(', ');
  
  keywordsEl.style.transition = 'all 0.3s ease';
  keywordsEl.style.backgroundColor = '#e8f4f8';
  setTimeout(() => {
    keywordsEl.style.backgroundColor = '';
  }, 300);
}

/* Análisis avanzado del poema */
function analyzePoem(poem, keywords) {
  const raw = poem || '';
  const norm = normalize(raw);
  const words = norm.split(/\s+/).filter(Boolean);
  const uniqueWords = new Set(words);
  const wordCount = words.length;
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const lineCount = lines.length;
  
  // Cálculo de longitud promedio de versos
  const avgLineLength = lineCount > 0 ? (wordCount / lineCount) : 0;
  
  // Conteo de puntuación
  const punctCount = (raw.match(/[.,;:!?]/g) || []).length;
  
  // Detectar repeticiones
  const repetitions = [...uniqueWords].filter(w => words.filter(x => x === w).length >= 6);
  
  // Análisis de inicios de versos
  let sameStartRatio = 0;
  if (lineCount >= 3) {
    const firstWords = lines.map(l => normalize(l.split(/\s+/)[0] || ''));
    const uniqFirst = new Set(firstWords);
    sameStartRatio = 1 - (uniqFirst.size / firstWords.length);
  }
  
  // Uso de palabras clave
  let keywordPercentage = 0;
  let usedKeywords = [];
  if (keywords.length) {
    usedKeywords = keywords.filter(k => norm.includes(k));
    keywordPercentage = usedKeywords.length / keywords.length;
  }
  
  // Detectar palabras emocionales
  const emotiveWords = ['amor', 'triste', 'feliz', 'dolor', 'miedo', 'amar', 'llorar', 'reir', 
                        'silencio', 'soledad', 'furia', 'alegria', 'paz', 'calma', 'sueño', 'pasión',
                        'corazón', 'alma', 'vida', 'muerte', 'sangre', 'llanto', 'risa', 'beso'];
  const foundEmotive = emotiveWords.filter(e => norm.includes(e));
  const emotionalCount = foundEmotive.length;
  
  // Detectar imágenes poéticas (palabras sensoriales)
  const imageryWords = ['luz', 'sombra', 'color', 'brillo', 'oscuro', 'claro', 'azul', 'rojo', 
                        'verde', 'blanco', 'negro', 'brillante', 'opaco', 'transparente'];
  const foundImagery = imageryWords.filter(i => norm.includes(i));
  const imageryScore = foundImagery.length;
  
  // Cálculo de puntuación
  let score = 0;
  
  if (wordCount >= 15) score += 2; else if (wordCount >= 10) score += 1;
  if (keywordPercentage >= 0.7) score += 3;
  else if (keywordPercentage >= 0.5) score += 2;
  else if (keywordPercentage >= 0.3) score += 1;
  if (lineCount >= 2) score += 2;
  if (punctCount > 0 && wordCount > 30) score += 1;
  if (sameStartRatio < 0.4 && lineCount >= 3) score += 1;
  if (emotionalCount >= 3) score += 2;
  else if (emotionalCount >= 1) score += 1;
  if (imageryScore >= 3) score += 2;
  else if (imageryScore >= 1) score += 1;
  if (repetitions.length === 0 && wordCount > 20) score += 1;
  
  // Booleanos para retroalimentación
  const vocabularyRich = uniqueWords.size / wordCount > 0.7 && wordCount > 20;
  const emotionalRich = emotionalCount >= 3;
  const goodStructure = lineCount >= 3 && sameStartRatio < 0.5;
  const hasImagery = imageryScore >= 2;
  const keywordUsage = keywordPercentage >= 0.7 ? 'excellent' : (keywordPercentage >= 0.3 ? 'good' : 'poor');
  
  // Preparar objeto de análisis
  const analysis = {
    score,
    wordCount,
    lineCount,
    punctCount,
    avgLineLength,
    repetitions,
    sameStartRatio,
    keywordPercentage,
    usedKeywords,
    emotionalCount,
    imageryScore,
    vocabularyRich,
    emotionalRich,
    goodStructure,
    hasImagery,
    keywordUsage,
    issues: [],
    praises: [],
    advice: []
  };
  
  // Generar retroalimentación variada
  analysis.issues = getIssues(analysis);
  analysis.praises = getStrengths(analysis);
  analysis.advice = getPersonalizedAdvice(analysis, poem, keywords);
  
  // Determinar si es bueno (puntuación subjetiva)
  analysis.ok = analysis.score >= 8;
  
  return analysis;
}

/* Renderizado mejorado del resultado */
function renderResult(ans) {
  resultEl.innerHTML = '';
  const container = document.createElement('div');
  const scorePercentage = Math.min(100, Math.floor((ans.score / 15) * 100));
  const qualifier = getScoreQualifier(ans.score);
  
  if (ans.ok) {
    container.className = 'good';
    container.innerHTML = `
      <strong>${qualifier}</strong>
      <div style="margin-top:8px; font-size:14px;">Puntuación: ${ans.score}/15 puntos</div>
      <div style="margin-top:6px;">
        <div style="background:#e0e0e0; border-radius:10px; height:8px; overflow:hidden;">
          <div style="background:#6EC04A; width:${scorePercentage}%; height:100%; border-radius:10px; transition: width 0.5s ease;"></div>
        </div>
      </div>
    `;
  } else {
    container.className = 'bad';
    container.innerHTML = `
      <strong>${qualifier}</strong>
      <div style="margin-top:8px; font-size:14px;">Puntuación: ${ans.score}/15 puntos</div>
      <div style="margin-top:6px;">
        <div style="background:#e0e0e0; border-radius:10px; height:8px; overflow:hidden;">
          <div style="background:#3B82F6; width:${scorePercentage}%; height:100%; border-radius:10px; transition: width 0.5s ease;"></div>
        </div>
      </div>
      <div style="margin-top:8px;">💪 ¡Cada intento te acerca más a la maestría poética!</div>
    `;
  }

  if (ans.praises.length) {
    const p = document.createElement('div');
    p.style.marginTop = '16px';
    p.innerHTML = '<strong>🎉 Puntos fuertes:</strong><ul style="margin:8px 0 12px 20px;">' + 
      ans.praises.map(s => `<li style="margin:6px 0;">${s}</li>`).join('') + '</ul>';
    container.appendChild(p);
  }
  
  if (ans.issues.length) {
    const p = document.createElement('div');
    p.innerHTML = '<strong>⚠️ Áreas de mejora:</strong><ul style="margin:8px 0 12px 20px;">' + 
      ans.issues.map(s => `<li style="margin:6px 0;">${s}</li>`).join('') + '</ul>';
    container.appendChild(p);
  }
  
  if (ans.advice.length) {
    const p = document.createElement('div');
    p.innerHTML = '<strong>💡 Consejos GLIFO para tu crecimiento:</strong><ul style="margin:8px 0 12px 20px;">' + 
      ans.advice.map(s => `<li style="margin:6px 0;">${s}</li>`).join('') + '</ul>';
    container.appendChild(p);
  }

  if (ans.usedKeywords && ans.usedKeywords.length) {
    const k = document.createElement('div');
    k.style.marginTop = '12px';
    k.style.padding = '8px';
    k.style.background = 'rgba(110,192,74,0.15)';
    k.style.borderRadius = '8px';
    k.style.borderLeft = `3px solid #6EC04A`;
    k.innerHTML = `<small>📝 Palabras clave detectadas: ${ans.usedKeywords.join(', ')}</small>`;
    container.appendChild(k);
  } else if (ans.usedKeywords) {
    const k = document.createElement('div');
    k.style.marginTop = '12px';
    k.style.padding = '8px';
    k.style.background = 'rgba(59,130,246,0.1)';
    k.style.borderRadius = '8px';
    k.innerHTML = `<small>📝 No se detectaron palabras clave. ¡Intenta incorporarlas en tu próximo poema!</small>`;
    container.appendChild(k);
  }

  resultEl.appendChild(container);
  
  // Scroll suave a resultados
  setTimeout(() => {
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

/* Event Listeners */
evaluateBtn.addEventListener('click', () => {
  const poem = poemEl.value;
  const keywords = splitKeywords(keywordsEl.value);
  
  if (!poem.trim()) {
    resultEl.innerHTML = '<div class="bad"><strong>📝 Escribe algo primero...</strong><br>No has escrito ningún poema para evaluar. ¡Atrévete a crear!</div>';
    return;
  }
  
  if (keywords.length === 0) {
    updateKeywordsDisplay();
    setTimeout(() => {
      const newKeywords = splitKeywords(keywordsEl.value);
      const analysis = analyzePoem(poem, newKeywords);
      renderResult(analysis);
    }, 100);
  } else {
    const analysis = analyzePoem(poem, keywords);
    renderResult(analysis);
  }
});

function generateAndUpdate() {
  updateKeywordsDisplay();
  poemEl.value = '';
  resultEl.innerHTML = '<div style="padding:15px; text-align:center; color: var(--azul-profundo); background: rgba(110,192,74,0.1); border-radius: 12px;">🎲 ¡Nuevo desafío generado! Escribe un poema creativo con estas palabras clave. 🌟</div>';
  poemEl.focus();
}

newWordsBtn?.addEventListener('click', generateAndUpdate);
refreshKeywordsBtn?.addEventListener('click', generateAndUpdate);

scrollToCardBtn?.addEventListener('click', () => {
  document.getElementById('writingSection')?.scrollIntoView({ behavior: 'smooth' });
});

// Inicializar
updateKeywordsDisplay();