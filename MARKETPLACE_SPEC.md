# DELALA MARKETPLACE — PRODUCT SPECIFICATION & ENGINEERING BLUEPRINT

**Document Version:** 1.0.0  
**Target Application:** Delala Marketplace (`apps/marketplace/` & `product-website/`)  
**Backend API:** NestJS + Prisma ORM + Supabase PostgreSQL (`services/api/`)  
**Shared Packages:** `@delala/ui`, `@delala/theme`, `@delala/types`, `@delala/config`, `@delala/utils`  
**Author:** Product Management, Solution Architecture & Engineering Leads  

---

## 1. Product Vision

### What Delala Marketplace Is
Delala Marketplace is Ethiopia’s premier, utility-first digital real estate discovery platform. It serves as a unified marketplace connecting home seekers, property owners, and certified local brokers ("Delala") across major urban centers in Ethiopia (Addis Ababa, Hawassa, Adama, Bahir Dar).

### Why It Exists
Finding housing in Ethiopia is severely inefficient and fragmented. Current real estate discovery relies on unstructured Telegram channels, informal Facebook posts, fragmented broker networks, physical street banners, and word-of-mouth. This fragmentation leads to high search friction, price opacity, lack of verification, commission gouging, and frequent rental scams.

### The Problem It Solves
1. **Centralized Discovery**: Aggregates verified residential villas, apartments, serviced studios, G+1 compounds, and commercial spaces into a single searchable engine.
2. **Verified Infrastructure Transparency**: Exposes critical Ethiopian infrastructure parameters for every listing—specifically **Standby Generator capacity (kVA)**, **Reserve Water Tank volume (Litters)**, **24/7 Perimeter Security**, and **Dedicated Parking**.
3. **Verified Broker & Owner Identity**: Replaces anonymous Telegram handles with certified broker license numbers (`ETH-RE-XXXX`), agency credentials, user ratings, and audited field agent reports.
4. **Scam Prevention & Trust**: Requires field-agent verification before listing approval, enforcing standardized rental agreements and transparent pricing.

### Long-Term Vision
To become the single operating system for African real estate—powering digital title verification, smart lease contracts, digital rent escrow payments, AI-driven neighborhood valuation models, and cross-border diaspora home investments.

### MVP Vision
Deliver a fast, high-utility marketplace web app (Next.js 15 App Router, React 19, Tailwind CSS) backed by a robust NestJS API (`/api/v1`) and Supabase PostgreSQL. The MVP allows home seekers to filter verified properties in under 5 seconds, inspect rich photo galleries and infrastructure badges, save wishlists, contact brokers directly, and schedule physical walkthrough appointments.

---

## 2. Product Goals & Measurable KPIs

| Goal Area | Target Metric / KPI | Benchmark / Objective |
| :--- | :--- | :--- |
| **Discovery Speed** | Average Search-to-Match Time | Reduce average home discovery time from **3 weeks** down to **< 5 minutes**. |
| **Listing Verification** | Verified Listing Ratio | Enforce **100% field agent audit** for all published properties. Zero unverified listings. |
| **User Trust & Safety** | Scam Incident Rate | Keep scam/discrepancy reports below **< 0.1%** of total platform interactions. |
| **Walkthrough Conversions** | Visit Request Completion Rate | Achieve **> 35% conversion** from walkthrough request to completed physical visit. |
| **Platform Growth** | Monthly Active Brokers | Onboard **500+ verified brokers** across Addis Ababa sub-cities within 6 months. |
| **Performance Benchmark** | Core Web Vitals (LCP / CLS) | Maintain **LCP < 1.2s** and **CLS < 0.05** across all desktop and mobile viewports. |

---

## 3. User Personas

### Persona A: The Home Seeker ("Selam")
- **Profile**: 29-year-old Senior Software Engineer / NGO Specialist moving to Addis Ababa (Bole sub-city).
- **Goals**: Find a safe 2-bedroom furnished apartment with a standby generator and continuous water supply.
- **Pain Points**: Waste of weekend hours touring properties that turn out to have no generator or false rental prices advertised by unverified brokers on Telegram.
- **Technical Experience**: High tech-literacy, uses smartphone & laptop daily, expects instant filtering and responsive mobile web UI.
- **User Journey**: Arrives on Marketplace -> Enters Bole sub-city & Generator filter -> Inspects verified photo gallery -> Schedules walkthrough appointment -> Receives SMS confirmation from certified broker.

