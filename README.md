<p align="center">
  <img src="public/logo.png" alt="Humble Store Logo" width="120">
</p>

<h1 align="center">Humble Store</h1>

<p align="center">
  Premium digital marketplace for creators, video editors, and designers.
</p>

<hr>

## ✨ About Humble Store

Humble Store is a modern digital marketplace built for creative assets and resources.

The store is designed with a dark cinematic interface, pink/fuchsia accents, responsive layouts, product discovery, wishlist, cart, and checkout experiences.

---

## 🚀 Features

- 🛍️ Digital product marketplace
- 🔍 Product search
- ❤️ Wishlist system
- 🛒 Shopping cart
- ➕ Cart quantity controls
- 💳 Checkout interface
- 📦 Product detail pages
- ⭐ Product ratings and reviews
- 🏷️ Product categories and badges
- 📱 Responsive mobile layout
- 🖥️ Desktop sidebar navigation
- ☰ Mobile navigation menu
- 🔔 Toast notifications
- ✨ Animated page elements
- 🎨 Dark cinematic UI
- ⚡ Next.js App Router

---

## 🧰 Tech Stack

- **Next.js**
- **React**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **JavaScript**

---

## 📁 Project Structure

```text
humble-store/
├── public/
│
├── src/
│   ├── app/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── products/
│   │   ├── success/
│   │   └── wishlist/
│   │
│   ├── components/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── product/
│   │   ├── ui/
│   │   └── wishlist/
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── ToastContext.jsx
│   │   └── WishlistContext.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   └── styles/
│
├── package.json
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd humble-store
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📱 Test Humble Store on Your Phone

To preview the local website on another device connected to the same Wi-Fi:

```bash
npm run dev -- --hostname 0.0.0.0
```

Then find your computer's IPv4 address:

```powershell
ipconfig
```

Example:

```text
IPv4 Address : 192.168.29.32
```

Open the following on your phone:

```text
http://192.168.29.32:3000
```

Your phone and computer must be connected to the same network.

---

## 🛒 Shopping Flow

```text
Browse Products
      ↓
Product Details
      ↓
Add to Cart
      ↓
Cart
      ↓
Checkout
      ↓
Success
```

---

## ❤️ Wishlist Flow

```text
Product
   ↓
❤️ Add to Wishlist
   ↓
Wishlist
   ↓
Review Saved Products
```

---

## 🔔 Notifications

Humble Store uses toast notifications for important user actions such as:

- Wishlist changes
- Cart changes
- Quantity updates
- Product actions

---

## 🎨 Design

The interface uses:

- Dark background
- Pink / fuchsia accent colors
- Glass-style surfaces
- Rounded cards
- Smooth animations
- Responsive layouts
- Cinematic product presentation

The design is intended to feel like a premium creative marketplace rather than a generic ecommerce template.

---

## 🔧 Development

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

---

## 🌐 Git Workflow

After making changes:

```bash
git status
```

Add the changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Update Humble Store"
```

Push:

```bash
git push
```

For a new feature:

```bash
git add .
git commit -m "Add wishlist feature"
git push
```

---

## 📌 Current Development

Humble Store is actively being developed.

Current marketplace systems include:

- Product browsing
- Product detail pages
- Wishlist
- Cart
- Checkout UI
- Responsive navigation
- Toast notifications
- Mobile support

More marketplace functionality can be added as development continues.

---

## 👤 Creator

**HUMBLE**

Creative developer and video editor.

- Instagram: https://www.instagram.com/_humble.y_/
- YouTube: https://www.youtube.com/@humbleae
- GitHub: https://github.com/humblelyy
- Portfolio: https://humblepf.vercel.app/

---

## 📄 License

This project is a personal project by HUMBLE.

Please respect the project's source code, assets, branding, and original creative work.

---

<p align="center">
  Built with ❤️ by <strong>HUMBLE</strong>
</p>
