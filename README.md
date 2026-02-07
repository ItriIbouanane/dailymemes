# Memetube

A web application that serves fresh daily memes from Reddit. Memetube fetches memes from multiple subreddits, caches them in a database, and displays the daily meme alongside yesterday's most-liked meme for each category.

## Features

- **Five meme categories** – Browse memes across General, Programming, Gaming, Art, and French categories, each sourced from a dedicated subreddit.
- **Daily memes** – Automatically fetches a fresh meme from Reddit's meme API every day for each category.
- **Most-liked meme** – Highlights the previous day's highest-upvoted meme in each category.
- **Duplicate prevention** – Stores fetched memes in a MySQL database and avoids showing the same meme twice.
- **Responsive UI** – Dark-themed, mobile-friendly interface built with Tailwind CSS.
- **CSRF protection** – Secured with AdonisJS Shield middleware.

## Categories & Routes

| Route           | Category    | Subreddit           |
| --------------- | ----------- | ------------------- |
| `/`             | General     | r/memes             |
| `/programming`  | Programming | r/ProgrammerHumor   |
| `/gaming`       | Gaming      | r/gamingmemes       |
| `/art`          | Art         | r/artmemes          |
| `/french`       | French      | r/MemeFrancais      |

## Tech Stack

- **Backend** – [AdonisJS 6](https://adonisjs.com/) (TypeScript)
- **Database** – MySQL with Lucid ORM
- **Templating** – Edge.js (server-side rendering)
- **Styling** – Tailwind CSS
- **Bundler** – Vite
- **HTTP Client** – Axios (fetches memes from [meme-api.com](https://meme-api.com))

## Prerequisites

- Node.js ≥ 20
- MySQL server

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy the example env file and fill in your database credentials:

   ```bash
   cp .env.example .env
   ```

   Required variables:

   | Variable         | Description                        |
   | ---------------- | ---------------------------------- |
   | `PORT`           | Server port (default `3333`)       |
   | `HOST`           | Server host (default `localhost`)   |
   | `APP_KEY`        | Application secret key             |
   | `DB_HOST`        | MySQL host                         |
   | `DB_PORT`        | MySQL port (default `3306`)        |
   | `DB_USER`        | MySQL user                         |
   | `DB_PASSWORD`    | MySQL password                     |
   | `DB_DATABASE`    | MySQL database name                |
   | `SESSION_DRIVER` | Session driver (`cookie`/`memory`) |

3. **Run database migrations**

   ```bash
   node ace migration:run
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3333`.

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start development server with watch  |
| `npm run build`    | Build for production                 |
| `npm start`        | Run production server                |
| `npm test`         | Run tests                            |
| `npm run lint`     | Lint with ESLint                     |
| `npm run format`   | Format with Prettier                 |
| `npm run typecheck`| Type-check with TypeScript           |

## How It Works

1. When a user visits a category page, the controller fetches a meme from the external Reddit meme API for the corresponding subreddit.
2. The meme is stored in the database if it hasn't been seen before, preventing duplicates.
3. The controller also queries the database for yesterday's most-liked meme (by upvote count) in that category.
4. Both the current meme and the most-liked meme are rendered on the page using Edge.js templates.

## License

UNLICENSED