### Persona B: The Property Owner ("Ato Kassahun")
- **Profile**: 58-year-old property investor owning a newly built G+1 residential compound in Old Airport.
- **Goals**: Secure reliable, long-term tenants (expats, embassy staff, corporates) with zero rental defaults.
- **Pain Points**: Dealing with unvetted brokers who post unauthorized photos of his compound with inflated prices.
- **Technical Experience**: Moderate tech-literacy, prefers simple forms or assigning a certified agency.
- **User Journey**: Log in -> Create Listing -> Fill location, amenities, and generator specs -> Submit for Admin/Field Agent review -> Track approval status -> Review tenant walkthrough requests.

### Persona C: The Certified Broker ("Abebe")
- **Profile**: 36-year-old licensed real estate agent at Bole Premier Real Estate.
- **Goals**: Manage 20+ active listings, build professional reputation, and close rental contracts faster.
- **Pain Points**: Managing inquiries across multiple phone calls, lost lead details, and lack of license verification to differentiate from non-certified street brokers.
- **Technical Experience**: High mobile literacy, uses WhatsApp/Telegram, manages listings on laptop/tablet.
- **User Journey**: Register -> Submit agency license `ETH-RE-2024-0091` -> Receive Verified Badge -> Publish listings -> Receive instant walkthrough visit alerts -> Manage client appointments.

### Persona D: The Platform Moderator ("Bethlehem")
- **Profile**: 26-year-old Operations Specialist at Delala HQ.
- **Goals**: Audit submitted listings, verify field agent inspection notes, resolve user price flags.
- **Pain Points**: Sorting through incomplete listing submissions or price discrepancies.
- **Technical Experience**: Expert web dashboard user.
- **User Journey**: Open Admin Dashboard -> Review Pending Queue -> Verify generator kVA and water tank photos -> Approve or Reject with reason -> Issue verification badges.

### Persona E: The System Admin ("SuperAdmin")
- **Profile**: Lead Platform Lead / Architect.
- **Goals**: Monitor system health, manage role permissions, oversee platform growth analytics.
- **Pain Points**: Ensuring strict API role enforcement and audit compliance.
- **Technical Experience**: Developer / Administrator.
- **User Journey**: Monitor overview metrics -> Review audit trail -> Adjust role permissions (`USER` -> `BROKER` -> `MODERATOR`).

---

## 4. User Stories

### Home Seeker Stories
- **US-1.1**: *As a home seeker*, I want to search properties by city, sub-city, budget range (ETB/month), and property type so that I can find homes within my target location and budget.
- **US-1.2**: *As a home seeker*, I want to filter listings by essential infrastructure (standby generator, reserve water tank, parking, 24/7 security) so that I don't waste time on unserviced properties.
- **US-1.3**: *As a home seeker*, I want to inspect high-resolution photo galleries and verified agent audit notes so that I can trust the listing authenticity.
- **US-1.4**: *As a home seeker*, I want to schedule a physical walkthrough visit directly with a verified broker so that I can secure a viewing time without phone tag.
- **US-1.5**: *As a home seeker*, I want to save properties to my wishlist so that I can compare them later across devices.

### Broker & Owner Stories
- **US-2.1**: *As a certified broker*, I want to showcase my government license number and verified badge on my listings so that home seekers trust my agency.
- **US-2.2**: *As an owner/broker*, I want to submit property details, upload photos, and set generator/water specs so that field agents can audit and approve my listing.
- **US-2.3**: *As a broker*, I want to receive organized walkthrough booking notifications with seeker contact info so that I can close deals efficiently.

### Admin & Moderator Stories
- **US-3.1**: *As a moderator*, I want to review pending listings in a dedicated queue and approve or reject them with feedback so that only verified homes are published.
- **US-3.2**: *As an admin*, I want to inspect platform security audit logs and user role assignments so that platform integrity is maintained.

---

## 5. User Flows

### Flow 1: Property Search & Walkthrough Booking
```
[Home Seeker] 
   │
   ├─► 1. Lands on Marketplace Home Page (product-website/)
   ├─► 2. Clicks Search Capsule -> Selects City: "Addis Ababa", Sub-City: "Bole", Type: "Villa"
   ├─► 3. Toggles Filters: [x] Standby Generator, [x] Reserve Water Tank
   ├─► 4. Views Split Search Page (Listing Grid + Map Markers)
   ├─► 5. Clicks Property Card -> Views Details (/property/bole-medhanialem-luxury-residence)
   ├─► 6. Inspects Infrastructure Badges & Photo Gallery
   ├─► 7. Clicks "Schedule Walkthrough Visit" -> Opens Modal
   ├─► 8. Selects Preferred Date & Time -> Submits Contact Info
   └─► 9. Receives Confirmation Screen & SMS Alert sent to Broker
```

