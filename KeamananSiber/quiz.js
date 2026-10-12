// ===== Bank soal. [pertemuan, soal, pilihan, indeks benar, penjelasan] =====
const QS = [
  [1, "Pernyataan yang paling tepat tentang keamanan siber menurut mata kuliah ini?", ["Urusan divisi IT saja", "Keputusan bisnis yang dampaknya diukur pada kepercayaan, reputasi, dan finansial", "Soal penguasaan alat hacking", "Biaya yang sebaiknya ditekan sekecil mungkin"], 1, "Keamanan adalah keputusan bisnis dan infrastruktur kepercayaan, bukan sekadar urusan teknisi."],
  [1, "Tiga dimensi dampak insiden siber pada bisnis adalah...", ["Kepercayaan, reputasi, finansial", "Kerahasiaan, integritas, ketersediaan", "Aset, ancaman, kerentanan", "Etika, hukum, bisnis"], 0, "Kerahasiaan-integritas-ketersediaan adalah CIA (Pertemuan 2), bukan dimensi dampak."],
  [1, "Menurut slide, insiden PDNS 2 (2024) gagal dipulihkan terutama karena...", ["Serangan yang sangat canggih dan tak terhindarkan", "Keputusan tata kelola dan anggaran yang buruk (tidak ada backup)", "Kelalaian pengguna akhir", "Bencana alam"], 1, "Keamanan sering gagal bukan karena serangan canggih, tetapi karena keputusan tata kelola dan anggaran yang buruk."],
  [1, "Kebocoran data Tokopedia pada Mei 2020 berdampak pada berapa akun?", ["Sekitar 91 juta akun", "Sekitar 4,7 juta akun", "Sekitar 944 ribu akun", "Sekitar 282 akun"], 0, "91 juta akun. Angka 4,7 juta adalah data ASN BKN, 944 ribu adalah akun bocor kuartal III 2025."],
  [1, "Denda UU PDP menurut slide dapat mencapai...", ["2% dari pendapatan tahunan", "Rp131 miliar", "10% dari laba bersih", "Sebesar uang tebusan"], 0, "Denda UU PDP dapat mencapai 2% pendapatan tahunan."],
  [1, "Pesan &ldquo;ini bukan cerita 'kalau', tapi 'kapan'&rdquo; dimaksudkan untuk menunjukkan bahwa...", ["Insiden siber sudah lazim, jadi bisnis harus bersiap", "Hanya perusahaan besar yang diserang", "Serangan hanya terjadi sekali", "Serangan selalu berhasil"], 0, "Bukti di Indonesia: ±944 ribu akun bocor di kuartal III 2025, setara 7 akun per menit."],

  [2, "Integrity dalam CIA triad berarti...", ["Hanya pihak berwenang yang boleh mengakses data", "Data akurat dan tidak diubah tanpa izin", "Sistem dapat diakses saat dibutuhkan", "Data dienkripsi saat dikirim"], 1, "Contoh: saldo, harga, dan pesanan tidak dimanipulasi."],
  [2, "Penyerang mengubah harga produk di toko online menjadi Rp1. Pilar CIA yang dilanggar?", ["Confidentiality", "Integrity", "Availability", "Tidak ada"], 1, "Data diubah tanpa izin = integritas."],
  [2, "Kata sandi lemah pada akun admin adalah contoh...", ["Aset", "Ancaman", "Kerentanan", "Risiko"], 2, "Kerentanan = celah yang bisa dimanfaatkan ancaman."],
  [2, "Risiko didefinisikan sebagai...", ["Kemungkinan × dampak bila ancaman mengeksploitasi kerentanan", "Pihak yang membahayakan aset", "Celah pada sistem", "Hal berharga yang dilindungi"], 0, "Risiko selalu mempertimbangkan kemungkinan dan dampak."],
  [2, "DDoS paling langsung mengganggu pilar...", ["Confidentiality", "Integrity", "Availability", "Authenticity"], 2, "Layanan lumpuh karena dibanjiri trafik palsu: ketersediaan."],
  [2, "Email yang menyamar sebagai bank untuk mencuri password pengguna adalah...", ["Ransomware", "DDoS", "Phishing", "Tampering"], 2, "Phishing: penipuan menyamar lewat email atau pesan untuk mencuri kredensial. Di slide dipetakan ke Kerahasiaan."],
  [2, "Malware yang mengenkripsi data lalu menuntut uang tebusan disebut...", ["Spyware", "Ransomware", "Trojan", "Phishing"], 1, "Ransomware mengunci data; di slide dipetakan ke Ketersediaan."],

  [3, "Enkripsi saat data dikirim (in transit) terlihat pada pengguna sebagai...", ["Ikon gembok dan HTTPS di browser", "Kode OTP", "Sidik jari", "Label diskon"], 0, "HTTPS dan gembok = data terenkripsi saat dikirim."],
  [3, "Kombinasi manakah yang termasuk MFA?", ["Password + PIN", "Password + kode OTP dari aplikasi authenticator", "Dua password berbeda", "PIN + pertanyaan keamanan"], 1, "MFA menggabungkan dua faktor berbeda jenis (tahu + miliki). Password dan PIN sama-sama 'yang kamu tahu'."],
  [3, "Sidik jari termasuk faktor autentikasi...", ["Yang kamu tahu", "Yang kamu miliki", "Yang melekat pada kamu", "Bukan faktor autentikasi"], 2, "Biometrik = yang melekat."],
  [3, "Cara paling aman menangani data kartu pelanggan di e-commerce adalah...", ["Menyimpan di database sendiri agar praktis", "Memakai payment gateway tepercaya dan tokenisasi", "Mengirim lewat email", "Menyimpan di spreadsheet terenkripsi"], 1, "Serahkan pemrosesan kartu ke pihak bersertifikat, hindari menyimpan data kartu sendiri, dan patuhi PCI DSS."],
  [3, "Backup dan redundansi sistem terutama menjaga pilar...", ["Confidentiality", "Integrity", "Availability", "Semua sama"], 2, "Ketersediaan: sistem tetap bisa dipakai atau dipulihkan."],
  [3, "PCI DSS adalah...", ["Standar keamanan data kartu pembayaran", "Undang-undang perlindungan data", "Jenis serangan siber", "Metode enkripsi"], 0, "Payment Card Industry Data Security Standard."],

  [4, "Lensa yang menilai keputusan dari hasilnya, yaitu manfaat terbesar dan bahaya terkecil, adalah...", ["Konsekuensialisme", "Deontologi", "Etika Keutamaan", "Positivisme hukum"], 0, "Pertanyaan kuncinya: mana yang membawa manfaat terbesar dan bahaya terkecil?"],
  [4, "Pertanyaan &ldquo;Apakah hak dan kewajiban dihormati, terlepas dari hasilnya?&rdquo; berasal dari lensa...", ["Konsekuensialisme", "Deontologi", "Etika Keutamaan", "Keadilan distributif"], 1, "Deontologi menilai dari kewajiban dan hak."],
  [4, "Etika Keutamaan menilai keputusan dari...", ["Hasil akhirnya", "Kewajiban dan hak", "Karakter dan integritas pelaku", "Aturan hukum yang berlaku"], 2, "Apa yang akan dilakukan orang atau organisasi yang jujur dan berintegritas?"],
  [4, "Contoh dark pattern yang benar adalah...", ["Langganan mudah dibatalkan dengan satu tombol", "Langganan mudah dibuat tetapi sulit dibatalkan", "Kebijakan privasi yang singkat dan jelas", "Tombol Tolak dan Terima berukuran sama"], 1, "Dark pattern: desain yang menjebak, mis. langganan sulit dibatalkan atau tombol menyesatkan."],
  [4, "Mengapa etika penting ketika hukum belum mengatur sesuatu?", ["Karena etika menggantikan semua hukum", "Karena teknologi bergerak lebih cepat dari hukum, etika mengisi ruang abu-abu", "Karena hukum tidak pernah penting", "Karena etika selalu sama dengan hukum"], 1, "Legal tidak selalu etis, dan sebaliknya. Di ruang kosong, etika jadi penuntun."],
  [4, "Urutan langkah membedah dilema etis di kelas yang benar adalah...", ["Keputusan → hukum → lensa → pemangku kepentingan", "Pemangku kepentingan → tiga lensa → status hukum → keputusan dan alasan", "Hukum → keputusan → lensa", "Lensa → keputusan → pemangku kepentingan"], 1, "Petakan siapa yang terdampak, timbang dengan tiga lensa, cek hukum, lalu putuskan dengan alasan."],

  [5, "Pembeda utama white hat dan black hat menurut slide adalah...", ["Tingkat keahlian teknis", "Ada-tidaknya izin", "Alat yang dipakai", "Lama pengalaman"], 1, "Beda white vs black bukan teknis, melainkan ada-tidaknya izin."],
  [5, "Masuk ke sistem tanpa izin dengan niat baik lalu menawarkan perbaikan tergolong...", ["White hat", "Grey hat", "Black hat", "Red team"], 1, "Grey hat: tanpa izin tapi niat baik. Tetap berisiko hukum."],
  [5, "Aktor ancaman bermotif ideologi atau politik disebut...", ["Script kiddies", "Hacktivist", "Insider", "APT"], 1, "Hacktivist menyuarakan pesan ideologi atau politik."],
  [5, "Aktor ancaman yang butuh sumber daya sangat besar untuk spionase dan sabotase adalah...", ["Script kiddies", "Penjahat terorganisir", "Aktor negara (APT)", "Insider"], 2, "APT = aktor negara."],
  [5, "Responsible disclosure adalah...", ["Mengumumkan celah ke publik secepatnya", "Jalur resmi dan aman untuk melaporkan celah sebelum diumumkan", "Menjual celah ke pihak tertinggi", "Menguji sistem tanpa memberi tahu"], 1, "Jalur resmi dan aman melapor sebelum diumumkan."],
  [5, "Akses tanpa izin ke sistem elektronik di Indonesia dikaitkan dengan...", ["UU ITE Pasal 30", "UU Hak Cipta Pasal 30", "UU Merek Pasal 30", "Tidak ada aturannya"], 0, "UU ITE Pasal 30. Grey hat pun bisa dipidana."],
  [5, "Manakah yang BUKAN isi yang baik dalam kebijakan responsible disclosure?", ["Saluran untuk melapor", "Komitmen tidak menuntut pelapor beritikad baik", "Larangan mengakses atau menyalin data pengguna", "Izin bagi pelapor mempublikasikan celah kapan saja"], 3, "Slide menyebut larangan publikasi dini. Kebijakan harus menyeimbangkan hak kedua pihak."],

  [6, "Privasi menurut slide adalah...", ["Upaya menyembunyikan sesuatu", "Kendali seseorang atas informasi mengenai dirinya", "Larangan mengumpulkan data", "Hak perusahaan atas data pelanggan"], 1, "Privasi adalah kendali, bukan sekadar menyembunyikan."],
  [6, "Data yang tampak sepele tetapi bila digabung mengungkap gambaran pribadi utuh disebut...", ["Agregasi", "Enkripsi", "Anonimisasi", "Tokenisasi"], 0, "Agregasi data."],
  [6, "&ldquo;Jika produk gratis, penggunalah produknya&rdquo; menggambarkan...", ["Ekonomi data", "Ekonomi sirkular", "Open source", "Fair use"], 0, "Data pengguna diperlakukan sebagai komoditas untuk iklan bertarget."],
  [6, "Yang termasuk data pribadi spesifik (sensitif) adalah...", ["Nama panggilan", "Data kesehatan", "Alamat surel publik", "Nama toko favorit"], 1, "Kesehatan, biometrik, keuangan, keyakinan."],
  [6, "Prinsip minimalisasi data berarti...", ["Menyimpan data selama mungkin", "Mengumpulkan hanya data yang memang diperlukan", "Menghapus semua data setiap hari", "Mengumpulkan data sebanyak mungkin untuk berjaga-jaga"], 1, "Kumpulkan hanya yang diperlukan."],
  [6, "Tombol &ldquo;Setuju Semua&rdquo; yang mencolok sementara opsi menolak disembunyikan adalah contoh...", ["Persetujuan yang bermakna", "Dark pattern", "Transparansi", "Minimalisasi data"], 1, "Dark pattern dalam meminta persetujuan."],
  [6, "Doxing termasuk pengawasan yang dilakukan oleh...", ["Perusahaan", "Negara", "Sesama pengguna", "Penyedia internet saja"], 2, "Penyebaran data pribadi tanpa izin dan stalking = oleh sesama pengguna."],
  [6, "Manakah yang BUKAN salah satu dari tiga ketegangan di slide?", ["Personalisasi vs privasi", "Keamanan vs privasi", "Manfaat bisnis vs hak pengguna", "Kecepatan internet vs harga paket"], 3, "Tiga ketegangan: personalisasi-privasi, keamanan-privasi, manfaat bisnis-hak pengguna."],

  [7, "Nama dan logo aplikasi dilindungi oleh...", ["Hak cipta", "Merek dagang", "Paten", "Rahasia dagang"], 1, "Merek dagang. Nama dan logo berada di luar hak cipta."],
  [7, "Algoritma rekomendasi yang sengaja dirahasiakan perusahaan dilindungi sebagai...", ["Hak cipta", "Merek dagang", "Paten", "Rahasia dagang"], 3, "Informasi bisnis yang sengaja dirahasiakan = rahasia dagang."],
  [7, "Hak cipta atas kode program lahir...", ["Setelah didaftarkan", "Otomatis sejak karya diwujudkan", "Setelah 5 tahun", "Setelah dipublikasikan di internet"], 1, "Tanpa perlu pendaftaran. Pendaftaran hanya memperkuat pembuktian."],
  [7, "Yang dilindungi hak cipta adalah...", ["Ide aplikasi", "Wujud ekspresi karya (kode, tampilan)", "Nama perusahaan", "Konsep bisnis"], 1, "Ide tidak dapat dimonopoli; wujudnya dilindungi."],
  [7, "Startup memakai foto dan font tanpa lisensi. Perannya dalam IP adalah...", ["Pemilik", "Pelaku pelanggaran", "Korban", "Regulator"], 1, "Pelanggaran sering tidak disengaja, mis. foto, font, atau musik tanpa lisensi."],
  [7, "Metode kompresi data baru buatan sendiri paling tepat dilindungi sebagai...", ["Hak cipta", "Merek dagang", "Paten", "Rahasia dagang saja, tidak ada pilihan lain"], 2, "Paten melindungi penemuan atau inovasi teknis yang baru."],
  [7, "Creative Commons dan perangkat lunak sumber terbuka adalah contoh...", ["Pembajakan", "Lisensi terbuka sebagai jalan tengah berbagi karya", "Pelanggaran merek", "Rahasia dagang"], 1, "Berbagi karya dengan syarat tertentu."],
  [7, "Hak cipta di Indonesia diatur dalam...", ["UU No. 28 Tahun 2014", "UU No. 20 Tahun 2016", "UU No. 27 Tahun 2022", "UU No. 19 Tahun 2016"], 0, "UU 20/2016 = Merek, UU 27/2022 = PDP, UU 19/2016 = ITE."],

  // ----- tambahan dari slide (Pertemuan 1-7) -----
  [1, "Fokus mata kuliah ini adalah...", ["Menguasai teknik peretasan sistem", "Menganalisis risiko siber sebagai risiko bisnis dan mengambil keputusan yang bertanggung jawab di titik temu bisnis, hukum, dan etika", "Menghafal konfigurasi perangkat jaringan", "Menjadi teknisi keamanan profesional"], 1, "Ini bukan kelas untuk menjadi hacker. Yang dilatih adalah kemampuan menganalisis dan memutuskan, terutama saat hukum belum sepenuhnya mengatur."],
  [1, "Tiga hal yang menjadi fondasi bisnis digital sekaligus rapuh terhadap serangan adalah...", ["Data, kepercayaan, dan sistem yang reliable", "Modal, tenaga kerja, dan lokasi", "Kerahasiaan, integritas, dan ketersediaan", "Kepercayaan, reputasi, dan finansial"], 0, "Data bisa dicuri, dijual, atau dikunci; kepercayaan membuat orang mau menyerahkan uang dan identitas; sistem yang mati menghentikan penjualan. Dua pilihan lain adalah CIA dan tiga dimensi dampak."],
  [1, "Ungkapan &ldquo;ketersediaan = pendapatan&rdquo; berarti...", ["Semakin banyak data, semakin besar pendapatan", "Saat sistem mati, penjualan berhenti", "Server yang mahal pasti menghasilkan untung", "Pendapatan hanya bergantung pada iklan"], 1, "Bagi bisnis digital, sistem yang tidak bisa diakses langsung berarti transaksi berhenti."],
  [1, "Dimensi dampak yang digambarkan &ldquo;lama dibangun, sekejap runtuh, pulihnya bertahap&rdquo; adalah...", ["Kepercayaan", "Reputasi", "Finansial", "Regulasi"], 0, "Kepercayaan adalah fondasi transaksi online. Reputasi dicirikan efeknya yang bertahan lebih lama dari gangguan teknis."],
  [1, "Varian ransomware pada serangan PDNS 2 tahun 2024 menurut slide adalah...", ["Brain Cipher, pengembangan dari LockBit 3.0", "WannaCry", "REvil", "NotPetya"], 0, "Serangan 20 Juni 2024 di Surabaya itu mengganggu 282 instansi."],
  [1, "Tiga pertanyaan dalam pembahasan threat landscape adalah...", ["Siapa penyerangnya, apa yang diincar, seberapa sering di Indonesia", "Apa asetnya, apa kerentanannya, apa risikonya", "Siapa korbannya, berapa kerugiannya, siapa yang bertanggung jawab", "Kapan terjadi, di mana terjadi, bagaimana terjadi"], 0, "Pelaku: iseng, kriminal terorganisir, orang dalam, aktor negara. Incaran: uang, data, disrupsi layanan."],
  [1, "Dimensi finansial dari sebuah insiden siber mencakup...", ["Hanya uang tebusan", "Biaya pemulihan, penjualan hilang, sanksi regulator, dan mitra yang kabur", "Hanya denda UU PDP", "Hanya kerugian perusahaan besar"], 1, "Dampak finansial lebih luas dari uang tebusan."],

  [2, "Pencurian database pelanggan oleh karyawan yang dendam melanggar pilar...", ["Confidentiality", "Integrity", "Availability", "Tidak ada"], 0, "Pencurian oleh orang dalam dipetakan ke kerahasiaan."],
  [2, "Serangan rantai pasok dipetakan di slide ke pilar...", ["Confidentiality", "Integrity", "Availability", "Authenticity"], 1, "Yang dipercaya sudah diubah sebelum sampai ke korban: integritas."],
  [2, "Server utama rusak dan tidak ada cadangan sehingga toko mati seharian terutama mengganggu...", ["Confidentiality", "Integrity", "Availability", "Tidak ada pilar"], 2, "Kegagalan sistem dipetakan ke ketersediaan."],
  [2, "Urutan yang benar pada rantai risiko menurut slide adalah...", ["Aset → Ancaman → Kerentanan → Risiko", "Ancaman → Aset → Risiko → Kerentanan", "Risiko → Ancaman → Aset → Kerentanan", "Kerentanan → Risiko → Aset → Ancaman"], 0, "Aset (hal berharga), ancaman (pihak yang membahayakan), kerentanan (celah), risiko (kemungkinan × dampak)."],
  [2, "Peretas, malware, dan orang dalam adalah contoh...", ["Aset", "Ancaman", "Kerentanan", "Risiko"], 1, "Ancaman = pihak atau hal yang dapat membahayakan aset."],
  [2, "Software usang yang belum diperbarui adalah contoh...", ["Aset", "Ancaman", "Kerentanan", "Risiko"], 2, "Kerentanan = celah yang bisa dimanfaatkan, misalnya kata sandi lemah atau software usang."],
  [2, "Virus, trojan, dan spyware termasuk jenis...", ["Phishing", "Malware", "DDoS", "Ransomware"], 1, "Malware: perangkat lunak jahat yang merusak atau mencuri data."],
  [2, "Data pelanggan, sistem, dan reputasi adalah contoh...", ["Aset", "Ancaman", "Kerentanan", "Risiko"], 0, "Aset = hal berharga yang dilindungi."],

  [3, "Enkripsi paling langsung menjaga pilar...", ["Confidentiality", "Integrity", "Availability", "Semua pilar sama"], 0, "Enkripsi melindungi kerahasiaan data pelanggan."],
  [3, "Faktor autentikasi yang paling umum sekaligus paling lemah bila dipakai sendirian adalah...", ["Kata sandi atau PIN", "Kode OTP", "Sidik jari", "Kunci keamanan"], 0, "Kata sandi dan PIN adalah faktor 'yang kamu tahu'."],
  [3, "Kode OTP dan aplikasi authenticator termasuk faktor...", ["Yang kamu tahu", "Yang kamu miliki", "Yang melekat pada kamu", "Bukan faktor autentikasi"], 1, "OTP, authenticator, ponsel, dan kunci keamanan adalah 'yang kamu miliki'."],
  [3, "Tokenisasi pada data kartu berarti...", ["Data kartu diganti 'token' sehingga tak berguna bila dicuri", "Data kartu dikirim lewat email terenkripsi", "Data kartu disimpan dua kali", "Data kartu dihapus setelah sebulan"], 0, "Bisnis tidak menyimpan data kartu asli."],
  [3, "Menurut pemetaan slide, autentikasi atau MFA menjaga pilar...", ["Kerahasiaan dan integritas", "Hanya ketersediaan", "Hanya kerahasiaan", "Integritas dan ketersediaan"], 0, "MFA muncul di daftar kerahasiaan dan integritas."],
  [3, "Tanda tangan digital dan validasi data terutama menjaga pilar...", ["Confidentiality", "Integrity", "Availability", "Tidak ada"], 1, "Keduanya memastikan data tidak diubah tanpa izin."],
  [3, "Manakah yang BUKAN sinyal kepercayaan pada checkout menurut slide?", ["Ikon gembok di setiap halaman", "Label secure checkout", "Logo pembayaran resmi", "Hitung mundur diskon yang menekan pembeli"], 3, "Hitung mundur yang menekan adalah dark pattern, bukan sinyal kepercayaan."],
  [3, "Pesan penutup Pertemuan 3 tentang pertahanan adalah bahwa pertahanan...", ["Hanya urusan teknis", "Pilihan untuk melindungi kepercayaan, kebenaran data, dan kelangsungan layanan", "Sebaiknya dihindari karena mahal", "Sepenuhnya tanggung jawab payment gateway"], 1, "Pertahanan bukan soal teknis semata."],

  [4, "Markkula Center memperluas tiga lensa menjadi enam dengan menambahkan...", ["Keadilan, kebaikan bersama, dan kepedulian", "Hukum, bisnis, dan teknologi", "Kepercayaan, reputasi, dan finansial", "Kerahasiaan, integritas, dan ketersediaan"], 0, "Enam lensa: tiga lensa dasar ditambah keadilan, kebaikan bersama, dan kepedulian."],
  [4, "Sistem yang diam-diam tidak adil terhadap kelompok tertentu disebut...", ["Dark pattern", "Bias algoritma", "Doxing", "Fingerprinting"], 1, "Bias algoritma adalah salah satu dilema khas bisnis digital."],
  [4, "Pertanyaan &ldquo;apakah pengumpulan diam-diam ini mencerminkan perusahaan yang jujur dan layak dipercaya?&rdquo; berasal dari lensa...", ["Konsekuensialisme", "Deontologi", "Etika Keutamaan", "Positivisme hukum"], 2, "Etika Keutamaan menilai dari karakter pelaku."],
  [4, "Pelacakan berlebihan, deepfake, dan konten AI tanpa keterbukaan termasuk kelompok dilema...", ["Pengawasan dan AI", "Dark pattern", "Bias algoritma", "Privasi dan data"], 0, "Empat kelompok dilema: privasi dan data, dark pattern, bias algoritma, pengawasan dan AI."],
  [4, "Mengapa satu dilema sebaiknya dilihat dari tiga lensa sekaligus?", ["Karena ketiganya selalu memberi jawaban yang sama", "Karena biasanya menghasilkan keputusan yang lebih bijak daripada satu sudut saja", "Karena hukum mewajibkannya", "Karena lensa lain tidak valid"], 1, "Bila ketiganya berbeda, di situlah letak 'menimbang'."],
  [4, "Pergeseran fokus mulai Pertemuan 4 adalah dari...", ["'Apa yang aman' ke 'apa yang benar' dan cara menimbangnya", "Teknis ke nonteknis semata", "Bisnis ke hukum saja", "Teori ke praktik pemrograman"], 0, "Tiga pertemuan pertama soal aman; mulai sekarang soal benar."],
  [4, "Dalam aktivitas membedah dilema etis, yang dinilai terutama adalah...", ["Satu jawaban benar yang sudah ditentukan", "Argumentasi dan alasan keputusan", "Kecepatan menyelesaikan", "Banyaknya kutipan hukum"], 1, "Tidak ada jawaban 'benar' tunggal; nilai dari argumentasinya."],
  [4, "Contoh &ldquo;hukum yang tertinggal&rdquo; yang disebut di slide adalah...", ["Deepfake dan AI generatif yang sering muncul sebelum aturannya ada", "Pajak penghasilan", "Aturan lalu lintas", "Kontrak kerja"], 0, "Teknologi bergerak lebih cepat daripada hukum; etika mengisi ruang abu-abu."],

  [5, "Aktor ancaman yang termotivasi uang lewat ransomware, penipuan, dan jual-beli data adalah...", ["Script kiddies", "Penjahat terorganisir", "Hacktivist", "Aktor negara"], 1, "Penjahat terorganisir: motifnya uang."],
  [5, "Insider (penyusup dalam) dapat menyerang karena...", ["Ideologi politik", "Dendam, kelalaian, atau disuap", "Ingin pengakuan memakai alat siap pakai", "Perintah negara"], 1, "Orang dalam punya akses, sehingga motif dan kelalaiannya berbahaya."],
  [5, "Script kiddies dicirikan oleh...", ["Iseng dan mencari pengakuan dengan alat siap pakai", "Sumber daya sangat besar", "Motif ideologi", "Izin tertulis"], 0, "Alat siap pakai, motif iseng dan pengakuan."],
  [5, "Menyewa white hat untuk menemukan celah sebelum penjahat menemukannya disebut...", ["Bug bounty", "Penetration testing", "Responsible disclosure", "Doxing"], 1, "Penetration testing. Bug bounty adalah imbalan bagi pelapor celah yang sah."],
  [5, "Bug bounty adalah...", ["Imbalan bagi pelapor celah yang sah", "Hukuman bagi peretas", "Alat enkripsi", "Jenis serangan DDoS"], 0, "Contoh platform di slide: HackerOne dan Bugcrowd."],
  [5, "Dalam latihan red team vs blue team...", ["Red team bertahan dan blue team menyerang", "Red team menyerang untuk menguji, blue team bertahan untuk memperkuat", "Keduanya menyerang", "Keduanya hanya mengaudit dokumen"], 1, "Tim penyerang menguji, tim bertahan memperkuat."],
  [5, "Kapan kebijakan responsible disclosure seharusnya sudah ada?", ["Setelah laporan celah pertama masuk", "Sebelum laporan pertama masuk", "Hanya setelah ada bug bounty", "Saat terjadi kebocoran"], 1, "Kebijakan itu seharusnya sudah ada sebelum email dari pelapor masuk."],
  [5, "Kebijakan responsible disclosure pada tugas dinilai dari...", ["Panjang dokumen", "Keseimbangan hak kedua pihak, kesadaran etis dan hukum, serta kejelasan aturan", "Jumlah pasal hukum yang dikutip", "Desain visual"], 1, "Seimbang: ada komitmen perusahaan dan larangan bagi pelapor."],

  [6, "Nama, alamat surel, dan nomor telepon tergolong data pribadi...", ["Umum, relatif tidak sensitif tetapi tetap perlu dilindungi", "Spesifik (sensitif)", "Rahasia dagang", "Bukan data pribadi"], 0, "Data pribadi spesifik adalah kesehatan, biometrik, keuangan, dan keyakinan."],
  [6, "Semakin sensitif sebuah data, maka...", ["Semakin besar tanggung jawab pihak yang mengumpulkannya", "Semakin bebas data dibagikan", "Semakin lama harus disimpan", "Semakin kecil kewajiban perlindungan"], 0, "Prinsip dari slide: sensitivitas berbanding lurus dengan tanggung jawab."],
  [6, "Pemantauan warga oleh negara menurut slide umumnya dilakukan atas nama...", ["Keamanan dan ketertiban", "Hiburan", "Kepentingan iklan", "Riset pasar"], 0, "Tiga pelaku pengawasan: perusahaan, negara, sesama pengguna."],
  [6, "Mengenali pengguna lewat ciri unik peramban atau perangkat disebut...", ["Fingerprinting", "Tokenisasi", "Doxing", "Phishing"], 0, "Fingerprinting termasuk bentuk pengawasan oleh perusahaan."],
  [6, "Pengawasan yang lebih ketat dapat meningkatkan keamanan tetapi mengurangi privasi. Ini adalah ketegangan...", ["Personalisasi dan privasi", "Keamanan dan privasi", "Manfaat bisnis dan hak pengguna", "Kecepatan dan biaya"], 1, "Ketiganya tidak punya jawaban tunggal."],
  [6, "Menggunakan data hanya untuk tujuan yang telah dinyatakan adalah prinsip...", ["Sesuai tujuan", "Minimalisasi data", "Transparansi", "Persetujuan yang bermakna"], 0, "Empat prinsip: minimalisasi data, persetujuan yang bermakna, transparansi, sesuai tujuan."],
  [6, "Meminta persetujuan secara jujur, jelas, dan tanpa paksaan adalah prinsip...", ["Persetujuan yang bermakna", "Sesuai tujuan", "Minimalisasi data", "Agregasi"], 0, "Lawannya adalah dark pattern seperti Setuju Semua yang mencolok."],
  [6, "Empat prinsip pengumpulan data yang bertanggung jawab di slide disebut sebagai pratinjau dari...", ["UU PDP", "UU Hak Cipta", "UU Merek", "PCI DSS"], 0, "Di Pertemuan 9, nilai privasi dikodifikasikan menjadi hukum lewat UU PDP."],
  [6, "Keputusan minimalisasi data seharusnya diambil...", ["Sebelum sebaris data pun dikumpulkan", "Setelah terjadi kebocoran", "Saat audit tahunan", "Setelah ada keluhan pengguna"], 0, "Kumpulkan hanya yang diperlukan, dan putuskan itu di awal."],

  [7, "Sifat karya digital yang membuat perlindungannya penting sekaligus sulit ditegakkan adalah...", ["Mudah disalin sempurna tanpa mengurangi versi aslinya", "Selalu berwujud fisik", "Hanya bisa dimiliki negara", "Tidak punya nilai ekonomi"], 0, "Berbeda dengan barang fisik, salinan digital sempurna dan tidak mengurangi aslinya."],
  [7, "Pada aplikasi Gojek, kode programnya dilindungi...", ["Hak cipta", "Merek dagang", "Paten", "Rahasia dagang"], 0, "Nama dan logo Gojek dilindungi merek dagang: dua perlindungan berbeda pada satu produk."],
  [7, "Manakah yang BUKAN termasuk lapisan hak cipta sebuah aplikasi dompet digital?", ["Kode program", "Desain antarmuka dan ikon", "Nama dan logo aplikasi", "Teks dan konten"], 2, "Nama dan logo dilindungi merek dagang."],
  [7, "Satu akun berbayar dipakai puluhan orang bersama. Bagi pemilik layanan, ini menempatkannya pada peran...", ["Pemilik", "Pelaku pelanggaran", "Korban", "Regulator"], 2, "Korban: produknya dibajak, misalnya satu akun berbayar dipakai banyak orang atau aplikasi dibongkar."],
  [7, "Fair use (penggunaan wajar) adalah...", ["Ruang terbatas memakai karya tanpa izin, misalnya untuk pendidikan atau ulasan", "Hak memakai karya apa pun asal diberi kredit", "Pendaftaran karya ke pemerintah", "Larangan total menyalin karya"], 0, "Fair use memberi ruang terbatas, bukan kebebasan penuh."],
  [7, "Meme, karya remix, dan konten buatan AI menurut slide berada di wilayah yang...", ["Hukumnya sering belum tegas", "Sudah diatur sangat rinci", "Tidak dilindungi apa pun", "Selalu bebas dipakai"], 0, "Wilayah abu-abu: timbang secara etis."],
  [7, "Perebutan nama domain dan pemakaian merek pada kata kunci iklan termasuk persoalan...", ["Merek dagang", "Paten", "Rahasia dagang", "Hak cipta kode program"], 0, "Persoalan lazim merek di ranah digital."],
  [7, "Banyak aplikasi pesan antar makanan dapat berdiri secara sah karena...", ["Ide tidak dapat dimonopoli; yang dilindungi adalah kode dan tampilan", "Semua aplikasi itu berlisensi sama", "Hak cipta hanya berlaku lima tahun", "Merek tidak pernah dilindungi"], 0, "Yang dilindungi hak cipta adalah wujudnya, bukan idenya."],
  [7, "Audit kekayaan intelektual dinilai dari...", ["Ketepatan mengenali aset, kelayakan rencana perlindungan, dan kejujuran memeriksa pelanggaran sendiri", "Jumlah halaman laporan", "Banyaknya merek terdaftar", "Kecepatan pengumpulan"], 0, "Audit melatih melihat bisnis sebagai pemilik sekaligus pengguna karya orang lain."]
];

