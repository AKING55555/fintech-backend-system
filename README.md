# 💰 Finance Dashboard Backend

A role-based financial backend system built using **Node.js, Express, and MongoDB**.  
This project simulates a real-world backend with controlled access, structured architecture, and analytics-driven APIs.

---

## 🚀 Features

### 👥 User & Role Management
- Admin can create users and assign roles
- Roles supported:
  - **Admin** → full control
  - **Analyst** → data access + analytics
  - **Viewer** → read-only access

---

### 🔐 Authentication & Authorization
- JWT-based authentication
- Middleware-based role enforcement
- Protected routes using:
  - `authMiddleware`
  - `requireRole`

---

### 💰 Financial Records
- Create, Read, Update, Delete (CRUD)
- Admin-only write access
- Fields:
  - amount
  - type (income / expense)
  - category
  - notes
  - date

---

### 🔍 Record Filtering
Supports:
- type filter
- category search
- date range filtering
- pagination

Example:

GET /api/records?type=income&category=salary&startDate=2026-01-01

---

### 📊 Dashboard & Analytics

Endpoint:
GET /api/dashboard/summary

Includes:
- Total income & expense
- Net balance
- Category-wise breakdown (with %)
- Monthly trends
- Recent transactions

---

## 🧠 Architecture
Routes → Controllers → Services → Models

### Why this structure?
- Separation of concerns  
- Clean code organization  
- Scalable design  

---

## 🛡️ Role-Based Access Control

| Feature | Admin | Analyst | Viewer |
|--------|------|--------|--------|
| Create Records | ✅ | ❌ | ❌ |
| Update/Delete | ✅ | ❌ | ❌ |
| View Records | ✅ | ✅ | ✅ |
| Dashboard | ✅ | ✅ | ❌ |

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**

---

## 📁 Project Structure
src/ ├── config/ ├── controllers/ ├── middleware/ ├── models/ ├── routes/ ├── services/ └── app.js
server.js

---

## 🔄 Request Flow

1. Request hits route  
2. Middleware validates token & role  
3. Controller handles request  
4. Service processes logic  
5. Model interacts with DB  
6. Response returned  

---

## ⚠️ Error Handling

- 400 → Bad Request  
- 401 → Unauthorized  
- 403 → Forbidden  
- 500 → Internal Server Error  

---

## 📈 Key Highlights

- Role-based system design  
- Aggregation-driven analytics  
- Clean modular architecture  
- Real-world backend simulation  

---

## 🚀 Future Improvements

- Enhanced analytics (weekly trends, forecasting)
- Advanced validation layer
- Performance optimization (caching)
- Production-level logging

---

## ✅ Conclusion

This project demonstrates a scalable backend system with role-based access, financial data management, and real-time analytics. It goes beyond basic CRUD by incorporating structured architecture and aggregation logic for practical, real-world applications.