### Flow 2: Property Publishing & Approval Workflow
```
[Broker / Owner] 
   │
   ├─► 1. Logs in via Better Auth -> Navigates to /publish
   ├─► 2. Step 1: Basic Info (Title, Type, Rent ETB, Location)
   ├─► 3. Step 2: Infrastructure Specs (Generator kVA, Water Tank Liters, Security)
   ├─► 4. Step 3: Upload High-Res Gallery Images
   ├─► 5. Step 4: Preview & Submit -> Status set to PENDING_APPROVAL
   │
[Field Agent & Moderator]
   │
   ├─► 6. Field Agent audits physical property & adds notes
   ├─► 7. Moderator opens Admin Dashboard (/approvals)
   ├─► 8. Reviews photos, title deed, and agent audit notes
   └─► 9. Clicks "Approve & Publish" -> Listing status updated to APPROVED -> Live on Marketplace
```

---

## 6. Information Architecture (Sitemap)

```
Delala Marketplace App (app/)
│
├── /                            # Marketplace Home (Hero Search Capsule, Featured Categories, Cities Grid)
├── /search                      # Search & Discovery (Split Grid/Map View, Filter Drawer, Price Range)
├── /property/[slug]             # Property Details (Photo Gallery, Specs, Infrastructure, Broker Card, Schedule Modal)
├── /cities                      # Cities Overview (Addis Ababa, Hawassa, Adama, Bahir Dar)
├── /cities/[city]               # City Detail & Sub-City Neighborhood Breakdown
├── /neighborhoods/[slug]        # Neighborhood Guide (Security score, generator penetration, water reliability)
├── /brokers                     # Certified Brokers Directory & Agency Search
├── /brokers/[slug]              # Broker Public Profile (License #, Rating, Active Listings)
├── /favorites                   # Saved Wishlist Homes
├── /messages                    # Conversation List & Realtime Seeker-Broker Chat
├── /notifications               # System Alerts, Visit Confirmations, Price Drop Alerts
├── /profile                     # User Account Profile & Contact Info
├── /settings                    # Account Preferences & Notification Settings
├── /publish                     # Multi-Step Property Listing Creation Wizard
├── /my-listings                 # Broker/Owner Dashboard (Manage active, pending, archived listings)
├── /edit-listing/[id]           # Edit Existing Property Listing
└── /help                        # Marketplace Support, FAQ & Verification Guidelines
```

---

## 7. Navigation System

### Navigation Types & Behavior

1. **Desktop Topbar (Sticky Header)**:
   - **Logo**: Delala brand logomark (links to `/`).
   - **Center Navigation**: Cities (`/cities`), Brokers (`/brokers`), Search (`/search`).
   - **Search Capsule**: Floating rounded capsule with quick inputs for "Where", "Type", and "Search" button.
   - **Right Actions**:
     - *Guest*: "List Property" button -> Login / Register trigger.
     - *Authenticated User/Broker*: Heart Wishlist Icon (`/favorites`), Messages Icon (`/messages`), Notifications Bell (`/notifications`), User Avatar Menu.

2. **Avatar Dropdown Menu**:
   - Seeker Profile (`/profile`)
   - Saved Wishlist (`/favorites`)
   - My Listings (`/my-listings`) [Owners / Brokers]
   - Admin Dashboard (`/admin`) [Moderators / Admins]
   - Account Settings (`/settings`)
   - Sign Out

3. **Mobile Bottom Navigation Bar (Fixed for Mobile Viewports)**:
   - `Search` (Icon: Search -> `/search`)
   - `Favorites` (Icon: Heart -> `/favorites`)
   - `Listings` (Icon: Building -> `/my-listings`)
   - `Messages` (Icon: MessageSquare -> `/messages`)
   - `Profile` (Icon: User -> `/profile`)

---

## 8. Authentication System (Better Auth)

