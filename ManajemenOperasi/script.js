// Router dan tampilan. Data ada di materi.js (U), rumus.js (R), istilah.js (G), soal.js (QS), labs.js (L, LB).
const M=document.getElementById('M');
const done=()=>{try{return JSON.parse(localStorage.getItem('om-done')||'[]')}catch(e){return[]}};
const save=a=>{try{localStorage.setItem('om-done',JSON.stringify(a))}catch(e){}};
const bestGet=()=>{try{return JSON.parse(localStorage.getItem('om-best')||'{}')}catch(e){return{}}};
const bestSet=(k,v)=>{try{const b=bestGet();if(!(k in b)||v>b[k]){b[k]=v;localStorage.setItem('om-best',JSON.stringify(b))}}catch(e){}};
function mark(id){const d=done(),i=d.indexOf(id);i<0?d.push(id):d.splice(i,1);save(d);render(true)}
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const unit=id=>U[UI[id]];

/* ---------- beranda ---------- */
const station=(u,d)=>`<a class="stn" href="#/ch/${u.id}" aria-label="${uname(u)}: ${esc(u.ti)}${d.includes(u.id)?', sudah dikuasai':''}"><span class="lamp ${d.includes(u.id)?'on':''}">${d.includes(u.id)?'Lulus QC':'Belum'}</span><span class="hex">${u.no}</span><b>${esc(u.ti)}</b><span class="s">${esc(u.t)}</span></a>`;
const home=()=>{const d=done(),p=Math.round(d.length/U.length*100);
 let h=`<section class="panel"><div class="hero"><div><h2>Pabrik Belajar Manajemen Operasi</h2><p class="lead">Ringkasan Bab 1 sampai 7 dan Suplemen 5, 6, 7 buku Heizer, Render, dan Munson. Ambil satu stasiun dari lini produksi, pahami intinya, coba hitungannya di laboratorium, lalu uji dengan latihan.</p>
 <ol class="flow"><li>Baca ringkasan bab</li><li>Ubah angka di laboratorium</li><li>Kerjakan latihan</li><li>Tandai lulus QC</li></ol></div>
 <div class="gauge" style="--p:${p}" role="img" aria-label="${d.length} dari ${U.length} unit dikuasai"><span>${d.length}/${U.length}<small>unit lulus QC</small></span></div></div></section>`;
 P.forEach((t,pi)=>{h+=`<h2 class="partt">${t}</h2><div class="line">${U.filter(u=>u.part==pi).map(u=>station(u,d)).join('')}</div>`});
 return h+`<section class="panel"><h3>Alat bantu belajar</h3><div class="sec-links"><a href="#/lab"><b>Laboratorium</b>${Object.keys(L).length} kalkulator dengan langkah hitung dan grafik</a><a href="#/rumus"><b>Lembar rumus</b>${R.length} rumus dengan arti variabel</a><a href="#/istilah"><b>Istilah</b>${G.length} istilah kunci dari buku</a><a href="#/latihan"><b>Latihan</b>${QS.length} soal pilihan ganda</a></div></section>`};

