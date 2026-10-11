// Bank soal. Format: Q(unit, pertanyaan, jawaban benar, [pilihan salah], penjelasan).
// Urutan pilihan diacak otomatis saat latihan. Banyak soal mengacu pada contoh dan self-test di buku.
const QS=[];
const Q=(u,q,r,w,e)=>QS.push({u,q,r,w,e});

// Bab 1
Q("1","Produktivitas naik ketika...","Input turun sementara output tetap",["Input naik sementara output tetap","Output turun sementara input tetap","Input dan output naik dengan laju yang sama"],"Produktivitas = output / input. Rasio hanya membaik jika output naik lebih cepat dari input, atau input turun dengan output tetap.");
Q("1","Tiga variabel yang menentukan kenaikan produktivitas adalah...","Tenaga kerja, modal, manajemen",["Rekayasa, tenaga kerja, modal","Rekayasa, modal, pengendalian kualitas","Rekayasa, tenaga kerja, pemrosesan data"],"Buku menyebut tenaga kerja (10%), modal (38%), dan manajemen (52%).");
Q("1","Empat staf bekerja 8 jam sehari dan memproses 14 judul per hari. Produktivitas tenaga kerja?","0,4375 judul per jam kerja",["0,25 judul per jam kerja","3,5 judul per jam kerja","0,0097 judul per dolar"],"Input = 4 x 8 = 32 jam kerja. 14 / 32 = 0,4375.");
Q("1","Biaya tenaga kerja $640 dan overhead $800 per hari menghasilkan 14 judul. Produktivitas multifaktor?","0,0097 judul per dolar",["0,4375 judul per dolar","0,0077 judul per dolar","0,0175 judul per dolar"],"14 / (640 + 800) = 14 / 1.440 = 0,0097.");
Q("1","Jasa pada umumnya...","Berbasis pengetahuan",["Berwujud","Sangat terstandar","Rendah interaksi dengan pelanggan"],"Jasa biasanya tak berwujud, interaksi pelanggan tinggi, dan sering berbasis pengetahuan.");
Q("1","Tiga fungsi yang dimiliki semua organisasi untuk menciptakan barang dan jasa adalah...","Pemasaran, produksi/operasi, keuangan/akuntansi",["Pemasaran, SDM, hukum","Produksi, logistik, humas","Keuangan, riset, penjualan"],"Pemasaran menciptakan permintaan, operasi menciptakan produk, keuangan melacak kinerja dan arus uang.");
Q("1","Perbedaan produksi tinggi dan produktivitas tinggi adalah...","Produksi tinggi berarti banyak unit; produktivitas tinggi berarti unit dibuat secara efisien",["Keduanya sama","Produktivitas tinggi berarti banyak unit tanpa memedulikan input","Produksi tinggi berarti biaya rendah"],"Produksi mengukur jumlah output; produktivitas mengukur output per input.");

