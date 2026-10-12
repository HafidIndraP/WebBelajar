// ===== Laboratorium interaktif. Tanpa hitungan: klasifikasi, simulasi, audit, dan pengambilan keputusan =====
// Setiap lab: t=judul, p=pertemuan, d=deskripsi, ty=jenis mesin, ic=ikon teks
const LABS = {
  sim:      { t: "Simulator Kebocoran", p: [1], ic: "◉", ty: "sim", d: "Pilih bisnis digital, lihat data yang dipegangnya, lalu simulasikan kebocoran dan baca dampaknya pada kepercayaan, reputasi, dan finansial." },
  cia:      { t: "Bongkar Insiden: CIA", p: [2], ic: "▤", ty: "cls", d: "Tentukan pilar CIA yang dilanggar tiap insiden, lalu lihat pembongkaran aset, ancaman, kerentanan, dan jenis serangannya.", cfg: null },
  checkout: { t: "Audit Checkout", p: [3], ic: "⛨", ty: "chk", d: "Nyalakan kontrol keamanan pada toko online contoh dan lihat pengaruhnya pada tiga pilar CIA dan tingkat kepercayaan." },
  lensa:    { t: "Tiga Lensa Etika", p: [4], ic: "◐", ty: "len", d: "Timbang satu dilema digital dari tiga lensa, lalu lihat apakah ketiganya sepakat." },
  dark:     { t: "Pemburu Dark Pattern", p: [4, 6], ic: "⚠", ty: "dp", d: "Tandai elemen mencurigakan pada layar persetujuan, lalu bandingkan dengan versi yang etis." },
  topi:     { t: "Topi Peretas", p: [5], ic: "♞", ty: "cls", d: "White, grey, atau black hat? Pertimbangkan izin dan niat, lalu cek sisi hukumnya.", cfg: null },
  appa:     { t: "Kasus App A: Laporan Celah", p: [5], ic: "✉", ty: "app", d: "Email dari orang asing melaporkan celah. Pilih responsmu, lalu susun kebijakan responsible disclosure yang seimbang." },
  privasi:  { t: "Audit Privasi & Minimalisasi Data", p: [6], ic: "☰", ty: "cls", d: "Pisahkan data yang wajib dari yang berlebihan untuk tiga bisnis, lalu uji kalimat persetujuan.", cfg: null },
  hki:      { t: "Peta HKI", p: [7], ic: "©", ty: "cls", d: "Cocokkan aset digital dengan bentuk perlindungannya: hak cipta, merek, paten, atau rahasia dagang.", cfg: null }
};

