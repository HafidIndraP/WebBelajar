/* Lab SPSS - pendamping belajar analisis data
   Struktur data: CH (modul), TUT (tutorial SPSS), TREE (pemilih uji), QS (latihan). */

const PARTS = ["Fondasi", "Olah data & uji beda", "Kualitas instrumen"];

/* ---------- MODUL ---------- */
const CH = [
{n:1, part:0, t:"Dasar Statistik & Grafik",
 lead:"Sebelum membuka SPSS, kenali dulu jenis datanya dan cara menggambarkannya dengan tabel serta grafik yang tepat.",
 pts:[
  "**Populasi** = seluruh objek yang diteliti; **sampel** = bagian yang benar-benar diamati. Angka yang menggambarkan populasi disebut **parameter**, angka dari sampel disebut **statistik**.",
  "**Simple random sampling**: setiap anggota punya peluang sama dan terpilih murni karena kebetulan. **Systematic sampling**: daftar populasi diambil dengan interval tetap, titik awalnya dipilih acak.",
  "**Statistik deskriptif** merangkum data (tabel, grafik, ukuran ringkas). **Statistik inferensial** memakai sampel untuk menarik kesimpulan, perkiraan, dan prediksi tentang populasi.",
  "Variabel **kategorikal** (nominal, ordinal) vs **numerik** (diskrit hasil menghitung, kontinu hasil mengukur).",
  "Nominal: kode angka hanya label (1 = pria, 2 = wanita). Ordinal: ada urutan, misalnya rating kepuasan 1 sampai 5.",
  "**Distribusi frekuensi** adalah daftar kelas beserta jumlah pengamatannya; versi relatifnya memakai persen. **Cross table** (crosstab) menyilangkan dua variabel kategorikal.",
  "Kelas pada data numerik tidak boleh tumpang tindih, misalnya 20 sampai 29 lalu 30 sampai 39.",
  "Bentuk sebaran bisa **simetris** (kedua sisi seperti cermin) atau **miring** (skewed)."
 ],
 tb:{t:"Data apa, grafik apa",h:["Jenis data","Grafik","Gunanya"],r:[
  ["Kategorikal","Bar chart","Membandingkan frekuensi tiap kategori"],
  ["Kategorikal","Pie chart","Porsi tiap kategori terhadap keseluruhan"],
  ["Penyebab masalah","Pareto","Memisahkan “vital few” dari “trivial many”"],
  ["Dua variabel kategorikal","Cross table, component atau cluster bar","Membandingkan satu variabel menurut variabel lain"],
  ["Time series","Line chart","Melihat tren dari waktu ke waktu"],
  ["Numerik","Histogram, stem-and-leaf","Melihat bentuk sebaran"],
  ["Dua variabel numerik","Scatter plot","Melihat hubungan, pola, dan outlier"]]},
 gl:[["Parameter","Ukuran yang menggambarkan populasi."],["Statistik","Ukuran yang menggambarkan sampel."],["Time series","Data satu hal yang diukur berurutan menurut waktu."],["Outlier","Titik data ekstrem yang jauh dari pola umum."],["Skewed","Sebaran miring, tidak simetris."]],
 tu:[]},

{n:2, part:0, t:"Skala Ukur & Peta Uji",
 lead:"Skala data menentukan uji apa yang boleh dipakai. Kuasai peta ini dan memilih uji tidak lagi menebak.",
 pts:[
  "Analisis data bertujuan mengambil informasi relevan dari data untuk **menguji hipotesis nol (H0)**: ditolak atau tidak ditolak berdasarkan data sampel.",
  "**Pengukuran** = memberi angka atau simbol pada karakteristik menurut aturan tertentu. Menurut Stevens (1946) ada empat skala.",
  "**Nominal**: label kelompok. Angka tidak bermakna, jadi rata-rata dan simpangan baku tidak pantas dihitung; cocok untuk modus dan frekuensi.",
  "**Ordinal**: kategori plus urutan (peringkat merek 1 sampai 4). Cocok untuk modus, median, dan statistik non-parametrik seperti korelasi peringkat.",
  "**Interval**: jarak antar nilai bermakna (rating preferensi 5 tingkat). **Rasio**: interval ditambah titik nol mutlak (umur, gaji).",
  "Nominal dan ordinal disebut **non-metrik**; interval dan rasio disebut **metrik**.",
  "**Metode dependen**: ada variabel bebas dan terikat. **Metode interdependen**: tidak ada pembagian itu; tujuannya memahami bagaimana dan mengapa variabel saling berkaitan.",
  "**Univariat**: satu variabel terikat. **Multivariat**: lebih dari satu variabel terikat atau bebas.",
  "Untuk data interdependen metrik dipakai korelasi sederhana (dua variabel), principal component, atau analisis faktor (lebih dari dua). Untuk non-metrik dipakai tabel kontingensi, loglinear, atau correspondence analysis."
 ],
 tb:{t:"Peta uji metode dependen",h:["Variabel terikat","Variabel bebas","Uji"],r:[
  ["1 metrik","1 non-metrik, 2 kategori","t-test"],
  ["1 metrik","1 non-metrik, lebih dari 2 kategori","ANOVA"],
  ["1 metrik","1 atau lebih metrik","Regresi"],
  ["2 atau lebih metrik","1 atau lebih non-metrik","MANOVA"],
  ["1 atau lebih metrik","lebih dari 1 non-metrik","Canonical correlation"],
  ["1 non-metrik, 2 kategori","1 atau lebih metrik","Analisis diskriminan"],
  ["1 non-metrik, lebih dari 2 kategori","1 atau lebih metrik","Multiple discriminant"],
  ["1 non-metrik, 2 kategori","metrik dan non-metrik","Regresi logistik"],
  ["lebih dari 1 metrik","lebih dari 1 metrik","Analisis jalur (path), SEM"]]},
 note:"Materi menyebut skala Likert 5 poin sebagai skala ordinal, sementara contoh rating preferensi diperlakukan sebagai interval. Tanyakan kebiasaan dosenmu untuk mata kuliah ini.",
 gl:[["Metrik","Data interval atau rasio, angkanya bermakna secara hitung."],["Non-metrik","Data nominal atau ordinal."],["Dependen","Variabel yang dipengaruhi (terikat)."],["Independen","Variabel yang memengaruhi (bebas)."],["H0","Hipotesis nol: tidak ada beda atau tidak ada hubungan."]],
 link:{h:"#/pilih",t:"Coba pemilih uji interaktif"},
 tu:[]},

{n:3, part:1, t:"SPSS, Deskriptif & Normalitas",
 lead:"Kenalan dengan SPSS, lalu periksa datamu lewat statistik deskriptif, crosstab, dan uji normalitas sebelum uji lanjutan.",
 pts:[
  "**SPSS** (Statistical Package for the Social Sciences) adalah perangkat lunak analisis statistik parametrik dan non-parametrik, kini dikembangkan IBM.",
  "Data baru: `File › New › Data`, lalu isi di **Data Editor**. Variabel didefinisikan di tab Variable View. Data dari Excel: `File › Open › Data` dan pilih tipe file Excel.",
  "**Cross-section**: banyak entitas diukur pada satu waktu. **Time series**: satu entitas diukur dari waktu ke waktu. Contoh di materi: file crossec1 berisi 100 responden dan 12 variabel survei keuangan keluarga.",
  "**Statistik deskriptif** memberi gambaran data: mean, simpangan baku, varians, minimum, maksimum, jumlah, range, skewness, dan kurtosis.",
  "**Crosstab + Chi-square** dipakai untuk dua variabel nominal: apakah keduanya berasosiasi?",
  "**Normalitas** adalah langkah pertama sebelum analisis multivariat. Data normal punya skewness dan kurtosis mendekati nol.",
  "Tiga cara cek normalitas: skewness dan kurtosis, uji **Kolmogorov-Smirnov** (H0: data normal), dan **histogram**. Histogram bisa menipu, jadi jangan jadi satu-satunya bukti.",
  "Pola penting: pada **uji asumsi** (normalitas, Levene) kamu berharap sig lebih besar dari 0,05. Pada **uji hipotesis** (t, F) biasanya kamu berharap sig lebih kecil dari 0,05."
 ],
 gl:[["Data Editor","Jendela utama SPSS tempat data dan variabel."],["Skewness","Ukuran kemiringan sebaran; dekat 0 berarti simetris."],["Kurtosis","Ukuran puncak sebaran; dekat 0 berarti puncak normal."],["Sig. (p)","Peluang hasil sebesar itu jika H0 benar; pembandingnya biasanya 0,05."],["Asosiasi","Hubungan antara dua variabel kategorikal."]],
 tu:["deskriptif","crosstab","ks","histogram"]},

{n:4, part:1, t:"Uji Beda: t-test & ANOVA",
 lead:"Bandingkan rata-rata antar kelompok. Dua kelompok pakai t-test, tiga kelompok atau lebih pakai ANOVA.",
 pts:[
  "**t-test** membandingkan rata-rata **dua kelompok** pada satu outcome. **Independent**: dua kelompok berisi orang berbeda. **Paired**: subjek yang sama diukur dua kali (sebelum dan sesudah).",
  "**p-value** adalah peluang menemukan beda rata-rata sebesar itu jika sebenarnya tidak ada beda. Ambang umum 0,05.",
  "Pada independent t-test, **periksa Levene dulu**. Sig lebih besar dari 0,05 berarti varians sama, pakai baris *equal variances assumed*. Sig lebih kecil dari 0,05 berarti pakai baris *not assumed*.",
  "**ANOVA** membandingkan rata-rata **tiga kelompok atau lebih**. One-way: satu faktor. Two-way: dua faktor. Bisa menguji **main effect** (pengaruh langsung) dan **interaction effect** (pengaruh gabungan).",
  "Asumsi ANOVA: **varians homogen** (Levene), **sampel acak**, dan **normalitas**. ANOVA cukup robust terhadap pelanggaran kecil sampai sedang.",
  "ANOVA hanya menjawab “ada yang beda atau tidak”. **Post hoc** (Tukey, Bonferroni) menunjukkan pasangan kelompok mana yang beda. Post hoc tidak jalan untuk faktor yang kurang dari tiga kategori.",
  "**Adjusted R square** menunjukkan seberapa besar variasi outcome yang dijelaskan oleh faktor.",
  "**ANCOVA** = ANOVA dengan variabel kontrol (kovariat). **MANOVA** = ANOVA dengan dua outcome atau lebih sekaligus."
 ],
 tb:{t:"Cara mengingat",h:["Uji","Kelompok","Outcome","Contoh"],r:[
  ["t-test","2 kelompok","1","Laki-laki vs perempuan → kepuasan"],
  ["ANOVA","3 kelompok atau lebih","1","Gen Z vs Milenial vs Gen X → kepuasan"],
  ["ANCOVA","kelompok + variabel kontrol","1","Metode A/B/C → prestasi, kemampuan awal sebagai kontrol"],
  ["MANOVA","kelompok","2 atau lebih","Metode A/B/C → prestasi dan motivasi"]]},
 note:"File materi Chapter 7 hanya membahas praktik SPSS sampai two-way ANOVA. ANCOVA dan MANOVA muncul sebagai perbandingan konsep.",
 gl:[["Levene","Uji kesamaan varians antar kelompok."],["Post hoc","Uji lanjutan untuk menemukan pasangan kelompok yang beda."],["Main effect","Pengaruh langsung satu faktor."],["Interaction","Pengaruh gabungan dua faktor atau lebih."],["Kovariat","Variabel kontrol pada ANCOVA."]],
 tu:["independen","paired","anova1","anova2"]},

{n:5, part:2, t:"Validitas, Reliabilitas & Analisis Faktor",
 lead:"Sebelum datamu dipakai untuk uji hipotesis, pastikan kuesionernya mengukur hal yang tepat dan konsisten.",
 pts:[
  "**Validitas = ketepatan** (mengukur apa yang seharusnya). **Reliabilitas = konsistensi** (hasil stabil jika diulang). Alat yang valid pasti reliabel, tetapi yang reliabel belum tentu valid.",
  "Jenis validitas: **content** (isi mewakili seluruh aspek yang diukur), **construct** (mengukur konstruk teoretis yang benar), **criterion** (berkaitan dengan kriteria luar; concurrent dan predictive), dan **face** (kesan sekilas, paling lemah).",
  "Bukti validitas konstruk: korelasi tinggi dengan skala sejenis (**konvergen**), korelasi rendah dengan skala yang tidak terkait (**divergen**), dan **analisis faktor**.",
  "Validitas butir kuesioner diuji dengan **korelasi item dengan skor total** (item analysis). Butir valid jika r hitung memenuhi r tabel atau sig kurang dari 0,05.",
  "Klasifikasi Guilford: 0,80 sampai 1,00 sangat tinggi; 0,60 sampai 0,80 tinggi; 0,40 sampai 0,60 cukup; 0,20 sampai 0,40 rendah; di bawah 0,20 sangat rendah.",
  "**Skala Likert 5 poin**: 1 sangat tidak setuju, 2 tidak setuju, 3 netral, 4 setuju, 5 sangat setuju.",
  "Dua cara mengukur reliabilitas: **repeated measure** (ukur ulang di waktu berbeda, melihat stabilitas) dan **one-shot** (sekali ukur, melihat konsistensi internal). Alatnya **Cronbach's alpha**; alpha di atas 0,70 dianggap reliabel (Nunnally, 1994).",
  "**Analisis faktor**: KMO di atas 0,50 dan Bartlett signifikan berarti data layak. Jumlah faktor ditentukan eigenvalue di atas 1. Rotasi **Varimax** memperjelas pengelompokan indikator ke faktor."
 ],
 tb:{t:"Validitas vs reliabilitas",h:["Aspek","Validitas","Reliabilitas"],r:[
  ["Makna","Ketepatan: mengukur yang seharusnya","Konsistensi: stabil saat diulang"],
  ["Analogi","Panah tepat mengenai sasaran","Panah selalu jatuh di titik yang sama"],
  ["Hubungan","Valid pasti reliabel","Reliabel belum tentu valid"],
  ["Sumber kesalahan","Systematic error (bias desain)","Random error (kondisi responden)"],
  ["Uji populer","Korelasi item-total, analisis faktor","Cronbach's alpha, test-retest"]]},
 note:"Di slide prosedur ini disebut CFA, tetapi PCA + Varimax di SPSS secara teknis bersifat eksploratori. CFA sesungguhnya dikerjakan lewat SEM (misalnya AMOS atau SmartPLS). Istilah ini bagus untuk ditanyakan ke dosen.",
 gl:[["Konstruk","Konsep abstrak yang diukur lewat beberapa indikator."],["Indikator","Butir pertanyaan yang mewakili konstruk."],["Cronbach's alpha","Ukuran konsistensi internal butir."],["KMO","Ukuran kecukupan sampel untuk analisis faktor."],["Eigenvalue","Besar variasi yang dijelaskan satu faktor."],["Factor loading","Kekuatan hubungan indikator dengan faktor."],["Unidimensional","Semua indikator konstruk berkumpul di satu faktor."]],
 tu:["validitas","reliabilitas","faktor"]}
];

