// Laboratorium interaktif. Tiap lab: b=bab, t=judul, c=pengantar, n=catatan, init(host)=membangun UI di elemen host.
// CLEAN berisi fungsi pembersih (timer, animasi) yang dijalankan tiap pindah halaman.
const CLEAN=[];
const E=(s,r)=>(r||document).querySelector(s);
const EA=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sl=(k,label,v,min=0,max=100,step=1)=>`<label class="sl">${label}: <b data-v="${k}">${v}</b><input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${v}"></label>`;
const bar=(label,v,cls)=>`<div class="bar"><span>${label}</span><div class="trk"><i class="${cls||''}" style="width:${Math.max(0,Math.min(100,v))}%"></i></div><b>${Math.round(v)}</b></div>`;
function vals(host){const o={};EA('[data-k]',host).forEach(e=>{o[e.dataset.k]=+e.value;const b=E('[data-v="'+e.dataset.k+'"]',host);if(b)b.textContent=e.value});return o}
const LAB={};

/* ---------- Bab 1: aset pelengkap ---------- */
LAB.aset={b:1,t:"Teknologi saja tidak cukup",c:"Geser tiga jenis investasi dan lihat berapa nilai yang benar-benar terwujud bagi bisnis.",
n:"Model ini disederhanakan untuk belajar: nilai terwujud hanya naik jika teknologi dan aset pelengkap (proses, budaya, perilaku manajemen) bergerak bersama.",
init(host){
 const SC=[["Beli ERP, proses tetap lama",{tech:90,proc:15,cult:20}],["Seimbang",{tech:60,proc:60,cult:60}],["Budaya siap, anggaran teknologi kecil",{tech:20,proc:70,cult:70}]];
 host.innerHTML=`<div class="split"><div>${sl('tech','Investasi teknologi (hardware, software, lisensi)',60)}${sl('proc','Investasi proses dan model bisnis',50)}${sl('cult','Investasi budaya, pelatihan, perilaku manajemen',40)}<h4>Coba skenario</h4>${SC.map((s,i)=>`<button class="btn ghost" data-sc="${i}">${s[0]}</button>`).join('')}</div><div class="out" aria-live="polite"></div></div>`;
 const o=E('.out',host);
 const calc=()=>{const v=vals(host),comp=(v.proc+v.cult)/2,val=100*Math.sqrt(v.tech/100*comp/100),gap=v.tech-comp;
  o.innerHTML=bar('Investasi teknologi',v.tech,'a')+bar('Kesiapan aset pelengkap',comp,'b')+bar('Nilai bisnis terwujud',val,'c')+
  `<p class="say">${gap>25?'Teknologi melaju lebih cepat dari kesiapan organisasi. Dana terpakai, tetapi proses lama tetap berjalan sehingga nilai tertinggal.':gap<-25?'Organisasi sudah siap, tetapi teknologi menjadi penghambat. Nilai dibatasi alat yang kurang memadai.':'Teknologi dan aset pelengkap bergerak selaras. Inilah kondisi yang memberi hasil terbaik per rupiah.'}</p>`};
 host.addEventListener('input',calc);
 host.addEventListener('click',e=>{const b=e.target.closest('[data-sc]');if(!b)return;const s=SC[+b.dataset.sc][1];for(const k in s)E('[data-k="'+k+'"]',host).value=s[k];calc()});
 calc()}};

/* ---------- Bab 2: piramida sistem ---------- */
LAB.piramida={b:2,t:"Sistem untuk tiap level manajemen",c:"Klik tiap lapisan piramida untuk melihat sistemnya, lalu uji dirimu dengan skenario.",
n:"Ingat: TPS di dasar menyuplai data ke MIS, DSS, dan ESS di atasnya.",
init(host){
 const PY=[
  ["Strategis","Manajemen puncak","ESS","Data internal ringkas dan data eksternal (pasar, pesaing, tren)","Dashboard, grafik, dan tren lewat portal","“Ke arah mana bisnis harus bergerak?”","Dashboard KPI direksi"],
  ["Manajerial","Manajer menengah","MIS dan DSS","MIS: ringkasan data TPS. DSS: data ditambah model analitik","MIS: laporan rutin. DSS: hasil simulasi dan analisis","“Apakah target tercapai? Apa jadinya bila harga diubah?”","Laporan penjualan per cabang, simulasi harga"],
  ["Operasional","Manajemen operasional dan staf","TPS","Transaksi rutin harian","Daftar transaksi, status, catatan","“Apakah pesanan hari ini sudah dikirim?”","Payroll, order processing, reservasi"]];
 const PQ=[
  ["Kasir memindai barang dan sistem mencatat penjualan.",0,"Mencatat transaksi rutin adalah tugas TPS."],
  ["Kepala cabang menerima laporan penjualan bulanan yang diringkas dari data transaksi.",1,"Laporan rutin ringkas dari TPS adalah MIS."],
  ["Analis menjalankan model untuk melihat dampak kenaikan harga 5 persen terhadap laba.",2,"Simulasi what-if dengan model analitik adalah ciri DSS."],
  ["Direktur utama membuka dashboard indikator kinerja dari berbagai sumber.",3,"Dashboard ringkas untuk manajemen puncak adalah ESS."],
  ["Sistem menghitung dan membayarkan gaji karyawan tiap bulan.",0,"Payroll adalah TPS klasik."],
  ["Manajer logistik menguji beberapa rute pengiriman dengan alat optimasi untuk menekan biaya.",2,"Keputusan tidak rutin dengan model optimasi adalah DSS."]];
 const NM=["TPS","MIS","DSS","ESS"];
 host.innerHTML=`<div class="split"><div class="pyr" role="group" aria-label="Level manajemen"></div><div class="out" aria-live="polite"></div></div><h4 class="sp">Uji dirimu</h4><div class="qf" aria-live="polite"></div>`;
 let sel=0,qi=0,sc=0,ans=null;
 const dPy=()=>{E('.pyr',host).innerHTML=PY.map((x,i)=>`<button class="${i==sel?'on':''}" style="width:${[46,74,100][i]}%" data-p="${i}">${x[0]}: ${x[2]}</button>`).join('');const p=PY[sel];
  E('.out',host).innerHTML=`<h4>${p[2]} melayani ${p[1].toLowerCase()}</h4><dl class="kv"><dt>Masukan</dt><dd>${p[3]}</dd><dt>Keluaran</dt><dd>${p[4]}</dd><dt>Pertanyaan khas</dt><dd>${p[5]}</dd><dt>Contoh</dt><dd>${p[6]}</dd></dl>`};
 const dQ=()=>{const q=E('.qf',host);if(qi>=PQ.length){q.innerHTML=`<p class="say">Skor: ${sc} dari ${PQ.length}.</p><button class="btn" data-r="1">Ulangi</button>`;return}
  const x=PQ[qi];q.innerHTML=`<p class="lead2">${x[0]}</p><div class="opts">${NM.map((n,j)=>`<button class="opt ${ans==null?'':j==x[1]?'ok':j==ans?'no':''}" ${ans==null?'':'disabled'} data-a="${j}">${n}</button>`).join('')}</div>${ans==null?'':`<p class="ex">${x[2]}</p><button class="btn" data-n="1">${qi+1<PQ.length?'Skenario berikut':'Lihat skor'}</button>`}`};
 host.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
  if(t.dataset.p!==undefined){sel=+t.dataset.p;dPy()}
  else if(t.dataset.a!==undefined&&ans==null){ans=+t.dataset.a;if(ans==PQ[qi][1])sc++;dQ()}
  else if(t.dataset.n){qi++;ans=null;dQ()}
  else if(t.dataset.r){qi=0;sc=0;ans=null;dQ()}});
 dPy();dQ()}};

