/* ===================================================================
   Ruang Belajar - hub
   -------------------------------------------------------------------
   CARA MENAMBAH MATKUL BARU:
   1. Tambahkan satu objek ke array COURSES di bawah.
   2. theme: 'terminal' | 'library' | nama lain.
      Tema baru = tambah (a) fungsi di PREVIEWS dan (b) blok CSS `.t-namatema`
      di style.css. Kalau belum dibuat, kartu otomatis pakai tema bawaan.
   3. href: alamat web belajar tersebut (folder/index.html atau URL).
   =================================================================== */

const COURSES = [
  {
    id: 'statistika-bisnis',
    theme: 'terminal',
    kicker: 'Analisis Data',
    title: 'Statistika Bisnis',
    desc: 'Konsep, tutorial SPSS langkah demi langkah, cara membaca output, dan latihan soal.',
    href: 'StatistikaBisnis/index.html',   // <- sesuaikan dengan lokasi folder web ini
    tags: ['Tutorial SPSS', 'Pilih uji', 'Latihan'],
    keywords: 'spss uji hipotesis regresi anova output data statistik',
    lines: [
      ['p', 'lab-spss --uji t-test'],
      ['', 'Sig. (2-tailed) = 0.031'],
      ['ok', 'p < 0.05  =>  tolak H0'],
    ],
  },
  {
    id: 'manajemen-keuangan',
    theme: 'library',
    kicker: 'Ex Libris',
    title: 'Manajemen Keuangan',
    desc: 'Pendamping Bab 1-14 Fundamentals of Financial Management, lengkap dengan laboratorium dan lembar rumus.',
    href: 'ManajemenKeuangan/index.html',  // <- sesuaikan
    tags: ['Rak buku', 'Laboratorium', 'Lembar rumus', 'Latihan'],
    keywords: 'keuangan rasio npv wacc modal kerja bab buku van horne',
    spines: 14, // Bab 1-14
  },
  {
    id: 'manajemen-operasi',
    theme: 'industrial',
    kicker: 'Operations Management',
    title: 'Manajemen Operasi',
    desc: 'Pendamping Bab 1-7 dan Suplemen 5-7 buku Operations Management (Heizer, Render, Munson), dari lini produksi sampai latihan soal.',
    href: 'ManajemenOperasi/index.html',   // <- sesuaikan
    tags: ['Laboratorium', 'Lembar rumus', 'Istilah', 'Latihan'],
    keywords: 'operasi produksi operations management heizer render munson rumus istilah bab suplemen',
    hexes: 7, // Bab 1-7
  },
  // { id:'...', theme:'...', kicker:'...', title:'...', desc:'...', href:'...', tags:[...] },
];

/* ---------- util ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const LAST_KEY = 'ruangbelajar:last';

function store(get, val) {
  try { return get ? localStorage.getItem(LAST_KEY) : localStorage.setItem(LAST_KEY, val); }
  catch (e) { return null; }
}

/* ---------- preview per tema ---------- */
const SPINE_COLORS = ['#7a1f2b', '#2f4a3a', '#1f3a5f', '#8a5a1f', '#4a2f56', '#5a3b22', '#2d5557'];

const PREVIEWS = {
  terminal(c) {
    return `
      <div class="win" aria-hidden="true">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        <span class="win-path">~/${esc(c.id)}</span>
      </div>
      <div class="scr" aria-hidden="true" data-lines='${esc(JSON.stringify(c.lines || []))}'></div>`;
  },
  library(c) {
    const n = c.spines || 10;
    const heights = [78, 92, 70, 86, 96, 74, 88];
    let spines = '';
    for (let i = 0; i < n; i++) {
      const h = heights[(i * 3) % heights.length];
      spines += `<span class="sp" style="height:${h}%;background:${SPINE_COLORS[i % SPINE_COLORS.length]}">${i + 1}</span>`;
    }
    return `
      <div class="exl" aria-hidden="true"><span>Ex Libris</span><span class="seal">&#167;</span></div>
      <div class="shelf" aria-hidden="true">${spines}</div>`;
  },
  industrial(c) {
    const n = c.hexes || 6;
    let hx = '';
    for (let i = 0; i < n; i++) hx += `<span class="hx" style="--i:${i}">${i + 1}</span>`;
    return `
      <div class="belt-wrap" aria-hidden="true">
        <div class="hexrow">${hx}</div>
        <div class="belt"></div>
      </div>`;
  },
  default(c) {
    return `<div class="gen" aria-hidden="true">${esc(c.title.charAt(0))}</div>`;
  },
};

