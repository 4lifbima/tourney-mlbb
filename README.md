# MLBB Tournament - Website Pendaftaran Turnamen Mobile Legends

Website pendaftaran turnamen Mobile Legends: Bang Bang yang modern, mewah, dan fully responsive.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Icons**: Iconify
- **Forms**: React Hook Form + Zod
- **Notifications**: React Hot Toast

## 🎨 Features

### Public Page
- ✅ Landing page modern dan responsive
- ✅ Hero section dengan statistik
- ✅ Informasi turnamen
- ✅ Prize pool breakdown
- ✅ Syarat & ketentuan
- ✅ Cara daftar (timeline)
- ✅ Form pendaftaran tim dengan anggota dinamis
- ✅ FAQ accordion
- ✅ Dark navbar dengan mobile menu

### Admin Dashboard
- ✅ Authentication dengan NextAuth
- ✅ Dashboard dengan statistik real-time
- ✅ Grafik batang, pie, dan line charts
- ✅ Manajemen turnamen (CRUD)
- ✅ Manajemen pendaftar dengan filter & search
- ✅ Export data ke CSV
- ✅ Detail tim dengan modal
- ✅ Responsive sidebar navigation

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon atau local)
- npm atau yarn

## 🛠️ Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd website-mobilegends
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` dengan konfigurasi database Anda:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mlbb_tournament?schema=public"
   NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

5. **Push database schema**
   ```bash
   npm run db:push
   ```

6. **Seed database (optional)**
   ```bash
   npm run db:seed
   ```
   
   Ini akan membuat:
   - Admin user (email: admin@mlbb.com, password: admin123)
   - Sample tournament
   - Sample teams

7. **Run development server**
   ```bash
   npm run dev
   ```

8. **Open browser**
   - Homepage: http://localhost:3000
   - Admin Login: http://localhost:3000/admin/login

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/
│   │   ├── (public)/      # Public pages
│   │   │   ├── page.tsx   # Landing page
│   │   │   └── layout.tsx
│   │   ├── (admin)/       # Admin pages
│   │   │   └── admin/
│   │   │       ├── dashboard/
│   │   │       ├── tournaments/
│   │   │       ├── registrants/
│   │   │       └── layout.tsx
│   │   ├── api/
│   │   │   └── auth/      # NextAuth API
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── public/        # Public components
│   │   └── admin/         # Admin components
│   └── lib/
│       ├── prisma.ts      # Prisma client
│       ├── auth.ts        # Auth utilities
│       ├── actions.ts     # Server actions
│       └── validations.ts # Zod schemas
└── package.json
```

## 🎯 Database Schema

### Tournament
- id, name, description, startDate, endDate, slot, prizePool, status

### Team
- id, teamName, captainName, email, phone, rankScreenshot, status, tournamentId

### Member
- id, name, inGameName, role, teamId

### Admin
- id, email, password, name, role

## 🔐 Default Admin Credentials

```
Email: admin@mlbb.com
Password: admin123
```

⚠️ **PENTING**: Ganti password ini setelah deployment!

## 🎨 Color Scheme

- **Primary**: `#b30e05` (Red)
- **Gold**: `#FFD700`
- **Silver**: `#C0C0C0`
- **Bronze**: `#CD7F32`

## 📱 Responsive Design

Website ini fully responsive dan mobile-first:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## 📦 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Database Setup (Neon)

1. Buat account di [Neon](https://neon.tech)
2. Buat project baru
3. Copy connection string ke `DATABASE_URL`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Alif Bima Pradana - Fullstack Developer & Mobile Developer

## 🙏 Acknowledgments

- Next.js Team
- Vercel
- Prisma
- Tailwind CSS
- Iconify
- Recharts

---

Made with ❤️ for MLBB Community