/* ---------- Bab 2: matriks waktu/ruang ---------- */
LAB.kolab={b:2,t:"Matriks waktu/ruang kolaborasi",c:"Baca skenario, lalu klik kuadran yang menurutmu tepat. Klik kuadran kapan saja untuk melihat alat yang cocok.",
n:"Satu suite seperti Microsoft Teams bisa berada di beberapa kuadran sekaligus: obrolan dan rapat (sinkron), dokumen dan email (asinkron).",
init(host){
 const QD=[
  ["Waktu sama, tempat sama","Tatap muka","Ruang keputusan, meja bersama, layar dinding, roomware, alat AI"],
  ["Waktu sama, tempat beda","Jarak jauh sinkron","Video conference, instant messaging, virtual worlds, berbagi layar, editor multipengguna"],
  ["Waktu beda, tempat sama","Tugas berkelanjutan","Ruang tim, layar publik besar, manajemen proyek, papan koordinasi"],
  ["Waktu beda, tempat beda","Komunikasi dan koordinasi asinkron","Email, papan pesan, blog, kalender grup, workflow, version control, wiki"]];
 const SC=[
  ["Tim desain berkumpul di ruang rapat memakai layar dinding untuk memutuskan konsep.",0],
  ["Rapat mingguan tiga kantor lewat video call dan berbagi layar.",1],
  ["Tiga shift perawat memakai satu ruang jaga dan papan koordinasi untuk serah-terima.",2],
  ["Tim di Jakarta, Mumbai, dan New York menyusun proposal lewat dokumen bersama dan kalender grup.",3],
  ["Dua insinyur membahas bug lewat chat dan berbagi layar saat itu juga.",1],
  ["Tanya jawab internal lewat wiki dan forum, dijawab kapan saja oleh siapa saja.",3],
  ["Satu ruang proyek dipakai bergantian tim pagi dan tim malam dengan papan proyek besar.",2],
  ["Workshop brainstorming dengan semua peserta berada di satu ruangan.",0]];
 let i=0,sc=0,done=false,pick=null,view=null;
 host.innerHTML=`<div class="split"><div><p class="lead2" id="scn"></p><div class="mx2" role="group" aria-label="Pilih kuadran"></div><div class="mxl"><span>Tempat sama</span><span>Tempat beda</span></div></div><div class="out" aria-live="polite"></div></div>`;
 const draw=()=>{const s=SC[i];E('#scn',host).innerHTML=i>=SC.length?`Selesai. Skormu ${sc} dari ${SC.length}.`:`Skenario ${i+1} dari ${SC.length}: ${s[0]}`;
  E('.mx2',host).innerHTML=QD.map((q,j)=>{const ok=done&&i<SC.length&&j==s[1],no=done&&pick==j&&j!=s[1];return `<button class="${ok?'ok':no?'no':''} ${view==j?'on':''}" data-q="${j}"><b>${q[1]}</b><small>${j<2?'Waktu sama':'Waktu beda'}</small></button>`}).join('');
  let h='';if(view!=null)h+=`<h4>${QD[view][0]}</h4><p>${QD[view][2]}.</p>`;
  if(done&&i<SC.length)h+=`<p class="ex">${pick==s[1]?'Tepat.':'Belum tepat. Jawabannya: '+QD[s[1]][0]+'.'}</p><button class="btn" data-n="1">${i+1<SC.length?'Skenario berikut':'Lihat skor'}</button>`;
  if(i>=SC.length)h+=`<button class="btn" data-r="1">Ulangi</button>`;
  if(!h)h='<p class="note">Klik sebuah kuadran untuk menjawab atau menjelajah.</p>';E('.out',host).innerHTML=h};
 host.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
  if(t.dataset.q!==undefined){const j=+t.dataset.q;view=j;if(!done&&i<SC.length){pick=j;done=true;if(j==SC[i][1])sc++}draw()}
  else if(t.dataset.n){i++;done=false;pick=null;view=null;draw()}
  else if(t.dataset.r){i=0;sc=0;done=false;pick=null;view=null;draw()}});
 draw()}};

