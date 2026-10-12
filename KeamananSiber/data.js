// ===== Inti bersama (dipakai semua file JS) =====
const ACT = {};          // pemetaan aksi klik: data-act="nama"
let ST = {};             // state halaman aktif (lab, kuis, dsb), direset tiap ganti halaman
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pad = n => String(n).padStart(2, '0');

// ===== Materi per pertemuan =====
// n=nomor, b=blok, j=judul, s=subjudul, tag=label, r=ringkasan, p=poin, k=kasus [judul, statistik, teks],
// h=id hukum terkait, tg=tugas di kelas, jb=jebakan/tips UTS (catatan penyusun), lab=id lab
const BLOK = ["Blok 1 · Fondasi", "Blok 2 · Etika, Privasi & Hukum"];
const MOD = [
  {
    n: 1, b: 0, j: "Keamanan Siber bagi Bisnis Digital", s: "Kenapa ini urusan bisnis",
    tag: ["PDNS 2024", "Tokopedia 2020", "3 dimensi dampak"],
    r: "Keamanan siber adalah keputusan bisnis, bukan sekadar urusan teknisi. Dampaknya diukur dalam kepercayaan, reputasi, dan uang.",
    p: [
      "Mata kuliah ini BUKAN untuk menjadi hacker. Fokusnya menganalisis risiko siber sebagai risiko bisnis dan mengambil keputusan yang bertanggung jawab di titik temu bisnis, hukum, dan etika, terutama saat hukum belum mengatur.",
      "Bisnis digital berdiri di atas tiga hal yang rapuh terhadap serangan: <b>data</b> (bisa dicuri, dijual, dikunci), <b>kepercayaan</b> (orang menyerahkan uang dan identitas karena percaya), dan <b>sistem yang reliable</b> (sistem mati = penjualan berhenti, ketersediaan = pendapatan).",
      "Keamanan bukan pusat biaya yang boros, melainkan <b>infrastruktur kepercayaan</b>.",
      "Tiga dimensi dampak insiden: <b>kepercayaan</b> (lama dibangun, sekejap runtuh), <b>reputasi</b> (efeknya bertahan lebih lama dari gangguan teknis), <b>finansial</b> (lebih luas dari tebusan: biaya pemulihan, penjualan hilang, sanksi regulator, mitra kabur).",
      "Denda UU PDP dapat mencapai 2% dari pendapatan tahunan.",
      "Threat landscape. Siapa pelakunya: iseng, kriminal terorganisir, orang dalam, aktor negara. Apa yang diincar: uang (tebusan, penipuan), data (dijual di dark web), disrupsi layanan.",
      "Di Indonesia: ±944 ribu akun bocor pada kuartal III 2025 (setara 7 akun per menit, Surfshark); dugaan 128 juta data registrasi SIM (2025); 4,7 juta data ASN dari BKN (2024). Ini bukan cerita &ldquo;kalau&rdquo;, tapi &ldquo;kapan&rdquo;."
    ],
    k: [
      ["PDNS 2, Surabaya, 20 Juni 2024", [["282", "instansi terganggu"], ["Rp131 M", "tebusan diminta (±8 juta USD)"], ["0", "backup, data tak bisa direstore"]],
        "Ransomware varian Brain Cipher (pengembangan LockBit 3.0) melumpuhkan layanan publik berhari-hari. Pelajarannya: keamanan sering gagal bukan karena serangan yang canggih, tetapi karena keputusan tata kelola dan anggaran yang buruk."],
      ["Kebocoran data Tokopedia, Mei 2020", [["91 juta", "akun pengguna terdampak"]],
        "Nama, email, tanggal lahir, dan nomor telepon bocor lalu diperjualbelikan di dark web. Dari satu insiden, ketiga dimensi dampak muncul sekaligus: krisis kepercayaan, sorotan media nasional, dan biaya pemulihan serta komunikasi krisis."]
    ],
    h: ["pdp"],
    jb: [
      "Jangan menjawab &ldquo;itu urusan tim IT&rdquo;. Jawaban yang diharapkan: keamanan adalah keputusan bisnis.",
      "Akar masalah PDNS adalah tata kelola dan anggaran (tanpa backup), bukan kecanggihan serangan.",
      "Kalau diminta dampak finansial, jangan berhenti di uang tebusan: sebut pemulihan, penjualan hilang, sanksi, dan mitra yang kabur.",
      "Tokopedia adalah contoh sektor swasta; PDNS contoh sektor publik. Keduanya dipakai sebagai benang merah tiga dimensi dampak."
    ],
    lab: ["sim"]
  },
  {
    n: 2, b: 0, j: "CIA Triad, Risiko, dan Jenis Serangan", s: "Kosakata untuk membaca berita",
    tag: ["CIA", "Aset–Ancaman–Kerentanan–Risiko", "Malware · Phishing · Ransomware · DDoS"],
    r: "Kosakata dasar agar kamu bisa membaca berita keamanan dengan percaya diri: tiga pilar CIA, rantai risiko, dan empat jenis serangan umum.",
    p: [
      "<b>CIA triad</b>: <b>Confidentiality</b> (hanya pihak berwenang yang boleh mengakses data), <b>Integrity</b> (data akurat dan tidak diubah tanpa izin), <b>Availability</b> (sistem dapat diakses saat dibutuhkan).",
      "Rantai risiko: <b>Aset</b> (hal berharga) → <b>Ancaman</b> (pihak atau hal yang dapat membahayakan) → <b>Kerentanan</b> (celah yang bisa dimanfaatkan) → <b>Risiko</b> (kemungkinan × dampak bila ancaman mengeksploitasi kerentanan).",
      "Risiko muncul ketika ancaman mengeksploitasi kerentanan pada sebuah aset.",
      "<b>Malware</b>: perangkat lunak jahat (virus, trojan, spyware) yang merusak atau mencuri data. <b>Phishing</b>: penipuan menyamar lewat email atau pesan untuk mencuri kredensial. <b>Ransomware</b>: mengunci atau mengenkripsi data lalu menuntut tebusan. <b>DDoS</b>: membanjiri sistem dengan trafik palsu hingga layanan lumpuh.",
      "Pemetaan di slide: Kerahasiaan ← phishing, kebocoran data, pencurian oleh orang dalam. Integritas ← manipulasi data, serangan rantai pasok. Ketersediaan ← ransomware, DDoS, kegagalan sistem."
    ],
    k: [],
    h: [],
    jb: [
      "Ancaman ≠ kerentanan. Ancaman = pihak atau hal yang bisa membahayakan (peretas, malware, orang dalam). Kerentanan = celah (kata sandi lemah, software usang).",
      "Di slide, ransomware dipetakan ke Availability dan phishing ke Confidentiality. Pakai pemetaan ini saat menjawab.",
      "Risiko selalu dua faktor: kemungkinan DAN dampak. Jangan hanya menyebut salah satunya.",
      "Gunakan urutan baku saat membedah kasus: aset → ancaman → kerentanan → jenis serangan → pilar CIA."
    ],
    lab: ["cia"]
  },
  {
    n: 3, b: 0, j: "Pertahanan Dasar & Keamanan Transaksi", s: "Enkripsi, autentikasi, checkout",
    tag: ["Enkripsi", "MFA", "HTTPS · PCI DSS"],
    r: "Cara bisnis melindungi diri. Enkripsi, autentikasi, dan keamanan transaksi adalah pertahanan dasar yang perlu dipahami dan diputuskan oleh orang bisnis, bukan hanya teknisi.",
    p: [
      "<b>Enkripsi</b> mengacak data sehingga hanya pemegang kunci yang bisa membacanya. Dipakai saat disimpan (<i>at rest</i>) dan saat dikirim (<i>in transit</i>). HTTPS dan ikon gembok = data terenkripsi saat dikirim; kini menjadi standar minimum kepercayaan.",
      "<b>Autentikasi</b> punya tiga jenis faktor: <b>yang kamu tahu</b> (password, PIN; paling lemah bila sendirian), <b>yang kamu miliki</b> (OTP, authenticator, ponsel, kunci keamanan), <b>yang melekat padamu</b> (sidik jari, wajah).",
      "<b>MFA</b> menggabungkan dua faktor berbeda. Kontrol paling murah dengan dampak terbesar melawan pembobolan akun.",
      "Keamanan transaksi e-commerce: (1) HTTPS menyeluruh di seluruh alur checkout, (2) payment gateway tepercaya dan hindari menyimpan data kartu sendiri, (3) tokenisasi dan kepatuhan PCI DSS, (4) sinyal kepercayaan yang terlihat (gembok, label secure checkout, logo pembayaran resmi).",
      "Pemetaan ke CIA: enkripsi, kontrol akses, MFA → Kerahasiaan. MFA, tanda tangan digital, validasi data → Integritas. Backup, redundansi sistem, mitigasi DDoS → Ketersediaan."
    ],
    k: [],
    h: [],
    jb: [
      "MFA = dua faktor yang BERBEDA jenis. Password + PIN sama-sama &ldquo;yang kamu tahu&rdquo;, jadi bukan MFA.",
      "Bedakan at rest (data tersimpan) dan in transit (data dikirim). HTTPS melindungi yang in transit.",
      "Jawaban aman untuk data kartu: serahkan ke payment gateway bersertifikat dan pakai tokenisasi, jangan simpan sendiri.",
      "Pertahanan bukan soal teknis semata: ia pilihan untuk melindungi kepercayaan, kebenaran data, dan kelangsungan layanan."
    ],
    lab: ["checkout"]
  },
  {
    n: 4, b: 1, j: "Kerangka Etika & Dilema Etis Digital", s: "Dari “aman” ke “benar”",
    tag: ["3 lensa etika", "Dark pattern", "Legal ≠ etis"],
    r: "Pergeseran fokus: tiga pertemuan lalu soal apa yang aman, mulai sekarang soal apa yang benar dan cara menimbangnya.",
    p: [
      "Tiga lensa untuk menimbang keputusan (bukan jawaban tunggal, melainkan sudut pandang): <b>Konsekuensialisme</b> (nilai dari hasilnya: mana yang manfaat terbesar dan bahaya terkecil?), <b>Deontologi</b> (nilai dari kewajiban dan hak: apakah hak dihormati, terlepas dari hasil?), <b>Etika Keutamaan</b> (nilai dari karakter: apa yang dilakukan pihak yang jujur dan berintegritas?).",
      "Markkula Center memperluasnya menjadi enam lensa: menambah keadilan, kebaikan bersama, dan kepedulian.",
      "Satu dilema dilihat dari tiga sudut biasanya menghasilkan keputusan yang lebih bijak daripada satu sudut saja.",
      "Dilema khas bisnis digital: <b>privasi dan data</b> (mengumpulkan lebih dari yang diperlukan), <b>dark pattern</b> (desain menjebak: langganan sulit dibatalkan, tombol menyesatkan), <b>bias algoritma</b>, <b>pengawasan dan AI</b> (pelacakan berlebihan, deepfake, konten AI tanpa keterbukaan).",
      "Teknologi bergerak lebih cepat daripada hukum. Selalu ada wilayah abu-abu; di ruang kosong itu etika menjadi penuntun. &ldquo;Legal&rdquo; tidak selalu berarti &ldquo;etis&rdquo;, dan sebaliknya."
    ],
    k: [],
    h: [],
    jb: [
      "Tidak ada jawaban benar tunggal. Yang dinilai adalah argumentasi. Selalu tulis alasan, bukan hanya putusan.",
      "Hafalkan pertanyaan kunci tiap lensa, itu yang paling mudah dipakai menjawab kasus.",
      "Kompetensi lulusan Bisnis Digital: mengambil keputusan yang bertanggung jawab justru ketika hukum belum sepenuhnya menjawab.",
      "Contoh &ldquo;hukum tertinggal&rdquo; yang disebut slide: deepfake dan AI generatif sering muncul sebelum aturannya ada."
    ],
    lab: ["lensa", "dark"]
  },
  {
    n: 5, b: 1, j: "Peretas, Aktor Ancaman & Ethical Hacking", s: "Izin, niat, tanggung jawab",
    tag: ["White · Grey · Black hat", "Responsible disclosure", "UU ITE Pasal 30"],
    r: "Spektrum peretas bukan &ldquo;jahat vs baik&rdquo;, melainkan soal izin, niat, dan tanggung jawab. Peretas bisa menjadi aset bila diberi jalur yang sah.",
    p: [
      "Tiga warna topi. <b>White hat</b>: bekerja atas izin tertulis, menemukan celah untuk memperbaikinya dan melapor. <b>Grey hat</b>: masuk tanpa izin dengan niat baik lalu menawarkan perbaikan; tetap area abu-abu dan berisiko hukum. <b>Black hat</b>: tanpa izin, niat merugikan (mencuri, memeras, menjual akses).",
      "Yang membedakan white dan black bukan teknis, melainkan <b>ada-tidaknya izin</b>. Niat baik saja tidak menghapus pelanggaran izin.",
      "Aktor ancaman dan motivasinya: <b>script kiddies</b> (iseng, pengakuan, alat siap pakai), <b>penjahat terorganisir</b> (uang: ransomware, penipuan, jual data), <b>hacktivist</b> (ideologi atau politik), <b>insider</b> (dendam, kelalaian, atau disuap), <b>aktor negara / APT</b> (spionase dan sabotase, sumber daya sangat besar).",
      "Poin bisnis: memahami motivasi membantu memprediksi siapa yang mungkin menyerang dan seberapa serius.",
      "Cara bisnis memakai peretas: <b>penetration testing</b> (sewa white hat), <b>bug bounty</b> (imbalan bagi pelapor celah yang sah, mis. HackerOne dan Bugcrowd), <b>red team vs blue team</b>, <b>responsible disclosure</b> (jalur resmi dan aman melapor sebelum diumumkan).",
      "Sisi hukum: di Indonesia akses tanpa izin melanggar UU ITE Pasal 30, grey hat pun bisa dipidana. Jadi &ldquo;etis&rdquo; tidak selalu sama dengan &ldquo;legal&rdquo;."
    ],
    k: [
      ["Kasus “Laporan celah dari orang asing”", [["IDOR", "ubah satu angka di URL, lihat transaksi akun lain"]],
        "Kamu mengelola Aplikasi A, dompet digital dengan ribuan pengguna. Email masuk dari orang tak dikenal: ia menemukan bahwa dengan mengubah satu angka di URL ia bisa melihat riwayat transaksi pengguna lain, mengaku tidak menyimpan atau menyebarkan data, bersedia menjelaskan, dan bertanya apakah ada bug bounty. Kamu belum punya program bug bounty. Apa yang kamu lakukan?"]
    ],
    h: ["ite", "std"],
    jb: [
      "White vs grey vs black: tanyakan dua hal, ada izin atau tidak, dan apa niatnya. Keahlian teknis bukan pembeda.",
      "Pelapor di kasus App A sudah melihat data orang lain tanpa izin, jadi secara definisi bergerak di area grey hat walau niatnya baik.",
      "Kebijakan disclosure yang baik seimbang: ada komitmen perusahaan DAN larangan bagi pelapor.",
      "Hafalkan lima jenis aktor ancaman beserta motivasinya, soal definisi sering muncul dari sini."
    ],
    lab: ["topi", "appa"]
  },
  {
    n: 6, b: 1, j: "Privasi dan Pengawasan di Era Digital", s: "Data pribadi dan ekonomi data",
    tag: ["Privasi = kendali", "Ekonomi data", "Minimalisasi data"],
    r: "Privasi adalah kendali atas data. Dalam ekonomi data informasi menjadi komoditas, dan lulusan Bisnis Digital berada di sisi yang mengumpulkannya.",
    p: [
      "Privasi adalah <b>kendali seseorang atas informasi mengenai dirinya</b>, bukan sekadar upaya menyembunyikan sesuatu.",
      "Data pribadi <b>umum</b> (nama, email, nomor telepon; relatif tidak sensitif) dan <b>spesifik</b> (kesehatan, biometrik, keuangan, keyakinan; sensitif dan menuntut perlindungan lebih ketat). Semakin sensitif data, semakin besar tanggung jawab pengumpulnya.",
      "Batas publik dan privat kabur: unggahan, lokasi, jejak pencarian. Data sepele yang digabung (<b>agregasi</b>) dapat mengungkap gambaran pribadi yang utuh.",
      "<b>Ekonomi data</b>: data pengguna adalah komoditas, dikumpulkan, diolah menjadi profil, dipakai untuk iklan bertarget. Apabila produk gratis, penggunalah produknya.",
      "Bentuk pengawasan: oleh <b>perusahaan</b> (cookies, pelacak, fingerprinting, lokasi, profiling), oleh <b>negara</b> (pemantauan warga atas nama keamanan), oleh <b>sesama pengguna</b> (doxing dan stalking).",
      "Tiga ketegangan: personalisasi vs privasi; keamanan vs privasi; manfaat bisnis vs hak pengguna. Ketiganya tidak punya jawaban tunggal.",
      "Empat prinsip pengumpulan data yang bertanggung jawab (pratinjau UU PDP): <b>minimalisasi data</b>, <b>persetujuan yang bermakna</b>, <b>transparansi</b>, <b>sesuai tujuan</b>.",
      "Waspadai <b>dark pattern</b> dalam meminta persetujuan, misalnya tombol &ldquo;Setuju Semua&rdquo; yang mencolok sementara pilihan menolak sengaja disembunyikan."
    ],
    k: [],
    h: ["pdp"],
    jb: [
      "Definisi privasi yang dipakai: kendali atas informasi diri, bukan sekadar menyembunyikan.",
      "Keputusan minimalisasi data harus diambil SEBELUM sebaris data pun dikumpulkan.",
      "Kalau diminta contoh pengawasan, sebut ketiga pelakunya: perusahaan, negara, sesama pengguna.",
      "Catatan alur dari slide: privasi dibahas dulu sebagai nilai etis; di Pertemuan 9 nilai ini dikodifikasikan menjadi hukum lewat UU PDP."
    ],
    lab: ["privasi", "dark"]
  },
  {
    n: 7, b: 1, j: "Hak Kekayaan Intelektual & Pembajakan Aset Digital", s: "Karya sendiri, karya orang lain",
    tag: ["Hak cipta", "Merek", "Paten · Rahasia dagang"],
    r: "Menutup blok etika dengan persoalan kepemilikan atas karya digital: melindungi karya sendiri dan menghormati karya milik orang lain.",
    p: [
      "Kekayaan intelektual = hasil pemikiran manusia yang memperoleh perlindungan hukum. Tak kasatmata, tetapi aset yang dapat dimiliki, dialihkan, dan dilanggar. Karya digital bisa disalin sempurna tanpa mengurangi aslinya, itulah yang membuat perlindungannya penting sekaligus sulit ditegakkan.",
      "Empat bentuk perlindungan: <b>hak cipta</b> (tulisan, gambar, kode program, desain), <b>merek dagang</b> (nama, logo, tanda pengenal usaha), <b>paten</b> (penemuan atau inovasi teknis yang baru), <b>rahasia dagang</b> (informasi bisnis yang sengaja dirahasiakan, mis. algoritma rekomendasi dan basis data pelanggan).",
      "Dua salah paham hak cipta: (1) hak cipta <b>lahir otomatis</b> sejak karya diwujudkan, tanpa pendaftaran (pendaftaran hanya memperkuat pembuktian); (2) yang dilindungi <b>wujudnya, bukan idenya</b>.",
      "Satu aplikasi memuat banyak lapisan hak cipta: kode program, desain antarmuka dan ikon, teks dan konten, gambar, ilustrasi, dan suara. Nama dan logo aplikasi berada di luar hak cipta, dilindungi tersendiri oleh merek dagang (contoh Gojek).",
      "Tiga peran: <b>pemilik</b> (aset bisa dijiplak), <b>pelaku pelanggaran</b> (sering tak disengaja: foto, font, atau musik tanpa lisensi, meniru desain pesaing), <b>korban</b> (produkmu dibajak: satu akun berbayar dipakai banyak orang, aplikasi dibongkar).",
      "Menimbang hak pencipta dan akses publik: <b>fair use</b> memberi ruang terbatas (pendidikan, ulasan); <b>lisensi terbuka</b> seperti Creative Commons dan open source jadi jalan tengah; meme, remix, dan konten AI berada di wilayah yang hukumnya sering belum tegas.",
      "Dasar hukum: hak cipta UU No. 28 Tahun 2014, merek UU No. 20 Tahun 2016 (dibahas lebih dalam di Pertemuan 9)."
    ],
    k: [],
    h: ["cipta", "merek"],
    jb: [
      "Nama dan logo = merek dagang, BUKAN hak cipta. Kode, desain, konten = hak cipta.",
      "Ide tidak dilindungi. Itu sebabnya banyak aplikasi pesan antar makanan bisa berdiri secara sah.",
      "Algoritma rekomendasi dan database pelanggan yang dirahasiakan = rahasia dagang.",
      "Saat menganalisis bisnis, lihat dari dua sisi sekaligus: sebagai pemilik dan sebagai pengguna karya orang lain."
    ],
    lab: ["hki"]
  }
];

