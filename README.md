# 🏘️ Neighborhood Services API

## 📌 Overview
The **Neighborhood Services API** is a full-stack web application designed to connect users with local service providers such as electricians, plumbers, tutors, and cleaners.

The system consists of:
- A **Django REST Framework backend** that handles business logic, authentication, and data management
- A **React (Next.js) frontend** that provides a user-friendly interface for interacting with the platform

The goal of this project is to build a scalable, secure, and maintainable system that supports real-world service discovery within local communities.

## 🌐 Frontend Integration (Full-Stack)

In addition to the backend API, this project is being integrated with a frontend application built using React (Next.js).

The frontend is designed to provide an intuitive user interface that interacts with the API for real-time data operations.

### Frontend Features
- User authentication (login/register UI)
- Service browsing and search interface
- Service creation and management dashboard
- Favorites and reviews interaction
- Responsive and clean UI design

### Integration Approach
- REST API consumption using HTTP requests (Axios / Fetch)
- Token-based authentication using JWT
- Separation of concerns between frontend and backend

> Note: The frontend is currently under development and actively being integrated with the backend API.

## 🚀 Key Features

### 🔐 Authentication & User Management
- JWT-based authentication (Register, Login, Logout)
- Secure user profile creation and updates

### 🛠️ Service Management
- Full CRUD for service listings
- Role-based permissions (only owners can modify their services)
- Structured and scalable data models

### 🗂️ Categories
- List all categories
- Admin-only creation, update, and deletion

### 🔍 Search & Filtering
- Search services by keyword
- Filter by category and location
- Optimized querying for better performance

### ⭐ Favorites System
- Add/remove services to favorites
- Retrieve user-specific favorites

### 💬 Reviews & Ratings
- Users can review services
- CRUD operations per review
- Linked to both user and service

### 🧪 Testing
- Unit tests covering:
  - Authentication
  - Services
  - Categories
  - Reviews
  - Favorites

---

## 🧰 Tech Stack

- **Backend:** Python, Django, Django REST Framework  
- **Authentication:** JWT (`djangorestframework-simplejwt`)  
- **Database:** PostgreSQL (production-ready) / SQLite (development)  
- **Testing:** Django TestCase  
- **Tools:** Git, GitHub  

---

## 📁 Project Structure
 

neighborhood-services-api/
│
├── backend/
│ ├── users/
│ ├── services/
│ ├── categories/
│ ├── reviews/
│ ├── favorites/
│  ├── manage.py
├── frontend/ # React / Next.js app
│
└── README.md
---

## ⚙️ Setup Instructions

### 1. Clone repository
```bash
git clone https://github.com/kazeemj565/neighborhood-services-api.git
cd neighborhood-services-api
2. Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
3. Install dependencies
pip install -r requirements.txt
4. Run migrations
python manage.py makemigrations
python manage.py migrate
5. Create superuser
python manage.py createsuperuser
6. Start server
python manage.py runserver
🔐 Authentication

After login, include the JWT access token in your request headers:

Authorization: Bearer <your_access_token>
📮 API Endpoints (Overview)
👤 Users
POST /api/users/register/
POST /api/users/login/
GET /api/profile/
PUT /api/profile/update/
📦 Categories
GET /api/categories/
POST /api/categories/ (Admin only)
PUT /api/categories/<id>/
DELETE /api/categories/<id>/
🛠️ Services
GET /api/services/
POST /api/services/
GET /api/services/<id>/
PUT /api/services/<id>/
DELETE /api/services/<id>/
🔍 Search & Filter
GET /api/services/search/?query=plumber
GET /api/services/filter/?category_id=1&location=Kaduna
💬 Reviews
GET /api/services/<service_id>/reviews/
POST /api/services/<service_id>/reviews/
PUT /api/reviews/<id>/
DELETE /api/reviews/<id>/
⭐ Favorites
POST /api/favorites/add/
GET /api/favorites/
DELETE /api/favorites/<id>/delete/
🧠 Key Challenges & Learnings
1. Designing a Modular Architecture

Structuring the project into multiple apps (users, services, reviews, favorites) required careful planning to maintain separation of concerns and scalability.

2. Implementing Secure Authentication

Handling JWT authentication while protecting endpoints and managing user-specific data access required a deep understanding of request authorization and middleware behavior.

3. Managing Relationships Between Models

Designing relationships between users, services, reviews, and favorites required balancing flexibility with performance, especially for query-heavy features like filtering and reviews.

4. Building Efficient Filtering

Ensuring filtering and search features remained efficient pushed me to explore optimized query handling and Django filtering techniques.

🔮 Future Improvements
Geolocation-based service discovery (Google Maps API)
Profile image upload
Admin moderation tools
Docker-based deployment
CI/CD pipeline integration
📊 Entity Relationships
User → Service (One-to-Many)
Service → Category (Many-to-One)
User → Review (One-to-Many)
Service → Review (One-to-Many)
User ↔ Favorites (Many-to-Many)
👨‍💻 Author

Kazeem Jamiu Shina
Backend Developer

GitHub: https://github.com/kazeemj565
LinkedIn: https://github.com/kazeemj565