# Auth0 Private Area Access

This is a minimal full-stack web application that demonstrates secure authentication and permission-based access control using **Auth0**, **React**, and **Node.js (Express)**.

The application allows a user to:
- Log in securely using **Auth0 Universal Login**

- View a **protected private area** only if they have the proper permission (`read:privatearea`)

- View **their profile data** (email, name, picture, sub, etc.) fetched securely from Auth0

- Log out and end the session properly both locally and in Auth0

---

## Tech Stack

**Frontend:** React (Create React App)  
**Backend:** Node.js + Express  
**Auth & Security:** Auth0 (Authorization Code Flow), JWT verification, permission-based access (RBAC)  
**Communication:** REST API (JSON), axios/fetch

---

## Features

 - Auth0 Universal Login (Google & default login methods supported)  
 
 - Secure logout — session is ended both locally and in Auth0  
 
 - JWT is validated in backend using `express-oauth2-jwt-bearer`  
 
 - Protected endpoint `/privatearea` — accessible **only with correct permission**  
 
 - If permission is missing → receives `403 Access denied — insufficient permissions`  
 
 - User profile is displayed (email, name, avatar, etc.) when permission is valid  
 
 - Clean separation: frontend, token proxy, protected API

---

## Project Structure

ZADANIE_KWALIFIKACYJNE/

├─ client-frontend/     → React UI (login, logout, private area view)

├─ client-backend/      → Auth code → token exchange (Auth0 proxy)

└─ privatearea-api/     → Protected backend API secured by Auth0 + permissions

---

## How to Run (manual start, 3 terminals)

1. Start Auth Proxy (token exchange)
cd client-backend
node index.js

2. Start Secured API
cd privatearea-api
node index.js

3. Start Frontend
cd client-frontend
npm install   # but only the first time you use it
npm start

Once started, the frontend should open automatically.
If not, open it manually:
http://localhost:3000

---

## Usage Scenario

- Click Log In → Auth0 Universal Login will appear

- After successful login → React redirects to /privatearea

- If user has read:privatearea permission → sees full profile (name, email, picture, etc.)

- If permission is missing → sees "Access denied — insufficient permissions"

- Click Log Out → session is terminated in Auth0 + user is returned to the homepage

---

## Notes

- JWT validation and permission checks happen entirely in the backend.

- The frontend never trusts itself — it only displays data returned from secured API.

- Flexible architecture — easy to extend with roles, write access or admin panel later.

---

## Security Notes

- Access tokens are never stored or exposed in the browser.

- All token validation happens on the backend using official Auth0 middleware.

- The frontend has no access to the Auth0 client secret.

- Permission-based access ensures that even authenticated users cannot reach protected data without `read:privatearea`.

---

## Bonus Features

- Permission-based access using Auth0 RBAC (read:privatearea)

- Proper 403 Access Denied behavior for unauthorized users

- Clean separation of 3-layer architecture (frontend + token exchange proxy + secure API)

- Auth0 Universal Login supports Sign Up out of the box
