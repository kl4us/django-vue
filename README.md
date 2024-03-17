# Django and Vue.js starter template

Starter template for projects based on Django framework as backend and Vue.js as frontend. 
Used for this template Django 4.2 and Vue.js 3

## BACKEND: Django

This Django application use 
- djoser for user authentication
- SQLite database

### How to start

```bash
cd backend
virtualenv venv
source venv/bin/activate
pip install -r requirements
python manage.py migrate
python manage.py createsuperuser
```

## FRONTEND: Vue.js

This Vue.js application use 
- Pinia for state management
- js-cookie for cookies
- axios for API call
- vue-i18n for internazionalitation
- vue-router for routing SPA
- bootstrap for the style

### How to start

```bash
cd frontend
npm install
npm run dev
```