// ===== Studi kasus. j=judul, d=ringkas, ps=pertemuan terkait, t=teks kasus,
// s=langkah: j=judul, a=arahan, pb=langkah Playbook terkait (indeks PLAY), c=contoh jawaban, k=poin kunci untuk dicentang sendiri =====
const KS = [
  { j: "Ransomware di dinas pemerintah daerah", ps: [1, 2, 3], d: "Semua file terenkripsi, tanpa backup. Bedah dari aset sampai keputusan tata kelola.",
    t: "Sebuah dinas pemerintah daerah menyimpan data layanan warga di satu server pusat data. Suatu pagi semua file terenkripsi dan muncul permintaan tebusan. Layanan publik terhenti berhari-hari. Setelah diperiksa, tidak ada backup yang bisa dipulihkan, dan anggaran keamanan tahun sebelumnya dipotong.",
    s: [
      { j: "Aset dan pilar CIA", a: "Apa asetnya dan pilar mana yang paling terganggu?", pb: [0, 2],
        c: "Aset: data layanan warga dan sistem layanan publik. Pilar utama: <b>Availability</b> (data terkunci, layanan lumpuh). Confidentiality perlu dicek juga bila ada indikasi data ikut dicuri.",
        k: ["Aset: data layanan warga dan sistem layanan publik", "Pilar utama: Availability (data terkunci, layanan lumpuh)", "Confidentiality perlu dicek bila data ikut dicuri"] },
      { j: "Ancaman, kerentanan, jenis serangan", a: "Siapa pelakunya, celah apa yang dimanfaatkan?", pb: [1, 2],
        c: "Ancaman: penjahat terorganisir bermotif uang. Kerentanan: tidak ada backup yang bisa direstore dan tata kelola serta anggaran yang lemah. Jenis serangan: <b>ransomware</b>.",
        k: ["Ancaman: penjahat terorganisir bermotif uang", "Kerentanan: tanpa backup yang bisa direstore, tata kelola dan anggaran lemah", "Jenis serangan: ransomware"] },
      { j: "Dampak tiga dimensi", a: "Uraikan kepercayaan, reputasi, finansial.", pb: [3],
        c: "Kepercayaan: warga ragu menyerahkan data. Reputasi: sorotan media, bertahan lebih lama dari gangguan teknis. Finansial: bukan hanya tebusan, tetapi juga biaya pemulihan, layanan terhenti, dan sanksi.",
        k: ["Kepercayaan: warga ragu menyerahkan data", "Reputasi: sorotan media, efeknya bertahan lebih lama dari gangguan teknis", "Finansial lebih luas dari tebusan: pemulihan, layanan terhenti, sanksi"] },
      { j: "Keputusan yang seharusnya diambil", a: "Keputusan tata kelola apa yang mencegah ini?", pb: [7],
        c: "Pelajaran PDNS: yang gagal adalah keputusan tata kelola dan anggaran, bukan kecanggihan serangan. Perlakukan keamanan sebagai infrastruktur kepercayaan: anggarkan <b>backup yang teruji dan terpisah</b> serta redundansi (menjaga ketersediaan), dan tetapkan tanggung jawab di tingkat pimpinan (praktik umum, tambahan di luar slide).",
        k: ["Akar masalah: keputusan tata kelola dan anggaran, bukan serangan canggih", "Pertahanan: backup yang teruji dan redundansi menjaga ketersediaan", "Keamanan diperlakukan sebagai infrastruktur kepercayaan, bukan biaya yang dipotong"] }
    ] },
  { j: "Kebocoran data marketplace", ps: [1, 2, 3, 6], d: "Data 5 juta akun dijual di dark web, dan direktur bilang &ldquo;urusan tim IT&rdquo;.",
    t: "Marketplace &ldquo;BelanjaKita&rdquo; (nama fiktif) mendapati basis data 5 juta akun penggunanya, berisi nama, email, tanggal lahir, dan nomor telepon, dijual di dark web. Hasil pemeriksaan: database tersimpan tanpa enkripsi, login hanya memakai kata sandi, dan hampir semua staf punya akses ke database itu. Dalam rapat darurat, seorang direktur berkata, &ldquo;Ini urusan tim IT, bisnis tinggal menunggu hasilnya.&rdquo;",
    s: [
      { j: "Pilar CIA dan dampak tiga dimensi", a: "Pilar mana yang dilanggar, dan apa dampaknya pada kepercayaan, reputasi, finansial?", pb: [2, 3],
        c: "Pilar utama: <b>Confidentiality</b> (data jatuh ke pihak tidak berwenang). Kepercayaan: pengguna ragu bertransaksi dan sebagian pindah platform. Reputasi: berita kebocoran menyebar cepat dan diingat lama. Finansial: bukan hanya tebusan, tetapi biaya pemulihan, penjualan hilang, sanksi regulator, dan mitra kabur.",
        k: ["Pilar yang dilanggar: Confidentiality (kebocoran data)", "Kepercayaan dan reputasi: pengguna ragu, nama baik tercoreng lama", "Finansial: biaya pemulihan, penjualan hilang, sanksi regulator, mitra kabur"] },
      { j: "Kerentanan dan pertahanan yang hilang", a: "Kontrol dasar apa yang seharusnya sudah ada?", pb: [1, 2],
        c: "Kerentanan: database tanpa enkripsi, login hanya kata sandi, akses terlalu luas. Pertahanan dasar yang seharusnya ada: <b>enkripsi saat disimpan (at rest)</b> agar isi database tidak langsung terbaca, <b>MFA</b> (kontrol paling murah dengan dampak terbesar melawan pembobolan akun), dan <b>kontrol akses</b> yang membatasi siapa boleh membuka database. Semuanya menjaga kerahasiaan.",
        k: ["Enkripsi data saat disimpan (at rest) supaya isi database tidak langsung terbaca", "MFA untuk login, karena kata sandi sendirian paling lemah", "Kontrol akses yang membatasi siapa boleh membuka database"] },
      { j: "Menanggapi pernyataan direktur", a: "Apakah &ldquo;ini urusan tim IT&rdquo; tepat? Siapa saja pemangku kepentingannya?", pb: [4, 7],
        c: "Tidak tepat: keamanan adalah <b>keputusan bisnis</b>, dan akar masalah sering ada di tata kelola dan anggaran, bukan kecanggihan serangan. Pemangku kepentingan: pengguna (datanya bocor), perusahaan, mitra penjual, dan regulator. Keamanan seharusnya diperlakukan sebagai <b>infrastruktur kepercayaan</b>, bukan pusat biaya yang boros.",
        k: ["Keamanan adalah keputusan bisnis, bukan sekadar urusan tim IT", "Pemangku kepentingan: pengguna, perusahaan, mitra penjual, regulator", "Keamanan = infrastruktur kepercayaan, bukan pusat biaya yang boros"] },
      { j: "Data, hukum, dan keputusan", a: "Apa yang bisa diperbaiki dari cara mengumpulkan data, dan apa yang dipertaruhkan secara hukum?", pb: [6, 7],
        c: "Dari sisi pengumpulan data: terapkan <b>minimalisasi data</b> (apakah tanggal lahir lengkap benar-benar diperlukan?) dan nyatakan tujuan penggunaan secara terbuka. Dari sisi hukum: <b>UU PDP</b> dapat mendenda hingga 2% pendapatan tahunan. Keputusan yang bertanggung jawab: perbaiki kontrol dasar dan jujur kepada pengguna tentang apa yang bocor (praktik umum, tambahan di luar slide).",
        k: ["Minimalisasi data: kumpulkan hanya yang benar-benar diperlukan", "UU PDP: denda dapat mencapai 2% dari pendapatan tahunan", "Keputusan disertai alasan, termasuk jujur kepada pengguna (praktik umum)"] }
    ] },
  { j: "Laporan celah dari orang asing (App A)", ps: [4, 5], d: "Seseorang melaporkan celah di dompet digitalmu dan bertanya soal bug bounty.",
    t: "Kamu mengelola App A, dompet digital dengan ribuan pengguna. Email masuk dari orang tak dikenal: dengan mengubah satu angka di URL, ia bisa melihat riwayat transaksi pengguna lain. Ia mengaku tidak menyimpan atau menyebarkan data dan bertanya apakah ada bug bounty. Perusahaanmu belum punya program bug bounty maupun kebijakan responsible disclosure.",
    s: [
      { j: "Pemangku kepentingan", a: "Siapa saja yang terdampak?", pb: [4],
        c: "Pengguna App A (data transaksi mereka), pelapor, perusahaan (reputasi, kewajiban melindungi data), dan publik atau regulator bila data terbukti terpapar.",
        k: ["Pengguna App A, pemilik data transaksi yang terpapar", "Pelapor dan perusahaan (reputasi, kewajiban melindungi data)", "Publik atau regulator bila data terbukti terpapar"] },
      { j: "Tiga lensa etika", a: "Apa kata konsekuensi, hak dan kewajiban, karakter?", pb: [5],
        c: "Konsekuensi: menanggapi dan menutup celah melindungi banyak pengguna. Deontologi: pelapor mengakses data orang lain tanpa izin, hak pengguna dilanggar apa pun hasilnya. Keutamaan: perusahaan berintegritas menanggapi dengan jujur, tidak membungkam dan tidak langsung memusuhi pelapor.",
        k: ["Konsekuensi: menutup celah melindungi banyak pengguna", "Deontologi: akses data orang lain tanpa izin melanggar hak, apa pun hasilnya", "Keutamaan: perusahaan berintegritas menanggapi jujur, tidak membungkam"] },
      { j: "Status hukum", a: "Apakah sudah diatur, dan di mana posisi pelapor?", pb: [6],
        c: "Akses tanpa izin melanggar <b>UU ITE Pasal 30</b>; grey hat pun bisa dipidana. Pelapor bergerak di area <b>grey hat</b>: etis dalam niat tetapi tidak otomatis legal. Sisi perlindungan data pengguna terkait UU PDP (pendalaman di Pertemuan 9).",
        k: ["UU ITE Pasal 30: akses tanpa izin melanggar hukum, grey hat pun bisa dipidana", "Pelapor di area grey hat: etis dalam niat, tidak otomatis legal", "Perlindungan data pengguna terkait UU PDP"] },
      { j: "Keputusan dan kebijakan", a: "Apa langkahmu dan apa yang seharusnya sudah ada?", pb: [7],
        c: "Tanggapi lewat kanal aman, minta detail teknis tanpa meminta pelapor mengakses data lagi, perbaiki celah, beri pengakuan. Yang seharusnya sudah ada: kebijakan responsible disclosure berisi saluran lapor, komitmen tidak menuntut pelapor beritikad baik, larangan akses atau salin data dan publikasi dini, kebijakan imbalan, serta rujukan etis dan hukum.",
        k: ["Tanggapi lewat kanal aman, minta detail tanpa meminta akses data lagi", "Perbaiki celah dan beri pengakuan kepada pelapor", "Kebijakan responsible disclosure: saluran, komitmen, larangan, imbalan, rujukan etis-hukum"] }
    ] },
  { j: "Aplikasi belanja ingin tahu semuanya", ps: [4, 6], d: "Lokasi, kontak, dan galeri diminta lewat layar persetujuan yang menjebak.",
    t: "Sebuah aplikasi belanja ingin mengumpulkan lokasi terus-menerus, daftar kontak, dan akses galeri foto &ldquo;agar iklan lebih relevan&rdquo;. Saat instalasi, pengguna hanya melihat tombol hijau besar &ldquo;Setuju Semua&rdquo;, sedangkan pilihan lain berupa tautan abu-abu kecil.",
    s: [
      { j: "Data wajib vs berlebihan", a: "Data mana yang benar-benar diperlukan?", pb: [0],
        c: "Wajib: nama, alamat pengiriman, nomor telepon untuk kurir, metode pembayaran. Berlebihan: daftar kontak, galeri foto, lokasi terus-menerus saat aplikasi tidak dipakai. Ini penerapan <b>minimalisasi data</b>.",
        k: ["Wajib: nama, alamat pengiriman, nomor telepon untuk kurir, metode pembayaran", "Berlebihan: daftar kontak, galeri foto, lokasi terus-menerus", "Ini penerapan minimalisasi data"] },
      { j: "Tiga lensa etika", a: "Timbang dari ketiga sudut.", pb: [4, 5],
        c: "Konsekuensi: manfaat iklan relevan vs risiko kebocoran dan rasa tidak nyaman. Deontologi: apakah pengguna diberi tahu dan benar-benar setuju, apakah hak privasinya dihormati. Keutamaan: apakah pengumpulan diam-diam mencerminkan perusahaan yang jujur dan layak dipercaya.",
        k: ["Konsekuensi: iklan relevan vs risiko kebocoran dan rasa tidak nyaman", "Deontologi: pengguna diberi tahu dan benar-benar setuju, hak privasi dihormati", "Keutamaan: pengumpulan diam-diam bukan cerminan perusahaan jujur"] },
      { j: "Dark pattern dan prinsip", a: "Apa yang bermasalah pada layar persetujuan?", pb: [6],
        c: "Tombol Setuju Semua yang mencolok dan opsi menolak yang disembunyikan adalah <b>dark pattern</b>. Prinsip yang dilanggar: persetujuan bermakna, transparansi, dan sesuai tujuan. Prinsip-prinsip ini adalah pratinjau UU PDP.",
        k: ["Setuju Semua yang mencolok + opsi menolak tersembunyi = dark pattern", "Prinsip dilanggar: persetujuan bermakna, transparansi, sesuai tujuan", "Prinsip-prinsip itu adalah pratinjau UU PDP"] },
      { j: "Keputusan dan persetujuan", a: "Rancang keputusan dan kalimat persetujuan.", pb: [7],
        c: "Kumpulkan hanya data wajib; minta lokasi hanya saat fitur terkait dipakai; beri tombol tolak yang setara; tulis tujuan secara spesifik. Contoh: &ldquo;Kami memakai alamat dan nomor telepon Anda untuk mengirim pesanan. Lokasi hanya diminta saat Anda memakai fitur Cari Terdekat. Anda boleh menolak tanpa kehilangan layanan utama.&rdquo;",
        k: ["Kumpulkan hanya data wajib", "Minta lokasi hanya saat fitur terkait dipakai", "Tombol tolak setara dan tujuan ditulis spesifik"] }
    ] },
  { j: "Algoritma seleksi pinjaman yang bias", ps: [4], d: "Pemohon dari daerah tertentu lebih sering ditolak, tetapi manajemen ingin tetap meluncurkan.",
    t: "Sebuah fintech meluncurkan algoritma seleksi pinjaman otomatis. Tim data menemukan bahwa pemohon dari daerah tertentu lebih sering ditolak, padahal profil keuangannya setara dengan pemohon dari daerah lain. Manajemen ingin tetap meluncurkan karena keputusannya cepat dan murah, dan menganggap temuan itu &ldquo;belum tentu salah algoritmanya&rdquo;.",
    s: [
      { j: "Pemangku kepentingan", a: "Siapa saja yang terdampak?", pb: [4],
        c: "Pemohon dari daerah yang lebih sering ditolak, perusahaan dan tim data yang membuat algoritma, serta regulator dan publik yang kepercayaannya ikut terdampak.",
        k: ["Pemohon dari daerah yang lebih sering ditolak", "Perusahaan dan tim data pembuat algoritma", "Regulator dan publik yang kepercayaannya terdampak"] },
      { j: "Tiga lensa etika", a: "Apa kata konsekuensi, hak dan kewajiban, karakter?", pb: [5],
        c: "<b>Konsekuensialisme</b>: manfaatnya keputusan cepat dan murah, bahayanya kelompok tertentu dirugikan diam-diam dan kepercayaan publik turun. <b>Deontologi</b>: ketidakadilan yang sistematis melanggar hak pemohon, walau rata-rata akurasi tinggi. <b>Etika Keutamaan</b>: perusahaan yang berintegritas menguji dan memperbaiki bias, bukan menutupinya.",
        k: ["Konsekuensi: keputusan cepat dan murah vs kelompok dirugikan diam-diam", "Deontologi: ketidakadilan sistematis melanggar hak walau akurasi rata-rata tinggi", "Keutamaan: perusahaan berintegritas menguji dan memperbaiki bias"] },
      { j: "Hukum dan wilayah abu-abu", a: "Apakah sudah ada aturannya?", pb: [6],
        c: "Bias algoritma adalah dilema khas bisnis digital, dan belum tentu ada pasal khusus yang mengaturnya: ini <b>wilayah abu-abu</b>. Di ruang itu etika menjadi penuntun, karena &ldquo;legal&rdquo; tidak selalu berarti &ldquo;etis&rdquo;.",
        k: ["Bias algoritma adalah dilema khas bisnis digital", "Belum tentu ada pasal khusus: wilayah abu-abu", "Di ruang kosong hukum, etika jadi penuntun; legal tidak selalu etis"] },
      { j: "Keputusan dan alasan", a: "Luncurkan, tunda, atau ubah? Jelaskan alasannya.", pb: [7],
        c: "Contoh keputusan (bukan satu-satunya): tunda peluncuran sampai bias diuji dan diperbaiki, akui temuan itu secara terbuka, dan pastikan pemohon bisa mengetahui dasar penolakan. Alasannya: ketiga lensa mengarah ke sana. Jika kamu memilih meluncurkan, kamu harus bisa mempertahankan alasannya secara etis. Yang dinilai adalah argumentasimu.",
        k: ["Keputusan yang jelas (luncurkan, tunda, atau ubah) disertai alasan", "Alasan merujuk ke tiga lensa, bukan hanya untung-rugi", "Mengakui temuan bias dan memperbaikinya, bukan menutupinya"] }
    ] },
  { j: "Startup kopi dan aset yang dipinjam", ps: [7], d: "Foto, font, dan logo yang dipinjam, sementara akun premiumnya dibajak.",
    t: "Startup &ldquo;KopiKilat&rdquo; (nama fiktif) membuat aplikasi pesan antar kopi. Tim memakai foto produk dari internet, font berlisensi komersial yang diunduh gratis, serta nama dan logo yang mirip kedai kopi nasional. Seorang pesaing meniru tampilan aplikasinya, dan satu akun premium dipakai bersama puluhan orang.",
    s: [
      { j: "Aset yang dimiliki", a: "Daftar aset dan bentuk perlindungannya.", pb: [0],
        c: "Kode program, desain antarmuka dan ikon, konten: <b>hak cipta</b>. Nama dan logo: <b>merek dagang</b>. Algoritma rekomendasi dan basis data pelanggan yang dirahasiakan: <b>rahasia dagang</b>. Inovasi teknis baru (bila ada): <b>paten</b>.",
        k: ["Kode, desain antarmuka dan ikon, konten: hak cipta", "Nama dan logo: merek dagang", "Algoritma dan database yang dirahasiakan: rahasia dagang; inovasi teknis baru: paten"] },
      { j: "Tiga peran", a: "Kapan sebagai pemilik, pelaku, korban?", pb: [],
        c: "Pelaku: foto dan font tanpa lisensi, nama dan logo yang menyerupai pihak lain. Korban: akun premium dipakai bersama, tampilan ditiru pesaing. Pemilik: perlu melindungi mereknya sendiri. Catatan: ide aplikasi pesan antar kopi tidak bisa dimonopoli; yang dilindungi wujud kode dan tampilan.",
        k: ["Pelaku: foto dan font tanpa lisensi, nama dan logo menyerupai pihak lain", "Korban: akun premium dipakai bersama, tampilan ditiru pesaing", "Ide tidak bisa dimonopoli; yang dilindungi wujud kode dan tampilan"] },
      { j: "Rencana perlindungan dan perbaikan", a: "Apa yang harus dilakukan?", pb: [7],
        c: "Ganti atau lisensikan foto dan font, ubah nama dan logo agar tidak membingungkan konsumen, daftarkan merek, tulis syarat dan ketentuan yang melarang berbagi akun, dan jaga kerahasiaan algoritma serta database.",
        k: ["Ganti atau lisensikan foto dan font; ubah nama dan logo", "Daftarkan merek; syarat dan ketentuan melarang berbagi akun", "Jaga kerahasiaan algoritma dan database"] },
      { j: "Wilayah abu-abu dan keputusan", a: "Persoalan apa yang belum jelas aturannya?", pb: [5, 6],
        c: "Misalnya ilustrasi yang dibuat dengan AI generatif atau konten remix: hukumnya sering belum tegas, jadi timbang dengan tiga lensa, nyatakan secara terbuka asal kontennya, dan dokumentasikan alasan keputusan.",
        k: ["Konten AI generatif dan remix: hukumnya sering belum tegas", "Timbang dengan tiga lensa etika", "Nyatakan asal konten secara terbuka dan dokumentasikan alasan"] }
    ] }
];