/* ---------- Bab 3: lima kekuatan Porter ---------- */
LAB.porter={b:3,t:"Radar lima kekuatan Porter",c:"Atur intensitas tiap kekuatan (0 lemah, 10 sangat kuat) atau pilih industri contoh. Bentuk radar menunjukkan tekanan persaingan.",
n:"Angka industri contoh hanyalah ilustrasi belajar, bukan data pasar. Fokus pada pola: kekuatan terbesar menentukan di mana SI paling dibutuhkan.",
init(host){
 const F=[["comp","Persaingan antarpesaing","Bersaing lewat efisiensi operasional atau diferensiasi layanan digital."],
  ["ent","Ancaman pendatang baru","Naikkan penghalang masuk: skala, data pelanggan, sistem yang mahal ditiru."],
  ["sub","Ancaman produk substitusi","Pantau pengganti, diferensiasi, dan ciptakan produk atau layanan baru berbasis data."],
  ["sup","Kekuatan tawar pemasok","Pengadaan elektronik dan banyak sumber pemasok mengurangi ketergantungan."],
  ["buy","Kekuatan tawar pelanggan","Naikkan switching costs lewat personalisasi, CRM, dan program loyalitas."]];
 const PR=[["Maskapai penerbangan",{comp:9,ent:4,sub:6,sup:8,buy:8}],["Marketplace online",{comp:8,ent:7,sub:5,sup:5,buy:8}],["Layanan streaming",{comp:9,ent:7,sub:7,sup:6,buy:6}],["Listrik regional",{comp:2,ent:2,sub:3,sup:5,buy:3}]];
 host.innerHTML=`<div class="split"><div>${F.map(f=>sl(f[0],f[1],5,0,10,1)).join('')}<h4>Industri contoh</h4>${PR.map((p,i)=>`<button class="btn ghost" data-pr="${i}">${p[0]}</button>`).join('')}</div><div class="out" aria-live="polite"></div></div>`;
 const o=E('.out',host),C=150,R=110;
 const pt=(i,r)=>{const a=(-90+i*72)*Math.PI/180;return[C+r*Math.cos(a),C+r*Math.sin(a)]};
 const calc=()=>{const v=vals(host),vs=F.map(f=>v[f[0]]),poly=vs.map((x,i)=>pt(i,R*x/10).map(n=>n.toFixed(1)).join(',')).join(' ');
  const rings=[2,4,6,8,10].map(k=>`<polygon points="${F.map((_,i)=>pt(i,R*k/10).map(n=>n.toFixed(1)).join(',')).join(' ')}" class="rg"/>`).join('');
  const SN=["Pesaing","Pendatang baru","Substitusi","Pemasok","Pelanggan"];const ax=F.map((f,i)=>{const p=pt(i,R),l=pt(i,R+26);return `<line x1="${C}" y1="${C}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" class="ax"/><text x="${l[0].toFixed(1)}" y="${l[1].toFixed(1)}" text-anchor="middle" dominant-baseline="middle" class="lb">${SN[i]}</text>`}).join('');
  const avg=vs.reduce((a,b)=>a+b,0)/5,top=vs.map((x,i)=>[x,i]).sort((a,b)=>b[0]-a[0]).slice(0,2);
  o.innerHTML=`<svg viewBox="-34 0 368 300" class="radar" role="img" aria-label="Radar lima kekuatan">${rings}${ax}<polygon points="${poly}" class="pl"/></svg><p class="say">Intensitas rata-rata ${avg.toFixed(1)} dari 10. ${avg>=6.5?'Industri keras: tekanan terhadap laba tinggi.':avg>=4?'Tekanan sedang: ada ruang untuk strategi yang tepat.':'Industri relatif longgar bagi pemain yang ada.'}</p><h4>Dua tekanan terbesar dan respons SI</h4><ul>${top.map(t=>`<li><b>${F[t[1]][1]} (${t[0]})</b>: ${F[t[1]][2]}</li>`).join('')}</ul>`};
 host.addEventListener('input',calc);
 host.addEventListener('click',e=>{const b=e.target.closest('[data-pr]');if(!b)return;const s=PR[+b.dataset.pr][1];for(const k in s)E('[data-k="'+k+'"]',host).value=s[k];calc()});
 calc()}};

/* ---------- Bab 3: value chain ---------- */
LAB.rantai={b:3,t:"Peta value chain",c:"Pilih tujuan strategi untuk menyorot aktivitas yang paling terbantu SI, lalu klik aktivitas untuk melihat contohnya.",
n:"Value chain mengajukan satu pertanyaan: di aktivitas mana SI menambah nilai terbesar? Value web memperluas pertanyaan itu ke seluruh mitra.",
init(host){
 const PA=[["Logistik masuk","Menerima dan menyimpan bahan baku","Pemantauan stok otomatis, pemesanan ulang ke pemasok terhubung"],
  ["Operasi","Mengubah bahan menjadi produk","Otomasi pabrik, penjadwalan produksi, kontrol kualitas berbasis sensor"],
  ["Logistik keluar","Menyimpan dan mengirim produk","Pelacakan kiriman, optimasi rute, gudang otomatis"],
  ["Pemasaran dan penjualan","Menjangkau dan menjual ke pelanggan","Iklan digital terarah, analitik pelanggan, toko online"],
  ["Layanan","Dukungan setelah penjualan","Pusat bantuan, chatbot, riwayat layanan dalam CRM"]];
 const SA=[["Infrastruktur perusahaan","Manajemen, keuangan, hukum","ERP, pelaporan keuangan, kepatuhan"],
  ["Sumber daya manusia","Merekrut dan melatih","Sistem rekrutmen, LMS, penilaian kinerja"],
  ["Teknologi","Riset, desain, pengembangan","Desain berbantuan komputer, kolaborasi tim R&D, analitik data"],
  ["Pengadaan","Membeli input dari pemasok","Katalog dan pesanan elektronik, evaluasi pemasok"]];
 const G=[["Menekan biaya",[0,1,2,"s3"]],["Diferensiasi produk",[1,3,4,"s2"]],["Fokus pada niche",[3,4,"s2"]],["Dekat dengan pelanggan dan pemasok",[3,4,"s3"]]];
 host.innerHTML=`<div class="goals">${G.map((g,i)=>`<button class="btn ghost" data-g="${i}">${g[0]}</button>`).join('')}<button class="btn ghost" data-g="-1">Hapus sorotan</button></div><div class="vc"><div class="vs">${SA.map((x,i)=>`<button data-k="s${i}">${x[0]}</button>`).join('')}</div><div class="vp">${PA.map((x,i)=>`<button data-k="p${i}">${x[0]}</button>`).join('')}</div></div><div class="out" aria-live="polite"><p class="note">Klik sebuah aktivitas.</p></div>`;
 const m=k=>k[0]=='s'?SA[+k.slice(1)]:PA[+k.slice(1)];
 host.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
  if(t.dataset.g!==undefined){const g=G[+t.dataset.g];EA('.vc button',host).forEach(b=>b.classList.remove('hi'));
   if(g)g[1].forEach(x=>{const k=typeof x=='number'?'p'+x:x;E('[data-k="'+k+'"]',host).classList.add('hi')});}
  else if(t.dataset.k){EA('.vc button',host).forEach(b=>b.classList.remove('on'));t.classList.add('on');const x=m(t.dataset.k);
   E('.out',host).innerHTML=`<h4>${x[0]} (${t.dataset.k[0]=='s'?'aktivitas pendukung':'aktivitas primer'})</h4><p>${x[1]}.</p><p><b>Peran SI:</b> ${x[2]}.</p>`}});}};

