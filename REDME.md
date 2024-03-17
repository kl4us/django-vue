# BACKEND: Django

This Django application use 
- djoser for user authentication
- SQLite database

## How to start

```bash
cd backend
virtualenv venv
source venv/bin/activate
pip install -r requirements
python manage.py migrate
python manage.py createsuperuser
```

# FRONTEND: Vue.js

This Django application use 
- Pinia for state management
- js-cookie for cookies
- axios for API call
- vue-i18n for internazionalitation
- vue-router for routing SPA
- bootstrap for stuling

## How to start

```bash
cd frontend
npm install
npm run dev
```