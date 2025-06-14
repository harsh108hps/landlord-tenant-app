# 🏠 Tenant-Landlord Portal

A modern, responsive, and full-stack communication platform that enables seamless interaction between **tenants** and **landlords**. Built using **React + Vite**, **Firebase**, and **TailwindCSS**, the app allows users to manage rent payments, maintenance issues, scheduling, live chat, and profile details — with support for multiple languages and dark mode.

---
### ABOUT
Name: Harsh Pratap Singh
Student Code: fsd25_05006 
Email: harshpratapingh39900@gmail.com
### Live link demo:

## 🚀 Features

### 🔐 Authentication & Roles
- Firebase Authentication (Email/Password)
- Role-based redirection (Tenant vs Landlord)

### 📊 Dashboards
- **Tenant Dashboard**: Overview, maintenance, payments, and chat
- **Landlord Dashboard**: Track issues, manage tenants, approve schedules

### 🛠️ Maintenance Request & Scheduling
- Tenants submit maintenance issues
- Schedule repair appointments via calendar
- Landlords approve or reschedule with real-time updates

### 💬 Real-Time Chat
- Instant messaging between tenants and landlords

### 💸 Rent Payment Tracker
- Tenants view history and due payments
- Landlords see all tenant statuses

### 📅 Maintenance Appointments
- Appointment system synced with Firebase Realtime DB

### 🌐 Language Switcher
- i18next + JSON translations (English, Hindi)
- Language preference saved in `localStorage`

### 🌙 Dark Mode Support
- Toggle in Navbar
- Persistent theme using `localStorage`

### 👤 Profile Management
- Edit name, phone, profile image
- Stored under `users/{uid}` in Firestore

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS (JIT mode)
- **State Management**: React Context API
- **Routing**: React Router v6
- **Database**: Firebase Firestore + Realtime Database
- **Authentication**: Firebase Auth
- **Language Support**: i18next + react-i18next

---

## 📂 Folder Structure



## 📁 Folder Structure

```bash
src/
├── components/         # Reusable UI components (Navbar, Footer, etc.)
├── contexts/           # Auth context for login state
├── pages/              # All application pages
│   ├── LandingPage.jsx
│   ├── Login.jsx / Signup.jsx
│   ├── Dashboard.jsx               # Tenant Dashboard
│   ├── LandlordDashboard.jsx      # Landlord Dashboard
│   ├── LandlordConsole.jsx        # Console to handle tenant requests
│   ├── Maintenance.jsx            # Maintenance submission/tracking
│   ├── Chat.jsx                   # Real-time chat interface
│   ├── Payments.jsx               # Rent payment tracking
│   └── IssueTracker.jsx           # Detailed issue status
├── App.jsx              # Main app routes and layout
├── firebase.js          # Firebase config file
└── index.css / main.jsx