// Bab 2
Q("2","Tiga pendekatan strategis untuk keunggulan bersaing adalah...","Diferensiasi, kepemimpinan biaya, respons",["Diferensiasi, harga, promosi","Biaya, volume, lokasi","Kualitas, riset, merek"],"Buku menyebut differentiation, cost leadership, dan response.");
Q("2","Perusahaan beroperasi lintas negara dengan wewenang terdesentralisasi dan otonomi besar di tiap bisnis (anak usaha, waralaba, joint venture). Strategi globalnya adalah...","Multidomestic",["Global","Transnational","International"],"Multidomestic: keputusan operasi didesentralisasi ke tiap negara untuk meningkatkan responsivitas lokal.");
Q("2","Membandingkan penyedia outsourcing lewat rata-rata skor berbobot disebut...","Factor-rating analysis",["Cost-volume analysis","Transportation model","Crossover analysis"],"Factor-rating cocok untuk memilih penyedia dan menilai risiko negara.");
Q("2","Bobot kriteria 0,6 dan 0,4. Opsi A mendapat skor 4 dan 2. Skor total berbobot?","3,2",["3,0","3,4","6,0"],"0,6 x 4 + 0,4 x 2 = 2,4 + 0,8 = 3,2.");
Q("2","Pada fase product life cycle mana peramalan dan penambahan kapasitas menjadi kritis?","Growth",["Introduction","Maturity","Decline"],"Pada growth: peramalan kritis, kapasitas bertambah, bergeser ke fokus produk.");
Q("2","Alasan paling umum yang disebut buku untuk kegagalan outsourcing adalah...","Keputusan diambil tanpa pemahaman dan analisis yang memadai",["Biaya tenaga kerja luar negeri naik","Pemasok selalu tidak jujur","Teknologi komunikasi kurang"],"Mungkin separuh perjanjian outsourcing gagal karena perencanaan dan analisis yang tidak cukup.");
Q("2","Mana yang BUKAN bagian dari lima kekuatan Porter?","Regulator pemerintah",["Pesaing langsung","Pelanggan","Produk pengganti"],"Lima kekuatan: pesaing langsung, pendatang baru potensial, pelanggan, pemasok, produk pengganti.");

// Bab 3
Q("3","Slack suatu aktivitas sama dengan...","LS - ES",["ES + durasi","EF - ES","Nol untuk semua aktivitas"],"Slack = LS - ES = LF - EF. Aktivitas kritis memiliki slack nol.");
Q("3","Jalur kritis suatu jaringan adalah...","Jalur dengan waktu terpanjang",["Jalur dengan waktu terpendek","Jalur dengan aktivitas paling sedikit","Jalur dengan aktivitas paling banyak"],"Jalur terpanjang menentukan lamanya proyek.");
Q("3","Varians waktu penyelesaian proyek pada PERT dihitung sebagai...","Jumlah varians aktivitas di jalur kritis",["Jumlah varians semua aktivitas","Jumlah varians aktivitas di luar jalur kritis","Varians aktivitas terakhir"],"Hanya aktivitas jalur kritis yang menentukan waktu proyek.");
Q("3","Aktivitas F: a = 1, m = 2, b = 9 minggu. Waktu harapannya?","3 minggu",["2 minggu","4 minggu","3,67 minggu"],"t = (1 + 4 x 2 + 9) / 6 = 18 / 6 = 3.");
Q("3","Untuk aktivitas yang sama (a = 1, b = 9), varians waktunya?","1,78",["1,33","8,00","0,44"],"[(9 - 1) / 6]^2 = (8/6)^2 = 1,78.");
Q("3","Waktu harapan proyek 15 minggu, standar deviasi proyek 1,76, tenggat 16 minggu. Nilai Z?","0,57",["1,76","1,00","0,15"],"Z = (16 - 15) / 1,76 = 0,57. Peluang selesai tepat waktu sekitar 72%.");
Q("3","Aktivitas B: normal 3 minggu ($30.000), crash 1 minggu ($34.000). Crash cost per minggu?","$2.000",["$4.000","$1.333","$10.000"],"(34.000 - 30.000) / (3 - 1) = 2.000 per minggu.");
Q("3","Pada diagram activity-on-node (AON)...","Simpul mewakili aktivitas",["Panah mewakili aktivitas","Simpul disebut kejadian (event)","Aktivitas tidak butuh waktu"],"Di AON simpul adalah aktivitas. Di AOA panah adalah aktivitas dan simpul adalah event.");
Q("3","Dummy activity adalah...","Aktivitas tanpa waktu untuk menjaga logika jaringan",["Aktivitas dengan slack terbesar","Aktivitas pertama proyek","Aktivitas yang dikerjakan subkontraktor"],"Dummy tidak memakai waktu atau sumber daya, hanya menjaga hubungan pendahulu.");
Q("3","Perbedaan utama PERT dan CPM menurut buku...","PERT memakai tiga estimasi waktu, CPM satu estimasi",["PERT hanya untuk proyek besar","CPM memakai distribusi beta","CPM tidak punya jalur kritis"],"PERT: a, m, b dengan asumsi beta. CPM: satu estimasi per aktivitas.");