/* ---------- TUTORIAL SPSS ---------- */
const TUT = [
{id:"deskriptif", ch:3, t:"Statistik Deskriptif",
 path:["Analyze","Descriptive Statistics","Descriptives"], file:"Crossec1.xls",
 goal:"Menggambarkan gaji kepala keluarga (EARNS) dari 100 responden: pusat, sebaran, dan bentuk datanya.",
 steps:[
  ["Buka datanya","`File › Open › Data`, lalu pilih file Crossec1.xls."],
  ["Buka menu analisis","`Analyze › Descriptive Statistics › Descriptives`."],
  ["Pilih variabel","Pindahkan EARNS ke kotak Variable(s)."],
  ["Atur statistiknya","Klik **Options**, centang Mean, Std. deviation, Variance, Range, Minimum, Maximum, Sum, Kurtosis, dan Skewness."],
  ["Jalankan","Klik **Continue**, lalu **OK**."]],
 out:[{t:"Descriptive Statistics",
  h:["","N","Range","Minimum","Maximum","Sum","Mean","Mean Std. Error","Std. Deviation","Variance","Skewness","Skew Std. Error","Kurtosis","Kurt Std. Error"],
  r:[["EARNS","100","29,25",",75","30,00","791,10","7,9110",",51297","5,12970","26,314","{{2,590}}",",241","{{8,422}}",",478"],["Valid N (listwise)","100","","","","","","","","","","","",""]]}],
 read:[
  ["N","Ada 100 dari 100 responden yang datanya terisi lengkap."],
  ["Minimum dan maksimum","Gaji kepala keluarga terendah 0,75 dan tertinggi 30 (ribu dolar). Range-nya adalah selisih keduanya, 29,25."],
  ["Mean dan simpangan baku","Rata-rata gaji 7,911 ribu dolar dengan simpangan baku 5,130. Simpangan yang besar relatif terhadap rata-rata berarti gaji antar keluarga sangat beragam."],
  ["Skewness dan kurtosis","Data normal punya keduanya mendekati 0. Di sini 2,590 dan 8,422, jauh dari 0. Data menumpuk di nilai kecil dengan ekor panjang ke kanan (positively skewed)."]],
 concl:"Data EARNS **tidak berdistribusi normal**.",
 tip:"Skewness dan kurtosis hanyalah indikasi awal. Untuk keputusan yang lebih formal lanjutkan ke uji Kolmogorov-Smirnov, dan lihat bentuknya lewat histogram."},

{id:"crosstab", ch:3, t:"Crosstab & Chi-square",
 path:["Analyze","Descriptive Statistics","Crosstabs"], file:"Crossec1.xls",
 goal:"Menguji apakah ada asosiasi antara tempat tinggal (REG: 1 Northeast, 2 Northcentral, 3 South, 4 West) dan ras (RACE: 1 kulit putih, 2 kulit hitam).",
 hyp:"H0: tidak ada hubungan antara REG dan RACE.",
 steps:[
  ["Buka datanya","`File › Open › Data`, pilih Crossec1.xls."],
  ["Buka Crosstabs","`Analyze › Descriptive Statistics › Crosstabs`."],
  ["Tentukan baris dan kolom","Masukkan REG ke kotak **Row(s)** dan RACE ke kotak **Column(s)**."],
  ["Minta Chi-square","Klik **Statistics**, centang **Chi-square**, lalu Continue."],
  ["Tampilkan persentase","Klik **Cells**, centang Observed, Expected, serta persentase Row, Column, dan Total. Continue, lalu **OK**."]],
 out:[
  {t:"REG * RACE Crosstabulation (dipangkas: Region 1 ditampilkan lengkap)",
   h:["REG","Isi sel","RACE 1","RACE 2","Total"],
   r:[["1","Count","28","1","29"],["","Expected Count","27,0","2,0","29,0"],["","% within REG","96,6%","3,4%","100,0%"],["","% within RACE","30,1%","14,3%","29,0%"],["","% of Total","28,0%","1,0%","29,0%"],["2","Count","27","0","27"],["3","Count","23","4","27"],["4","Count","15","2","17"],["Total","Count","93","7","100"]]},
  {t:"Chi-Square Tests",h:["","Value","df","Asymp. Sig. (2-sided)"],
   r:[["Pearson Chi-Square","5,720ᵃ","3","{{,126}}"],["Likelihood Ratio","7,061","3",",070"],["Linear-by-Linear Association","3,029","1",",082"],["N of Valid Cases","100","",""]],
   n:"a. 4 sel (50,0%) memiliki expected count kurang dari 5. Expected count minimum adalah 1,19."}],
 read:[
  ["Membaca tabel silang","Baris adalah REG, kolom adalah RACE. “% within REG” 96,6% berarti dari semua keluarga di Region 1, sebagian besarnya kulit putih. “% within RACE” 30,1% berarti dari semua keluarga kulit putih, itulah porsi yang tinggal di Region 1. “% of Total” memakai seluruh 100 responden sebagai pembanding."],
  ["Pearson Chi-Square","Nilainya 5,720 dengan sig 0,126. Karena lebih besar dari 0,05, H0 tidak ditolak."],
  ["Catatan di bawah tabel","Ada 4 sel (50%) dengan expected count kurang dari 5, sehingga hasil Chi-square ini kurang kuat."]],
 concl:"**Tidak ada asosiasi** antara tempat tinggal (REG) dan ras (RACE).",
 tip:"Karena banyak sel yang expected count-nya kecil, di laporan sungguhan pertimbangkan menggabungkan kategori atau memakai uji eksak. Itu tambahan dari saya, bukan dari slide."},

{id:"ks", ch:3, t:"Uji Normalitas Kolmogorov-Smirnov",
 path:["Analyze","Nonparametric Tests","Legacy Dialogs","1-Sample K-S"], file:"Crossec1.xls",
 goal:"Memastikan secara statistik apakah EARNS dan WEALTH berdistribusi normal.",
 hyp:"H0: data berdistribusi normal. HA: data tidak berdistribusi normal.",
 steps:[
  ["Buka datanya","`File › Open › Data`, pilih Crossec1.xls."],
  ["Buka menu uji","`Analyze › Nonparametric Tests › Legacy Dialogs › 1-Sample K-S`."],
  ["Pilih variabel","Masukkan EARNS dan WEALTH ke kotak Test Variable List."],
  ["Pilih distribusi","Pada Test Distribution, centang **Normal**."],
  ["Jalankan","Klik **OK**."]],
 out:[{t:"One-Sample Kolmogorov-Smirnov Test",h:["","EARNS","WEALTH"],
  r:[["Kolmogorov-Smirnov Z","1,859","2,271"],["Asymp. Sig. (2-tailed)","{{,002}}","{{,000}}"]]}],
 read:[
  ["Cari baris sig","Perhatikan Asymp. Sig. (2-tailed): 0,002 untuk EARNS dan 0,000 untuk WEALTH."],
  ["Bandingkan dengan 0,05","Keduanya jauh di bawah 0,05, jadi H0 ditolak."]],
 concl:"EARNS dan WEALTH **tidak berdistribusi normal**.",
 tip:"Ingat pola ini: pada uji asumsi (K-S, Levene) kamu berharap sig **lebih besar** dari 0,05 karena itu berarti asumsi terpenuhi."},

{id:"histogram", ch:3, t:"Histogram dengan Kurva Normal",
 path:["Graphs","Legacy Dialogs","Histogram"], file:"Crossec1.xls",
 goal:"Melihat bentuk sebaran EARNS dan WEALTH secara visual.",
 steps:[
  ["Buka datanya","`File › Open › Data`, pilih Crossec1.xls."],
  ["Buka menu grafik","`Graphs › Legacy Dialogs › Histogram`."],
  ["Pilih variabel","Masukkan EARNS ke kotak Variable. Ulangi untuk WEALTH."],
  ["Tampilkan kurva","Centang **Display normal curve**."],
  ["Jalankan","Klik **OK**."]],
 out:[{t:"Histogram EARNS (ilustrasi bentuk, bukan data asli)",chart:[92,70,48,30,18,11,7,4,3,2,1],n:"Batang menumpuk di sisi kiri dan ekornya memanjang ke kanan."}],
 read:[
  ["Bentuk batang","Sebagian besar data berkumpul di nilai kecil, sementara sebagian kecil tersebar jauh ke kanan."],
  ["Dibanding kurva normal","Bentuk batang tidak mengikuti kurva lonceng. Itu ciri kemiringan positif."]],
 concl:"Grafik **mendukung** hasil uji lain: EARNS dan WEALTH tidak normal dan miring ke kanan.",
 tip:"Histogram bisa tampak hampir normal padahal uji statistik menolak normalitas. Jadikan grafik sebagai pelengkap, bukan penentu."},

{id:"independen", ch:4, t:"Independent Samples t-test",
 path:["Analyze","Compare Means","Independent-Samples T Test"], file:"Employee data.sav",
 goal:"Apakah rata-rata pengalaman kerja sebelumnya (prevexp, dalam bulan) berbeda antara karyawan laki-laki dan perempuan?",
 hyp:"Levene H0: varians kedua kelompok sama. Uji-t H0: rata-rata kedua kelompok sama.",
 steps:[
  ["Buka datanya","`File › Open › Data`, pilih Employee data.sav."],
  ["Buka menu uji","`Analyze › Compare Means › Independent-Samples T Test`. Dipilih karena kelompok laki-laki dan perempuan berasal dari populasi yang berbeda."],
  ["Isi variabel","Previous Experience ke **Test Variable(s)**, Gender ke **Grouping Variable**."],
  ["Definisikan kelompok","Klik **Define Groups**: Group 1 = `m`, Group 2 = `f`."],
  ["Jalankan","Klik **Continue**, lalu **OK**."]],
 out:[
  {t:"Group Statistics",h:["Gender","N","Mean","Std. Deviation","Std. Error Mean"],r:[["Male","258","111,62","109,692","6,829"],["Female","216","77,04","95,012","6,465"]]},
  {t:"Independent Samples Test (Previous Experience, bulan)",
   h:["","Levene F","Levene Sig.","t","df","Sig. (2-tailed)","Mean Difference","Std. Error Diff.","95% CI Lower","95% CI Upper"],
   r:[["Equal variances assumed","2,582","{{,109}}","3,631","472","{{,000}}","34,583","9,524","15,869","53,297"],["Equal variances not assumed","","","3,678","471,444",",000","34,583","9,404","16,105","53,062"]]}],
 read:[
  ["Group Statistics","Rata-rata pengalaman laki-laki 111,62 bulan, perempuan 77,04 bulan. Beda secara angka, tetapi signifikan atau tidaknya baru terjawab di tabel kedua."],
  ["Levene (langkah 1)","Sig 0,109 lebih besar dari 0,05, jadi H0 tidak ditolak: varians sama. Pakai baris **Equal variances assumed**."],
  ["Uji-t (langkah 2)","Pada baris itu t = 3,631 dengan sig 0,000 (dua sisi), lebih kecil dari 0,05, jadi H0 ditolak."],
  ["Mean Difference dan CI","Selisih rata-rata 34,583 bulan. Interval kepercayaan 95% (15,869 sampai 53,297) tidak memuat 0, konsisten dengan hasil signifikan."]],
 concl:"Rata-rata pengalaman kerja sebelumnya **berbeda signifikan** antara laki-laki dan perempuan; laki-laki lebih lama.",
 tip:"Di slide dosen, angka t tertulis 3,361 padahal tabel output menunjukkan 3,631. Jika teks dan output berbeda, percayai output."},

{id:"paired", ch:4, t:"Paired Samples t-test",
 path:["Analyze","Compare Means","Paired-Samples T Test"], file:"Paired.xls",
 goal:"Apakah kinerja perusahaan (ROA) berbeda sebelum dan sesudah go public? Sampelnya sama (perusahaan yang sama diukur dua kali), maka dipakai uji berpasangan.",
 hyp:"H0: rata-rata ROA sebelum dan sesudah go public sama.",
 steps:[
  ["Buka datanya","`File › Open › Data`, pilih Paired.xls."],
  ["Buka menu uji","`Analyze › Compare Means › Paired-Samples T Test`."],
  ["Pasangkan variabel","Pindahkan ROASBL (Variable1) dan ROASSD (Variable2) ke baris Pair 1."],
  ["Jalankan","Klik **OK**."]],
 out:[
  {t:"Paired Samples Statistics",h:["","Mean","N","Std. Deviation","Std. Error Mean"],r:[["ROASBL (sebelum)","2,9942","69","2,26998",",27327"],["ROASSD (sesudah)","1,9194","69","3,62120",",43594"]]},
  {t:"Paired Samples Test (ROASBL - ROASSD)",h:["","Mean","Std. Deviation","Std. Error Mean","95% CI Lower","95% CI Upper","t","df","Sig. (2-tailed)"],
   r:[["Pair 1","1,07478","4,10938",",49471",",08760","2,06196","2,173","68","{{,033}}"]]}],
 read:[
  ["Paired Samples Statistics","Rata-rata ROA sebelum go public 2,99, sesudahnya 1,92. Arahnya turun."],
  ["Paired Samples Test","Sig 0,033 lebih kecil dari 0,05, jadi H0 ditolak. Cara lama yang menghasilkan kesimpulan sama: t hitung 2,173 lebih besar dari t tabel 5% (sekitar 1,96)."],
  ["Mean pasangan","Mean selisih bernilai positif karena dihitung sebelum dikurangi sesudah: ROA sebelum lebih tinggi. CI 95% tidak memuat 0."]],
 concl:"ROA **turun signifikan** setelah perusahaan go public.",
 tip:"Pilih paired jika subjek yang sama diukur dua kali, dan independent jika dua kelompok isinya orang atau objek berbeda. Slide menyebut 68 perusahaan, tetapi output menunjukkan N = 69; ikuti output."},

{id:"anova1", ch:4, t:"One-Way ANOVA + Post Hoc",
 path:["Analyze","General Linear Model","Univariate"], file:"Employee data.sav",
 goal:"Apakah rata-rata pengalaman kerja sebelumnya berbeda menurut kategori pekerjaan (jobcat: clerical, custodial, manager)?",
 hyp:"H0: rata-rata pengalaman kerja sama di semua kategori pekerjaan.",
 steps:[
  ["Buka datanya","`File › Open › Data`, pilih Employee data.sav."],
  ["Buka menu","`Analyze › General Linear Model › Univariate`."],
  ["Isi variabel","Previous Experience ke **Dependent Variable**, jobcat ke **Fixed Factor(s)**."],
  ["Minta uji Levene","Klik **Options**, centang **Homogeneity tests**, lalu Continue."],
  ["Minta post hoc","Klik **Post Hoc**, pindahkan jobcat ke Post Hoc Tests for, centang **Bonferroni** dan **Tukey** (Tukey's-b). Continue."],
  ["Jalankan","Klik **OK**."]],
 out:[
  {t:"Levene's Test of Equality of Error Variances",h:["F","df1","df2","Sig."],r:[["2,544","2","471","{{,080}}"]]},
  {t:"Tests of Between-Subjects Effects (Previous Experience)",h:["Source","Type III Sum of Squares","df","Mean Square","F","Sig."],
   r:[["Corrected Model","1174906,874ᵃ","2","587453,437","69,192",",000"],["Intercept","4106802,719","1","4106802,719","483,709",",000"],["jobcat","1174906,874","2","587453,437","{{69,192}}","{{,000}}"],["Error","3998899,936","471","8490,233","",""],["Total","9529528,000","474","","",""],["Corrected Total","5173806,810","473","","",""]],
   n:"a. R Squared = ,227 (Adjusted R Squared = ,224)"},
  {t:"Multiple Comparisons (Bonferroni)",h:["(I) Category","(J) Category","Mean Difference (I-J)","Std. Error","Sig.","95% CI Lower","95% CI Upper"],
   r:[["Clerical","Custodial","{{-213,07*}}","18,380",",000","-257,23","-168,91"],["Clerical","Manager","7,42","11,156","1,000","-19,38","34,22"],["Custodial","Clerical","213,07*","18,380",",000","168,91","257,23"],["Custodial","Manager","220,49*","20,384",",000","171,52","269,47"],["Manager","Clerical","-7,42","11,156","1,000","-34,22","19,38"],["Manager","Custodial","-220,49*","20,384",",000","-269,47","-171,52"]],
   n:"*. Beda rata-rata signifikan pada tingkat 0,05."},
  {t:"Homogeneous Subsets (Tukey B)",h:["Employment Category","N","Subset 1","Subset 2"],
   r:[["Manager","84","77,62",""],["Clerical","363","85,04",""],["Custodial","27","","298,11"]]}],
 read:[
  ["Levene","Sig 0,080 lebih besar dari 0,05: varians homogen, asumsi ANOVA terpenuhi."],
  ["Tests of Between-Subjects","Fokus pada baris **jobcat** (faktor yang diuji): F = 69,192 dengan sig 0,000, jadi H0 ditolak. Baris Intercept boleh diabaikan."],
  ["Adjusted R Squared","0,224 berarti kategori pekerjaan menjelaskan sekitar 22,4% variasi pengalaman kerja."],
  ["Post hoc (Bonferroni)","ANOVA hanya bilang ada yang beda. Tabel ini menunjukkan: Custodial berbeda signifikan dari Clerical dan Manager (sig 0,000), sedangkan Clerical dan Manager tidak berbeda (sig 1,000)."],
  ["Homogeneous Subsets","Manager dan Clerical berada di satu subset (rata-rata 77,62 dan 85,04), Custodial di subset lain dengan rata-rata 298,11 bulan."]],
 concl:"Pengalaman kerja **berbeda antar kategori pekerjaan**, dan penyebabnya adalah kelompok **custodial** yang jauh lebih berpengalaman.",
 tip:"Slide menyebut p = 0,784 untuk Clerical dan Manager, sedangkan tabel Bonferroni menunjukkan 1,000. Kesimpulannya sama (tidak signifikan), tapi kutip dari tabel."},

{id:"anova2", ch:4, t:"Two-Way ANOVA",
 path:["Analyze","General Linear Model","Univariate"], file:"Employee data.sav",
 goal:"Apakah pengalaman kerja sebelumnya dipengaruhi oleh kategori pekerjaan (jobcat), jenis kelamin (gender), atau gabungan keduanya?",
 hyp:"Tiga H0: tidak ada efek jobcat, tidak ada efek gender, dan tidak ada interaksi jobcat dengan gender.",
 steps:[
  ["Mulai seperti one-way","Ikuti langkah one-way ANOVA sampai kotak Fixed Factor(s)."],
  ["Tambah satu faktor","Masukkan **gender** sebagai Fixed Factor kedua, di samping jobcat."],
  ["Atur model","Klik **Model**. Biarkan **Full factorial** (default) agar interaksi jobcat * gender ikut diuji. Slide menyebut Custom/main effects, tetapi output contoh memuat baris interaksi."],
  ["Minta Levene","Klik **Options**, centang **Homogeneity tests**."],
  ["Minta post hoc","Klik **Post Hoc**, pindahkan faktor, centang Bonferroni dan Tukey."],
  ["Jalankan","Klik **Continue**, lalu **OK**."]],
 out:[
  {t:"Warnings",h:["Pesan SPSS"],r:[["Post hoc tests are not performed for gender because there are fewer than three groups."]]},
  {t:"Levene's Test of Equality of Error Variances",h:["F","df1","df2","Sig."],r:[["1,958","4","469","{{,100}}"]],n:"Design: Intercept + jobcat + gender + jobcat * gender"},
  {t:"Tests of Between-Subjects Effects (Previous Experience)",h:["Source","Type III Sum of Squares","df","Mean Square","F","Sig."],
   r:[["Corrected Model","1203354,370ᵃ","4","300838,593","35,536",",000"],["Intercept","2101927,707","1","2101927,707","248,285",",000"],["jobcat","1059830,227","2","529915,113","{{62,595}}","{{,000}}"],["gender","13001,080","1","13001,080","{{1,536}}","{{,216}}"],["jobcat * gender","500,634","1","500,634","{{,059}}","{{,808}}"],["Error","3970452,440","469","8465,783","",""],["Total","9529528,000","474","","",""],["Corrected Total","5173806,810","473","","",""]],
   n:"a. R Squared = ,233 (Adjusted R Squared = ,226)"}],
 read:[
  ["Warning post hoc","Gender hanya punya dua kategori, jadi post hoc tidak dijalankan untuk gender. Post hoc hanya berlaku jika faktor punya lebih dari dua kategori."],
  ["Levene","Sig 0,100 lebih besar dari 0,05: varians homogen, asumsi terpenuhi."],
  ["Main effect jobcat","F = 62,595, sig 0,000: jobcat berpengaruh langsung terhadap pengalaman kerja."],
  ["Main effect gender","F = 1,536, sig 0,216 lebih besar dari 0,05: gender tidak berpengaruh."],
  ["Interaksi","jobcat * gender punya sig 0,808: tidak ada pengaruh gabungan yang berarti."],
  ["Adjusted R Squared","0,226: jobcat dan gender bersama menjelaskan sekitar 22,6% variasi."]],
 concl:"Hanya **jobcat** yang berpengaruh pada pengalaman kerja. Gender dan interaksinya tidak signifikan.",
 tip:"Angka di teks slide (F = 62,863 dan 3,308, p = 0,107, adj R² 0,228) berbeda dari tabel output di atas. Gunakan angka tabel."},

{id:"validitas", ch:5, t:"Uji Validitas (Korelasi Bivariat)",
 path:["Analyze","Correlate","Bivariate"], file:"job survey.sav",
 goal:"Menguji apakah keempat indikator konstruk AUTONOMY (autonom1 sampai autonom4) valid, lewat korelasi tiap indikator dengan skor total.",
 hyp:"Sebuah indikator valid jika korelasinya dengan skor total signifikan.",
 steps:[
  ["Buka datanya","`File › Open › Data`, pilih job survey.sav. Skor total autonom sudah ada di data."],
  ["Buka menu","`Analyze › Correlate › Bivariate`."],
  ["Pilih variabel","Masukkan autonom1, autonom2, autonom3, autonom4, dan skor total **autonom** ke kotak Variables."],
  ["Pilih koefisien","Centang **Pearson**."],
  ["Jalankan","Klik **OK**."]],
 out:[{t:"Correlations (Pearson, N = 70 untuk semua sel)",h:["","autonom1","autonom2","autonom3","autonom4","autonom (total)"],
  r:[["autonom1","1",",520**",",429**",",633**","{{,837**}}"],["autonom2",",520**","1",",349**",",380**","{{,758**}}"],["autonom3",",429**",",349**","1",",449**","{{,711**}}"],["autonom4",",633**",",380**",",449**","1","{{,776**}}"],["autonom (total)",",837**",",758**",",711**",",776**","1"]],
  n:"**. Korelasi signifikan pada level 0,01 (2-tailed). Sig semua sel 0,000 kecuali autonom2 dengan autonom3 (0,003) dan autonom2 dengan autonom4 (0,001)."}],
 read:[
  ["Fokus pada kolom total","Yang dibaca adalah korelasi tiap indikator dengan skor total autonom: 0,837; 0,758; 0,711; dan 0,776."],
  ["Tanda **","Semuanya bertanda dua bintang, artinya signifikan pada level 0,01 (sig 0,000)."],
  ["Kategori Guilford","0,837 masuk sangat tinggi (0,80 sampai 1,00). Tiga lainnya masuk tinggi (0,60 sampai 0,80)."]],
 concl:"Keempat indikator **valid**.",
 tip:"Slide menyebut hasil ini identik dengan kolom Corrected Item-Total Correlation di analisis reliabilitas. Angkanya mirip tapi tidak sama persis (misalnya 0,837 vs 0,680 untuk autonom1), karena korelasi bivariat ikut menghitung item itu sendiri di dalam skor total."},

{id:"reliabilitas", ch:5, t:"Uji Reliabilitas (Cronbach's Alpha)",
 path:["Analyze","Scale","Reliability Analysis"], file:"job survey.sav",
 goal:"Menguji konsistensi internal konstruk AUTONOMY yang diukur dengan empat indikator.",
 hyp:"Konstruk reliabel jika Cronbach's alpha di atas 0,70 (Nunnally, 1994).",
 steps:[
  ["Buka datanya","`File › Open › Data`, pilih job survey.sav."],
  ["Buka menu","`Analyze › Scale › Reliability Analysis`."],
  ["Isi item","Masukkan autonom1 sampai autonom4 ke kotak Items. Pastikan Model = **Alpha**."],
  ["Atur statistik","Klik **Statistics**, centang Item, Scale, Scale if item deleted, dan Inter-Item Correlations."],
  ["Jalankan","Klik **Continue**, lalu **OK**."]],
 out:[
  {t:"Reliability Statistics",h:["Cronbach's Alpha","Alpha Based on Standardized Items","N of Items"],r:[["{{,768}}",",773","4"]]},
  {t:"Item-Total Statistics",h:["","Scale Mean if Item Deleted","Scale Variance if Item Deleted","Corrected Item-Total Correlation","Squared Multiple Correlation","Cronbach's Alpha if Item Deleted"],
   r:[["autonom1","6,97","4,318",",680",",502","{{,650}}"],["autonom2","7,01","4,449",",512",",291","{{,751}}"],["autonom3","7,07","5,053",",493",",253","{{,750}}"],["autonom4","7,19","4,907",",612",",440","{{,694}}"]]}],
 read:[
  ["Reliability Statistics","Cronbach's alpha = 0,768, lebih besar dari 0,70."],
  ["Alpha if Item Deleted","Kalau salah satu item dibuang, alpha turun ke 0,650 sampai 0,751 (semuanya di bawah 0,768). Artinya tidak ada item yang perlu dibuang."],
  ["Corrected Item-Total","Semua item berkorelasi cukup kuat dengan sisa item lain (0,493 sampai 0,680)."]],
 concl:"Konstruk AUTONOMY **reliabel**. Ulangi langkah yang sama untuk konstruk ROUTINE.",
 tip:"Di slide hasilnya tertulis “7,3%”, padahal output menunjukkan 0,768 (alpha adalah angka antara 0 dan 1, bukan persen)."},

{id:"faktor", ch:5, t:"Analisis Faktor (KMO, Bartlett, Varimax)",
 path:["Analyze","Data Reduction","Factor"], file:"job survey.sav",
 goal:"Memeriksa apakah delapan indikator (autonom1-4 dan routine1-4) mengelompok menjadi dua faktor sesuai konstruknya.",
 hyp:"Harapan: autonom1-4 berkumpul di satu faktor dan routine1-4 di faktor lain.",
 steps:[
  ["Buka datanya","`File › Open › Data`, pilih job survey.sav."],
  ["Buka menu","`Analyze › Data Reduction › Factor` (pada SPSS versi baru menunya bernama Dimension Reduction)."],
  ["Isi variabel","Masukkan autonom1 sampai autonom4 dan routine1 sampai routine4 ke kotak Variables."],
  ["Minta KMO dan Bartlett","Klik **Descriptives**, centang **KMO and Bartlett's test of sphericity**, lalu Continue."],
  ["Atur rotasi","Klik **Rotation**, pilih **Varimax**, centang Rotated solution, lalu Continue."],
  ["Jalankan","Klik **OK**."]],
 out:[
  {t:"KMO and Bartlett's Test",h:["Ukuran","","Nilai"],r:[["Kaiser-Meyer-Olkin Measure of Sampling Adequacy","","{{,713}}"],["Bartlett's Test of Sphericity","Approx. Chi-Square","183,867"],["","df","28"],["","Sig.","{{,000}}"]]},
  {t:"Total Variance Explained (Principal Component Analysis)",h:["Component","Eigenvalue Total","% of Variance","Cumulative %","Rotasi Total","Rotasi % Var.","Rotasi Cum. %"],
   r:[["1","{{3,240}}","40,495","40,495","2,532","31,654","31,654"],["2","{{1,491}}","18,643","59,138","2,199","27,484","59,138"],["3",",909","11,357","70,495","","",""],["4",",783","9,793","80,288","","",""],["5",",591","7,384","87,672","","",""],["6",",464","5,800","93,472","","",""],["7",",325","4,068","97,540","","",""],["8",",197","2,460","100,000","","",""]]},
  {t:"Component Matrix (sebelum rotasi)",h:["","Component 1","Component 2"],r:[["autonom1",",734",",439"],["autonom2",",750",",103"],["autonom3",",568",",363"],["autonom4",",692",",372"],["routine1","-,763",",482"],["routine2","-,512",",265"],["routine3","-,111",",745"],["routine4","-,693",",400"]],n:"Campur aduk dan sulit ditafsirkan, sehingga perlu rotasi."},
  {t:"Rotated Component Matrix (Varimax)",h:["","Component 1","Component 2"],r:[["autonom1","{{,845}}","-,128"],["autonom2","{{,645}}","-,397"],["autonom3","{{,669}}","-,081"],["autonom4","{{,771}}","-,153"],["routine1","-,283","{{,857}}"],["routine2","-,226","{{,530}}"],["routine3",",388","{{,646}}"],["routine4","-,280","{{,750}}"]],n:"Rotation converged in 3 iterations."}],
 read:[
  ["KMO dan Bartlett","KMO 0,713 melewati syarat minimal 0,50, dan Bartlett signifikan (0,000). Data layak dianalisis faktor."],
  ["Total Variance Explained","Dua komponen punya eigenvalue di atas 1 (3,240 dan 1,491), jadi terbentuk dua faktor. Bersama-sama keduanya menjelaskan 59,138% variasi."],
  ["Sebelum rotasi","Pengelompokannya campur: indikator routine tersebar di dua komponen. Itu sebabnya perlu rotasi."],
  ["Sesudah Varimax","Autonom1 sampai autonom4 jelas berada di Faktor 1 (loading 0,645 sampai 0,845), routine1 sampai routine4 di Faktor 2 (0,530 sampai 0,857). Routine3 masih punya loading 0,388 di Faktor 1, tetapi lebih kuat di Faktor 2 (0,646)."]],
 concl:"Tiap konstruk bersifat **unidimensional**: seluruh indikator AUTONOMY dan ROUTINE **valid**.",
 tip:"Di materi prosedur ini disebut CFA, tetapi PCA + Varimax adalah analisis faktor eksploratori. CFA sejati memakai SEM (AMOS atau SmartPLS)."}
];

