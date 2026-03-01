# Memory Archieve

Memory Archieve is a full-stack application for storing and sharing personal memories. It features a modern React-based frontend built with Next.js and a robust Node.js backend using Express and MongoDB.

## 🚀 Features

- Create, view, and edit memories.
- Image uploads powered by Cloudinary.
- Rate limiting for API protection via Upstash Redis.
- Responsive design using Tailwind CSS.
- Modern frontend with Next.js 15 and React 19.

## 📁 Project Structure

```text
memory-hub/
├── backend/            # Express.js API
│   ├── config/         # Database and third-party service configs
│   ├── controllers/    # API request handlers
│   ├── middleware/     # Custom Express middlewares (e.g., rate limiting)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express API routes
│   └── server.js       # Entry point for the backend
└── frontend/           # Next.js Application
    ├── app/            # Next.js app router (pages and layouts)
    ├── components/     # Reusable React components
    ├── lib/            # Shared utilities (e.g., Axios instance)
    └── public/         # Static assets
```

## 🛠️ Stack

- **Frontend**: [Next.js](https://nextjs.org/), React, Tailwind CSS, Axios, Lucide React.
- **Backend**: [Node.js](https://nodejs.org/), Express, [MongoDB](https://www.mongodb.com/) (Mongoose).
- **Storage**: [Cloudinary](https://cloudinary.com/) (for images).
- **Caching/Rate Limiting**: [Upstash Redis](https://upstash.com/).
- **Package Manager**: [npm](https://www.npmjs.com/).