// ----- data: klasifikasi -----
const CLS_CIA = {
  opts: [{ n: "Confidentiality", s: "Kerahasiaan" }, { n: "Integrity", s: "Integritas" }, { n: "Availability", s: "Ketersediaan" }],
  items: [
    { t: "Basis data 91 juta akun pengguna dicuri lalu dijual di dark web.", a: 0, w: "Data jatuh ke pihak yang tidak berwenang: kerahasiaan.", x: [["Aset", "Data akun pengguna"], ["Ancaman", "Kriminal pencuri data"], ["Kerentanan", "Pertahanan data lemah"], ["Jenis", "Kebocoran data"]] },
    { t: "Penyerang mengubah harga sebuah produk di toko online menjadi Rp1.", a: 1, w: "Data diubah tanpa izin: integritas.", x: [["Aset", "Data harga"], ["Ancaman", "Penyerang eksternal"], ["Kerentanan", "Kontrol akses atau validasi lemah"], ["Jenis", "Manipulasi data (tampering)"]] },
    { t: "Ransomware mengenkripsi seluruh data sebuah pusat data; layanan publik lumpuh berhari-hari.", a: 2, w: "Di slide, ransomware dipetakan ke ketersediaan: data dan layanan tak bisa diakses.", x: [["Aset", "Data dan sistem layanan"], ["Ancaman", "Penjahat terorganisir"], ["Kerentanan", "Tidak ada backup yang bisa direstore"], ["Jenis", "Ransomware"]] },
    { t: "Situs flash sale mati karena dibanjiri trafik palsu.", a: 2, w: "Layanan tidak dapat diakses saat dibutuhkan: ketersediaan.", x: [["Aset", "Situs dan layanan penjualan"], ["Ancaman", "Penyerang yang membanjiri trafik"], ["Kerentanan", "Tanpa mitigasi DDoS"], ["Jenis", "DDoS"]] },
    { t: "Email palsu yang menyamar sebagai bank meminta pengguna memasukkan password.", a: 0, w: "Tujuannya mencuri kredensial: kerahasiaan.", x: [["Aset", "Kredensial akun"], ["Ancaman", "Penipu"], ["Kerentanan", "Pengguna mudah percaya, tanpa MFA"], ["Jenis", "Phishing"]] },
    { t: "Karyawan yang dendam menyalin database pelanggan sebelum keluar dari perusahaan.", a: 0, w: "Pencurian oleh orang dalam: kerahasiaan.", x: [["Aset", "Database pelanggan"], ["Ancaman", "Insider"], ["Kerentanan", "Akses terlalu luas"], ["Jenis", "Pencurian data oleh orang dalam"]] },
    { t: "Pelaku mengubah saldo sebuah akun di database tanpa izin.", a: 1, w: "Angka diubah tanpa izin: integritas.", x: [["Aset", "Data saldo"], ["Ancaman", "Penyerang atau insider"], ["Kerentanan", "Kontrol akses lemah, tanpa jejak audit"], ["Jenis", "Manipulasi data"]] },
    { t: "Pembaruan software dari pemasok disusupi malware sebelum sampai ke pelanggan.", a: 1, w: "Slide memetakan serangan rantai pasok ke integritas: yang dipercaya sudah diubah.", x: [["Aset", "Software dan sistem pelanggan"], ["Ancaman", "Penyerang yang menyusupi pemasok"], ["Kerentanan", "Kepercayaan penuh pada pemasok"], ["Jenis", "Serangan rantai pasok (malware)"]] },
    { t: "Server utama rusak dan tidak ada cadangan atau server pengganti sehingga toko mati seharian.", a: 2, w: "Kegagalan sistem termasuk ketersediaan.", x: [["Aset", "Server dan layanan"], ["Ancaman", "Kegagalan sistem"], ["Kerentanan", "Tanpa backup dan redundansi"], ["Jenis", "Gangguan ketersediaan"]] },
    { t: "Spyware di ponsel diam-diam merekam data kartu yang diketik pengguna.", a: 0, w: "Data sensitif jatuh ke pihak tak berwenang: kerahasiaan.", x: [["Aset", "Data kartu pengguna"], ["Ancaman", "Pembuat spyware"], ["Kerentanan", "Aplikasi tak tepercaya terpasang"], ["Jenis", "Malware (spyware)"]] }
  ]
};
const CLS_TOPI = {
  opts: [{ n: "White hat", s: "dengan izin" }, { n: "Grey hat", s: "tanpa izin, niat baik" }, { n: "Black hat", s: "tanpa izin, niat merugikan" }],
  items: [
    { t: "Konsultan keamanan diberi surat izin tertulis untuk menguji sistem sebuah bank dan melaporkan celahnya.", a: 0, w: "Ada izin tertulis dan niat memperbaiki.", x: [["Izin", "Ada"], ["Niat", "Memperbaiki"], ["Hukum", "Sah"]] },
    { t: "Mahasiswa membobol situs kampus tanpa izin, lalu mengirim email menawarkan perbaikan.", a: 1, w: "Tanpa izin tetapi niat baik: grey hat.", x: [["Izin", "Tidak ada"], ["Niat", "Baik"], ["Hukum", "Berisiko: UU ITE Pasal 30"]] },
    { t: "Sekelompok orang mencuri data pelanggan sebuah toko online dan menjualnya di dark web.", a: 2, w: "Tanpa izin dan niat merugikan untuk keuntungan ilegal.", x: [["Izin", "Tidak ada"], ["Niat", "Merugikan"], ["Hukum", "Melanggar"]] },
    { t: "Peneliti mengikuti program bug bounty resmi sebuah perusahaan dan melapor lewat kanal yang disediakan.", a: 0, w: "Program resmi memberi izin dan jalur yang sah.", x: [["Izin", "Ada (lewat program)"], ["Niat", "Melapor"], ["Hukum", "Sah"]] },
    { t: "Seseorang mengenkripsi data sebuah rumah sakit tanpa izin dan menuntut tebusan.", a: 2, w: "Memeras demi uang: black hat.", x: [["Izin", "Tidak ada"], ["Niat", "Memeras"], ["Hukum", "Melanggar"]] },
    { t: "Pengguna menemukan celah, membuka data orang lain 'sekadar memastikan', lalu melapor tanpa meminta imbalan.", a: 1, w: "Niat baik tidak menghapus pelanggaran izin: akses ke data orang lain tanpa izin tetap grey hat.", x: [["Izin", "Tidak ada"], ["Niat", "Baik"], ["Hukum", "Berisiko: UU ITE Pasal 30"]] },
    { t: "Tim red team internal menyerang sistem perusahaannya sendiri sesuai ruang lingkup yang disetujui manajemen.", a: 0, w: "Red team bekerja dengan persetujuan dan tujuan menguatkan pertahanan.", x: [["Izin", "Ada (disetujui)"], ["Niat", "Menguatkan"], ["Hukum", "Sah"]] },
    { t: "Karyawan menjual akses sistem perusahaan kepada penjahat.", a: 2, w: "Insider yang disuap: tanpa izin yang sah dan niat merugikan.", x: [["Izin", "Tidak sah"], ["Niat", "Menguntungkan diri, merugikan perusahaan"], ["Hukum", "Melanggar"]] }
  ]
};
const CLS_HKI = {
  opts: [{ n: "Hak cipta" }, { n: "Merek dagang" }, { n: "Paten" }, { n: "Rahasia dagang" }],
  items: [
    { t: "Kode program sebuah aplikasi dompet digital.", a: 0, w: "Kode program adalah karya yang dilindungi hak cipta." },
    { t: "Nama dan logo aplikasi.", a: 1, w: "Nama dan logo di luar hak cipta: dilindungi merek dagang." },
    { t: "Metode kompresi data baru buatan sendiri.", a: 2, w: "Penemuan atau inovasi teknis yang baru: paten." },
    { t: "Algoritma rekomendasi yang sengaja dirahasiakan perusahaan.", a: 3, w: "Informasi bisnis yang dirahasiakan: rahasia dagang." },
    { t: "Artikel blog dan foto produk buatan tim sendiri.", a: 0, w: "Tulisan dan gambar: hak cipta." },
    { t: "Basis data pelanggan yang tidak dipublikasikan.", a: 3, w: "Contoh rahasia dagang di slide: basis data pelanggan." },
    { t: "Desain antarmuka dan set ikon aplikasi.", a: 0, w: "Tampilan yang dilihat dan disentuh pengguna: hak cipta." },
    { t: "Tanda pengenal yang membedakan satu toko online dari toko lain.", a: 1, w: "Tanda pengenal usaha: merek dagang." },
    { t: "Ilustrasi dan musik latar yang dipakai di dalam aplikasi.", a: 0, w: "Aset visual dan audio: hak cipta." },
    { t: "Inovasi teknis baru pada cara memproses pembayaran.", a: 2, w: "Penemuan teknis yang baru: paten." },
    { t: "Sengketa karena nama domain meniru merek terkenal.", a: 1, w: "Perebutan nama domain adalah persoalan merek yang lazim di ranah digital." },
    { t: "Daftar harga pemasok dan strategi bisnis yang sengaja dirahasiakan.", a: 3, w: "Informasi bisnis yang dijaga kerahasiaannya: rahasia dagang." }
  ]
};
const DATA_OPTS = [{ n: "Wajib", s: "perlu untuk layanan" }, { n: "Berlebihan", s: "sebaiknya tidak diambil" }];
const CLS_PRIV = {
  variants: [
    { n: "Klinik daring", opts: DATA_OPTS, intro: "Bisnis: layanan konsultasi dokter lewat aplikasi (tanpa pengiriman obat).", items: [
      { t: "Nama lengkap pasien", a: 0, w: "Dibutuhkan untuk mengidentifikasi pasien dan menautkan riwayat konsultasi." },
      { t: "Keluhan dan riwayat penyakit", a: 0, w: "Inti layanan. Ini data spesifik (kesehatan), jadi perlindungannya harus lebih ketat." },
      { t: "Alergi obat", a: 0, w: "Penting untuk keselamatan pasien." },
      { t: "Nomor telepon aktif", a: 0, w: "Untuk menghubungi pasien saat konsultasi." },
      { t: "Daftar kontak di ponsel", a: 1, w: "Tidak ada kaitan dengan konsultasi medis." },
      { t: "Lokasi GPS terus-menerus", a: 1, w: "Layanan daring tidak perlu melacak keberadaan sepanjang waktu." },
      { t: "Agama dan keyakinan", a: 1, w: "Data spesifik yang tidak relevan dengan layanan." },
      { t: "Penghasilan bulanan", a: 1, w: "Tidak diperlukan untuk konsultasi." },
      { t: "Alamat lengkap (layanan hanya konsultasi, tanpa kirim obat)", a: 1, w: "Alamat baru perlu bila ada pengiriman; untuk konsultasi saja berlebihan." }
    ] },
    { n: "E-commerce", opts: DATA_OPTS, intro: "Bisnis: toko online yang mengirim barang ke pembeli.", items: [
      { t: "Nama penerima", a: 0, w: "Untuk pengiriman dan konfirmasi pesanan." },
      { t: "Alamat pengiriman", a: 0, w: "Tanpa alamat, barang tak bisa dikirim." },
      { t: "Nomor telepon untuk kurir", a: 0, w: "Dipakai kurir untuk menghubungi penerima." },
      { t: "Email untuk konfirmasi pesanan", a: 0, w: "Saluran bukti transaksi dan notifikasi." },
      { t: "Pembayaran lewat payment gateway (hanya token)", a: 0, w: "Perlu untuk transaksi, dan lebih aman karena data kartu tidak disimpan sendiri." },
      { t: "Tanggal lahir lengkap (untuk barang umum)", a: 1, w: "Tidak diperlukan kecuali produk berbatas usia." },
      { t: "Daftar kontak di ponsel", a: 1, w: "Tidak ada kaitan dengan pembelian." },
      { t: "Akses galeri foto", a: 1, w: "Tidak diperlukan untuk belanja." },
      { t: "Lokasi GPS terus-menerus", a: 1, w: "Cukup minta alamat pengiriman atau izin lokasi saat dipakai." },
      { t: "Riwayat pencarian di luar aplikasi", a: 1, w: "Pelacakan berlebihan untuk profiling iklan." }
    ] },
    { n: "Ojek online", opts: DATA_OPTS, intro: "Bisnis: aplikasi pemesanan perjalanan.", items: [
      { t: "Lokasi saat memesan", a: 0, w: "Inti layanan: jemput dan antar." },
      { t: "Nama pengguna", a: 0, w: "Identifikasi pesanan dan komunikasi dengan driver." },
      { t: "Nomor telepon", a: 0, w: "Komunikasi driver dan penumpang." },
      { t: "Metode pembayaran", a: 0, w: "Diperlukan untuk transaksi." },
      { t: "Lokasi terus-menerus saat aplikasi tidak dipakai", a: 1, w: "Tidak ada perjalanan, tidak ada alasan melacak." },
      { t: "Daftar kontak di ponsel", a: 1, w: "Tidak diperlukan untuk memesan perjalanan." },
      { t: "Akses mikrofon sepanjang waktu", a: 1, w: "Pengawasan berlebihan tanpa kebutuhan jelas." },
      { t: "Riwayat chat di aplikasi lain", a: 1, w: "Tidak ada hubungan dengan layanan." }
    ] },
    { n: "Uji persetujuan", opts: [{ n: "Bermakna", s: "jujur dan jelas" }, { n: "Bermasalah", s: "kabur atau menjebak" }], intro: "Nilai kalimat atau tampilan persetujuan berikut: bermakna atau bermasalah?", items: [
      { t: "“Dengan memakai aplikasi ini, Anda menyetujui semua pengumpulan dan penggunaan data kami.”", a: 1, w: "Terlalu umum dan menggabungkan semua tujuan. Pengguna tidak tahu data apa dipakai untuk apa." },
      { t: "“Kami memakai nama, alamat, dan nomor telepon Anda hanya untuk mengirim pesanan. Lokasi diminta hanya saat Anda memakai fitur Cari Terdekat. Anda boleh menolak tanpa kehilangan layanan utama.”", a: 0, w: "Spesifik, tujuannya jelas, dan menolak tidak dihukum: persetujuan bermakna." },
      { t: "“Demi pengalaman terbaik, data Anda dapat kami pakai untuk berbagai keperluan, termasuk dibagikan ke mitra kami.”", a: 1, w: "Tujuan kabur ('berbagai keperluan') dan pembagian ke pihak ketiga tidak dijelaskan." },
      { t: "Layar dengan tombol hijau besar “Setuju Semua” dan opsi menolak berupa teks abu-abu kecil di pojok.", a: 1, w: "Dark pattern: persetujuan didorong oleh desain, bukan pilihan yang jujur." },
      { t: "“Kami meminta izin lokasi untuk menampilkan kedai terdekat. Pilih Izinkan saat dipakai atau Tolak. Anda bisa mengubahnya kapan saja di Pengaturan.”", a: 0, w: "Tujuan spesifik, pilihan setara, dan bisa ditarik kembali." }
    ] }
  ]
};
LABS.cia.cfg = CLS_CIA; LABS.topi.cfg = CLS_TOPI; LABS.hki.cfg = CLS_HKI; LABS.privasi.cfg = CLS_PRIV;

