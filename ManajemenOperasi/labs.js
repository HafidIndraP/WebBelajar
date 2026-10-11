// Laboratorium. Tiap lab: t=judul, u=unit, c=skenario, f=input [kunci,label,default,(min,max,step)|'t'|'a'],
// d=data contoh [nama,{input},deskripsi], r=langkah hitung [label,rumus,substitusi,hasil] atau {h:html}, n=catatan.
// Angka desimal pada kolom input memakai titik (contoh 0.4). Satuan mengikuti buku (dolar AS) kecuali disebut lain.
const q=x=>isFinite(x)?x.toLocaleString('id-ID',{maximumFractionDigits:4}):'tak terdefinisi';
const nums=s=>String(s).split(/[\s,;]+/).filter(x=>x!=='').map(Number);
const rows=s=>String(s).split(/\n/).map(l=>l.trim()).filter(Boolean).map(l=>l.split(',').map(x=>x.trim()));
const bad=m=>[{h:`<p class="note"><b>Periksa input:</b> ${esc(m)}</p>`}];
const sum=a=>a.reduce((s,x)=>s+x,0);

// ---------- distribusi normal ----------
function ncdf(z){if(z<0)return 1-ncdf(-z);if(z>=3)return 1-ncq(z);const x=z/Math.SQRT2;let s=0,t=x;for(let n=0;n<70;n++){s+=t/(2*n+1);t*=-x*x/(n+1)}return .5*(1+2/Math.sqrt(Math.PI)*s)}
function ncq(z){if(z<0)return ncdf(-z);if(z<3)return 1-ncdf(z);let f=z;for(let k=70;k>=1;k--)f=z+k/f;return Math.exp(-z*z/2)/Math.sqrt(2*Math.PI)/f}
function zinv(p){let lo=-8,hi=8;for(let i=0;i<80;i++){const m=(lo+hi)/2;ncdf(m)<p?lo=m:hi=m}return(lo+hi)/2}

// ---------- tabel dan grafik ----------
const tbl=(h,r,o={})=>`<div class="tw"><table class="dt"><tr>${h.map((x,i)=>`<th${i?' class="n"':''}>${x}</th>`).join('')}</tr>${r.map((w,j)=>`<tr${o.hl&&o.hl.includes(j)?' class="hl"':''}>${w.map((x,i)=>`<td${i?' class="n"':''}>${x}</td>`).join('')}</tr>`).join('')}</table></div>`;
function ticks(a,b,n){if(a==b){a-=1;b+=1}const r=b-a,s0=r/n,m=Math.pow(10,Math.floor(Math.log10(s0))),f=s0/m,st=(f<1.5?1:f<3?2:f<7?5:10)*m,o=[];for(let v=Math.floor(a/st+1e-9)*st;v<b+st*.999;v+=st)o.push(+v.toFixed(10));return o}
function chart(o){const W=640,H=o.h||300,m={l:62,r:18,t:14,b:44};let X=[],Y=[];o.series.forEach(s=>s.pts.forEach(p=>{X.push(p[0]);Y.push(p[1])}));(o.hl||[]).forEach(h=>Y.push(h.y));
 const xt=ticks(o.xmin??Math.min(...X),o.xmax??Math.max(...X),6),yt=ticks(o.ymin??Math.min(...Y),o.ymax??Math.max(...Y),5),x0=o.xmin??xt[0],x1=o.xmax??xt[xt.length-1],y0=yt[0],y1=yt[yt.length-1];
 const sx=v=>m.l+(v-x0)/((x1-x0)||1)*(W-m.l-m.r),sy=v=>H-m.b-(v-y0)/((y1-y0)||1)*(H-m.t-m.b);
 let g=`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.title||'grafik')}">`;
 yt.forEach(v=>{g+=`<line class="gd" x1="${m.l}" x2="${W-m.r}" y1="${sy(v)}" y2="${sy(v)}"/><text x="${m.l-8}" y="${sy(v)+4}" text-anchor="end">${$(v)}</text>`});
 xt.filter(v=>v>=x0&&v<=x1).forEach(v=>{g+=`<line class="gd" y1="${m.t}" y2="${H-m.b}" x1="${sx(v)}" x2="${sx(v)}"/><text x="${sx(v)}" y="${H-m.b+16}" text-anchor="middle">${o.xf?o.xf(v):$(v)}</text>`});
 g+=`<line class="ax" x1="${m.l}" x2="${W-m.r}" y1="${H-m.b}" y2="${H-m.b}"/><line class="ax" x1="${m.l}" x2="${m.l}" y1="${m.t}" y2="${H-m.b}"/>`;
 if(o.xl)g+=`<text x="${(W+m.l)/2}" y="${H-6}" text-anchor="middle">${esc(o.xl)}</text>`;
 if(o.yl)g+=`<text transform="translate(14 ${(H-m.b+m.t)/2}) rotate(-90)" text-anchor="middle">${esc(o.yl)}</text>`;
 (o.hl||[]).forEach(h=>{g+=`<line class="${h.c||'lim'}" x1="${m.l}" x2="${W-m.r}" y1="${sy(h.y)}" y2="${sy(h.y)}"/><text x="${W-m.r-4}" y="${sy(h.y)-4}" text-anchor="end">${esc(h.l||'')}</text>`});
 o.series.forEach((s,i)=>{const c=s.c||'l'+i;if(!s.nl)g+=`<polyline class="${c}" points="${s.pts.map(p=>sx(p[0])+','+sy(p[1])).join(' ')}"/>`;if(s.dots||s.nl)s.pts.forEach(p=>{g+=`<circle class="${s.bad&&s.bad(p)?'pb':'p'+(s.pc??i)}" cx="${sx(p[0])}" cy="${sy(p[1])}" r="${s.r||4}"/>`})});
 g+='</svg>';const L=o.series.filter(s=>s.n).map((s,i)=>`<span><i style="border-color:${['#1a64c8','#0a2540','#3f8ee8','#566e88'][s.pc??i]};${i==2||s.c=='l2'?'border-top-style:dashed':''}"></i>${esc(s.n)}</span>`);
 return g+(L.length?`<div class="leg">${L.join('')}</div>`:'')}
function gantt(ord,T){const W=640,rh=26,H=ord.length*rh+44,l=70,r=16,sx=v=>l+v/T*(W-l-r);let g=`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gantt chart jadwal paling awal">`;
 ticks(0,T,8).filter(v=>v<=T).forEach(v=>{g+=`<line class="gd" x1="${sx(v)}" x2="${sx(v)}" y1="8" y2="${H-26}"/><text x="${sx(v)}" y="${H-10}" text-anchor="middle">${$(v)}</text>`});
 ord.forEach((a,i)=>{const y=12+i*rh,k=Math.abs(a.sl)<1e-9;g+=`<text x="${l-8}" y="${y+13}" text-anchor="end">${esc(a.id)}</text>`;
  if(a.sl>1e-9)g+=`<rect x="${sx(a.ef)}" y="${y+6}" width="${sx(a.ef+a.sl)-sx(a.ef)}" height="8" fill="#e3ecf5" stroke="#b7c8da"/>`;
  g+=`<rect x="${sx(a.es)}" y="${y+2}" width="${Math.max(2,sx(a.ef)-sx(a.es))}" height="16" fill="${k?'#0a2540':'#3f8ee8'}"/>`});
 return g+`</svg><div class="leg"><span><i style="border-color:#0a2540"></i>Aktivitas kritis</span><span><i style="border-color:#3f8ee8"></i>Aktivitas dengan slack</span><span><i style="border-color:#b7c8da"></i>Slack (boleh terlambat)</span></div>`}

// ---------- jaringan proyek (CPM) ----------
function cpmCalc(acts){const m={};acts.forEach(a=>{m[a.id]=a});const ord=[],st={};
 const vis=a=>{if(st[a.id]==2)return;if(st[a.id]==1)throw new Error('Ada lingkaran pada hubungan pendahulu (sekitar aktivitas '+a.id+')');st[a.id]=1;a.p.forEach(p=>{if(!m[p])throw new Error('Pendahulu "'+p+'" pada aktivitas '+a.id+' tidak ada di daftar');vis(m[p])});st[a.id]=2;ord.push(a)};
 acts.forEach(vis);ord.forEach(a=>{a.es=a.p.length?Math.max(...a.p.map(p=>m[p].ef)):0;a.ef=a.es+a.d});
 const T=Math.max(...ord.map(a=>a.ef));acts.forEach(a=>{a.s=acts.filter(b=>b.p.includes(a.id)).map(b=>b.id)});
 [...ord].reverse().forEach(a=>{a.lf=a.s.length?Math.min(...a.s.map(s=>m[s].ls)):T;a.ls=a.lf-a.d;a.sl=a.ls-a.es});
 const cr=a=>Math.abs(a.sl)<1e-9,paths=[];const walk=(a,pre)=>{const nx=a.s.map(i=>m[i]).filter(b=>cr(b)&&Math.abs(b.es-a.ef)<1e-9);if(!nx.length)paths.push([...pre,a.id]);else nx.forEach(b=>walk(b,[...pre,a.id]))};
 ord.filter(a=>cr(a)&&a.es==0).forEach(a=>walk(a,[]));return{ord,T,m,paths,cr}}
function parseActs(rs,mk){const out=[],seen={};for(const r of rs){const x=mk(r);if(!x)throw new Error('Baris tidak lengkap: '+r.join(', '));if(seen[x.id])throw new Error('Kode aktivitas ganda: '+x.id);seen[x.id]=1;out.push(x)}if(!out.length)throw new Error('Belum ada aktivitas');return out}
const preds=s=>!s||s=='-'?[]:s.split(/[\/;]/).map(x=>x.trim()).filter(Boolean);

const L={};
L.prod={t:"Produktivitas: single-factor dan multifactor",u:"1",c:"Bandingkan produktivitas sebelum dan sesudah sistem baru. Satuan: dolar AS dan jam kerja, seperti contoh Collins Title Insurance di buku.",
f:[["o1","Output lama (judul per hari)",8],["o2","Output baru (judul per hari)",14],["h","Total jam kerja per hari",32],["w","Biaya tenaga kerja per hari ($)",640],["v1","Overhead lama per hari ($)",400],["v2","Overhead baru per hari ($)",800]],
d:[["Collins Title Insurance",{o1:8,o2:14,h:32,w:640,v1:400,v2:800},"Empat staf x 8 jam, sistem komputer baru menaikkan output dan overhead"],["Latihan buku: overhead $960",{o1:8,o2:14,h:32,w:640,v1:400,v2:960},"Overhead baru naik jadi 960, multifaktor menjadi 0,00875"],["Bengkel las",{o1:20,o2:26,h:40,w:800,v1:300,v2:450},"Mesin baru menambah output tetapi juga overhead"]],
r:v=>{const a=v.o1/v.h,b=v.o2/v.h,m1=v.o1/(v.w+v.v1),m2=v.o2/(v.w+v.v2);return[
["Produktivitas tenaga kerja lama","Output / jam kerja",`${$(v.o1)} / ${$(v.h)}`,q(a)+" unit per jam kerja"],
["Produktivitas tenaga kerja baru","Output / jam kerja",`${$(v.o2)} / ${$(v.h)}`,q(b)+" unit per jam kerja"],
["Perubahan produktivitas tenaga kerja","(baru - lama) / lama",`(${q(b)} - ${q(a)}) / ${q(a)}`,pc((b-a)/a)],
["Produktivitas multifaktor lama","Output / (tenaga kerja + overhead)",`${$(v.o1)} / (${$(v.w)} + ${$(v.v1)})`,q(m1)+" unit per dolar"],
["Produktivitas multifaktor baru","Output / (tenaga kerja + overhead)",`${$(v.o2)} / (${$(v.w)} + ${$(v.v2)})`,q(m2)+" unit per dolar"],
["Perubahan produktivitas multifaktor","(baru - lama) / lama",`(${q(m2)} - ${q(m1)}) / ${q(m1)}`,pc((m2-m1)/m1)]]},
n:"Ukuran multifaktor memberi gambaran lebih jujur karena semua biaya input ikut dihitung. Bandingkan kenaikan tenaga kerja dengan kenaikan multifaktor."};

