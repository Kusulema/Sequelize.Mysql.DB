# Project Overview

This project is a web application for a phone catalog, built with Node.js, Express, Sequelize, and MySQL. It serves a simple frontend that displays a list of phones fetched from a backend API. The database schema includes phone `brand`, `model`, `price`, `imageUrl`, and `storage`.

# Building and Running

The project uses `npm` for dependency management and scripts.

*   **Install Dependencies:**
    ```bash
    npm install
    ```
*   **Seed Database:**
    The `seed` script will synchronize the database schema (forcing a drop and recreate of the `Phones` table) and populate it with initial data.
    ```bash
    npm run seed
    ```
*   **Start Development Server:**
    This will start the Express server with `nodemon` for automatic restarts on file changes.
    ```bash
    npm run dev
    ```
*   **Start Production Server:**
    ```bash
    npm start
    ```
    The application will be accessible at `http://localhost:3000`.

# Development Conventions

*   **Backend:** Node.js with Express for routing and API endpoints. Sequelize is used as the ORM for interacting with MySQL.
*   **Frontend:** Simple HTML, CSS, and JavaScript. The `public` directory serves static assets. JavaScript fetches data from the backend API and dynamically renders it.
*   **Database Seeding:** A dedicated `seed.js` script is used to initialize the database with sample data, useful for development and testing. It uses `sequelize.sync({ force: true })` to ensure the schema is up-to-date and populated.