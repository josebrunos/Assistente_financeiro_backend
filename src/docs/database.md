echo '# PostgreSQL in Docker for Genius Finance

This document provides instructions for setting up and running PostgreSQL in Docker for the Genius Finance application.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuration

The Genius Finance application uses PostgreSQL running in Docker with the following configuration:

- Port: **5433** (to avoid conflicts with existing PostgreSQL instances that typically run on port 5432)
- Database name: `geniusfinance`
- Username: `postgres`
- Password: `postgres`

## Docker Compose File

The application uses a `docker-compose.yml` file located in the project root to define and run the PostgreSQL container. Here is the content of the file:

```yaml
version: '"3.8"'

services:
  postgres:
    image: postgres:15
    container_name: geniusfinance-postgres
    ports:
      - "5433:5432"  # Map to port 5433 on host to avoid conflict
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: geniusfinance
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## Getting Started

### Starting the Database

To start the PostgreSQL database in Docker, navigate to the project root directory and run:

```bash
docker-compose up -d
```

This will start the PostgreSQL container in detached mode. The `-d` flag runs the container in the background.

### Checking the Status

To check if the PostgreSQL container is running:

```bash
docker ps
```

You should see the `geniusfinance-postgres` container listed as running.

### Stopping the Database

To stop the PostgreSQL container:

```bash
docker-compose down
```

If you want to stop the container and also remove the volumes (this will delete all data):

```bash
docker-compose down -v
```

## Connecting to the Database

### From the Application

The application connects to the PostgreSQL database using the following connection string in the `.env` file:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/geniusfinance?schema=public"
```

### Using a Database Client

To connect to the database using a database client like pgAdmin or DBeaver, use these settings:

- Host: `localhost`
- Port: `5433`
- Database: `geniusfinance`
- Username: `postgres`
- Password: `postgres`

### Using the Command Line

To connect to the PostgreSQL database from the command line:

```bash
docker exec -it geniusfinance-postgres psql -U postgres -d geniusfinance
```

## Troubleshooting

### Port Conflicts

If you encounter a port conflict (for example, if port 5433 is already in use), you can modify the `docker-compose.yml` file to use a different port:

```yaml
ports:
  - "5434:5432"  # Change 5433 to another port
```

Then, update the `DATABASE_URL` in your `.env` file accordingly.

### Data Persistence

Data is persisted in a Docker volume named `postgres_data`. This volume will persist even if you stop the container, but it will be deleted if you run `docker-compose down -v`.

### Viewing Container Logs

To view the logs of the PostgreSQL container:

```bash
docker logs geniusfinance-postgres
```

## Prisma Migration

After setting up the database, you can apply Prisma migrations to create the schema:

```bash
npx prisma migrate dev
```

This will create all the necessary tables based on your Prisma schema.'