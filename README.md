# 🍽️ Dishcovery — AI-Powered Meal Finder (Frontend)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)](https://github.com/shvirat/dishcovery-v2)
[![Version](https://img.shields.io/badge/version-2.1.1-orange)](https://github.com/shvirat/dishcovery-v2/)

**Dishcovery** is a modern, responsive React application for discovering meals, exploring cuisines, and managing favorites — built with a strong focus on clean fundamentals, smooth UX, and real-world architecture.

This repository contains the **frontend** of Dishcovery, developed using **React + TypeScript**, with elegant animations, real authentication integration, and a scalable structure.

---

## 🚀 Live Links

- 🌐 **Live Website**: https://dishcovery-v2.vercel.app  
- ⚙️ **Backend API**: https://dishcovery-api.vercel.app  
- 🐙 **GitHub Repository**: https://github.com/shvirat/dishcovery-v2 

---

## ✨ Features

- 🔍 **Search Meals** by name or ingredients
- 🍱 **Browse by Category** and **Cuisine**
- 🎲 **Surprise Me** random meal discovery
- ❤️ **Favorites System** (authenticated users)
- 🔐 **Real Authentication**
  - Login & Signup
  - JWT-based session handling
  - Protected routes
- 👤 **User Profile**
  - Update name & password
  - View favorites
  - Logout & delete account
- 🤖 **AI Meal Lab**
  - AI-powered meal image reimagining
- 🎥 **YouTube Recipe Links**
- 🌗 **Dark / Light Mode**
- ⚡ **Smooth Animations** using Framer Motion
- 📱 Fully **Responsive Design**

---

## 🛠 Tech Stack

**Frontend**
- React (TypeScript)
- React Router DOM
- Framer Motion
- Tailwind CSS
- Lucide Icons

**Backend (separate repo)**
- Node.js + Express
- MongoDB
- JWT Authentication

---

## 🔐 Authentication Flow

- JWT stored in `localStorage`
- Token sent via `Authorization: Bearer <token>`
- Session restored using `/api/auth/me`
- Protected routes redirect unauthenticated users to `/login`

---

## 🧠 Design Philosophy

- No unnecessary abstractions
- Clean React patterns
- Minimal but meaningful animations
- Strong separation of concerns
- Production-ready structure

Dishcovery is intentionally built **without heavy frameworks** to emphasize understanding, maintainability, and real-world readiness.

---

## 🧪 Status

- ✅ Core features complete
- 🚧 AI features evolving
- 🚀 Ready for deployment

---

## 🤝 Contributing

Contributions are welcome!

- Keep PRs focused and clean
- Avoid unnecessary dependencies
- Follow existing design & coding style

---

## 📄 License

MIT License  
See the `LICENSE` file for details.

---

## 💬 Final Note

Dishcovery isn’t just a meal app —  
it’s a **learning-focused, real-world React project** built with care, curiosity, and clean engineering principles.

Happy cooking 👨‍🍳✨
