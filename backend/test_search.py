# test_search.py
from json_handler import search_products

# Sample test filters
filters = {
    "name": "Oxidized Jewelry",  # Test filter
    "category": "Jewelry",  # Test filter
    "location": "Goa",  # Test filter
    "tags": ["handcrafted", "oxidized"]  # Test filter
}

# Perform the search
matching_products = search_products(filters)

# Print the result for testing
if matching_products:
    print(f"Matching products: {matching_products}")
else:
    print("No products found matching your criteria.")
