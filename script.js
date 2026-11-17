(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const esc = (t) => t.replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));

  /* ============ datos ============ */
  const EJES = [
    { k: 'tramites', c: '#f5c400', n: 28, nombre: 'Trámites y simplificación', rango: 'Arts. 2–29',
      lead: 'Menos costo y menos papeleo para crear, formalizar y sostener un negocio pequeño.',
      items: [
        ['Art. 2', 'INVIMA: tarifas diferenciadas por tamaño de empresa. Las microempresas quedan exentas del pago por expedir, modificar y renovar registros.'],
        ['Art. 3', 'Impuesto de registro: tarifas reducidas para microempresas en las cámaras de comercio (0,3 % a 0,6 % en actos generales y 0,1 % a 0,2 % en aportes), sin sobretasas.'],
        ['Art. 4', 'Disolución: no cumplir la hipótesis de negocio en marcha es causal de disolución; los administradores deben convocar de inmediato al máximo órgano social si hay riesgo de insolvencia.'],
        ['Art. 5', 'Sandbox: espacios de prueba regulatoria para modelos de negocio innovadores, que el Gobierno debía reglamentar en un año.'],
        ['Art. 7', 'SIECI: el DANE crea el Sistema de Información de Actividades Económicas Informales para diseñar políticas de formalización.'],
        ['Art. 8', 'Contabilidad simplificada: las microempresas pueden llevar contabilidad de caja, de acumulación o mixta.'],
        ['Art. 9', 'Microcrédito: MinComercio puede ejecutar programas con entidades vigiladas y también con fintech.'],
        ['Arts. 16–17', 'Régimen especial para nómadas digitales y habilitación del trabajo remoto, más allá del teletrabajo.'],
        ['Art. 18', 'Firma electrónica y digital: reglamentación en un plazo máximo de seis meses.'],
        ['Art. 19', 'Mipymes agropecuarias: capacitación, aceleración y sello de reconocimiento; prioridad para mujeres rurales.'],
        ['Arts. 20–24', 'Economía solidaria: asociaciones mutuales con mínimo 10 personas naturales; cooperativas con mínimo 3 fundadores y topes de aportes (33 % persona natural, 49 % persona jurídica) cuando tienen hasta 10 asociados.'],
        ['Art. 27', 'Seguro Mipyme: protege apoyos e inversiones con recursos públicos o propios; puede cubrir daño emergente y lucro cesante.']
      ] },
    { k: 'compras', c: '#ff6a4d', n: 7, nombre: 'Compras públicas', rango: 'Arts. 30–36',
      lead: 'El Estado compra mucho. La ley busca que parte de esas compras llegue a empresas pequeñas.',
      items: [
        ['Art. 30', 'Mínima cuantía: procedimiento simplificado para contratos hasta el 10 % de la menor cuantía de la entidad.'],
        ['Art. 31', 'Criterios diferenciales y puntajes adicionales para Mipymes, con prioridad a la producción nacional.'],
        ['Art. 32', 'Puntaje adicional (hasta 0,25 % del puntaje máximo) para emprendimientos y empresas de mujeres y de jóvenes egresados del ICBF.'],
        ['Art. 33', 'Las entidades deben identificar Mipymes proveedoras, preferirlas en igualdad de condiciones y dividir procesos en lotes. Incumplirlo es mala conducta.'],
        ['Art. 34', 'Convocatorias limitadas a Mipymes cuando al menos dos manifiesten interés. Se ve en detalle en la siguiente sección.'],
        ['Art. 35', 'Desempates con 13 factores sucesivos. También en la siguiente sección.'],
        ['Art. 36', 'Compra pública de tecnología e innovación, con lineamientos de Colombia Compra Eficiente.']
      ] },
    { k: 'finan', c: '#6f97ff', n: 9, nombre: 'Financiamiento', rango: 'Arts. 37–45',
      lead: 'Más puertas para conseguir recursos: garantías, créditos e inversión.',
      items: [
        ['Arts. 37–38', 'Fondo Nacional de Garantías (FNG): objeto y funciones, incluidas garantías, retrogarantías y avales.'],
        ['Art. 39', 'Los intermediarios de microcrédito deben reportar honorarios y comisiones.'],
        ['Arts. 40–41', 'Donaciones a iNNpulsa con tratamiento tributario en el impuesto de renta.'],
        ['Art. 42', 'Inversión en ciencia, tecnología e innovación para el sector agropecuario y agroindustrial.'],
        ['Art. 43', 'Redes de ángeles inversionistas.'],
        ['Art. 44', 'Marco para la financiación colaborativa (crowdfunding), a cargo del Gobierno.'],
        ['Art. 45', 'Líneas especiales de crédito de iNNpulsa con tasa, plazos y periodos de gracia claros.']
      ] },
    { k: 'inst', c: '#efe9dc', n: 28, nombre: 'Marco institucional', rango: 'Arts. 46–73',
      lead: 'Quién coordina: iNNpulsa Colombia como cabeza del ecosistema de emprendimiento.',
      items: [
        ['Art. 46', 'iNNpulsa Colombia: gran articulador del emprendimiento. Unifica en un patrimonio autónomo el Fondo de Modernización e Innovación para las Mipymes y la Unidad de Desarrollo Empresarial.'],
        ['Art. 47', 'Fondo Mujer Emprende, administrado por iNNpulsa. Los arts. 47A y 47B (Ley 2337 de 2023) exigen un porcentaje mínimo de participación de mujeres en programas.'],
        ['Art. 50', 'CEmprende: centros que conectan emprendedores, universidades, empresa privada y Estado.'],
        ['Art. 52', 'Plataforma pública y gratuita para que pequeños productores ofrezcan sus cosechas sin intermediación.'],
        ['Art. 53', 'Apoyo a colombianos que retornan al país, con Colombia Nos Une, iNNpulsa y el SENA.'],
        ['Art. 55', 'Emprendimientos verdes: promoción de iniciativas con beneficio ambiental, en especial en zonas rurales.'],
        ['Art. 56', 'Recursos del Sistema Nacional del Deporte como capital semilla concursable.'],
        ['Art. 63', 'Fondos territoriales: los municipios pueden crear patrimonios autónomos para impulsar el emprendimiento local.'],
        ['Arts. 64–66', 'Cajas de compensación: recursos del FOSFEC para capacitar trabajadores y apoyar Mipymes afiliadas.'],
        ['Art. 70', 'Desde el 1 de enero de 2022, la Superintendencia de Sociedades supervisa las cámaras de comercio.'],
        ['Art. 72', 'Al menos un programa al año de iNNpulsa para emprendimientos rurales de pequeños productores.']
      ] },
    { k: 'edu', c: '#8fd18a', n: 10, nombre: 'Educación para emprender', rango: 'Arts. 74–83',
      lead: 'Emprender se aprende: del colegio a la universidad.',
      items: [
        ['Art. 74', 'El SENA y las secretarías de educación pueden ofrecer doble titulación técnico-bachiller; el SENA diseña un programa de emprendimiento con apoyo del Fondo Emprender.'],
        ['Art. 75', 'Contenidos de emprendimiento en la formación docente.'],
        ['Art. 76', 'Las instituciones de educación superior pueden aceptar un proyecto de emprendimiento como opción de grado.'],
        ['Art. 77', 'Consultorios empresariales: las universidades dan asesoría gratuita a microempresas. Los estudiantes deben haber cumplido el 80 % del programa y el tiempo puede reconocerse como experiencia profesional.'],
        ['Art. 78', 'Los colegios de básica y media deben fomentar competencias de emprendimiento y economía solidaria.'],
        ['Art. 79', 'Las instituciones de educación para el trabajo pueden usar horas prácticas para proyectos de emprendimiento.'],
        ['Arts. 82–83', 'Alianzas del Ministerio de Ciencia con universidades y retos empresariales con el sector privado y la academia.']
      ] }
  ];

  const PERFILES = [
    { n: 'Microempresario', b: [
      ['Art. 2', 'No paga por expedir, modificar ni renovar registros ante el INVIMA.'],
      ['Art. 3', 'Paga tarifas reducidas de impuesto de registro en la cámara de comercio.'],
      ['Art. 8', 'Puede llevar contabilidad simplificada: de caja, de acumulación o mixta.'],
      ['Art. 77', 'Recibe asesoría gratuita en un consultorio empresarial universitario.'],
      ['Art. 27', 'Puede asegurar sus apoyos e inversiones con el Seguro Mipyme.']] },
    { n: 'Mujer emprendedora', b: [
      ['Art. 47', 'Fondo Mujer Emprende, administrado por iNNpulsa.'],
      ['Arts. 47A–47B', 'Los programas deben incluir un porcentaje mínimo de participación femenina (Ley 2337 de 2023).'],
      ['Art. 32', 'Puntaje adicional en compras públicas, hasta 0,25 % del puntaje máximo.'],
      ['Art. 19', 'Las mujeres rurales tienen prioridad en los programas para Mipymes agropecuarias.']] },
    { n: 'Estudiante universitario', b: [
      ['Art. 76', 'Puede presentar un proyecto de emprendimiento como opción de grado.'],
      ['Art. 77', 'Atiende microempresas en el consultorio empresarial (con el 80 % del programa cumplido) y ese tiempo puede contar como experiencia profesional.'],
      ['Art. 80', 'Su universidad puede abrir espacios para mostrar proyectos de emprendimiento.'],
      ['Art. 83', 'Puede participar en retos empresariales con empresas y academia.']] },
    { n: 'Joven de colegio o SENA', b: [
      ['Art. 74', 'Doble titulación técnico-bachiller con el SENA y programa de emprendimiento.'],
      ['Art. 78', 'Su colegio debe fomentar competencias de emprendimiento y economía solidaria.'],
      ['Art. 79', 'En educación para el trabajo, las horas prácticas pueden usarse para proyectos de emprendimiento.']] },
    { n: 'Pequeño productor rural', b: [
      ['Art. 19', 'Capacitación, aceleración y sello de reconocimiento para Mipymes agropecuarias.'],
      ['Art. 52', 'Plataforma pública y gratuita para ofrecer cosechas sin intermediación.'],
      ['Art. 72', 'Al menos un programa al año de iNNpulsa para emprendimientos rurales.'],
      ['Art. 55', 'Apoyo a emprendimientos verdes, en especial en zonas rurales.']] },
    { n: 'Colombiano que retorna', b: [
      ['Art. 53', 'Apoyo articulado entre Colombia Nos Une, iNNpulsa y el SENA con su Fondo Emprender.']] },
    { n: 'Nómada digital', b: [
      ['Art. 16', 'Régimen especial de ingreso, permanencia y trabajo para quienes trabajan de forma remota; se exige acreditar un servicio de asistencia médica.'],
      ['Art. 17', 'Se habilita el trabajo remoto más allá del teletrabajo.']] },
    { n: 'Inversionista', b: [
      ['Arts. 40–41', 'Las donaciones a iNNpulsa tienen tratamiento tributario en el impuesto de renta.'],
      ['Art. 43', 'Marco para redes de ángeles inversionistas.'],
      ['Art. 44', 'Regulación de la financiación colaborativa (crowdfunding).']] }
  ];

  const LINEA = [
    ['31 dic 2020', 'Se expide la ley', 'Publicada en el Diario Oficial No. 51.544. Rige desde su promulgación (art. 84).'],
    ['2021', 'Llegan los decretos', 'Se reglamentan temas como compras públicas (Decreto 1860), consultorios empresariales (1646), firma electrónica (1789), FOSFEC (689) y exportación (1079). El Decreto 296 corrige el texto.'],
    ['2021', 'Cae el artículo 15', 'La Ley 2099 de 2021 lo deroga.'],
    ['1 ene 2022', 'Supersociedades vigila las cámaras', 'Según el art. 70, la Superintendencia de Sociedades asume la supervisión de las cámaras de comercio.'],
    ['2022', 'Corte Constitucional', 'La sentencia C-188 declara inexequibles expresiones del art. 11, el de franquicias para Mipymes.'],
    ['2023', 'Ley 2337', 'Adiciona los arts. 47A y 47B: participación mínima de mujeres en programas de emprendimiento.'],
    ['2025', 'Jóvenes egresados del ICBF', 'Una ley de 2025 ajusta las compras públicas y los programas del SENA para priorizar a jóvenes egresados del Sistema de Protección del ICBF.']
  ];

  const GLOSARIO = [
    ['Mipyme', 'Micro, pequeña y mediana empresa. Se clasifican por tamaño según el Decreto 957 de 2019 y la Ley 590 de 2000.'],
    ['iNNpulsa Colombia', 'Entidad del Gobierno que articula el emprendimiento y la innovación. La ley la designa como gran articulador y unifica las fuentes públicas de financiación.'],
    ['Sandbox regulatorio', 'Espacio controlado donde un modelo de negocio innovador, que aún no tiene regulación, puede probarse con seguridad jurídica.'],
    ['SIECI', 'Sistema de Información de Actividades Económicas Informales. Lo administra el DANE para apoyar políticas de formalización.'],
    ['Mínima cuantía', 'Modalidad de contratación pública simplificada para compras de menor valor.'],
    ['Fondo Nacional de Garantías', 'Entidad que respalda créditos de emprendedores y Mipymes que no tienen garantías propias suficientes.'],
    ['CEmprende', 'Centros de emprendimiento que conectan a emprendedores, universidades, empresa privada y Estado.'],
    ['Crowdfunding', 'Financiación colaborativa: muchas personas aportan pequeñas sumas a un proyecto, normalmente por una plataforma digital.'],
    ['Ángel inversionista', 'Persona que invierte capital propio en emprendimientos en etapa temprana.'],
    ['Negocio en marcha', 'Supuesto contable de que la empresa seguirá operando. Si no se cumple, el art. 4 lo establece como causal de disolución.']
  ];

  const PREGUNTAS = [
    { q: '¿Cuál es el objeto de la Ley 2069 de 2020?',
      o: ['Prohibir la creación de empresas informales', 'Establecer un marco regulatorio que impulse el emprendimiento y la sostenibilidad empresarial, con enfoque regionalizado', 'Crear un nuevo impuesto para las Mipymes'], c: 1,
      f: 'Así lo dice el artículo 1.' },
    { q: '¿Qué entidad es designada como gran articulador del emprendimiento?',
      o: ['iNNpulsa Colombia', 'La DIAN', 'La Superintendencia de Industria y Comercio'], c: 0,
      f: 'El artículo 46 le da ese papel y unifica las fuentes públicas de financiación.' },
    { q: '¿Cuántos fundadores como mínimo requiere una cooperativa según la ley?',
      o: ['Uno', 'Dos', 'Tres'], c: 2,
      f: 'Artículo 22. Además, en las de hasta 10 asociados hay topes de 33 % y 49 % en los aportes.' },
    { q: '¿Quiénes quedan exentas de pagar por registros ante el INVIMA?',
      o: ['Las grandes empresas', 'Las microempresas', 'Solo las empresas extranjeras'], c: 1,
      f: 'Artículo 2: exentas del pago por expedir, modificar y renovar registros.' },
    { q: '¿Cuántas Mipymes deben manifestar interés para que una entidad limite la convocatoria?',
      o: ['Al menos una', 'Al menos cinco', 'Al menos dos'], c: 2,
      f: 'Artículo 34. Además deben acreditar mínimo un año de existencia.' },
    { q: '¿Desde cuándo supervisa la Superintendencia de Sociedades a las cámaras de comercio?',
      o: ['Desde el 1 de enero de 2022', 'Desde el 1 de enero de 2020', 'Desde el 31 de diciembre de 2020'], c: 0,
      f: 'Artículo 70.' }
  ];

  /* ============ aparición al hacer scroll ============ */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  const watch = () => $$('.rv:not(.in), .rv-h:not(.in)').forEach((el) => io.observe(el));
  watch();

  /* ============ navegación por secciones ============ */
  const sections = $$('[data-title]');
  const dots = $('.dots');
  sections.forEach((s) => {
    const a = document.createElement('a');
    a.href = '#' + s.id;
    a.dataset.label = s.dataset.title;
    a.setAttribute('aria-label', s.dataset.title);
    dots.appendChild(a);
  });
  const dotLinks = $$('a', dots);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const i = sections.indexOf(e.target);
        dotLinks.forEach((d, k) => d.classList.toggle('on', k === i));
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach((s) => spy.observe(s));

  const currentIndex = () => {
    const mid = innerHeight * 0.4;
    let idx = 0;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= mid) idx = i; });
    return idx;
  };
  addEventListener('keydown', (e) => {
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (document.activeElement && document.activeElement.id === 'tl') return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = currentIndex() + (e.key === 'ArrowRight' ? 1 : -1);
    sections[Math.max(0, Math.min(sections.length - 1, i))].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ============ progreso y parallax ============ */
  const bar = $('.progress');
  const movers = $$('[data-speed]');
  let ticking = false;
  const frame = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (!reduce) {
      movers.forEach((el) => {
        const p = el.parentElement.getBoundingClientRect();
        if (p.bottom < -250 || p.top > innerHeight + 250) return;
        const y = (p.top + p.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed);
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      });
    }
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', frame);
  frame();

  /* portada: capas que siguen al mouse */
  const hero = $('.hero');
  if (!reduce && fine) {
    const layers = $$('[data-depth]', hero);
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach((l) => {
        const d = parseFloat(l.dataset.depth);
        l.style.transform = `translate(${(mx * d).toFixed(1)}px, ${(my * d).toFixed(1)}px)`;
      });
    });
  }

  /* ============ contadores ============ */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const end = Number(e.target.dataset.count);
      if (reduce) { e.target.textContent = end; return; }
      const t0 = performance.now(), dur = 1400;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((c) => countIO.observe(c));

  /* ============ ejes ============ */
  const stack = $('#stack');
  const ejeBox = $('#eje');
  EJES.forEach((e, i) => {
    const b = document.createElement('button');
    b.className = 'seg' + (i === 0 ? ' on' : '');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.style.setProperty('--n', e.n);
    b.style.setProperty('--c', e.c);
    b.innerHTML = `<b>${e.n}</b><span>${e.nombre}</span>`;
    b.addEventListener('click', () => showEje(i));
    stack.appendChild(b);
  });
  function showEje(i) {
    const e = EJES[i];
    $$('.seg', stack).forEach((s, k) => s.classList.toggle('on', k === i));
    ejeBox.style.setProperty('--c', e.c);
    ejeBox.innerHTML =
      `<div><span class="range-tag">${e.rango}</span><h3>${e.nombre}</h3><p class="lead">${e.lead}</p></div>` +
      `<ul class="items">${e.items.map(([a, t]) => `<li><i>${a}</i><span>${esc(t)}</span></li>`).join('')}</ul>`;
    ejeBox.classList.remove('swap');
    void ejeBox.offsetWidth;
    ejeBox.classList.add('swap');
  }
  showEje(0);

  /* ============ compras: convocatoria limitada ============ */
  const nmip = $('#nmip'), nmipV = $('#nmip-v'), verdict = $('#verdict');
  const updVerdict = () => {
    const n = Number(nmip.value);
    nmipV.textContent = n;
    if (n >= 2) {
      verdict.className = 'verdict yes';
      verdict.innerHTML = '<strong>Sí se puede limitar</strong>Con al menos dos Mipymes interesadas, la entidad puede limitar la convocatoria a Mipymes. Deben acreditar mínimo un año de existencia, y además aplican las condiciones de la reglamentación (Decreto 1860 de 2021).';
    } else {
      verdict.className = 'verdict';
      verdict.innerHTML = '<strong>Todavía no</strong>Hace falta que al menos dos Mipymes manifiesten interés para poder limitar la convocatoria.';
    }
  };
  nmip.addEventListener('input', updVerdict);
  updVerdict();

  /* ============ compras: factor 13 ============ */
  const coinOut = $('#coin-out');
  $('#coin').addEventListener('click', () => {
    const w = Math.random() < 0.5 ? 'Proponente A' : 'Proponente B';
    coinOut.classList.remove('flip');
    void coinOut.offsetWidth;
    coinOut.textContent = 'Gana: ' + w;
    coinOut.classList.add('flip');
  });

  /* ============ perfiles ============ */
  const pfBox = $('#profiles'), ben = $('#ben');
  PERFILES.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pf' + (i === 0 ? ' on' : '');
    b.textContent = p.n;
    b.setAttribute('role', 'tab');
    b.addEventListener('click', () => {
      $$('.pf', pfBox).forEach((x) => x.classList.toggle('on', x === b));
      showPerfil(i);
    });
    pfBox.appendChild(b);
  });
  function showPerfil(i) {
    ben.innerHTML = PERFILES[i].b.map(([a, t]) => `<article class="bcard"><i>${a}</i><p>${esc(t)}</p></article>`).join('');
  }
  showPerfil(0);

  /* ============ línea de tiempo ============ */
  const tl = $('#tl');
  tl.innerHTML = LINEA.map(([f, t, d]) => `<article class="tl-item"><b>${f}</b><h4>${t}</h4><p>${esc(d)}</p></article>`).join('');
  const step = () => Math.min(360, tl.clientWidth * 0.8);
  $('#tl-prev').addEventListener('click', () => tl.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
  $('#tl-next').addEventListener('click', () => tl.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
  tl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); tl.scrollBy({ left: step(), behavior: 'smooth' }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); tl.scrollBy({ left: -step(), behavior: 'smooth' }); }
  });
  let down = false, sx = 0, sl = 0;
  tl.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; sx = e.clientX; sl = tl.scrollLeft; tl.classList.add('drag');
  });
  addEventListener('pointermove', (e) => { if (down) tl.scrollLeft = sl - (e.clientX - sx); });
  addEventListener('pointerup', () => { down = false; tl.classList.remove('drag'); });

  /* ============ glosario ============ */
  $('#gloss').innerHTML = GLOSARIO.map(([t, d]) => `<details><summary>${t}</summary><p>${esc(d)}</p></details>`).join('');

  /* ============ examen ============ */
  const quiz = $('#quiz'), score = $('#score');
  let respondidas = 0, aciertos = 0;
  const renderScore = () => {
    const total = PREGUNTAS.length;
    const fin = respondidas === total;
    const msg = !fin ? '' :
      aciertos === total ? `Perfecto, ${total} de ${total}.` :
      aciertos >= total / 2 ? `Bien: ${aciertos} de ${total}. Repasa las que fallaste.` :
      `${aciertos} de ${total}. Vuelve a las secciones anteriores y repite.`;
    score.innerHTML =
      `<span>${respondidas} de ${total} preguntas respondidas</span>` +
      `<span class="bar"><i style="transform:scaleX(${respondidas / total})"></i></span>` +
      (fin ? `<span class="final">${msg}</span><button class="retry" type="button">Repetir</button>` : '');
    const r = $('.retry', score);
    if (r) r.addEventListener('click', build);
  };
  function build() {
    respondidas = 0; aciertos = 0;
    quiz.innerHTML = '';
    PREGUNTAS.forEach((p, i) => {
      const box = document.createElement('div');
      box.className = 'q';
      box.innerHTML =
        `<h4><span>${String(i + 1).padStart(2, '0')}</span>${p.q}</h4>` +
        `<div class="opts">${p.o.map((t, k) => `<button type="button" class="opt" data-k="${k}"><i>${'abc'[k]}</i>${t}</button>`).join('')}</div>` +
        `<p class="fb"></p>`;
      $$('.opt', box).forEach((b) => b.addEventListener('click', () => {
        const k = Number(b.dataset.k), ok = k === p.c;
        $$('.opt', box).forEach((x, j) => {
          x.disabled = true;
          if (j === p.c) x.classList.add('ok');
          else if (j === k) x.classList.add('no');
          else x.classList.add('dimmed');
        });
        $('.fb', box).textContent = (ok ? 'Correcto. ' : 'No era esa. ') + p.f;
        box.classList.add('done');
        respondidas++; if (ok) aciertos++;
        renderScore();
      }));
      quiz.appendChild(box);
    });
    renderScore();
  }
  build();

  watch();
})();