L.rating={t:"Factor-rating: memilih penyedia atau lokasi",u:"2",c:"Satu baris per kriteria: kriteria, bobot, lalu skor tiap opsi (skala 1 sampai 5). Jumlah bobot harus 1.",
f:[["names","Nama opsi (pisah koma)","BIM (AS), S.P.C. (India), Telco (Israel)",'t'],["t","Kriteria, bobot, skor opsi 1, skor opsi 2, ...","Menekan biaya operasi, .2, 3, 3, 5\nMenekan investasi modal, .2, 4, 3, 3\nPersonel terampil, .2, 5, 4, 3\nMeningkatkan kualitas, .1, 4, 5, 2\nAkses teknologi, .1, 5, 3, 5\nMenambah kapasitas, .1, 4, 2, 4\nSelaras dengan budaya, .1, 2, 3, 5",'a']],
d:[["Tabel 2.3 buku",{names:"BIM (AS), S.P.C. (India), Telco (Israel)",t:"Menekan biaya operasi, .2, 3, 3, 5\nMenekan investasi modal, .2, 4, 3, 3\nPersonel terampil, .2, 5, 4, 3\nMeningkatkan kualitas, .1, 4, 5, 2\nAkses teknologi, .1, 5, 3, 5\nMenambah kapasitas, .1, 4, 2, 4\nSelaras dengan budaya, .1, 2, 3, 5"},"BIM 3,9 menang tipis dari Telco 3,8"],["Latihan buku: bobot diubah",{names:"BIM (AS), S.P.C. (India), Telco (Israel)",t:"Menekan biaya operasi, .2, 3, 3, 5\nMenekan investasi modal, .2, 4, 3, 3\nPersonel terampil, .1, 5, 4, 3\nMeningkatkan kualitas, .1, 4, 5, 2\nAkses teknologi, .1, 5, 3, 5\nMenambah kapasitas, .1, 4, 2, 4\nSelaras dengan budaya, .2, 2, 3, 5"},"Personel terampil jadi 0,1 dan budaya 0,2: Telco menjadi pilihan (4,0)"]],
r:v=>{const rs=rows(v.t),nm=v.names.split(',').map(x=>x.trim());if(!rs.length)return bad('Isi minimal satu kriteria');const k=rs[0].length-2;if(k<1)return bad('Tiap baris butuh kriteria, bobot, dan minimal satu skor');
 for(const r of rs)if(r.length!=k+2||r.slice(1).some(x=>!isFinite(+x)||x===''))return bad('Baris "'+r[0]+'" harus punya bobot dan '+k+' skor berupa angka');
 const W=sum(rs.map(r=>+r[1])),tot=Array.from({length:k},(_,j)=>sum(rs.map(r=>r[1]*r[2+j]))),best=tot.indexOf(Math.max(...tot)),nn=j=>nm[j]||'Opsi '+(j+1);
 const h=['Kriteria','Bobot',...tot.map((_,j)=>esc(nn(j)))],b=rs.map(r=>[esc(r[0]),q(+r[1]),...Array.from({length:k},(_,j)=>`${r[2+j]} (${q(r[1]*r[2+j])})`)]);b.push(['<b>Skor total</b>',q(W),...tot.map(x=>'<b>'+q(x)+'</b>')]);
 const sorted=[...tot].sort((a,b)=>b-a);return[
["Cek bobot","Jumlah bobot harus 1",q(W),Math.abs(W-1)<1e-6?"OK":"Belum 1, periksa bobot"],
{h:tbl(h,b,{hl:[b.length-1]})},
["Opsi terbaik","Skor total tertinggi",tot.map((x,j)=>`${esc(nn(j))} = ${q(x)}`).join('; '),esc(nn(best))],
["Selisih dengan peringkat kedua","Skor tertinggi - skor kedua","",q(sorted[0]-(sorted[1]??0))+(sorted.length>1&&sorted[0]-sorted[1]<.2?" (tipis, uji sensitivitas bobot)":"")]]},
n:"Jika selisih skor sangat kecil, ubah sedikit bobot atau skor dan lihat apakah pemenangnya berganti. Itu yang disebut uji sensitivitas."};

L.cpm={t:"Jalur kritis (CPM): forward dan backward pass",u:"3",c:"Satu baris per aktivitas: kode, durasi, pendahulu. Beberapa pendahulu dipisah garis miring (A/B). Tulis - jika tidak ada pendahulu.",
f:[["t","Kode, durasi, pendahulu","A,2,-\nB,3,-\nC,2,A\nD,4,A/B\nE,4,C\nF,3,C\nG,5,D/E\nH,2,F/G",'a']],
d:[["Milwaukee Paper (buku)",{t:"A,2,-\nB,3,-\nC,2,A\nD,4,A/B\nE,4,C\nF,3,C\nG,5,D/E\nH,2,F/G"},"Delapan aktivitas, proyek 15 minggu, jalur kritis A-C-E-G-H"],["Lini perakitan baru (contoh buatan)",{t:"A,3,-\nB,2,A\nC,4,A\nD,3,B\nE,5,C\nF,2,D/E"},"Jalur kritis A-C-E-F, aktivitas B dan D punya slack"]],
r:v=>{try{const acts=parseActs(rows(v.t),r=>r.length>=2&&isFinite(+r[1])&&r[0]?{id:r[0],d:+r[1],p:preds(r[2])}:null),c=cpmCalc(acts),b=c.ord.map(a=>[esc(a.id),q(a.d),a.p.join(', ')||'-',q(a.es),q(a.ef),q(a.ls),q(a.lf),q(a.sl),c.cr(a)?'Ya':'']);
 return[["Waktu penyelesaian proyek","Maksimum EF semua aktivitas","",q(c.T)+" satuan waktu"],
 {h:tbl(['Aktivitas','Durasi','Pendahulu','ES','EF','LS','LF','Slack','Kritis'],b,{hl:c.ord.map((a,i)=>c.cr(a)?i:-1).filter(i=>i>=0)})},
 ["Jalur kritis","Aktivitas dengan slack = 0, tersambung dari awal ke akhir","",c.paths.map(p=>p.join(' - ')).join('  dan  ')],{h:gantt(c.ord,c.T)}]}catch(e){return bad(e.message)}},
n:"Forward pass: ES = maksimum EF pendahulu, EF = ES + durasi. Backward pass: LF = minimum LS penerus, LS = LF - durasi. Slack = LS - ES."};

L.pert={t:"PERT: waktu harapan, varians, dan peluang selesai tepat waktu",u:"3",c:"Satu baris per aktivitas: kode, a (optimistic), m (most likely), b (pessimistic), pendahulu. Jalur kritis dicari otomatis dari waktu harapan.",
f:[["t","Kode, a, m, b, pendahulu","A,1,2,3,-\nB,2,3,4,-\nC,1,2,3,A\nD,2,4,6,A/B\nE,1,4,7,C\nF,1,2,9,C\nG,3,4,11,D/E\nH,1,2,3,F/G",'a'],["due","Tenggat proyek (satuan waktu sama)",16],["pt","Peluang target untuk mencari tenggat (%)",95,50,99,1]],
d:[["Milwaukee Paper (buku)",{t:"A,1,2,3,-\nB,2,3,4,-\nC,1,2,3,A\nD,2,4,6,A/B\nE,1,4,7,C\nF,1,2,9,C\nG,3,4,11,D/E\nH,1,2,3,F/G",due:16,pt:95},"Harapan 15 minggu, varians proyek 3,11, tenggat 16 minggu"],["Tenggat ketat 14 minggu",{t:"A,1,2,3,-\nB,2,3,4,-\nC,1,2,3,A\nD,2,4,6,A/B\nE,1,4,7,C\nF,1,2,9,C\nG,3,4,11,D/E\nH,1,2,3,F/G",due:14,pt:90},"Peluang jauh lebih kecil karena tenggat di bawah waktu harapan"]],
r:v=>{try{const acts=parseActs(rows(v.t),r=>r.length>=4&&[1,2,3].every(i=>isFinite(+r[i]))&&r[0]?{id:r[0],a:+r[1],m:+r[2],b:+r[3],p:preds(r[4])}:null);acts.forEach(a=>{a.d=(a.a+4*a.m+a.b)/6;a.v=((a.b-a.a)/6)**2});
 const c=cpmCalc(acts),vs=c.paths.map(p=>sum(p.map(i=>c.m[i].v))),bi=vs.indexOf(Math.max(...vs)),path=c.paths[bi],V=vs[bi],sd=Math.sqrt(V),z=(v.due-c.T)/sd,pt=v.pt/100,zt=zinv(pt);
 return[{h:tbl(['Aktivitas','a','m','b','t = (a+4m+b)/6','Varians'],acts.map(a=>[esc(a.id),q(a.a),q(a.m),q(a.b),q(a.d),q(a.v)]),{hl:acts.map((a,i)=>path.includes(a.id)?i:-1).filter(i=>i>=0)})},
 ["Jalur kritis (dari waktu harapan)","Jalur terpanjang memakai t","",path.join(' - ')+(c.paths.length>1?" (ada "+c.paths.length+" jalur kritis, dipakai yang varians terbesar)":"")],
 ["Waktu harapan proyek","Jumlah t di jalur kritis",path.map(i=>q(c.m[i].d)).join(' + '),q(c.T)],
 ["Varians proyek","Jumlah varians aktivitas kritis",path.map(i=>q(c.m[i].v)).join(' + '),q(V)],
 ["Standar deviasi proyek","sigma_p = akar(varians)",`akar(${q(V)})`,q(sd)],
 ["Z","(Tenggat - harapan) / sigma_p",`(${$(v.due)} - ${q(c.T)}) / ${q(sd)}`,q(z)],
 ["Peluang selesai paling lambat pada tenggat","Peluang normal kumulatif pada Z",`P(Z <= ${q(z)})`,pc(ncdf(z))],
 [`Tenggat untuk peluang ${v.pt}%`,"Tenggat = harapan + Z x sigma_p",`${q(c.T)} + ${q(zt)} x ${q(sd)}`,q(c.T+zt*sd)]]}catch(e){return bad(e.message)}},
n:"Buku membulatkan Z menjadi 0,57 sehingga peluang di tabel normal 71,57%; hitungan di sini memakai Z tanpa pembulatan (sekitar 71,5%)."};