// ----- data: simulator kebocoran -----
const SIM = [
  { n: "Marketplace", data: ["Nama dan alamat", "Nomor telepon", "Riwayat belanja", "Data pembayaran (token)", "Kredensial akun", "Chat dengan penjual"],
    risk: ["Penipuan yang menyamar sebagai penjual atau kurir", "Phishing bertarget memakai riwayat belanja", "Akun diambil alih"],
    m: [80, 70, 65], tx: ["Pembeli ragu menyimpan alamat dan nomor teleponnya; sebagian pindah platform.", "Berita 'jutaan akun bocor' menempel pada nama platform bertahun-tahun.", "Biaya pemulihan, penguatan sistem, komunikasi krisis, dan penjualan yang turun."] },
  { n: "Fintech", data: ["Data identitas (KYC)", "Saldo dan riwayat transaksi", "Nomor rekening atau kartu", "PIN dan data biometrik", "Kontak dan lokasi"],
    risk: ["Saldo dibobol", "Pinjaman online atas nama korban", "Penipuan memakai data transaksi asli"],
    m: [95, 80, 90], tx: ["Orang menyerahkan uang dan identitas karena percaya; satu insiden bisa membuat pengguna menarik dana.", "Dompet atau fintech yang bocor dianggap tidak layak menyimpan uang.", "Ganti rugi, sanksi regulator, biaya forensik, dan mitra yang kabur."] },
  { n: "Ojek online", data: ["Lokasi real-time dan riwayat perjalanan", "Alamat rumah dan kantor", "Nomor telepon penumpang dan driver", "Data pembayaran", "Foto dan identitas driver"],
    risk: ["Penguntitan (stalking)", "Penipuan lewat nomor telepon", "Ancaman keselamatan fisik"],
    m: [85, 75, 60], tx: ["Pengguna takut aplikasi membuka rumah dan kebiasaan perjalanannya.", "Isu keselamatan membuat sorotan media lebih tajam dan lebih lama.", "Biaya pemulihan, kompensasi, dan perpindahan ke pesaing."] },
  { n: "Streaming", data: ["Email dan password", "Riwayat tontonan", "Data kartu langganan", "Profil keluarga dan anak", "Daftar perangkat"],
    risk: ["Akun diambil alih lalu dijual", "Kebiasaan menonton terbongkar", "Kartu disalahgunakan"],
    m: [60, 55, 70], tx: ["Pelanggan mudah berhenti langganan dan pindah layanan.", "Dampaknya lebih ringan dibanding fintech, tetapi tetap jadi berita.", "Pendapatan langganan turun dan biaya penggantian kredensial naik."] },
  { n: "Klinik online", data: ["Rekam medis dan diagnosis", "Identitas pasien", "Resep dan riwayat obat", "Data asuransi dan pembayaran", "Rekaman konsultasi"],
    risk: ["Diskriminasi di pekerjaan atau asuransi", "Pemerasan memakai kondisi kesehatan", "Rasa malu dan tekanan psikologis"],
    m: [98, 85, 70], tx: ["Pasien berhenti jujur kepada dokter bila datanya tak aman; kepercayaan sulit pulih.", "Data kesehatan adalah data spesifik; kebocorannya dinilai sangat serius.", "Sanksi, biaya pemulihan, dan hilangnya pasien serta mitra rumah sakit."] }
];
const MN = ["Kepercayaan", "Reputasi", "Finansial"];

