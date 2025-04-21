from flask import Blueprint, request, jsonify
from json_handler import search_products
from json_handler import read_products

# from backend.json_handler import search_products


# Initialize the blueprint
customers_bp = Blueprint('customers', __name__)

# Basic customer home route (unchanged)
@customers_bp.route('/')
def customer_home():
    return "Customer route working!"

# Route to search for products
@customers_bp.route('/products', methods=['GET'])

def search_for_products():
    try:
        # Get the query parameters from the URL (e.g., /products?name=kurta&category=Apparel)
        filters = {
            "name": request.args.get("name"),
            "category": request.args.get("category"),
            "location": request.args.get("location"),
            "tags": request.args.getlist("tags")
            
        }

        # Remove any None values from the filters to avoid unnecessary checks
        filters = {key: value for key, value in filters.items() if value is not None}

        print("Received filters from request:", filters)

        # Search for products using the filters
        matching_products = search_products(filters)

        if matching_products:
            return jsonify(matching_products), 200
        else:
            return jsonify({"message": "No products found matching your criteria."}), 404

    except Exception as e:
        # Catch any exceptions and return an error response
        return jsonify({"error": str(e)}), 500

@customers_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    try:
        products = read_products()
        for product in products:
            if product["id"] == product_id:
                return jsonify(product), 200
        return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500