L.crash={t:"Project crashing: mempercepat proyek dengan biaya terkecil",u:"3",c:"Satu baris per aktivitas: kode, waktu normal, waktu crash, biaya normal, biaya crash, pendahulu. Program mencari kombinasi crash termurah yang mencapai target.",
f:[["t","Kode, t normal, t crash, biaya normal, biaya crash, pendahulu","A,2,1,22000,22750,-\nB,3,1,30000,34000,-\nC,2,1,26000,27000,A\nD,4,3,48000,49000,A/B\nE,4,2,56000,58000,C\nF,3,2,30000,30500,C\nG,5,2,80000,84500,D/E\nH,2,1,16000,19000,F/G",'a'],["T","Target waktu penyelesaian",13]],
d:[["Milwaukee Paper, target 13 minggu",{t:"A,2,1,22000,22750,-\nB,3,1,30000,34000,-\nC,2,1,26000,27000,A\nD,4,3,48000,49000,A/B\nE,4,2,56000,58000,C\nF,3,2,30000,30500,C\nG,5,2,80000,84500,D/E\nH,2,1,16000,19000,F/G",T:13},"Normal 15 minggu, dipercepat 2 minggu"],["Target 14 minggu",{t:"A,2,1,22000,22750,-\nB,3,1,30000,34000,-\nC,2,1,26000,27000,A\nD,4,3,48000,49000,A/B\nE,4,2,56000,58000,C\nF,3,2,30000,30500,C\nG,5,2,80000,84500,D/E\nH,2,1,16000,19000,F/G",T:14},"Cukup crash aktivitas A (biaya per minggu terendah di jalur kritis)"]],
r:v=>{try{const acts=parseActs(rows(v.t),r=>r.length>=5&&[1,2,3,4].every(i=>isFinite(+r[i]))&&r[0]?{id:r[0],tn:Math.round(+r[1]),tc:Math.round(+r[2]),cn:+r[3],cc:+r[4],p:preds(r[5])}:null);
 acts.forEach(a=>{if(a.tc>a.tn)throw new Error('Waktu crash '+a.id+' lebih besar dari waktu normal');a.mx=a.tn-a.tc;a.cpw=a.mx?(a.cc-a.cn)/a.mx:Infinity});
 const dur=cr=>{const c=cpmCalc(acts.map((a,i)=>({id:a.id,d:a.tn-cr[i],p:a.p})));return c.T},n0=dur(acts.map(()=>0)),nmin=dur(acts.map(a=>a.mx)),tgt=v.T;
 const tb=tbl(['Aktivitas','t normal','t crash','Biaya normal','Biaya crash','Crash cost per periode'],acts.map(a=>[esc(a.id),a.tn,a.tc,$(a.cn),$(a.cc),a.mx?$(a.cpw):'tidak bisa']));
 const out=[{h:tb},["Waktu normal proyek","CPM dengan waktu normal","",q(n0)]];
 if(tgt>=n0)return[...out,["Hasil","","","Target sudah tercapai tanpa crash"]];
 if(tgt<nmin)return[...out,["Hasil","Waktu tercepat jika semua aktivitas di-crash penuh","",`${q(nmin)}; target ${q(tgt)} tidak mungkin dicapai`]];
 let comb=1;acts.forEach(a=>{comb*=a.mx+1});if(comb>400000)return bad('Terlalu banyak kombinasi crash untuk dihitung (kurangi jumlah aktivitas atau rentang crash)');
 let best=Infinity,bc=null;const cr=acts.map(()=>0),go=(i,cost)=>{if(cost>=best)return;if(i==acts.length){if(dur(cr)<=tgt+1e-9){best=cost;bc=[...cr]}return}for(let k=0;k<=acts[i].mx;k++){cr[i]=k;go(i+1,cost+k*(acts[i].mx?acts[i].cpw:0))}cr[i]=0};go(0,0);
 const picks=acts.map((a,i)=>[a,bc[i]]).filter(x=>x[1]>0),base=sum(acts.map(a=>a.cn));
 return[...out,["Crash termurah",`Cari semua kombinasi crash (biaya linear), pilih biaya tambahan terkecil`,picks.map(([a,k])=>`${esc(a.id)}: ${k} periode x ${$(a.cpw)}`).join('; '),"Tambahan biaya "+$(best)],
 ["Waktu proyek baru","CPM dengan waktu setelah crash","",q(dur(bc))],
 ["Total biaya proyek","Biaya normal total + tambahan crash",`${$(base)} + ${$(best)}`,$(base+best)]]}catch(e){return bad(e.message)}},
n:"Mempercepat satu aktivitas kritis belum tentu memendekkan proyek bila ada jalur kritis paralel. Program ini memeriksa semua kombinasi sehingga jalur paralel ikut diperhitungkan."};

L.forecast={t:"Peramalan: moving average, weighted, dan exponential smoothing",u:"4",c:"Masukkan data permintaan per periode. Tiga model dihitung bersamaan lalu dibandingkan lewat MAD, MSE, dan MAPE pada periode yang sama.",
f:[["a","Permintaan per periode (pisah koma)","10,12,13,16,19,23,26,30,28,18,16,14",'t'],["n","Periode moving average (n)",3,2,6,1],["w","Bobot WMA (periode terbaru dulu)","3,2,1",'t'],["al","Smoothing constant alpha",.2,.05,1,.05],["f0","Ramalan awal ES (kosong = data pertama)","",'t']],
d:[["Donna's Garden Supply (buku)",{a:"10,12,13,16,19,23,26,30,28,18,16,14",n:3,w:"3,2,1",al:.2,f0:""},"Penjualan shed 12 bulan; ramalan Januari berikutnya 16"],["Tren naik",{a:"100,105,112,120,128,135,145,150",n:3,w:"3,2,1",al:.5,f0:""},"Data naik terus: model rata-rata selalu tertinggal"],["Contoh buku ES",{a:"153",n:2,w:"2,1",al:.2,f0:"142"},"Ramalan Feb 142, aktual 153, alpha 0,2: ramalan Maret 144,2"]],
r:v=>{const A=nums(v.a);if(A.length<2&&v.f0==='')return bad('Isi minimal 2 data (atau 1 data dengan ramalan awal)');if(A.some(x=>!isFinite(x)))return bad('Data harus berupa angka');
 const N=A.length,n=Math.round(v.n),W=nums(v.w).filter(isFinite),kw=W.length,al=+v.al,F0=v.f0===''?A[0]:+v.f0;if(!kw||sum(W)==0)return bad('Isi bobot WMA, misalnya 3,2,1');
 const ma=[],wm=[],es=[];for(let t=0;t<=N;t++){ma[t]=t>=n?sum(A.slice(t-n,t))/n:null;wm[t]=t>=kw?sum(W.map((w,j)=>w*A[t-1-j]))/sum(W):null;es[t]=t==0?F0:es[t-1]+al*(A[t-1]-es[t-1])}
 const s0=Math.max(n,kw,1),ev=F=>{const e=[];for(let t=s0;t<N;t++)e.push([A[t],F[t]]);return e},ms=F=>{const e=ev(F);if(!e.length)return null;const m=e.length;return{mad:sum(e.map(x=>Math.abs(x[0]-x[1])))/m,mse:sum(e.map(x=>(x[0]-x[1])**2))/m,mape:sum(e.filter(x=>x[0]).map(x=>100*Math.abs(x[0]-x[1])/x[0]))/m}};
 const M=[ms(ma),ms(wm),ms(es)],nm=['Moving average','Weighted MA','Exp. smoothing'],F=[ma,wm,es],f=x=>x==null?'':q(x);
 const tb=Array.from({length:N+1},(_,t)=>[t+1+(t==N?' (ramalan)':''),t<N?q(A[t]):'',f(ma[t]),f(wm[t]),f(es[t])]);
 const sm=M[0]?tbl(['Model','Ramalan periode '+(N+1),'MAD','MSE','MAPE'],F.map((x,j)=>[nm[j],q(x[N]),q(M[j].mad),q(M[j].mse),q(M[j].mape)+'%'])):'';
 const bi=M[0]?M.map(m=>m.mad).indexOf(Math.min(...M.map(m=>m.mad))):-1;
 const ch=chart({title:"Permintaan aktual dan ramalan",xl:"Periode",yl:"Permintaan",xmin:1,series:[{n:"Aktual",pts:A.map((y,i)=>[i+1,y]),dots:true},{n:nm[0],pts:ma.map((y,i)=>[i+1,y]).filter(p=>p[1]!=null),c:'l1',pc:1},{n:nm[1],pts:wm.map((y,i)=>[i+1,y]).filter(p=>p[1]!=null),c:'l2',pc:2},{n:nm[2],pts:es.map((y,i)=>[i+1,y]),c:'l3',pc:3}]});
 return[["Moving average",`Rata-rata ${n} periode terakhir`,A.slice(N-n).map($).join(' + ')+` / ${n}`,N>=n?q(ma[N]):'data kurang'],
 ["Weighted moving average","jumlah (bobot x permintaan) / jumlah bobot",W.map((w,j)=>`${w} x ${$(A[N-1-j])}`).join(' + ')+` / ${$(sum(W))}`,N>=kw?q(wm[N]):'data kurang'],
 ["Exponential smoothing","F(t) = F(t-1) + alpha x (A(t-1) - F(t-1))",`F(${N+1}) = ${q(es[N-1])} + ${q(al)} x (${$(A[N-1])} - ${q(es[N-1])})`,q(es[N])],
 {h:tb.length<=40?tbl(['Periode','Aktual','Moving avg','Weighted MA','Exp. smoothing'],tb):''},
 ...(M[0]?[["Akurasi (periode "+(s0+1)+" sampai "+N+")","Semua model diuji pada periode yang sama","",'MAD terkecil: '+nm[bi]],{h:sm}]:[["Akurasi","","","Data belum cukup untuk membandingkan model"]]),{h:ch}]},
n:"Alpha tinggi membuat ramalan cepat mengikuti data baru, alpha rendah lebih halus. Pada data bertren, ketiga model cenderung tertinggal di bawah nilai aktual."};

L.track={t:"Tracking signal: apakah ramalan bias?",u:"4",c:"Satu baris per periode: permintaan aktual, ramalan. Tracking signal = kesalahan kumulatif / MAD.",
f:[["t","Aktual, ramalan","90,100\n95,100\n115,100\n100,110\n125,110\n140,110",'a'],["lim","Batas tracking signal (plus minus MAD)",4,1,6,.5]],
d:[["Carlson's Bakery (buku)",{t:"90,100\n95,100\n115,100\n100,110\n125,110\n140,110",lim:4},"Tracking signal akhir sekitar 2,5 MAD, masih dalam batas"],["Ramalan selalu terlalu rendah",{t:"100,90\n105,92\n110,95\n120,100\n125,100\n130,104",lim:4},"Kesalahan positif terus: sinyal melewati batas, tanda bias"]],
r:v=>{const rs=rows(v.t);if(!rs.length||rs.some(r=>r.length<2||isNaN(+r[0])||isNaN(+r[1])))return bad('Tiap baris: aktual, ramalan (angka)');let ce=0,ca=0;const b=[],pts=[];rs.forEach((r,i)=>{const e=r[0]-r[1];ce+=e;ca+=Math.abs(e);const mad=ca/(i+1),ts=ce/mad;pts.push([i+1,ts]);b.push([i+1,$(+r[0]),$(+r[1]),$(e),$(ce),$(Math.abs(e)),$(ca),q(mad),q(ts)])});
 const last=pts[pts.length-1][1],out=Math.abs(last)>v.lim;
 return[{h:tbl(['Periode','Aktual','Ramalan','Kesalahan','Kumulatif','Abs','Abs kum.','MAD','Tracking signal'],b)},
 ["MAD akhir","jumlah |kesalahan| / n",`${$(ca)} / ${rs.length}`,q(ca/rs.length)],
 ["Tracking signal akhir","Kesalahan kumulatif / MAD",`${$(ce)} / ${q(ca/rs.length)}`,q(last)+" MAD"+(out?" (di luar batas, ramalan bias)":" (dalam batas)")],
 {h:chart({title:"Tracking signal per periode",xl:"Periode",yl:"MAD",xmin:1,hl:[{y:+v.lim,l:"batas atas"},{y:-v.lim,l:"batas bawah"}],series:[{pts,dots:true,bad:p=>Math.abs(p[1])>v.lim}]})}]},
n:"Tanda kesalahan dipertahankan (plus atau minus). Jika sinyal terus menjauh ke satu arah, ramalan konsisten terlalu tinggi atau terlalu rendah."};

