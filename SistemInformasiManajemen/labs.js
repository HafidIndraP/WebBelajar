// Router, halaman, dan kuis. Data: data.js (CH, QS, PART), kamus.js (KM), banding.js (BD), labs.js (LAB).
const M=document.getElementById('M');
const KEY='itp-done';
const done=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}};
const save=a=>{try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const AREA={1:'r1',2:'r2',3:'r3',4:'r4',5:'r5',6:'r6',7:'sh'};

/* ---------- Beranda: gedung ---------- */
const room=(n,d)=>{const c=CH[n-1],on=d.includes(n);
 return `<a class="room c${n}${on?' lit':''}${n==7?' shaft':''}" style="grid-area:${AREA[n]}" href="#/bab/${n}" aria-label="Bab ${n}: ${c.t}${on?', sudah dikuasai':''}"><span class="rn">${n}</span><span class="rt2"><b>${c.room}</b><small>${c.s}</small></span><span class="wins" aria-hidden="true"><i></i><i></i><i></i><i></i></span></a>`};
const home=()=>{const d=done();
 return `<section class="hero"><h1>IT di Perusahaan</h1><p class="lead">Pendamping belajar Sistem Informasi Manajemen, Bab 1 sampai 7. Tiap bab adalah ruangan di sebuah gedung kantor. Masuki satu ruangan, pelajari isinya, lalu mainkan labnya.</p><p class="prog"><b>${d.length}</b> dari 7 ruangan menyala. Tandai bab yang sudah kamu kuasai, dan lampu jendelanya akan menyala.</p></section>
 <div class="bldg" role="navigation" aria-label="Gedung bab">
  <div class="roof" aria-hidden="true"><i class="tank"></i><i class="ant"></i></div>
  <div class="fl" style="grid-area:f3" aria-hidden="true">Lantai 3</div>${room(3,d)}${room(4,d)}
  <div class="fl" style="grid-area:f2" aria-hidden="true">Lantai 2</div>${room(2,d)}
  <div class="fl" style="grid-area:f1" aria-hidden="true">Lantai dasar</div>${room(1,d)}
  <div class="fl" style="grid-area:fb" aria-hidden="true">Basement</div>${room(5,d)}${room(6,d)}
  ${room(7,d)}
 </div>
 <p class="legend">Lantai atas dan lobi membahas bisnis, organisasi, dan strategi (Bab 1 sampai 4). Basement dan saluran kabel di sisi kanan membahas teknologi di baliknya (Bab 5 sampai 7). Saluran kabel menembus semua lantai karena jaringan menghubungkan segalanya.</p>
 <div class="tiles"><a href="#/lab"><b>Laboratorium</b><span>Simulasi interaktif: radar Porter, packet switching, database, dan lainnya</span></a><a href="#/kamus"><b>Kamus istilah</b><span>${KM.length} istilah kunci, bisa dicari</span></a><a href="#/bandingkan"><b>Tabel perbandingan</b><span>Bandingkan konsep yang mirip, dengan mode uji</span></a><a href="#/latihan"><b>Latihan soal</b><span>${QS.length} soal dengan penjelasan</span></a></div>`};

/* ---------- Halaman bab ---------- */
const ch=n=>{const c=CH[n-1];if(!c)return home();const dn=done().includes(n),terms=KM.filter(k=>k[0]==n);
 return `<section class="page c${n}"><p class="crumb"><a href="#/">Kembali ke gedung</a></p><div class="chead"><span class="bn">${n}</span><div><h2>${c.t}</h2><p class="where">Di gedung: ${c.room}. ${PART[c.p]}.</p></div></div><p class="lead">${c.r}</p>
 <h3>Yang perlu kamu kuasai</h3><ul class="pts">${c.k.map(x=>`<li>${x}</li>`).join('')}</ul>
 <h3>Istilah kunci</h3><p class="note">Klik sebuah istilah untuk melihat artinya.</p><div class="terms">${terms.map((k,i)=>`<button class="tm" data-act="term" data-v="${n}:${i}">${k[1]}</button>`).join('')}</div><div class="tdef" aria-live="polite"></div>
 <h3>Kasus di buku</h3><ul class="cases">${c.kasus.map(k=>`<li><b>${k[0]}</b> <span class="kind">${k[1]}</span>${k[2]?`<br>${k[2]}`:''}</li>`).join('')}</ul>
 <h3>Coba di lab</h3><p>${c.labs.map(k=>`<a class="btn" href="#/lab/${k}">${LAB[k].t}</a>`).join('')}<a class="btn ghost" href="#/bandingkan">Tabel perbandingan</a></p>
 <p><button class="btn ${dn?'on':''}" data-act="mark" data-v="${n}">${dn?'Sudah dikuasai (klik untuk batal)':'Tandai sudah dikuasai'}</button></p>
 <p class="pn">${n>1?`<a href="#/bab/${n-1}">Bab ${n-1}: ${CH[n-2].s}</a>`:'<span></span>'}${n<7?`<a href="#/bab/${n+1}">Bab ${n+1}: ${CH[n].s}</a>`:''}</p></section>`};

/* ---------- Lab ---------- */
const labs=()=>`<section class="page"><h2>Laboratorium</h2><p class="lead">Simulasi untuk memegang konsepnya langsung: geser, klik, putuskan kabel, ubah data.</p>${CH.map(c=>{const ks=LABGRP(c.n);return ks.length?`<h3>Bab ${c.n}: ${c.s}</h3><div class="cards">${ks.map(k=>`<a class="c${c.n}" href="#/lab/${k}"><b>${LAB[k].t}</b><span>${LAB[k].c}</span></a>`).join('')}</div>`:''}).join('')}</section>`;
const lab=id=>{const l=LAB[id];if(!l)return labs();
 return `<section class="page c${l.b}"><p class="crumb"><a href="#/lab">Semua lab</a> <a href="#/bab/${l.b}">Bab ${l.b}: ${CH[l.b-1].s}</a></p><h2>${l.t}</h2><p class="lead">${l.c}</p><div id="labhost" class="labhost"></div><p class="note">${l.n}</p></section>`};

/* ---------- Kamus ---------- */
const kamus=()=>`<section class="page"><h2>Kamus istilah</h2><p class="lead">Cari istilah atau arti. Setiap entri disertai contoh singkat.</p><div class="kbar"><input type="text" id="kq" placeholder="Cari istilah, misalnya cloud atau normalisasi" aria-label="Cari istilah"><select id="kb" aria-label="Filter bab"><option value="0">Semua bab</option>${CH.map(c=>`<option value="${c.n}">Bab ${c.n}: ${c.s}</option>`).join('')}</select></div><p class="note" id="kc"></p>${CH.map(c=>`<div class="kg c${c.n}" data-b="${c.n}"><h3>Bab ${c.n}: ${c.s}</h3><dl class="gl">${KM.filter(k=>k[0]==c.n).map(k=>`<div class="ent" data-s="${(k[1]+' '+k[2]+' '+k[3]).toLowerCase().replace(/"/g,'')}"><dt>${k[1]}</dt><dd>${k[2]}<br><span class="use">Contoh: ${k[3]}</span></dd></div>`).join('')}</dl></div>`).join('')}</section>`;
function filtK(){const t=(E('#kq').value||'').toLowerCase().trim(),b=+E('#kb').value;let tot=0;
 EA('.kg').forEach(g=>{let n=0;const okb=!b||+g.dataset.b==b;EA('.ent',g).forEach(e=>{const ok=okb&&(!t||e.dataset.s.includes(t));e.style.display=ok?'':'none';if(ok)n++});g.style.display=n?'':'none';tot+=n});
 E('#kc').textContent=tot+' istilah ditampilkan.'}

/* ---------- Tabel perbandingan ---------- */
const banding=()=>`<section class="page"><h2>Tabel perbandingan</h2><p class="lead">Konsep yang mirip paling sering tertukar saat ujian. Bandingkan berdampingan, lalu aktifkan mode uji untuk menutup isinya dan menebak.</p><div class="jump">${BD.map(t=>`<button class="btn ghost" data-act="jump" data-v="${t.id}">${t.t}</button>`).join('')}</div>${BD.map(t=>`<div class="bt c${t.b}" id="bt-${t.id}"><h3>${t.t} <small>Bab ${t.b}</small></h3><p class="note">${t.q}</p><div class="tw"><table class="dt"><thead><tr>${t.h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${t.r.map(r=>`<tr>${r.map((x,j)=>`<td data-l="${t.h[j]}">${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div><button class="btn ghost" data-act="qz" data-v="${t.id}">Mode uji: tutup isi</button></div>`).join('')}</section>`;

/* ---------- Latihan ---------- */
let Q={on:false},QN=10;
function qBuild(f){const pool=QS.filter(q=>!f||q[0]==f);return shuffle(pool).slice(0,QN||pool.length).map(q=>({b:q[0],q:q[1],o:shuffle(q[2].map((t,i)=>({t,ok:i==q[3]}))),x:q[4]}))}
const quiz=()=>{
 if(!Q.on)return `<section class="page"><h2>Latihan soal</h2><p class="lead">Pilih panjang sesi dan cakupan. Urutan soal dan pilihan jawaban selalu diacak. Total ${QS.length} soal.</p><p class="note">Panjang sesi</p><p>${[[10,'10 soal'],[20,'20 soal'],[0,'Semua soal']].map(a=>`<button class="btn ghost ${QN==a[0]?'on':''}" data-act="qlen" data-v="${a[0]}">${a[1]}</button>`).join('')}</p><p class="note">Cakupan</p><p><button class="btn" data-act="qs" data-v="0">Campuran semua bab</button></p><div class="cards">${CH.map(c=>`<a class="c${c.n}" href="#/latihan" data-act="qs" data-v="${c.n}"><b>Bab ${c.n}: ${c.s}</b><span>${QS.filter(q=>q[0]==c.n).length} soal</span></a>`).join('')}</div></section>`;
 if(Q.i>=Q.set.length){const w=Q.set.filter(x=>x.pick!=null&&!x.o[x.pick].ok);
  return `<section class="page"><h2>Selesai</h2><p class="lead">Skormu ${Q.s} dari ${Q.set.length}.</p><p>${Q.s==Q.set.length?'Sempurna. Coba bab lain atau buka tabel perbandingan.':Q.s>=Q.set.length*0.7?'Bagus. Tinjau soal yang salah di bawah ini.':'Buka lagi bab yang masih kabur, lalu ulangi latihan.'}</p>${w.length?`<h3>Yang perlu ditinjau</h3>${w.map(x=>`<div class="rv"><p><b>${x.q}</b></p><p class="ex">${x.x} <a href="#/bab/${x.b}">Buka Bab ${x.b}</a></p></div>`).join('')}`:''}<p><button class="btn" data-act="qs" data-v="${Q.f}">Ulangi dengan soal baru</button><button class="btn ghost" data-act="qm">Pilih cakupan lain</button></p></section>`}
 const x=Q.set[Q.i];
 return `<section class="page c${x.b}"><p class="crumb">Soal ${Q.i+1} dari ${Q.set.length}. Bab ${x.b}.</p><h2 class="qh">${x.q}</h2><div class="opts">${x.o.map((o,j)=>`<button class="opt ${x.pick==null?'':o.ok?'ok':j==x.pick?'no':''}" ${x.pick==null?'':'disabled'} data-act="qp" data-v="${j}">${o.t}</button>`).join('')}</div>${x.pick==null?'':`<p class="ex">${x.x}</p><button class="btn" data-act="qn">${Q.i+1<Q.set.length?'Soal berikut':'Lihat skor'}</button>`}</section>`};

/* ---------- Aksi ---------- */
const ACT={
 mark(v){const n=+v,d=done(),i=d.indexOf(n);i<0?d.push(n):d.splice(i,1);save(d);render(true)},
 term(v){const [n,i]=v.split(':').map(Number),k=KM.filter(x=>x[0]==n)[i],box=E('.tdef');EA('.tm').forEach(b=>b.classList.toggle('on',b.dataset.v==v));box.innerHTML=`<p><b>${k[1]}.</b> ${k[2]}</p><p class="use">Contoh: ${k[3]}</p>`},
 jump(v){const el=document.getElementById('bt-'+v);if(el)el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})},
 qz(v,t){const w=document.getElementById('bt-'+v);const on=w.classList.toggle('qz');EA('td',w).forEach(td=>td.classList.remove('rv'));t.textContent=on?'Mode uji aktif: klik sel untuk membuka':'Mode uji: tutup isi';t.classList.toggle('on',on)},
 qs(v){Q={on:true,f:+v,set:qBuild(+v),i:0,s:0};render(true)},
 qp(v){const x=Q.set[Q.i];if(x.pick!=null)return;x.pick=+v;if(x.o[x.pick].ok)Q.s++;render(true);const nb=E('[data-act="qn"]');if(nb)nb.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})},
 qn(){Q.i++;render(true)},
 qlen(v){QN=+v;render(true)},
 qm(){Q={on:false};render(true)}};
M.addEventListener('click',e=>{
 const td=e.target.closest('.qz td');if(td&&!e.target.closest('[data-act]')){td.classList.toggle('rv');return}
 const t=e.target.closest('[data-act]');if(!t)return;if(t.tagName=='A')e.preventDefault();ACT[t.dataset.act]&&ACT[t.dataset.act](t.dataset.v,t)});
M.addEventListener('input',e=>{if(e.target.id=='kq'||e.target.id=='kb')filtK()});
M.addEventListener('change',e=>{if(e.target.id=='kb')filtK()});

/* ---------- Router ---------- */
const TITLE={'':'Gedung',lab:'Laboratorium',kamus:'Kamus istilah',bandingkan:'Tabel perbandingan',latihan:'Latihan soal',bab:'Bab'};
function render(keep){
 CLEAN.splice(0).forEach(f=>f());
 const [,r,a]=location.hash.slice(1).split('/');let h,x=0;
 if(r=='bab'){h=ch(+a);x=1}else if(r=='lab'){h=a?lab(a):labs()}else if(r=='kamus')h=kamus();else if(r=='bandingkan')h=banding();else if(r=='latihan')h=quiz();else h=home();
 const sy=scrollY;M.innerHTML=h;
 if(r=='lab'&&a&&LAB[a])LAB[a].init(E('#labhost'));
 if(r=='kamus')filtK();
 if(r=='bab'&&CH[+a-1])document.title=`Bab ${a}: ${CH[+a-1].s} | IT di Perusahaan`;else document.title=(TITLE[r||'']||'Gedung')+' | IT di Perusahaan';
 EA('nav a').forEach(e=>e.classList.toggle('on',e.dataset.r==(r=='bab'?'':r||'')));
 const na=E('nav a.on'),nv=E('nav');if(na&&nv&&nv.scrollWidth>nv.clientWidth)nv.scrollLeft=na.offsetLeft-(nv.clientWidth-na.offsetWidth)/2;
 if(keep===true)scrollTo(0,sy)}
addEventListener('hashchange',()=>{render();scrollTo(0,0);M.focus({preventScroll:true})});
render();
