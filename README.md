# mediaBuyersAppProject



# Backend:
# run project: npm run start:dev 
# then navigate to: http://localhost:3000/

# n g m/s/c 
 
# Frontend: 
# run project: ng s
# then navigate to: http://localhost:4200/


<!--  
File structure  

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

-->