// Bab 4
Q("4","Penjualan shed bulan Oktober, November, Desember adalah 18, 16, 14. Ramalan Januari dengan moving average 3 bulan?","16",["14","17","15,5"],"(18 + 16 + 14) / 3 = 16.");
Q("4","Ramalan Februari 142, aktual 153, alpha = 0,20. Ramalan Maret dengan exponential smoothing?","144,2",["147,0","153,0","142,2"],"142 + 0,2 x (153 - 142) = 142 + 2,2 = 144,2.");
Q("4","Ramalan jangka panjang (3 tahun atau lebih) paling cocok untuk...","Rencana produk baru, belanja modal, lokasi fasilitas",["Penjadwalan pekerjaan harian","Penugasan kerja mingguan","Pembelian bahan bulan depan"],"Jangka pendek untuk pembelian dan penjadwalan; jangka panjang untuk keputusan strategis fasilitas dan produk.");
Q("4","Rata-rata permintaan 800 unit per bulan dan indeks musiman Mei 1,25. Ramalan Mei?","1.000 unit",["640 unit","800 unit","798,75 unit"],"800 x 1,25 = 1.000.");
Q("4","Tracking signal dihitung sebagai...","Kesalahan kumulatif dibagi MAD",["MAD dibagi kesalahan kumulatif","Standard error of the estimate","MAPE dibagi n"],"Tracking signal = jumlah (aktual - ramalan) / MAD.");
Q("4","Perbedaan regresi sederhana dan regresi berganda adalah...","Regresi sederhana hanya punya satu variabel bebas",["Regresi berganda hanya punya satu variabel terikat","Regresi sederhana tidak memakai garis lurus","Regresi berganda tidak butuh data historis"],"Multiple regression memakai lebih dari satu variabel bebas.");
Q("4","Tiga ukuran akurasi ramalan yang populer adalah...","MAD, MSE, MAPE",["Total error, average error, mean error","Median error, minimum error, maximum error","Average error, median error, maximum error"],"MAD, MSE, dan MAPE (rumus 4-5 sampai 4-7).");
Q("4","Persamaan tren y = 56,70 + 10,54x. Ramalan tahun ke-8?","Sekitar 141",["Sekitar 98,9","Sekitar 132,5","Sekitar 151"],"56,70 + 10,54 x 8 = 141,02.");
Q("4","Delphi method adalah...","Proses kelompok interaktif yang memungkinkan para ahli membuat ramalan",["Rata-rata bergerak berbobot","Survei langsung ke pelanggan","Metode regresi dua variabel"],"Delphi termasuk metode kualitatif bersama jury of executive opinion, sales force composite, dan market survey.");
Q("4","Jika alpha = 1 pada exponential smoothing, ramalan menjadi...","Sama dengan permintaan periode terakhir (naive)",["Rata-rata semua data","Selalu nol","Tidak berubah selamanya"],"F(t) = A(t-1): semua data lama dibuang.");