### Architecture Specification
- **Engine**: Better Auth integrated with Supabase PostgreSQL and NestJS JWT Auth.
- **Session Management**: Secure HttpOnly cookies for web client + Bearer JWT tokens for NestJS API endpoints.
- **Protected Route Middleware (`middleware.ts`)**:
  - Unauthenticated users accessing `/publish`, `/my-listings`, `/favorites`, `/messages` are redirected to `/login?callbackUrl=...`.
  - Non-admin users accessing `/admin` routes receive a `403 Forbidden` response.
- **Role Assignment**: User registration defaults to `USER`. Broker registration requires entering government agency license `ETH-RE-XXXX` for verification.
- **OAuth Integration**: Google & Apple sign-in buttons enabled on authentication modals.

---

## 9. Roles & Permissions (RBAC Matrix)

| Permission / Capability | Guest | User (Seeker) | Owner | Broker | Moderator | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Browse / Search Listings** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Inspect Details & Maps** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Save Wishlist Favorites** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Schedule Walkthrough Visit** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Publish Property Listing** | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Edit Own Listings** | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Approve / Reject Listings** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Toggle Broker Verification** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Assign User Platform Roles** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Access Security Audit Logs** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 10. Database Planning (Prisma ORM & Supabase PostgreSQL)

### Data Schema Models

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl= env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  GUEST
  USER
  OWNER
  BROKER
  MODERATOR
  ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
}

enum PropertyStatus {
  PENDING_APPROVAL
  APPROVED
  REJECTED
  ARCHIVED
}

enum VisitStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

enum ReportStatus {
  PENDING
  RESOLVED
  DISMISSED
}

model User {
  id          String     @id @default(uuid())
  email       String     @unique
  role        UserRole   @default(USER)
  status      UserStatus @default(ACTIVE)
  supabaseUid String     @unique
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  profile     Profile?
  broker      Broker?
  favorites   Favorite[]
  reviews     Review[]
  visits      Visit[]     @relation("SeekerVisits")
  reports     Report[]    @relation("ReporterReports")
  auditLogs   AuditLog[]

  @@map("users")
}

model Profile {
  id          String   @id @default(uuid())
  userId      String   @unique
  fullName    String
  avatarUrl   String?
  phone       String?
  bio         String?
  languages   String[] @default(["Amharic", "English"])
  verified    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profiles")
}

model City {
  id               String         @id @default(uuid())
  slug             String         @unique
  name             String
  tagline          String
  startingRentETB  Int
  propertiesCount  Int            @default(0)
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt

  neighborhoods    Neighborhood[]
  properties       Property[]

  @@map("cities")
}

model Neighborhood {
  id                   String     @id @default(uuid())
  slug                 String     @unique
  name                 String
  subCity              String
  cityId               String
  securityScore        Float
  generatorPenetration String
  waterReliability     String
  averageRentETB       Int
  createdAt            DateTime   @default(now())
  updatedAt            DateTime   @updatedAt

  city                 City       @relation(fields: [cityId], references: [id], onDelete: Cascade)
  properties           Property[]

  @@index([cityId, subCity])
  @@map("neighborhoods")
}

model Broker {
  id               String     @id @default(uuid())
  slug             String     @unique
  userId           String     @unique
  agencyName       String
  licenseNumber    String     @unique
  verified         Boolean    @default(false)
  rating           Float      @default(5.0)
  reviewsCount     Int        @default(0)
  responseTime     String     @default("Under 15 minutes")
  specializedAreas String[]
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt

  user             User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  properties       Property[]
  reviews          Review[]
  visits           Visit[]

  @@map("brokers")
}

model Property {
  id              String         @id @default(uuid())
  slug            String         @unique
  title           String
  description     String
  propertyType    String
  rentETB         Int
  cityId          String
  neighborhoodId  String
  bedrooms        Int
  bathrooms       Float
  areaSqm         Int
  generator       Boolean        @default(false)
  waterTank       Boolean        @default(false)
  parking         Boolean        @default(false)
  furnished       Boolean        @default(false)
  securityGuard   Boolean        @default(false)
  balcony         Boolean        @default(false)
  status          PropertyStatus @default(PENDING_APPROVAL)
  rejectionReason String?
  fieldAgentNotes String?
  brokerId        String
  ownerId         String?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  city            City           @relation(fields: [cityId], references: [id])
  neighborhood    Neighborhood   @relation(fields: [neighborhoodId], references: [id])
  broker          Broker         @relation(fields: [brokerId], references: [id])
  images          PropertyImage[]
  favorites       Favorite[]
  reviews         Review[]
  visits          Visit[]
  reports         Report[]

  @@index([status, cityId, rentETB])
  @@map("properties")
}