// ----- data: audit checkout -----
// c,i,a = sumbangan ke pilar (0-100 total), t = sinyal kepercayaan, bad = kontrol buruk
const CTRL = [
  { id: "https", n: "HTTPS di seluruh alur checkout", c: 20, i: 25, a: 0, f: "Data kartu dan password melintas tanpa enkripsi: mudah disadap (C) dan diubah di jalan (I)." },
  { id: "gateway", n: "Payment gateway tepercaya", c: 20, i: 0, a: 0, f: "Pemrosesan kartu dilakukan sendiri tanpa pihak bersertifikat: beban dan risiko tinggi." },
  { id: "token", n: "Tokenisasi dan kepatuhan PCI DSS", c: 20, i: 0, a: 0, f: "Data kartu asli beredar di sistem; bila bocor langsung bisa disalahgunakan." },
  { id: "mfa", n: "MFA untuk login dan transaksi besar", c: 15, i: 25, a: 0, f: "Akun hanya dijaga password: pembobolan akun mudah dilakukan." },
  { id: "rest", n: "Enkripsi data pelanggan saat disimpan (at rest)", c: 25, i: 0, a: 0, f: "Jika database bocor, isinya langsung terbaca." },
  { id: "valid", n: "Validasi data dan tanda tangan digital pada transaksi", c: 0, i: 35, a: 0, f: "Harga atau pesanan bisa dimanipulasi tanpa terdeteksi." },
  { id: "backup", n: "Backup teruji dan terpisah", c: 0, i: 15, a: 30, f: "Jika data rusak atau terkunci, tidak ada yang bisa dipulihkan (ingat PDNS)." },
  { id: "redund", n: "Redundansi server", c: 0, i: 0, a: 30, f: "Satu server mati berarti toko mati, apalagi saat flash sale." },
  { id: "ddos", n: "Mitigasi DDoS (filter trafik atau CDN)", c: 0, i: 0, a: 40, f: "Trafik palsu bisa melumpuhkan situs saat ramai." },
  { id: "badge", n: "Sinyal kepercayaan terlihat (gembok, secure checkout, logo resmi)", c: 0, i: 0, a: 0, t: 1, f: "" },
  { id: "raw", n: "Menyimpan data kartu mentah di database sendiri", c: -40, i: 0, a: 0, bad: 1, f: "Data kartu mentah tersimpan di sistem sendiri: jika bocor kerugiannya besar, dan bertentangan dengan praktik PCI DSS." }
];
const PRESET = {
  asal: ["badge", "raw"],
  minimum: ["https", "gateway", "token", "mfa", "badge"],
  ideal: ["https", "gateway", "token", "mfa", "rest", "valid", "backup", "redund", "ddos", "badge"],
  kosong: []
};

// ----- data: tiga lensa -----
const LENS = [
  ["Konsekuensialisme", "Mana pilihan yang membawa manfaat terbesar dan bahaya terkecil?"],
  ["Deontologi", "Apakah ini menghormati hak dan kewajiban, terlepas dari hasilnya?"],
  ["Etika Keutamaan", "Apa yang dilakukan orang atau organisasi yang jujur dan berintegritas?"]
];
const STANCE = ["Dapat diterima", "Perlu diubah", "Sebaiknya dihentikan"];
const SCN = [
  { t: "Lokasi terus-menerus untuk iklan", d: "Haruskah aplikasi kita mengumpulkan lokasi pengguna terus-menerus demi iklan yang lebih relevan?",
    who: "Pengguna, perusahaan, pengiklan, regulator.", law: "Berkaitan dengan prinsip minimalisasi data dan persetujuan yang bermakna (pratinjau UU PDP, pendalaman di Pertemuan 9). Selebihnya bergantung pada bagaimana persetujuannya diminta.",
    k: [["Manfaat: iklan lebih relevan dan pendapatan naik.", "Risiko: jejak lokasi terus-menerus membuka rumah, kantor, dan kebiasaan (agregasi), plus kebocoran dan rasa tidak nyaman."],
        ["Apakah pengguna diberi tahu dan benar-benar setuju?", "Hak privasi (kendali atas informasi diri) terhormat bila persetujuan bermakna dan bisa ditolak."],
        ["Pengumpulan diam-diam mencerminkan perusahaan yang tidak jujur.", "Perusahaan berintegritas meminta hanya yang perlu dan menjelaskan tujuannya."]] },
  { t: "Langganan mudah masuk, sulit keluar", d: "Langganan bisa dibuat dengan satu klik, tetapi pembatalannya harus melewati lima layar dan menelepon layanan pelanggan.",
    who: "Pelanggan, perusahaan, tim desain yang diminta membuatnya, pesaing.", law: "Dark pattern termasuk dilema etis khas bisnis digital dan sering berada di wilayah abu-abu; etika menjadi penuntun.",
    k: [["Manfaat: jumlah pelanggan bertahan naik sesaat.", "Risiko: pengguna kesal, ulasan buruk, kepercayaan turun, bisa menarik perhatian regulator."],
        ["Persetujuan yang bertahan karena desain menjebak tidak bermakna.", "Menghormati hak memilih berarti berhenti berlangganan semudah mendaftar."],
        ["Desain yang sengaja menjebak bukan sikap jujur.", "Perusahaan berintegritas menyamakan kemudahan daftar dan batal."]] },
  { t: "Algoritma seleksi pinjaman yang bias", d: "Algoritma seleksi pinjaman otomatis ternyata lebih sering menolak pemohon dari daerah tertentu.",
    who: "Pemohon dari daerah terdampak, perusahaan, tim data, regulator.", law: "Belum tentu ada aturan yang spesifik: wilayah abu-abu, sehingga pertimbangan etis menentukan.",
    k: [["Manfaat: keputusan cepat dan murah.", "Bahaya: kelompok tertentu dirugikan diam-diam dan kepercayaan publik turun."],
        ["Apakah semua pemohon diperlakukan adil dan berhak tahu dasar penolakan?", "Ketidakadilan yang sistematis melanggar hak walau rata-rata akurasi tinggi."],
        ["Perusahaan berintegritas menguji dan memperbaiki bias, bukan menutupinya.", "Mengakui temuan adalah ciri karakter yang bertanggung jawab."]] },
  { t: "Konten AI tanpa keterbukaan", d: "Perusahaan memakai AI generatif untuk menulis ulasan produk dan konten pemasaran tanpa memberi tahu pengguna.",
    who: "Pengguna, perusahaan, tim pemasaran, pesaing.", law: "AI generatif sering muncul sebelum aturannya ada: wilayah abu-abu.",
    k: [["Manfaat: konten murah dan cepat.", "Risiko: pengguna tertipu bila mengira itu ulasan asli; kepercayaan runtuh saat terbongkar."],
        ["Pengguna berhak tahu asal konten yang memengaruhi keputusan belinya.", "Menyajikan konten AI sebagai ulasan pengguna nyata adalah menipu."],
        ["Keterbukaan adalah ciri perusahaan jujur.", "Memakai AI boleh; menyembunyikannya yang bermasalah."]] }
];

