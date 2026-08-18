# Samsung Clone Admin Dashboard

Admin dashboard for managing all project data through the Express + Mongoose backend.

## Features

- 📊 **Overview Dashboard** — see all collections and item counts at a glance
- 📁 **19 Collection Managers** — full CRUD for every collection in `data.json`
- 🔍 **Search** — filter items across all fields
- 👁️ **View Details** — inspect full item data including nested objects
- ✏️ **Edit Items** — modify any field with JSON-aware form inputs
- ➕ **Create Items** — add new items to any collection
- 🗑️ **Delete Items** — remove items with confirmation

## Prerequisites

- **Node.js** (v18 or later)
- **Backend running** on `http://localhost:5000` (see `../backend/README.md`)

## Setup

### 1. Install dependencies

```bash
cd admin
npm install
```

### 2. Start the admin dashboard

```bash
npm run dev
```

The dashboard will run at `http://localhost:5173` and proxy API requests to the backend at `http://localhost:5000`.

## Usage

1. **Start the backend** first:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the admin dashboard** in a separate terminal:
   ```bash
   cd admin
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Collections Managed

| Collection | Description |
|---|---|
| Services | Samsung services (Rewards, Care+, Delivery, Plans) |
| New & Features | Featured products |
| Categories | Product categories |
| Latest Offer Categories | Offer category groupings |
| Latest Offer Products | Products with active offers |
| Products | Main product catalog |
| Guide | Buying guide cards |
| Stores | Special store sections |
| All Products Categories | All-products category navigation |
| All Products | Full product listings with variants |
| Payment Methods | Accepted payment options |
| TV Guide | TV buying guide videos |
| Smartphone Guide | Smartphone buying guide |
| Appliances Guide | Appliance product guides |
| Samsung Rewards | Rewards program content |
| Student Advantage | Student discount program |
| Government | Government solutions |
| Business | Business solutions |
| Monitors | Monitor product guides |

## Folder Structure

```
admin/
├── index.html              # Vite entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite config with API proxy
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Route definitions
│   ├── api/
│   │   └── client.js       # API client and collection metadata
│   ├── components/
│   │   ├── Layout.jsx      # Sidebar + main layout
│   │   ├── DataTable.jsx   # Table view of collection items
│   │   ├── ItemForm.jsx    # Create/edit form modal
│   │   └── ItemDetailModal.jsx  # Full item detail view
│   ├── pages/
│   │   ├── Dashboard.jsx   # Overview with collection stats
│   │   └── CollectionPage.jsx  # CRUD page for a collection
│   └── styles/
│       └── globals.css     # Global styles