// ===== Halaman Latihan =====
const lTabs = m => `<div class="seg" role="tablist"><a class="${m === '' ? 'on' : ''}" href="#/latihan">Kuis</a><a class="${m === 'kasus' ? 'on' : ''}" href="#/latihan/kasus">Studi kasus</a><a class="${m === 'kartu' ? 'on' : ''}" href="#/latihan/kartu">Kartu kilat</a></div>`;
const pChips = (cur, act) => `<div class="chips">${[0, 1, 2, 3, 4, 5, 6, 7].map(p => `<button class="chip ${cur == p ? 'on' : ''}" data-act="${act}" data-p="${p}">${p ? 'P' + p : 'Semua'}</button>`).join('')}</div>`;

function latihan(m, b) { return m === 'kasus' ? kasusPage(b) : m === 'kartu' ? kartuPage() : kuisPage(); }

function kuisPage() {
  const q = ST.qz;
  const head = `<h2>Latihan</h2>${lTabs('')}`;
  if (!q) {
    const f = ST.qf || 0, n = f ? QS.filter(x => x[0] === f).length : Math.min(15, QS.length);
    const best = store.get('cs-best', {})[f];
    return `<section class="page">${head}<p class="lead">Pilih cakupan soal. &ldquo;Semua&rdquo; mengacak 15 dari ${QS.length} soal; memilih satu pertemuan memunculkan seluruh soal pertemuan itu.</p>${pChips(f, 'qf')}<p class="note">${n} soal${best != null ? ` · skor terbaikmu: <b>${best}%</b>` : ''}</p><button class="btn pri" data-act="qstart">Mulai kuis</button></section>`;
  }
  if (q.i >= q.set.length) {
    const pct = Math.round(q.s / q.set.length * 100);
    const wr = q.wrong.map(w => `<div class="rev"><span class="tagp">P${w.p}</span><b>${w.q}</b><p>Jawaban benar: ${w.a}</p><p class="mute">${w.e}</p></div>`).join('');
    return `<section class="page">${head}<div class="score"><div class="ring" style="--v:${pct}"><b>${pct}%</b></div><div><h3>Skor ${q.s} / ${q.set.length}</h3><p>${pct >= 80 ? 'Kuat. Coba studi kasus untuk melatih argumentasi.' : pct >= 60 ? 'Lumayan. Baca ulang bagian Tips UTS pada modul yang salah.' : 'Buka lagi modul yang masih kabur, lalu ulangi.'}</p></div></div><button class="btn pri" data-act="qreset">Ulangi</button> <a class="btn" href="#/lab">Latihan di lab</a>${wr ? `<h3>Perlu diulang (${q.wrong.length})</h3>${wr}` : ''}</section>`;
  }
  const x = q.set[q.i];
  const opts = x.o.map((o, j) => `<button class="opt ${q.a == null ? '' : o.ok ? 'ok' : j === q.a ? 'no' : ''}" ${q.a == null ? '' : 'disabled'} data-act="qpick" data-j="${j}"><i>${'ABCD'[j]}</i><span>${o.t}</span></button>`).join('');
  return `<section class="page">${head}<div class="bar slim"><i style="width:${q.i / q.set.length * 100}%"></i></div><p class="note">Soal ${q.i + 1} dari ${q.set.length} · <span class="tagp">P${x.p}</span></p><p class="lead">${x.q}</p><div class="opts">${opts}</div>${q.a == null ? '' : `<p class="ex">${x.e}</p><button class="btn pri" data-act="qnext">${q.i + 1 >= q.set.length ? 'Lihat skor' : 'Lanjut'}</button>`}</section>`;
}
Object.assign(ACT, {
  qf(d) { ST.qf = +d.p; redraw(); },
  qstart() {
    const f = ST.qf || 0;
    let set = QS.filter(x => !f || x[0] === f);
    set = shuffle(set); if (!f) set = set.slice(0, 15);
    ST.qz = { i: 0, s: 0, a: null, wrong: [], f, set: set.map(x => ({ p: x[0], q: x[1], e: x[4], o: shuffle(x[2].map((t, i) => ({ t, ok: i === x[3] }))) })) };
    redraw();
  },
  qpick(d) {
    const q = ST.qz; if (q.a != null) return;
    const x = q.set[q.i]; q.a = +d.j;
    if (x.o[q.a].ok) q.s++; else q.wrong.push({ p: x.p, q: x.q, a: x.o.find(o => o.ok).t, e: x.e });
    redraw();
  },
  qnext() {
    const q = ST.qz; q.i++; q.a = null;
    if (q.i >= q.set.length) { const b = store.get('cs-best', {}), pct = Math.round(q.s / q.set.length * 100); if (b[q.f] == null || pct > b[q.f]) { b[q.f] = pct; store.set('cs-best', b); } }
    redraw();
  },
  qreset() { const f = ST.qz ? ST.qz.f : 0; ST = { qf: f }; redraw(); }
});

