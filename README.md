## **Invoice Generator** 🧾

A web-based admin panel for managing customers and generating invoices with GST calculations.

### **Tech Stack** 🛠

### **Frontend:**

- ⚡ **Vite** - Fast development and optimized build
- ⚛️ **React** - Library
- 🏹 **TypeScript** - Type safety and better development experience
- 🎨 **Tailwind CSS**

### **Backend:**

- 🖥 **Node.js** - Backend runtime
- ⚙️ **Express.js** - API handling
- 🔥 **TypeScript** - Ensuring type safety
- 📦 **MongoDB** - Database
- 🔐 **JWT Authentication**

---

## **Features** ✨

✅ **Admin Authentication** - Secure login using email & password

✅ **Customer Adding**

✅ **Invoice Generation** - Generate invoices with:

- **Meter Readings** (Current & Previous)
- **Rent Calculation**
- **Free Copies Adjustment**
- **GST Calculation (CGST/IGST)**
    
    ✅ **Invoice PDF Export**
    

---

## **Installation & Setup** 🚀

### **1️⃣ Clone the Repository**

```
git clone https://github.com/rohitjangirofficial/invoice-generator.git
cd invoice-generator

```

### **2️⃣ Install Dependencies**

### **Frontend:**

```
cd client
npm install
npm run dev

```

### **Backend:**

```
cd server
npm install
npm run dev

```

---

## **Environment Variables** 🌎

Create a `.env` file in the root of both `client` and `server` folders and add the following variables:

**Backend (`server/.env`)**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

**Frontend (`client/.env`)**

```
VITE_API_URL=api_url

```

## **Folder Structure** 📂

```
invoice-generator/
├── client/  # Frontend (Vite + React + TypeScript)
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   ├── tsconfig.json
│   └── package.json
├── server/  # Backend (Node + Express + TypeScript)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── app.ts
│   ├── server.ts
│   ├── tsconfig.json
│   └── package.json
└── README.md
```

---