/* ---------- Bab 4: analisis etika ---------- */
LAB.etika={b:4,t:"Analisis etika lima langkah",c:"Pilih sebuah dilema. Telusuri lima langkah analisis, lalu bandingkan opsi dengan enam prinsip etika.",
n:"Prinsip etika tidak memberi jawaban otomatis. Penilaian di tabel ini adalah contoh penalaran untuk berlatih, dan orang bisa berbeda pendapat.",
init(host){
 const PR=[["Golden Rule","Rela kah kamu diperlakukan seperti ini?"],["Kant","Bagaimana jika ini menjadi aturan bagi semua orang?"],["Slippery slope","Jika diulang terus, ke mana ujungnya?"],["Utilitarian","Opsi mana memberi nilai terbesar bagi terbanyak?"],["Risk aversion","Opsi mana potensi kerugiannya terkecil?"],["No free lunch","Siapa pemilik dan berhak kompensasi?"]];
 const D=[
 {t:"Aplikasi cuaca dan data lokasi",fakta:["Aplikasi cuaca gratis mengumpulkan lokasi tepat penggunanya.","Perusahaan mendapat pemasukan dengan menjual data ke pihak ketiga.","Pengguna jarang membaca kebijakan privasi, dan data ‘anonim’ dapat dikaitkan ke individu."],
  dilema:"Pendapatan perusahaan dan layanan gratis berhadapan dengan privasi dan kendali pengguna atas datanya.",stake:["Pengguna","Perusahaan dan pemegang saham","Pembeli data","Regulator"],
  opsi:[{t:"Jual data lokasi tanpa sorotan, cukup di kebijakan privasi",s:[-1,-1,-1,0,-1,-1],k:"Pendapatan aman, tetapi risiko pelacakan, kebocoran, dan hilangnya kepercayaan besar."},
        {t:"Jual hanya dengan opt-in yang jelas dan bisa dimatikan",s:[1,1,0,1,0,1],k:"Pengguna memegang kendali. Pendapatan menyusut, tetapi kepercayaan terjaga."},
        {t:"Tidak menjual data, tawarkan versi berbayar",s:[1,1,1,0,1,1],k:"Paling aman bagi privasi. Tantangannya, tidak semua pengguna mau membayar."}]},
 {t:"AI penyaring lamaran kerja",fakta:["Perusahaan menerima ribuan lamaran, dan menyaring manual lambat dan mahal.","Alat AI memberi skor dari CV berdasarkan data lamaran masa lalu.","Data masa lalu bisa memuat bias."],
  dilema:"Efisiensi rekrutmen berhadapan dengan keadilan bagi pelamar dan risiko bias algoritma.",stake:["Pelamar","Tim HRD","Perusahaan","Regulator dan masyarakat"],
  opsi:[{t:"Tolak otomatis pelamar berskor rendah",s:[-1,-1,-1,0,-1,0],k:"Cepat dan murah, tetapi bias tak terdeteksi bisa menyingkirkan pelamar layak tanpa penjelasan."},
        {t:"AI sebagai pembantu, manusia meninjau, dan bias diaudit berkala",s:[1,1,0,1,1,0],k:"Efisiensi tetap ada, keputusan akhir di manusia, dan bias bisa dikoreksi. Biaya audit bertambah."},
        {t:"Tidak memakai AI",s:[1,1,1,0,1,0],k:"Risiko bias algoritma hilang, tetapi proses lambat dan beban HRD tinggi."}]}];
 const L={1:["Sejalan","ok"],0:["Campur","mid"],'-1':["Bertentangan","bad"]};
 host.innerHTML=`<div class="goals">${D.map((d,i)=>`<button class="btn ghost" data-d="${i}">${d.t}</button>`).join('')}</div><div class="ana"></div>`;
 let di=0,oi=null;
 const draw=()=>{const d=D[di];EA('[data-d]',host).forEach((b,i)=>b.classList.toggle('on',i==di));
  E('.ana',host).innerHTML=`<div class="stp5"><div><b>1. Fakta</b><ul>${d.fakta.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><b>2. Dilema dan nilai</b><p>${d.dilema}</p></div><div><b>3. Stakeholder</b><ul>${d.stake.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>
  <p><b>4. Opsi dan 5. konsekuensi.</b> Klik kepala kolom untuk membaca konsekuensinya.</p><div class="tw"><table class="dt etx"><thead><tr><th>Prinsip</th>${d.opsi.map((o,i)=>`<th><button class="${oi==i?'on':''}" data-o="${i}">Opsi ${'ABC'[i]}</button><br><small>${o.t}</small></th>`).join('')}</tr></thead><tbody>${PR.map((p,j)=>`<tr><td><b>${p[0]}</b><br><small>${p[1]}</small></td>${d.opsi.map(o=>{const l=L[o.s[j]];return `<td><span class="chip ${l[1]}">${l[0]}</span></td>`}).join('')}</tr>`).join('')}<tr><td><b>Ringkasan</b></td>${d.opsi.map(o=>{const c=v=>o.s.filter(x=>x==v).length;return `<td><small>${c(1)} sejalan, ${c(0)} campur, ${c(-1)} bertentangan</small></td>`}).join('')}</tr></tbody></table></div>
  <div class="out" aria-live="polite">${oi==null?'<p class="note">Belum ada opsi dipilih.</p>':`<h4>Opsi ${'ABC'[oi]}</h4><p>${d.opsi[oi].k}</p>`}</div>`};
 host.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
  if(t.dataset.d!==undefined){di=+t.dataset.d;oi=null;draw()}else if(t.dataset.o!==undefined){oi=+t.dataset.o;draw()}});
 draw()}};

