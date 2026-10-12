// Router dan halaman utama. Data ada di data.js, glosarium.js, labs.js, quiz.js
const M = document.getElementById('M');
const doneP = () => store.get('cs-done', []);
const tagP = p => `<a class="tagp" href="#/p/${p}">P${p}</a>`;

// ----- Beranda -----
const home = () => {
  const d = doneP(), pct = Math.round(d.length / MOD.length * 100);
  const nxt = (MOD.find(m => !d.includes(m.n)) || MOD[0]).n;
  const card = m => `<a class="mod b${m.b}" href="#/p/${m.n}"><span class="no">${pad(m.n)}</span><h3>${m.j}</h3><p>${m.s}</p><div class="tags">${m.tag.map(t => `<span class="tg">${t}</span>`).join('')}</div>${d.includes(m.n) ? '<span class="done">✓ selesai</span>' : ''}</a>`;
  return `<section class="page hero"><div class="term"><div class="dots"><i></i><i></i><i></i></div><span>cyberlex ~ belajar</span></div>
<div class="termbody"><p><b>$</b> ./belajar --matkul "Keamanan Siber" --target UTS</p><p class="out">Pertemuan 1–7 dimuat. Fokus: analisis dan keputusan (bisnis · hukum · etika).</p><p class="out">Progres: <span class="acc">${d.length}/${MOD.length}</span> modul selesai<span class="caret"></span></p></div>
<div class="bar"><i style="width:${pct}%"></i></div>
<p class="lead">Ringkasan, glosarium, dan latihan dari materi Pertemuan 1–7. Mata kuliah ini menilai cara kamu <b>menganalisis dan memutuskan</b>, bukan hafalan teknis, jadi lab di sini melatih kebiasaan itu.</p>
<div class="cta"><a class="btn pri" href="#/p/${nxt}">${d.length ? 'Lanjut belajar' : 'Mulai dari Pertemuan 1'}</a><a class="btn" href="#/lab">Buka lab</a><a class="btn" href="#/latihan">Latihan UTS</a></div></section>
${BLOK.map((b, bi) => `<h2 class="sec">${b}</h2><div class="mods">${MOD.filter(m => m.b === bi).map(card).join('')}</div>`).join('')}
<section class="page"><h2>Playbook analisis kasus</h2><p class="lead">Delapan langkah baku untuk menjawab soal kasus. Hampir semua tugas dan pertanyaan di Pertemuan 1–7 bisa dijawab dengan urutan ini.</p><ol class="play">${PLAY.map((s, i) => `<li><span class="n">${i + 1}</span><div><b>${s[0]}</b><p>${s[1]}</p></div><span class="tagp">${s[2]}</span></li>`).join('')}</ol><p><a class="btn" href="#/latihan/kasus">Coba di studi kasus</a></p></section>`;
};