// Bab 5
Q("5","Product life cycle terdiri dari empat fase, yaitu...","Introduction, growth, maturity, decline",["Design, build, sell, retire","Plan, do, check, act","Concept, test, launch, scale"],"Empat fase product life cycle.");
Q("5","House of quality adalah...","Matriks yang menghubungkan keinginan pelanggan dengan cara perusahaan memenuhinya",["Skema perakitan produk","Daftar operasi pembuatan komponen","Perintah membuat jumlah item tertentu"],"Bagian dari QFD: wants pelanggan dipetakan ke hows teknis.");
Q("5","Route sheet adalah...","Daftar operasi yang diperlukan untuk membuat suatu komponen",["Perintah membuat sejumlah item","Skema bagaimana produk dirakit","Daftar komponen dan jumlahnya"],"Route sheet = operasi. Work order = perintah produksi. Assembly chart = skema perakitan.");
Q("5","Bill of material (BOM) adalah...","Daftar komponen, deskripsi, dan jumlah yang dibutuhkan untuk satu unit produk",["Daftar operasi pembuatan komponen","Grafik aliran komponen ke produk akhir","Perubahan pada gambar teknik"],"BOM menjawab: apa saja dan berapa banyak komponen per unit.");
Q("5","Decision tree memakai...","Peluang, payoff, logika, dan opsi",["Hanya peluang","Hanya payoff","Hanya opsi keputusan"],"Pohon keputusan memadukan semuanya untuk menghitung EMV tiap alternatif.");
Q("5","Pabrik sedang: untung $60.000 jika pasar baik (peluang 0,4) dan rugi $10.000 jika buruk (peluang 0,6). EMV?","$18.000",["$24.000","$50.000","$14.000"],"0,4 x 60.000 + 0,6 x (-10.000) = 24.000 - 6.000 = 18.000.");
Q("5","Silicon, Inc.: beli CAD memberi $1.000.000 (peluang 0,4) atau rugi $20.000 (peluang 0,6). EMV beli CAD?","$388.000",["$400.000","$365.000","$980.000"],"0,4 x 1.000.000 + 0,6 x (-20.000) = 400.000 - 12.000 = 388.000.");
Q("5","Time-based competition berfokus pada...","Membawa produk baru ke pasar lebih cepat",["Memperpendek umur produk","Menghubungkan QFD dengan PLM","Mengurangi ketersediaan basis data desain"],"Kecepatan pengembangan produk adalah keunggulan bersaing.");
Q("5","Salah satu cara meningkatkan efisiensi desain jasa adalah...","Menunda kustomisasi",["Memperbanyak pilihan layanan","Mengurangi otomatisasi","Menghindari modularisasi"],"Lima cara: batasi pilihan, tunda kustomisasi, modularisasi, otomatisasi, rancang untuk moment of truth.");

// Suplemen 5
Q("s5","3R dalam keberlanjutan adalah...","Reduce, reuse, recycle",["Reputation, reuse, reduce","Reverse, review, recycle","Recover, renew, reject"],"Tim desain harus memasukkan 3R sejak awal.");
Q("s5","Sustainability berarti...","Memenuhi kebutuhan sekarang tanpa mengorbankan kebutuhan generasi mendatang",["Hanya produk hijau dan daur ulang","Mempertahankan produk yang tidak bisa didaur ulang","Tidak memberhentikan pekerja senior"],"Definisi yang dipakai buku.");
Q("s5","Triple bottom line mencakup...","People, planet, profit",["Price, product, promotion","Plan, process, performance","Power, policy, politics"],"Tiga P yang harus didukung sistem organisasi.");
Q("s5","Design for disassembly menekankan...","Reuse dan recycle komponen",["Pemakaian bahan paling murah","Pengurangan jumlah supplier","Perpanjangan garansi"],"Produk dirancang mudah dibongkar agar komponen dapat dimanfaatkan lagi.");
Q("s5","Desain Harmonizer: jual kembali $35,49; daur ulang $11,94; pemrosesan $22,33; pembuangan $2,97. Revenue retrieval?","$22,13",["$25,10","$47,43","$12,63"],"35,49 + 11,94 - 22,33 - 2,97 = 22,13.");
Q("s5","ISO 14001 mengatur...","Environmental management system",["Sistem manajemen kualitas","Keselamatan produk","Standar akuntansi"],"ISO 14000 adalah keluarga pedoman pembangunan berkelanjutan. ISO 9000 untuk kualitas.");
Q("s5","Closed-loop supply chain disebut juga...","Reverse logistics",["Just-in-time","Outsourcing global","Cross-docking"],"Rantai pasok yang memperhitungkan produk setelah akhir masa pakainya, aliran maju dan balik.");