model PropertyImage {
  id           String   @id @default(uuid())
  propertyId   String
  url          String
  displayOrder Int      @default(0)
  isHero       Boolean  @default(false)

  property     Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@map("property_images")
}

model Favorite {
  id         String   @id @default(uuid())
  userId     String
  propertyId String
  createdAt  DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@unique([userId, propertyId])
  @@map("favorites")
}

model Visit {
  id            String      @id @default(uuid())
  propertyId    String
  seekerId      String
  brokerId      String
  scheduledDate String
  timeSlot      String
  status        VisitStatus @default(PENDING)
  createdAt     DateTime    @default(now())

  property      Property    @relation(fields: [propertyId], references: [id])
  seeker        User        @relation("SeekerVisits", fields: [seekerId], references: [id])
  broker        Broker      @relation(fields: [brokerId], references: [id])

  @@map("visits")
}

model Report {
  id          String       @id @default(uuid())
  reporterId  String
  propertyId  String?
  reason      String
  status      ReportStatus @default(PENDING)
  createdAt   DateTime     @default(now())

  reporter    User         @relation("ReporterReports", fields: [reporterId], references: [id])
  property    Property?    @relation(fields: [propertyId], references: [id])

  @@map("reports")
}

model AuditLog {
  id           String   @id @default(uuid())
  userId       String
  action       String
  targetEntity String
  entityId     String
  details      String
  createdAt    DateTime @default(now())

  user         User     @relation(fields: [userId], references: [id])

  @@map("audit_logs")
}
```

---

## 11. Seed Data Strategy

No placeholder text (`lorem ipsum`) is allowed. Seed data must represent verified Ethiopian listings:

- **Cities**: Addis Ababa, Hawassa, Adama, Bahir Dar.
- **Sub-City Neighborhoods**: Bole Medhanialem, Kazanchis, Old Airport, CMC Sunshine, Hawassa Waterfront, Adama Expressway Gateway.
- **Brokers**: Licensed agencies (e.g., Bole Premier Real Estate, Capital Verified Homes, Hawassa Lakeside Living) with valid license numbers `ETH-RE-2024-XXXX`.
- **Properties**: 4-bedroom Bole luxury villa (ETB 65,000/mo, 45kVA generator, 12,000L water tank), Kazanchis serviced studio (ETB 28,000/mo), Old Airport diplomatic compound (ETB 95,000/mo).

---

## 12. Search & Filtering Engine

### Search Controls & Parameters
1. **Global Search Input**: Text query matching `title`, `description`, `subCity`, `city`, or `neighborhood`.
2. **City / Sub-City Filter**: Segmented select dropdown for `Addis Ababa` (Bole, Kirkos, Nifas Silk, Yeka) and regional cities.
3. **Price Range Slider (ETB / Month)**: Range input from `ETB 10,000` to `ETB 150,000+`.
4. **Bedrooms & Bathrooms**: Counter selector (`Studio`, `1`, `2`, `3`, `4+`).
5. **Property Type**: Filter pills (`All Verified`, `Apartments`, `Villas`, `Serviced Studios`, `G+1 Compounds`, `Penthouses`).
6. **Infrastructure Toggles**:
   - `[x] Standby Generator`
   - `[x] Reserve Water Tank`
   - `[x] Dedicated Parking`
   - `[x] 24/7 Security Guard`
   - `[x] Fully Furnished`

### Empty State Strategy
When zero listings match search filters:
- Display a friendly empty state component (`components/empty-state.tsx`) with a clear message: *"No homes match your exact filter criteria in Bole Medhanialem."*
- Provide a 1-click button: *"Clear All Filters"* or *"Expand Search to Nearby Sub-Cities"*.

---

## 13. Property Lifecycle State Machine

```
   [Draft]
      │
      ▼ (Submit for Audit)
[PENDING_APPROVAL] ────► [REJECTED] (Reason attached; owner can edit & resubmit)
      │
      ▼ (Field Agent Audit Verified & Moderator Approved)
  [APPROVED]
      │
      ├─► [Published on Marketplace]
      │
      ▼ (Owner Archives / Rented Out)
  [ARCHIVED]
