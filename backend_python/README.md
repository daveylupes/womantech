# WomanTech Connect - FastAPI Backend

A modern FastAPI backend for the WomanTech Connect blockchain-based mentorship platform.

## Features

- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **PostgreSQL**: Primary database
- **JWT Authentication**: Secure token-based authentication
- **Stripe Integration**: Payment processing
- **Pydantic**: Data validation and serialization
- **CORS Support**: Cross-origin resource sharing

## Setup

### 1. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file in the root directory (optional for development):

```env
# Database (SQLite for development, PostgreSQL for production)
DATABASE_URL=sqlite:///./womantech.db

# JWT
JWT_SECRET_KEY=your-secret-key-change-in-production

# CORS
CORS_ORIGIN=http://localhost:3000

# Stripe (optional)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
DEBUG=True
```

### 4. Database Setup

For development, SQLite is used by default and will be created automatically.
For production, use PostgreSQL and update the DATABASE_URL in your .env file.

### 5. Run the Application

```bash
# Easy way (recommended)
./start.sh

# Or manually
python run.py

# Or using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, you can access:

- **Interactive API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Project Structure

```
backend_python/
├── app/
│   ├── api/           # API routers
│   ├── core/          # Core configuration
│   ├── models/        # SQLAlchemy models
│   ├── schemas/       # Pydantic schemas
│   ├── services/      # Business logic
│   └── utils/         # Utility functions
├── main.py            # FastAPI application
├── requirements.txt   # Python dependencies
└── README.md         # This file
```

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `GET /api/users/me` - Get current user (requires auth)
- `GET /api/users/search` - Search users
- `GET /api/users/{wallet_address}` - Get user by wallet address

### Sessions
- `GET /api/sessions` - Get all sessions (placeholder)

### Payments
- `GET /api/payments` - Get all payments (placeholder)

## Development

### Adding New Models

1. Create a new model in `app/models/`
2. Create corresponding schemas in `app/schemas/`
3. Add API endpoints in `app/api/`
4. Update the main application to include new routers

### Database Migrations

For production, consider using Alembic for database migrations:

```bash
# Initialize Alembic
alembic init alembic

# Create a migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head
```

## Contributing

1. Follow PEP 8 style guidelines
2. Add type hints to all functions
3. Write docstrings for all public functions
4. Test your changes before submitting

## License

MIT License