// Bab 6
Q("6","Menurut ASQ, kualitas adalah...","Totalitas fitur dan karakteristik yang menyangkut kemampuan memuaskan kebutuhan yang dinyatakan atau tersirat",["Tingkat keunggulan pada harga yang dapat diterima","Seberapa cocok produk dengan pola preferensi konsumen","Sesuatu yang tidak dapat didefinisikan"],"Definisi ASQ yang dikutip buku.");
Q("6","ISO 9000 adalah standar internasional yang mengatur...","Sistem manajemen kualitas",["Dampak lingkungan","Keselamatan kerja","Standar akuntansi global"],"ISO 9000 adalah satu-satunya standar kualitas yang diakui internasional.");
Q("6","Sejuta penumpang memakai bagasi per tahun. Program Six Sigma yang berhasil menghasilkan berapa penumpang dengan koper salah tempat?","3,4",["6","34","2.700"],"Six Sigma = 3,4 cacat per sejuta peluang.");
Q("6","Mengidentifikasi organisasi terbaik pada suatu aspek lalu menirunya disebut...","Benchmarking",["Continuous improvement","Employee empowerment","Poka-yoke"],"Benchmarking memilih standar kinerja terbaik sebagai acuan.");
Q("6","Konsep berikut BUKAN bagian dari metode Taguchi...","Keterlibatan karyawan",["Menghilangkan efek kondisi buruk","Quality loss function","Spesifikasi berorientasi target"],"Taguchi: quality robust, target-oriented quality, dan quality loss function.");
Q("6","Mana yang BUKAN salah satu dari tujuh alat TQM?","Gantt chart",["Pareto chart","Histogram","Check sheet"],"Tujuh alat: check sheet, scatter diagram, cause-and-effect diagram, Pareto chart, flowchart, histogram, SPC chart.");
Q("6","Empat kategori cost of quality adalah...","Prevention, appraisal, internal failure, external failure",["Planning, design, test, launch","Material, labor, overhead, profit","Prevention, promotion, pricing, production"],"Biaya mencegah, menilai, kegagalan internal, dan kegagalan eksternal.");
Q("6","PDCA adalah singkatan dari...","Plan, do, check, act",["Produce, deliver, control, audit","Plan, design, certify, apply","Prevent, detect, correct, adjust"],"Model perbaikan berkelanjutan empat tahap.");
Q("6","Poka-yoke berarti...","Pencegahan kesalahan (mistake proofing)",["Perbaikan berkelanjutan","Produksi tepat waktu","Pengukuran kepuasan pelanggan"],"Alat atau teknik yang memastikan unit baik diproduksi setiap kali.");
Q("6","Menurut literatur bisnis yang dikutip buku, sekitar 85% masalah kualitas berkaitan dengan...","Bahan dan proses, bukan kinerja karyawan",["Kelalaian karyawan","Kesalahan pelanggan","Kebijakan harga"],"Karena itu empowerment dan perbaikan proses penting.");