/* ---------- Bab 5: tumpukan cloud ---------- */
LAB.cloud={b:5,t:"Siapa mengelola apa di cloud",c:"Bandingkan tanggung jawab pada empat model. Pilih kebutuhan untuk melihat model yang paling cocok.",
n:"Pada SaaS, data tetap milik perusahaanmu, tetapi penyedia yang mengelola seluruh tumpukan teknis di bawahnya. Public, private, dan hybrid cloud menjawab pertanyaan lain: siapa pemilik lingkungannya.",
init(host){
 const LY=["Aplikasi","Data","Runtime","Middleware","Sistem operasi","Virtualisasi","Server","Penyimpanan","Jaringan"];
 const MD=["On-premise","IaaS","PaaS","SaaS"];
 const OW=[[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,0,0,0,0],[1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
 const NE=[["Toko kecil butuh email dan CRM berjalan besok.",[3],"SaaS: tinggal berlangganan, penyedia mengurus semuanya."],
  ["Tim developer ingin merilis aplikasi tanpa mengurus server dan sistem operasi.",[2],"PaaS: kamu mengurus kode dan data, platform mengurus sisanya."],
  ["Perusahaan butuh OS dan konfigurasi khusus, tetapi tidak mau membeli perangkat keras.",[1],"IaaS: sewa mesin virtual, atur OS dan perangkat lunak sendiri."],
  ["Bank wajib menyimpan data sensitif di lingkungan yang dikendalikan penuh.",[0],"On-premise atau private cloud: kontrol maksimal, tanggung jawab maksimal."],
  ["Startup menghadapi lonjakan trafik musiman yang sulit diperkirakan.",[1,2],"IaaS atau PaaS di public cloud: kapasitas bisa naik dan turun sesuai kebutuhan (skalabilitas)."]];
 host.innerHTML=`<div class="tw"><table class="dt stack"><thead><tr><th></th>${MD.map(m=>`<th>${m}</th>`).join('')}</tr></thead><tbody>${LY.map((l,r)=>`<tr><td>${l}</td>${MD.map((m,c)=>`<td class="${OW[c][r]?'you':'prov'}" data-c="${c}">${OW[c][r]?'Kamu':'Penyedia'}</td>`).join('')}</tr>`).join('')}</tbody></table></div><h4 class="sp">Pilih kebutuhan</h4><div class="goals">${NE.map((n,i)=>`<button class="btn ghost" data-n="${i}">${n[0]}</button>`).join('')}</div><div class="out" aria-live="polite"><p class="note">Pilih satu kebutuhan.</p></div>`;
 host.addEventListener('click',e=>{const b=e.target.closest('[data-n]');if(!b)return;const n=NE[+b.dataset.n];
  EA('[data-n]',host).forEach(x=>x.classList.toggle('on',x==b));EA('[data-c]',host).forEach(x=>x.classList.toggle('hl',n[1].includes(+x.dataset.c)));
  E('.out',host).innerHTML=`<p>${n[2]}</p>`});}};

/* ---------- Bab 5: era infrastruktur ---------- */
LAB.era={b:5,t:"Garis waktu era infrastruktur",c:"Klik tiap batang untuk membaca cirinya. Perhatikan: tidak ada era yang benar-benar berakhir.",
n:"Semua era bertanda 'sampai sekarang'. Perusahaan sering menjalankan mainframe, server, dan cloud secara bersamaan, dan itu sebabnya integrasi sistem menjadi tantangan.",
init(host){
 const ER=[["Mainframe dan minikomputer",1959,"Komputasi terpusat dibawah kendali programmer dan operator profesional, dengan hampir seluruh infrastruktur dari satu vendor. Minikomputer membawa komputasi terdesentralisasi ke departemen."],
  ["Personal computer",1981,"Komputer desktop mandiri dengan perangkat lunak produktivitas, pertama kali meluas di bisnis dan rumah tangga."],
  ["Client/server",1983,"PC (client) terhubung ke server yang kuat, pemrosesan dibagi sehingga pekerjaan bisa disebar dengan komputer kecil yang murah."],
  ["Enterprise computing",1992,"Standar jaringan seperti TCP/IP menyatukan perangkat dan jaringan kecil menjadi jaringan perusahaan tempat informasi mengalir bebas."],
  ["Cloud dan mobile",2000,"Server menyimpan data dan perangkat lunak di pusat data jauh yang diakses lewat komputer, ponsel, dan perangkat lain. Pemrosesan dan penyimpanan menjadi layanan."]];
 const S=1955,T=2026,W=T-S;
 host.innerHTML=`<div class="tl">${ER.map((e,i)=>`<button style="margin-left:${(e[1]-S)/W*100}%;width:${(T-e[1])/W*100}%" class="c${i+1}" data-e="${i}"><span>${e[0]} (${e[1]}–sekarang)</span></button>`).join('')}<div class="ticks">${[1960,1970,1980,1990,2000,2010,2020].map(y=>`<i style="left:${(y-S)/W*100}%">${y}</i>`).join('')}</div></div><div class="out" aria-live="polite"><p class="note">Klik sebuah batang.</p></div>`;
 host.addEventListener('click',e=>{const b=e.target.closest('[data-e]');if(!b)return;const x=ER[+b.dataset.e];EA('[data-e]',host).forEach(z=>z.classList.toggle('on',z==b));
  E('.out',host).innerHTML=`<h4>${x[0]}, sejak ${x[1]}</h4><p>${x[2]}</p>`});}};

/* ---------- Bab 6: file vs relasional ---------- */
LAB.relasi={b:6,t:"File tradisional vs database relasional",c:"Ubah alamat Budi di kedua dunia. Lihat mengapa menyimpan fakta di satu tempat lebih aman.",
n:"Normalisasi memisahkan data per entitas, sedangkan primary key dan foreign key menyambungkannya kembali saat dibutuhkan.",
init(host){
 const FLAT0=[[1001,"Budi","Jl. Mawar 5","Laptop",9000,1],[1002,"Budi","Jl. Mawar 5","Mouse",150,2],[1003,"Sari","Jl. Melati 2","Laptop",9000,1],[1004,"Sari","Jl. Melati 2","Monitor",2000,1],[1005,"Budi","Jl. Mawar 5","Monitor",2000,1],[1006,"Dewi","Jl. Kenanga 9","Mouse",150,3]];
 const P0=[["P1","Budi","Jl. Mawar 5"],["P2","Sari","Jl. Melati 2"],["P3","Dewi","Jl. Kenanga 9"]],K0=[["K1","Laptop",9000],["K2","Mouse",150],["K3","Monitor",2000]];
 const O0=[[1001,"P1","K1",1],[1002,"P1","K2",2],[1003,"P2","K1",1],[1004,"P2","K3",1],[1005,"P1","K3",1],[1006,"P3","K2",3]];
 let mode=0,flat,P,K,O,sel=null,msg="";
 const reset=()=>{flat=FLAT0.map(r=>r.slice());P=P0.map(r=>r.slice());K=K0.map(r=>r.slice());O=O0.map(r=>r.slice());sel=null;msg=""};
 const tbl=(h,rows,fn)=>`<div class="tw"><table class="dt"><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(fn).join('')}</tbody></table></div>`;
 const draw=()=>{
  let h=`<div class="goals"><button class="btn ghost ${mode==0?'on':''}" data-m="0">File tradisional</button><button class="btn ghost ${mode==1?'on':''}" data-m="1">Database relasional</button></div>`;
  if(mode==0){
   const bad=[...new Set(flat.map(r=>r[1]))].filter(n=>new Set(flat.filter(r=>r[1]==n).map(r=>r[2])).size>1);
   h+=`<p>Satu file besar. Alamat dan harga diulang di banyak baris: <b>${flat.length} salinan alamat</b>.</p>${tbl(["No","Pelanggan","Alamat","Produk","Harga (Rp ribu)","Jumlah"],flat,r=>`<tr class="${bad.includes(r[1])?'warn':''}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`)}
   <div class="goals"><button class="btn" data-a="f1">Budi pindah: ubah satu baris saja</button><button class="btn" data-a="fall">Budi pindah: ubah ketiga barisnya</button><button class="btn ghost" data-a="rs">Reset</button></div>
   <p class="say">${bad.length?'Inkonsistensi! '+bad.join(', ')+' kini punya lebih dari satu alamat. Laporan mana yang benar?':'Semua alamat konsisten.'}</p>${msg?`<p class="ex">${msg}</p>`:''}`;
  }else{
   const ref=sel==null?null:O.find(o=>o[0]==sel);
   h+=`<p>Alamat Budi disimpan sekali, di <b>${P.length} baris</b> tabel Pelanggan. Klik sebuah pesanan untuk melihat kunci yang menyambungkannya.</p>
   <div class="rel"><div><b>Pelanggan</b>${tbl(["ID (PK)","Nama","Alamat"],P,r=>`<tr class="${ref&&ref[1]==r[0]?'hl':''}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`)}</div>
   <div><b>Pesanan</b>${tbl(["No (PK)","ID_Pelanggan (FK)","ID_Produk (FK)","Jml",""],O,r=>`<tr class="${sel==r[0]?'hl':''}" data-o="${r[0]}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td><button class="mini" data-del="${r[0]}">Hapus</button></td></tr>`)}</div>
   <div><b>Produk</b>${tbl(["ID (PK)","Nama","Harga"],K,r=>`<tr class="${ref&&ref[2]==r[0]?'hl':''}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`)}</div></div>
   <div class="goals"><button class="btn" data-a="r1">Budi pindah: ubah satu baris</button><button class="btn" data-a="dw">Hapus pelanggan Dewi</button><button class="btn ghost" data-a="rs">Reset</button></div>
   ${msg?`<p class="ex">${msg}</p>`:''}<b>Hasil gabungan (join) lewat kunci</b>${tbl(["No","Pelanggan","Alamat","Produk","Harga","Jml"],O,r=>{const p=P.find(x=>x[0]==r[1]),k=K.find(x=>x[0]==r[2]);return `<tr><td>${r[0]}</td><td>${p?p[1]:'?'}</td><td>${p?p[2]:'?'}</td><td>${k?k[1]:'?'}</td><td>${k?k[2]:'?'}</td><td>${r[3]}</td></tr>`})}`;}
  host.innerHTML=h};
 host.addEventListener('click',e=>{const t=e.target.closest('button,tr[data-o]');if(!t)return;
  if(t.dataset.m!==undefined){mode=+t.dataset.m;msg=""}
  else if(t.dataset.a=='f1'){flat[0][2]="Jl. Anggrek 1";msg="Staf hanya mengubah baris pertama dan lupa dua baris lain."}
  else if(t.dataset.a=='fall'){flat.forEach(r=>{if(r[1]=="Budi")r[2]="Jl. Anggrek 1"});msg="Aman, tetapi 3 baris harus diubah. Semakin besar data, semakin mudah ada yang terlewat."}
  else if(t.dataset.a=='r1'){P[0][2]="Jl. Anggrek 1";msg="Satu perubahan di tabel Pelanggan. Seluruh pesanan Budi otomatis menampilkan alamat baru."}
  else if(t.dataset.a=='dw'){const n=O.filter(o=>o[1]=="P3").length;if(n){msg=`Ditolak oleh referential integrity: masih ada ${n} pesanan yang merujuk ke Dewi. Hapus pesanannya dulu.`}else{P=P.filter(p=>p[0]!="P3");msg="Pelanggan Dewi dihapus. Tidak ada pesanan yang kehilangan rujukan."}}
  else if(t.dataset.a=='rs'){reset()}
  else if(t.dataset.del){O=O.filter(o=>o[0]!=+t.dataset.del);if(sel==+t.dataset.del)sel=null;msg="Pesanan "+t.dataset.del+" dihapus."}
  else if(t.dataset.o){sel=sel==+t.dataset.o?null:+t.dataset.o;msg=""}
  draw()});
 reset();draw()}};

/* ---------- Bab 7: packet switching ---------- */
LAB.paket={b:7,t:"Simulasi packet switching",c:"Kirim pesan dari A ke B. Pesan dipecah menjadi paket yang memilih rute berbeda. Klik kabel untuk memutuskannya, lalu kirim lagi.",
n:"Paket bisa tiba tidak berurutan. Nomor urut membuat penerima merakit pesan dengan benar, inilah pembagian tugas TCP dan IP.",
init(host){
 const N={A:[60,150],R1:[190,60],R2:[190,240],R3:[380,80],R4:[380,220],B:[570,150]};
 const ED=[["A","R1"],["A","R2"],["R1","R3"],["R2","R3"],["R2","R4"],["R3","B"],["R4","B"]];
 const down=new Set();
 host.innerHTML=`<div class="split2"><label class="sl">Pesan: <input type="text" id="pk-msg" value="Halo dari kantor pusat" maxlength="40"></label>${sl('sz','Karakter per paket',5,2,8,1)}<button class="btn" id="pk-go">Kirim</button></div>
 <svg viewBox="30 24 580 252" class="net" role="img" aria-label="Jaringan dengan enam titik">${ED.map((e,i)=>`<line class="ln" data-e="${i}" x1="${N[e[0]][0]}" y1="${N[e[0]][1]}" x2="${N[e[1]][0]}" y2="${N[e[1]][1]}"/><line class="hit" data-e="${i}" x1="${N[e[0]][0]}" y1="${N[e[0]][1]}" x2="${N[e[1]][0]}" y2="${N[e[1]][1]}"/>`).join('')}
 ${Object.keys(N).map(k=>`<g class="nd ${k=='A'||k=='B'?'end':''}"><circle cx="${N[k][0]}" cy="${N[k][1]}" r="${k=='A'||k=='B'?24:18}"/><text x="${N[k][0]}" y="${N[k][1]}" text-anchor="middle" dominant-baseline="central">${k}</text></g>`).join('')}<g id="pk-layer"></g></svg>
 <p class="note">Klik sebuah kabel untuk memutus atau menyambungnya. Garis putus-putus merah berarti terputus.</p><div class="out" aria-live="polite"></div>`;
 const out=E('.out',host),layer=E('#pk-layer',host);let raf=0,t0=0,pk=[],arr=[],msgTxt="";
 const paths=()=>{const R=[],adj={};ED.forEach((e,i)=>{if(down.has(i))return;(adj[e[0]]=adj[e[0]]||[]).push(e[1]);(adj[e[1]]=adj[e[1]]||[]).push(e[0])});
  const dfs=(n,p)=>{if(n=='B'){R.push(p.slice());return}(adj[n]||[]).forEach(m=>{if(!p.includes(m)){p.push(m);dfs(m,p);p.pop()}})};dfs('A',['A']);return R};
 const mark=()=>EA('.ln',host).forEach(l=>l.classList.toggle('off',down.has(+l.dataset.e)));
 const stop=()=>{cancelAnimationFrame(raf);raf=0};CLEAN.push(stop);
 const SEG=650,GAP=380;
 const frame=ts=>{if(!t0)t0=ts;const el=ts-t0;let live=0;
  pk.forEach(p=>{if(p.done)return;const t=el-p.start;if(t<0){live++;p.g.style.display='none';return}
   const tot=(p.path.length-1)*SEG;if(t>=tot){p.done=true;p.g.remove();arr.push(p);return}live++;
   const s=Math.min(p.path.length-2,Math.floor(t/SEG)),f=(t-s*SEG)/SEG,a=N[p.path[s]],b=N[p.path[s+1]];
   p.g.style.display='';p.g.setAttribute('transform',`translate(${(a[0]+(b[0]-a[0])*f).toFixed(1)},${(a[1]+(b[1]-a[1])*f).toFixed(1)})`)});
  show();if(live)raf=requestAnimationFrame(frame);else raf=0};
 const show=()=>{const sorted=arr.slice().sort((x,y)=>x.seq-y.seq).map(p=>p.txt).join('');
  out.innerHTML=`<h4>Rute tiap paket</h4><ul class="rt">${pk.map(p=>`<li>#${p.seq} “${esc(p.txt)}”: ${p.path.join(' → ')} (${p.path.length-1} lompatan)</li>`).join('')}</ul><h4>Urutan tiba di B</h4><p>${arr.map(p=>`<span class="chip pq">#${p.seq}</span>`).join(' ')||'<span class="note">belum ada</span>'}</p><h4>Pesan setelah dirakit</h4><p class="say">${arr.length==pk.length?esc(sorted):'menunggu semua paket...'}</p>`};
 const send=()=>{stop();layer.innerHTML='';const txt=E('#pk-msg',host).value||' ',n=+E('[data-k="sz"]',host).value,P=paths();arr=[];pk=[];
  if(!P.length){out.innerHTML='<p class="ex">Tidak ada rute dari A ke B. Sambungkan kembali salah satu kabel.</p>';return}
  const w=P.map(p=>1/Math.pow(p.length-1,3)),sw=w.reduce((a,b)=>a+b,0);
  for(let i=0,s=1;i<txt.length;i+=n,s++){let r=Math.random()*sw,k=0;while(k<P.length-1&&r>w[k]){r-=w[k];k++}
   const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','pkt');g.style.display='none';
   g.innerHTML=`<rect x="-20" y="-13" width="40" height="26" rx="4"/><text x="0" y="1" text-anchor="middle" dominant-baseline="central">#${s}</text>`;layer.appendChild(g);
   pk.push({seq:s,txt:txt.slice(i,i+n),path:P[k],start:(s-1)*GAP,g,done:false})}
  t0=0;show();raf=requestAnimationFrame(frame)};
 host.addEventListener('click',e=>{const h=e.target.closest('.hit');if(h){const i=+h.dataset.e;down.has(i)?down.delete(i):down.add(i);mark();return}
  if(e.target.closest('#pk-go'))send()});
 host.addEventListener('input',e=>{vals(host)});
 mark();out.innerHTML='<p class="note">Tekan Kirim.</p>'}};

/* ---------- Bab 7: perjalanan URL ---------- */
LAB.dns={b:7,t:"Perjalanan sebuah alamat web",c:"Ketik alamat web, lalu telusuri lima langkah dari browser sampai halaman tampil.",
n:"Alamat IP di sini dibuat dari nama domain hanya untuk ilustrasi, bukan hasil pencarian DNS sungguhan.",
init(host){
 const PS=["https://www.contoh.co.id/produk?id=7","https://mail.kampus.ac.id/inbox","http://intranet.perusahaan.com/laporan"];
 host.innerHTML=`<div class="split2"><label class="sl">Alamat web: <input type="text" id="dn-u" value="${PS[0]}"></label><div class="goals">${PS.map((p,i)=>`<button class="btn ghost" data-p="${i}">Contoh ${i+1}</button>`).join('')}</div></div><div class="flow"></div><div class="out" aria-live="polite"></div><div class="goals"><button class="btn ghost" data-s="-1">Mundur</button><button class="btn" data-s="1">Langkah berikut</button></div>`;
 let st=0;
 const parse=()=>{let u=E('#dn-u',host).value.trim();if(!/^[a-z]+:\/\//i.test(u))u='https://'+u;try{const x=new URL(u);return{proto:x.protocol.replace(':',''),host:x.hostname,path:x.pathname+x.search}}catch(e){return null}};
 const ip=h=>{let a=7;const r=[];for(let i=0;i<4;i++){for(const c of h+i)a=(a*31+c.charCodeAt(0))>>>0;r.push(11+a%213)}return r.join('.')};
 const draw=()=>{const x=parse(),o=E('.out',host),f=E('.flow',host);
  if(!x||!x.host){f.innerHTML='';o.innerHTML='<p class="ex">Alamat belum valid. Contoh: https://www.contoh.co.id/produk</p>';return}
  const parts=x.host.split('.'),tld=parts.length>1?parts[parts.length-1]:'',sld=parts.length>1?parts[parts.length-2]:parts[0],sub=parts.slice(0,-2).join('.'),addr=ip(x.host);
  const S=[["Browser memecah alamat",`Protokol <b>${x.proto}</b>, domain <b>${x.host}</b>, jalur <b>${esc(x.path)}</b>. Domain terdiri atas ${sub?`subdomain <b>${sub}</b>, `:''}nama <b>${sld}</b>, dan akhiran <b>${tld||'-'}</b>.`,0],
   ["Browser bertanya ke DNS",`DNS menerjemahkan <b>${x.host}</b> menjadi alamat IP: <b>${addr}</b>. Manusia mengingat nama, jaringan memakai angka (IPv4 seperti ini, atau IPv6 yang lebih panjang).`,1],
   ["Terhubung lewat TCP/IP",`Permintaan dipecah menjadi paket, tiap paket diberi alamat tujuan <b>${addr}</b>, lalu router meneruskannya lewat jaringan menuju server.`,2],
   ["Server memproses permintaan",`Web server menerima permintaan ${x.proto.toUpperCase()} untuk <b>${esc(x.path)}</b>. Pada arsitektur multitier, ia meneruskan ke application server dan database server bila perlu.`,2],
   ["Halaman dikirim kembali",`Server mengirim berkas HTML (plus gambar, gaya, skrip) sebagai paket. Browser merakit dan menampilkan halaman.`,0]];
  const k=S[st];f.innerHTML=['Browser','Server DNS','Web server'].map((n,i)=>`<div class="fb ${i==k[2]?'on':''}">${n}</div>`).join('<span class="ar">···</span>');
  o.innerHTML=`<p class="stn">Langkah ${st+1} dari ${S.length}</p><h4>${k[0]}</h4><p>${k[1]}</p>`};
 host.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
  if(t.dataset.p!==undefined){E('#dn-u',host).value=PS[+t.dataset.p];st=0}
  else if(t.dataset.s){st=Math.max(0,Math.min(4,st+ +t.dataset.s))}draw()});
 host.addEventListener('input',()=>{st=0;draw()});
 draw()}};

const LABGRP=ch=>Object.keys(LAB).filter(k=>LAB[k].b==ch);