// ===== Studi Kasus: satu langkah per layar, jawaban tersimpan otomatis =====
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ksStore = () => store.get('cs-ks', {});
const ksKey = (ci, si) => ci + '.' + si;
const ksGet = (ci, si) => { const v = ksStore()[ksKey(ci, si)] || {}; return { t: v.t || '', s: v.s ? 1 : 0, c: Array.isArray(v.c) ? v.c : [] }; };
const ksPut = (ci, si, v) => { const a = ksStore(); a[ksKey(ci, si)] = v; store.set('cs-ks', a); };
const ksDone = ci => KS[ci].s.filter((_, si) => ksGet(ci, si).s).length;
const ksPts = (ci, si) => ksGet(ci, si).c.filter(Boolean).length;
const ksCur = () => +location.hash.slice(1).split('/')[3] - 1;
const ksTags = k => k.ps.map(p => `<a class="tagp" href="#/p/${p}">P${p}</a>`).join(' ');

function kasusPage(b) {
  const ci = +b - 1;
  if (b && KS[ci]) return ksCase(ci);
  const f = ST.kf || 0;
  const list = KS.map((k, i) => ({ k, i })).filter(x => !f || x.k.ps.includes(f));
  const cards = list.map(({ k, i }) => {
    const d = ksDone(i), n = k.s.length;
    return `<a class="lc ksc ${d === n ? 'fin' : ''}" href="#/latihan/kasus/${i + 1}"><span class="tags">${k.ps.map(p => `<span class="tagp">P${p}</span>`).join(' ')}</span><b>${k.j}</b><small>${k.d}</small><div class="bar slim"><i style="width:${d / n * 100}%"></i></div><small>${d === n ? '✓ Selesai' : d ? d + ' dari ' + n + ' langkah' : 'Belum dimulai'}</small></a>`;
  }).join('');
  return `<section class="page"><h2>Latihan</h2>${lTabs('kasus')}<p class="lead">UTS menilai analisis dan argumentasi. Tiap kasus dikerjakan satu langkah per layar: tulis jawabanmu dulu, baru lihat contoh dan centang poin kunci yang sudah ada di jawabanmu.</p>${pChips(f, 'ksf')}<p class="note">${list.length} kasus · jawabanmu tersimpan otomatis di perangkat ini</p>${list.length ? `<div class="cards">${cards}</div>` : '<p class="note">Belum ada kasus untuk pertemuan ini.</p>'}</section>`;
}

