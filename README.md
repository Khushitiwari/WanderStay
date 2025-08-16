# WanderStay

WanderStay is a modern, responsive web platform that connects travelers with unique accommodations. Users can **add their own listings** or **browse stays** posted by others—with options ranging from beachfront bungalows to treehouse getaways.

The site features a clean, intuitive interface, showcasing trending stays with transparent pricing (including GST), and supports user authentication (sign‑up, login).

---

## Table of Contents

1. [Demo](#demo)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
5. [Project Structure](#project-structure)  
6. [Configuration](#configuration)  
7. [Usage](#usage)  
8. [Contributing](#contributing)  
9. [License](#license)  
10. [Contact](#contact)

---

## Demo

Check out the live demo here: [WanderStay Listings Page](https://wanderstay-1-0w1j.onrender.com/listings)

---

## Features

- **Add Your Home** — Users can list their accommodations with pricing + tax details.  
- **Browse Stays** — Explore curated categories: rooms, villas, beachfront escapes, and more.  
- **Responsive Design** — Optimized UX across devices and screen sizes.  
- **User Authentication** — Sign up and log in to manage listings.  
- **Trending Listings View** — A stylish, scrollable showcase of popular stays.  

---

## Tech Stack

- **Backend / Framework**: JavaScript (Node.js) & Express  
- **Templating Engine**: EJS for dynamic rendering  
- **Styling**: CSS  
- **Data Models & Routing**, Middleware, Utilities included in separate folders  
- **Entry Point**: `app.js`  
- **Configuration**: `cloudConfig.js`, schema definitions in `schema.js`  
- **Additional**: Routing, controllers, middleware to organize logic  

---

## Getting Started

**Prerequisites**  
- Node.js (v16+)  
- npm or yarn  
- (Optional) A MongoDB instance or other preferred database – depending on `schema.js`

**Installation Steps**

\`\`\`bash
git clone https://github.com/Khushitiwari/WanderStay.git
cd WanderStay
npm install
\`\`\`

---

## Project Structure

\`\`\`
WanderStay/

├── controllers/      # Business logic handlers

├── models/           # Data models (e.g., listings, users)

├── routes/           # Express routes

├── views/            # EJS templates for UI rendering

├── public/           # Static assets (CSS, images, JS)

├── utils/            # Shared utility functions

├── middleware.js     # Custom middleware (e.g., auth checks)

├── cloudConfig.js    # Configuration for cloud services (e.g., AWS, DB, etc.)

├── schema.js         # Database schema definitions

├── app.js            # Main server setup & startup

├── package.json

├── package-lock.json

└── .gitignore
\`\`\`

---

## Configuration

1. **Environment Variables**  
   - Create a \`.env\` file to store your config (e.g., \`PORT\`, DB credentials, cloud keys).
2. **cloudConfig.js**  
   - Set up storage or external integrations (e.g., AWS S3, image uploads).
3. **schema.js**  
   - Define models for listings, users, etc., to match your data structure.

---

## Usage

1. Start your development server:

    \`\`\`bash
    npm start
    \`\`\`

2. Open your browser and navigate to:

    \`\`\`
    http://localhost:3000/listings
    \`\`\`

3. Explore trending listings, sign up or log in, and add a new accommodation.

---

## Contributing

- Contributions are welcome!  
- Feel free to **star**, **fork**, or **open an issue**.  
- To propose improvements, create a pull request with your changes and a clear description.

---


## Contact

- Project by **Khushi Tiwari**  
- Made with ♥  
- Feel free to contact me via GitHub or include your email for collaboration and feedback.
