import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PRODUCTS_FILE = os.path.join(BASE_DIR, 'data', 'products.json')

# --- Helper Functions ---

def read_products():
    try:
        with open(PRODUCTS_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []  # Return empty list if file is not found
    except json.JSONDecodeError:
        return []  # Return empty list if the JSON is invalid
    
def write_products(products):
    try:
        with open(PRODUCTS_FILE, 'w') as file:
            json.dump(products, file, indent=4)
        print(f"[DEBUG] Successfully wrote to {PRODUCTS_FILE}")
    except Exception as e:
        print(f"Error writing to products.json: {e}")


# --- 1. Search Products ---

def search_products(filters):
    products = read_products()
    results = []

    # Print the filters to check what is being passed
    print(f"Filters received: {filters}")

    for product in products:
        match = True
        for key, value in filters.items():
            if value is None:  # Skip filters with no value
                continue

            # Debugging: Print filter and product value being checked
            print(f"Checking {key}: {value} against product {product.get(key, '')}")
            

            if key == "tags":
                if value:  # Only check tags if there are any tags provided
                    print(f"Product tags: {product.get('tags', [])}")
                    if not any(tag.lower() in [t.lower() for t in product.get("tags", [])] for tag in value):
                        match = False
                        break                
            elif key == "name":
                # Debugging: Print product name and the value being compared
                print(f"Product name: {product.get('name', '')}, Search name: {value.lower()}")
                # Ensure partial matching and case-insensitive comparison
                if value.lower() not in product.get("name", "").lower():
                    match = False
                    break
            elif key == "category":
                # Debugging: Print category comparison
                print(f"Product category: {product.get('category', '')}, Search category: {value.lower()}")
                if value.lower() not in product.get("category", "").lower():
                    match = False
                    break
            elif key == "location":
                # Debugging: Print location comparison
                print(f"Product location: {product.get('location', '')}, Search location: {value.lower()}")
                if value.lower() not in product.get("location", "").lower():
                    match = False
                    break
            else:
                if product.get(key, "").lower() != value.lower():
                    match = False
                    break

        if match:
            results.append(product)

    return results


# --- 2. Add Vendor to Existing Product ---

def add_vendor_to_product(product_id, vendor_info):
    products = read_products()
    for product in products:
        if product['id'] == product_id:
            product.setdefault("vendors", []).append(vendor_info)
            write_products(products)
            return True
    return False

# --- 3. Add New Product ---

import json

def add_new_product(product_data):
    products = read_products()
    new_id = max([p["id"] for p in products], default=0) + 1
    product_data["id"] = new_id
    products.append(product_data)
    write_products(products)
    return new_id