function ksCase(ci) {
  const k = KS[ci], n = k.s.length;
  if (ST.si == null) { const u = k.s.findIndex((_, i) => !ksGet(ci, i).s); ST.si = u < 0 ? n : u; }
  const si = ST.si;
  const head = `<p class="crumb"><a href="#/latihan/kasus">‹ Semua kasus</a> ${ksTags(k)}</p><h2>${k.j}</h2>`;
  const dots = `<div class="ksdots" role="group" aria-label="Langkah">${k.s.map((s, i) => `<button class="kd ${i === si ? 'on' : ''} ${ksGet(ci, i).s ? 'ok' : ''}" data-act="ksgo" data-i="${i}" aria-label="Langkah ${i + 1}: ${s.j}" aria-current="${i === si}">${i + 1}</button>`).join('')}<button class="kd ${si === n ? 'on' : ''}" data-act="ksgo" data-i="${n}" aria-label="Ringkasan">✓</button></div>`;
  const scn = `<details class="kscn"${si === 0 ? ' open' : ''}><summary>${si === 0 ? 'Kasus' : 'Baca ulang kasus'}</summary><p>${k.t}</p></details>`;

  if (si >= n) {
    const tot = k.s.reduce((a, s) => a + s.k.length, 0), got = k.s.reduce((a, s, i) => a + ksPts(ci, i), 0);
    const pct = tot ? Math.round(got / tot * 100) : 0;
    const un = k.s.map((_, i) => i).filter(i => !ksGet(ci, i).s);
    const miss = k.s.map((s, i) => ({ s, i, m: s.k.filter((_, j) => !ksGet(ci, i).c[j]) })).filter(x => ksGet(ci, x.i).s && x.m.length);
    const nxt = KS[ci + 1] ? `<a class="btn" href="#/latihan/kasus/${ci + 2}">Kasus berikutnya ›</a>` : '';
    return `<section class="page">${head}${dots}<div class="score"><div class="ring" style="--v:${pct}"><b>${pct}%</b></div><div><h3>${got} dari ${tot} poin kunci</h3><p>${un.length ? 'Masih ada langkah yang belum dikerjakan.' : pct >= 80 ? 'Kuat. Argumentasimu sudah mencakup hampir semua poin.' : 'Baca lagi poin yang terlewat, lalu coba tulis ulang jawabanmu.'}</p></div></div>${un.length ? `<p class="note">Belum dikerjakan: langkah ${un.map(i => i + 1).join(', ')}.</p>` : ''}${miss.length ? `<h3>Poin yang masih terlewat</h3>${miss.map(x => `<div class="rev"><b>${x.i + 1}. ${x.s.j}</b><ul>${x.m.map(p => `<li>${p}</li>`).join('')}</ul></div>`).join('')}` : (un.length ? '' : '<p class="tip">Semua poin kunci sudah ada di jawabanmu.</p>')}<div class="row"><button class="btn" data-act="ksreset">Ulangi kasus ini</button>${nxt}<a class="btn" href="#/latihan/kasus">Semua kasus</a></div></section>`;
  }

  const s = k.s[si], d = ksGet(ci, si), shown = !!d.s;
  const pb = s.pb.length ? `<p class="pbs"><small class="mute">Langkah Playbook:</small> ${s.pb.map(i => `<span class="tagp">${PLAY[i][0]}</span>`).join(' ')}</p>` : '';
  const warn = ST.kw ? `<div class="warn">Tulis dulu jawabanmu, walau singkat. Dengan menulis, kamu tahu bagian mana yang belum kamu pahami.<div><button class="btn" data-act="ksskip">Lihat contoh tanpa menulis</button></div></div>` : '';
  const ta = `<textarea rows="5" data-ks="${ci}.${si}" placeholder="Tulis jawabanmu di sini. Tersimpan otomatis di perangkat ini." aria-label="Jawabanmu untuk ${s.j}">${esc(d.t)}</textarea>`;
  const body = shown
    ? `<div class="model"><span class="lbl">Contoh jawaban</span><p>${s.c}</p></div><h3>Poin kunci</h3><p class="note">Centang poin yang sudah ada di jawabanmu.</p><div class="sws">${s.k.map((p, j) => `<button class="sw ${d.c[j] ? 'on' : ''}" role="checkbox" aria-checked="${!!d.c[j]}" data-act="kspt" data-j="${j}"><span class="knob"></span><span class="lb">${p}</span></button>`).join('')}</div><p class="note">${ksPts(ci, si)} dari ${s.k.length} poin</p>`
    : `${warn}<div class="row"><button class="btn pri" data-act="kscek">Cek jawabanku</button></div>`;
  const nav = `<div class="row">${si > 0 ? `<button class="btn" data-act="ksgo" data-i="${si - 1}">‹ Sebelumnya</button>` : ''}${shown ? `<button class="btn pri" data-act="ksgo" data-i="${si + 1}">${si + 1 >= n ? 'Lihat ringkasan' : 'Langkah berikutnya ›'}</button>` : ''}</div>`;
  return `<section class="page">${head}${dots}${scn}<div class="kstep"><p class="note">Langkah ${si + 1} dari ${n}</p><h3>${s.j}</h3>${pb}<p class="lead">${s.a}</p>${ta}${body}</div>${nav}</section>`;
}