/* ---------- PEMILIH UJI ---------- */
/* ---------- BAHAS UTS (data dihasilkan dari analisis Data_Latihan_UTS.sav) ---------- */
const UTS = [
 {
  "id": "rancang",
  "t": "Rancang Variabel & Siapkan Data",
  "path": [
   "File",
   "Open",
   "Data"
  ],
  "file": "Data_Latihan_UTS.sav",
  "diagram": true,
  "goal": "Menentukan peran tiap variabel (antecedent, consequence, intervening, control), memastikan 5 variabel × 5 indikator = 25 parameter, dan menyiapkan data 350 responden di SPSS.",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka Variable View",
    "Klik tab **Variable View** di kiri bawah. Satu baris = satu variabel; periksa kolom Type (Numeric), Label, Values, dan Measure."
   ],
   [
    "Periksa isi Data View",
    "Klik tab **Data View**. Pastikan ada 350 baris (responden) dan tiap butir berisi angka dalam rentang 1 sampai 10 (nilai terkecil di data ini 4)."
   ],
   [
    "Cek variabel total",
    "Kolom TotalCE, TotalFOMO, TotalPP, TotalSAT, dan TotalRI sudah tersedia di data latihan. Jika belum, buat lewat `Transform › Compute Variable`: isi **Target Variable** dengan nama total (misalnya TotalCE), lalu pada **Numeric Expression** ketik `SUM(CE1 TO CE5)`. Klik **OK**. Ulangi untuk FOMO, PP, SAT, dan RI. `TO` memakai urutan kolom di Variable View; bila urutannya berbeda, tulis kelimanya satu per satu: `SUM(CE1,CE2,CE3,CE4,CE5)`. Setelah itu atur Measure kolom total menjadi **Scale**."
   ],
   [
    "Simpan data",
    "`File › Save`. Mulai sekarang semua analisis memakai file ini."
   ],
   [
    "Simpan output tiap analisis",
    "Hasil analisis muncul di jendela terpisah bernama **Output Viewer**. Simpan dengan `File › Save As` (berekstensi .spv) agar tabelnya bisa dibuka lagi saat menyusun laporan."
   ]
  ],
  "out": [
   {
    "t": "Peta peran variabel",
    "h": [
     "Variabel",
     "Peran",
     "Indikator",
     "Kolom total",
     "Asal kolom di data dosen"
    ],
    "r": [
     [
      "Celebrity Endorse (CE)",
      "Antecedent",
      "CE1 - CE5",
      "TotalCE",
      "ESQ1-5 (TotalESE)"
     ],
     [
      "Fear of Missing Out (FOMO)",
      "Antecedent",
      "FOMO1 - FOMO5",
      "TotalFOMO",
      "PV1-5 (TotalFOMO)"
     ],
     [
      "Perceived Price (PP)",
      "Antecedent",
      "PP1 - PP5",
      "TotalPP",
      "CS1-5 (TotalPD)"
     ],
     [
      "Customer Satisfaction (SAT)",
      "Intervening",
      "SAT1 - SAT5",
      "TotalSAT",
      "Tidak ada; disimulasikan"
     ],
     [
      "Repurchase Intention (RI)",
      "Consequence",
      "RI1 - RI5",
      "TotalRI",
      "ELY1-5 (TotalPI)"
     ],
     [
      "Gender",
      "Control",
      "1 kolom",
      "-",
      "Tidak ada; disimulasikan"
     ],
     [
      "Usia",
      "Control (kovariat)",
      "1 kolom",
      "-",
      "Tidak ada; disimulasikan"
     ],
     [
      "Frekuensi belanja online",
      "Control (kelompok)",
      "1 kolom",
      "-",
      "Tidak ada; disimulasikan"
     ]
    ]
   },
   {
    "t": "Variable View (cuplikan)",
    "h": [
     "Name",
     "Type",
     "Label",
     "Values",
     "Measure"
    ],
    "r": [
     [
      "Resp",
      "Numeric",
      "Nomor responden",
      "None",
      "Scale"
     ],
     [
      "CE1",
      "Numeric",
      "Selebriti pendukung produk ini kredibel",
      "1 = Sangat Tidak Setuju ... 10 = Sangat Setuju",
      "Ordinal"
     ],
     [
      "TotalCE",
      "Numeric",
      "Total Celebrity Endorse",
      "None",
      "Scale"
     ],
     [
      "Gender",
      "Numeric",
      "Jenis kelamin",
      "1 = Laki-laki, 2 = Perempuan",
      "Nominal"
     ],
     [
      "Usia",
      "Numeric",
      "Usia (tahun)",
      "None",
      "Scale"
     ],
     [
      "Frekuensi",
      "Numeric",
      "Frekuensi belanja online per bulan",
      "1 = 1-2 kali, 2 = 3-5 kali, 3 = Lebih dari 5 kali",
      "Ordinal"
     ]
    ],
    "n": "Total 35 variabel: Resp, 25 butir, 5 total, Gender, Usia, Frekuensi, dan Asal_Data."
   }
  ],
  "read": [
   [
    "Antecedent (penyebab)",
    "Variabel yang mendahului dan memengaruhi variabel lain. Pada diagram dosen: Celebrity Endorse, Fear of Missing Out, dan Perceived Price."
   ],
   [
    "Consequence (akibat)",
    "Variabel yang dipengaruhi, yaitu hasil akhir model: Repurchase Intention."
   ],
   [
    "Intervening (perantara)",
    "Variabel yang berada di tengah jalur antecedent ke consequence. Diagram dosen belum memilikinya; kita tambahkan Customer Satisfaction agar lengkap sebagai variabel kelima."
   ],
   [
    "Control (kendali)",
    "Variabel yang tidak menjadi inti hipotesis tetapi dikendalikan atau dibandingkan: Gender, Usia, dan Frekuensi belanja online. Di soal ini mereka menjadi pembanding kelompok (t-test, ANOVA, MANOVA) dan kovariat (ANCOVA)."
   ],
   [
    "25 parameter",
    "Lima variabel × lima indikator = 25 butir pertanyaan. Diagram dosen baru memuat empat variabel (20 indikator), karena itu variabel perantara ditambahkan."
   ],
   [
    "350 responden",
    "File latihan berisi 350 baris: 222 responden dari data dosen dan 128 responden tambahan hasil simulasi (kolom Asal_Data memisahkannya)."
   ]
  ],
  "concl": "Model akhir: **CE, FOMO, PP (antecedent) → SAT (intervening) → RI (consequence)**, dengan Gender, Usia, dan Frekuensi belanja sebagai variabel kontrol.",
  "tip": "Isi butir pada file asli dosen (aplikasi e-grocery, kolom ESQ, PV, CS, ELY) tidak cocok dengan nama variabel di diagram, jadi kolomnya dipetakan berdasarkan urutan dan dinamai ulang. Data demografi dan variabel SAT tidak ada di file dosen, jadi disimulasikan. Itu aman untuk latihan, tetapi jangan dipakai sebagai data penelitian sungguhan. Satu hal lagi: label nilai 3 sampai 5 di file (Kurang Setuju, Agak Tidak Setuju, Sedikit Tidak Setuju) urutannya kurang rapi. Abaikan labelnya dan baca angka 1 sampai 10 sebagai makin besar makin setuju.",
  "interp": [
   "Peran variabel menentukan alur analisis: CE, FOMO, dan PP diposisikan sebagai penyebab (antecedent) yang diduga memengaruhi Customer Satisfaction (intervening), dan kepuasan itu diduga memengaruhi Repurchase Intention (consequence).",
   "Gender, Usia, dan Frekuensi belanja online bukan inti hipotesis. Ketiganya dipakai untuk membandingkan kelompok dan mengendalikan pengaruh luar pada langkah 7 sampai 10.",
   "Untuk laporan, tulis: “Model penelitian terdiri atas lima variabel dengan masing-masing lima indikator (25 butir), diukur pada skala 1 sampai 10 dari 350 responden.” Perlu dicatat, langkah-langkah di sini menguji kualitas instrumen dan perbedaan kelompok. Pengaruh antar variabel (CE, FOMO, PP → SAT → RI) belum diuji."
  ],
  "uts": 1,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "Peta peran variabel (tabel di atas)",
     "**Ya**",
     "Dibuat dan diketik sendiri di Word; bukan output SPSS"
    ],
    [
     "Variable View",
     "Opsional",
     "Screenshot cuplikan Variable View sebagai lampiran instrumen"
    ],
    [
     "Output Viewer",
     "Tidak ada",
     "Langkah ini belum menghasilkan tabel output"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 },
 {
  "id": "deskriptif-uts",
  "t": "Mean, Median, dan Rata-rata",
  "path": [
   "Analyze",
   "Descriptive Statistics",
   "Frequencies"
  ],
  "file": "Data_Latihan_UTS.sav",
  "goal": "Menghitung ukuran pemusatan (mean atau rata-rata, median) dan sebaran tiap variabel dari 350 responden.",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka menu",
    "`Analyze › Descriptive Statistics › Frequencies`."
   ],
   [
    "Pilih variabel",
    "Pindahkan TotalCE, TotalFOMO, TotalPP, TotalSAT, dan TotalRI ke kotak **Variable(s)**. Jika kotak variabel masih berisi isian dari analisis sebelumnya, klik **Reset** dulu."
   ],
   [
    "Matikan tabel frekuensi",
    "Hapus centang **Display frequency tables** (di kiri bawah) supaya output tidak penuh daftar frekuensi."
   ],
   [
    "Pilih statistik",
    "Klik **Statistics**. Di *Central Tendency* centang **Mean**, **Median**, dan **Mode**; di *Dispersion* centang **Std. deviation**, **Minimum**, dan **Maximum**. Klik **Continue**."
   ],
   [
    "Jalankan",
    "Klik **OK**. Muncul satu tabel **Statistics** berisi kelima variabel."
   ],
   [
    "Profil responden",
    "Ulangi `Analyze › Descriptive Statistics › Frequencies`, klik **Reset**, lalu pindahkan Gender dan Frekuensi ke Variable(s). Kali ini biarkan **Display frequency tables** tercentang dan tidak perlu membuka Statistics. Klik **OK**. Lalu buka `Analyze › Descriptive Statistics › Descriptives`, pindahkan Usia ke Variable(s) (pilihan di Options biarkan default: Mean, Std. deviation, Minimum, Maximum), klik **OK**."
   ],
   [
    "Kategorikan rata-rata",
    "Bagi mean tiap variabel total dengan 5 untuk mendapat rata-rata per butir, lalu cocokkan dengan kelas pada Aturan keputusan di atas. Tabel kategorinya dibuat sendiri di Word."
   ]
  ],
  "out": [
   {
    "t": "Statistics",
    "h": [
     "",
     "TotalCE",
     "TotalFOMO",
     "TotalPP",
     "TotalSAT",
     "TotalRI"
    ],
    "r": [
     [
      "N Valid",
      "350",
      "350",
      "350",
      "350",
      "350"
     ],
     [
      "Missing",
      "0",
      "0",
      "0",
      "0",
      "0"
     ],
     [
      "Mean",
      "{{39,69}}",
      "{{39,77}}",
      "{{39,90}}",
      "{{40,01}}",
      "{{39,55}}"
     ],
     [
      "Median",
      "{{40,00}}",
      "{{39,50}}",
      "{{40,00}}",
      "{{40,00}}",
      "{{40,00}}"
     ],
     [
      "Mode",
      "42",
      "38",
      "40",
      "43",
      "40"
     ],
     [
      "Std. Deviation",
      "4,325",
      "4,457",
      "4,454",
      "4,195",
      "4,519"
     ],
     [
      "Minimum",
      "26",
      "25",
      "26",
      "25",
      "28"
     ],
     [
      "Maximum",
      "49",
      "50",
      "50",
      "50",
      "50"
     ]
    ],
    "n": null
   },
   {
    "t": "Profil responden (Frequencies dan Descriptives)",
    "h": [
     "Variabel",
     "Kategori",
     "Frekuensi",
     "Persen"
    ],
    "r": [
     [
      "Gender",
      "Laki-laki",
      "166",
      "47,4"
     ],
     [
      "",
      "Perempuan",
      "184",
      "52,6"
     ],
     [
      "Frekuensi belanja",
      "1-2 kali",
      "105",
      "30,0"
     ],
     [
      "",
      "3-5 kali",
      "140",
      "40,0"
     ],
     [
      "",
      "Lebih dari 5 kali",
      "105",
      "30,0"
     ],
     [
      "Usia (tahun)",
      "Mean 26,02; Median 26; SD 5,49",
      "Min 17",
      "Max 43"
     ]
    ],
    "n": null
   },
   {
    "t": "Rata-rata per butir dan kategorinya (skala 1-10)",
    "h": [
     "Variabel",
     "Mean total",
     "Mean per butir",
     "Kategori"
    ],
    "r": [
     [
      "TotalCE",
      "39,69",
      "7,94",
      "Tinggi"
     ],
     [
      "TotalFOMO",
      "39,77",
      "7,95",
      "Tinggi"
     ],
     [
      "TotalPP",
      "39,90",
      "7,98",
      "Tinggi"
     ],
     [
      "TotalSAT",
      "40,01",
      "8,00",
      "Tinggi"
     ],
     [
      "TotalRI",
      "39,55",
      "7,91",
      "Tinggi"
     ]
    ],
    "n": "Mean per butir = mean total dibagi 5. Kelas: 1,0-2,8 sangat rendah; 2,9-4,6 rendah; 4,7-6,4 sedang; 6,5-8,2 tinggi; 8,3-10 sangat tinggi."
   }
  ],
  "read": [
   [
    "N Valid dan Missing",
    "Semua 350 responden terisi lengkap, tidak ada data hilang."
   ],
   [
    "Mean (rata-rata)",
    "Rata-rata kelima variabel nyaris sama, sekitar 39,55 sampai 40,01 dari rentang total 5 sampai 50 (lima butir dengan skor 1 sampai 10). Artinya responden cenderung setuju."
   ],
   [
    "Median",
    "Nilai tengahnya 39,5 sampai 40,0, hampir sama dengan mean. Mean dan median yang berdekatan menandakan sebaran yang kurang lebih simetris."
   ],
   [
    "Mode",
    "Nilai yang paling sering muncul; bisa lebih dari satu, dan SPSS hanya menampilkan yang terkecil."
   ],
   [
    "Std. Deviation, Minimum, Maximum",
    "Simpangan baku sekitar 4,2 sampai 4,5. Skor terendah 25 dan tertinggi 50, jadi jawaban responden cukup beragam."
   ]
  ],
  "concl": "Tendensi sentral kelima variabel hampir identik: rata-rata sekitar **40** dan median **40** dengan sebaran yang mirip.",
  "tip": "“Average” pada perintah dosen sama dengan mean. Jika ingin rata-rata per butir (bukan total), pakai `Analyze › Descriptive Statistics › Descriptives` pada 25 butirnya.",
  "rule": "Skala 1-10 dibagi 5 kelas dengan lebar (10 − 1) / 5 = 1,8: 1,0-2,8 sangat rendah; 2,9-4,6 rendah; 4,7-6,4 sedang; 6,5-8,2 tinggi; 8,3-10 sangat tinggi. Rata-rata per butir = rata-rata total ÷ 5.",
  "interp": [
   "Responden terdiri atas 166 laki-laki (47,4%) dan 184 perempuan (52,6%). Frekuensi belanja online 1-2 kali sebesar 30,0%, 3-5 kali 40,0%, dan lebih dari 5 kali 30,0%. Usia rata-rata 26,02 tahun (rentang 17 sampai 43).",
   "Rata-rata per butir kelima variabel berada di 7,91 sampai 8,00, masuk kategori **tinggi**. Artinya responden rata-rata setuju terhadap pernyataan di semua variabel, dan tidak ada variabel yang menonjol dibanding yang lain.",
   "Mean (39,5 sampai 40,0) hampir sama dengan median dan simpangan baku 4,2 sampai 4,5 tergolong sedang, jadi jawaban responden terpusat di sekitar nilai tinggi dengan sebaran yang wajar."
  ],
  "uts": 2,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "Statistics (Frequencies kelima variabel total)",
     "**Ya**",
     "Mean, median, modus, simpangan baku, minimum, maksimum"
    ],
    [
     "Frequency Table Gender dan Frekuensi",
     "**Ya**",
     "Profil responden: Frequency dan Percent"
    ],
    [
     "Descriptive Statistics (Usia)",
     "**Ya**",
     "Rentang, rata-rata, dan simpangan baku usia"
    ],
    [
     "Rata-rata per butir dan kategorinya",
     "**Ya**",
     "Dihitung sendiri dari mean ÷ 5 (bukan output SPSS langsung)"
    ],
    [
     "Statistics untuk Gender dan Frekuensi (N Valid dan Missing)",
     "Lewati",
     "Cukup tulis N = 350"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 },
 {
  "id": "normalitas-uts",
  "t": "Distribusi Data (Normalitas)",
  "path": [
   "Analyze",
   "Descriptive Statistics",
   "Explore"
  ],
  "file": "Data_Latihan_UTS.sav",
  "goal": "Memeriksa apakah tiap variabel berdistribusi normal, lewat uji Kolmogorov-Smirnov, Shapiro-Wilk, skewness, kurtosis, dan histogram.",
  "hyp": "H0: data berdistribusi normal. HA: data tidak berdistribusi normal.",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka menu",
    "`Analyze › Descriptive Statistics › Explore`."
   ],
   [
    "Pilih variabel",
    "Pindahkan kelima variabel total ke kotak **Dependent List**. Kotak Factor List dan Label Cases by dikosongkan. Jika kotak variabel masih berisi isian dari analisis sebelumnya, klik **Reset** dulu."
   ],
   [
    "Atur tampilan",
    "Pada **Display** pilih **Both**, bukan Plots saja. Skewness dan kurtosis hanya ada di tabel Descriptives, dan tabel itu tidak muncul bila Display = Plots."
   ],
   [
    "Atur plot",
    "Klik **Plots**. Pada *Boxplots* pilih **None**. Pada *Descriptive* centang **Histogram** dan hapus centang **Stem-and-leaf**. Centang **Normality plots with tests**. Klik **Continue**."
   ],
   [
    "Jalankan",
    "Klik **OK**."
   ],
   [
    "Hitung rasio z",
    "Dari tabel **Descriptives** tiap variabel, bagi Skewness dengan Std. Error-nya dan Kurtosis dengan Std. Error-nya. Nilai di antara -1,96 dan 1,96 dianggap normal pada taraf 5%."
   ],
   [
    "Baca uji formal",
    "Pada tabel **Tests of Normality** lihat kolom Sig. Kolmogorov-Smirnov (dengan Lilliefors) dan Shapiro-Wilk. Sig > 0,05 berarti normal."
   ]
  ],
  "out": [
   {
    "t": "Tests of Normality",
    "h": [
     "",
     "K-S Statistic",
     "K-S df",
     "K-S Sig.",
     "Shapiro-Wilk Statistic",
     "S-W df",
     "S-W Sig."
    ],
    "r": [
     [
      "TotalCE",
      ",079",
      "350",
      "{{,000}}",
      ",987",
      "350",
      "{{,004}}"
     ],
     [
      "TotalFOMO",
      ",068",
      "350",
      "{{,000}}",
      ",990",
      "350",
      "{{,017}}"
     ],
     [
      "TotalPP",
      ",074",
      "350",
      "{{,000}}",
      ",990",
      "350",
      "{{,021}}"
     ],
     [
      "TotalSAT",
      ",071",
      "350",
      "{{,000}}",
      ",988",
      "350",
      "{{,007}}"
     ],
     [
      "TotalRI",
      ",060",
      "350",
      "{{,005}}",
      ",989",
      "350",
      "{{,010}}"
     ]
    ],
    "n": "Kolmogorov-Smirnov memakai Lilliefors Significance Correction. Digit terakhir nilai sig bisa berbeda tipis di SPSS-mu."
   },
   {
    "t": "Skewness dan Kurtosis (dari tabel Descriptives)",
    "h": [
     "",
     "Skewness",
     "Std. Error",
     "Kurtosis",
     "Std. Error"
    ],
    "r": [
     [
      "TotalCE",
      "-,266",
      ",130",
      "-,104",
      ",260"
     ],
     [
      "TotalFOMO",
      "-,043",
      ",130",
      "-,275",
      ",260"
     ],
     [
      "TotalPP",
      "-,180",
      ",130",
      "-,196",
      ",260"
     ],
     [
      "TotalSAT",
      "-,282",
      ",130",
      "-,027",
      ",260"
     ],
     [
      "TotalRI",
      ",099",
      ",130",
      "-,241",
      ",260"
     ]
    ]
   },
   {
    "t": "Rasio z skewness dan kurtosis (nilai dibagi Std. Error)",
    "h": [
     "",
     "z Skewness",
     "z Kurtosis",
     "Dalam ±1,96?"
    ],
    "r": [
     [
      "TotalCE",
      "-2,04",
      "-0,40",
      "Skewness sedikit di luar"
     ],
     [
      "TotalFOMO",
      "-0,33",
      "-1,06",
      "Ya"
     ],
     [
      "TotalPP",
      "-1,38",
      "-0,75",
      "Ya"
     ],
     [
      "TotalSAT",
      "-2,16",
      "-0,10",
      "Skewness sedikit di luar"
     ],
     [
      "TotalRI",
      "0,76",
      "-0,93",
      "Ya"
     ]
    ],
    "n": "SPSS tidak menampilkan kolom ini; hitung sendiri: skewness (atau kurtosis) dibagi Std. Error-nya (,130 untuk skewness; ,260 untuk kurtosis)."
   },
   {
    "t": "Histogram TotalRI (sebaran asli data latihan)",
    "chart": [
     0,
     3,
     15,
     32,
     38,
     80,
     69,
     100,
     65,
     42,
     25,
     23
    ],
    "lab": [
     "26-27",
     "28-29",
     "30-31",
     "32-33",
     "34-35",
     "36-37",
     "38-39",
     "40-41",
     "42-43",
     "44-45",
     "46-47",
     "48-50"
    ],
    "n": "Sumbu mendatar: rentang skor total. Banyak responden per rentang: 0, 2, 11, 23, 27, 57, 49, 71, 46, 30, 18, 16 (jumlah 350). Puncak di 40-41, lalu melandai ke kedua sisi."
   }
  ],
  "read": [
   [
    "Uji formal",
    "Sig Kolmogorov-Smirnov dan Shapiro-Wilk semuanya di bawah 0,05, jadi H0 ditolak: secara uji formal data tidak normal sempurna."
   ],
   [
    "Skewness dan kurtosis",
    "Skewness berkisar -,28 sampai ,10 dan kurtosis -,28 sampai -,03. Keduanya dekat dengan 0, yang menandakan bentuk mendekati lonceng."
   ],
   [
    "Histogram",
    "Puncak tertinggi ada di rentang 40-41 dan batang melandai ke kedua sisi. Bentuknya mirip lonceng dan cukup simetris, walau ada sedikit gerigi (57, 49, 71) karena jumlah rentangnya banyak."
   ],
   [
    "Mengapa berbeda",
    "Dengan 350 responden, uji formal sangat peka sehingga penyimpangan kecil pun ditolak. Karena itu bentuk grafik, skewness, dan kurtosis perlu dibaca bersama."
   ]
  ],
  "concl": "Data **tidak normal secara uji formal**, tetapi bentuknya **mendekati normal**. Uji t dan ANOVA bersifat robust terhadap penyimpangan sekecil ini, sehingga analisis parametrik dapat dilanjutkan dengan catatan di laporan.",
  "tip": "Di laporan tulis kedua temuannya: uji formal menolak normalitas, namun skewness, kurtosis, dan histogram mendukung kenormalan. Menyembunyikan salah satunya akan melemahkan argumenmu.",
  "rule": "Uji formal: sig > 0,05 berarti H0 diterima (data normal). Skewness dan kurtosis dibagi Std. Error; |z| < 1,96 dianggap normal pada taraf 5%. Pada sampel besar banyak peneliti cukup memakai batas skewness dan kurtosis antara −2 dan +2 (George & Mallery) bersama histogram.",
  "interp": [
   "Kolmogorov-Smirnov dan Shapiro-Wilk menolak normalitas pada kelima variabel (sig ,000 sampai ,021). Itu belum berarti datanya buruk: dengan N = 350 kedua uji ini menolak penyimpangan yang sangat kecil.",
   "Skewness negatif pada CE, FOMO, PP, dan SAT berarti ekor sedikit memanjang ke nilai rendah, sedangkan mayoritas responden berskor tinggi. TotalRI justru sedikit miring ke kanan (,099). Semua skewness dan kurtosis berada di antara −2 dan +2.",
   "Jika dibagi Std. Error, z skewness CE (−2,04) dan SAT (−2,16) sedikit melewati 1,96, sedangkan tiga variabel lain tidak. Jadi kemiringan CE dan SAT memang ada tetapi ringan, dan tidak mengubah keputusan memakai uji parametrik.",
   "Untuk laporan, tulis: “Data mendekati distribusi normal (skewness dan kurtosis dalam rentang ±2, histogram berbentuk lonceng); analisis parametrik dilanjutkan dengan catatan kemiringan ringan pada CE dan SAT.”"
  ],
  "uts": 3,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "Tests of Normality",
     "**Ya**",
     "Kolmogorov-Smirnov dan Shapiro-Wilk; kelima variabel sudah dalam satu tabel"
    ],
    [
     "Descriptives (lima tabel, satu per variabel)",
     "**Ya, sebagian**",
     "Ambil hanya baris Skewness dan Kurtosis (Statistic dan Std. Error), gabungkan menjadi satu tabel di Word, lalu tambahkan kolom rasio z"
    ],
    [
     "Histogram",
     "Opsional",
     "Gambar pendukung; cukup satu atau dua contoh, sisanya ke lampiran"
    ],
    [
     "Normal Q-Q Plot dan Detrended Normal Q-Q Plot",
     "Opsional",
     "Gambar pendukung kenormalan"
    ],
    [
     "Case Processing Summary",
     "Lewati",
     "Cukup tulis N = 350"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 },
 {
  "id": "validitas-uts",
  "t": "Uji Validitas Butir",
  "path": [
   "Analyze",
   "Correlate",
   "Bivariate"
  ],
  "file": "Data_Latihan_UTS.sav",
  "goal": "Menguji apakah tiap butir pertanyaan valid, lewat korelasi Pearson butir dengan skor total variabelnya.",
  "hyp": "Butir valid jika korelasinya dengan skor total signifikan (sig kurang dari 0,05) dan r hitung lebih besar dari r tabel.",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka menu",
    "`Analyze › Correlate › Bivariate`."
   ],
   [
    "Isi variabel (variabel pertama)",
    "Masukkan CE1 sampai CE5 dan **TotalCE** ke kotak **Variables**. Jika kotak variabel masih berisi isian dari analisis sebelumnya, klik **Reset** dulu."
   ],
   [
    "Atur opsi",
    "Pada *Correlation Coefficients* centang **Pearson**; pada *Test of Significance* pilih **Two-tailed**; centang **Flag significant correlations**. Tombol Options tidak perlu dibuka."
   ],
   [
    "Jalankan",
    "Klik **OK**."
   ],
   [
    "Baca kolom skor total",
    "Pada tabel **Correlations**, lihat kolom **TotalCE** saja: baris *Pearson Correlation* adalah r hitung tiap butir, dan baris *Sig. (2-tailed)* adalah signifikansinya. Bandingkan r hitung dengan r tabel 0,105 (df = N − 2 = 348, taraf 5%)."
   ],
   [
    "Ulangi untuk variabel lain",
    "Ulangi langkah 3 sampai 6 untuk FOMO (dengan TotalFOMO), PP (TotalPP), SAT (TotalSAT), dan RI (TotalRI). Total ada lima kali running."
   ]
  ],
  "out": [
   {
    "t": "Korelasi butir dengan skor total (ringkasan dari lima kali running, N = 350)",
    "h": [
     "Butir",
     "Pearson r",
     "Sig. (2-tailed)",
     "r tabel (5%, N = 350)",
     "Keputusan"
    ],
    "r": [
     [
      "CE1",
      ",821",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "CE2",
      ",824",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "CE3",
      ",834",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "CE4",
      ",791",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "CE5",
      ",847",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "FOMO1",
      ",862",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "FOMO2",
      ",863",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "FOMO3",
      ",844",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "FOMO4",
      ",839",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "FOMO5",
      ",845",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "PP1",
      ",846",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "PP2",
      ",818",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "PP3",
      ",854",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "PP4",
      ",870",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "PP5",
      ",816",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "SAT1",
      ",842",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "SAT2",
      ",846",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "SAT3",
      ",775",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "SAT4",
      ",806",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "SAT5",
      ",820",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "RI1",
      ",886",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "RI2",
      ",890",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "RI3",
      ",855",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "RI4",
      ",888",
      ",000",
      ",105",
      "Valid"
     ],
     [
      "RI5",
      ",889",
      ",000",
      ",105",
      "Valid"
     ]
    ],
    "n": "r tabel diambil dari tabel nilai kritis r pada df = 348 dan taraf 5% (dua sisi)."
   }
  ],
  "read": [
   [
    "Pearson r",
    "Semua butir berkorelasi ,775 sampai ,890 dengan skor total variabelnya."
   ],
   [
    "Sig. (2-tailed)",
    "Seluruhnya 0,000, jauh di bawah 0,05."
   ],
   [
    "Bandingkan dengan r tabel",
    "Semua r hitung jauh lebih besar dari r tabel (,105). Aturan: butir valid jika r hitung lebih besar dari r tabel."
   ],
   [
    "Kategori Guilford",
    "23 butir masuk sangat tinggi (di atas 0,80) dan 2 butir masuk tinggi (0,60 sampai 0,80)."
   ]
  ],
  "concl": "Seluruh **25 butir valid**, tidak ada yang perlu dibuang.",
  "tip": "Korelasi butir dengan total cenderung tinggi karena butir itu sendiri ikut membentuk total. Pembandingnya yang lebih ketat adalah Corrected Item-Total Correlation di analisis reliabilitas.",
  "rule": "Butir valid jika sig < 0,05 dan r hitung > r tabel. r tabel = 0,105 (df = N − 2 = 348, taraf 5%). Ukuran lain yang sering dipakai: r ≥ 0,30. Kekuatan hubungan (Guilford): 0,60-0,80 tinggi; 0,80-1,00 sangat tinggi.",
  "interp": [
   "Seluruh butir punya r hitung antara ,775 (SAT3) dan ,890 (RI2), jauh di atas r tabel 0,105 dengan sig 0,000. Setiap butir bergerak searah dengan skor total variabelnya, jadi butir-butir itu benar mengukur konstruk yang sama.",
   "Tidak ada butir yang digugurkan, sehingga 25 butir dipakai utuh pada analisis berikutnya. Untuk laporan, tulis: “Seluruh butir valid (r hitung ,775 sampai ,890 > r tabel ,105; p < 0,05).”"
  ],
  "uts": 4,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "Correlations (lima tabel, satu per variabel)",
     "**Ya, sebagian**",
     "Dari tiap tabel ambil kolom skor total saja (misalnya TotalCE): Pearson Correlation, Sig. (2-tailed), dan N. Gabungkan kelimanya menjadi satu tabel: butir, r hitung, r tabel, Sig., keputusan"
    ],
    [
     "Baris dan kolom korelasi antar butir",
     "Lewati",
     "Bukan bagian uji validitas butir-total"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 },
 {
  "id": "reliabilitas-uts",
  "t": "Uji Reliabilitas (Cronbach's Alpha)",
  "path": [
   "Analyze",
   "Scale",
   "Reliability Analysis"
  ],
  "file": "Data_Latihan_UTS.sav",
  "goal": "Menguji konsistensi internal kelima variabel, masing-masing dengan lima butir.",
  "hyp": "Variabel reliabel jika Cronbach's alpha di atas 0,70 (Nunnally, 1994).",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka menu",
    "`Analyze › Scale › Reliability Analysis`."
   ],
   [
    "Isi item (variabel pertama)",
    "Masukkan CE1 sampai CE5 ke kotak **Items**. Pastikan Model = **Alpha**. Kotak Scale label boleh dikosongkan. Jika kotak variabel masih berisi isian dari analisis sebelumnya, klik **Reset** dulu."
   ],
   [
    "Atur statistik",
    "Klik **Statistics**. Pada *Descriptives for* centang **Item**, **Scale**, dan **Scale if item deleted**. Pilihan lain biarkan kosong. Klik **Continue**."
   ],
   [
    "Jalankan",
    "Klik **OK**."
   ],
   [
    "Baca tabel",
    "Alpha ada di tabel **Reliability Statistics** (kolom Cronbach's Alpha). Corrected Item-Total Correlation dan Cronbach's Alpha if Item Deleted ada di tabel **Item-Total Statistics**; tabel ini hanya muncul karena Scale if item deleted dicentang."
   ],
   [
    "Ulangi untuk variabel lain",
    "Ulangi langkah 3 sampai 6 untuk FOMO, PP, SAT, dan RI. Total lima kali running."
   ]
  ],
  "out": [
   {
    "t": "Reliability Statistics (contoh: Celebrity Endorse)",
    "h": [
     "Cronbach's Alpha",
     "Alpha Based on Standardized Items",
     "N of Items"
    ],
    "r": [
     [
      "{{,881}}",
      ",881",
      "5"
     ]
    ]
   },
   {
    "t": "Item-Total Statistics (Celebrity Endorse)",
    "h": [
     "",
     "Scale Mean if Item Deleted",
     "Scale Variance if Item Deleted",
     "Corrected Item-Total Correlation",
     "Squared Multiple Correlation",
     "Cronbach's Alpha if Item Deleted"
    ],
    "r": [
     [
      "CE1",
      "31,74",
      "12,438",
      ",715",
      ",528",
      "{{,856}}"
     ],
     [
      "CE2",
      "31,75",
      "12,266",
      ",715",
      ",512",
      "{{,856}}"
     ],
     [
      "CE3",
      "31,74",
      "12,113",
      ",727",
      ",538",
      "{{,853}}"
     ],
     [
      "CE4",
      "31,74",
      "12,848",
      ",674",
      ",458",
      "{{,865}}"
     ],
     [
      "CE5",
      "31,78",
      "11,977",
      ",747",
      ",571",
      "{{,848}}"
     ]
    ]
   },
   {
    "t": "Item-Total Statistics keempat variabel lain (ringkasan)",
    "h": [
     "Variabel",
     "Corrected Item-Total (terendah - tertinggi)",
     "Alpha if Item Deleted (terendah - tertinggi)",
     "Butir paling lemah"
    ],
    "r": [
     [
      "FOMO",
      ",742 - ,779",
      ",878 - ,886",
      "FOMO4 (,742)"
     ],
     [
      "PP",
      ",704 - ,793",
      ",862 - ,882",
      "PP2 (,704)"
     ],
     [
      "SAT",
      ",651 - ,745",
      ",841 - ,863",
      "SAT3 (,651)"
     ],
     [
      "RI",
      ",769 - ,827",
      ",909 - ,920",
      "RI3 (,769)"
     ]
    ],
    "n": "Untuk CE lihat tabel di atas (Corrected Item-Total ,674 - ,747; Alpha if Item Deleted ,848 - ,865). Pada keempat variabel ini juga tidak ada butir yang jika dibuang membuat alpha naik di atas alpha awalnya."
   },
   {
    "t": "Ringkasan alpha kelima variabel (hasil lima kali running)",
    "h": [
     "Variabel",
     "Cronbach's Alpha",
     "N of Items",
     "Keputusan"
    ],
    "r": [
     [
      "Celebrity Endorse (CE)",
      "{{,881}}",
      "5",
      "Reliabel"
     ],
     [
      "Fear of Missing Out (FOMO)",
      "{{,904}}",
      "5",
      "Reliabel"
     ],
     [
      "Perceived Price (PP)",
      "{{,896}}",
      "5",
      "Reliabel"
     ],
     [
      "Customer Satisfaction (SAT)",
      "{{,876}}",
      "5",
      "Reliabel"
     ],
     [
      "Repurchase Intention (RI)",
      "{{,928}}",
      "5",
      "Reliabel"
     ]
    ]
   }
  ],
  "read": [
   [
    "Reliability Statistics",
    "Alpha Celebrity Endorse = ,881, lebih besar dari 0,70."
   ],
   [
    "Alpha if Item Deleted",
    "Jika satu butir dibuang, alpha turun menjadi ,848 sampai ,865 (semuanya di bawah ,881). Tidak ada butir yang perlu dibuang."
   ],
   [
    "Corrected Item-Total",
    "Korelasi tiap butir dengan sisa butir lain berkisar ,674 sampai ,747, cukup kuat."
   ],
   [
    "Ringkasan lima variabel",
    "Alpha kelima variabel berkisar ,876 sampai ,928, seluruhnya di atas 0,70."
   ]
  ],
  "concl": "Kelima variabel **reliabel**. Instrumen konsisten untuk dipakai pada analisis berikutnya.",
  "tip": "Selalu baca kolom Alpha if Item Deleted: bila ada butir yang jika dibuang membuat alpha naik, butir itu patut dicurigai dan boleh dipertimbangkan untuk dibuang.",
  "rule": "Variabel reliabel jika Cronbach's alpha > 0,70 (Nunnally, 1994). Periksa juga Corrected Item-Total Correlation (sebaiknya ≥ 0,30) dan Alpha if Item Deleted (tidak boleh lebih besar dari alpha awal).",
  "interp": [
   "Alpha kelima variabel (,876 sampai ,928) jauh di atas 0,70. RI paling konsisten (,928), SAT paling rendah tetapi tetap baik (,876).",
   "Tidak ada butir yang jika dibuang menaikkan alpha, dan Corrected Item-Total terendah (,651 pada SAT3) masih jauh di atas 0,30. Jadi kelima instrumen konsisten dan layak dipakai tanpa membuang butir.",
   "Alpha FOMO (,904) dan RI (,928) sudah di atas 0,90. Itu masih wajar, tetapi alpha yang terlalu tinggi kadang menandakan butir-butirnya mirip satu sama lain. Untuk laporan, tulis: “Seluruh variabel reliabel (Cronbach's alpha ,876 sampai ,928 > 0,70).”"
  ],
  "uts": 5,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "Reliability Statistics",
     "**Ya**",
     "Cronbach's Alpha dan N of Items; gabungkan kelima variabel menjadi satu tabel"
    ],
    [
     "Item-Total Statistics",
     "**Ya**",
     "Corrected Item-Total Correlation dan Alpha if Item Deleted; kolom Scale Mean dan Scale Variance if Item Deleted boleh dihapus"
    ],
    [
     "Item Statistics",
     "Opsional",
     "Mean dan simpangan baku tiap butir, bila diminta"
    ],
    [
     "Case Processing Summary dan Scale Statistics",
     "Lewati",
     "Cukup tulis N = 350"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 },
 {
  "id": "faktor-uts",
  "t": "Analisis Faktor (Validitas Konstruk)",
  "path": [
   "Analyze",
   "Dimension Reduction",
   "Factor"
  ],
  "file": "Data_Latihan_UTS.sav",
  "goal": "Memeriksa apakah 25 butir mengelompok menjadi lima faktor sesuai kelima variabelnya (validitas konstruk).",
  "hyp": "Harapan: tiap lima butir sebuah variabel berkumpul pada satu faktor yang sama.",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka menu",
    "`Analyze › Dimension Reduction › Factor` (di SPSS lama menunya bernama Data Reduction)."
   ],
   [
    "Isi variabel",
    "Masukkan seluruh 25 butir (CE1 sampai RI5) ke kotak **Variables**. Jangan masukkan kolom Total, Gender, Usia, Frekuensi, atau Asal_Data."
   ],
   [
    "Minta KMO dan Bartlett",
    "Klik **Descriptives**, centang **KMO and Bartlett's test of sphericity**. Opsional: centang **Anti-image** untuk melihat MSA per butir. Klik **Continue**."
   ],
   [
    "Atur ekstraksi",
    "Klik **Extraction**. Method = **Principal components** (default), Analyze = **Correlation matrix**, centang **Scree plot**, dan pada *Extract* biarkan **Based on Eigenvalue** dengan *Eigenvalues greater than* = 1. Klik **Continue**."
   ],
   [
    "Atur rotasi",
    "Klik **Rotation**, pilih **Varimax**, centang **Rotated solution**. Klik **Continue**."
   ],
   [
    "Rapikan tampilan",
    "Klik **Options**. Missing Values = **Exclude cases listwise**. Pada *Coefficient Display Format* centang **Sorted by size** dan **Suppress small coefficients**, lalu isi *Absolute value below* dengan 0,40 (ketik `.40` atau `,40` sesuai pengaturan desimal komputer). Klik **Continue**."
   ],
   [
    "Jalankan",
    "Klik **OK**."
   ],
   [
    "Baca berurutan",
    "Baca KMO and Bartlett's Test dulu, lalu Total Variance Explained (jumlah komponen eigenvalue > 1), lalu Rotated Component Matrix (butir mengelompok ke faktor yang mana). Nomor komponen bisa berbeda dari contoh di bawah, karena SPSS mengurutkannya berdasarkan varians."
   ]
  ],
  "out": [
   {
    "t": "KMO and Bartlett's Test",
    "h": [
     "Ukuran",
     "",
     "Nilai"
    ],
    "r": [
     [
      "Kaiser-Meyer-Olkin Measure of Sampling Adequacy",
      "",
      "{{,934}}"
     ],
     [
      "Bartlett's Test of Sphericity",
      "Approx. Chi-Square",
      "5902,304"
     ],
     [
      "",
      "df",
      "300"
     ],
     [
      "",
      "Sig.",
      "{{,000}}"
     ]
    ]
   },
   {
    "t": "Total Variance Explained (enam komponen pertama)",
    "h": [
     "Component",
     "Eigenvalue Total",
     "% of Variance",
     "Cumulative %",
     "Rotation Total",
     "Rotation % Var.",
     "Rotation Cum. %"
    ],
    "r": [
     [
      "1",
      "{{10,116}}",
      "40,464",
      "40,464",
      "3,971",
      "15,884",
      "15,884"
     ],
     [
      "2",
      "{{3,317}}",
      "13,270",
      "53,734",
      "3,732",
      "14,927",
      "30,812"
     ],
     [
      "3",
      "{{1,887}}",
      "7,550",
      "61,284",
      "3,576",
      "14,304",
      "45,116"
     ],
     [
      "4",
      "{{1,602}}",
      "6,408",
      "67,692",
      "3,469",
      "13,875",
      "58,991"
     ],
     [
      "5",
      "{{1,006}}",
      "4,023",
      "71,714",
      "3,181",
      "12,723",
      "71,714"
     ],
     [
      "6",
      ",550",
      "2,201",
      "73,915",
      "",
      "",
      ""
     ]
    ],
    "n": "Kolom Extraction identik dengan Initial sehingga tidak ditampilkan."
   },
   {
    "t": "Rotated Component Matrix (Varimax, nilai di bawah 0,40 disembunyikan)",
    "h": [
     "",
     "Component 1",
     "Component 2",
     "Component 3",
     "Component 4",
     "Component 5"
    ],
    "r": [
     [
      "CE1",
      "",
      "",
      "{{,744}}",
      "",
      ""
     ],
     [
      "CE2",
      "",
      "",
      "{{,783}}",
      "",
      ""
     ],
     [
      "CE3",
      "",
      "",
      "{{,736}}",
      "",
      ""
     ],
     [
      "CE4",
      "",
      "",
      "{{,698}}",
      "",
      ""
     ],
     [
      "CE5",
      "",
      "",
      "{{,747}}",
      "",
      ""
     ],
     [
      "FOMO1",
      "",
      "",
      "",
      "",
      "{{,730}}"
     ],
     [
      "FOMO2",
      "",
      "",
      "",
      "",
      "{{,718}}"
     ],
     [
      "FOMO3",
      "",
      "",
      "",
      "",
      "{{,739}}"
     ],
     [
      "FOMO4",
      "",
      "",
      "",
      "",
      "{{,681}}"
     ],
     [
      "FOMO5",
      "",
      "",
      "",
      "",
      "{{,652}}"
     ],
     [
      "PP1",
      "",
      "{{,779}}",
      "",
      "",
      ""
     ],
     [
      "PP2",
      "",
      "{{,782}}",
      "",
      "",
      ""
     ],
     [
      "PP3",
      "",
      "{{,802}}",
      "",
      "",
      ""
     ],
     [
      "PP4",
      "",
      "{{,781}}",
      "",
      "",
      ""
     ],
     [
      "PP5",
      "",
      "{{,706}}",
      "",
      "",
      ""
     ],
     [
      "SAT1",
      "",
      "",
      "",
      "{{,773}}",
      ""
     ],
     [
      "SAT2",
      "",
      "",
      "",
      "{{,809}}",
      ""
     ],
     [
      "SAT3",
      "",
      "",
      "",
      "{{,742}}",
      ""
     ],
     [
      "SAT4",
      "",
      "",
      "",
      "{{,738}}",
      ""
     ],
     [
      "SAT5",
      "",
      "",
      "",
      "{{,781}}",
      ""
     ],
     [
      "RI1",
      "{{,835}}",
      "",
      "",
      "",
      ""
     ],
     [
      "RI2",
      "{{,863}}",
      "",
      "",
      "",
      ""
     ],
     [
      "RI3",
      "{{,828}}",
      "",
      "",
      "",
      ""
     ],
     [
      "RI4",
      "{{,860}}",
      "",
      "",
      "",
      ""
     ],
     [
      "RI5",
      "{{,832}}",
      "",
      "",
      "",
      ""
     ]
    ],
    "n": "Nomor dan urutan komponen di SPSS-mu bisa berbeda dari tabel ini; yang penting adalah pengelompokan butirnya."
   }
  ],
  "read": [
   [
    "KMO dan Bartlett",
    "KMO = ,934, jauh di atas syarat 0,50. Bartlett signifikan (0,000). Data layak dianalisis faktor."
   ],
   [
    "Total Variance Explained",
    "Lima komponen punya eigenvalue di atas 1 (10,116, 3,317, 1,887, 1,602, 1,006), jadi terbentuk lima faktor. Bersama-sama menjelaskan 71,714% variasi."
   ],
   [
    "Rotated Component Matrix",
    "Tiap lima butir sebuah variabel berkumpul pada satu komponen yang sama (Component 1 = RI; Component 2 = PP; Component 3 = CE; Component 4 = SAT; Component 5 = FOMO). Loading utamanya berkisar ,65 sampai ,86."
   ],
   [
    "Cross loading",
    "Tidak ada butir yang memuat 0,40 atau lebih pada komponen lain (yang tertinggi ,38), jadi kelima konstruk terpisah dengan jelas."
   ]
  ],
  "concl": "**Validitas konstruk terpenuhi**: kelima variabel membentuk lima faktor yang jelas dan setiap butir berada pada faktor yang semestinya.",
  "tip": "Eigenvalue komponen kelima (1,006) hanya tipis di atas 1. Jika dosen meminta jumlah faktor ditetapkan sesuai model, pilih Extraction › Fixed number of factors = 5. Perlu diingat, PCA + Varimax ini bersifat eksploratori; CFA sejati memakai SEM (AMOS atau SmartPLS).",
  "rule": "Data layak dianalisis faktor jika KMO > 0,50 dan Bartlett sig < 0,05. Jumlah faktor = jumlah komponen dengan eigenvalue > 1. Butir valid jika loading ≥ 0,40 pada faktornya dan tidak ≥ 0,40 pada faktor lain.",
  "interp": [
   "KMO ,934 (kategori luar biasa menurut Kaiser) dan Bartlett sig 0,000 menunjukkan korelasi antar butir cukup kuat untuk difaktorkan.",
   "Lima faktor menjelaskan 71,7% variasi (di atas batas umum 60%), dan pengelompokan butirnya persis sama dengan lima variabel yang dirancang: butir CE bersama CE, FOMO bersama FOMO, dan seterusnya. Itu bukti validitas konstruk.",
   "Loading utama ,65 sampai ,86 dan cross-loading tertinggi hanya ,38 (di bawah 0,40), jadi tidak ada butir yang ambigu. Butir FOMO paling dekat dengan faktor CE (cross-loading ,34 sampai ,38), jadi kedua konstruk sedikit tumpang tindih tetapi masih terpisah. Setelah rotasi, faktor RI menjelaskan variasi terbesar (15,9%) dan FOMO terkecil (12,7%)."
  ],
  "uts": 6,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "KMO and Bartlett's Test",
     "**Ya**",
     "Kelayakan data: nilai KMO dan Sig. Bartlett"
    ],
    [
     "Total Variance Explained",
     "**Ya**",
     "Eigenvalue, % of Variance, dan Cumulative %; cukup sampai enam baris pertama"
    ],
    [
     "Rotated Component Matrix",
     "**Ya**",
     "Tabel utama validitas konstruk: loading tiap butir pada tiap faktor (sertakan catatan rotasinya)"
    ],
    [
     "Scree Plot",
     "Opsional",
     "Gambar pendukung jumlah faktor"
    ],
    [
     "Communalities",
     "Opsional",
     "Lampiran: seberapa baik tiap butir dijelaskan oleh faktor"
    ],
    [
     "Anti-image Matrices",
     "Opsional",
     "Hanya diagonal bertanda a (MSA), bila dosen memintanya; patokan ≥ 0,50 per butir"
    ],
    [
     "Component Matrix (tanpa rotasi) dan Component Transformation Matrix",
     "Lewati",
     "Tidak diperlukan untuk laporan"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 },
 {
  "id": "ttest-uts",
  "t": "T-test (Beda Dua Kelompok)",
  "path": [
   "Analyze",
   "Compare Means",
   "Independent-Samples T Test"
  ],
  "file": "Data_Latihan_UTS.sav",
  "goal": "Apakah rata-rata Repurchase Intention (TotalRI) berbeda antara responden laki-laki dan perempuan?",
  "hyp": "Levene H0: varians kedua kelompok sama. Uji-t H0: rata-rata TotalRI laki-laki sama dengan perempuan.",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka menu",
    "`Analyze › Compare Means › Independent-Samples T Test`. Dipakai karena laki-laki dan perempuan adalah dua kelompok responden yang berbeda."
   ],
   [
    "Isi variabel",
    "TotalRI ke **Test Variable(s)**, Gender ke **Grouping Variable**. Di kotak Grouping Variable akan tertulis Gender(? ?)."
   ],
   [
    "Definisikan kelompok",
    "Klik **Define Groups**, pilih **Use specified values**: Group 1 = `1` (Laki-laki), Group 2 = `2` (Perempuan). Klik **Continue**."
   ],
   [
    "Cek opsi",
    "Klik **Options**: Confidence Interval Percentage = 95 dan Missing Values = **Exclude cases analysis by analysis** (default). Klik **Continue**."
   ],
   [
    "Jalankan",
    "Klik **OK**."
   ],
   [
    "Baca berurutan",
    "Lihat Sig. pada Levene's Test dulu untuk memilih baris (Equal variances assumed bila sig > 0,05), lalu baca Sig. (2-tailed) pada baris itu. Pada SPSS 27 tabel **Independent Samples Effect Sizes** (Cohen's d) ikut muncul di bawahnya. Jika tidak muncul, hitung manual: d = Mean Difference ÷ simpangan baku gabungan."
   ]
  ],
  "out": [
   {
    "t": "Group Statistics",
    "h": [
     "Gender",
     "N",
     "Mean",
     "Std. Deviation",
     "Std. Error Mean"
    ],
    "r": [
     [
      "Laki-laki",
      "166",
      "39,69",
      "4,619",
      ",358"
     ],
     [
      "Perempuan",
      "184",
      "39,42",
      "4,436",
      ",327"
     ]
    ]
   },
   {
    "t": "Independent Samples Test (TotalRI)",
    "h": [
     "",
     "Levene F",
     "Levene Sig.",
     "t",
     "df",
     "Sig. (2-tailed)",
     "Mean Difference",
     "Std. Error Diff.",
     "95% CI Lower",
     "95% CI Upper"
    ],
    "r": [
     [
      "Equal variances assumed",
      ",259",
      "{{,611}}",
      ",554",
      "348",
      "{{,580}}",
      ",268",
      ",484",
      "-,684",
      "1,221"
     ],
     [
      "Equal variances not assumed",
      "",
      "",
      ",553",
      "340,977",
      ",581",
      ",268",
      ",485",
      "-,686",
      "1,223"
     ]
    ]
   }
  ],
  "read": [
   [
    "Group Statistics",
    "Rata-rata TotalRI laki-laki 39,69 dan perempuan 39,42. Selisihnya sangat kecil."
   ],
   [
    "Levene (langkah 1)",
    "Sig ,611 lebih besar dari 0,05, jadi varians sama. Pakai baris **Equal variances assumed**."
   ],
   [
    "Uji-t (langkah 2)",
    "t = ,554 dengan sig ,580 (dua sisi), lebih besar dari 0,05, jadi H0 tidak ditolak."
   ],
   [
    "Mean Difference dan CI",
    "Selisih rata-rata ,268. Interval kepercayaan 95% (-,684 sampai 1,221) memuat 0, konsisten dengan hasil tidak signifikan."
   ]
  ],
  "concl": "**Tidak ada perbedaan signifikan** Repurchase Intention antara laki-laki dan perempuan.",
  "tip": "Hasil tidak signifikan bukan kegagalan analisis. Itu temuan: gender tidak membedakan niat beli ulang, sehingga aman diperlakukan sebagai variabel kontrol.",
  "rule": "Langkah 1, Levene: sig > 0,05 berarti varians sama, pakai baris Equal variances assumed. Langkah 2, uji-t: sig (2-tailed) < 0,05 berarti rata-rata berbeda. Ukuran efek Cohen's d: 0,2 kecil; 0,5 sedang; 0,8 besar.",
  "interp": [
   "Rata-rata niat beli ulang laki-laki (39,69) dan perempuan (39,42) hanya berselisih 0,27 poin pada rentang total 5 sampai 50. Dengan sig ,580 (> 0,05), selisih sekecil itu bisa muncul karena kebetulan sampel. Cohen's d = 0,06, jauh di bawah 0,2, sehingga selisihnya juga tidak bermakna secara praktis.",
   "Untuk laporan, tulis: “Tidak terdapat perbedaan signifikan Repurchase Intention antara laki-laki dan perempuan, t(348) = 0,554; p = 0,580.” Gender tidak membedakan niat beli ulang, jadi tidak perlu dipisah pada analisis berikutnya."
  ],
  "uts": 7,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "Group Statistics",
     "**Ya**",
     "N, mean, simpangan baku, dan Std. Error Mean tiap kelompok"
    ],
    [
     "Independent Samples Test",
     "**Ya**",
     "Levene dan uji-t; setelah dipaste, hapus baris yang tidak dipakai sesuai hasil Levene"
    ],
    [
     "Independent Samples Effect Sizes",
     "**Ya** (bila muncul)",
     "Cohen's d sebagai ukuran efek"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 },
 {
  "id": "anova-uts",
  "t": "ANOVA (Beda Tiga Kelompok) + Post Hoc",
  "path": [
   "Analyze",
   "General Linear Model",
   "Univariate"
  ],
  "file": "Data_Latihan_UTS.sav",
  "goal": "Apakah rata-rata Repurchase Intention (TotalRI) berbeda menurut frekuensi belanja online (1-2 kali, 3-5 kali, lebih dari 5 kali per bulan)?",
  "hyp": "H0: rata-rata TotalRI sama pada ketiga kelompok frekuensi.",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka menu",
    "`Analyze › General Linear Model › Univariate`."
   ],
   [
    "Isi variabel",
    "TotalRI ke **Dependent Variable**, Frekuensi ke **Fixed Factor(s)**. Jika kotak variabel masih berisi isian dari analisis sebelumnya, klik **Reset** dulu."
   ],
   [
    "Cek model",
    "Tombol **Model** tidak perlu dibuka: biarkan **Full factorial** dan Type III (default)."
   ],
   [
    "Atur Options",
    "Klik **Options**. Pada *Display* centang **Descriptive statistics**, **Estimates of effect size**, dan **Homogeneity tests**. Klik **Continue**."
   ],
   [
    "Minta post hoc",
    "Klik **Post Hoc**, pindahkan Frekuensi ke *Post Hoc Tests for*, lalu centang **Tukey** pada *Equal Variances Assumed*. Cadangan: bila Levene signifikan (sig < 0,05), centang **Games-Howell** pada *Equal Variances Not Assumed* dan pakai tabelnya. Klik **Continue**."
   ],
   [
    "Grafik (opsional)",
    "Klik **Plots**, pindahkan Frekuensi ke **Horizontal Axis**, klik **Add**, lalu **Continue**. Hasilnya profile plot rata-rata tiap kelompok."
   ],
   [
    "Jalankan",
    "Klik **OK**."
   ],
   [
    "Baca berurutan",
    "Levene (baris *Based on Mean*), lalu Tests of Between-Subjects Effects (baris Frekuensi; kolom Partial Eta Squared sebagai ukuran efek), lalu Multiple Comparisons (Tukey)."
   ]
  ],
  "out": [
   {
    "t": "Descriptive Statistics (TotalRI)",
    "h": [
     "Frekuensi",
     "Mean",
     "Std. Deviation",
     "N"
    ],
    "r": [
     [
      "1-2 kali",
      "37,410",
      "3,968",
      "105"
     ],
     [
      "3-5 kali",
      "39,243",
      "4,075",
      "140"
     ],
     [
      "Lebih dari 5 kali",
      "42,086",
      "4,399",
      "105"
     ],
     [
      "Total",
      "39,546",
      "4,519",
      "350"
     ]
    ]
   },
   {
    "t": "Levene's Test of Equality of Error Variances",
    "h": [
     "F",
     "df1",
     "df2",
     "Sig."
    ],
    "r": [
     [
      ",773",
      "2",
      "347",
      "{{,462}}"
     ]
    ]
   },
   {
    "t": "Tests of Between-Subjects Effects (TotalRI)",
    "h": [
     "Source",
     "Type III Sum of Squares",
     "df",
     "Mean Square",
     "F",
     "Sig.",
     "Partial Eta Squared"
    ],
    "r": [
     [
      "Corrected Model",
      "1169,407ᵃ",
      "2",
      "584,703",
      "34,057",
      ",000",
      ",164"
     ],
     [
      "Intercept",
      "538315,346",
      "1",
      "538315,346",
      "31355,393",
      ",000",
      ",989"
     ],
     [
      "Frekuensi",
      "1169,407",
      "2",
      "584,703",
      "{{34,057}}",
      "{{,000}}",
      "{{,164}}"
     ],
     [
      "Error",
      "5957,362",
      "347",
      "17,168",
      "",
      "",
      ""
     ],
     [
      "Total",
      "554479,000",
      "350",
      "",
      "",
      "",
      ""
     ],
     [
      "Corrected Total",
      "7126,769",
      "349",
      "",
      "",
      "",
      ""
     ]
    ],
    "n": "a. R Squared = ,164 (Adjusted R Squared = ,159)"
   },
   {
    "t": "Multiple Comparisons (Tukey HSD)",
    "h": [
     "(I) Frekuensi",
     "(J) Frekuensi",
     "Mean Difference (I-J)",
     "Std. Error",
     "Sig.",
     "95% CI Lower",
     "95% CI Upper"
    ],
    "r": [
     [
      "1-2 kali",
      "3-5 kali",
      "{{1,833*}}",
      ",535",
      ",002",
      ",574",
      "3,092"
     ],
     [
      "1-2 kali",
      "Lebih dari 5 kali",
      "{{4,676*}}",
      ",572",
      ",000",
      "3,330",
      "6,022"
     ],
     [
      "3-5 kali",
      "Lebih dari 5 kali",
      "{{2,843*}}",
      ",535",
      ",000",
      "1,584",
      "4,102"
     ],
     [
      "3-5 kali",
      "1-2 kali",
      "-1,833*",
      ",535",
      ",002",
      "-3,092",
      "-,574"
     ],
     [
      "Lebih dari 5 kali",
      "1-2 kali",
      "-4,676*",
      ",572",
      ",000",
      "-6,022",
      "-3,330"
     ],
     [
      "Lebih dari 5 kali",
      "3-5 kali",
      "-2,843*",
      ",535",
      ",000",
      "-4,102",
      "-1,584"
     ]
    ],
    "n": "*. Beda rata-rata signifikan pada tingkat 0,05."
   },
   {
    "t": "Homogeneous Subsets (Tukey HSD)",
    "h": [
     "Frekuensi",
     "N",
     "Subset 1",
     "Subset 2",
     "Subset 3"
    ],
    "r": [
     [
      "1-2 kali",
      "105",
      "37,410",
      "",
      ""
     ],
     [
      "3-5 kali",
      "140",
      "",
      "39,243",
      ""
     ],
     [
      "Lebih dari 5 kali",
      "105",
      "",
      "",
      "42,086"
     ]
    ]
   }
  ],
  "read": [
   [
    "Descriptive Statistics",
    "Rata-rata TotalRI naik seiring frekuensi belanja: 37,41, 39,24, dan 42,09."
   ],
   [
    "Levene",
    "Sig ,462 lebih besar dari 0,05: varians homogen, asumsi ANOVA terpenuhi."
   ],
   [
    "Tests of Between-Subjects",
    "Pada baris **Frekuensi** F = 34,057 dengan sig 0,000, jadi H0 ditolak. Baris Intercept boleh diabaikan."
   ],
   [
    "R Squared",
    "R Squared ,164 (Adjusted ,159): frekuensi belanja menjelaskan sekitar 16,4% variasi niat beli ulang."
   ],
   [
    "Post hoc (Tukey)",
    "Ketiga pasangan kelompok berbeda signifikan (semua sig di bawah 0,05)."
   ],
   [
    "Homogeneous Subsets",
    "Setiap kelompok berada di subset sendiri, artinya tidak ada dua kelompok yang rata-ratanya sama."
   ]
  ],
  "concl": "Repurchase Intention **berbeda signifikan menurut frekuensi belanja**; makin sering berbelanja, makin tinggi niat beli ulangnya.",
  "tip": "ANOVA hanya menjawab apakah ada yang berbeda. Pasangan mana yang berbeda baru terjawab di tabel Tukey, jadi jangan berhenti di tabel F. Jika Levene signifikan, pakai Games-Howell sebagai pengganti Tukey.",
  "rule": "Levene sig > 0,05 berarti varians homogen (asumsi terpenuhi). F dengan sig < 0,05 berarti minimal ada satu pasang kelompok yang berbeda. Lanjutkan ke Tukey: sig < 0,05 pada sebuah pasangan berarti pasangan itu berbeda. Ukuran efek eta squared: 0,01 kecil; 0,06 sedang; 0,14 besar (Cohen).",
  "interp": [
   "Rata-rata niat beli ulang naik dari 37,41 (1-2 kali) ke 39,24 (3-5 kali) dan 42,09 (lebih dari 5 kali). Uji F (34,057; sig 0,000) menunjukkan kenaikan itu bukan kebetulan, dan Tukey memastikan ketiga pasangan berbeda: selisih terkecil 1,83 (1-2 vs 3-5 kali), terbesar 4,68 (1-2 vs lebih dari 5 kali).",
   "Eta squared = 1169,407 / 7126,769 = ,164 (kategori besar), artinya frekuensi belanja menjelaskan sekitar 16,4% variasi niat beli ulang. Untuk laporan, tulis: “Terdapat perbedaan signifikan Repurchase Intention menurut frekuensi belanja, F(2, 347) = 34,057; p < 0,001; η² = ,164.”"
  ],
  "uts": 8,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "Descriptive Statistics",
     "**Ya**",
     "N, mean, dan simpangan baku TotalRI tiap kelompok"
    ],
    [
     "Levene's Test of Equality of Error Variances",
     "**Ya**",
     "Asumsi homogenitas; pakai baris Based on Mean"
    ],
    [
     "Tests of Between-Subjects Effects",
     "**Ya**",
     "Uji F dan Partial Eta Squared; boleh hapus baris Intercept dan Corrected Total"
    ],
    [
     "Multiple Comparisons (Tukey HSD)",
     "**Ya**",
     "Pasangan kelompok yang berbeda"
    ],
    [
     "Homogeneous Subsets",
     "Opsional",
     "Ringkasan pengelompokan; Multiple Comparisons sudah cukup"
    ],
    [
     "Profile Plots",
     "Opsional",
     "Gambar rata-rata tiap kelompok"
    ],
    [
     "Between-Subjects Factors",
     "Lewati",
     "Cukup ambil N dari tabel Descriptive Statistics"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 },
 {
  "id": "ancova-uts",
  "t": "ANCOVA (ANOVA + Variabel Kontrol)",
  "path": [
   "Analyze",
   "General Linear Model",
   "Univariate"
  ],
  "file": "Data_Latihan_UTS.sav",
  "goal": "Apakah Repurchase Intention (TotalRI) tetap berbeda menurut frekuensi belanja setelah pengaruh Usia (kovariat) dikendalikan?",
  "hyp": "H0: setelah Usia dikendalikan, rata-rata TotalRI sama pada ketiga kelompok frekuensi.",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka menu",
    "`Analyze › General Linear Model › Univariate`."
   ],
   [
    "Isi variabel",
    "TotalRI ke **Dependent Variable**, Frekuensi ke **Fixed Factor(s)**, **Usia ke Covariate(s)**. Jika kotak variabel masih berisi isian dari analisis sebelumnya, klik **Reset** dulu."
   ],
   [
    "Cek linearitas (opsional)",
    "Buat grafik `Graphs › Legacy Dialogs › Scatter/Dot › Simple Scatter › Define`: TotalRI ke Y Axis, Usia ke X Axis, Frekuensi ke Set Markers by. Hubungan Usia dengan TotalRI sebaiknya kira-kira lurus pada tiap kelompok."
   ],
   [
    "Uji kesejajaran lereng (run pertama)",
    "Klik **Model**, pilih **Custom**. Pada *Build Term(s)* ubah menjadi **Main effects**, pilih Frekuensi lalu klik panah; pilih Usia lalu klik panah. Kemudian blok Frekuensi dan Usia sekaligus, ubah *Build Term(s)* menjadi **Interaction**, klik panah. Hasilnya tiga term: Frekuensi, Usia, dan Frekuensi*Usia. Klik **Continue**, lalu **OK**, dan baca baris Frekuensi * Usia di Tests of Between-Subjects Effects."
   ],
   [
    "Model akhir (run kedua)",
    "Buka lagi `Analyze › General Linear Model › Univariate`, klik **Model**, pilih **Full factorial** (tanpa interaksi), pastikan Sum of squares = **Type III** dan *Include intercept in model* tercentang. Klik **Continue**."
   ],
   [
    "Minta rata-rata terkoreksi",
    "Klik **EM Means...**: pindahkan Frekuensi ke *Display Means for*, centang **Compare main effects**, dan pilih **Bonferroni** pada *Confidence interval adjustment*. Keluar lalu klik **Options**, pada *Display* centang **Descriptive statistics**, **Estimates of effect size**, dan **Homogeneity tests**. Klik **Continue**. Tombol Post Hoc tidak dipakai karena tidak menyesuaikan kovariat."
   ],
   [
    "Jalankan",
    "Klik **OK**."
   ],
   [
    "Baca berurutan",
    "Asumsi kesejajaran lereng (run pertama), Levene, Tests of Between-Subjects Effects (baris Usia dan Frekuensi), Estimated Marginal Means (rata-rata terkoreksi pada Usia = rata-rata sampel), lalu Pairwise Comparisons."
   ]
  ],
  "out": [
   {
    "t": "Uji kesejajaran lereng (model dengan interaksi)",
    "h": [
     "Source",
     "Type III Sum of Squares",
     "df",
     "Mean Square",
     "F",
     "Sig."
    ],
    "r": [
     [
      "Frekuensi",
      "5,707",
      "2",
      "2,854",
      ",185",
      ",831"
     ],
     [
      "Usia",
      "588,613",
      "1",
      "588,613",
      "38,187",
      ",000"
     ],
     [
      "Frekuensi * Usia",
      "24,099",
      "2",
      "12,049",
      "{{,782}}",
      "{{,458}}"
     ],
     [
      "Error",
      "5302,334",
      "344",
      "15,414",
      "",
      ""
     ]
    ]
   },
   {
    "t": "Levene's Test of Equality of Error Variances",
    "h": [
     "F",
     "df1",
     "df2",
     "Sig."
    ],
    "r": [
     [
      ",773",
      "2",
      "347",
      "{{,462}}"
     ]
    ]
   },
   {
    "t": "Tests of Between-Subjects Effects (model ANCOVA)",
    "h": [
     "Source",
     "Type III Sum of Squares",
     "df",
     "Mean Square",
     "F",
     "Sig.",
     "Partial Eta Squared"
    ],
    "r": [
     [
      "Corrected Model",
      "1800,336ᵃ",
      "3",
      "600,112",
      "38,983",
      ",000",
      ",253"
     ],
     [
      "Intercept",
      "16394,325",
      "1",
      "16394,325",
      "1064,960",
      ",000",
      ",755"
     ],
     [
      "Usia",
      "630,929",
      "1",
      "630,929",
      "{{40,985}}",
      "{{,000}}",
      "{{,106}}"
     ],
     [
      "Frekuensi",
      "1108,031",
      "2",
      "554,015",
      "{{35,988}}",
      "{{,000}}",
      "{{,172}}"
     ],
     [
      "Error",
      "5326,433",
      "346",
      "15,394",
      "",
      "",
      ""
     ],
     [
      "Total",
      "554479,000",
      "350",
      "",
      "",
      "",
      ""
     ],
     [
      "Corrected Total",
      "7126,769",
      "349",
      "",
      "",
      "",
      ""
     ]
    ],
    "n": "a. R Squared = ,253 (Adjusted R Squared = ,246)"
   },
   {
    "t": "Estimated Marginal Means: Frekuensi (rata-rata terkoreksi)",
    "h": [
     "Frekuensi",
     "Mean",
     "Std. Error",
     "95% CI Lower",
     "95% CI Upper"
    ],
    "r": [
     [
      "1-2 kali",
      "37,519",
      ",383",
      "36,765",
      "38,273"
     ],
     [
      "3-5 kali",
      "39,186",
      ",332",
      "38,533",
      "39,838"
     ],
     [
      "Lebih dari 5 kali",
      "42,053",
      ",383",
      "41,299",
      "42,806"
     ]
    ],
    "n": "Covariates appearing in the model are evaluated at: Usia = 26,02."
   },
   {
    "t": "Pairwise Comparisons (Bonferroni)",
    "h": [
     "(I) Frekuensi",
     "(J) Frekuensi",
     "Mean Difference (I-J)",
     "Std. Error",
     "Sig.",
     "95% CI Lower",
     "95% CI Upper"
    ],
    "r": [
     [
      "1-2 kali",
      "3-5 kali",
      "-1,667*",
      ",507",
      ",003",
      "-2,887",
      "-,447"
     ],
     [
      "1-2 kali",
      "Lebih dari 5 kali",
      "-4,534*",
      ",542",
      ",000",
      "-5,838",
      "-3,230"
     ],
     [
      "3-5 kali",
      "Lebih dari 5 kali",
      "-2,867*",
      ",507",
      ",000",
      "-4,085",
      "-1,648"
     ],
     [
      "3-5 kali",
      "1-2 kali",
      "1,667*",
      ",507",
      ",003",
      ",447",
      "2,887"
     ],
     [
      "Lebih dari 5 kali",
      "1-2 kali",
      "4,534*",
      ",542",
      ",000",
      "3,230",
      "5,838"
     ],
     [
      "Lebih dari 5 kali",
      "3-5 kali",
      "2,867*",
      ",507",
      ",000",
      "1,648",
      "4,085"
     ]
    ],
    "n": "*. Beda rata-rata signifikan pada tingkat 0,05. Penyesuaian: Bonferroni."
   }
  ],
  "read": [
   [
    "Asumsi kesejajaran lereng",
    "Baris interaksi Frekuensi * Usia punya sig ,458, lebih besar dari 0,05. Hubungan Usia dengan TotalRI sejajar di ketiga kelompok, asumsi terpenuhi, ANCOVA boleh dilanjutkan."
   ],
   [
    "Levene",
    "Sig ,462 lebih besar dari 0,05: varians homogen."
   ],
   [
    "Usia (kovariat)",
    "F = 40,985, sig 0,000: Usia memang berpengaruh pada niat beli ulang, jadi mengendalikannya masuk akal."
   ],
   [
    "Frekuensi",
    "F = 35,988, sig 0,000: setelah Usia dikendalikan, kelompok frekuensi tetap berbeda. Pada ANOVA F-nya 34,057."
   ],
   [
    "Rata-rata terkoreksi",
    "Rata-rata disesuaikan pada Usia = 26,02: 37,52, 39,19, dan 42,05, polanya sama dengan ANOVA."
   ],
   [
    "Pairwise (Bonferroni)",
    "Seluruh pasangan kelompok berbeda signifikan (sig di bawah 0,05)."
   ],
   [
    "R Squared",
    "Adjusted R Squared ,246, naik dari ,159 pada ANOVA karena Usia ikut menjelaskan variasi."
   ]
  ],
  "concl": "Perbedaan Repurchase Intention menurut frekuensi belanja **tetap signifikan setelah Usia dikontrol**.",
  "tip": "Jika interaksi Frekuensi * Usia signifikan, ANCOVA tidak tepat karena lereng tiap kelompok berbeda. Selalu cek asumsi ini sebelum membaca hasil utamanya.",
  "rule": "Cek dulu interaksi Frekuensi * Usia: sig > 0,05 berarti lereng sejajar dan ANCOVA boleh dilanjutkan. Lalu baca efek Frekuensi: sig < 0,05 berarti rata-rata terkoreksi berbeda. Ukuran efek partial eta squared: 0,01 kecil; 0,06 sedang; 0,14 besar.",
  "interp": [
   "Asumsi kesejajaran lereng terpenuhi (sig ,458), jadi hasil ANCOVA bisa dipercaya. Usia memengaruhi niat beli ulang (F = 40,985; partial η² = ,106), dan korelasinya positif (r = ,31): makin tua responden, makin tinggi niat beli ulangnya.",
   "Setelah Usia dikendalikan, efek Frekuensi tetap signifikan (F = 35,988; partial η² = ,172). Rata-rata terkoreksi (37,52; 39,19; 42,05) nyaris sama dengan rata-rata asli di ANOVA (37,41; 39,24; 42,09) karena rata-rata usia ketiga kelompok mirip (25,57; 26,25; 26,15 tahun). Jadi perbedaan antar kelompok bukan akibat perbedaan usia.",
   "Untuk laporan, tulis: “Setelah mengendalikan Usia, terdapat perbedaan signifikan Repurchase Intention antar kelompok frekuensi, F(2, 346) = 35,988; p < 0,001; partial η² = ,172.”"
  ],
  "uts": 9,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "Run pertama: Tests of Between-Subjects Effects (model dengan interaksi)",
     "**Ya, sebagian**",
     "Ambil baris Frekuensi * Usia untuk menunjukkan asumsi kesejajaran lereng; sisanya boleh ke lampiran"
    ],
    [
     "Levene's Test of Equality of Error Variances",
     "**Ya**",
     "Asumsi homogenitas varians"
    ],
    [
     "Tests of Between-Subjects Effects (model akhir)",
     "**Ya**",
     "Efek Usia (kovariat) dan Frekuensi, beserta Partial Eta Squared"
    ],
    [
     "Estimated Marginal Means: Frekuensi",
     "**Ya**",
     "Rata-rata terkoreksi tiap kelompok (sertakan catatan nilai Usia)"
    ],
    [
     "Pairwise Comparisons",
     "**Ya**",
     "Perbedaan pasangan kelompok dengan penyesuaian Bonferroni"
    ],
    [
     "Descriptive Statistics",
     "Opsional",
     "Rata-rata sebelum dikoreksi, sebagai pembanding"
    ],
    [
     "Univariate Tests dan Between-Subjects Factors",
     "Lewati",
     "Isinya mengulang tabel di atas"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 },
 {
  "id": "manova-uts",
  "t": "MANOVA (Beda pada Dua Outcome)",
  "path": [
   "Analyze",
   "General Linear Model",
   "Multivariate"
  ],
  "file": "Data_Latihan_UTS.sav",
  "goal": "Apakah ketiga kelompok frekuensi belanja berbeda pada Repurchase Intention (TotalRI) dan Customer Satisfaction (TotalSAT) secara bersamaan?",
  "hyp": "H0: vektor rata-rata TotalRI dan TotalSAT sama pada ketiga kelompok frekuensi.",
  "steps": [
   [
    "Buka datanya",
    "`File › Open › Data`, pilih Data_Latihan_UTS.sav, lalu klik **Open**. Jika file tidak terlihat, ubah *Files of type* menjadi SPSS Statistics (*.sav)."
   ],
   [
    "Buka menu",
    "`Analyze › General Linear Model › Multivariate`."
   ],
   [
    "Isi variabel",
    "TotalRI dan TotalSAT ke **Dependent Variables**, Frekuensi ke **Fixed Factor(s)**. Jika kotak variabel masih berisi isian dari analisis sebelumnya, klik **Reset** dulu."
   ],
   [
    "Cek korelasi antar outcome (opsional)",
    "MANOVA masuk akal bila kedua outcome saling berkorelasi. Cek lewat `Analyze › Correlate › Bivariate` untuk TotalRI dan TotalSAT (di data ini r ≈ ,47)."
   ],
   [
    "Atur Options",
    "Klik **Options**. Pada *Display* centang **Descriptive statistics**, **Estimates of effect size**, dan **Homogeneity tests** (ini memunculkan Box's M dan Levene). Opsional: **Residual SSCP matrix** untuk Bartlett's test of sphericity. Klik **Continue**."
   ],
   [
    "Minta post hoc",
    "Klik **Post Hoc**, pindahkan Frekuensi ke *Post Hoc Tests for*, centang **Tukey** (cadangan: **Games-Howell** bila Levene signifikan). Klik **Continue**. Ini perlu untuk tahu pasangan kelompok mana yang berbeda pada tiap variabel."
   ],
   [
    "Jalankan",
    "Klik **OK**."
   ],
   [
    "Baca berurutan",
    "Box's M, Multivariate Tests (baris Frekuensi), Levene tiap variabel, Tests of Between-Subjects Effects, lalu Multiple Comparisons per variabel. Statistik multivariat: laporkan Wilks' Lambda bila Box's M tidak signifikan, dan Pillai's Trace bila Box's M signifikan atau ukuran kelompok sangat tidak seimbang."
   ]
  ],
  "out": [
   {
    "t": "Box's Test of Equality of Covariance Matrices",
    "h": [
     "Box's M",
     "F",
     "df1",
     "df2",
     "Sig."
    ],
    "r": [
     [
      "4,311",
      ",712",
      "6",
      "2082129,927",
      "{{,640}}"
     ]
    ]
   },
   {
    "t": "Multivariate Tests (efek Frekuensi)",
    "h": [
     "Effect",
     "Value",
     "F",
     "Hypothesis df",
     "Error df",
     "Sig.",
     "Partial Eta Squared"
    ],
    "r": [
     [
      "Pillai's Trace",
      ",167",
      "15,826",
      "4",
      "694",
      "{{,000}}",
      ",084"
     ],
     [
      "Wilks' Lambda",
      ",833",
      "16,519",
      "4",
      "692",
      "{{,000}}",
      ",087"
     ],
     [
      "Hotelling's Trace",
      ",200",
      "17,243",
      "4",
      "414,162",
      "{{,000}}",
      ",091"
     ],
     [
      "Roy's Largest Root ᵇ",
      ",197",
      "34,131",
      "2",
      "347",
      "{{,000}}",
      ",164"
     ]
    ],
    "n": "b. Statistik ini adalah batas atas F yang menghasilkan batas bawah signifikansi."
   },
   {
    "t": "Levene's Test of Equality of Error Variances",
    "h": [
     "",
     "F",
     "df1",
     "df2",
     "Sig."
    ],
    "r": [
     [
      "TotalRI",
      ",773",
      "2",
      "347",
      "{{,462}}"
     ],
     [
      "TotalSAT",
      ",955",
      "2",
      "347",
      "{{,386}}"
     ]
    ]
   },
   {
    "t": "Tests of Between-Subjects Effects",
    "h": [
     "Source",
     "Dependent Variable",
     "Type III Sum of Squares",
     "df",
     "Mean Square",
     "F",
     "Sig.",
     "Partial Eta Squared"
    ],
    "r": [
     [
      "Corrected Model",
      "TotalRI",
      "1169,407ᵃ",
      "2",
      "584,703",
      "34,057",
      ",000",
      ",164"
     ],
     [
      "Intercept",
      "",
      "538315,346",
      "1",
      "538315,346",
      "31355,393",
      ",000",
      ",989"
     ],
     [
      "Frekuensi",
      "",
      "1169,407",
      "2",
      "584,703",
      "{{34,057}}",
      "{{,000}}",
      "{{,164}}"
     ],
     [
      "Error",
      "",
      "5957,362",
      "347",
      "17,168",
      "",
      "",
      ""
     ],
     [
      "Corrected Model",
      "TotalSAT",
      "270,498ᶜ",
      "2",
      "135,249",
      "7,994",
      ",000",
      ",044"
     ],
     [
      "Intercept",
      "",
      "551215,432",
      "1",
      "551215,432",
      "32581,983",
      ",000",
      ",989"
     ],
     [
      "Frekuensi",
      "",
      "270,498",
      "2",
      "135,249",
      "{{7,994}}",
      "{{,000}}",
      "{{,044}}"
     ],
     [
      "Error",
      "",
      "5870,476",
      "347",
      "16,918",
      "",
      "",
      ""
     ]
    ],
    "n": "a. R Squared = ,164 (Adjusted R Squared = ,159); c. R Squared = ,044 (Adjusted R Squared = ,039)"
   },
   {
    "t": "Descriptive Statistics (rata-rata kedua outcome per kelompok)",
    "h": [
     "Frekuensi",
     "N",
     "Mean TotalRI",
     "Mean TotalSAT",
     "SD TotalSAT"
    ],
    "r": [
     [
      "1-2 kali",
      "105",
      "37,410",
      "39,200",
      "4,115"
     ],
     [
      "3-5 kali",
      "140",
      "39,243",
      "39,629",
      "4,345"
     ],
     [
      "Lebih dari 5 kali",
      "105",
      "42,086",
      "41,324",
      "3,779"
     ],
     [
      "Total",
      "350",
      "39,546",
      "40,009",
      "4,195"
     ]
    ]
   },
   {
    "t": "Multiple Comparisons Tukey HSD: TotalSAT (hanya satu arah pasangan)",
    "h": [
     "(I) Frekuensi",
     "(J) Frekuensi",
     "Mean Difference (I-J)",
     "Std. Error",
     "Sig.",
     "95% CI Lower",
     "95% CI Upper"
    ],
    "r": [
     [
      "1-2 kali",
      "3-5 kali",
      "-,429",
      ",531",
      "{{,699}}",
      "-1,679",
      ",821"
     ],
     [
      "1-2 kali",
      "Lebih dari 5 kali",
      "{{-2,124*}}",
      ",568",
      ",001",
      "-3,460",
      "-,788"
     ],
     [
      "3-5 kali",
      "Lebih dari 5 kali",
      "{{-1,695*}}",
      ",531",
      ",004",
      "-2,945",
      "-,445"
     ]
    ],
    "n": "*. Signifikan pada 0,05. Untuk TotalRI hasil Tukey sama dengan langkah ANOVA (ketiga pasangan berbeda)."
   }
  ],
  "read": [
   [
    "Box's M",
    "Sig ,640 lebih besar dari 0,05: matriks kovarians homogen, asumsi MANOVA terpenuhi."
   ],
   [
    "Levene",
    "Sig kedua variabel (,462 dan ,386) di atas 0,05: varians tiap outcome homogen."
   ],
   [
    "Multivariate Tests",
    "Wilks' Lambda = ,833, F = 16,519, sig 0,000. Keempat statistik sama-sama signifikan, jadi ketiga kelompok berbeda pada gabungan TotalRI dan TotalSAT. Pillai's Trace dipilih bila asumsi kurang terpenuhi, Wilks' Lambda paling umum dilaporkan."
   ],
   [
    "Between-Subjects (TotalRI)",
    "F = 34,057, sig 0,000: berbeda signifikan."
   ],
   [
    "Between-Subjects (TotalSAT)",
    "F = 7,994, sig 0,000: juga berbeda signifikan, tetapi pengaruhnya lebih kecil (Adjusted R Squared ,039 dibanding ,159 untuk TotalRI)."
   ],
   [
    "Post hoc Tukey (TotalSAT)",
    "Hanya kelompok lebih dari 5 kali yang berbeda dari dua kelompok lain (sig ,001 dan ,004). Pasangan 1-2 kali dengan 3-5 kali tidak berbeda (sig ,699)."
   ]
  ],
  "concl": "Kelompok frekuensi belanja **berbeda signifikan pada kedua outcome sekaligus** (Repurchase Intention dan Customer Satisfaction). Pada Repurchase Intention ketiga kelompok saling berbeda, sedangkan pada Customer Satisfaction perbedaan hanya muncul pada kelompok lebih dari 5 kali.",
  "tip": "Baca MANOVA berurutan: asumsi, uji multivariat, baru uji univariat. Uji univariat hanya bermakna bila uji multivariatnya signifikan. Post hoc dibaca per variabel dependen, jadi satu kelompok bisa berbeda pada RI tetapi tidak pada SAT.",
  "rule": "Urutan baca: (1) Box's M sig > 0,05 berarti matriks kovarians homogen; (2) Multivariate Tests sig < 0,05 berarti kelompok berbeda pada gabungan variabel dependen (laporkan Wilks' Lambda, atau Pillai's Trace bila Box's M signifikan); (3) Levene tiap variabel sig > 0,05; (4) Between-Subjects Effects untuk tahu variabel mana yang berbeda; (5) post hoc untuk pasangan kelompok.",
  "interp": [
   "Asumsi terpenuhi (Box's M sig ,640; Levene ,462 dan ,386). Wilks' Lambda ,833 (F = 16,519; sig 0,000; partial η² sekitar ,087) menunjukkan kelompok frekuensi berbeda pada gabungan RI dan SAT.",
   "Secara terpisah, frekuensi sangat memengaruhi RI (partial η² = ,164) tetapi jauh lebih kecil pada SAT (,044). Post hoc Tukey pada SAT: kelompok lebih dari 5 kali lebih puas (41,32) dibanding 1-2 kali (39,20) dan 3-5 kali (39,63), sedangkan 1-2 vs 3-5 kali tidak berbeda (sig ,699). Jadi perbedaan pada SAT hanya dipicu kelompok lebih dari 5 kali.",
   "Untuk laporan, tulis: “Frekuensi belanja berpengaruh signifikan secara simultan terhadap Repurchase Intention dan Customer Satisfaction, Wilks' Λ = ,833; F(4, 692) = 16,519; p < 0,001.”"
  ],
  "uts": 10,
  "lapor": {
   "h": [
    "Tabel di output SPSS",
    "Salin?",
    "Dipakai untuk"
   ],
   "r": [
    [
     "Box's Test of Equality of Covariance Matrices",
     "**Ya**",
     "Asumsi homogenitas matriks kovarians"
    ],
    [
     "Multivariate Tests",
     "**Ya**",
     "Pillai's Trace, Wilks' Lambda, dkk. pada baris Frekuensi; hapus baris Intercept"
    ],
    [
     "Levene's Test of Equality of Error Variances",
     "**Ya**",
     "Homogenitas varians tiap variabel dependen"
    ],
    [
     "Tests of Between-Subjects Effects",
     "**Ya**",
     "Uji univariat per variabel; ambil baris Frekuensi, Error, dan Partial Eta Squared"
    ],
    [
     "Descriptive Statistics",
     "**Ya**",
     "Mean dan simpangan baku kedua outcome per kelompok"
    ],
    [
     "Multiple Comparisons (Tukey HSD), satu tabel per variabel",
     "**Ya**",
     "Pasangan kelompok yang berbeda; salin keduanya"
    ],
    [
     "Bartlett's Test of Sphericity",
     "Opsional",
     "Hanya bila Residual SSCP matrix dicentang"
    ],
    [
     "Between-Subjects Factors dan Homogeneous Subsets",
     "Lewati",
     "Tidak diperlukan"
    ]
   ],
   "n": "Cara menyalin: klik judul tabel di Output Viewer, tekan `Ctrl+C`, lalu paste di Word (hasilnya tabel yang bisa diedit). Untuk grafik, klik grafiknya lalu `Ctrl+C` dan paste sebagai gambar. Rapikan di Word: hapus kolom atau baris yang tidak dipakai, seragamkan desimal, dan tulis sig ,000 sebagai < ,001."
  }
 }
];

