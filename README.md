<<<<<<< HEAD
# ShopWave — React eCommerce Website

A modern, production-quality eCommerce storefront built with **React + Vite + Tailwind CSS + React Router DOM + Axios + Context API**, powered by the [Fake Store API](https://fakestoreapi.com).

## ✨ Features

- **Home page** — hero banner, categories, featured & latest products
- **Product listing** — category filter, sorting, pagination, loading skeletons, error states
- **Product details** — image gallery, quantity selector, add to cart / buy now, related products
- **Cart** — quantity controls, remove/clear, coupon codes, shipping & totals, persisted to localStorage
- **Wishlist** — add/remove, move to cart, persisted to localStorage
- **Search** — live debounced search with suggestions dropdown
- **Authentication (frontend-only)** — Login, Register, Forgot Password with validation
- **Checkout** — multi-step shipping → payment → review flow with an order success page
- **Responsive** — optimized for mobile, tablet, desktop, and large screens
- **Animations** — fade-in, slide-up, hover effects, button ripple, page transitions

## 🗂 Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable UI components (Navbar, Footer, ProductCard, etc.)
├── context/          # Context API providers (Cart, Wishlist, Auth, Theme, Toast)
├── hooks/            # Custom hooks (useDebounce, useProducts, useLocalStorage)
├── layouts/          # MainLayout (Navbar + Footer wrapper)
├── pages/            # Route-level pages (Home, Products, Cart, Checkout, etc.)
├── services/         # Axios instance + productService (Fake Store API calls)
├── utils/            # formatters, storage, validators
├── App.jsx           # Route definitions
├── main.jsx          # App entry point + provider tree
└── index.css         # Tailwind directives + global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed

### Installation

```bash
# 1. Extract/clone the project, then move into the folder
cd shopwave-ecommerce

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

### Lint

```bash
npm run lint
```

## 🔌 API

All product data comes from the public [Fake Store API](https://fakestoreapi.com):

- `GET /products` — all products
- `GET /products/:id` — single product
- `GET /products/categories` — category list
- `GET /products/category/:name` — products in a category

## 🎨 Design Tokens

| Token       | Value      |
|-------------|------------|
| Background  | `#FFFFFF`  |
| Primary     | `#2563EB`  |
| Secondary   | `#3B82F6`  |
| Text        | `#111827`  |
| Card        | `#F8F9FA`  |
| Radius      | `16px`     |

## 🧠 State Management

Context API providers (see `src/context`):
- `CartContext` — cart items, totals, coupons, localStorage persistence
- `WishlistContext` — wishlist items, localStorage persistence
- `AuthContext` — frontend-only mock authentication (register/login/logout/reset)
- `ThemeContext` — theme value (light by default)
- `ToastContext` — global toast notifications

## 📝 Notes

- Authentication is **frontend-only** (no real backend) — accounts are stored in `localStorage` for demo purposes.
- Checkout does not process real payments; it simulates the flow end-to-end.
- Coupon codes to try in the cart: `SAVE10`, `SAVE20`, `WELCOME15`.

## 📦 Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router DOM 6
- Axios

---
Built with ❤️ using React, Vite & Tailwind CSS.
=======
# ShopWave
>>>>>>> 8c674e20b7289dd925359733559a2a5c12564b41