L.trend={t:"Trend projection dan regresi linear",u:"4",c:"Satu baris per titik data: x, y. Garis least squares, ramalan, standard error, dan korelasi dihitung sekaligus.",
f:[["t","x, y","1,74\n2,79\n3,80\n4,90\n5,105\n6,142\n7,122",'a'],["xf","Nilai x yang diramal",8]],
d:[["Permintaan listrik N.Y. Edison (buku)",{t:"1,74\n2,79\n3,80\n4,90\n5,105\n6,142\n7,122",xf:8},"7 tahun data, ramalan tahun ke-8 sekitar 141 megawatt"],["Iklan vs penjualan (data fiktif)",{t:"2,20\n3,24\n5,33\n6,35\n8,45\n9,47",xf:10},"x = biaya iklan, y = penjualan; korelasi sangat kuat"]],
r:v=>{const rs=rows(v.t);if(rs.length<3||rs.some(r=>r.length<2||isNaN(+r[0])||isNaN(+r[1])))return bad('Minimal 3 baris x, y berupa angka');const X=rs.map(r=>+r[0]),Y=rs.map(r=>+r[1]),n=X.length,sx=sum(X),sy=sum(Y),sxx=sum(X.map(x=>x*x)),sxy=sum(X.map((x,i)=>x*Y[i])),syy=sum(Y.map(y=>y*y)),mx=sx/n,my=sy/n,den=sxx-n*mx*mx;if(!den)return bad('Nilai x tidak boleh semuanya sama');
 const b=(sxy-n*mx*my)/den,a=my-b*mx,yh=x=>a+b*x,se=n>2?Math.sqrt(sum(X.map((x,i)=>(Y[i]-yh(x))**2))/(n-2)):NaN,r=(n*sxy-sx*sy)/Math.sqrt((n*sxx-sx*sx)*(n*syy-sy*sy)),xs=[Math.min(...X,v.xf),Math.max(...X,v.xf)];
 return[["Jumlah","n, jumlah x, jumlah y, jumlah x^2, jumlah xy",`${n}, ${$(sx)}, ${$(sy)}, ${$(sxx)}, ${$(sxy)}`,""],
 ["Rata-rata","x-bar = jumlah x / n; y-bar = jumlah y / n",`${q(mx)}; ${q(my)}`,""],
 ["Kemiringan b","b = (jumlah xy - n x-bar y-bar) / (jumlah x^2 - n x-bar^2)",`(${$(sxy)} - ${n} x ${q(mx)} x ${q(my)}) / (${$(sxx)} - ${n} x ${q(mx*mx)})`,q(b)],
 ["Titik potong a","a = y-bar - b x-bar",`${q(my)} - ${q(b)} x ${q(mx)}`,q(a)],
 ["Persamaan tren","y-hat = a + b x","",`y = ${q(a)} + ${q(b)}x`],
 ["Ramalan","Masukkan x ke persamaan",`${q(a)} + ${q(b)} x ${$(v.xf)}`,q(yh(v.xf))],
 ["Standard error of the estimate","akar [ jumlah (y - y-hat)^2 / (n - 2) ]","",q(se)],
 ["Koefisien korelasi r","(n jumlah xy - jumlah x jumlah y) / akar{...}","",q(r)],
 ["Koefisien determinasi r^2","r kuadrat",`${q(r)}^2`,q(r*r)+" ("+pc(r*r)+" variasi y dijelaskan x)"],
 {h:chart({title:"Data dan garis regresi",xl:"x",yl:"y",series:[{n:"Data",pts:X.map((x,i)=>[x,Y[i]]),nl:true},{n:"Garis tren",pts:xs.map(x=>[x,yh(x)]),c:'l1',pc:1}]})}]},
n:"Buku memakai y-bar yang dibulatkan sehingga a = 56,70; hitungan presisi memberi 56,71. Selisih kecil itu hanya akibat pembulatan."};

L.season={t:"Indeks musiman dan ramalan musiman",u:"4",c:"Satu baris per periode: nama, lalu permintaan tiap tahun. Indeks = rata-rata periode / rata-rata seluruh periode.",
f:[["t","Periode, tahun 1, tahun 2, ...","Jan,80,85,105\nFeb,70,85,85\nMar,80,93,82\nApr,90,95,115\nMei,113,125,131\nJun,110,115,120\nJul,100,102,113\nAgu,88,102,110\nSep,85,90,95\nOkt,77,78,85\nNov,75,82,83\nDes,82,78,80",'a'],["ad","Perkiraan permintaan tahun depan",1200]],
d:[["Laptop Sony Des Moines (buku)",{t:"Jan,80,85,105\nFeb,70,85,85\nMar,80,93,82\nApr,90,95,115\nMei,113,125,131\nJun,110,115,120\nJul,100,102,113\nAgu,88,102,110\nSep,85,90,95\nOkt,77,78,85\nNov,75,82,83\nDes,82,78,80",ad:1200},"Rata-rata bulanan 94, indeks Mei tertinggi 1,309"],["Kuartalan (data fiktif)",{t:"Kuartal 1,40,44\nKuartal 2,60,66\nKuartal 3,80,84\nKuartal 4,100,106",ad:360},"Puncak di kuartal 4"]],
r:v=>{const rs=rows(v.t);if(rs.length<2||rs.some(r=>r.length<2||r.slice(1).some(x=>isNaN(+x)||x==='')))return bad('Tiap baris: nama periode lalu angka permintaan');const av=rs.map(r=>sum(r.slice(1).map(Number))/(r.length-1)),all=sum(av)/av.length,idx=av.map(x=>x/all);
 return[{h:tbl(['Periode','Rata-rata permintaan','Indeks musiman','Ramalan tahun depan'],rs.map((r,i)=>[esc(r[0]),q(av[i]),q(idx[i]),q(v.ad/rs.length*idx[i])]),{hl:[idx.indexOf(Math.max(...idx))]})},
 ["Rata-rata seluruh periode","jumlah rata-rata periode / jumlah periode",`${q(sum(av))} / ${rs.length}`,q(all)],
 ["Ramalan per periode","Permintaan tahunan / jumlah periode x indeks",`${$(v.ad)} / ${rs.length} x indeks`,"lihat tabel"],
 {h:chart({title:"Indeks musiman per periode",xl:"Urutan periode",yl:"Indeks",xmin:1,xmax:rs.length,hl:[{y:1,c:'cl',l:"rata-rata = 1"}],series:[{pts:idx.map((y,i)=>[i+1,y]),dots:true}]})}]},
n:"Baris tertinggi (biru muda di tabel) adalah periode paling ramai. Indeks di atas 1 berarti di atas rata-rata."};

L.emv={t:"Expected monetary value dan decision tree",u:"5",c:"Satu baris per alternatif: nama, lalu payoff pada tiap keadaan alam. Isi peluang tiap keadaan (jumlah = 1).",
f:[["t","Alternatif, payoff keadaan 1, payoff keadaan 2, ...","Pabrik besar,100000,-90000\nPabrik sedang,60000,-10000\nPabrik kecil,40000,-5000\nTidak berbuat apa-apa,0,0",'a'],["p","Peluang tiap keadaan (pisah koma)","0.4,0.6",'t']],
d:[["Southern Hospital Supplies (buku)",{t:"Pabrik besar,100000,-90000\nPabrik sedang,60000,-10000\nPabrik kecil,40000,-5000\nTidak berbuat apa-apa,0,0",p:"0.4,0.6"},"Pasar baik 0,4: pabrik sedang EMV 18.000 terbaik"],["Latihan buku: rugi sedang -20.000",{t:"Pabrik besar,100000,-90000\nPabrik sedang,60000,-20000\nPabrik kecil,40000,-5000\nTidak berbuat apa-apa,0,0",p:"0.4,0.6"},"Keputusan berganti ke pabrik kecil (13.000)"],["Silicon, Inc. (decision tree Bab 5)",{t:"Beli sistem CAD,1000000,-20000\nLatih insinyur baru,875000,25000\nTidak mengembangkan,0,0",p:"0.4,0.6"},"CAD EMV 388.000 mengalahkan 365.000"]],
r:v=>{const rs=rows(v.t),P=nums(v.p);if(!rs.length)return bad('Isi minimal satu alternatif');if(P.some(x=>!isFinite(x)))return bad('Peluang harus angka dengan titik desimal, misalnya 0.4,0.6');
 for(const r of rs)if(r.length!=P.length+1||r.slice(1).some(x=>x===''||isNaN(+x)))return bad('Baris "'+r[0]+'" harus punya '+P.length+' payoff berupa angka');
 const em=rs.map(r=>sum(P.map((p,j)=>p*r[1+j]))),bi=em.indexOf(Math.max(...em)),T=sum(P);
 return[["Cek peluang","Jumlah peluang harus 1",q(T),Math.abs(T-1)<1e-6?"OK":"Belum 1"],
 ...rs.map((r,i)=>[`EMV ${esc(r[0])}`,"jumlah (peluang x payoff)",P.map((p,j)=>`(${q(p)})(${$(+r[1+j])})`).join(' + '),$(em[i])]),
 ["Keputusan","Pilih EMV tertinggi","",esc(rs[bi][0])+" ("+$(em[bi])+")"]]},
n:"EMV cocok untuk keputusan yang berulang. Ubah satu payoff atau peluang dan lihat apakah pilihan terbaik berganti."};

