# Delala Supabase PostgreSQL Database Schema

Complete entity-relationship specification managed via Prisma ORM for Supabase PostgreSQL.

---

## Core Database Tables

### 1. `users`
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `role` (Enum: `GUEST`, `USER`, `OWNER`, `BROKER`, `MODERATOR`, `ADMIN`)
- `status` (Enum: `ACTIVE`, `SUSPENDED`)
- `supabaseUid` (String, Unique)
- `createdAt`, `updatedAt`

### 2. `profiles`
- `id` (UUID, Primary Key)
- `userId` (Foreign Key -> `users.id`, Cascade Delete)
- `fullName` (String)
- `phone` (String, Optional)
- `bio` (String, Optional)
- `languages` (Array of Strings)
- `verified` (Boolean)

### 3. `cities`
- `id` (UUID, Primary Key)
- `slug` (String, Unique)
- `name` (String)
- `tagline` (String)
- `startingRentETB` (Integer)
- `propertiesCount` (Integer)

### 4. `neighborhoods`
- `id` (UUID, Primary Key)
- `slug` (String, Unique)
- `name` (String)
- `subCity` (String)
- `cityId` (Foreign Key -> `cities.id`)
- `securityScore` (Float)
- `generatorPenetration` (String)
- `waterReliability` (String)
- `averageRentETB` (Integer)

### 5. `brokers`
- `id` (UUID, Primary Key)
- `slug` (String, Unique)
- `userId` (Foreign Key -> `users.id`)
- `agencyName` (String)
- `licenseNumber` (String, Unique)
- `verified` (Boolean)
- `rating` (Float)
- `specializedAreas` (Array of Strings)

### 6. `properties`
- `id` (UUID, Primary Key)
- `slug` (String, Unique)
- `title` (String)
- `description` (String)
- `propertyType` (String)
- `rentETB` (Integer)
- `cityId` (Foreign Key -> `cities.id`)
- `neighborhoodId` (Foreign Key -> `neighborhoods.id`)
- `bedrooms` (Integer), `bathrooms` (Float), `areaSqm` (Integer)
- `generator`, `waterTank`, `parking`, `furnished`, `securityGuard`, `balcony` (Booleans)
- `status` (Enum: `PENDING_APPROVAL`, `APPROVED`, `REJECTED`, `ARCHIVED`)
- `rejectionReason` (String, Optional)
- `fieldAgentNotes` (String, Optional)
- `brokerId` (Foreign Key -> `brokers.id`)

### 7. `visits`
- `id` (UUID, Primary Key)
- `propertyId` (Foreign Key -> `properties.id`)
- `seekerId` (Foreign Key -> `users.id`)
- `brokerId` (Foreign Key -> `brokers.id`)
- `scheduledDate` (String)
- `timeSlot` (String)
- `status` (Enum: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`)

### 8. `audit_logs`
- `id` (UUID, Primary Key)
- `userId` (Foreign Key -> `users.id`)
- `action` (String)
- `targetEntity` (String)
- `details` (String)
- `createdAt` (Timestamp)