const ALL = TUT.concat(UTS);

const TREE = {q:"Apakah variabelmu bisa dibagi menjadi variabel bebas (penyebab) dan terikat (akibat)?", o:[
 ["Ya, ada bebas dan terikat", {q:"Skala variabel terikat (DV)?", o:[
   ["Metrik (interval atau rasio)", {q:"Berapa variabel terikatnya?", o:[
      ["Satu", {q:"Seperti apa variabel bebasnya?", o:[
         ["Non-metrik, 2 kategori", {r:"t-test", d:"Bandingkan rata-rata dua kelompok. Independent jika kelompoknya berbeda, paired jika subjek yang sama diukur dua kali.", tu:"independen"}],
         ["Non-metrik, lebih dari 2 kategori", {r:"ANOVA", d:"Bandingkan rata-rata tiga kelompok atau lebih. Lanjutkan dengan post hoc jika signifikan.", tu:"anova1"}],
         ["Non-metrik dan ingin mengontrol variabel lain", {r:"ANCOVA", d:"ANOVA dengan variabel kontrol (kovariat), misalnya kemampuan awal."}],
         ["Metrik", {r:"Regresi", d:"Menguji pengaruh satu atau lebih variabel bebas metrik terhadap satu variabel terikat metrik."}]]}],
      ["Dua atau lebih", {q:"Seperti apa variabel bebasnya?", o:[
         ["Non-metrik (kelompok)", {r:"MANOVA", d:"Membandingkan kelompok pada beberapa outcome sekaligus, misalnya prestasi dan motivasi."}],
         ["Metrik", {r:"Analisis jalur (path) atau SEM", d:"Dipakai ketika ada lebih dari satu variabel metrik di kedua sisi."}]]}]]}],
   ["Non-metrik", {q:"Berapa kategori variabel terikatnya?", o:[
      ["Dua kategori", {q:"Seperti apa variabel bebasnya?", o:[
         ["Semuanya metrik", {r:"Analisis diskriminan", d:"Memprediksi kelompok (misalnya pembeli atau bukan pembeli) dari variabel metrik."}],
         ["Campuran metrik dan non-metrik", {r:"Regresi logistik", d:"Lebih aman jika asumsi normalitas multivariat diragukan."}]]}],
      ["Lebih dari dua kategori", {r:"Multiple discriminant", d:"Memprediksi keanggotaan tiga kelompok atau lebih dari variabel metrik."}]]}]]}],
 ["Tidak, aku ingin melihat keterkaitan antar variabel", {q:"Skala variabelnya?", o:[
   ["Metrik", {q:"Berapa variabelnya?", o:[
      ["Dua", {r:"Korelasi sederhana", d:"Melihat kekuatan hubungan dua variabel metrik."}],
      ["Lebih dari dua", {r:"Analisis faktor atau principal component", d:"Mengelompokkan banyak variabel menjadi sedikit faktor atau komponen.", tu:"faktor"}]]}],
   ["Non-metrik", {q:"Berapa variabelnya?", o:[
      ["Dua", {r:"Tabel kontingensi (crosstab) + Chi-square", d:"Menguji asosiasi dua variabel kategorikal.", tu:"crosstab"}],
      ["Lebih dari dua", {r:"Loglinear atau correspondence analysis", d:"Untuk tabel kontingensi multiway atau tabel silang yang besar."}]]}]]}]]};