// Langkah baku membedah kasus (dipakai di beranda dan studi kasus)
const PLAY = [
  ["Aset", "Data atau sistem apa yang jadi sasaran?", "P2"],
  ["Ancaman & kerentanan", "Siapa pelakunya, celah apa yang dimanfaatkan?", "P2, P5"],
  ["Jenis serangan & pilar CIA", "Malware, phishing, ransomware, DDoS? C, I, atau A yang dilanggar?", "P2"],
  ["Dampak bisnis", "Kepercayaan, reputasi, finansial.", "P1"],
  ["Pemangku kepentingan", "Siapa saja yang terdampak?", "P4"],
  ["Tiga lensa etika", "Konsekuensi, hak dan kewajiban, karakter.", "P4"],
  ["Hukum", "Sudah diatur, atau wilayah abu-abu?", "P5–P7"],
  ["Keputusan + alasan", "Pertanggungjawabkan pilihanmu.", "P4"]
];

// Peta hukum dan rujukan. Hanya yang disebut di slide; detail pasal lain belum dibahas.
const HK = [
  { id: "ite", n: "UU ITE", f: "UU No. 19 Tahun 2016 (perubahan atas UU No. 11 Tahun 2008) tentang Informasi dan Transaksi Elektronik", p: "P5",
    k: ["<b>Pasal 30</b>: akses tanpa izin melanggar hukum. Menurut slide, grey hat pun bisa dipidana, walau niatnya baik.", "Dipakai di kasus laporan celah (App A) untuk menunjukkan bahwa &ldquo;etis&rdquo; tidak selalu sama dengan &ldquo;legal&rdquo;."],
    u: "Soal peretas, ethical hacking, responsible disclosure." },
  { id: "pdp", n: "UU PDP", f: "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi", p: "P1, P6",
    k: ["Denda dapat mencapai <b>2% dari pendapatan tahunan</b> (slide P1).", "Empat prinsip di P6 adalah pratinjau UU PDP: minimalisasi data, persetujuan yang bermakna, transparansi, sesuai tujuan.", "Pendalaman isi UU dijadwalkan di Pertemuan 9 (belum ada di materi 1–7)."],
    u: "Soal dampak finansial insiden, pengumpulan data, persetujuan, privasi." },
  { id: "cipta", n: "UU Hak Cipta", f: "UU No. 28 Tahun 2014 tentang Hak Cipta", p: "P7",
    k: ["Melindungi karya: tulisan, gambar, kode program, desain, dst.", "Perlindungan lahir otomatis; pendaftaran hanya memperkuat pembuktian.", "Yang dilindungi wujudnya, bukan idenya."],
    u: "Soal kode, konten, desain antarmuka, pembajakan." },
  { id: "merek", n: "UU Merek", f: "UU No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis", p: "P7",
    k: ["Melindungi nama, logo, dan tanda pengenal usaha.", "Tujuan: mencegah kebingungan konsumen dan menjaga reputasi.", "Sengketa nama domain dan pemakaian merek pada kata kunci iklan termasuk persoalan lazim di ranah digital."],
    u: "Soal nama dan logo aplikasi, brand, sengketa domain." }
];
const STD = [
  ["PCI DSS", "Standar keamanan data kartu pembayaran (P3).", "pcisecuritystandards.org"],
  ["NIST SP 800-63B", "Pedoman identitas digital: autentikasi dan pengelolaan authenticator (P3).", "pages.nist.gov/800-63-4"],
  ["ISO/IEC 29147:2018", "Standar pengungkapan kerentanan (vulnerability disclosure) (P5).", "iso.org"],
  ["OWASP Vulnerability Disclosure Cheat Sheet", "Panduan menyusun kebijakan pelaporan celah (P5).", "cheatsheetseries.owasp.org"],
  ["ACM Code of Ethics", "Kode etik profesi komputasi (P4).", "acm.org/code-of-ethics"],
  ["Markkula Center Framework", "Kerangka pengambilan keputusan etis, enam lensa (P4).", "scu.edu/ethics"],
  ["Creative Commons", "Lisensi terbuka untuk berbagi karya dengan syarat tertentu (P7).", "creativecommons.org/licenses"],
  ["Deceptive Patterns (H. Brignull)", "Katalog dark pattern (P6).", "deceptive.design"]
];
const ABU = [
  ["Deepfake dan AI generatif", "Sering muncul sebelum aturannya ada (P4)."],
  ["Konten buatan AI, meme, remix", "Hukum hak ciptanya sering belum tegas (P7)."],
  ["Dark pattern", "Dilema etis khas bisnis digital; di sini etika yang jadi penuntun (P4, P6)."],
  ["Bias algoritma dan pengawasan berlebihan", "Dilema etis yang belum tentu punya pasal khusus (P4)."]
];