/* ---------- bab ---------- */
const fcard=r=>`<div class="fc fi" data-s="${esc((r.n+' '+r.f+' '+r.v.map(x=>x[0]+' '+x[1]).join(' ')+' '+(r.k||'')).toLowerCase())}"><b>${esc(r.n)}</b>${r.e?` <span class="tag">Pers. ${r.e}</span>`:''}<code>${esc(r.f)}</code><dl>${r.v.map(x=>`<dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd>`).join('')}</dl>${r.k?`<p class="use">${esc(r.k)}</p>`:''}</div>`;
const ch=id=>{const u=unit(id);if(!u)return home();const d=done().includes(id),i=UI[id],fs=R.filter(r=>r.u==id),gs=G.filter(g=>g[0]==id),qn=QS.filter(x=>x.u==id).length;
 return `<section class="panel"><p class="crumb"><a href="#/">Kembali ke lini produksi</a></p><div class="chead"><span class="hex">${u.no}</span><div><small>${uname(u)} | judul buku: ${esc(u.t)}</small><h2>${esc(u.ti)}</h2></div></div><p class="lead">${esc(u.sum)}</p>
 <h3>Yang perlu kamu kuasai</h3><ul class="pts">${u.pts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
 ${fs.length?`<h3>Rumus dan arti variabelnya</h3>${fs.map(fcard).join('')}`:'<h3>Rumus</h3><p class="mut">Bab ini bersifat konsep: tidak ada rumus utama. Fokus pada istilah dan perbandingan konsep.</p>'}
 <h3>Istilah kunci (${gs.length})</h3><details class="gld"><summary>Tampilkan daftar istilah bab ini</summary><div class="gl">${gs.map(g=>`<div class="gi"><b>${esc(g[1])}</b><p>${esc(g[2])}</p></div>`).join('')}</div></details>
 <h3>Latihan</h3><div class="acts">${u.labs.map(k=>`<a class="btn" href="#/lab/${k}">${esc(L[k].t)}</a>`).join('')}<a class="btn alt" href="#/latihan/${id}">Kuis bab ini (${qn} soal)</a><button class="btn ${d?'on':''}" onclick="mark('${id}')" aria-pressed="${d}">${d?'Lulus QC (klik untuk batal)':'Tandai lulus QC'}</button></div>
 <div class="pn"><span>${i>0?`<a href="#/ch/${U[i-1].id}">Sebelumnya: ${uname(U[i-1])}</a>`:''}</span><span>${i<U.length-1?`<a href="#/ch/${U[i+1].id}">Berikutnya: ${uname(U[i+1])}</a>`:''}</span></div></section>`};

/* ---------- laboratorium ---------- */
const labs=()=>`<section class="panel"><h2>Laboratorium</h2><p class="lead">Ubah angkanya, lihat hasilnya berubah. Setiap lab menampilkan rumus, substitusi angka, dan hasilnya. Data contoh diambil dari soal di buku.</p>${U.filter(u=>u.labs.length).map(u=>`<h3>${uname(u)}: ${esc(u.ti)}</h3><div class="cards">${u.labs.map(k=>`<a href="#/lab/${k}"><b>${esc(L[k].t)}</b><small>${esc(L[k].c.split('. ')[0])}</small></a>`).join('')}</div>`).join('')}</section>`;
const fld=f=>{const[k,l,d,a,b,c]=f;if(a==='t')return `<label>${l}<input type="text" value="${esc(d)}" data-k="${k}" spellcheck="false"></label>`;
 if(a==='a')return `<label>${l}<textarea data-k="${k}" spellcheck="false">${esc(d)}</textarea></label>`;
 if(a!==undefined)return `<label>${l}: <b id="v_${k}">${d}</b><input type="range" min="${a}" max="${b}" step="${c}" value="${d}" data-k="${k}"></label>`;
 return `<label>${l}<input type="number" step="any" value="${d}" data-k="${k}"></label>`};
const lab=k=>{const l=L[k];if(!l)return labs();const u=unit(l.u);
 return `<section class="panel"><p class="crumb"><a href="#/lab">Semua laboratorium</a> | <a href="#/ch/${u.id}">${uname(u)}: ${esc(u.ti)}</a></p><h2>${esc(l.t)}</h2><p class="lead">${esc(l.c)}</p>
 <h3>Data contoh</h3><div class="tw"><table class="dt">${l.d.map((x,i)=>`<tr><td><b>${esc(x[0])}</b><br><span class="mut">${esc(x[2])}</span></td><td><button class="btn alt" onclick="useData('${k}',${i})">Pakai data ini</button></td></tr>`).join('')}</table></div>
 <h3>Input dan perhitungan</h3><div class="labgrid"><div class="ctl">${l.f.map(fld).join('')}</div><div id="out" aria-live="polite"></div></div><p class="note">${esc(l.n)}</p></section>`};
function initLab(k){const calc=()=>{const v={};document.querySelectorAll('[data-k]').forEach(e=>{const txt=e.type=='text'||e.tagName=='TEXTAREA';v[e.dataset.k]=txt?e.value:+e.value;const b=document.getElementById('v_'+e.dataset.k);if(b)b.textContent=e.value});
  let st;try{st=L[k].r(v)}catch(err){st=[{h:`<p class="note"><b>Periksa input:</b> ${esc(err.message)}</p>`}]}
  document.getElementById('out').innerHTML=st.map(x=>x.h!==undefined?(x.h?`<div class="tw">${x.h}</div>`:''):`<div class="stp"><b>${x[0]}</b>${x[1]?`<code>${x[1]}</code>`:''}${x[2]?`<div class="sub">${x[2]}</div>`:''}${x[3]!==''&&x[3]!==undefined?`<div class="rs">= ${x[3]}</div>`:''}</div>`).join('')};
 document.querySelectorAll('[data-k]').forEach(e=>e.addEventListener('input',calc));calc()}