/* ---------- LATIHAN ---------- */
const QS = [
["Angka yang menggambarkan karakteristik seluruh populasi disebut...",["Statistik","Parameter","Sampel","Variabel"],1,"Parameter menggambarkan populasi; statistik menggambarkan sampel."],
["Grafik yang dipakai untuk memisahkan “vital few” dari “trivial many” adalah...",["Pie chart","Histogram","Pareto","Scatter plot"],2,"Diagram Pareto mengurutkan penyebab dari yang paling sering ke yang jarang."],
["Kode 1 untuk laki-laki dan 2 untuk perempuan termasuk skala...",["Nominal","Ordinal","Interval","Rasio"],0,"Angkanya hanya label kategori tanpa makna hitung."],
["Dua skala yang termasuk data metrik adalah...",["Nominal dan ordinal","Ordinal dan interval","Interval dan rasio","Nominal dan rasio"],2,"Interval dan rasio disebut metrik; nominal dan ordinal non-metrik."],
["Satu variabel terikat metrik dan satu variabel bebas non-metrik dengan tiga kategori. Ujinya?",["t-test","ANOVA","Regresi logistik","Chi-square"],1,"ANOVA membandingkan rata-rata tiga kelompok atau lebih."],
["Kelompok yang dibandingkan pada dua outcome sekaligus (prestasi dan motivasi) memakai...",["ANOVA","ANCOVA","MANOVA","t-test"],2,"MANOVA = ANOVA dengan dua variabel terikat atau lebih."],
["Pada uji Kolmogorov-Smirnov, H0 menyatakan bahwa...",["Data tidak normal","Data berdistribusi normal","Varians berbeda","Tidak ada asosiasi"],1,"H0 pada K-S: data berdistribusi normal. Sig di bawah 0,05 berarti H0 ditolak.","ks"],
["Skewness 2,590 dan kurtosis 8,422 pada variabel EARNS menunjukkan bahwa data...",["Normal","Tidak normal","Valid","Reliabel"],1,"Nilai normal mendekati 0. Angka sejauh itu menunjukkan data miring dan tidak normal.","deskriptif"],
["Pada independent t-test, sig Levene 0,109. Baris mana yang dipakai?",["Equal variances assumed","Equal variances not assumed","Keduanya","Tidak ada"],0,"Sig di atas 0,05 berarti varians sama, jadi pakai baris pertama.","independen"],
["ROA perusahaan yang sama diukur sebelum dan sesudah go public. Ujinya?",["Independent t-test","One-way ANOVA","Paired samples t-test","Chi-square"],2,"Subjek yang sama diukur dua kali, maka berpasangan.","paired"],
["ANOVA menunjukkan hasil signifikan. Langkah berikutnya untuk tahu kelompok mana yang beda adalah...",["Uji Levene","Post hoc","Uji normalitas","Rotasi Varimax"],1,"Post hoc (Tukey, Bonferroni) menunjukkan pasangan kelompok yang berbeda.","anova1"],
["Post hoc tidak dijalankan untuk gender pada two-way ANOVA karena...",["Gender tidak signifikan","Gender hanya punya dua kategori","Varians berbeda","Sampelnya kecil"],1,"Post hoc membutuhkan faktor dengan lebih dari dua kategori.","anova2"],
["Sig Chi-square 0,126 pada crosstab REG dan RACE berarti...",["Ada asosiasi kuat","Tidak ada asosiasi","Data tidak valid","Varians berbeda"],1,"Sig di atas 0,05 berarti H0 (tidak ada hubungan) tidak ditolak.","crosstab"],
["Pernyataan yang benar tentang validitas dan reliabilitas adalah...",["Alat reliabel pasti valid","Alat valid pasti reliabel","Keduanya selalu sama","Keduanya tidak berhubungan"],1,"Alat yang valid pasti reliabel, tetapi yang reliabel belum tentu valid."],
["Konstruk dianggap reliabel menurut Nunnally (1994) jika Cronbach's alpha...",["Kurang dari 0,50","Di atas 0,70","Tepat 0","Di atas 5"],1,"Kriterianya di atas 0,70.","reliabilitas"],
["Menu SPSS untuk uji reliabilitas adalah...",["Analyze › Scale › Reliability Analysis","Analyze › Compare Means","Graphs › Histogram","Analyze › Correlate › Bivariate"],0,"Reliabilitas ada di Analyze › Scale › Reliability Analysis.","reliabilitas"],
["Butir kuesioner dinyatakan valid pada korelasi bivariat jika korelasinya dengan skor total...",["Negatif","Tidak signifikan","Signifikan","Sama dengan 0"],2,"Korelasi item-total yang signifikan menunjukkan butir valid.","validitas"],
["KMO minimal berapa agar analisis faktor layak dilakukan?",["Di atas 0,50","Di atas 0,95","Tepat 1","Di bawah 0,10"],0,"Nilai KMO yang diinginkan lebih dari 0,50.","faktor"],
["Tujuan rotasi Varimax pada analisis faktor adalah...",["Menghapus indikator","Memperjelas pengelompokan indikator ke faktor","Menghitung alpha","Menguji normalitas"],1,"Rotasi membuat loading lebih jelas sehingga indikator mudah dikelompokkan.","faktor"]
];