```

---

## 14. Property Publishing System (`/publish`)

### Step-by-Step Listing Wizard
1. **Step 1: Listing Essentials**: Title, Property Type, Monthly Rent (ETB), Lease terms.
2. **Step 2: Geographic Location**: City, Sub-City, Neighborhood, Street address, Map PIN location coordinates (`lat`, `lng`).
3. **Step 3: Infrastructure & Specs**: Bedrooms, Bathrooms, Area (sqm), Standby Generator capacity (kVA), Reserve Water Tank volume (Liters), Security details.
4. **Step 4: Media Gallery Upload**: Drag-and-drop image uploader with hero photo selection and order sorting.
5. **Step 5: Preview & Submit**: Review summary card -> Click "Submit for Verification". Status transitions to `PENDING_APPROVAL`.

---

## 15. Property Details Page Layout (`/property/[slug]`)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home > Addis Ababa > Bole > Bole Medhanialem Modern Villa│
├────────────────────────────────────────────────────────────────────────┤
│ [ HERO GALLERY GRID (1 Large Hero Photo + 4 Thumbnail Photos) ]        │
├───────────────────────────────────────────────────┬────────────────────┤
│ Property Headline & Verification Badge            │ Floating Pricing & │
│ ETB 65,000 / month • Bole Medhanialem, Addis Ababa │ Contact Card       │
├───────────────────────────────────────────────────┤ Rent: ETB 65,000   │
│ Quick Specs Bar: 4 Beds │ 3.5 Baths │ 320 sqm        │                    │
├───────────────────────────────────────────────────┤ [Schedule Visit →] │
│ Verified Infrastructure Badges:                   │ [Call Broker]      │
│  ⚡ Standby Generator (45 kVA)                     │ [WhatsApp Inquiry] │
│  💧 Reserve Water Tank (12,000 L)                 │                    │
│  🛡️ 24/7 Security Guard & Electric Fence          │ Certified Broker:  │
│  🚗 Dedicated 3-Car Covered Parking               │ Abebe Tesfaye      │
├───────────────────────────────────────────────────┤ License: ETH-RE-91│
│ Description & Neighborhood Infrastructure Rating  │ ★ 4.9 (14 Reviews) │
├───────────────────────────────────────────────────┴────────────────────┤
│ Map View & Nearby Similar Listings                                    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 16. Realtime Messaging & Inquiry System (`/messages`)

- **Conversation Threads**: Direct 1-on-1 message threads between Home Seekers and Certified Brokers.
- **Context Card Header**: Displays property title thumbnail and monthly rent at top of message view.
- **Realtime Updates**: Socket.IO / Supabase Realtime channel for instant delivery of inquiry messages.
- **Unread Counter**: Badge displayed on topbar and bottom navigation bar.

---

## 17. Favorites & Wishlist System (`/favorites`)

- **1-Click Heart Button**: Save property to wishlist from card or details page.
- **State Synchronization**: Synchronized with NestJS `POST /api/v1/favorites` for authenticated users; stored in `localStorage` for guest users.
- **Comparison Drawer**: Side-by-side comparison of rent prices, generator capacity, and water tank volumes for saved homes.

---

## 18. Notifications System (`/notifications`)

- **Trigger Events**:
  - `VISIT_CONFIRMED`: Broker confirms walkthrough appointment time.
  - `LISTING_APPROVED`: Moderator approves submitted property.
  - `PRICE_DROP`: Saved property rent price decreases.
  - `NEW_MESSAGE`: Inquiry message received from seeker/broker.

---

## 19. Broker Verification Profiles (`/brokers/[slug]`)

- **Verification Badge**: Green checkmark badge confirming government license audit.
- **Profile Elements**:
  - Agency Name & Registration ID (`ETH-RE-2024-0091`).
  - Rating & Review Summary (e.g., `★ 4.9` from 14 verified tenants).
  - Languages Spoken (`Amharic`, `English`, `Oromo`).
  - Active Listings Grid.
  - Direct Contact Buttons (`Call Now`, `WhatsApp`).

---

## 20. Admin Dependencies & Integration

The Marketplace relies on the Admin Dashboard (`admin-dashboard/`) for:
- Moderating `PENDING_APPROVAL` listings.
- Granting `VERIFIED` badges to licensed real estate brokers.
- Resolving user abuse reports regarding price discrepancies.
- Auditing platform security logs.

---

## 21. API Endpoint Dependencies (REST API `/api/v1`)

```
# Properties
GET    /api/v1/properties               # Query verified properties (filters: city, subCity, type, minPrice, maxPrice, generator)
GET    /api/v1/properties/:slug          # Get property details by slug
POST   /api/v1/properties               # Submit new property listing (PENDING_APPROVAL)
PATCH  /api/v1/properties/:id/moderate  # Approve or reject listing (Admin/Mod)