function useData(k,i){const v=L[k].d[i][1];document.querySelectorAll('[data-k]').forEach(e=>{if(e.dataset.k in v)e.value=v[e.dataset.k]});document.querySelector('[data-k]').dispatchEvent(new Event('input'))}

/* ---------- rumus dan istilah ---------- */
const cheat=()=>`<section class="panel"><h2>Lembar rumus</h2><p class="lead">Setiap rumus disertai arti tiap variabel dan kapan dipakai. Cari dengan kata kunci, misalnya "slack", "alpha", atau "Cpk".</p><div class="tools"><input type="text" id="fq" placeholder="Cari rumus atau variabel" oninput="filt()" aria-label="Cari rumus"></div>${U.filter(u=>R.some(r=>r.u==u.id)).map(u=>`<div class="rb"><h3>${uname(u)}: ${esc(u.ti)}</h3>${R.filter(r=>r.u==u.id).map(fcard).join('')}</div>`).join('')}<p class="note" id="nf" hidden>Tidak ada rumus yang cocok.</p></section>`;
const gloss=()=>`<section class="panel"><h2>Istilah</h2><p class="lead">Istilah kunci dari akhir tiap bab, diterjemahkan dan diringkas. Ujian OM sering menguji istilah, jadi hafalkan pasangannya.</p><div class="tools"><input type="text" id="fq" placeholder="Cari istilah atau arti" oninput="filt()" aria-label="Cari istilah"><select id="fu" onchange="filt()" aria-label="Filter unit"><option value="">Semua unit</option>${U.map(u=>`<option value="${u.id}">${uname(u)}: ${esc(u.sh)}</option>`).join('')}</select></div><p class="note" id="nc"></p><div class="gl">${G.map(g=>`<div class="gi fi" data-u="${g[0]}" data-s="${esc((g[1]+' '+g[2]).toLowerCase())}"><span class="tag">${uname(unit(g[0]))}</span><b>${esc(g[1])}</b><p>${esc(g[2])}</p></div>`).join('')}</div></section>`;
function filt(){const t=(document.getElementById('fq')||{value:''}).value.toLowerCase().trim(),uu=(document.getElementById('fu')||{value:''}).value;let tot=0;
 document.querySelectorAll('.rb').forEach(b=>{let n=0;b.querySelectorAll('.fi').forEach(c=>{const ok=!t||c.dataset.s.includes(t);c.style.display=ok?'':'none';if(ok)n++});b.style.display=n?'':'none';tot+=n});
 const gl=document.querySelector('.panel>.gl');if(gl){tot=0;gl.querySelectorAll('.fi').forEach(c=>{const ok=(!t||c.dataset.s.includes(t))&&(!uu||c.dataset.u==uu);c.style.display=ok?'':'none';if(ok)tot++});const nc=document.getElementById('nc');if(nc)nc.textContent=tot+' istilah ditampilkan'}
 const nf=document.getElementById('nf');if(nf)nf.hidden=tot>0}

/* ---------- latihan ---------- */
let QZ=null;
function startQuiz(scope){const pool=QS.filter(x=>scope=='all'||x.u==scope);let l=shuffle(pool);if(scope=='all')l=l.slice(0,15);
 QZ={scope,i:0,s:0,a:null,wrong:[],list:l.map(x=>{const o=shuffle([x.r,...x.w]);return{q:x.q,o,c:o.indexOf(x.r),e:x.e,u:x.u}})}}
