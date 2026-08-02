# Delala Platform System Architecture

Enterprise platform architecture powering the entire Delala real estate ecosystem in Ethiopia.

---

## 1. Monorepo Structure

```
delala/
├── services/
│   └── api/                    # NestJS REST API v1 (Single source of truth)
├── admin-dashboard/            # Next.js App Router internal administrative platform
├── product-website/            # Utility-first real estate marketplace application
├── client/                     # Brand storytelling landing website
├── packages/
│   ├── types/                  # Shared TypeScript interfaces & enums
│   ├── config/                 # Centralized environment constants
│   ├── theme/                  # Design system color tokens & typography
│   └── utils/                  # Currency & text formatting utilities
└── docs/                       # Architecture & Database documentation
```

---

## 2. Technology Stack & Responsibilities

| Tier | Technology | Key Responsibilities |
| :--- | :--- | :--- |
| **Backend API** | NestJS + TypeScript | Business logic, authorization, validation, RESTful API endpoints |
| **Database ORM** | Prisma ORM | Schema management, type-safe queries, migration handling |
| **Cloud Infrastructure** | Supabase | PostgreSQL Database, Authentication (JWT verification), Storage Buckets |
| **Admin Platform** | Next.js 15 (App Router) | High-utility administrative moderation, verification & analytics platform |
| **API Documentation** | Swagger / OpenAPI | Auto-generated interactive API documentation on `/api/docs` |

---

## 3. Security & Role-Based Access Control (RBAC)

1. **Authentication**: Supabase JWT tokens passed via HTTP `Authorization: Bearer <token>` headers.
2. **NestJS Guards**:
   - `RolesGuard`: Restricts endpoint execution to allowed roles (`@Roles("ADMIN", "MODERATOR")`).
   - `CurrentUser`: Custom parameter decorator injecting authenticated user credentials into controller methods.
3. **Role Hierarchy**:
   - `GUEST`: Public search & browsing.
   - `USER`: Seeker account, favorites, walkthrough bookings.
   - `OWNER`: Property owner listing management.
   - `BROKER`: Licensed real estate agent listing management.
   - `MODERATOR`: Content moderation & report resolution.
   - `ADMIN`: Full platform control, role assignment, broker verification, system audit logs.
