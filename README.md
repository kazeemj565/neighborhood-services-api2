# neighborhood-services-api2

Sure, here's a complete `README.md` content based on **all your implementations so far** for the **Neighborhood Services API** project:

---

```markdown
# 🏘️ Neighborhood Services API

The **Neighborhood Services API** is a Django RESTful backend application designed to enable users in a local community to **list** and **find service providers** such as electricians, plumbers, tutors, and cleaners. It acts as a **digital noticeboard** for neighborhoods to support local businesses and foster community connections.

---

## 🚀 Features Implemented (Phase 1–5)

### ✅ User Authentication (Phase 1–3)
- **User Registration**
- **JWT-based Login & Logout** (DRF Simple JWT)
- **User Profile View & Update**
- Token refresh, rotation, and blacklist implemented

### ✅ Service Listings (Phase 4)
- Users can create, view, update, and delete services
- Services belong to both a user and a category
- Permissions enforced so only owners can edit/delete their services
- Fields include:
  - `title`, `description`, `price`, `category`, `location`, `availability`, and timestamps

### ✅ Category Management (Phase 5 - in progress)
- List all categories (public)
- Admin-only: Create, Update, Delete categories

### ✅ Search & Filter Services (Phase 5)
- Search services by keyword in title or description
- Filter services by category or location

### ✅ Reviews (Phase 6 - in progress)
- Users can post reviews on services
- Each review includes: `rating`, `comment`, `service`, `user`
- Only review authors can update/delete their reviews
- List all reviews for a service

---

## 📦 Project Structure

```
neighborhood-services-api/
├── users/              # Handles user registration, login, profile
├── services/           # Service model and CRUD views
├── categories/         # Admin CRUD for service categories
├── reviews/            # Reviews system
├── favorites/          # (Upcoming) Favorite services
├── search/             # Custom search and filter logic
├── core/               # Settings, urls, utils
└── tests/              # Unit tests for each app
```

---

## 🧪 Tests

- Unit tests written using `django.test.TestCase`
- Tests cover:
  - User registration and login
  - Service listing CRUD
  - Category listing and admin actions
  - Reviews creation and permission enforcement

Run all tests with:
```bash
python manage.py test
```

---

## 📄 API Endpoints Overview

### 🔐 Auth Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/api/users/register/` | Register new user |
| POST   | `/api/users/login/`    | Login and receive JWT |
| POST   | `/api/token/refresh/`  | Refresh access token |
| GET    | `/api/users/profile/`  | View user profile |
| PUT    | `/api/users/profile/update/` | Update user profile |

### 🛠️ Service Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/services/`             | List all services |
| GET    | `/api/services/<id>/`        | View specific service |
| POST   | `/api/services/create/`      | Create a new service |
| PUT    | `/api/services/<id>/update/` | Update user's own service |
| DELETE | `/api/services/<id>/delete/` | Delete user's own service |

### 📂 Category Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/categories/`             | List all categories |
| POST   | `/api/categories/`             | Add new category (admin) |
| PUT    | `/api/categories/<id>/`        | Update category (admin) |
| DELETE | `/api/categories/<id>/`        | Delete category (admin) |

### 🔎 Search & Filter
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/services/search/?query=<keyword>` | Search by keyword |
| GET    | `/api/services/filter/?category_id=&location=` | Filter by category/location |

### ⭐ Review Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/services/<service_id>/reviews/`        | List all reviews for a service |
| POST   | `/api/services/<service_id>/reviews/create/` | Post a new review |
| PUT    | `/api/reviews/<id>/update/`                  | Update a review (owner only) |
| DELETE | `/api/reviews/<id>/delete/`                  | Delete a review (owner only) |

---

## ⚙️ Technologies Used

- Python 3.12+
- Django 5.x
- Django REST Framework
- Simple JWT (for authentication)
- PostgreSQL (default database)
- SQLite (for local development)
- Docker (optional for deployment)
- Supabase (remote database testing)

---

## 🗂️ Environment Setup

```bash
git clone https://github.com/yourusername/neighborhood-services-api.git
cd neighborhood-services-api
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Set up .env variables (DB credentials, SECRET_KEY, etc.)
# Then run migrations:
python manage.py makemigrations
python manage.py migrate

# Run the dev server
python manage.py runserver
```

---

## 📌 Roadmap

- [x] Phase 1–3: Auth + Profiles
- [x] Phase 4: Service Listings
- [x] Phase 5: Categories + Search
- [x] Phase 6: Reviews
- [ ] Phase 7: Favorites
- [ ] Phase 8: Geolocation support (Google Maps)
- [ ] Phase 9: Deployment & Documentation Finalization

---

## 📬 Contributions & Feedback

Feel free to fork, submit pull requests, or open issues for suggestions!  
This project was built as part of a capstone to demonstrate Django API development skills.

---

## 📜 License

MIT License – free for personal or commercial use.
```

---

