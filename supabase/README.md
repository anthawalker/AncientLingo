# Supabase Backend

This directory contains scripts and documentation for managing the Supabase backend that powers AncientLingo.

## Setup

1. Create a new project at [Supabase](https://app.supabase.com/).
2. Install the Supabase CLI:

   ```bash
   npm install -g supabase
   ```

3. Authenticate with the CLI and link your local project:

   ```bash
   supabase login
   supabase init
   ```

4. Update the `.env` file with your Supabase URL and API keys.  Copy `.env.example` as a starting point.

## Database Schema

The initial database schema is defined in [`schema.sql`](./schema.sql).  Apply it to your project by running:

```bash
supabase db push
```

This will create tables for user profiles, progress tracking, vocabulary banks, SRS metadata and OCR uploads.  You can edit `schema.sql` as your data model evolves.

## Functions

Supabase supports serverless Edge Functions and Database Functions (RPC).  Put your TypeScript functions under the `functions/` directory and deploy them using:

```bash
supabase functions deploy <function-name>
```

These functions can perform actions such as sending notification emails, computing spaced repetition schedules, or integrating with third‑party OCR APIs.

## Environment Variables

Supabase projects expose several keys.  See `.env.example` for the required variables:

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The `SUPABASE_SERVICE_ROLE_KEY` should **never** be exposed on the client.  Use it only in serverless functions or secure backend contexts.

## Local Development

You can run a local Supabase instance using:

```bash
supabase start
```

This will spin up a Postgres container, the Supabase API, and any functions you have defined.  Use the local instance for integration testing before deploying to production.

## Documentation

Refer to the [Supabase documentation](https://supabase.com/docs) for full details on authentication, storage, row‑level security (RLS) policies, and more.