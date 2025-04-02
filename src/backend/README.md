
# DealFlow Backend

This is the backend for the DealFlow application, which provides the API endpoints for the frontend to communicate with.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the server:
   ```
   python app.py
   ```

The server will start at `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST /api/login**: Log in a user
- **POST /api/register**: Register a new user

### Companies

- **GET /api/companies**: Get all companies
- **GET /api/companies/:id**: Get a specific company by ID
- **POST /api/companies**: Create a new company listing

## Database

The application uses SQLite. The database file `dealflow.db` will be created in the same directory as `app.py` when the server is first run.

### Mock Users

For testing, two mock users are automatically created:
1. Company Owner:
   - Username: muser
   - Password: muser

2. Private Equity Investor:
   - Username: mpe
   - Password: mpe
