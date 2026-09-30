# NestJS Practice Projects

A monorepo of practice projects. Each top-level folder is a self-contained project.

## Projects

| Project | Description |
| --- | --- |
| [notenest](./notenest) | Notes app — Next.js frontend (`notenest/frontend`) |
| [AppartmentListing](./AppartmentListing) | Apartment listings — Django REST API + Next.js frontend (`AppartmentListing/frontend`) |

More projects will be added as folders alongside this one.

## Running a project

```bash
cd <project>/<app>
npm install
npm run dev
```

## AppartmentListing setup

Backend (Django), from `AppartmentListing/`:

```bash
python -m venv vnev
vnev\Scripts\activate            # macOS/Linux: source vnev/bin/activate
pip install -r requirements.txt
cp .env.example .env              # then set LLM_API_KEY (Groq API key)
python manage.py migrate
python manage.py seed_listing     # optional: sample data
python manage.py runserver
```

Frontend (Next.js), from `AppartmentListing/frontend/`:

```bash
npm install
cp .env.example .env.local
npm run dev
```

The frontend runs on http://localhost:3000 and talks to the API at http://127.0.0.1:8000.
