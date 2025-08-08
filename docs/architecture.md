# Architecture Overview

This document outlines the high‑level architecture for AncientLingo.  The goal is to build a modular, scalable system that can power both a mobile app and a web client while enabling rapid development.

## Layers

1. **Clients (mobile & web):** Built with React and share as much code as practical.  The mobile app uses Expo (React Native) and the web client uses Next.js.  Both clients communicate with the backend via Supabase’s RESTful API or RPC functions.
2. **Backend (Supabase):** Provides authentication, a PostgreSQL database, file storage (for uploaded images), and serverless functions.  Supabase also offers real‑time subscriptions used for progress tracking and notifications.
3. **External services:**
   - **OCR & NLP:** For image uploads, you can integrate third‑party OCR APIs (e.g. Google Cloud Vision, Tesseract) and morphological analysers to parse ancient texts.
   - **Notification providers:** Firebase Cloud Messaging for push notifications.  For email and SMS you might use services like SendGrid or Twilio.

## Data Model

Refer to `supabase/schema.sql` for the initial table definitions.  Key entities include:
- `profiles`: extended user profile (Supabase handles core auth).
- `user_progress`: tracks each user’s level, streak and badges per language.
- `vocabulary_bank`: stores user‑added words and their glosses.
- `spaced_repetition`: SRS scheduling metadata for each vocabulary item.
- `ocr_uploads`: records uploaded images and their extracted text as JSON.

## Key Architectural Considerations

### Sharing code
Use TypeScript throughout the project to benefit from static typing.  Consider a monorepo tool (Turborepo or Nx) to enable path aliases and cross‑package imports.  Shared code—such as API clients, UI components and utility functions—should live in a separate workspace (e.g. `packages/common`) to avoid duplication.

### API layer
Although Supabase provides generated REST endpoints, a typed API layer will improve developer experience.  Libraries like [tRPC](https://trpc.io/) allow you to define server functions in TypeScript and generate strongly typed client hooks, which can be shared by both the Next.js and React Native apps.  If you adopt tRPC, deploy the server as a serverless function (e.g. Vercel Functions) or within the Next.js API routes.

### Spaced repetition scheduling
The MVP can implement a basic spaced repetition algorithm directly in the client; however, moving the SRS engine to a backend function ensures consistent scheduling across devices and prevents users from circumventing the review intervals.  A simple algorithm (e.g. SuperMemo 2) can be implemented in a Supabase function or an edge function.

### OCR and morphological analysis
The OCR component requires integration with external services.  For the MVP you can call an external API from the mobile/web app or a serverless function.  Once the OCR returns raw text, run tokenization and morphological parsing (e.g. morphological analyzers available for ancient Greek, Hebrew, and Latin) before displaying the interlinear results.

### Security and compliance
Store authentication tokens securely on the client (use `expo-auth-session` or similar).  Enable row‑level security on all Supabase tables and implement policies to ensure users only read/write their own data.  Provide users with GDPR‑compliant data export and deletion options.

## Deployment

* **Web:** Host on Vercel.  Configure environment variables via Vercel’s dashboard.  Enable preview deployments for pull requests.
* **Mobile:** Use Expo Application Services (EAS) to build and deploy iOS and Android binaries.  Expo provides OTA updates via Expo Updates.
* **Database:** Supabase hosts the Postgres database and storage.  Use Supabase CLI or SQL migrations to manage schema changes.
* **CI/CD:** Use GitHub Actions to run tests, linting, and build the web and mobile apps.  Consider using a monorepo pipeline to speed up builds via caching.

## Conclusion

This architecture balances rapid development with a clear path to scale.  Starting with Supabase and Expo allows you to focus on core features.  As the app evolves, you can introduce additional layers such as a dedicated API server or microservices for compute‑heavy tasks (OCR, SRS) while maintaining a unified developer experience.