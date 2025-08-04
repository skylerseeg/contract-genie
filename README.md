# Contract Genie

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-80eec0)](https://orm.drizzle.team/)

Your #1 AI tool to help entrepreneurs and freelancers negotiate smarter, close faster, and protect every deal.

## Overview

Contract Genie is an AI-powered contract analysis and negotiation platform designed for freelancers, entrepreneurs, and agencies who want to close deals with confidence. Upload a contract and instantly receive clause-by-clause risk ratings, suggested edits, ready-to-send negotiation emails, and custom clause recommendations.

## Key Features

- **AI Contract Review** – Upload a PDF or DOCX contract and get instant analysis.
- **Clause Risk Scoring** – Quickly spot high-risk, ambiguous, or unfair clauses.
- **Negotiation Language Generator** – Create professional, firm but friendly counter‑proposals.
- **Custom Clause Pack Builder** – Save and reuse your favorite clauses for future deals.
- **Secure Login** – Authentication via NextAuth.

## Tech Stack

- **Frontend:** Next.js (React) with Tailwind CSS
- **API Routes:** Next.js App Router
- **Database:** PostgreSQL with Drizzle ORM
- **Authentication:** NextAuth with credentials provider
- **AI Processing:** Venice API + GPT (integration in progress)

## Installation & Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Clone and Install

```bash
git clone https://github.com/yourusername/contract-genie.git
cd contract-genie
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
POSTGRES_URL=postgres://user:password@host:port/db
GITHUB_WEBHOOK_SECRET=optional_secret_for_github_webhooks
AUTH_SECRET=your_nextauth_secret
```

### Database Setup

Run the migrations to create the database schema:

```bash
pnpm db:migrate
```

### Running the App

- Development: `pnpm dev`
- Production build: `pnpm build` then `pnpm start`

## Usage

1. Log in or register.
2. Upload a contract (PDF or DOCX).
3. Review analysis and suggested edits.
4. Generate a response email or save custom clauses.

## Roadmap

- Finalize UI/UX polish for MVP
- Add multi-language support for global freelancers
- Integrate e‑signature workflow
- Expand clause pack templates for niche industries

## Contributing

Pull requests welcome. For major changes, please open an issue first to discuss your ideas.

## License

MIT License – see LICENSE for details.

## Contact

Skyler Seegmiller  
Founder & Product Designer – Contract Genie  
hello@contractgenie.ai