// ----- data: pemburu dark pattern -----
// z=gaya, t=teks, d=1 jika dark pattern, n=nama pola, w=penjelasan
const DPE = [
  { z: "title", t: "Kami menghargai privasi Anda", d: 0, w: "Judul yang wajar. Yang dinilai adalah cara pilihannya disajikan, bukan kalimat pembukanya." },
  { z: "timer", t: "⏱ Diskon 20% berakhir dalam 04:59", d: 1, n: "Urgensi palsu", w: "Hitung mundur menekan pengguna agar buru-buru menyetujui tanpa membaca." },
  { z: "chk on", t: "☑ Bagikan data saya ke mitra iklan", d: 1, n: "Opsi sudah tercentang", w: "Persetujuan dibuat otomatis; pengguna harus aktif menolak. Persetujuan bermakna seharusnya dipilih sendiri." },
  { z: "chk", t: "☐ Kirimi saya newsletter mingguan", d: 0, w: "Kotak kosong dan tujuannya jelas: pengguna memilih sendiri." },
  { z: "big", t: "SETUJU SEMUA", d: 1, n: "Tombol yang mencolok", w: "Satu pilihan dibuat sangat menonjol agar yang lain terabaikan (contoh di slide)." },
  { z: "tiny", t: "atur pilihan lain", d: 1, n: "Pilihan menolak disembunyikan", w: "Opsi selain setuju dibuat kecil dan pucat sehingga sulit ditemukan (contoh di slide)." },
  { z: "shame", t: "Tidak, saya tidak mau hemat", d: 1, n: "Rasa bersalah (confirmshaming)", w: "Kalimat menolak dibuat memalukan agar pengguna mengurungkan niatnya." },
  { z: "link", t: "Kebijakan Privasi", d: 0, w: "Tautan ke kebijakan privasi justru bagian dari transparansi." }
];
const DPFIX = ["Tombol “Tolak semua” dan “Terima semua” berukuran dan berwarna setara", "Tidak ada kotak yang tercentang otomatis", "Tidak ada hitung mundur tekanan", "Kalimat menolak netral", "Tujuan tiap kategori data dijelaskan singkat dan bisa diatur per kategori"];

// ----- data: kasus App A -----
const MAIL = "Halo. Saya “A” yang tertarik pada keamanan siber. Saat memakai App A, saya menemukan bahwa dengan mengubah satu angka pada alamat (URL), saya bisa melihat riwayat transaksi akun pengguna lain. Saya sudah memastikan celah ini berfungsi, tetapi tidak menyimpan atau menyebarkan data siapa pun. Saya bersedia menjelaskan detailnya. Apakah perusahaan memberikan imbalan (bug bounty) untuk temuan seperti ini?";
const APPOPT = [
  { t: "Abaikan email itu, kemungkinan hanya spam atau pemerasan.", v: "bad", l: "Berisiko",
    k: "Celah tetap terbuka dan bisa ditemukan penjahat; kerugian ditanggung ribuan pengguna.", d: "Mengabaikan kewajiban melindungi data pengguna.", u: "Tidak bertanggung jawab; perusahaan yang berintegritas menanggapi laporan." },
  { t: "Balas lewat kanal aman: terima kasih, minta detail teknis, tegaskan agar tidak mengakses atau menyalin data lagi, dan nyatakan tidak akan menuntut selama beritikad baik.", v: "good", l: "Paling seimbang",
    k: "Celah bisa segera diverifikasi dan ditutup sebelum dieksploitasi.", d: "Menghormati hak pengguna (data dilindungi) dan hak pelapor (diperlakukan wajar) sambil menegaskan batas.", u: "Menunjukkan karakter jujur dan bertanggung jawab; belum perlu menyimpulkan niat pelapor." },
  { t: "Langsung laporkan ke polisi karena pelapor sudah mengakses data pengguna lain tanpa izin.", v: "mid", l: "Bisa dibenarkan, tapi bukan langkah pertama",
    k: "Memutus kerja sama dan membuat orang lain takut melapor; celah mungkin telat ditutup.", d: "Pelapor memang melanggar batas izin (UU ITE Pasal 30), jadi opsi hukum tetap ada.", u: "Reaktif; bijak bila ada tanda niat jahat, tetapi tidak otomatis cerminan integritas." },
  { t: "Bayar imbalan besar segera dan minta pelapor merahasiakan semuanya.", v: "bad", l: "Bermasalah",
    k: "Menutupi masalah tanpa memperbaiki proses; memicu orang lain mencoba hal serupa.", d: "Pengguna berhak diberi tahu bila datanya terpapar; membungkam melanggar keterbukaan.", u: "Terkesan menutupi, bukan bertanggung jawab." }
];
const PELM = [
  ["Cara dan saluran melapor", "Ke mana dan bagaimana celah dilaporkan (email khusus, formulir, kontak keamanan).", "Tanpa saluran, laporan nyasar atau pelapor memilih mengumumkan ke publik."],
  ["Komitmen perusahaan", "Tidak menuntut pelapor beritikad baik dan menanggapi dalam tenggat tertentu.", "Tanpa komitmen, pelapor takut melapor."],
  ["Larangan bagi pelapor", "Dilarang mengakses atau menyalin data pengguna dan dilarang publikasi dini.", "Tanpa larangan, hak pengguna dan perusahaan tidak terlindungi."],
  ["Imbalan atau pengakuan", "Ada bug bounty, ucapan terima kasih, atau tidak: harus jelas.", "Tanpa kejelasan, harapan pelapor tidak sama dengan perusahaan."],
  ["Rujukan etis dan hukum", "Kaitkan ke tiga lensa etika, UU ITE, dan UU PDP.", "Tanpa rujukan, kebijakan tampak sepihak."]
];