# Cities & Neighborhoods
GET    /api/v1/cities                   # Get all cities with listing counts
GET    /api/v1/cities/:slug             # Get city detail & sub-cities
GET    /api/v1/neighborhoods/:slug      # Get sub-city infrastructure stats

# Brokers
GET    /api/v1/brokers                  # Get verified brokers directory
GET    /api/v1/brokers/:slug             # Get broker public profile
PATCH  /api/v1/brokers/:id/verify       # Toggle broker verification badge (Admin)

# Walkthrough Visits
POST   /api/v1/visits                   # Schedule walkthrough visit
GET    /api/v1/visits                   # Get scheduled visits

# Favorites
POST   /api/v1/favorites                # Toggle save property to wishlist
GET    /api/v1/favorites/user/:userId   # Get saved properties for user

# Admin Platform
GET    /api/v1/admin/overview           # Platform metrics & queue counts
GET    /api/v1/admin/audit-logs         # Security audit trail logs
```

---

## 22. Reusable Component Inventory

```
packages/ui/ (or product-website/components/)
├── navbar.tsx                     # Sticky header with search capsule & avatar menu
├── footer.tsx                     # Marketplace footer with city links & currency selector
├── search-bar-capsule.tsx         # Floating rounded search capsule
├── category-bar.tsx               # Category pill selector (Villas, Apartments, Studios)
├── property-card.tsx              # Property photo-card with wishlist heart & specs
├── property-gallery.tsx           # Photo gallery carousel & grid
├── filter-modal.tsx               # Comprehensive filter drawer modal
├── schedule-modal.tsx             # Walkthrough appointment date/time picker
├── broker-card.tsx                # Verified broker profile card
├── stats-card.tsx                 # Administrative metric summary card
├── property-table.tsx             # Administrative property table with status badges
├── user-table.tsx                 # User management table with role selector
├── broker-table.tsx               # Broker verification table
├── approval-modal.tsx             # Admin listing approval/rejection modal
├── empty-state.tsx                # Friendly empty state component
└── toast.tsx                      # Toast alert notification popup
```

---

## 23. Design System Principles

- **Color Palette**:
  - Soft Warm Soft Ivory Background: `#FAF8F4`
  - Primary Burgundy Accent: `#4C061D`
  - Soft Sage Green: `#B4C292`
  - Muted Olive: `#736F4E`
  - Dark Earth: `#3B3923`
  - White Cards: `#FFFFFF` with `#ECE7DA` hairline borders.
- **Typography System**:
  - `DM Serif Display`: Headline typography (`font-serif-display`).
  - `Manrope`: Primary UI heading typography (`font-heading`).
  - `Inter`: Body typography (`font-sans`).
  - `Roboto Mono`: Numbers, prices, specs, code labels (`font-mono-label`).
- **Radii Tokens**:
  - `rounded-3xl` (24px) for main content cards & modals.
  - `rounded-full` for search capsules, category pills, and status badges.

---

## 24. Animation & Micro-Interaction System

- **Framer Motion**:
  - Page transitions (`opacity: 0 -> 1`, `y: 8 -> 0`).
  - Category pill sliding indicator.
  - Modal backdrop blur and scale-in transition (`scale: 0.95 -> 1.0`).
  - Property card hover image zoom (`scale: 1.03`).
- **Skeletons**: Pulsing skeleton loaders matching property card aspect ratio during image loading.

---

## 25. Accessibility (a11y) Requirements

- **WCAG 2.1 AA Compliance**: All text elements satisfy a minimum 4.5:1 contrast ratio against warm ivory (`#FAF8F4`) and white (`#FFFFFF`) backgrounds.
- **Keyboard Navigation**: Full `Tab` focus ring indicators across all buttons, inputs, category pills, and modal close triggers.
- **ARIA Attributes**: `aria-expanded` on filter modals, `aria-selected` on category pills, `alt` tags on all property images.

---

## 26. Performance & SEO Optimization

