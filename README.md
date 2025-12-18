# 📊 MyDayTracker

> A powerful time tracking web application built with modern technologies for seamless task management and productivity monitoring.

## ✨ Overview

**MyDayTracker** is a comprehensive time tracker that enables users to log tasks with precise start and end times, securely store them in Firebase Firestore, and visualize their productivity through an intuitive dashboard interface.

---

## 🎯 Features

### 🔐 **User Authentication**
- Secure signup and login using **Firebase Email/Password Authentication**
- Protected dashboard routes accessible only to authenticated users

### 📈 **Dashboard**
- Add new tasks with customizable start and end times
- Automatic duration calculation for accurate time tracking
- View all tasks in a clean, sortable table format
- Edit and delete tasks with ease

### 🔥 **Firestore Integration**
- Private task storage for each user
- Real-time data synchronization
- Secure and scalable cloud database

### 🎨 **Responsive UI**
- Modern styling with **Tailwind CSS**
- Fully responsive design for desktop and mobile devices
- Intuitive user interface for optimal user experience

### 🚀 **Deployment Ready**
- Optimized for production hosting on **Netlify**
- Fast build process with Vite

---

## 📂 Project Structure

```
src/
 ├─ components/
 │   ├─ TaskForm.tsx         # Form component for adding tasks
 │   ├─ TaskTable.tsx        # Table component for displaying tasks
 │   └─ ProtectedRoute.tsx   # Route protection component
 │
 ├─ context/
 │   └─ AuthContext.tsx      # Authentication state management
 │
 ├─ firebase/
 │   └─ firebaseConfig.ts    # Firebase initialization and configuration
 │
 ├─ pages/
 │   ├─ Login.tsx            # Login page
 │   ├─ Signup.tsx           # Signup page
 │   └─ Dashboard.tsx        # Main dashboard page
 │
 ├─ App.tsx                  # Root application component
 └─ index.tsx                # Application entry point
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React, Vite, TypeScript, Tailwind CSS |
| **Backend & Database** | Firebase Authentication & Firestore |
| **Routing** | React Router DOM |
| **Deployment** | Netlify |

---

## 🔧 Setup Instructions

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/<your-username>/mydaytracker.git
cd mydaytracker
```

### **Step 2: Install Dependencies**

```bash
npm install
```

### **Step 3: Configure Firebase**

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password method)
3. Enable **Firestore Database**
4. Copy your Firebase configuration and update `src/firebase/firebaseConfig.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### **Step 4: Start Development Server**

```bash
npm run dev
```

Navigate to `http://localhost:5173/` in your browser.

### **Step 5: Build for Production**

```bash
npm run build
```

Production-ready files will be generated in the `dist/` folder. Deploy to **Netlify** for hosting.

---

## 🗺️ Routing Behavior

| Route | Description |
|-------|-------------|
| `/` | Automatically redirects to `/login` |
| `/login` | User login page |
| `/signup` | User registration page |
| `/dashboard` | Protected dashboard (requires authentication) |

---

## 👨‍💻 Author

**Kavindu Hansana**

- 🐙 GitHub: [@kavinduhcolombage](https://github.com/kavinduhcolombage)
- 💼 LinkedIn: [Kavindu Hansana](https://www.linkedin.com/in/kavindu-hansana)

---

<div align="center">

**Built with ❤️ using React, Firebase, and Tailwind CSS**

⭐ Star this repository if you find it helpful!

</div>
