from flask import Flask
from routes.customers import customers_bp
from routes.vendors import vendors_bp
from routes.admin import admin_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(customers_bp, url_prefix='/customers')
app.register_blueprint(vendors_bp, url_prefix='/vendors')
app.register_blueprint(admin_bp, url_prefix='/admin')

@app.route('/')
def home():
    return "Ethnic Marketplace Backend is running!"

if __name__ == '__main__':
    app.run(debug=True)
