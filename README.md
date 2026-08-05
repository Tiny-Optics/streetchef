# StreetChef

StreetChef is a street-food delivery web application. Customers browse the menu, save favorites, manage delivery addresses, and place pay-on-delivery orders. Merchants run a kitchen dashboard with menu management and order fulfillment. Drivers claim available deliveries, update status, and view earnings.

## Features

### Customer

- Email/password sign-up and sign-in (role: `customer`)
- Browse and search the menu, view item details
- Favorites, saved delivery addresses, profile editing
- Cart and checkout with **pay on delivery** (cash on delivery)
- Order history and live order tracking

### Merchant

- Sign up as a merchant with kitchen details
- Dashboard (today’s sales, active orders)
- Menu CRUD and search
- View and update order status

### Driver

- Sign up as a driver with vehicle details
- List available orders, accept assignments
- Update delivery status and mark orders complete
- Earnings summary (fee based on order totals)

### Shared

- User settings (notifications, preferences)
- Help and legal content APIs
- Onboarding, location, and account UI

### Not implemented

- **Online payments** — `GET /api/payment` returns `501`; checkout uses pay-on-delivery only
- **Phone OTP** — verify-code UI is present but not wired to a backend
- **Social login** — only Better Auth email/password is enabled

## Tech stack

| Layer    | Stack                                      |
| -------- | ------------------------------------------ |
| Frontend | React 19, Vite, React Router, Tailwind CSS |
| Backend  | Node.js, Express, TypeScript               |
| Auth     | [Better Auth](https://www.better-auth.com) (MongoDB adapter) |
| Database | MongoDB (local Docker or MongoDB Atlas)    |
| Dev ops  | Docker Compose, Makefile                   |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Make](https://www.gnu.org/software/make/) (optional; simplifies Compose commands)

For running services outside Docker: Node.js 20+ and a MongoDB instance (local or Atlas).

## Quick start

1. **Clone the repository**

   ```bash
   git clone https://github.com/tiny-optics/streetchef.git
   cd streetchef
   ```

2. **Configure environment**

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   Edit `backend/.env`:

   - Set `BETTER_AUTH_SECRET` (e.g. `openssl rand -base64 32`)
   - Set `MONGODB_URI` (see [Development](#development))
   - Keep `BETTER_AUTH_URL=http://localhost:4000` and `FRONTEND_URL=http://localhost:3000` when using Docker (browser URLs, not Docker service names)

   The frontend defaults work for local Docker; `VITE_API_URL` can stay empty so Vite proxies `/api` to the backend.

3. **Start the stack**

   ```bash
   make build
   ```

   - Frontend: http://localhost:3000  
   - Backend API: http://localhost:4000  
   - Health: http://localhost:4000/health  

   Other useful commands: `make up`, `make down`, `make logs`, `make clean` (removes volumes including `node_modules` caches). Run `make help` for the full list.

## Environment variables

### Backend (`backend/.env`)

| Variable            | Required | Description |
| ------------------- | -------- | ----------- |
| `PORT`              | No       | API port (default `4000`) |
| `MONGODB_URI`       | Yes      | MongoDB connection string. Use `mongodb://mongo:27017/streetchef` with local Docker; Atlas `mongodb+srv://.../streetchef`. `MONGO_URI` is accepted but deprecated. |
| `BETTER_AUTH_SECRET`| Yes      | Session signing secret (32+ characters) |
| `BETTER_AUTH_URL`   | Yes      | Public API URL for auth callbacks (e.g. `http://localhost:4000`) |
| `FRONTEND_URL`      | Yes      | Frontend origin for CORS and trusted origins (e.g. `http://localhost:3000`) |

### Frontend (`frontend/.env`)

| Variable                 | Required | Description |
| ------------------------ | -------- | ----------- |
| `VITE_API_URL`           | No       | Absolute API base URL. Leave empty to use the Vite dev proxy. |
| `VITE_API_PROXY_TARGET`  | No       | Proxy target when `VITE_API_URL` is empty (default `http://localhost:4000`; Docker sets `http://backend:4000`) |
| `GEMINI_API_KEY`         | No       | Optional; not required for core flows |

Do not commit `.env` files or real secrets.

## Production domain setup

To serve the app on `https://app.streetchef.co.za`:

1. Create a DNS `A` record for `app.streetchef.co.za` pointing to `169.255.58.159`.
2. Add a GitHub Actions secret named `CERTBOT_EMAIL` with the email address to use for Let's Encrypt. If you skip this, deploy falls back to `EMAIL_FROM` and then `SMTP_USER` from `backend/.env`.
3. Push the production nginx config from `deploy/nginx/streetchef.conf` to `main`.

The deploy workflow will then:

- ensure `/opt/streetchef/backend/.env` uses:
  - `BETTER_AUTH_URL=https://app.streetchef.co.za/api/auth`
  - `FRONTEND_URL=https://app.streetchef.co.za`
- install nginx and certbot on the VPS if needed
- install a bootstrap HTTP nginx config on first deploy
- request the initial Let's Encrypt certificate for `app.streetchef.co.za`
- switch nginx to the HTTPS config from the repo
- reload nginx
- recreate the backend and frontend containers

The first deploy will fail if DNS is not already pointing at the VPS and there is no usable email in either `CERTBOT_EMAIL`, `EMAIL_FROM`, or `SMTP_USER`.

## Development

### MongoDB: local Docker vs Atlas

The `mongo` service uses the Compose profile `local`. The Makefile defaults to including it:

```bash
# Local MongoDB in Docker (default)
make build
# MONGODB_URI in backend/.env:
#   mongodb://mongo:27017/streetchef
```

For **MongoDB Atlas**, skip the local container and point the backend at your cluster:

```bash
COMPOSE_PROFILES= make build
```

In `backend/.env`:

```text
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/streetchef
```

Include `/streetchef` in the path so data uses the `streetchef` database. In Atlas, allow your IP under **Network Access** (or `0.0.0.0/0` for dev only).

### Running without Docker

```bash
# Terminal 1 — MongoDB on localhost, then:
cd backend && npm ci && npm run dev

# Terminal 2
cd frontend && npm ci && npm run dev
```

Use `MONGODB_URI=mongodb://localhost:27017/streetchef` when MongoDB runs on the host.

The backend seeds sample menu data on startup.

## API overview

All authenticated REST routes expect a Better Auth session cookie from sign-in.

| Path | Auth | Description |
| ---- | ---- | ----------- |
| `/api/auth/*` | — | Better Auth (sign-up, sign-in, sign-out, session, password reset) |
| `GET /health` | — | Health check |
| `GET /api/menu`, `GET /api/menu/:id` | — | Public menu (optional `?q=` search) |
| `/api/addresses` | Session | CRUD delivery addresses |
| `/api/orders` | Session | List/create orders; `PATCH /:id/status` (merchant/driver) |
| `/api/favorites` | Session | List/add/remove favorite menu items |
| `/api/profile` | Session | Get/update profile |
| `/api/merchant/*` | Merchant | Dashboard, menu CRUD/search |
| `/api/driver/*` | Driver | Available/active orders, accept, status, earnings |
| `/api/settings` | Session | User settings |
| `/api/content/help`, `/api/content/legal` | — | Static help and legal copy |
| `GET /api/payment` | — | Returns `501` (payments disabled) |

User roles (`customer`, `merchant`, `driver`) are set at sign-up via Better Auth additional fields.

## Testing checklist

Smoke-test the main flows after `make build`:

1. **Health** — `curl http://localhost:4000/health` returns `{"status":"ok"}`.
2. **Customer** — Sign up → browse menu → add to cart → set address → checkout (pay on delivery) → track order on **My Order**.
3. **Merchant** — Sign up with merchant type → open dashboard → add/edit menu item → confirm new customer order appears → advance order status.
4. **Driver** — Sign up with driver type → view available orders → accept → update status to completed → check earnings.
5. **Settings** — Update profile/settings; open Help and Privacy pages.
6. **Payments** — `curl http://localhost:4000/api/payment` returns `501`.

## Project structure

```text
streetchef/
├── backend/          # Express API, Better Auth, MongoDB
├── frontend/         # React + Vite SPA
├── docker-compose.yml
└── Makefile
```

## License

See repository license files where applicable.
