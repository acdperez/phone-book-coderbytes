## What you can find

- Production-ready [SQLite Database](https://sqlite.org)
- Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/utils/sessions#md-createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)

## Seeding database

Run the following command inside the root project folder in order to create the database and populate it with the default
user and default data.

1- npx prisma db push (creates the database)
2- npx prisma db seed (populates the database)

The database seed script creates a new user with some data you can use to get started:

- Email: `dperez@soap.health`
- Password: `darieliscool`

## Starting the application

- This step only applies if you've opted out of having the CLI install dependencies for you:

  npx remix init
  
- Start dev server:

  npm run dev

This starts your app in development mode, rebuilding assets on file changes.

### Relevant code:

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)