/* ---------- UTIL ---------- */
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const fmt = s => esc(s).replace(/\{\{(.+?)\}\}/g,"<mark>$1</mark>").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`(.+?)`/g,"<code>$1</code>");
const store = {
  get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
let doneCh = store.get("lab-ch",[]), doneT = store.get("lab-tut",[]), stepsDone = store.get("lab-steps",{});
const RUN = {};            // status eksekusi tutorial: "l" (memuat) atau "d" (selesai), hanya selama sesi
let Q = {i:0,s:0,a:null};  // status kuis
let W = [];                // jalur pemilih uji
const M = document.getElementById("M");
const tutOf = id => ALL.find(t => t.id === id);
const base = t => t.uts ? "#/uts/" : "#/spss/";
const toggle = (arr,v,key) => { const i = arr.indexOf(v); i<0 ? arr.push(v) : arr.splice(i,1); store.set(key,arr); };
const path = p => `<div class="path">${p.map((x,i)=>`${i?'<span class="sep" aria-hidden="true">&#8250;</span>':''}<kbd>${esc(x)}</kbd>`).join("")}</div>`;

/* ---------- KOMPONEN ---------- */
const win = (title,body) => `<section class="win"><div class="bar"><i></i><i></i><i></i><span>${esc(title)}</span></div><div class="in">${body}</div></section>`;
const table = o => `<div class="tw"><table class="dt"><thead><tr>${o.h.map(x=>`<th>${fmt(x)}</th>`).join("")}</tr></thead><tbody>${o.r.map(r=>`<tr>${r.map(c=>`<td>${fmt(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const glossary = g => `<dl>${g.map(x=>`<dt>${esc(x[0])}</dt><dd>${fmt(x[1])}</dd>`).join("")}</dl>`;

function outTable(o){
  if(o.chart) return `<figure class="out"><figcaption>${esc(o.t)}</figcaption><div class="hist" role="img" aria-label="${esc(o.t)}">${o.chart.map((h,k)=>`<span style="height:${h}%"${o.lab?` data-l="${esc(o.lab[k]||"")}"`:""}></span>`).join("")}</div>${o.lab?`<div class="hl"><span>${esc(o.lab[0])}</span><span>${esc(o.lab[o.lab.length-1])}</span></div>`:""}${o.n?`<div class="nt">${fmt(o.n)}</div>`:""}</figure>`;
  return `<figure class="out"><figcaption>${esc(o.t)}</figcaption><div class="tw"><table class="ot"><thead><tr>${o.h.map(x=>`<th>${fmt(x)}</th>`).join("")}</tr></thead><tbody>${o.r.map(r=>`<tr>${r.map((c,i)=>i?`<td>${fmt(c)}</td>`:`<th scope="row">${fmt(c)}</th>`).join("")}</tr>`).join("")}</tbody></table></div>${o.n?`<div class="nt">${fmt(o.n)}</div>`:""}</figure>`;
}

function outHTML(t){
  const st = RUN[t.id];
  if(!st) return `<div class="runbox"><p class="mute" style="margin:0 0 12px">Sudah mengikuti langkah di atas? Klik tombol ini untuk menjalankan dan melihat output SPSS.</p><button class="run" data-a="run" data-id="${t.id}">&#9654; Klik OK / Run</button></div>`;
  if(st==="l") return `<pre class="log" role="status">$ spss --open "${esc(t.file)}"\n$ analyze ${t.path.map(esc).join(" > ")}\nmemproses data ...</pre>`;
  const d = doneT.includes(t.id);
  return `<h3>Output SPSS</h3>${t.out.map(outTable).join("")}
  <h3>Pembahasan: cara membaca</h3><ol class="read">${t.read.map(r=>`<li><b>${fmt(r[0])}</b>${fmt(r[1])}</li>`).join("")}</ol>
  ${t.interp?`<div class="callout interp"><span class="lb">Interpretasi</span>${t.interp.map(x=>`<p>${fmt(x)}</p>`).join("")}</div>`:""}
  ${t.lapor?`<h3>Tabel SPSS yang dicopy untuk laporan</h3>${table(t.lapor)}${t.lapor.n?`<p class="hint">${fmt(t.lapor.n)}</p>`:""}`:""}
  <div class="callout"><span class="lb">Kesimpulan</span>${fmt(t.concl)}</div>
  ${t.tip?`<div class="callout tip"><span class="lb">Catatan</span>${fmt(t.tip)}</div>`:""}
  <button class="btn ${d?"on":"pri"}" data-a="mark-tut" data-id="${t.id}">${d?"&#10003; Tutorial selesai (klik untuk batal)":"Tandai tutorial selesai"}</button>`;
}

/* ---------- HALAMAN ---------- */
function home(){
  const total = CH.length + ALL.length, d = doneCh.length + doneT.length, pct = Math.round(d/total*100);
  let h = win("boot.log", `<p class="boot">$ ./lab-spss --start\n<span class="ok">[ok]</span> ${CH.length} modul dimuat\n<span class="ok">[ok]</span> ${TUT.length} tutorial SPSS dimuat\n<span class="ok">[ok]</span> ${UTS.length} langkah Bahas UTS dimuat\n<span class="ok">[ok]</span> ${QS.length} soal latihan dimuat</p>
  <h1>Belajar analisis data, langkah demi langkah di SPSS.</h1>
  <p class="lead">Pilih modul untuk memahami konsepnya, lalu buka tutorial SPSS untuk mempraktikkan menu, melihat output, dan memahami pembahasannya.</p>
  <div class="meter"><span>progres</span><div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="fill" style="width:${pct}%"></div></div><span>${d}/${total}</span></div>`);
  PARTS.forEach((p,pi)=>{
    h += `<div class="sec">modul/${esc(p.toLowerCase().replace(/[^a-z]+/g,"-"))}/ <small>${esc(p)}</small></div><div class="grid">` +
      CH.filter(c=>c.part===pi).map(c=>{const dn=doneCh.includes(c.n);
        return `<a class="card ${dn?"done":""}" href="#/ch/${c.n}"><span class="code">modul_0${c.n}</span>${dn?'<span class="badge">&#10003; selesai</span>':""}<b>${esc(c.t)}</b><p>${esc(c.lead)}</p><span class="meta">${c.tu.length?`<span class="tag">${c.tu.length} tutorial SPSS</span>`:'<span class="tag">konsep</span>'}</span></a>`}).join("") + `</div>`;
  });
  h += `<div class="sec">tutorial-spss/ <small>praktik langsung</small></div><div class="grid">` + TUT.map(t=>cardT(t)).join("") + `</div>`;
  h += `<div class="sec">bahas-uts/ <small>cara mengerjakan perintah UTS</small></div><div class="grid">` + UTS.map(t=>cardT(t)).join("") + `</div>`;
  return h;
}
const cardT = t => `<a class="card ${doneT.includes(t.id)?"done":""}" href="${base(t)}${t.id}"><span class="code">${t.uts?"uts_"+String(UTS.indexOf(t)+1).padStart(2,"0"):"modul_0"+t.ch}</span>${doneT.includes(t.id)?'<span class="badge">&#10003; selesai</span>':""}<b>${esc(t.t)}</b><p>${t.path.map(esc).join(" &#8250; ")}</p><span class="meta"><span class="tag">${esc(t.file)}</span></span></a>`;

function chapter(n){
  const c = CH[n-1]; if(!c) return home();
  const dn = doneCh.includes(n);
  let b = `<p><a class="back" href="#/">&#8592; semua modul</a></p><span class="tag">modul_0${n}</span><h2>${esc(c.t)}</h2><p class="lead">${esc(c.lead)}</p>
  <h3>Yang perlu kamu kuasai</h3><ul>${c.pts.map(x=>`<li>${fmt(x)}</li>`).join("")}</ul>`;
  if(c.tb) b += `<h3>${esc(c.tb.t)}</h3>${table(c.tb)}`;
  if(c.note) b += `<div class="callout tip"><span class="lb">Catatan</span>${fmt(c.note)}</div>`;
  if(c.link) b += `<p><a class="btn pri" href="${c.link.h}">${esc(c.link.t)}</a></p>`;
  b += `<h3>Kamus mini</h3>${glossary(c.gl)}`;
  if(c.tu.length) b += `<h3>Praktik di SPSS</h3><div class="grid">${c.tu.map(id=>cardT(tutOf(id))).join("")}</div>`;
  b += `<p style="margin-top:22px"><button class="btn ${dn?"on":"pri"}" data-a="mark-ch" data-n="${n}">${dn?"&#10003; Sudah dikuasai (klik untuk batal)":"Tandai sudah dikuasai"}</button></p>
  <div class="row"><span>${n>1?`<a href="#/ch/${n-1}">&#8592; modul sebelumnya</a>`:""}</span><span>${n<CH.length?`<a href="#/ch/${n+1}">modul berikutnya &#8594;</a>`:""}</span></div>`;
  return win(`modul_0${n}.md`, b);
}

function tutIndex(){
  let b = `<h2>Tutorial SPSS</h2><p class="lead">Setiap tutorial berisi menu yang harus dibuka, langkah pengerjaan, output, lalu pembahasan cara membacanya.</p>`;
  CH.filter(c=>c.tu.length).forEach(c=>{ b += `<div class="sec">${esc(c.t)}</div><div class="grid">${c.tu.map(id=>cardT(tutOf(id))).join("")}</div>`; });
  return win("tutorial-spss/", b);
}

function tutorial(id){
  const t = tutOf(id); if(!t) return tutIndex();
  const L = t.uts ? UTS : TUT, i = L.indexOf(t), sd = stepsDone[id] || [];
  const hd = t.uts ? `<p><a class="back" href="#/uts">&#8592; Bahas UTS</a> <span class="mute">/ langkah ${i+1} dari ${L.length}</span></p>` : `<p><a class="back" href="#/spss">&#8592; semua tutorial</a> <span class="mute">/ </span><a class="back" href="#/ch/${t.ch}">modul_0${t.ch}</a></p>`;
  let b = hd + `
  <h2>${esc(t.t)}</h2>
  <div class="callout goal"><span class="lb">Yang ingin dijawab</span>${fmt(t.goal)}${t.hyp?`<br><span class="mute">${fmt(t.hyp)}</span>`:""}</div>
  ${t.rule?`<div class="callout rule"><span class="lb">Aturan keputusan</span>${fmt(t.rule)}</div>`:""}
  ${t.diagram?diagram():""}<h3>Menu SPSS</h3>${path(t.path)}<span class="file">${esc(t.file)}</span>${t.uts?` <a class="btn" href="${esc(t.file)}" download>&#8595; unduh data latihan</a>`:""}
  <h3>Langkah pengerjaan</h3><p class="hint">Centang tiap langkah sambil kamu praktik.</p>
  <ol class="steps">${t.steps.map((s,k)=>`<li><label><input type="checkbox" data-step="${k}" data-id="${id}" ${sd.includes(k)?"checked":""}><span class="n" aria-hidden="true"></span><span class="tx"><b>${fmt(s[0])}</b><small>${fmt(s[1])}</small></span></label></li>`).join("")}</ol>
  <div id="out" data-id="${id}" aria-live="polite">${outHTML(t)}</div>
  <div class="row"><span>${i>0?`<a href="${base(t)}${L[i-1].id}">&#8592; ${esc(L[i-1].t)}</a>`:""}</span><span>${i<L.length-1?`<a href="${base(t)}${L[i+1].id}">${esc(L[i+1].t)} &#8594;</a>`:""}</span></div>`;
  return win(`${t.id}.sps`, b);
}

function pilih(){
  let node = TREE; const trail = [];
  for(const k of W){ trail.push(node.o[k][0]); node = node.o[k][1]; }
  let b = `<h2>Pilih uji yang tepat</h2><p class="lead">Jawab pertanyaan satu per satu. Hasilnya mengikuti peta uji di modul 2.</p>`;
  if(trail.length) b += `<p class="crumbs">$ ${trail.map(esc).join(" &#8250; ")}</p>`;
  if(node.r){
    b += `<div class="res"><span class="mute">Ujinya:</span><h2>${esc(node.r)}</h2><p>${esc(node.d)}</p>${node.tu?`<a class="btn pri" href="#/spss/${node.tu}">Buka tutorial SPSS</a>`:""}</div>`;
  } else {
    b += `<h3>${esc(node.q)}</h3>` + node.o.map((o,k)=>`<button class="opt" data-a="wiz" data-k="${k}">${esc(o[0])}</button>`).join("");
  }
  b += `<p style="margin-top:18px">${W.length?`<button class="btn" data-a="wiz-back">&#8592; kembali</button> `:""}<button class="btn" data-a="wiz-reset">Mulai ulang</button></p>`;
  return win("pilih-uji.sh", b);
}

function quiz(){
  if(Q.i >= QS.length){
    return win("latihan.test", `<div class="res"><span class="mute">Skor akhir</span><div class="score">${Q.s}/${QS.length}</div><p>${Q.s>=Math.ceil(QS.length*.8)?"Kuat. Sekarang coba praktik tutorial tanpa melihat langkahnya.":"Buka lagi modul atau tutorial yang masih terasa kabur, lalu ulangi latihan."}</p><button class="btn pri" data-a="qreset">Ulangi latihan</button></div>`);
  }
  const x = QS[Q.i];
  return win("latihan.test", `<div class="qhead"><span>soal ${Q.i+1} dari ${QS.length}</span><span>benar: ${Q.s}</span></div><div class="track"><div class="fill" style="width:${Q.i/QS.length*100}%"></div></div>
  <h2 style="margin-top:18px;font-size:1.25rem;line-height:1.4">${esc(x[0])}</h2>
  ${x[1].map((o,j)=>`<button class="opt ${Q.a==null?"":j===x[2]?"ok":j===Q.a?"no":""}" ${Q.a==null?"":"disabled"} data-a="pick" data-j="${j}">${esc(o)}</button>`).join("")}
  ${Q.a==null?"":`<div class="ex" role="status"><b>${Q.a===x[2]?"Benar.":"Belum tepat."}</b> ${esc(x[3])}</div>${x[4]?`<a class="btn" href="#/spss/${x[4]}">Buka tutorial terkait</a> `:""}<button class="btn pri" data-a="qnext">Lanjut</button>`}`);
}

/* ---------- ROUTER ---------- */

function diagram(){
  const bx=(x,y,w,t1,t2,c)=>`<g><rect x="${x}" y="${y}" width="${w}" height="54" rx="6" class="bx ${c}"/><text x="${x+w/2}" y="${y+23}" text-anchor="middle" class="t1">${t1}</text><text x="${x+w/2}" y="${y+41}" text-anchor="middle" class="t2">${t2}</text></g>`;
  const ar=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ln" marker-end="url(#ah)"/>`;
  return `<h3>Model penelitian</h3><figure class="mdl"><svg viewBox="0 0 640 250" role="img" aria-label="Model: CE, FOMO, dan PP memengaruhi SAT, lalu SAT memengaruhi RI. Usia dan Gender adalah variabel kontrol.">
  <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ahp"/></marker></defs>
  ${bx(10,12,150,"CE","antecedent","a")}${bx(10,98,150,"FOMO","antecedent","a")}${bx(10,184,150,"PP","antecedent","a")}
  ${bx(245,98,150,"SAT","intervening","i")}${bx(480,98,150,"RI","consequence","c")}
  ${ar(160,39,245,115)}${ar(160,125,245,125)}${ar(160,211,245,135)}${ar(395,125,480,125)}
  <text x="560" y="40" text-anchor="middle" class="t2">variabel kontrol</text><text x="560" y="58" text-anchor="middle" class="t2">Usia, Gender</text>${ar(560,66,560,98)}
  </svg><figcaption>Tiap variabel diukur dengan 5 indikator, jadi 5 variabel x 5 indikator = 25 butir.</figcaption></figure>`;
}

function utsIndex(){
  let b = `<h2>Bahas UTS</h2><p class="lead">Urutan pengerjaan perintah UTS di SPSS: rancang variabel, olah deskriptif, uji kualitas instrumen, lalu uji beda. Semua langkah memakai satu file data latihan (350 responden, 25 butir).</p>
  <div class="callout tip"><span class="lb">Soal data dosen</span>Data dari dosen hanya untuk latihan, jadi file latihan di sini disusun ulang (222 baris dari file dosen, sisanya simulasi) supaya syarat 350 sampel dan semua uji bisa dipraktikkan. Angka outputnya dihitung sungguhan, tapi digit terakhir bisa sedikit beda dari SPSS.</div>
  <div class="callout"><span class="lb">Cara menyalin tabel SPSS ke laporan</span><p>1. Setiap analisis membuka <b>Output Viewer</b>. Klik tabel yang diperlukan (kotak akan muncul di sekelilingnya), tekan <code>Ctrl+C</code>, lalu paste di Word. Hasilnya tabel yang bisa diedit. Klik kanan › <code>Copy Special</code> bila ingin format gambar.</p><p>2. Rapikan tampilan: klik dua kali tabel di Output Viewer, lalu <code>Format › TableLooks</code> dan pilih tampilan yang sederhana (misalnya Academic). Di Word, hapus kolom atau baris yang tidak dipakai dan seragamkan jumlah desimal.</p><p>3. Untuk banyak tabel sekaligus: <code>File › Export</code>, pilih tipe Word/PowerPoint, lalu Objects to Export = Selected. Simpan juga output asli dengan <code>File › Save As</code> (.spv).</p><p>4. Jangan menyalin semuanya. Abaikan Title, Notes, Active Dataset, Case Processing Summary, dan tabel pengulang. Daftar tabel yang perlu disalin ada di bagian <b>Tabel SPSS yang dicopy untuk laporan</b> pada tiap langkah.</p></div>
  <p><a class="btn pri" href="Data_Latihan_UTS.sav" download>&#8595; Unduh Data_Latihan_UTS.sav</a></p>
  <div class="grid">${UTS.map(t=>cardT(t)).join("")}</div>`;
  return win("bahas-uts/", b);
}

function render(){
  const [, r, a] = location.hash.slice(1).split("/");
  let h, title = "Lab SPSS";
  if(r==="ch"){ h = chapter(+a); const c=CH[a-1]; if(c) title = c.t; }
  else if(r==="spss"){ h = a ? tutorial(a) : tutIndex(); const t=tutOf(a); title = t ? t.t : "Tutorial SPSS"; }
  else if(r==="uts"){ const t=a&&tutOf(a); h = t&&t.uts ? tutorial(a) : utsIndex(); title = t&&t.uts ? t.t : "Bahas UTS"; }
  else if(r==="pilih"){ h = pilih(); title = "Pilih uji"; }
  else if(r==="latihan"){ h = quiz(); title = "Latihan"; }
  else h = home();
  M.innerHTML = h;
  document.title = title + " | Lab SPSS";
  document.querySelectorAll("nav a").forEach(e=>e.classList.toggle("on", e.dataset.r === (r==="ch" ? "" : (r||""))));
}

/* ---------- EVENT ---------- */
M.addEventListener("click", e=>{
  const b = e.target.closest("[data-a]"); if(!b) return;
  const a = b.dataset.a;
  if(a==="mark-ch"){ toggle(doneCh,+b.dataset.n,"lab-ch"); render(); }
  else if(a==="mark-tut"){ toggle(doneT,b.dataset.id,"lab-tut"); render(); }
  else if(a==="run"){
    const id = b.dataset.id, t = tutOf(id);
    RUN[id] = "l";
    const box = document.getElementById("out"); box.innerHTML = outHTML(t);
    const wait = matchMedia("(prefers-reduced-motion:reduce)").matches ? 0 : 900;
    setTimeout(()=>{ RUN[id] = "d"; const bx = document.getElementById("out"); if(bx && bx.dataset.id===id){ bx.innerHTML = outHTML(t); bx.scrollIntoView({block:"start"}); } }, wait);
  }
  else if(a==="wiz"){ W.push(+b.dataset.k); render(); }
  else if(a==="wiz-back"){ W.pop(); render(); }
  else if(a==="wiz-reset"){ W = []; render(); }
  else if(a==="pick"){ Q.a = +b.dataset.j; if(Q.a===QS[Q.i][2]) Q.s++; render(); }
  else if(a==="qnext"){ Q.i++; Q.a = null; render(); }
  else if(a==="qreset"){ Q = {i:0,s:0,a:null}; render(); }
});
M.addEventListener("change", e=>{
  const c = e.target.closest("[data-step]"); if(!c) return;
  const id = c.dataset.id, k = +c.dataset.step, arr = stepsDone[id] || (stepsDone[id] = []);
  const i = arr.indexOf(k); c.checked ? (i<0 && arr.push(k)) : (i>=0 && arr.splice(i,1));
  store.set("lab-steps", stepsDone);
});
addEventListener("hashchange", ()=>{ render(); scrollTo(0,0); });
render();