/* ---------- render kartu ---------- */
function cardHTML(c) {
  const theme = PREVIEWS[c.theme] ? c.theme : 'default';
  const prev = PREVIEWS[theme](c);
  const kicker = theme === 'library' ? '' : `<div class="c-kicker">${esc(c.kicker || '')}</div>`;
  const kickerLib = theme === 'library' ? `<div class="c-kicker">${esc(c.kicker && c.kicker !== 'Ex Libris' ? c.kicker : 'Perpustakaan')}</div>` : '';
  const chips = (c.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join('');
  const openTxt = theme === 'terminal' ? 'buka --lab' : theme === 'library' ? 'Buka perpustakaan' : theme === 'industrial' ? 'Masuk lini produksi' : 'Buka';
  const arrow = theme === 'library' ? '&rarr;' : '&rarr;';
  return `
    <a class="card t-${theme}" href="${esc(c.href)}" data-id="${esc(c.id)}" aria-label="Buka ${esc(c.title)}">
      ${prev}
      <div class="c-body">
        ${kicker}${kickerLib}
        <h2 class="c-title">${esc(c.title)}</h2>
        <p class="c-desc">${esc(c.desc)}</p>
        <div class="c-chips">${chips}</div>
      </div>
      <div class="c-foot"><span class="c-open">${openTxt}</span><span class="c-arrow" aria-hidden="true">${arrow}</span></div>
    </a>`;
}

const soonHTML = `
  <div class="soon" role="note">
    <b aria-hidden="true">+</b>
    <strong>Matkul berikutnya</strong>
    <p>Ruang ini disiapkan untuk web belajar yang akan datang.</p>
  </div>`;

/* ---------- efek ketik di kartu terminal ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function typeTerminal(el) {
  let lines;
  try { lines = JSON.parse(el.dataset.lines); } catch (e) { return; }
  if (!lines.length) return;

  const draw = (done, partial) => {
    const html = done.map(([k, t]) =>
      `<div class="ln">${k === 'p' ? '<span class="p">$ </span>' : '<span class="p">&gt; </span>'}${k === 'ok' ? `<span class="ok">${esc(t)}</span>` : esc(t)}</div>`
    ).join('');
    el.innerHTML = html + (partial ? `<div class="ln">${partial}<span class="cursor"></span></div>` : `<div class="ln"><span class="p">$ </span><span class="cursor"></span></div>`);
  };

  if (reduced) { draw(lines, null); return; }

  while (el.isConnected) {
    const done = [];
    for (const [k, t] of lines) {
      const pre = k === 'p' ? '<span class="p">$ </span>' : '<span class="p">&gt; </span>';
      for (let i = 1; i <= t.length; i++) {
        if (!el.isConnected) return;
        draw(done, pre + (k === 'ok' ? `<span class="ok">${esc(t.slice(0, i))}</span>` : esc(t.slice(0, i))));
        await sleep(k === 'p' ? 55 : 22);
      }
      done.push([k, t]);
      draw(done, null);
      await sleep(420);
    }
    await sleep(3200);
  }
}

/* ---------- state & render ---------- */
function render(query = '') {
  const q = query.trim().toLowerCase();
  const list = COURSES.filter(c =>
    !q || [c.title, c.kicker, c.desc, c.keywords, (c.tags || []).join(' ')].join(' ').toLowerCase().includes(q));

  const grid = $('#grid');
  grid.innerHTML = list.map(cardHTML).join('') + (q ? '' : soonHTML);
  $('#empty').hidden = list.length > 0;
  grid.querySelectorAll('.scr[data-lines]').forEach(typeTerminal);
}

function renderResume() {
  const box = $('#resume');
  const c = COURSES.find(x => x.id === store(true));
  if (!c) { box.hidden = true; return; }
  box.hidden = false;
  box.innerHTML = `
    <a href="${esc(c.href)}" data-id="${esc(c.id)}">
      <span><small>Lanjutkan terakhir</small><strong>${esc(c.title)}</strong></span>
      <span class="go" aria-hidden="true">lanjut &rarr;</span>
    </a>`;
}

function greeting() {
  const d = new Date(), h = d.getHours();
  const sapa = h < 4 ? 'Selamat dini hari' : h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam';
  let hari = '';
  try { hari = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(d); } catch (e) {}
  $('#greet').textContent = hari ? `${sapa} - ${hari}` : sapa;
}

/* ---------- init ---------- */
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-id]');
  if (a) store(false, a.dataset.id);
});

$('#q').addEventListener('input', e => render(e.target.value));

$('#count').textContent = COURSES.length + ' matkul';
greeting();
renderResume();
render();