- **Next.js App Router Server Components (RSC)**: Static page generation for homepage, cities, and broker directory.
- **Image Optimization**: `next/image` with WebP compression and responsive `sizes` attribute.
- **Dynamic Imports**: Lazy-load interactive map components (`MapView`) to minimize initial JavaScript bundle size.
- **Metadata & OpenGraph**: Structured title tags, meta descriptions, and OpenGraph social cards for every listing.

---

## 27. Folder Structure Architecture (`product-website/`)

```
product-website/
├── app/
│   ├── globals.css                # Delala CSS design system tokens
│   ├── layout.tsx                 # Root layout with fonts & Navbar/Footer
│   ├── page.tsx                   # Marketplace Homepage
│   ├── search/                    # Search & Split Map View
│   ├── property/[slug]/           # Property Details View
│   ├── cities/                    # Cities Directory
│   ├── cities/[city]/             # City Detail Page
│   ├── neighborhoods/[slug]/      # Neighborhood Infrastructure Guide
│   ├── brokers/                   # Verified Brokers Directory
│   ├── brokers/[slug]/            # Broker Profile View
│   ├── favorites/                 # Wishlist Saved Properties
│   ├── messages/                  # Chat Conversations
│   ├── notifications/             # System Notifications
│   ├── profile/                   # User Profile
│   ├── settings/                  # Account Settings
│   └── not-found.tsx              # 404 Error Page
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── search-bar-capsule.tsx
│   ├── category-bar.tsx
│   ├── property-card.tsx
│   ├── filter-modal.tsx
│   ├── schedule-modal.tsx
│   ├── broker-card.tsx
│   └── map-view.tsx
├── lib/
│   ├── api-client.ts              # NestJS REST API Client
│   ├── data.ts                    # Verified local Ethiopian dataset
│   ├── types.ts                   # TypeScript interfaces
│   └── utils.ts                   # ETB currency & date formatters
├── public/
│   └── images/                    # Verified property & avatar assets
├── package.json
└── tsconfig.json
```

---

## 28. Development Roadmap

- **Phase 1: Foundation & Shared Packages**: Monorepo packages setup, design tokens, global layout, fonts.
- **Phase 2: Database Schema & API Services**: Prisma schema push to Supabase PostgreSQL, NestJS modules (`Properties`, `Brokers`, `Cities`, `Visits`, `Favorites`).
- **Phase 3: Core Discovery & Search**: Home search capsule, category pills, split grid/map search page, filter drawer.
- **Phase 4: Property Details & Walkthrough Booking**: Photo gallery carousel, infrastructure badges, schedule visit modal.
- **Phase 5: User Wishlists & Broker Profiles**: Favorites drawer, certified broker profiles, agency license badges.
- **Phase 6: Admin Moderation Platform**: Information-dense Admin Dashboard, pending approvals queue, user role editor.
- **Phase 7: Realtime Messaging & Notifications**: Seeker-broker chat, visit SMS alerts.
- **Phase 8: Production Audit & Deployment**: End-to-end testing, Core Web Vitals audit, deployment to Vercel & Railway.

---

## 29. MVP Launch Checklist

- [x] Monorepo workspace configuration (`services/api/`, `product-website/`, `admin-dashboard/`, `packages/`).
- [x] Prisma database schema designed for Supabase PostgreSQL.
- [x] NestJS API v1 endpoints & Swagger OpenAPI setup on `/api/docs`.
- [x] Design system styling implemented (`#FAF8F4` soft ivory, `#4C061D` burgundy, `DM Serif Display` headlines).
- [x] Search & filtering system (City, Sub-City, Type, Price, Standby Generator, Water Tank).
- [x] Property details view with photo gallery and infrastructure badges.
- [x] Walkthrough appointment booking modal connected to API.
- [x] Admin Dashboard overview, pending approvals queue, user role editor, and broker license verification.
- [x] Production build verification clean across all Next.js App Router pages and NestJS TypeScript endpoints.

---

## 30. Future Expansion Roadmap

1. **AI Neighborhood Valuation Engine**: Predictive machine learning model estimating fair rent prices based on sub-city generator penetration and water reliability.
2. **Digital Title Deed Verification**: Integration with Ethiopian Ministry of Urban Development & Housing digital registries.
3. **Smart Escrow Payments**: Integration with Telebirr and Chapa for automated rental deposit escrow protection.
4. **Interactive 3D Virtual Tours**: 360-degree virtual walkthroughs for diaspora home seekers.
