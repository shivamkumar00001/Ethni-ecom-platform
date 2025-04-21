from flask import Blueprint, request, jsonify
from json_handler import search_products, add_vendor_to_product, add_new_product

vendors_bp = Blueprint('vendors', __name__)

@vendors_bp.route('/')
def vendor_home():
    return "Vendor route working!"

@vendors_bp.route('/add-product', methods=['POST'])
def add_product():
    try:
        product_data = request.get_json()

        name = product_data.get("name")
        category = product_data.get("category")
        location = product_data.get("location")
        vendor = product_data.get("vendor")

        if not all([name, category, location, vendor]):
            return jsonify({"error": "Missing required fields"}), 400

        filters = {"name": name, "category": category, "location": location}
        existing_products = search_products(filters)

        if existing_products:
            product_id = existing_products[0]['id']
            add_vendor_to_product(product_id, vendor)
            return jsonify({"message": "Product updated with new vendor"}), 200
        else:
         
            product_data['vendors'] = [vendor]
            product_data.pop('vendor', None)

            product_data.setdefault('images', [])
            product_data.setdefault('tags', [])

            new_product_id = add_new_product(product_data)
            return jsonify({"message": f"New product added with ID {new_product_id}"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
