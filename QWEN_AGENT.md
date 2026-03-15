## 🎯 **PROMPT LENGKAP: WEBSITE PENDAFTARAN TURNAMEN MOBILE LEGENDS**



### 1. **PROJECT OVERVIEW**

Buatkan website pendaftaran turnamen **Mobile Legends: Bang Bang** dengan spesifikasi berikut:

- **Framework**: Next.js 16 (App Router)

- **Styling**: Tailwind CSS

- **Database**: Neon PostgreSQL

- **ORM**: Prisma

- **Font**: Jakarta Sans (dari Google Fonts)

- **Icons**: Iconify (jangan pakai emoji sama sekali)

- **Warna Primary**: `#b30e05`

- **Warna Base/Putih**: `#ffffff`



---



### 2. **HALAMAN LANDING PAGE (PUBLIC)**

Buat landing page dengan desain modern, mewah, elegant, dan fully responsive. Komponen yang harus ada:



**A. NAVBAR**

- Logo "MLBB Tournament" (text dengan warna primary)

- Menu: Home, Turnamen, Cara Daftar, Kontak

- Button "Daftar Sekarang" (bg-primary text-white)

- Mobile responsive dengan hamburger menu



**B. HERO SECTION**

- Background dengan efek gradient atau gambar stadium esports

- Headline: "**Battle for Glory** di Turnamen Mobile Legends Terbesar"

- Subheadline: "Buktikan kamu yang terbaik! Raih hadiah jutaan rupiah dan gelar juara"

- CTA Button: "Daftar Tim Sekarang" (bg-primary)

- Statistik: "128+ Tim Terdaftar", "Rp 10 Juta Prize Pool", "8 Slot Tersisa"



**C. ABOUT TOURNAMENT**

- Info turnamen: tanggal, sistem kompetisi, prize pool breakdown

- Desain dengan card-grid modern



**D. HADIAH (PRIZE POOL)**

- Juara 1, 2, 3 dengan desain mewah

- Iconify icons: trophy, medal, cash



**E. SYARAT & KETENTUAN**

- List dengan icon checklist (Iconify)

- Minimal rank, jumlah pemain, dll



**F. CARA DAFTAR**

- Step-by-step dengan icon

- Desain timeline horizontal di desktop, vertical di mobile



**G. FORM PENDAFTARAN TIM**

- Fields:

  - Nama Tim (text)

  - Nama Kapten (text)

  - Email (email)

  - No. WhatsApp (tel)

  - Upload Screenshot Rank (file)

  - Daftar Anggota (bisa ditambah dinamis)

  - Checkbox setuju syarat & ketentuan

- Tombol "Kirim Pendaftaran" (bg-primary)



**H. FAQ SECTION**

- Accordion dengan pertanyaan umum



**I. FOOTER**

- Links, sosial media (Iconify), copyright



---



### 3. **DASHBOARD ADMIN**



**A. SIDEBAR NAVIGATION**

- Iconify icons untuk setiap menu

- Menu: Dashboard, Turnamen, Pendaftar, Settings, Logout



**B. DASHBOARD STATISTIK & GRAFIK**

- **Cards Statistik**:

  - Total Pendaftar

  - Tim Pending

  - Tim Diterima

  - Tim Ditolak

  - Slot Tersisa

  - Total Turnamen



- **Grafik dengan Chart.js atau Recharts**:

  1. **Grafik Batang**: Pendaftar per hari/minggu

  2. **Grafik Pie**: Status pendaftar (Pending, Accepted, Rejected)

  3. **Grafik Line**: Pertumbuhan pendaftar dari waktu ke waktu



**C. MANAJEMEN TURNAMEN**

- List turnamen (nama, tanggal, slot, status)

- Tombol: Tambah Turnamen, Edit, Hapus

- Form tambah/edit turnamen (modal)



**D. MANAJEMEN PENDAFTAR**

- Tabel dengan data:

  - No, Nama Tim, Kapten, Kontak, Status, Aksi

- Filter: Semua, Pending, Accepted, Rejected

- Search by nama tim/kapten

- Aksi: Terima, Tolak, Detail, Hapus

- Export ke CSV



**E. DETAIL PENDAFTAR**

- Modal dengan info lengkap tim + anggota

- Tombol aksi terima/tolak



---



### 4. **DATABASE SCHEMA (NEON POSTGRESQL)**



**Tabel: Tournament**

- id (String, default uuid)

- name (String)

- description (Text)

- startDate (DateTime)

- endDate (DateTime)

- slot (Int)

- prizePool (String)

- status (Enum: DRAFT, OPEN, CLOSED, ONGOING, COMPLETED)

- createdAt (DateTime)



**Tabel: Team**

- id (String, uuid)

- teamName (String)

- captainName (String)

- email (String)

- phone (String)

- rankScreenshot (String) // URL

- status (Enum: PENDING, ACCEPTED, REJECTED)

- tournamentId (Relation to Tournament)

- createdAt (DateTime)



**Tabel: Member**

- id (String, uuid)

- name (String)

- inGameName (String)

- role (String)

- teamId (Relation to Team)

- createdAt (DateTime)



**Tabel: Admin**

- id (String, uuid)

- email (String, unique)

- password (Hash)

- name (String)

- role (Enum: SUPER_ADMIN, ADMIN)



---



### 5. **FITUR TAMBAHAN**

- Authentication untuk Admin (NextAuth.js)

- Upload file ke Supabase Storage / Cloudinary

- Real-time update dengan Server Actions

- Loading state dengan skeleton

- Toast notification (success, error)

- Dark mode toggle opsional

- SEO Friendly dengan metadata



---



### 6. **TEKNOLOGI SPESIFIK**

```json

{

  "dependencies": {

    "next": "16.x",

    "react": "latest",

    "tailwindcss": "latest",

    "@prisma/client": "latest",

    "@iconify/react": "latest",

    "recharts": "latest",

    "next-auth": "latest",

    "react-hook-form": "latest",

    "zod": "latest",

    "react-hot-toast": "latest",

    "@headlessui/react": "latest"

  }

}

```



---



### 7. **DESAIN NOTES**

- **Typography**: Font Jakarta Sans, weight 400, 500, 600, 700

- **Spacing**: Consistent padding/margin

- **Border Radius**: 12px untuk card, 8px untuk button

- **Shadow**: Soft shadow untuk card

- **Animasi**: Hover effects, fade-in

- **Warna**:

  - Primary: `#b30e05`

  - Primary Hover: lebih gelap 10%

  - Background: putih

  - Text: gray-800/900

  - Accent: gold/silver untuk prize



---



### 8. **STRUKTUR FOLDER**

```

├── app/

│   ├── (public)/

│   │   ├── page.tsx (landing)

│   │   ├── daftar/

│   │   └── layout.tsx

│   ├── (admin)/

│   │   ├── admin/

│   │   │   ├── dashboard/

│   │   │   ├── tournaments/

│   │   │   ├── registrants/

│   │   │   └── layout.tsx

│   ├── api/

│   │   ├── auth/

│   │   └── ...

│   └── layout.tsx

├── components/

├── lib/

├── prisma/

└── public/

```



---



### 9. **INSTRUKSI TAMBAHAN**

- **JANGAN** gunakan emoji sama sekali, semua icon dari Iconify

- Pastikan **responsif** di semua device (mobile first)

- Gunakan **Server Components** sebisa mungkin, Client Components hanya untuk interaktivitas

- Implementasi **loading UI** dan **error boundary**

- Kode harus clean, reusable components

- Gunakan TypeScript untuk type safety