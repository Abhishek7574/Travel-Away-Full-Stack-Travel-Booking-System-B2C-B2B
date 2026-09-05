# Travel Away

A full-stack travel booking system designed for B2C and B2B workflows. It includes an Angular client, an ASP.NET Core service layer, a data-access layer, a payment microservice, and an Ocelot API gateway.

## Architecture

```text
Angular client -> API gateway -> Travel service / Payment microservice -> Database
```

## Tech stack

- **Frontend:** Angular 15, TypeScript
- **Backend:** ASP.NET Core 8, C#
- **Data access:** Entity Framework Core / SQL Server configuration
- **Gateway:** Ocelot
- **API documentation:** Swagger in development

## Repository structure

```text
.
├── Infosys.TravelAway/
│   ├── Infosys.TravelAway.ServiceLayer/   # Travel booking API
│   ├── Infosys.TravelAway.DAL/            # Data-access layer and database script
│   ├── Infosys.PaymentMicroservice/       # Payment API
│   ├── Infosys.PaymentGateway/            # Ocelot gateway
│   ├── TravelAwayApp/                     # Angular web client
│   └── Infosys.TravelAway.sln             # .NET solution
└── Project Requirement/                   # Project requirement material
```

## Prerequisites

- .NET 8 SDK
- Node.js 18 or later and npm
- SQL Server or SQL Server LocalDB

## Run locally

### 1. Prepare the database

Review and run `Infosys.TravelAway/Infosys.TravelAway.DAL/DB Script.sql` against your local SQL Server instance.

Update the connection-string placeholders in the relevant `appsettings.json` files with your local database settings. Do not commit real connection strings or credentials.

### 2. Run the backend services

From the repository root:

```bash
dotnet restore Infosys.TravelAway/Infosys.TravelAway.sln

dotnet run --project Infosys.TravelAway/Infosys.TravelAway.ServiceLayer
dotnet run --project Infosys.TravelAway/Infosys.PaymentMicroservice
dotnet run --project Infosys.TravelAway/Infosys.PaymentGateway
```

Start each service in a separate terminal. Swagger UI is enabled when a service runs in the Development environment.

### 3. Run the frontend

```bash
cd Infosys.TravelAway/TravelAwayApp
npm install
npm start
```

## Development commands

```bash
# Build the .NET solution
dotnet build Infosys.TravelAway/Infosys.TravelAway.sln

# Build and test the Angular application
cd Infosys.TravelAway/TravelAwayApp
npm run build
npm test
```

## Security notes

- Store credentials in environment variables, .NET User Secrets, or a managed secret store.
- Keep production connection strings and payment-provider credentials out of Git.
- Restrict the permissive development CORS settings before any production deployment.

## License

No license has been added yet. Add a license before making the repository public or accepting outside contributions.