L.rr={t:"Design for disassembly: revenue retrieval",u:"s5",c:"Bandingkan dua desain produk. Satu baris per komponen: nama, pendapatan jual kembali, pendapatan daur ulang, biaya pemrosesan, biaya pembuangan (dolar per unit).",
f:[["na","Nama desain A","Harmonizer",'t'],["ta","Komponen desain A","Printed circuit board,5.93,1.54,3.46,0\nLaminate back,0,0,4.53,1.74\nCoil,8.56,5.65,6.22,0\nProcessor,9.17,2.65,3.12,0\nFrame,0,0,2.02,1.23\nAluminum case,11.83,2.10,2.98,0",'a'],["nb","Nama desain B","Rocker",'t'],["tb","Komponen desain B","Printed circuit board,7.88,3.54,2.12,0\nCoil,6.67,4.56,3.32,0\nFrame,0,0,4.87,1.97\nProcessor,8.45,4.65,3.43,0\nPlastic case,0,0,4.65,3.98",'a']],
d:[["Harmonizer vs Rocker (buku)",{na:"Harmonizer",ta:"Printed circuit board,5.93,1.54,3.46,0\nLaminate back,0,0,4.53,1.74\nCoil,8.56,5.65,6.22,0\nProcessor,9.17,2.65,3.12,0\nFrame,0,0,2.02,1.23\nAluminum case,11.83,2.10,2.98,0",nb:"Rocker",tb:"Printed circuit board,7.88,3.54,2.12,0\nCoil,6.67,4.56,3.32,0\nFrame,0,0,4.87,1.97\nProcessor,8.45,4.65,3.43,0\nPlastic case,0,0,4.65,3.98"},"Harmonizer 22,13 mengalahkan Rocker 11,41"],["Dua desain kecil (fiktif)",{na:"Desain lama",ta:"Casing,2,1,3,2\nMotor,6,2,2,0",nb:"Desain modular",tb:"Casing,2,2,1,0\nMotor,6,2,1,0"},"Desain modular lebih mudah dibongkar"]],
r:v=>{const calc=t=>{const rs=rows(t);if(!rs.length||rs.some(r=>r.length<5||r.slice(1,5).some(x=>isNaN(+x)||x==='')))return null;const c=i=>sum(rs.map(r=>+r[i]));return{s:c(1),c:c(2),p:c(3),d:c(4)}},A=calc(v.ta),B=calc(v.tb);if(!A||!B)return bad('Tiap baris komponen: nama, jual kembali, daur ulang, pemrosesan, pembuangan');
 const ra=A.s+A.c-A.p-A.d,rb=B.s+B.c-B.p-B.d,line=(n,x,r)=>["Revenue retrieval "+esc(n),"Jual kembali + daur ulang - pemrosesan - pembuangan",`${$(x.s)} + ${$(x.c)} - ${$(x.p)} - ${$(x.d)}`,"$"+$(r)];
 return[{h:tbl(['Desain','Jual kembali','Daur ulang','Pemrosesan','Pembuangan'],[[esc(v.na),$(A.s),$(A.c),$(A.p),$(A.d)],[esc(v.nb),$(B.s),$(B.c),$(B.p),$(B.d)]])},line(v.na,A,ra),line(v.nb,B,rb),["Desain lebih baik","Revenue retrieval lebih besar","",esc(ra>=rb?v.na:v.nb)+" (selisih $"+$(Math.abs(ra-rb))+")"]]},
n:"Persamaan S5-1. Desain dengan revenue retrieval lebih tinggi lebih menguntungkan dari sisi daur ulang dan pembongkaran."};

L.lcc={t:"Life cycle cost kendaraan dan titik silang",u:"s5",c:"Satuan seperti buku: dolar AS, mil, galon. Bandingkan dua kendaraan dari harga beli, bahan bakar, dan biaya operasi selama umur pakai.",
f:[["pa","Harga kendaraan A ($)",28000],["ma","Efisiensi A (mil per galon)",24],["oa","Biaya operasi A ($ per mil)",.2],["pb","Harga kendaraan B ($)",32000],["mb","Efisiensi B (mil per galon)",37],["ob","Biaya operasi B ($ per mil)",.22],["mi","Jarak per tahun (mil)",22000],["yr","Umur pakai (tahun)",8],["gp","Harga bahan bakar ($ per galon)",4.25]],
d:[["Ford TriVan vs Honda CityVan (buku)",{pa:28000,ma:24,oa:.2,pb:32000,mb:37,ob:.22,mi:22000,yr:8,gp:4.25},"Honda lebih mahal di awal tetapi lebih hemat"],["Bensin mahal",{pa:28000,ma:24,oa:.2,pb:32000,mb:37,ob:.22,mi:22000,yr:8,gp:7},"Hybrid makin unggul"],["Jarak pendek",{pa:28000,ma:24,oa:.2,pb:32000,mb:37,ob:.22,mi:6000,yr:5,gp:4.25},"Umur singkat: kendaraan murah menang"]],
r:v=>{const fa=v.mi/v.ma*v.gp*v.yr,fb=v.mi/v.mb*v.gp*v.yr,xa=v.mi*v.oa*v.yr,xb=v.mi*v.ob*v.yr,ta=v.pa+fa+xa,tb=v.pb+fb+xb,ca=v.gp/v.ma+v.oa,cb=v.gp/v.mb+v.ob,M=(v.pb-v.pa)/(ca-cb);
 return[["Biaya bahan bakar A","(mil per tahun / mpg) x harga x tahun",`(${$(v.mi)} / ${$(v.ma)}) x ${$(v.gp)} x ${$(v.yr)}`,"$"+$(fa)],
 ["Biaya operasi A","mil per tahun x biaya per mil x tahun",`${$(v.mi)} x ${$(v.oa)} x ${$(v.yr)}`,"$"+$(xa)],
 ["Total life cycle cost A","Harga + bahan bakar + operasi",`${$(v.pa)} + ${$(fa)} + ${$(xa)}`,"$"+$(ta)],
 ["Biaya bahan bakar B","(mil per tahun / mpg) x harga x tahun",`(${$(v.mi)} / ${$(v.mb)}) x ${$(v.gp)} x ${$(v.yr)}`,"$"+$(fb)],
 ["Biaya operasi B","mil per tahun x biaya per mil x tahun",`${$(v.mi)} x ${$(v.ob)} x ${$(v.yr)}`,"$"+$(xb)],
 ["Total life cycle cost B","Harga + bahan bakar + operasi",`${$(v.pb)} + ${$(fb)} + ${$(xb)}`,"$"+$(tb)],
 ["Pilihan berdasarkan life cycle cost","Biaya total lebih kecil","",ta<=tb?"Kendaraan A":"Kendaraan B"],
 ["Titik silang (mil)","M = (harga B - harga A) / (biaya per mil A - biaya per mil B)",`(${$(v.pb)} - ${$(v.pa)}) / (${q(ca)} - ${q(cb)})`,isFinite(M)&&M>0?$(M)+" mil":"tidak ada titik silang positif"],
 ["Titik silang (tahun)","M / mil per tahun",`${$(M)} / ${$(v.mi)}`,isFinite(M)&&M>0?q(M/v.mi)+" tahun":"-"]]},
n:"Buku membulatkan biaya per mil menjadi 0,3770 dan 0,3349 sehingga titik silang 95.012 mil; hitungan presisi memberi sekitar 94.745 mil."};

L.pareto={t:"Pareto chart: temukan 'few vital' penyebab",u:"6",c:"Satu baris per kategori masalah: kategori, jumlah kejadian. Hasilnya diurutkan dari yang terbanyak dengan persentase kumulatif.",
f:[["t","Kategori, jumlah","Goresan permukaan,42\nRetak,18\nUkuran meleset,11\nCat luntur,7\nLas bocor,5\nLain-lain,3",'a']],
d:[["Cacat lini cat (fiktif)",{t:"Goresan permukaan,42\nRetak,18\nUkuran meleset,11\nCat luntur,7\nLas bocor,5\nLain-lain,3"},"Tiga penyebab teratas menyumbang lebih dari 80%"],["Keluhan layanan (fiktif)",{t:"Menunggu lama,120\nSalah pesanan,45\nTagihan keliru,20\nKebersihan,10\nLain-lain,5"},"Satu penyebab mendominasi"]],
r:v=>{const rs=rows(v.t);if(rs.length<2||rs.some(r=>r.length<2||isNaN(+r[1])||+r[1]<0))return bad('Tiap baris: kategori, jumlah (angka tidak negatif)');const s=rs.map(r=>[r[0],+r[1]]).sort((a,b)=>b[1]-a[1]),T=sum(s.map(x=>x[1]));let c=0,idx=-1;const cum=s.map((x,i)=>{c+=x[1];if(idx<0&&c/T>=.8)idx=i;return c/T});
 const W=640,H=300,m={l:56,r:50,t:14,b:60},bw=(W-m.l-m.r)/s.length,mx=s[0][1],sy=y=>H-m.b-y/mx*(H-m.t-m.b),sp=p=>H-m.b-p*(H-m.t-m.b);let g=`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Pareto chart">`;
 [0,.25,.5,.75,1].forEach(p=>{g+=`<line class="gd" x1="${m.l}" x2="${W-m.r}" y1="${sp(p)}" y2="${sp(p)}"/><text x="${W-m.r+6}" y="${sp(p)+4}">${p*100}%</text><text x="${m.l-8}" y="${sp(p)+4}" text-anchor="end">${$(p*mx)}</text>`});
 s.forEach((x,i)=>{g+=`<rect class="bar0" x="${m.l+i*bw+6}" y="${sy(x[1])}" width="${bw-12}" height="${H-m.b-sy(x[1])}"/><text x="${m.l+i*bw+bw/2}" y="${H-m.b+16}" text-anchor="middle">${esc(x[0].length>11?x[0].slice(0,10)+'.':x[0])}</text>`});
 g+=`<polyline class="l1" points="${cum.map((p,i)=>(m.l+i*bw+bw/2)+','+sp(p)).join(' ')}"/>`+cum.map((p,i)=>`<circle class="p1" cx="${m.l+i*bw+bw/2}" cy="${sp(p)}" r="4"/>`).join('')+`<line class="ax" x1="${m.l}" x2="${W-m.r}" y1="${H-m.b}" y2="${H-m.b}"/></svg><div class="leg"><span><i style="border-color:#1a64c8"></i>Jumlah kejadian</span><span><i style="border-color:#0a2540"></i>Persen kumulatif</span></div>`;
 return[["Total kejadian","Jumlah semua kategori",s.map(x=>$(x[1])).join(' + '),$(T)],
 {h:tbl(['Kategori','Jumlah','Persen','Kumulatif'],s.map((x,i)=>[esc(x[0]),$(x[1]),pc(x[1]/T),pc(cum[i])]),{hl:Array.from({length:idx+1},(_,i)=>i)})},
 ["Vital few","Kategori sampai kumulatif mencapai 80%",s.slice(0,idx+1).map(x=>esc(x[0])).join(', '),(idx+1)+" dari "+s.length+" kategori = "+pc(cum[idx])+" masalah"],{h:g}]},
n:"Aturan 80/20 hanyalah patokan. Fokuskan perbaikan pada baris yang disorot lebih dulu."};

const FA={2:[1.880,3.268,0],3:[1.023,2.574,0],4:[.729,2.282,0],5:[.577,2.115,0],6:[.483,2.004,0],7:[.419,1.924,.076],8:[.373,1.864,.136],9:[.337,1.816,.184],10:[.308,1.777,.223],12:[.266,1.716,.284]};
const fatbl=n=>tbl(['n','A2','D4','D3'],Object.keys(FA).map(k=>[k,...FA[k].map(x=>String(x).replace('.',','))]),{hl:Object.keys(FA).map((k,i)=>+k==n?i:-1).filter(i=>i>=0)});
L.xr={t:"Batas x-bar chart dan R-chart dari ringkasan",u:"s6",c:"Jika rata-rata umum (x-bar-bar) dan rata-rata rentang (R-bar) sudah diketahui, batas kendali dihitung dengan faktor tabel A2, D3, D4.",
f:[["xb","Rata-rata umum x-bar-bar",12.05],["rb","Rata-rata rentang R-bar",.25],["n","Ukuran sampel n",5,2,10,1]],
d:[["Super Cola (buku)",{xb:12.05,rb:.25,n:5},"Botol 12 ons; sampel 5 botol"],["Mesin bubut (fiktif)",{xb:50,rb:2.4,n:4},"Diameter poros 50 mm, sampel 4"]],
r:v=>{const n=Math.round(v.n),f=FA[n];return[["Faktor tabel S6.1",`n = ${n}`,`A2 = ${q(f[0])}; D4 = ${q(f[1])}; D3 = ${q(f[2])}`,""],
 ["UCL x-bar chart","x-bar-bar + A2 x R-bar",`${$(v.xb)} + ${q(f[0])} x ${$(v.rb)}`,q(v.xb+f[0]*v.rb)],
 ["LCL x-bar chart","x-bar-bar - A2 x R-bar",`${$(v.xb)} - ${q(f[0])} x ${$(v.rb)}`,q(v.xb-f[0]*v.rb)],
 ["UCL R-chart","D4 x R-bar",`${q(f[1])} x ${$(v.rb)}`,q(f[1]*v.rb)],
 ["LCL R-chart","D3 x R-bar",`${q(f[2])} x ${$(v.rb)}`,q(f[2]*v.rb)],{h:fatbl(n)}]},
n:"Faktor untuk n = 2 sampai 10 (tabel buku memuat juga n = 12). Batas 3 sigma memuat 99,73% variasi alami."};

