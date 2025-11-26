# نُزُهَه (Nuzha) - Saudi Wildlife Reserves Management Platform

A full-stack MVP web application for managing access to Saudi Arabia's protected areas (المحميات الطبيعية).

## Features

- **Protected Areas Map**: Browse and explore Saudi wildlife reserves with zone information
- **Permit Management**: Request permits for visiting (تنزه) or grazing (رعي) in protected areas
- **Environmental Reports**: Submit environmental reports (بلاغات بيئية) with GPS coordinates
- **My Trips**: Track and view all submitted permits and their status
- **Arabic RTL Support**: Full right-to-left layout with Arabic language support
- **Responsive Design**: Mobile-first design with desert-themed UI

## Project Structure

\`\`\`
نُزُهَه/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── protected-areas/      # Protected areas API
│   │   ├── permits/              # Permits API
│   │   └── reports/              # Reports API
│   ├── page.tsx                  # Login page
│   ├── dashboard/page.tsx        # Main dashboard
│   ├── map/page.tsx              # Protected areas list
│   ├── permits/
│   │   ├── page.tsx              # My permits
│   │   ├── new/page.tsx          # Create new permit
│   │   └── [id]/page.tsx         # Permit detail
│   ├── reports/
│   │   └── new/page.tsx          # Submit environmental report
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── saudi-map.tsx             # Saudi Arabia map component
│   ├── desert-landscape.tsx      # Desert landscape SVG
│   └── login-form.tsx            # Login form component
├── prisma/
│   └── schema.prisma             # Database schema
├── lib/
│   ├── auth.ts                   # Authentication utilities
│   └── utils.ts                  # Utility functions
└── package.json

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Language**: Arabic-first with RTL support

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Git

### Installation

1. **Clone the repository** (if using git):
\`\`\`bash
git clone <repository-url>
cd nuzha
\`\`\`

2. **Install dependencies**:
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. **Set up environment variables**:
\`\`\`bash
cp .env.example .env.local
\`\`\`

The `.env.local` file should contain:
\`\`\`
DATABASE_URL="file:./prisma/dev.db"
\`\`\`

4. **Generate Prisma client**:
\`\`\`bash
npm run prisma:generate
\`\`\`

5. **Create database and run migrations**:
\`\`\`bash
npm run prisma:migrate
\`\`\`

This will:
- Create the SQLite database
- Run migrations
- Seed demo protected areas data

### Running the Development Server

\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Data Flow

### 1. Login Flow
- User visits the landing page (`/`)
- Clicks "تسجيل الدخول"
- Gets redirected to dashboard (`/dashboard`)
- User info stored in localStorage for session persistence

### 2. Permit Request Flow
- User clicks "إصدار تصريح" from dashboard
- Fills form on `/permits/new` with:
  - Permit type (تنزه/رعي)
  - Protected area selection
  - Visit date
  - Duration (optional)
  - Livestock count (if grazing)
- Submits → POST `/api/permits`
- Redirected to `/permits` to view submitted permits

### 3. Protected Areas Browse
- User clicks "الخريطة التفاعلية للمحميات"
- Views list of areas with zone information:
  - Green (مسموح): Allowed
  - Yellow (مشروط): Conditional
  - Red (ممنوع): Prohibited

### 4. Environmental Report
- User clicks "بلاغ بيئي"
- Fills report form with:
  - Description of issue
  - Optional GPS coordinates
- Submits → POST `/api/reports`
- Success message and redirect to dashboard

## API Endpoints

### Protected Areas
- `GET /api/protected-areas` - List all protected areas (auto-seeds demo data)

### Permits
- `GET /api/permits` - List all permits
- `GET /api/permits?userId=<id>` - Filter permits by user
- `POST /api/permits` - Create new permit
- `GET /api/permits/[id]` - Get permit details

### Reports
- `GET /api/reports` - List all environmental reports
- `POST /api/reports` - Submit new report

## Database Schema

### User
- id, fullName, nationalId, phone, createdAt
- Relations: permits, reports

### ProtectedArea
- id, name, region, zoneType (GREEN/YELLOW/RED), description, createdAt
- Relations: permits, reports

### Permit
- id, userId, protectedAreaId, type (VISIT/GRAZING)
- visitDate, durationHours, livestockCount, status (PENDING/APPROVED/REJECTED)
- qrCode (unique identifier), createdAt

### Report
- id, userId, protectedAreaId (optional), lat, lng
- description, imageUrl (placeholder), status (NEW/IN_PROGRESS/CLOSED), createdAt

## Demo Data

The app automatically seeds these protected areas on first run:
- محمية الطبيق (Riyadh) - GREEN zone
- محمية الوعول (Eastern) - YELLOW zone
- محمية أم الرمة (Qassim) - GREEN zone
- محمية رجم الحمى (Al-Jouf) - RED zone
- محمية جزر فرسان (Jazan) - YELLOW zone

## Authentication

**Note**: This MVP uses mock authentication:
- A demo user is created/loaded automatically
- User info stored in browser localStorage
- No real OAuth/Nufadh integration (can be added later)

To add real Nufadh integration:
1. Register with Saudi NCPD for Nufadh credentials
2. Implement OAuth flow in `lib/auth.ts`
3. Update login form in `components/login-form.tsx`

## Styling & Design

- **Colors**: Desert theme (creamy background #F5EFE1, dark green primary #234F36)
- **Typography**: Tailwind CSS with Arabic font support
- **Layout**: Mobile-first, responsive flexbox-based design
- **RTL**: All pages support right-to-left reading direction

## Future Enhancements

- Real Nufadh OAuth integration
- QR code generation and scanning
- Image upload for environmental reports
- Admin dashboard for permit management
- Real-time permit status tracking
- Email notifications
- Payment integration for premium features
- Advanced map with real geographical data

## Testing

Currently, the app works with:
- Mock user data (demo-user)
- Demo protected areas
- In-memory permit storage (database persists in SQLite)

For testing:
1. Start the dev server
2. Click "تسجيل الدخول"
3. Create test permits and reports
4. Data persists in SQLite

## Troubleshooting

### Database Issues
\`\`\`bash
# Reset database
rm prisma/dev.db
npm run prisma:migrate
\`\`\`

### Prisma Generation Issues
\`\`\`bash
npm run prisma:generate
\`\`\`

### Port Already in Use
\`\`\`bash
# Use different port
npm run dev -- -p 3001
\`\`\`

## Contributing

This is an MVP project. Contributions are welcome!

## License

MIT License - feel free to use this for your project.

---

**نُزُهَه** - Explore Saudi Arabia's Protected Areas Responsibly