// Suplemen 6
Q("s6","Rata-rata sampel berada dalam batas x-bar chart, tetapi rentang sampel di luar batas R-chart. Artinya...","Dispersi proses di luar kendali; cari penyebabnya",["Proses sepenuhnya terkendali","Rata-rata proses bergeser","Chart harus dibuang"],"x-bar chart melihat pemusatan, R-chart melihat dispersi. Keduanya harus dipantau.");
Q("s6","Central limit theorem memungkinkan manajer...","Memakai distribusi normal sebagai dasar sebagian control chart",["Menghilangkan variasi alami","Mengganti R-chart dengan p-chart","Menghitung Cpk tanpa sigma"],"Rata-rata sampel cenderung normal, apa pun distribusi populasinya.");
Q("s6","Chart untuk mengendalikan pemusatan variabel kontinu adalah...","x-bar chart",["R-chart","p-chart","c-chart"],"x-bar chart memantau rata-rata; R-chart memantau rentang.");
Q("s6","Control chart untuk atribut adalah...","p-chart dan c-chart",["x-bar chart dan R-chart","Hanya R-chart","Hanya x-bar chart"],"Atribut: baik atau cacat. p-chart persen cacat, c-chart jumlah cacat.");
Q("s6","USL 213, LSL 207, sigma proses 0,516. Cp?","1,94",["0,52","1,00","3,10"],"Cp = (213 - 207) / (6 x 0,516) = 6 / 3,096 = 1,94.");
Q("s6","Rata-rata 0,250; sigma 0,0005; spesifikasi 0,249 sampai 0,251. Cpk?","0,67",["1,33","1,00","2,00"],"Cpk = min[(0,251 - 0,250)/0,0015 ; (0,250 - 0,249)/0,0015] = 0,67. Di bawah 1,0 berarti tidak mampu.");
Q("s6","Total 54 keluhan dalam 9 hari. Batas atas c-chart (3 sigma)?","Sekitar 13,35",["Sekitar 8,45","6","Sekitar 18"],"c-bar = 6. UCL = 6 + 3 x akar(6) = 6 + 7,35 = 13,35.");
Q("s6","Proporsi cacat rata-rata 0,04 dan ukuran sampel 100. Sigma p-chart?","0,0196",["0,04","0,196","0,0004"],"Akar [0,04 x 0,96 / 100] = akar(0,000384) = 0,0196.");
Q("s6","Producer's risk adalah peluang...","Lot ditolak padahal mutunya memenuhi atau melebihi AQL",["Lot buruk diterima","Sampel tidak representatif","Proses keluar dari kendali"],"Producer's risk = Type I error. Consumer's risk = Type II error.");
Q("s6","Variasi yang dapat ditelusuri ke sebab tertentu disebut...","Assignable variation",["Natural variation","Common cause","Random drift"],"Natural variation (common cause) ada pada semua proses dan ditoleransi.");

// Bab 7
Q("7","Proses volume rendah dan variasi tinggi disebut juga...","Process focus (job shop)",["Proses kontinu","Repetitive process","Product focus"],"Process focus: utilisasi biasanya hanya 5% sampai 25%.");
Q("7","Software A: tetap $200.000, $60 per laporan. Software B: tetap $300.000, $25 per laporan. Titik silang A dan B?","Sekitar 2.857 laporan",["Sekitar 6.667 laporan","Sekitar 4.286 laporan","Sekitar 1.000 laporan"],"(300.000 - 200.000) / (60 - 25) = 100.000 / 35 = 2.857.");
Q("7","Mana yang BUKAN alat analisis proses?","Vision system",["Flowchart","Service blueprinting","Value-stream mapping"],"Vision system adalah teknologi inspeksi, bukan alat analisis proses.");
Q("7","Product focus ditandai oleh...","Biaya tetap tinggi dan biaya variabel rendah",["Biaya tetap rendah dan biaya variabel tinggi","Utilisasi 5% sampai 25%","Variasi produk sangat tinggi"],"Fasilitas khusus mahal, tetapi biaya per unit rendah bila utilisasi tinggi.");
Q("7","Postponement adalah...","Menunda kustomisasi produk selama mungkin dalam proses produksi",["Menunda pembayaran ke pemasok","Menunda peluncuran produk","Menghentikan produksi sementara"],"Membantu mass customization dan build-to-order.");
Q("7","Process chart: total waktu 40 menit, dengan 10 menit adalah operasi. Persentase waktu bernilai tambah?","25%",["10%","40%","75%"],"10 / 40 = 25%.");
Q("7","Computer-integrated manufacturing (CIM) mencakup...","CAD, mesin kendali numerik, dan penanganan material otomatis",["Hanya robot","Hanya sistem transaksi","Hanya barcode"],"CIM memadukan CAD, FMS, pengendalian persediaan, pergudangan, dan pengiriman.");
Q("7","Build-to-order (BTO) berarti...","Memproduksi menurut pesanan pelanggan, bukan ramalan",["Memproduksi untuk persediaan","Memproduksi massal lalu dikustomisasi gudang","Mengalihdayakan semua produksi"],"BTO menuntut desain produk dan proses, jadwal ketat, dan mitra responsif.");
Q("7","Jasa dengan intensitas tenaga kerja dan kustomisasi sama-sama tinggi disebut...","Professional service",["Service factory","Mass service","Service shop"],"Empat jenis: service factory, service shop, mass service, professional service.");