// ----- Halaman pertemuan -----
const mod = n => {
  const m = MOD[n - 1]; if (!m) return home();
  const d = doneP().includes(n);
  const labs = m.lab.map(k => `<a class="btn" href="#/lab/${k}">${LABS[k].ic} ${LABS[k].t}</a>`).join('');
  return `<section class="page"><p class="crumb"><a href="#/">‹ Semua modul</a> · ${BLOK[m.b]}</p><span class="bigno">${pad(m.n)}</span><h2>${m.j}</h2><p class="lead">${m.r}</p>
<h3>Yang perlu kamu kuasai</h3><ul class="pts">${m.p.map(x => `<li>${x}</li>`).join('')}</ul>
${m.k.map(k => `<div class="case-box"><h4>${k[0]}</h4>${k[1].length ? `<div class="stats">${k[1].map(s => `<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>` : ''}<p>${k[2]}</p></div>`).join('')}
${m.h.length ? `<h3>Dasar hukum dan rujukan</h3><div class="chips">${m.h.map(h => `<a class="chip law" href="#/hukum/${h}">§ ${(HK.find(x => x.id === h) || { n: 'Standar' }).n}</a>`).join('')}</div>` : ''}
<h3>Tips UTS <small class="mute">catatan penyusun, bukan bagian slide</small></h3><ul class="tips">${m.jb.map(x => `<li>${x}</li>`).join('')}</ul>
<div class="row">${labs}<a class="btn" href="#/latihan">Latihan soal</a><button class="btn ${d ? 'on' : ''}" data-act="mark" data-n="${n}">${d ? '✓ Selesai (ketuk untuk batal)' : 'Tandai selesai'}</button></div>
<p class="pn">${n > 1 ? `<a href="#/p/${n - 1}">‹ Pertemuan ${n - 1}</a>` : '<span></span>'}${n < MOD.length ? `<a href="#/p/${n + 1}">Pertemuan ${n + 1} ›</a>` : ''}</p></section>`;
};

// ----- Glosarium -----
const gcard = g => `<div class="fc" data-s="${(g.t + ' ' + g.d + ' ' + g.c).toLowerCase()}" data-p="${g.p}"><div class="fh"><b>${g.t}</b><span class="tagp">P${g.p}</span></div><p>${g.d}</p>${g.c ? `<p class="use">${g.c}</p>` : ''}</div>`;
const gloss = () => `<section class="page"><h2>Glosarium</h2><p class="lead">${G.length} istilah dari Pertemuan 1–7. Cari dengan kata kunci atau saring per pertemuan.</p><input type="search" id="gq" placeholder="Cari istilah, mis. grey hat, enkripsi, merek" aria-label="Cari istilah" autocomplete="off"><div class="chips" id="gp">${[0, 1, 2, 3, 4, 5, 6, 7].map(p => `<button class="chip ${p === 0 ? 'on' : ''}" data-act="gfp" data-p="${p}">${p ? 'P' + p : 'Semua'}</button>`).join('')}</div><p class="note" id="gn"></p><div class="fcs">${G.map(gcard).join('')}</div></section>`;
function gfilter() {
  const q = (document.getElementById('gq').value || '').toLowerCase().trim(), p = ST.gp || 0; let n = 0;
  document.querySelectorAll('.fc').forEach(c => { const ok = (!p || +c.dataset.p === p) && (!q || c.dataset.s.includes(q)); c.style.display = ok ? '' : 'none'; if (ok) n++; });
  document.getElementById('gn').textContent = n ? n + ' istilah' : 'Tidak ada istilah yang cocok.';
}

// ----- Hukum -----
const hukum = () => `<section class="page"><h2>Peta Hukum</h2><p class="lead">Hanya yang disebut di slide Pertemuan 1–7. Pendalaman aspek hukum dijadwalkan di Pertemuan 9, jadi bagian ini bukan ringkasan lengkap UU.</p>
<h3>Etis vs legal</h3><div class="mx"><div class="q q1"><b>Legal dan etis</b><p>Yang dituju: memperoleh persetujuan yang jelas, menanggapi laporan celah dengan jujur.</p></div><div class="q q2"><b>Legal tetapi dipertanyakan</b><p>Wilayah abu-abu yang belum diatur: sebagian praktik dark pattern, konten AI tanpa keterbukaan.</p></div><div class="q q3"><b>Etis niatnya, tetapi melanggar</b><p>Grey hat: masuk tanpa izin dengan niat baik. UU ITE Pasal 30 tetap berlaku.</p></div><div class="q q4"><b>Ilegal dan tidak etis</b><p>Black hat: mencuri, memeras, menjual akses.</p></div></div>
<p class="note">Poin slide Pertemuan 4: &ldquo;legal&rdquo; tidak selalu berarti &ldquo;etis&rdquo;, dan sebaliknya.</p>
<h3>Undang-undang yang disebut</h3><div class="laws">${HK.map(h => `<article class="law ${ST.hl === h.id ? 'hl' : ''}" id="law-${h.id}"><div class="lh"><span class="sec-sign">§</span><div><h4>${h.n}</h4><small>${h.f}</small></div></div><ul>${h.k.map(x => `<li>${x}</li>`).join('')}</ul><p class="use">Dipakai untuk: ${h.u}</p><p><span class="tagp">${h.p}</span></p></article>`).join('')}</div>
<h3>Wilayah abu-abu</h3><div class="cards">${ABU.map(a => `<div class="lc static"><b>${a[0]}</b><small>${a[1]}</small></div>`).join('')}</div>
<h3>Standar dan rujukan non-hukum</h3><div class="tw"><table class="dt"><tr><th>Rujukan</th><th>Isi</th></tr>${STD.map(s => `<tr><td><b>${s[0]}</b><br><small>${s[2]}</small></td><td>${s[1]}</td></tr>`).join('')}</table></div></section>`;

// ----- Aksi umum -----
Object.assign(ACT, {
  mark(d) { const a = doneP(), i = a.indexOf(+d.n); i < 0 ? a.push(+d.n) : a.splice(i, 1); store.set('cs-done', a); redraw(); },
  gfp(d) { ST.gp = +d.p; document.querySelectorAll('#gp .chip').forEach(c => c.classList.toggle('on', +c.dataset.p === ST.gp)); gfilter(); }
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b || !ACT[b.dataset.act]) return;
  ACT[b.dataset.act](b.dataset, b, e);
});
document.addEventListener('input', e => { if (e.target.id === 'gq') gfilter(); });

// ----- Router -----
function view() {
  const [, r, a, b] = location.hash.slice(1).split('/');
  if (r === 'p') return mod(+a);
  if (r === 'lab') return a ? labPage(a) : labsIndex();
  if (r === 'glosarium') return gloss();
  if (r === 'hukum') { ST.hl = a; return hukum(); }
  if (r === 'latihan') return latihan(a || '', b);
  return home();
}
function paint() {
  M.innerHTML = view();
  const r = location.hash.slice(1).split('/')[1] || '';
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.r === (r === 'p' ? '' : r)));
  requestAnimationFrame(() => requestAnimationFrame(() => document.querySelectorAll('[data-w]').forEach(e => e.style.width = e.dataset.w + '%')));
  if (r === 'glosarium') gfilter();
}
function redraw() { const y = scrollY; paint(); scrollTo(0, y); }
addEventListener('hashchange', () => {
  const [, r, a] = location.hash.slice(1).split('/');
  const keep = r === 'hukum' ? ST.hl : null; ST = {}; paint();
  if (r === 'hukum' && a) { const el = document.getElementById('law-' + a); if (el) { el.scrollIntoView({ block: 'center' }); return; } }
  scrollTo(0, 0);
});
paint();
