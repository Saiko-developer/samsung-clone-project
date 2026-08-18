# Samsung Clone Backend

Express + Mongoose backend for the Samsung clone project. This server provides a REST API for all the data that was previously stored in the root `data.json` file.

## Prerequisites

- **Node.js** (v18 or later)
- **MongoDB** — either:
  - Local installation: https://www.mongodb.com/try/download/community
  - MongoDB Atlas (free cloud tier): https://www.mongodb.com/atlas

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

If using **MongoDB Atlas**, your connection string will look like:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/samsung_clone
```

### 3. Seed the database

Import all data from the root `data.json` into MongoDB:

```bash
npm run seed
```

This will create a collection for each top-level key in `data.json`:
| data.json key | Collection | API Endpoint |
|---|---|---|
| `services` | services | `/api/services` |
| `newAndFeatures` | newAndFeatures | `/api/new-and-features` |
| `categories` | categories | `/api/categories` |
| `latestOfferCategories` | latestOfferCategories | `/api/latest-offer-categories` |
| `latestOfferProducts` | latestOfferProducts | `/api/latest-offer-products` |
| `products` | products | `/api/products` |
| `guide` | guide | `/api/guide` |
| `stores` | stores | `/api/stores` |
| `all-products-categories` | all-products-categories | `/api/all-products-categories` |
| `all-products` | all-products | `/api/all-products` |
| `payment-method` | payment-method | `/api/payment-method` |
| `TvGuide` | TvGuide | `/api/tv-guide` |
| `SmartphoneGuide` | SmartphoneGuide | `/api/smartphone-guide` |
| `AppliancesGuide` | AppliancesGuide | `/api/appliances-guide` |
| `samsung_rewards_program` | samsung_rewards_program | `/api/samsung-rewards-program` |
| `samsung_advantage_for_students` | samsung_advantage_for_students | `/api/samsung-advantage-for-students` |
| `samsung_government` | samsung_government | `/api/samsung-government` |
| `business` | business | `/api/business` |
| `monitors` | monitors | `/api/monitors` |

### 4. Start the server

```bash
npm run dev    # Development with nodemon auto-reload
```

```bash
npm start      # Production
```

## API Endpoints

Every collection supports full CRUD operations:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/<collection>` | Get all items |
| `GET` | `/api/<collection>/:id` | Get one item by its `id` field |
| `POST` | `/api/<collection>` | Create a new item |
| `PUT` | `/api/<collection>/:id` | Update an item by its `id` field |
| `DELETE` | `/api/<collection>/:id` | Delete an item by its `id` field |

Examples:

```bash
# Get all products
GET http://localhost:5000/api/products

# Get one product by id
GET http://localhost:5000/api/products/1

# Create a new service
POST http://localhost:5000/api/services
{
  "title": "New Service",
  "description": "Service description",
  "icon": "Sparkles",
  "link": "./services/New"
}

# Update a product
PUT http://localhost:5000/api/products/1
{
  "price": 1099.99
}

# Delete a store
DELETE http://localhost:5000/api/stores/1
```

## Connecting from the Next.js Frontend

The Next.js app runs on `http://localhost:3000` and the backend runs on `http://localhost:5000`. CORS is enabled by default so the frontend can make requests directly.

Example fetch:

```js
const res = await fetch("http://localhost:5000/api/products");
const products = await res.json();
```

Or use the existing Next.js API route as a proxy — the backend also supports matching the original `data.json` key names directly:

```bash
GET http://localhost:5000/api/data/products
GET http://localhost:5000/api/data/services
GET http://localhost:5000/api/data/guide
```

## Folder Structure

```
backend/
├── .env               # Environment variables (not committed)
├── .env.example       # Example environment config
├── package.json       # Dependencies and scripts
├── server.js          # Express server entry point
├── models/
│   └── index.js       # Mongoose models for all collections
├── routes/
│   └── index.js       # API route definitions (CRUD)
└── seed/
    └── seed.js        # Script to import data.json into MongoDB