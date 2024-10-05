# Membangun Bookshelf App

Proyek ini adalah submission akhir pada course **Belajar Membuat Front-End Web untuk Pemula** pada learning path **React** di [Dicoding](dicoding.com).

## Ketentuan Tugas

Untuk mempermudah penilaian submission yang dikirim, Anda perlu memahami ketentuan-ketentuan berikut dalam mengerjakan tugas ini.

- Anda **wajib menggunakan starter project** yang telah kami sediakan.
- Anda **dilarang mengedit atau menghapus atribut data-testid** pada elemen-elemen HTML tertentu.
- Ini masih berkaitan dengan poin sebelumnya. Jika Anda memiliki kebutuhan seperti styling elemen dan perlu menambahkan atribut seperti class, itu tidak dilarang selama atribut data-testid beserta nilainya tidak diubah atau dihapus.
- Dalam menampilkan data-data buku, Anda wajib memberikan beberapa atribut pada setiap elemennya.
  - **data-bookid**: menampung nilai ID masing-masing buku.
  - **data-testid**: penanda jenis data buku yang ditampilkan. Berikut daftarnya.
  - **bookItem**: elemen kontainer yang menampung data-data buku.
  - **bookItemTitle**: judul buku
  - **bookItemAuthor**: penulis buku
  - **bookItemYear**: tahun rilis buku
  - **bookItemIsCompleteButton**: tombol untuk mengubah kondisi buku dari “Belum selesai dibaca” menjadi “Selesai dibaca” atau sebaliknya.
  - **bookItemDeleteButton**: tombol untuk menghapus buku.

Agar pengerjaan tugas lebih mudah, Anda dapat mengikuti templat berikut untuk menampilkan setiap buku. Kode bercetak tebal adalah atribut elemen wajib yang harus hadir.

```html
<div data-bookid="123123123" data-testid="bookItem">
  <h3 data-testid="bookItemTitle">Judul Buku 1</h3>
  <p data-testid="bookItemAuthor">Penulis: Penulis Buku 1</p>
  <p data-testid="bookItemYear">Tahun: 2030</p>
  <div>
    <button data-testid="bookItemIsCompleteButton">Selesai dibaca</button>
    <button data-testid="bookItemDeleteButton">Hapus buku</button>
    <button data-testid="bookItemEditButton">Edit buku</button>
  </div>
</div>
```

## Kriteria Wajib

### 1. Gunakan localStorage sebagai Penyimpanan

- Data buku yang ditampilkan pada rak-rak harus dapat bertahan walaupun halaman web ditutup. Dengan begitu, Anda harus menyimpan data buku pada localStorage.
- Setiap buku harus berupa objek JavaScript yang membawa beberapa data berikut. Pastikan nama properti beserta tipe data value-nya juga sesuai.

Format objek beserta tipe data nilainya.

```js
{
  id: string | number,
  title: string,
  author: string,
  year: number,
  isComplete: boolean,
}
```

Berikut contoh implementasi data buku riilnya.

```json
{
  "id": 3657848524,
  "title": "Harry Potter and the Philosopher's Stone",
  "author": "J.K Rowling",
  "year": 1997,
  "isComplete": false
}
```

### 2. Mampu Menambahkan Buku

- Aplikasi harus mampu menyimpan buku baru menggunakan formulir yang telah disediakan dalam starter project.
- ID buku harus dihasilkan secara otomatis dan unik. Tipsnya, Anda dapat memanfaatkan timestamp sebagai nilainya. Nilai timestamp dapat diperoleh dengan kode **new Date().getTime()** atau **Number(new Date())**.
- Formulir setidaknya bisa menghasilkan empat data berikut.
  - title: judul buku.
  - author: penulis buku.
  - year: tahun rilis buku bertipe number.
  - isComplete: kondisi apakah sudah selesai dibaca atau belum.

### 3. Memiliki Dua Rak Buku

- Aplikasi wajib memiliki 2 Rak buku, yakni “Belum selesai dibaca” dan “Selesai dibaca”.
- Rak "Belum selesai dibaca" hanya menyimpan buku-buku dengan isComplete bernilai false.
- Rak "Selesai dibaca" hanya menyimpan buku-buku dengan isComplete bernilai true.

### 4. Dapat Memindahkan Buku Antar Rak

Buku-buku dalam rak harus dapat dipindahkan ke rak lainnya, baik "Belum selesai dibaca" maupun "Selesai dibaca". Pastikan perubahan ini juga tersimpan dalam localStorage.

### 5. Dapat Menghapus Data Buku

Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus. Selain menghilang dari halaman, data buku dalam localStorage juga harus terhapus.

## Kriteria Opsional

### 1. Menambahkan Fitur Pencarian Buku

Memiliki fitur pencarian buku yang telah disimpan dan ditampilkan pada rak sesuai dengan title buku yang dituliskan pada kolom pencarian.

### 2. Menambahkan Fitur Edit Buku

Selain dapat menambahkan baru, buku-buku yang telah tersimpan diharapkan dapat diedit.

### 3. Kode Ditulis Secara Rapi dan Bersih

Berikut beberapa indikator yang dapat dicapai agar Anda dapat menulis kode dengan rapi dan bersih.

- Bersihkan comment dan kode jika tidak digunakan.
- Menggunakan indentasi yang sesuai dan konsisten.
- Menggunakan penamaan unit (variabel dan function) sesuai dengan maknanya, baik isi nilainya ataupun tugasnya.

### 4. Menerapkan Styling

Dalam starter project, kami hanya memberikan HTML dan JavaScript. Silakan Anda berkreasi dengan CSS untuk menciptakan tampilan yang ciamik. Namun, pastikan tetap memenuhi ketentuan HTML yang ada, ya.

## Referensi

https://bookshelfappsdicoding.netlify.app/

## Penilaian

- &starf;:
  Hanya memenuhi kriteria wajib, tetapi terindikasi plagiat seperti menggunakan proyek orang lain dan hanya mengubah kontennya saja.

- &starf;&starf;:
  Hanya memenuhi kriteria wajib, tetapi tidak lebih baik dari latihan yang diberikan.

- &starf;&starf;&starf;:
  Hanya memenuhi kriteria wajib.

- &starf;&starf;&starf;&starf;:
  Semua kriteria wajib terpenuhi dan menerapkan minimal dua kriteria opsional di atas.

- &starf;&starf;&starf;&starf;&starf;:
  Semua kriteria wajib terpenuhi dan menerapkan minimal tiga kriteria opsional di atas.

## Ketentuan Submission yang Akan Ditolak

- Ada kriteria wajib yang tidak terpenuhi.
- Ketentuan berkas submission tidak terpenuhi.
- Memanfaatkan libraries/frameworks (JQuery, React, dsb.) untuk memudahkan proses manipulasi DOM. Anda wajib melakukannya secara mandiri/native.
- Mengirimkan kode JavaScript yang telah dikecilkan atau di-minify sehingga sulit dibaca.