// ===== halaman indeks lab =====
function labsIndex() {
  const grp = [1, 2, 3, 4, 5, 6, 7].map(p => {
    const ls = Object.keys(LABS).filter(k => LABS[k].p[0] === p);
    return ls.length ? `<h3><span class="tagp">P${p}</span> ${MOD[p - 1].j}</h3><div class="cards">${ls.map(k => `<a class="lc" href="#/lab/${k}"><span class="ic">${LABS[k].ic}</span><b>${LABS[k].t}</b><small>${LABS[k].d}</small></a>`).join('')}</div>` : '';
  }).join('');
  return `<section class="page"><h2>Laboratorium</h2><p class="lead">Tanpa rumus, tanpa hitungan. Setiap lab melatih satu keterampilan dari materi: mengklasifikasi, mengaudit, menimbang, dan memutuskan. Cara tercepat memahami konsep sebelum UTS.</p>${grp}</section>`;
}

function labShell(id, body) {
  const L = LABS[id];
  return `<section class="page"><p class="crumb"><a href="#/lab">‹ Semua lab</a> ${L.p.map(p => `<a class="tagp" href="#/p/${p}">P${p}</a>`).join(' ')}</p><h2>${L.t}</h2><p class="lead">${L.d}</p><div class="labbody" aria-live="polite">${body}</div></section>`;
}

function labPage(id) {
  const L = LABS[id];
  if (!L) return labsIndex();
  if (ST.id !== id) { ST = { id }; if (L.ty === 'cls') clsInit(L); }
  const fn = { cls: clsBody, sim: simBody, chk: chkBody, len: lenBody, dp: dpBody, app: appBody }[L.ty];
  return labShell(id, fn(L));
}

