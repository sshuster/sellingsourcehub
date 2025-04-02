
# DealFlow - Deal Sourcing Platform

DealFlow is a comprehensive platform connecting business owners looking to sell with private equity investors seeking opportunities.

## Features

- **Authentication System**: Secure login, registration, and user management
- **Dual Dashboards**: Separate interfaces for company owners and private equity investors
- **Company Listings**: Manage and showcase businesses for sale
- **Data Visualization**: Interactive charts and graphs for performance metrics
- **AG Grid Tables**: Powerful data tables for efficient management
- **Flask Backend**: Python backend with SQLite database integration

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Shadcn/UI Components
- AG Grid for data tables
- Recharts for data visualization

### Backend
- Flask (Python)
- SQLite database
- Werkzeug for security

## Running the Project

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend

```bash
# Navigate to backend directory
cd src/backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment (Windows)
venv\Scripts\activate
# OR (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

## Mock Users

For testing purposes, two mock users are included:

1. **Company Owner**
   - Username: `muser`
   - Password: `muser`

2. **Private Equity Investor**
   - Username: `mpe`
   - Password: `mpe`

## Project Structure

- `/src` - React frontend code
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/contexts` - React contexts
  - `/data` - Mock data for frontend
  - `/backend` - Flask backend
    - `app.py` - Main Flask application
    - `schema.sql` - Database schema