L.xrdata={t:"x-bar chart dan R-chart dari data sampel",u:"s6",c:"Satu baris per sampel, pengukuran dipisah koma. Semua sampel harus berukuran sama (n = 2 sampai 10).",
f:[["t","Pengukuran tiap sampel","12.01,11.98,12.03,12.00,11.99\n12.04,12.01,11.97,12.02,12.00\n11.99,12.03,12.01,11.98,12.02\n12.00,12.02,11.96,12.01,11.99\n12.03,12.00,12.05,12.02,12.01\n11.98,11.99,12.01,12.00,11.97\n12.02,12.04,12.03,12.01,12.05\n12.00,11.98,12.02,12.01,11.99\n12.06,12.08,12.05,12.09,12.07\n12.01,12.00,11.99,12.02,12.00",'a']],
d:[["Ada sampel keluar batas (fiktif)",{t:"12.01,11.98,12.03,12.00,11.99\n12.04,12.01,11.97,12.02,12.00\n11.99,12.03,12.01,11.98,12.02\n12.00,12.02,11.96,12.01,11.99\n12.03,12.00,12.05,12.02,12.01\n11.98,11.99,12.01,12.00,11.97\n12.02,12.04,12.03,12.01,12.05\n12.00,11.98,12.02,12.01,11.99\n12.06,12.08,12.05,12.09,12.07\n12.01,12.00,11.99,12.02,12.00"},"Sampel 9 bergeser naik: x-bar chart memberi sinyal"],["Proses stabil (fiktif)",{t:"12.01,11.98,12.03,12.00,11.99\n12.04,12.01,11.97,12.02,12.00\n11.99,12.03,12.01,11.98,12.02\n12.00,12.02,11.96,12.01,11.99\n12.03,12.00,12.05,12.02,12.01\n11.98,11.99,12.01,12.00,11.97\n12.02,12.04,12.03,12.01,12.05\n12.00,11.98,12.02,12.01,11.99\n12.01,12.00,11.99,12.02,12.00"},"Semua titik di dalam batas"]],
r:v=>{const rs=rows(v.t).map(r=>r.map(Number));if(rs.length<3)return bad('Minimal 3 sampel');const n=rs[0].length;if(n<2||n>10||!FA[n])return bad('Ukuran sampel harus 2 sampai 10');if(rs.some(r=>r.length!=n||r.some(isNaN)))return bad('Semua sampel harus punya '+n+' pengukuran berupa angka');
 const mu=rs.map(r=>sum(r)/n),rg=rs.map(r=>Math.max(...r)-Math.min(...r)),xb=sum(mu)/rs.length,rb=sum(rg)/rs.length,f=FA[n],ux=xb+f[0]*rb,lx=xb-f[0]*rb,ur=f[1]*rb,lr=f[2]*rb,ox=mu.map((x,i)=>x>ux||x<lx?i+1:0).filter(Boolean),or=rg.map((x,i)=>x>ur||x<lr?i+1:0).filter(Boolean);
 const pts=a=>a.map((y,i)=>[i+1,y]);
 return[{h:tbl(['Sampel','Rata-rata','Rentang','Status'],rs.map((r,i)=>[i+1,q(mu[i]),q(rg[i]),(mu[i]>ux||mu[i]<lx?'<span class="chip r">x-bar di luar</span> ':'')+(rg[i]>ur||rg[i]<lr?'<span class="chip r">R di luar</span>':'')||'<span class="chip g">normal</span>']))},
 ["Rata-rata umum dan rata-rata rentang","x-bar-bar = rata-rata dari rata-rata; R-bar = rata-rata rentang",`${q(xb)}; ${q(rb)}`,`n = ${n}, A2 = ${q(f[0])}, D4 = ${q(f[1])}, D3 = ${q(f[2])}`],
 ["Batas x-bar chart","x-bar-bar plus minus A2 x R-bar",`${q(xb)} plus minus ${q(f[0])} x ${q(rb)}`,`UCL ${q(ux)}; LCL ${q(lx)}`],
 ["Batas R-chart","UCL = D4 x R-bar; LCL = D3 x R-bar",`${q(f[1])} x ${q(rb)}; ${q(f[2])} x ${q(rb)}`,`UCL ${q(ur)}; LCL ${q(lr)}`],
 ["Kesimpulan","Titik di luar batas menandakan assignable cause","",(ox.length||or.length)?`Selidiki sampel: ${[...ox.map(i=>i+' (x-bar)'),...or.map(i=>i+' (R)')].join(', ')}`:"Proses dalam kendali statistik"],
 {h:chart({title:"x-bar chart",xl:"Sampel",yl:"Rata-rata",xmin:1,hl:[{y:ux,l:"UCL"},{y:xb,c:'cl',l:"x-bar-bar"},{y:lx,l:"LCL"}],series:[{pts:pts(mu),dots:true,bad:p=>p[1]>ux||p[1]<lx}]})},
 {h:chart({title:"R-chart",xl:"Sampel",yl:"Rentang",xmin:1,ymin:0,hl:[{y:ur,l:"UCL"},{y:rb,c:'cl',l:"R-bar"},{y:lr,l:"LCL"}],series:[{pts:pts(rg),dots:true,bad:p=>p[1]>ur||p[1]<lr}]})}]},
n:"Titik merah adalah sinyal. Setelah sebab ditemukan dan diperbaiki, buang sampel itu lalu hitung ulang batas dari data baru (langkah 5 buku)."};

L.pchart={t:"p-chart: batas untuk persen cacat",u:"s6",c:"Atribut baik atau cacat. Hitung proporsi cacat rata-rata lalu batas kendali.",
f:[["dt","Total cacat dari semua sampel",80],["n","Ukuran tiap sampel",100],["k","Jumlah sampel",20],["z","Z (3 = 99,73%)",3,1,4,.05]],
d:[["Mosier Data Systems (buku)",{dt:80,n:100,k:20,z:3},"20 operator, 100 catatan tiap operator, 80 salah"],["Pabrik baut (fiktif)",{dt:156,n:200,k:25,z:3},"LCL negatif dibulatkan ke nol"]],
r:v=>{const p=v.dt/(v.n*v.k),s=Math.sqrt(p*(1-p)/v.n),u=p+v.z*s,l=p-v.z*s;return[
["Proporsi cacat rata-rata","p-bar = total cacat / (n x jumlah sampel)",`${$(v.dt)} / (${$(v.n)} x ${$(v.k)})`,q(p)],
["Sigma p","akar [ p-bar (1 - p-bar) / n ]",`akar [ ${q(p)} x ${q(1-p)} / ${$(v.n)} ]`,q(s)],
["UCL","p-bar + z x sigma_p",`${q(p)} + ${$(v.z)} x ${q(s)}`,q(u)+" ("+pc(u)+")"],
["LCL","p-bar - z x sigma_p (minimal 0)",`${q(p)} - ${$(v.z)} x ${q(s)}`,q(Math.max(0,l))+(l<0?" (negatif dibulatkan ke 0)":"")]]},
n:"Buku membulatkan sigma p menjadi 0,02 pada contoh Mosier sehingga UCL = 0,10; hitungan presisi memberi 0,0988."};

L.cchart={t:"c-chart: batas untuk jumlah cacat per unit",u:"s6",c:"Masukkan jumlah cacat (misalnya keluhan per hari). Batas kendali 3 sigma memakai distribusi Poisson.",
f:[["t","Jumlah cacat tiap unit (pisah koma)","3,0,8,9,6,7,4,9,8",'t']],
d:[["Red Top Cab (buku)",{t:"3,0,8,9,6,7,4,9,8"},"Keluhan penumpang 9 hari, rata-rata 6"],["Latihan buku: 3 hari tambahan",{t:"3,0,8,9,6,7,4,9,8,10,12,8"},"UCL naik menjadi sekitar 14,94"]],
r:v=>{const c=nums(v.t);if(c.length<2||c.some(x=>!isFinite(x)||x<0))return bad('Isi minimal 2 angka tidak negatif');const cb=sum(c)/c.length,s=Math.sqrt(cb),u=cb+3*s,l=Math.max(0,cb-3*s);
 return[["Rata-rata cacat","c-bar = jumlah cacat / jumlah unit",`${$(sum(c))} / ${c.length}`,q(cb)],
 ["UCL","c-bar + 3 akar(c-bar)",`${q(cb)} + 3 x ${q(s)}`,q(u)],
 ["LCL","c-bar - 3 akar(c-bar) (minimal 0)",`${q(cb)} - 3 x ${q(s)}`,q(l)+(cb-3*s<0?" (negatif dibulatkan ke 0)":"")],
 ["Titik di luar batas","Nilai > UCL atau < LCL","",c.map((x,i)=>x>u||x<l?'unit '+(i+1)+' = '+x:'').filter(Boolean).join('; ')||"tidak ada"],
 {h:chart({title:"c-chart",xl:"Unit",yl:"Jumlah cacat",xmin:1,ymin:0,hl:[{y:u,l:"UCL"},{y:cb,c:'cl',l:"c-bar"},{y:l,l:"LCL"}],series:[{pts:c.map((y,i)=>[i+1,y]),dots:true,bad:p=>p[1]>u||p[1]<l}]})}]},
n:"Pada Poisson, varians sama dengan rata-rata, sehingga sigma = akar(c-bar)."};