Object.assign(ACT, {
  ksf(d) { ST.kf = +d.p; redraw(); },
  ksgo(d) { ST.si = +d.i; ST.kw = false; redraw(); scrollTo(0, 0); },
  kscek() {
    const ci = ksCur(), si = ST.si, ta = document.querySelector('textarea[data-ks]');
    const v = ksGet(ci, si); if (ta) v.t = ta.value;
    if (v.t.trim().length < 10) { ST.kw = true; redraw(); return; }
    v.s = 1; ksPut(ci, si, v); ST.kw = false; redraw();
  },
  ksskip() { const ci = ksCur(), v = ksGet(ci, ST.si); v.s = 1; ksPut(ci, ST.si, v); ST.kw = false; redraw(); },
  kspt(d) {
    const ci = ksCur(), si = ST.si, v = ksGet(ci, si), j = +d.j;
    while (v.c.length < KS[ci].s[si].k.length) v.c.push(0);
    v.c[j] = v.c[j] ? 0 : 1; ksPut(ci, si, v); redraw();
  },
  ksreset() {
    if (!confirm('Hapus semua jawaban dan centang untuk kasus ini?')) return;
    const ci = ksCur(), a = ksStore(); KS[ci].s.forEach((_, i) => delete a[ksKey(ci, i)]);
    store.set('cs-ks', a); ST.si = 0; ST.kw = false; redraw(); scrollTo(0, 0);
  }
});
document.addEventListener('input', e => {
  const t = e.target; if (!t.dataset || !t.dataset.ks) return;
  const [ci, si] = t.dataset.ks.split('.').map(Number), v = ksGet(ci, si);
  v.t = t.value; ksPut(ci, si, v);
});

