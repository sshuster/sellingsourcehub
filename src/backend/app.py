
from flask import Flask, request, jsonify, g
import sqlite3
import os
import json
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
DATABASE = "dealflow.db"

# Helper function to get database connection
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Initialize the database
def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

        # Insert mock users for testing
        cursor = db.cursor()
        cursor.execute(
            "INSERT OR IGNORE INTO users (username, password, email, name, user_type) VALUES (?, ?, ?, ?, ?)",
            ('muser', generate_password_hash('muser'), 'owner@example.com', 'Mock Company Owner', 'company')
        )
        cursor.execute(
            "INSERT OR IGNORE INTO users (username, password, email, name, user_type) VALUES (?, ?, ?, ?, ?)",
            ('mpe', generate_password_hash('mpe'), 'investor@example.com', 'Mock Private Equity', 'investor')
        )
        db.commit()

# Create database if it doesn't exist
if not os.path.exists(DATABASE):
    with app.app_context():
        init_db()

# API Routes
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    db = get_db()
    user = db.execute(
        'SELECT * FROM users WHERE username = ?', (username,)
    ).fetchone()
    
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid username or password"}), 401
    
    # Return user info without password
    return jsonify({
        "id": user['id'],
        "username": user['username'],
        "name": user['name'],
        "email": user['email'],
        "type": user['user_type']
    })

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    required_fields = ['username', 'password', 'email', 'name', 'type']
    
    # Check if all required fields are present
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    name = data.get('name')
    user_type = data.get('type')
    
    db = get_db()
    
    # Check if username already exists
    existing_user = db.execute(
        'SELECT id FROM users WHERE username = ?', (username,)
    ).fetchone()
    
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400
    
    # Insert new user
    try:
        db.execute(
            'INSERT INTO users (username, password, email, name, user_type) VALUES (?, ?, ?, ?, ?)',
            (username, generate_password_hash(password), email, name, user_type)
        )
        db.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/companies', methods=['GET'])
def get_companies():
    db = get_db()
    companies = db.execute('SELECT * FROM companies').fetchall()
    
    result = []
    for company in companies:
        result.append({
            "id": company['id'],
            "name": company['name'],
            "industry": company['industry'],
            "status": company['status'],
            "location": company['location'],
            "revenue": company['revenue'],
            "ebitda": company['ebitda'],
            "employees": company['employees'],
            "founded_year": company['founded_year'],
            "asking_price": company['asking_price'],
            "description": company['description'],
            "owner_id": company['owner_id'],
            "views_this_month": company['views_this_month'],
            "inquiries_this_month": company['inquiries_this_month']
        })
    
    return jsonify(result)

@app.route('/api/companies/<int:company_id>', methods=['GET'])
def get_company(company_id):
    db = get_db()
    company = db.execute('SELECT * FROM companies WHERE id = ?', (company_id,)).fetchone()
    
    if not company:
        return jsonify({"error": "Company not found"}), 404
    
    return jsonify({
        "id": company['id'],
        "name": company['name'],
        "industry": company['industry'],
        "status": company['status'],
        "location": company['location'],
        "revenue": company['revenue'],
        "ebitda": company['ebitda'],
        "employees": company['employees'],
        "founded_year": company['founded_year'],
        "asking_price": company['asking_price'],
        "description": company['description'],
        "owner_id": company['owner_id'],
        "views_this_month": company['views_this_month'],
        "inquiries_this_month": company['inquiries_this_month']
    })

@app.route('/api/companies', methods=['POST'])
def create_company():
    data = request.get_json()
    required_fields = ['name', 'industry', 'location', 'revenue', 'asking_price', 'description', 'owner_id']
    
    # Check if all required fields are present
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    # Set default values for optional fields
    data.setdefault('status', 'Active')
    data.setdefault('ebitda', 0)
    data.setdefault('employees', 0)
    data.setdefault('founded_year', 2000)
    data.setdefault('views_this_month', 0)
    data.setdefault('inquiries_this_month', 0)
    
    db = get_db()
    
    try:
        cursor = db.execute(
            '''
            INSERT INTO companies (
                name, industry, status, location, revenue, ebitda, employees, 
                founded_year, asking_price, description, owner_id, views_this_month, inquiries_this_month
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''',
            (
                data['name'], data['industry'], data['status'], data['location'],
                data['revenue'], data['ebitda'], data['employees'], data['founded_year'],
                data['asking_price'], data['description'], data['owner_id'],
                data['views_this_month'], data['inquiries_this_month']
            )
        )
        db.commit()
        
        return jsonify({
            "id": cursor.lastrowid,
            "message": "Company created successfully"
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
