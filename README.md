# AdInsights

# Overview
AdInsights is a Media Buying Tool. It is a simplified platform designed for agencies to manage their media buying operations. It allows admins to register their agencies, add team members (media buyers), assign roles, authenticate with Facebook, and manage data.

# This project focuses on essential functionalities like:

Managing team members with role-based access (Admin, Manager, Media Buyer).
Facebook Ads account authentication for media buyers.
Creating custom reports and metrics.
Pagination and responsive design for ease of use.
A clean, responsive frontend using Angular and Tailwind CSS.


# Features
1. User Roles
Admin: Registers the agency, adds team members, assigns roles, and manages the team.
Manager: Can view and manage reports for other team members.
Media Buyer: Can authenticate and manage their Facebook Ad accounts.

2. Facebook Authentication
Media buyers can authenticate their Facebook accounts and fetch ad account data.
Ad accounts include details like account name, status, currency, timezone, ROI, etc.
3. Pagination and Responsiveness
Tables and lists are fully responsive and include pagination to ensure a seamless user experience across devices.
4. Tech Stack
Frontend: Angular (TypeScript) with Tailwind CSS.
Backend: NestJS
Database: PostgreSQL.


# Setup Instructions
# Prerequisites
Node.js (v14+)
Angular CLI (v13+)
PostgreSQL (For database setup)
Facebook Developer Account (For API keys and app setup)
Tailwind CSS


# Start Backend Server:
run: npm install
run project: npm run start:dev 

 
# Start Frontend Server:
run: npm install
run: project: ng serve



# Project Architecture

src
├── common/                # Shared resources
│   ├── decorators/        # Custom decorators
│   ├── filters/           # Exception filters
│   ├── guards/            # Auth guards (e.g., JWT guard)
│   ├── interceptors/      # Request/response interceptors
│   ├── middlewares/       # Global middlewares
│   ├── pipes/             # Validation pipes
│   └── utils/             # Utility functions/helpers
│
├── config/                # Configuration files
│   ├── database.config.ts # Database configuration
│   ├── jwt.config.ts      # JWT configuration
│   ├── app.config.ts      # General app configuration
│
├── modules/               # All application modules
│   ├── auth/              # Auth module (example)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── auth.guard.ts
│   │   └── dtos/          # DTOs for request validation
│   │       ├── login.dto.ts
│   │       └── register.dto.ts
│   │
│   ├── users/             # Users module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   ├── user.entity.ts
│   │   └── dtos/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   │
│   ├── companies/         # Companies module
│   │   ├── companies.controller.ts
│   │   ├── companies.service.ts
│   │   ├── companies.module.ts
│   │   ├── company.entity.ts
│   │   └── dtos/
│   │       ├── create-company.dto.ts
│   │       └── update-company.dto.ts
│   │
│   └── reports/           # Another feature module
│       ├── reports.controller.ts
│       ├── reports.service.ts
│       ├── reports.module.ts
│       ├── report.entity.ts
│       └── dtos/
│           ├── create-report.dto.ts
│           └── update-report.dto.ts
│
├── app.module.ts          # Root module
├── main.ts                # Entry point of the application
└── .env                   



# Usage Guidelines
1. Admin Registration
The admin registers their agency and creates a company account.
2. Add Team Members
Admins can add team members (media buyers) and assign roles like "Manager" or "Media Buyer."
3. Authenticate Facebook
Media buyers can authenticate with their Facebook account to fetch ad account data.
The system fetches:
Ad account details (name, currency, timezone).
ROI and spending details.


# Future Enhancements
Multi-Tenancy: Allow multiple agencies to manage separate accounts.
Analytics Dashboard: Visualize campaign performance metrics.
Advanced Filtering: Add filters for reports by date, ROI, and ad performance.
Export to CSV: Enable exporting reports for external sharing.
Integration with Other APIs: Expand beyond Facebook Ads to Google Ads, TikTok Ads, etc.



# Contributors
Fatma Khalil: Full-Stack Developer
Mahmoud Samy: Backend Developer
Ahmed Nageb: Backend Developer