// ===== mesin: klasifikasi =====
const clsCur = L => L.cfg.variants ? L.cfg.variants[ST.v || 0] : L.cfg;
function clsInit(L) { const c = clsCur(L); ST.order = shuffle(c.items.map((_, i) => i)); ST.i = 0; ST.s = 0; ST.a = null; ST.wrong = []; }
function clsBody(L) {
  const c = clsCur(L), opts = c.opts || L.cfg.opts, n = ST.order.length;
  const vs = L.cfg.variants ? `<div class="chips">${L.cfg.variants.map((v, i) => `<button class="chip ${i === (ST.v || 0) ? 'on' : ''}" data-act="cvar" data-v="${i}">${v.n}</button>`).join('')}</div>${c.intro ? `<p class="note">${c.intro}</p>` : ''}` : '';
  if (ST.i >= n) {
    const pct = Math.round(ST.s / n * 100);
    return `${vs}<div class="score"><div class="ring" style="--v:${pct}"><b>${pct}%</b></div><div><h3>${ST.s} dari ${n} tepat</h3><p>${pct >= 80 ? 'Kuat. Pindah ke lab berikutnya atau coba studi kasus.' : 'Perhatikan alasan pada item yang salah, lalu ulangi.'}</p></div></div><button class="btn pri" data-act="crestart">Ulangi</button>${ST.wrong.length ? `<h3>Yang perlu diulang</h3>${ST.wrong.map(w => `<div class="rev"><b>${w.t}</b><p>Jawaban: ${w.a}</p><p class="mute">${w.w}</p></div>`).join('')}` : ''}`;
  }
  const it = c.items[ST.order[ST.i]], ok = ST.a === it.a;
  const ob = opts.map((o, j) => `<button class="opt ${ST.a == null ? '' : j === it.a ? 'ok' : j === ST.a ? 'no' : ''}" ${ST.a == null ? '' : 'disabled'} data-act="cpick" data-j="${j}"><i>${j + 1}</i><span>${o.n}${o.s ? `<small>${o.s}</small>` : ''}</span></button>`).join('');
  const fb = ST.a == null ? '' : `<div class="fb ${ok ? 'ok' : 'no'}"><b>${ok ? 'Tepat.' : 'Belum tepat.'} Jawaban: ${opts[it.a].n}</b><p>${it.w}</p>${it.x ? `<dl class="kv">${it.x.map(r => `<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join('')}</dl>` : ''}</div><button class="btn pri" data-act="cnext">${ST.i + 1 >= n ? 'Lihat hasil' : 'Lanjut'}</button>`;
  return `${vs}<div class="bar slim"><i style="width:${ST.i / n * 100}%"></i></div><p class="note">${ST.i + 1} dari ${n}</p><p class="scn">${it.t}</p><div class="opts ${opts.length > 3 ? 'two' : ''}">${ob}</div>${fb}`;
}
Object.assign(ACT, {
  cvar(d) { ST.v = +d.v; clsInit(LABS[ST.id]); redraw(); },
  crestart() { clsInit(LABS[ST.id]); redraw(); },
  cpick(d) {
    if (ST.a != null) return;
    const L = LABS[ST.id], c = clsCur(L), opts = c.opts || L.cfg.opts, it = c.items[ST.order[ST.i]];
    ST.a = +d.j;
    if (ST.a === it.a) ST.s++; else ST.wrong.push({ t: it.t, a: opts[it.a].n, w: it.w });
    redraw();
  },
  cnext() { ST.i++; ST.a = null; redraw(); }
});

// ===== mesin: simulator =====
function simBody() {
  const chips = `<div class="chips">${SIM.map((b, i) => `<button class="chip ${ST.b === i ? 'on' : ''}" data-act="sbiz" data-i="${i}">${b.n}</button>`).join('')}</div>`;
  if (ST.b == null) return `${chips}<p class="note">Pilih satu jenis bisnis untuk memulai.</p>`;
  const b = SIM[ST.b];
  let h = `${chips}<h3>Data yang dipegang bisnis ini</h3><div class="tiles">${b.data.map(x => `<span class="tile">${x}</span>`).join('')}</div><button class="btn ${ST.run ? '' : 'pri'}" data-act="srun">${ST.run ? 'Reset simulasi' : 'Simulasikan kebocoran'}</button>`;
  if (ST.run) {
    h += `<div class="alert"><b>⚠ Insiden:</b> basis data ${b.n.toLowerCase()} bocor dan muncul di dark web.</div><h3>Apa yang terjadi pada pelanggan?</h3><ul>${b.risk.map(r => `<li>${r}</li>`).join('')}</ul><h3>Apa yang terjadi pada bisnis?</h3>${MN.map((m, i) => `<div class="mrow"><div class="mh"><b>${m}</b><span>${b.m[i]}%</span></div><div class="meter"><i data-w="${b.m[i]}" style="width:0"></i></div><p>${b.tx[i]}</p></div>`).join('')}<p class="note">Skala ilustrasi dari penyusun untuk membandingkan tingkat keparahan antar-bisnis, bukan data statistik. Dari satu insiden, ketiga dimensi muncul sekaligus (benang merah Tokopedia dan PDNS).</p>`;
  }
  return h;
}
Object.assign(ACT, {
  sbiz(d) { ST.b = +d.i; ST.run = false; redraw(); },
  srun() { ST.run = !ST.run; redraw(); }
});

// ===== mesin: audit checkout =====
function chkScore() {
  const on = ST.on || {}, s = { c: 0, i: 0, a: 0 };
  CTRL.forEach(k => { if (on[k.id]) { s.c += k.c; s.i += k.i; s.a += k.a; } });
  ['c', 'i', 'a'].forEach(x => s[x] = Math.max(0, Math.min(100, s[x])));
  const avg = (s.c + s.i + s.a) / 3, badge = !!on.badge;
  s.avg = avg; s.trust = Math.round(avg * 0.8 + (badge ? 20 : 0));
  return s;
}
function chkBody() {
  ST.on = ST.on || {};
  const on = ST.on, s = chkScore();
  const lvl = v => v >= 80 ? 'hi' : v >= 40 ? 'mid' : 'lo';
  const card = on.raw ? '<span class="neg">4929 1234 5678 9012 (tersimpan mentah)</span>' : on.token ? '•••• 9012 (token tk_8f3a)' : on.gateway ? 'Dialihkan ke halaman payment gateway' : 'Diketik langsung di formulir toko';
  const miss = CTRL.filter(k => !k.bad && !k.t && !on[k.id]).map(k => k.f);
  if (on.raw) miss.unshift(CTRL.find(k => k.id === 'raw').f);
  let insight = '';
  if (on.badge && s.avg < 45) insight = '<p class="warn">Sinyal kepercayaan tampil, tetapi kontrol nyatanya minim: ini kepercayaan semu. Label harus didukung kontrol yang sungguh ada.</p>';
  else if (!on.badge && s.avg >= 70) insight = '<p class="tip">Kontrolnya sudah kuat, tetapi pelanggan tidak melihat tandanya. Sinyal kepercayaan membantu pelanggan percaya.</p>';
  const pm = (l, v, sub) => `<div class="mrow"><div class="mh"><b>${l}</b><span>${v}%</span></div><div class="meter ${lvl(v)}"><i data-w="${v}" style="width:0"></i></div><small>${sub}</small></div>`;
  return `<div class="chips"><span class="note">Mulai dari:</span>${[['asal', 'Asal-asalan'], ['minimum', 'Standar minimum'], ['ideal', 'Ideal'], ['kosong', 'Kosongkan']].map(p => `<button class="chip" data-act="cpre" data-p="${p[0]}">${p[1]}</button>`).join('')}</div>
<div class="chkgrid"><div><h3>Kontrol keamanan</h3><div class="sws">${CTRL.map(k => `<button class="sw ${on[k.id] ? 'on' : ''} ${k.bad ? 'bad' : ''}" role="switch" aria-checked="${!!on[k.id]}" data-act="ctog" data-id="${k.id}"><span class="knob"></span><span class="lb">${k.n}${k.bad ? '<small>kontrol buruk</small>' : ''}</span></button>`).join('')}</div></div>
<div><h3>Toko contoh</h3><div class="mb"><div class="urlbar ${on.https ? 'ok' : 'no'}"><span>${on.https ? '🔒' : '⚠ Tidak aman'}</span><code>${on.https ? 'https' : 'http'}://toko-contoh.id/checkout</code></div><div class="mbody"><p><b>Checkout</b> · 1 item · Rp89.000</p><p class="mut">Kartu: ${card}</p>${on.badge ? '<p class="badges"><span>🛡 Secure checkout</span><span>VISA</span><span>QRIS</span></p>' : ''}</div></div>
<h3>Skor pilar CIA</h3>${pm('Confidentiality', s.c, 'Kerahasiaan')}${pm('Integrity', s.i, 'Integritas')}${pm('Availability', s.a, 'Ketersediaan')}${pm('Tingkat kepercayaan pelanggan', s.trust, 'Gabungan kontrol nyata dan sinyal yang terlihat')}${insight}</div></div>
<h3>Temuan audit${miss.length ? ` (${miss.length})` : ''}</h3>${miss.length ? `<ul class="find">${miss.map(m => `<li>${m}</li>`).join('')}</ul>` : '<p class="tip">Tidak ada celah dari daftar kontrol ini. Keamanan nyata tetap perlu dipantau terus.</p>'}<p class="note">Bobot ilustrasi dari penyusun untuk melatih pemetaan kontrol ke pilar CIA, bukan standar baku.</p>`;
}
Object.assign(ACT, {
  ctog(d) { ST.on[d.id] = !ST.on[d.id]; redraw(); },
  cpre(d) { ST.on = {}; PRESET[d.p].forEach(k => ST.on[k] = true); redraw(); }
});

// ===== mesin: tiga lensa =====
function lenBody() {
  const si = ST.s || 0, sc = SCN[si], st = ST.st || (ST.st = {});
  const tabs = `<div class="chips">${SCN.map((x, i) => `<button class="chip ${i === si ? 'on' : ''}" data-act="lsc" data-i="${i}">${i + 1}. ${x.t}</button>`).join('')}</div>`;
  const key = l => si + '-' + l, done = [0, 1, 2].every(l => st[key(l)] != null);
  const rows = LENS.map((L, l) => `<div class="lens"><h4>${L[0]}</h4><p class="q">${L[1]}</p><ul>${sc.k[l].map(x => `<li>${x}</li>`).join('')}</ul><div class="chips tight">${STANCE.map((s, j) => `<button class="chip s${j} ${st[key(l)] === j ? 'on' : ''}" data-act="lst" data-l="${l}" data-j="${j}">${s}</button>`).join('')}</div></div>`).join('');
  let sum = '';
  if (done) {
    const v = [0, 1, 2].map(l => st[key(l)]), same = v.every(x => x === v[0]);
    sum = `<div class="fb ${same ? 'ok' : 'mix'}"><b>${same ? 'Ketiga lensa sepakat: ' + STANCE[v[0]].toLowerCase() + '.' : 'Lensa berbeda pendapat.'}</b><p>${same ? 'Kesepakatan antar-lensa membuat keputusan lebih kuat. Tetap tulis alasanmu.' : 'Di sinilah letak “menimbang”: tidak ada satu jawaban benar. Yang dinilai adalah argumentasimu: lensa mana yang kamu utamakan dan mengapa.'}</p></div>`;
  }
  return `${tabs}<div class="scn">${sc.d}</div><div class="steps"><div class="stp"><b>1 · Pemangku kepentingan</b><p>${sc.who}</p></div></div><h3>2 · Tiga lensa etika</h3><p class="note">Baca pertimbangannya, lalu pilih sikap tiap lensa.</p><div class="lenses">${rows}</div>${sum}<div class="steps"><div class="stp"><b>3 · Status hukum</b><p>${sc.law}</p></div><div class="stp"><b>4 · Keputusanmu dan alasannya</b><textarea rows="3" placeholder="Tulis keputusan dan alasannya (tidak disimpan)" aria-label="Keputusan dan alasan"></textarea></div></div>`;
}
Object.assign(ACT, {
  lsc(d) { ST.s = +d.i; redraw(); },
  lst(d) { ST.st[(ST.s || 0) + '-' + d.l] = +d.j; redraw(); }
});

// ===== mesin: pemburu dark pattern =====
function dpBody() {
  const sel = ST.sel || (ST.sel = {}), chk = ST.chk;
  const els = DPE.map((e, i) => {
    const m = chk ? (!!sel[i] === !!e.d ? 'right' : 'wrong') : '';
    return `<button class="dp ${e.z} ${sel[i] ? 'sel' : ''} ${m}" data-act="dpt" data-i="${i}" aria-pressed="${!!sel[i]}"><span>${e.t}</span>${chk ? `<em>${m === 'right' ? '✓' : '✗'}</em>` : ''}</button>`;
  }).join('');
  const score = DPE.filter((e, i) => !!sel[i] === !!e.d).length;
  let res = '';
  if (chk) {
    res = `<div class="fb ${score === DPE.length ? 'ok' : 'mix'}"><b>Skor ${score} dari ${DPE.length}</b><p>Elemen yang ditandai dan benar-benar dark pattern, serta elemen wajar yang tidak ditandai, dihitung benar.</p></div><ul class="find">${DPE.map(e => `<li><b>${e.d ? '⚠ ' + e.n : '✔ Wajar'}</b>: “${e.t.replace(/^[⏱☑☐]\s*/, '')}”. ${e.w}</li>`).join('')}</ul><p class="note">Nama pola mengacu pada katalog Deceptive Patterns (H. Brignull), rujukan di slide Pertemuan 6.</p>`;
  }
  const eth = ST.eth ? `<div class="phone good"><div class="pbar">toko-contoh.id · versi etis</div><div class="pbody"><p class="dp title">Pilihan privasi Anda</p><div class="row3"><button class="eq">Tolak semua</button><button class="eq">Atur pilihan</button><button class="eq">Terima semua</button></div><p class="dp chk">☐ Bagikan data ke mitra iklan</p><p class="dp chk">☐ Kirimi saya newsletter</p><p class="dp link">Kebijakan Privasi</p></div></div><ul class="find ok">${DPFIX.map(x => `<li>${x}</li>`).join('')}</ul>` : '';
  return `<p class="note">Ketuk elemen yang menurutmu merupakan dark pattern (bisa lebih dari satu), lalu tekan Periksa.</p><div class="phone"><div class="pbar">toko-contoh.id</div><div class="pbody">${els}</div></div><div class="row"><button class="btn pri" data-act="dpchk">${chk ? 'Coba lagi' : 'Periksa jawaban'}</button><button class="btn" data-act="dpeth">${ST.eth ? 'Sembunyikan versi etis' : 'Lihat versi etis'}</button></div>${res}${eth}<p class="note">Tugas kecil dari dosen: temukan satu dark pattern di aplikasi yang kamu pakai dan jelaskan mengapa bermasalah secara etis.</p>`;
}
Object.assign(ACT, {
  dpt(d) { if (ST.chk) return; ST.sel[+d.i] = !ST.sel[+d.i]; redraw(); },
  dpchk() { if (ST.chk) { ST.chk = false; ST.sel = {}; } else ST.chk = true; redraw(); },
  dpeth() { ST.eth = !ST.eth; redraw(); }
});

// ===== mesin: kasus App A =====
function appBody() {
  const pk = ST.pk, pol = ST.pol || (ST.pol = {});
  const opts = APPOPT.map((o, i) => `<button class="opt ${pk == null ? '' : i === pk ? 'sel' : ''}" ${pk == null ? '' : 'disabled'} data-act="apk" data-i="${i}"><i>${i + 1}</i><span>${o.t}</span></button>`).join('');
  let res = '';
  if (pk != null) {
    const o = APPOPT[pk];
    res = `<div class="fb ${o.v === 'good' ? 'ok' : o.v === 'mid' ? 'mix' : 'no'}"><b>${o.l}</b><dl class="kv"><dt>Konsekuensi</dt><dd>${o.k}</dd><dt>Hak dan kewajiban</dt><dd>${o.d}</dd><dt>Karakter</dt><dd>${o.u}</dd></dl><p class="note">Tidak ada jawaban benar tunggal; nilai ada pada argumentasi. Penilaian di sini adalah pembacaan penyusun.</p></div><button class="btn" data-act="apr">Pilih ulang</button><h3>Langkah lanjutan yang masuk akal</h3><p class="note">Praktik umum, tambahan di luar slide.</p><ol class="find"><li>Verifikasi celah di lingkungan uji dan tutup secepatnya.</li><li>Periksa log: adakah akses serupa oleh pihak lain sebelum ini?</li><li>Nilai apakah pengguna perlu diberi tahu (terkait UU PDP, dibahas di Pertemuan 9).</li><li>Susun kebijakan responsible disclosure dan putuskan soal bug bounty.</li></ol>`;
  }
  const n = PELM.filter((_, i) => pol[i]).length;
  const komit = !!pol[1], lar = !!pol[2];
  let msg = n === 5 ? 'Lengkap dan seimbang.' : (komit && !lar) ? 'Berat sebelah: melindungi pelapor tetapi belum melindungi pengguna dan perusahaan.' : (!komit && lar) ? 'Berat sebelah: melindungi perusahaan, tetapi pelapor beritikad baik takut melapor.' : n === 0 ? 'Belum ada elemen.' : 'Tambah elemen lain agar seimbang.';
  return `<div class="mail"><div class="mh2"><b>Dari:</b> pengirim tak dikenal <b>Kepada:</b> keamanan@app-a.id</div><p>“${MAIL}”</p></div><p class="scn">Kamu belum punya program bug bounty dan tidak mengenal pengirim. Apa yang kamu lakukan?</p><div class="opts">${opts}</div>${res}<h3>Susun kebijakan responsible disclosure</h3><p class="note">Seharusnya sudah ada sebelum email itu masuk. Nyalakan elemen yang akan kamu masukkan ke kebijakan 1 halaman.</p><div class="sws">${PELM.map((e, i) => `<button class="sw ${pol[i] ? 'on' : ''}" role="switch" aria-checked="${!!pol[i]}" data-act="apol" data-i="${i}"><span class="knob"></span><span class="lb">${e[0]}<small>${e[1]}${pol[i] ? '' : ' · Jika tak ada: ' + e[2]}</small></span></button>`).join('')}</div><div class="mrow"><div class="mh"><b>Kelengkapan kebijakan</b><span>${n}/5</span></div><div class="meter ${n === 5 ? 'hi' : n >= 3 ? 'mid' : 'lo'}"><i data-w="${n * 20}" style="width:0"></i></div><p>${msg}</p></div>`;
}
Object.assign(ACT, {
  apk(d) { ST.pk = +d.i; redraw(); },
  apr() { ST.pk = null; redraw(); },
  apol(d) { ST.pol[+d.i] = !ST.pol[+d.i]; redraw(); }
});