// Suplemen 7
Q("s7","Pabrik roti menghasilkan 148.000 dari design capacity 201.600. Utilization?","73,4%",["84,6%","85,7%","68,9%"],"148.000 / 201.600 = 0,734.");
Q("s7","Output aktual 148.000 dan effective capacity 175.000. Efficiency?","84,6%",["73,4%","79,4%","115%"],"148.000 / 175.000 = 0,846.");
Q("s7","Kapasitas sistem ditentukan oleh...","Bottleneck",["Stasiun tercepat","Throughput time","Throughput time ditambah waktu tunggu"],"Rantai sekuat mata rantai terlemah: stasiun terlambat membatasi seluruh output.");
Q("s7","Fixed cost $10.000, harga $4,00, biaya variabel $2,25 per unit. Break-even dalam unit?","5.714 unit",["2.500 unit","4.444 unit","10.000 unit"],"10.000 / (4,00 - 2,25) = 10.000 / 1,75 = 5.714.");
Q("s7","Dengan data yang sama, break-even dalam dolar?","Sekitar $22.857",["$10.000","Sekitar $17.500","Sekitar $40.000"],"10.000 / (1 - 2,25/4,00) = 10.000 / 0,4375 = 22.857.");
Q("s7","Alternatif dengan EMV tertinggi pada kasus Southern Hospital Supplies (peluang pasar baik 0,4) adalah...","Pabrik sedang ($18.000)",["Pabrik besar (-$14.000)","Pabrik kecil ($13.000)","Tidak melakukan apa pun ($0)"],"EMV besar = 0,4 x 100.000 + 0,6 x (-90.000) = -14.000; sedang 18.000; kecil 13.000.");
Q("s7","Penerimaan $7.000 per tahun selama 5 tahun, bunga 6%. Nilai sekarang mendekati...","$29.484",["$35.000","$24.000","$41.000"],"7.000 x 4,212 = 29.484 (faktor tabel anuitas 6%, 5 tahun).");
Q("s7","Dua jalur perakitan identik, stasiun pembungkus 37,5 detik per sandwich dan menjadi bottleneck. Kapasitas per jam?","96 sandwich",["90 sandwich","120 sandwich","180 sandwich"],"3.600 / 37,5 = 96.");
Q("s7","Strategi perluasan kapasitas yang menunda belanja modal adalah...","Lag dan straddle",["Hanya leading bertahap","Hanya leading sekali langkah","Tidak ada"],"Leading mengeluarkan modal lebih awal; lag dan straddle menunda.");
Q("s7","Dua mesin identik di satu stasiun, masing-masing 40 detik per unit. Waktu proses efektif stasiun?","20 detik per unit",["40 detik per unit","80 detik per unit","10 detik per unit"],"Operasi paralel n membuat waktu stasiun menjadi 1/n kali.");
Q("s7","Net present value lebih besar jika penerimaan kas terjadi...","Lebih awal",["Lebih lambat","Dalam satu jumlah di akhir","Tidak ada pengaruh waktu"],"Uang lebih awal didiskonto lebih sedikit.");
