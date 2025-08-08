# AncientLingo

AncientLingo is a cross‑platform educational platform for learning and reading ancient languages such as **Koine Greek**, **Biblical Hebrew**, **Latin**, **Akkadian**, **Ugaritic**, **Coptic**, **Syriac**, **Middle Egyptian**, and **Geʽez/Ethiopic**.  The project consists of a React Native mobile application and a Next.js web client backed by a Supabase database.  It draws inspiration from modern language–learning tools like Duolingo while focusing on features specific to ancient languages: parsed texts, interlinear and parallel reading modes, syntactic parsing and vocabulary lookups, spaced repetition review, and image‐based text parsing.

## 🎯 Goals

* Provide a **consistent learning experience** across mobile and web.
* Build a **modular curriculum** for each language with grammar lessons, vocabulary modules, and reading practice.
* Offer a **rich reading interface** with interlinear, parallel and mono‑language modes and integrated word lookup.
* Allow users to **upload images of ancient texts**, run OCR, and return fully parsed results inline.
* Track user progress, streaks, badges and vocabulary history with a **spaced repetition system (SRS)**.
* Deliver an **approachable architecture** that can evolve from an MVP into a production system.

## 🛠 Tech Stack

| Layer           | Technology                                             |
|-----------------|---------------------------------------------------------|
| **Mobile**      | [Expo](https://expo.dev/) / React Native                |
| **Web**         | [Next.js 14](https://nextjs.org/) (React)              |
| **Styling**     | [Tailwind CSS](https://tailwindcss.com/)               |
| **Backend**     | [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage) |
| **Notifications** | Firebase Cloud Messaging (push), Email, SMS          |
| **CI/CD**       | Vercel (web) / EAS (Expo)                              |

We chose Supabase because it offers hosted Postgres with authentication, storage, and real‑time subscriptions out of the box.  It lets us build prototypes quickly without managing our own servers.  However, if the project grows we can migrate the database to a managed Postgres instance or self‑host Supabase.

### Suggested Enhancements

To improve developer productivity and maintainability, consider these optional refinements:

* **Monorepo tooling:** Use [Turborepo](https://turbo.build/repo) or [Nx](https://nx.dev/) to orchestrate builds, share code between web and mobile, and define common scripts.
* **Shared API layer:** Expose backend functionality through a typed RPC layer (e.g. [tRPC](https://trpc.io/)) to share TypeScript types between the Next.js server, mobile client and Supabase functions.
* **Type‑safe database layer:** Use [Drizzle ORM](https://orm.drizzle.team/) or [Prisma](https://prisma.io/) to generate types for your database schema and avoid runtime SQL errors.
* **Self‑hosted LMS:** For complex spaced repetition algorithms, consider extracting the SRS engine into its own service (e.g. a Node microservice or a Cloud Function) so it can evolve independently.

These enhancements are not required for the MVP but can be added incrementally as the project matures.

## 📁 Repository Structure

This repository uses a simple directory layout suitable for a greenfield project:

```
ancientlingo/
├── mobile/        # Expo/React Native application
│   ├── App.tsx    # Entry point for Expo app
│   ├── package.json
│   └── ...        # additional mobile code (screens, components, assets)
├── web/           # Next.js web client
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── src/
│   │   └── pages/
│   │       └── index.tsx
│   └── ...        # additional web code (components, pages)
├── supabase/      # Supabase migrations and serverless functions
│   └── README.md
├── docs/          # Documentation and specifications
│   └── architecture.md
├── .gitignore
└── README.md      # You are here
```

## 🚀 Getting Started

These instructions get you a copy of the project up and running for development and testing purposes.  You will need **Node.js ≥ 18** and **npm** (or **Yarn**/pnpm) installed.

### 1. Clone and bootstrap the monorepo

```bash
git clone <your-github-fork-url>
cd ancientlingo
npm install
```

> The root `package.json` is intentionally minimal.  Each sub‑project (`mobile` and `web`) maintains its own dependencies.  Use `npm install` (or `yarn`) inside those folders to install platform‑specific packages.

### 2. Set up environment variables

Both the mobile and web apps rely on Supabase credentials and API keys.  Copy the example environment file to create your own:

```bash
cp mobile/.env.example mobile/.env
cp web/.env.local.example web/.env.local
cp supabase/.env.example supabase/.env
```

Fill in the variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, etc.) with the credentials from your Supabase project.  For push notifications, you'll also need Firebase credentials.

### 3. Running the mobile app

The mobile application uses [Expo](https://expo.dev/).  To start it:

```bash
cd mobile
npm install
npm start
```

Expo will open a development server and display a QR code.  Use the Expo Go app on your iOS or Android device to scan the code and run the app.  Alternatively, press `i` or `a` in your terminal to launch iOS or Android emulators.

### 4. Running the web client

The Next.js app uses Tailwind CSS and runs on port 3000 by default:

```bash
cd web
npm install
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000) in your browser to see the application.  Hot reloading will pick up any changes you make to source files.

### 5. Database & Supabase

Create a new Supabase project at [supabase.com](https://supabase.com/).  Use the SQL editor or migration tooling to apply the initial schema found under `supabase/schema.sql`.  This schema defines tables for users, progress tracking, vocabulary banks, review schedules and OCR uploads.

Supabase handles authentication, storage and real‑time updates out of the box.  If you plan to use serverless functions, create them in `supabase/functions/` and deploy them with `supabase functions deploy`.

### 6. Testing & Linting

Both the mobile and web projects include example test and linting configurations.  To run all tests from the root of the repository:

```bash
npm run test    # Runs unit tests for all packages
npm run lint    # Runs ESLint and TypeScript checks
```

## 📄 License

This project is released under the MIT License.  See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome!  Please open an issue or submit a pull request if you find a bug or would like to propose a feature.  When contributing code, adhere to the existing style guidelines and include tests where appropriate.