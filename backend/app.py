import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend')))

from flask import Flask, send_from_directory
from flask import Flask, request, jsonify
import json
from routes.customers import customers_bp
from routes.vendors import vendors_bp
from routes.admin import admin_bp
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

# app = Flask(__name__)
app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

CORS(app)


# Register Blueprints
app.register_blueprint(customers_bp, url_prefix='/customers')
app.register_blueprint(vendors_bp, url_prefix='/vendors')
app.register_blueprint(admin_bp, url_prefix='/admin')

# @app.route('/')
# def home():
#     return "Ethnic Marketplace Backend is running!"

# if __name__ == '__main__':
#     app.run(debug=True)

# File to store user data
DATA_FILE = 'backend/data/  users.json'

# Initialize data file if it doesn't exist
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w') as f:
        json.dump([], f)

def load_users():
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_users(users):
    with open(DATA_FILE, 'w') as f:
        json.dump(users, f, indent=2)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['firstName', 'lastName', 'email', 'password', 'role']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if email already exists
    users = load_users()
    if any(user['email'] == data['email'] for user in users):
        return jsonify({'error': 'Email already exists'}), 400
    
    # Hash password
    hashed_password = generate_password_hash(data['password'])
    
    # Create new user
    new_user = {
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'email': data['email'],
        'password': hashed_password,
        'role': data['role']
    }
    
    users.append(new_user)
    save_users(users)
    
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate required fields
    if 'email' not in data or 'password' not in data or 'role' not in data:
        return jsonify({'error': 'Missing email, password or role'}), 400
    
    users = load_users()
    user = next((u for u in users if u['email'] == data['email'] and u['role'] == data['role']), None)
    
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Invalid email, password or role'}), 401
    
    # In a real app, you'd generate a token here
    return jsonify({
        'message': 'Login successful',
        'user': {
            'firstName': user['firstName'],
            'lastName': user['lastName'],
            'email': user['email'],
            'role': user['role']
        }
    })

@app.route('/api/products', methods=['GET'])
def get_products():
    with open('products.json') as f:
        products = json.load(f)
    return jsonify(products)

@app.route('/static/images/products/<filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(app.static_folder, 'images/products'), filename)

# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)