function pick(j){if(!QZ||QZ.a!=null)return;QZ.a=j;const x=QZ.list[QZ.i];if(j==x.c)QZ.s++;else QZ.wrong.push({x,j});render(true)}
function nextQ(){QZ.i++;QZ.a=null;render(true);scrollTo(0,0)}
function endQuiz(){QZ=null;location.hash='#/latihan'}
const quizMenu=()=>{const b=bestGet();return `<section class="panel"><h2>Latihan</h2><p class="lead">Pilih bab untuk soal khusus, atau campur semua bab (15 soal acak). Urutan soal dan pilihan jawaban diacak setiap kali.</p><div class="cards"><a href="#/latihan/all"><b>Semua bab, 15 soal acak</b><small>${b.all!=null?'Skor terbaik '+b.all+'%':'Belum dicoba'}</small></a>${U.map(u=>`<a href="#/latihan/${u.id}"><b>${uname(u)}: ${esc(u.sh)}</b><small>${QS.filter(x=>x.u==u.id).length} soal${b[u.id]!=null?', terbaik '+b[u.id]+'%':''}</small></a>`).join('')}</div></section>`};
const quiz=a=>{if(!a)return quizMenu();if(a!='all'&&!unit(a))return quizMenu();if(!QZ||QZ.scope!=a)startQuiz(a);
 const n=QZ.list.length,tn=a=='all'?'Semua bab':uname(unit(a))+': '+unit(a).sh;
 if(QZ.i>=n){const pct=Math.round(QZ.s/n*100);bestSet(a,pct);const gone=QZ.wrong;
  return `<section class="panel"><h2>Selesai</h2><p class="lead">${esc(tn)}</p><p class="score">${QZ.s}/${n}</p><p>${pct>=80?'Kuat. Lanjutkan ke laboratorium untuk soal hitungan yang lebih sulit.':pct>=60?'Cukup baik. Baca ulang bagian yang salah di bawah.':'Buka lagi ringkasan bab, lalu ulangi latihan ini.'}</p>${gone.length?`<h3>Yang perlu dibaca ulang</h3>${gone.map(w=>`<div class="rv"><b>${esc(w.x.q)}</b>Jawabanmu: ${esc(w.x.o[w.j])}<br>Jawaban benar: ${esc(w.x.o[w.x.c])}<br><span class="mut">${esc(w.x.e)}</span> <a href="#/ch/${w.x.u}">Buka ${uname(unit(w.x.u))}</a></div>`).join('')}`:''}<div class="acts"><button class="btn" onclick="QZ=null;render(true)">Ulangi</button><button class="btn alt" onclick="endQuiz()">Pilih bab lain</button></div></section>`}
 const x=QZ.list[QZ.i];
 return `<section class="panel"><div class="qtop"><span class="mut">${esc(tn)}</span><span>Skor sementara ${QZ.s}</span></div><h2>Soal ${QZ.i+1} dari ${n}</h2><div class="qbar" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${QZ.i}"><i style="width:${QZ.i/n*100}%"></i></div><p class="lead">${esc(x.q)}</p>${x.o.map((o,j)=>`<button class="opt ${QZ.a==null?'':j==x.c?'ok':j==QZ.a?'no':''}" ${QZ.a==null?'':'disabled'} onclick="pick(${j})">${QZ.a!=null&&j==x.c?'Benar: ':QZ.a==j?'Salah: ':''}${esc(o)}</button>`).join('')}${QZ.a==null?'':`<p class="ex">${esc(x.e)}</p><button class="btn" onclick="nextQ()">${QZ.i+1<n?'Lanjut':'Lihat skor'}</button>`}</section>`};

/* ---------- router ---------- */
function render(keep){const[,r,a]=location.hash.slice(1).split('/');let h;
 if(r=='ch')h=ch(a);else if(r=='lab')h=a?lab(a):labs();else if(r=='rumus')h=cheat();else if(r=='istilah')h=gloss();else if(r=='latihan')h=quiz(a);else h=home();
 if(r!='latihan')QZ=null;
 M.innerHTML=h;if(r=='lab'&&a&&L[a])initLab(a);
 const d=done(),pr=Math.round(d.length/U.length*100);document.getElementById('gm').innerHTML=`<b>${d.length}/${U.length}</b>unit lulus QC<div class="bar"><i style="width:${pr}%"></i></div>`;
 document.querySelectorAll('#nav a').forEach(e=>{const on=e.dataset.r==(r=='ch'||!r?'':r);e.classList.toggle('on',on);if(on)e.setAttribute('aria-current','page');else e.removeAttribute('aria-current')})}
addEventListener('hashchange',()=>{render();scrollTo(0,0);M.focus({preventScroll:true})});
render();
