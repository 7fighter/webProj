Hi, I'm building a full-stack web app called **Requestly**, which is a real-time local marketplace. I've already built the frontend in React (without routing, using state/context for view control). The component structure includes:

- `LandingPage` shown when no user is logged in.
- `AuthModal` for login/register that sets the user in a global context (`AppContext`).
- Once logged in, the app shows `BuyerDashboard` or `SellerDashboard` based on user role.
- Features like Chat (`ChatSystem`), Notifications, and Profile are toggled via local `useState` in `App.tsx`.
- All data so far is mock (`mockData.ts`) and there’s no real API yet.

---

We just started working on the backend with the following stack:

**Backend Tech:**
- Node.js, Express, MongoDB Atlas, Mongoose
- JWT + bcrypt for authentication
- Socket.IO for real-time chat
- Axios on frontend for API calls

We’ve completed **Phase 1: Backend Setup**, which includes:
- Initializing the project (`npm init`)
- Installing dependencies (`express`, `mongoose`, `dotenv`, `bcrypt`, `jsonwebtoken`, `cors`, `socket.io`)
- Folder structure:


- Created a basic `server.js` with express server and MongoDB connection
- `.env` file with `MONGO_URI`, `PORT`, and `JWT_SECRET`

---
## pahse 2 
Now we are about to begin **Phase 2: Auth System**, which includes:
- Creating a User model (name, email, password, role)
- Creating `/api/auth/register` and `/api/auth/login` routes
- Hashing passwords with bcrypt
- Generating JWT tokens
- Writing authentication middleware
- Protecting routes by role (buyer/seller)

Please continue from this exact point and help me build Phase 2 of the backend.
 ✅ Phase 2 Complete!
Now you have:

A working user model

Password security with bcrypt

JWT-based auth system

Register and login APIs

Middleware to protect future routes

## pahse 3 
🔜 Phase 3: User Role Access & Dashboard APIs
In the next phase, we’ll:

Create protected routes for buyers and sellers

Start building request/deal APIs

Tie them to the user (with role-based control) 