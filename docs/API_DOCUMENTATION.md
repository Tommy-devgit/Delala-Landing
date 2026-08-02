# Delala Backend REST API v1 Specification

Complete API reference for the single source of truth NestJS backend service.

---

## Base Configuration

- **Host**: `http://localhost:4000`
- **Global API Prefix**: `/api/v1`
- **Swagger Documentation**: `http://localhost:4000/api/docs`

---

## Core Endpoints

### 1. Properties (`/api/v1/properties`)

- `GET /api/v1/properties`
  - **Description**: Returns list of verified approved marketplace listings.
  - **Query Parameters**: `city`, `subCity`, `propertyType`.
  - **Role Required**: Public (Guest).

- `GET /api/v1/properties/:slug`
  - **Description**: Returns detailed property specifications, image gallery, broker contact info.
  - **Role Required**: Public (Guest).

- `POST /api/v1/properties`
  - **Description**: Submits a new property listing for moderation. Status defaults to `PENDING_APPROVAL`.
  - **Role Required**: Owner, Broker, Admin.

- `PATCH /api/v1/properties/:id/moderate`
  - **Description**: Approve or Reject a property listing submission with field agent audit notes and optional rejection reason.
  - **Role Required**: Moderator, Admin.

---

### 2. Brokers (`/api/v1/brokers`)

- `GET /api/v1/brokers`
  - **Description**: Returns directory of real estate brokers and agency details.
  - **Role Required**: Public.

- `PATCH /api/v1/brokers/:id/verify`
  - **Description**: Toggle verification badge for a real estate broker.
  - **Role Required**: Admin.

---

### 3. Users & Roles (`/api/v1/users`)

- `GET /api/v1/users`
  - **Description**: Returns platform accounts with profiles and broker associations.
  - **Role Required**: Admin.

- `PATCH /api/v1/users/:id/role`
  - **Description**: Assign platform role (`USER`, `BROKER`, `MODERATOR`, `ADMIN`).
  - **Role Required**: Admin.

- `PATCH /api/v1/users/:id/status`
  - **Description**: Update user status (`ACTIVE` or `SUSPENDED`).
  - **Role Required**: Admin.

---

### 4. Admin Infrastructure (`/api/v1/admin`)

- `GET /api/v1/admin/overview`
  - **Description**: Returns platform operational metrics (total users, active listings, pending queue count, health status).
  - **Role Required**: Moderator, Admin.

- `GET /api/v1/admin/audit-logs`
  - **Description**: Returns security audit trail logs.
  - **Role Required**: Admin.