L.cpk={t:"Process capability: Cp dan Cpk",u:"s6",c:"Apakah proses mampu memenuhi batas spesifikasi? Cp melihat sebaran, Cpk melihat sebaran dan pemusatan.",
f:[["usl","Batas spesifikasi atas (USL)",213],["lsl","Batas spesifikasi bawah (LSL)",207],["mu","Rata-rata proses",210],["sg","Standar deviasi proses",.516]],
d:[["Klaim asuransi GE (buku)",{usl:213,lsl:207,mu:210,sg:.516},"Cp = 1,94, sangat mampu"],["Mesin insole (buku)",{usl:.251,lsl:.249,mu:.25,sg:.0005},"Cpk 0,67: belum mampu, jauh dari target"],["Rata-rata bergeser (fiktif)",{usl:213,lsl:207,mu:211.5,sg:.5},"Cp = 2,0 tetapi Cpk = 1,0 karena tidak di tengah"]],
r:v=>{const cp=(v.usl-v.lsl)/(6*v.sg),a=(v.usl-v.mu)/(3*v.sg),b=(v.mu-v.lsl)/(3*v.sg),cpk=Math.min(a,b),out=ncq((v.usl-v.mu)/v.sg)+ncq((v.mu-v.lsl)/v.sg);
 return[["Cp","(USL - LSL) / (6 x sigma)",`(${q(v.usl)} - ${q(v.lsl)}) / (6 x ${q(v.sg)})`,q(cp)],
 ["Cpk sisi atas","(USL - rata-rata) / (3 x sigma)",`(${q(v.usl)} - ${q(v.mu)}) / (3 x ${q(v.sg)})`,q(a)],
 ["Cpk sisi bawah","(rata-rata - LSL) / (3 x sigma)",`(${q(v.mu)} - ${q(v.lsl)}) / (3 x ${q(v.sg)})`,q(b)],
 ["Cpk","Minimum kedua sisi","",q(cpk)],
 ["Penilaian","Cp atau Cpk >= 1 mampu; 1,33 target umum; 2,0 Six Sigma","",cpk>=2?"Setara Six Sigma":cpk>=1.33?"Mampu (target 4 sigma tercapai)":cpk>=1?"Mampu tipis":"Belum mampu: banyak keluaran di luar spesifikasi"],
 ["Perkiraan di luar spesifikasi","Peluang normal di luar USL dan LSL","dengan asumsi distribusi normal",$(out*1e6)+" per sejuta ("+(out*100<.01?"< 0,01":$(out*100))+"%)"]]},
n:"Cp tidak peduli letak rata-rata. Jika Cp jauh lebih besar dari Cpk, geser rata-rata proses ke tengah spesifikasi lebih dulu."};

L.oc={t:"Acceptance sampling: kurva OC dan AOQ",u:"s6",c:"Rencana sampling: periksa n unit dari lot N, terima lot jika cacat paling banyak c. Peluang diterima (Pa) memakai distribusi binomial.",
f:[["N","Ukuran lot (N)",1000],["n","Ukuran sampel (n)",50,5,200,1],["c","Angka penerimaan (c)",1,0,10,1],["pd","Persen cacat lot (Pd)",2,0,20,.5],["aql","AQL (%)",1],["ltpd","LTPD (%)",8]],
d:[["Rencana n = 50, c = 1",{N:1000,n:50,c:1,pd:2,aql:1,ltpd:8},"Cukup longgar"],["Rencana lebih ketat n = 100, c = 1",{N:1000,n:100,c:1,pd:2,aql:1,ltpd:8},"Sampel lebih besar: kurva lebih curam"]],
r:v=>{const n=Math.round(v.n),c=Math.round(v.c),pa=p=>{if(p<=0)return 1;if(p>=1)return c>=n?1:0;let m=Math.pow(1-p,n),s=m;for(let k=0;k<c;k++){m*=(n-k)/(k+1)*p/(1-p);s+=m}return Math.min(1,s)},aoq=p=>p*pa(p)*(v.N-n)/v.N,p0=v.pd/100,P=[0,1,2,3,4,5,6,8,10,12,15,20],pts=[];for(let x=0;x<=.2001;x+=.005)pts.push([x*100,pa(x)]);
 return[["Peluang diterima Pa",`P(cacat <= ${c}) pada n = ${n}, Pd = ${$(v.pd)}%`,"jumlah binomial",pc(pa(p0))],
 ["AOQ","Pd x Pa x (N - n) / N",`${q(p0)} x ${q(pa(p0))} x (${$(v.N)} - ${n}) / ${$(v.N)}`,pc(aoq(p0))],
 ["Producer's risk","1 - Pa pada AQL",`1 - ${q(pa(v.aql/100))}`,pc(1-pa(v.aql/100))],
 ["Consumer's risk","Pa pada LTPD",`Pa(${$(v.ltpd)}%)`,pc(pa(v.ltpd/100))],
 {h:tbl(['Pd','Pa','AOQ'],P.map(x=>[x+'%',pc(pa(x/100)),pc(aoq(x/100))]))},
 {h:chart({title:"Kurva OC",xl:"Persen cacat lot",yl:"Peluang diterima",ymin:0,ymax:1,hl:[{y:.95,c:'l3',l:"95%"},{y:.1,c:'l3',l:"10%"}],series:[{pts},{pts:[[v.pd,pa(p0)]],nl:true,pc:1,r:6}]})}]},
n:"Kurva OC makin curam dengan sampel lebih besar. Producer's risk umumnya dipatok sekitar 5% dan consumer's risk sekitar 10%."};

L.cross={t:"Crossover chart: memilih proses menurut volume",u:"7",c:"Satu baris per pilihan proses: nama, biaya tetap total, biaya variabel per unit. Program mencari titik silang dan proses termurah di tiap rentang volume.",
f:[["t","Proses, biaya tetap, biaya variabel per unit","Software A,200000,60\nSoftware B,300000,25\nSoftware C,400000,10",'a'],["vol","Volume yang direncanakan",5000]],
d:[["Kleber Enterprises (buku)",{t:"Software A,200000,60\nSoftware B,300000,25\nSoftware C,400000,10",vol:5000},"Titik silang 2.857 dan 6.667"],["Pilihan mesin cetak (fiktif)",{t:"Manual,5000,12\nSemiotomatis,20000,6\nOtomatis,60000,2",vol:3000},"Titik silang 2.500 dan 10.000"]],
r:v=>{const rs=rows(v.t);if(rs.length<2||rs.some(r=>r.length<3||isNaN(+r[1])||isNaN(+r[2])))return bad('Tiap baris: nama, biaya tetap, biaya variabel (minimal 2 proses)');const O=rs.map(r=>({n:r[0],F:+r[1],V:+r[2]})),tot=(o,x)=>o.F+o.V*x;
 let cur=O.reduce((a,b)=>b.F<a.F||(b.F==a.F&&b.V<a.V)?b:a),x=0;const seg=[],bk=[];
 for(let g=0;g<20;g++){let nx=null,nxx=Infinity;O.forEach(o=>{if(o!==cur&&o.V<cur.V){const xx=(o.F-cur.F)/(cur.V-o.V);if(xx>x+1e-9&&xx<nxx){nxx=xx;nx=o}}});seg.push([cur,x,nx?nxx:Infinity]);if(!nx)break;bk.push([cur,nx,nxx]);x=nxx;cur=nx}
 const xm=Math.max(v.vol*1.2,bk.length?bk[bk.length-1][2]*1.4:v.vol*2),best=O.reduce((a,b)=>tot(b,v.vol)<tot(a,v.vol)?b:a);
 return[...bk.map(b=>[`Titik silang ${esc(b[0].n)} dan ${esc(b[1].n)}`,"Q = (F2 - F1) / (V1 - V2)",`(${$(b[1].F)} - ${$(b[0].F)}) / (${$(b[0].V)} - ${$(b[1].V)})`,$(b[2])+" unit"]),
 {h:tbl(['Rentang volume','Proses termurah'],seg.map(s=>[`${$(s[1])} sampai ${isFinite(s[2])?$(s[2]):'tak terhingga'}`,esc(s[0].n)]))},
 {h:tbl(['Proses','Biaya total pada volume '+$(v.vol)],O.map(o=>[esc(o.n),$(tot(o,v.vol))]),{hl:[O.indexOf(best)]})},
 ["Pilihan pada volume rencana","Biaya total terendah","",esc(best.n)],
 {h:chart({title:"Crossover chart",xl:"Volume (unit)",yl:"Biaya total",xmin:0,xmax:xm,ymin:0,series:O.map((o,i)=>({n:o.n,pts:[[0,o.F],[xm,tot(o,xm)]],pc:i%4,c:['l0','l1','l2','l3'][i%4]}))})}]},
n:"Di bawah titik silang, proses berbiaya tetap rendah menang. Di atasnya, proses berbiaya variabel rendah menang."};

L.va={t:"Process chart: persentase waktu bernilai tambah",u:"7",c:"Satu baris per langkah: nama, waktu (menit), jenis: O operasi, T transportasi, I inspeksi, D tunda, S simpan. Hanya operasi yang dihitung bernilai tambah.",
f:[["t","Langkah, waktu, jenis","Ambil bahan,3,T\nPotong,12,O\nTunggu antrian,20,D\nBor,8,O\nPeriksa,4,I\nPindah ke perakitan,5,T\nRakit,15,O\nSimpan sementara,10,S\nPeriksa akhir,3,I",'a']],
d:[["Proses bengkel (fiktif)",{t:"Ambil bahan,3,T\nPotong,12,O\nTunggu antrian,20,D\nBor,8,O\nPeriksa,4,I\nPindah ke perakitan,5,T\nRakit,15,O\nSimpan sementara,10,S\nPeriksa akhir,3,I"},"Banyak waktu terbuang menunggu dan menyimpan"],["Setelah perbaikan aliran (fiktif)",{t:"Ambil bahan,2,T\nPotong,12,O\nBor,8,O\nPeriksa,4,I\nRakit,15,O\nPeriksa akhir,3,I"},"Antrian dan penyimpanan dihapus"]],
r:v=>{const rs=rows(v.t);if(!rs.length||rs.some(r=>r.length<3||isNaN(+r[1])||!'OTIDS'.includes((r[2]||'').toUpperCase())||r[2]===''))return bad('Tiap baris: langkah, menit, jenis (O, T, I, D, atau S)');const T=sum(rs.map(r=>+r[1])),by=k=>sum(rs.filter(r=>r[2].toUpperCase()==k).map(r=>+r[1])),nm={O:'Operasi',T:'Transportasi',I:'Inspeksi',D:'Tunda',S:'Simpan'};
 return[["Waktu total","Jumlah semua langkah",rs.map(r=>$(+r[1])).join(' + '),$(T)+" menit"],
 {h:tbl(['Jenis','Menit','Persen'],Object.keys(nm).map(k=>[nm[k],$(by(k)),pc(by(k)/T)]),{hl:[0]})},
 ["Waktu bernilai tambah","% = waktu operasi / waktu total",`${$(by('O'))} / ${$(T)}`,pc(by('O')/T)],
 ["Pemborosan","Waktu non-operasi",`${$(T-by('O'))} menit`,pc(1-by('O')/T)]]},
n:"Cari langkah tunda, simpan, dan transportasi yang bisa dihapus. Itu cara tercepat menaikkan persentase bernilai tambah."};