function kartuPage() {
  const f = ST.fp || 0, c = ST.fc;
  const head = `<h2>Latihan</h2>${lTabs('kartu')}`;
  if (!c) {
    const n = G.filter(g => !f || g.p === f).length;
    return `<section class="page">${head}<p class="lead">Kartu kilat dari glosarium. Tekan kartu untuk membalik. &ldquo;Sudah hafal&rdquo; mengeluarkan kartu dari tumpukan, &ldquo;Ulang&rdquo; memasukkannya ke belakang.</p>${pChips(f, 'fp')}<p class="note">${n} kartu</p><button class="btn pri" data-act="fstart">Mulai</button></section>`;
  }
  if (!c.deck.length) return `<section class="page">${head}<div class="score"><div class="ring" style="--v:100"><b>✓</b></div><div><h3>Tumpukan habis</h3><p>Semua kartu sudah kamu hafal. Total putaran: ${c.n}.</p></div></div><button class="btn pri" data-act="fstart">Ulangi</button></section>`;
  const g = G[c.deck[0]];
  return `<section class="page">${head}<p class="note">Sisa ${c.deck.length} kartu · <span class="tagp">P${g.p}</span></p><button class="flip ${c.flip ? 'on' : ''}" data-act="fflip" aria-label="Balik kartu"><span class="face front"><small>Istilah</small><b>${g.t}</b><em>Ketuk untuk melihat arti</em></span><span class="face back"><small>Arti</small><span>${g.d}</span>${g.c ? `<em>${g.c}</em>` : ''}</span></button><div class="row"><button class="btn" data-act="fagain">Ulang</button><button class="btn pri" data-act="fknow">Sudah hafal</button></div></section>`;
}
Object.assign(ACT, {
  fp(d) { ST.fp = +d.p; redraw(); },
  fstart() { const f = ST.fp || 0; ST.fc = { deck: shuffle(G.map((g, i) => i).filter(i => !f || G[i].p === f)), flip: false, n: 0 }; redraw(); },
  fflip() { ST.fc.flip = !ST.fc.flip; redraw(); },
  fknow() { const c = ST.fc; c.deck.shift(); c.flip = false; c.n++; redraw(); },
  fagain() { const c = ST.fc; c.deck.push(c.deck.shift()); c.flip = false; c.n++; redraw(); }
});