L.cap={t:"Design capacity, effective capacity, utilization, efficiency",u:"s7",c:"Kapasitas desain dihitung dari jam operasi dan laju desain. Utilization membandingkan output dengan kapasitas desain, efficiency dengan kapasitas efektif.",
f:[["dy","Hari operasi per minggu",7],["sh","Shift per hari",3],["hr","Jam per shift",8],["rt","Laju desain (unit per jam)",1200],["ec","Effective capacity per lini (unit per minggu)",175000],["ln","Jumlah lini",1,1,4,1],["ao","Output aktual total (unit per minggu)",148000]],
d:[["Sara James Bakery, satu lini (buku)",{dy:7,sh:3,hr:8,rt:1200,ec:175000,ln:1,ao:148000},"Utilization 73,4%, efficiency 84,6%"],["Dua lini, lini baru kurang mahir (buku)",{dy:7,sh:3,hr:8,rt:1200,ec:175000,ln:2,ao:278000},"Utilization 68,95%, efficiency 79,43%"],["Latihan buku: output 150.000",{dy:7,sh:3,hr:8,rt:1200,ec:175000,ln:1,ao:150000},"Efficiency naik menjadi 85,7%"]],
r:v=>{const d1=v.dy*v.sh*v.hr*v.rt,D=d1*v.ln,E=v.ec*v.ln;return[
["Design capacity per lini","hari x shift x jam x laju",`${$(v.dy)} x ${$(v.sh)} x ${$(v.hr)} x ${$(v.rt)}`,$(d1)],
["Design capacity total","per lini x jumlah lini",`${$(d1)} x ${$(v.ln)}`,$(D)],
["Effective capacity total","per lini x jumlah lini",`${$(v.ec)} x ${$(v.ln)}`,$(E)],
["Utilization","Output aktual / design capacity",`${$(v.ao)} / ${$(D)}`,pc(v.ao/D)],
["Efficiency","Output aktual / effective capacity",`${$(v.ao)} / ${$(E)}`,pc(v.ao/E)]]},
n:"Menambah lini tidak otomatis menaikkan efficiency: pekerja baru bisa menekan output sehingga kedua rasio turun."};

L.bottle={t:"Bottleneck, kapasitas sistem, dan throughput time",u:"s7",c:"Satu baris per stasiun berurutan: nama, waktu proses per unit, jumlah mesin atau pekerja paralel. Stasiun paralel membagi waktu efektif.",
f:[["t","Stasiun, waktu proses, jumlah paralel","Pesan,30,1\nPotong roti,15,2\nIsi sandwich,20,2\nPanggang,40,2\nBungkus,37.5,1",'a'],["u","Satuan waktu per jam (3600 jika detik, 60 jika menit)",3600]],
d:[["Toko sandwich Howard Kraye (buku)",{t:"Pesan,30,1\nPotong roti,15,2\nIsi sandwich,20,2\nPanggang,40,2\nBungkus,37.5,1",u:3600},"Bottleneck pembungkus 37,5 detik, 96 per jam"],["Latihan buku: tambah satu pembungkus",{t:"Pesan,30,1\nPotong roti,15,2\nIsi sandwich,20,2\nPanggang,40,2\nBungkus,37.5,2",u:3600},"Bottleneck pindah ke pemesanan, 120 per jam"],["Klinik gigi sederhana (fiktif)",{t:"Daftar,2,1\nPemeriksaan,10,2\nPembayaran,3,1",u:60},"Satuan menit"]],
r:v=>{const rs=rows(v.t);if(!rs.length||rs.some(r=>r.length<3||isNaN(+r[1])||isNaN(+r[2])||+r[2]<1||+r[1]<=0))return bad('Tiap baris: stasiun, waktu proses (>0), jumlah paralel (>=1)');const e=rs.map(r=>+r[1]/+r[2]),mx=Math.max(...e),bi=e.indexOf(mx),T=sum(rs.map(r=>+r[1]));
 return[{h:tbl(['Stasiun','Waktu proses','Paralel','Waktu efektif'],rs.map((r,i)=>[esc(r[0]),q(+r[1]),r[2],q(e[i])]),{hl:[bi]})},
 ["Bottleneck","Waktu efektif terbesar",`${esc(rs[bi][0])}`,q(mx)+" per unit"],
 ["Kapasitas sistem per jam","pembagi per jam / waktu bottleneck",`${$(v.u)} / ${q(mx)}`,q(v.u/mx)+" unit"],
 ["Throughput time","Jumlah waktu proses satu jalur (tanpa menunggu)",rs.map(r=>q(+r[1])).join(' + '),q(T)]]},
n:"Menggandakan sumber daya di stasiun memotong waktu efektifnya menjadi setengah. Throughput time tetap memakai waktu proses penuh karena satu unit hanya melewati satu mesin paralel."};

L.cvp={t:"Break-even analysis satu produk",u:"s7",c:"Cari volume dan pendapatan minimum agar tidak rugi, serta laba pada volume rencana.",
f:[["F","Biaya tetap total ($)",10000],["P","Harga jual per unit ($)",4],["V","Biaya variabel per unit ($, tenaga kerja + bahan)",2.25],["Q","Volume rencana (unit)",8000],["tp","Target laba ($)",0]],
d:[["Stephens, Inc. (buku)",{F:10000,P:4,V:2.25,Q:8000,tp:0},"BEP 5.714 unit atau $22.857"],["Latihan buku: biaya tetap $12.000",{F:12000,P:4,V:2.25,Q:8000,tp:0},"BEP 6.857 unit, $27.429"],["Bengkel sepatu (fiktif)",{F:50000,P:150,V:90,Q:1200,tp:20000},"Dengan target laba 20.000"]],
r:v=>{if(v.P<=v.V)return bad('Harga harus lebih besar dari biaya variabel per unit');const cm=v.P-v.V,bu=v.F/cm,bd=v.F/(1-v.V/v.P),pf=v.Q*cm-v.F,tu=(v.F+v.tp)/cm,xm=Math.max(bu,v.Q,tu)*1.4;
 return[["Kontribusi per unit","P - V",`${$(v.P)} - ${$(v.V)}`,"$"+q(cm)],
 ["Break-even (unit)","F / (P - V)",`${$(v.F)} / ${q(cm)}`,$(bu)+" unit"],
 ["Break-even (dolar)","F / (1 - V/P)",`${$(v.F)} / (1 - ${$(v.V)}/${$(v.P)})`,"$"+$(bd)],
 ["Laba pada volume rencana","Q x (P - V) - F",`${$(v.Q)} x ${q(cm)} - ${$(v.F)}`,"$"+$(pf)+(pf<0?" (rugi)":"")],
 ["Unit untuk target laba","(F + target laba) / (P - V)",`(${$(v.F)} + ${$(v.tp)}) / ${q(cm)}`,$(tu)+" unit"],
 ["Margin of safety","(Q - BEP) / Q",`(${$(v.Q)} - ${$(bu)}) / ${$(v.Q)}`,pc((v.Q-bu)/v.Q)],
 {h:chart({title:"Grafik break-even",xl:"Volume (unit)",yl:"Dolar",xmin:0,xmax:xm,ymin:0,series:[{n:"Pendapatan",pts:[[0,0],[xm,v.P*xm]]},{n:"Biaya total",pts:[[0,v.F],[xm,v.F+v.V*xm]],c:'l1',pc:1},{n:"Titik impas",pts:[[bu,v.P*bu]],nl:true,pc:2,r:6}]})}]},
n:"Model mengasumsikan biaya dan pendapatan naik linear terhadap volume. Biaya variabel V mencakup semua biaya variabel (tenaga kerja dan bahan)."};

L.mbep={t:"Break-even multiproduk",u:"s7",c:"Satu baris per produk: nama, harga, biaya variabel, unit terjual setahun. Tiap produk dibobot menurut proporsi penjualan dolarnya.",
f:[["F","Biaya tetap setahun ($)",36000],["days","Hari operasi per tahun",312],["t","Produk, harga, biaya variabel, unit terjual","Sandwich,5,3,9000\nMinuman,1.5,0.5,9000\nKentang panggang,2,1,7000",'a']],
d:[["Le Bistro (buku)",{F:36000,days:312,t:"Sandwich,5,3,9000\nMinuman,1.5,0.5,9000\nKentang panggang,2,1,7000"},"BEP sekitar $76.596 per tahun"],["Warung kopi (fiktif)",{F:24000,days:360,t:"Kopi,3,1,12000\nRoti bakar,2.5,1.5,6000"},"Kopi menyumbang kontribusi lebih besar"]],
r:v=>{const rs=rows(v.t);if(!rs.length||rs.some(r=>r.length<4||r.slice(1).some(x=>isNaN(+x)||x==='')||+r[1]<=0))return bad('Tiap baris: nama, harga (>0), biaya variabel, unit terjual');const S=rs.map(r=>+r[1]*+r[3]),T=sum(S),w=S.map(x=>x/T),cm=rs.map(r=>1-r[2]/r[1]),wc=cm.map((c,i)=>c*w[i]),sc=sum(wc),bep=v.F/sc;
 return[{h:tbl(['Produk','1 - V/P','Penjualan $','Bobot W','Kontribusi tertimbang'],rs.map((r,i)=>[esc(r[0]),q(cm[i]),$(S[i]),q(w[i]),q(wc[i])]).concat([['<b>Total</b>','',$(T),'1',q(sc)]]))},
 ["Break-even (dolar)","F / jumlah [ (1 - Vi/Pi) x Wi ]",`${$(v.F)} / ${q(sc)}`,"$"+$(bep)],
 ["Penjualan rencana vs break-even","Bandingkan total penjualan dengan BEP",`${$(T)} vs ${$(bep)}`,T>=bep?"Untung (di atas break-even)":"Rugi (di bawah break-even)"],
 ["Penjualan harian minimum","BEP / hari operasi",`${$(bep)} / ${$(v.days)}`,"$"+$(bep/v.days)]]},
n:"Buku membulatkan jumlah kontribusi tertimbang menjadi 0,47 sehingga BEP $76.596; hitungan presisi memberi sekitar $76.765."};

L.npv={t:"Net present value arus kas",u:"s7",c:"Diskontokan arus kas tiap tahun, lalu kurangi investasi awal. Penerimaan lebih awal bernilai lebih besar.",
f:[["i","Tingkat diskonto per tahun (%)",6],["inv","Investasi awal ($)",0],["cf","Arus kas tahun 1, 2, 3, ... (pisah koma)","7000,7000,7000,7000,7000",'t']],
d:[["River Road Medical Clinic (buku)",{i:6,inv:0,cf:"7000,7000,7000,7000,7000"},"Nilai sekarang sekitar $29.484"],["Latihan buku: bunga 8%",{i:8,inv:0,cf:"7000,7000,7000,7000,7000"},"Nilai sekarang sekitar $27.951"],["Penerimaan awal (fiktif)",{i:10,inv:6000,cf:"5000,3000,2000"},"NPV lebih besar..."],["Penerimaan akhir (fiktif)",{i:10,inv:6000,cf:"2000,3000,5000"},"...daripada jumlah yang sama tetapi datang belakangan"]],
r:v=>{const c=nums(v.cf);if(!c.length||c.some(x=>!isFinite(x)))return bad('Isi arus kas berupa angka dipisah koma');const i=v.i/100,pv=c.map((x,t)=>x/(1+i)**(t+1)),S=sum(pv);
 return[{h:tbl(['Tahun','Arus kas','Faktor 1/(1+i)^t','Nilai sekarang'],c.map((x,t)=>[t+1,$(x),q(1/(1+i)**(t+1)),$(pv[t])]))},
 ["Jumlah nilai sekarang","jumlah [ arus kas / (1+i)^t ]",pv.map($).join(' + '),"$"+$(S)],
 ["NPV","Jumlah nilai sekarang - investasi awal",`${$(S)} - ${$(v.inv)}`,"$"+$(S-v.inv)+(v.inv>0?(S-v.inv>=0?" (layak)":" (tidak layak)"):"")]]},
n:"Buku memakai faktor tabel dibulatkan 3 desimal (4,212 pada 6% dan 5 tahun), sehingga hasilnya sedikit berbeda dari hitungan presisi."};

// Peta unit -> lab (diambil dari materi.js)
const LB={};U.forEach(u=>{LB[u.id]=u.labs});
