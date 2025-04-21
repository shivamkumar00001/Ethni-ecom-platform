from json_handler import add_new_product

# Define the new product data
new_product = {
    "name": "Brass and Copper Artifacts",
    "category": "Home Decor",
    "location": "Goa",
    "price": 1600,
    "vendors": [
        {
            "vendor_id": "metalcrafts_goa_08",
            "stock": 38,
            "rating": 4.8
        }
    ],
    "description": "Decorative trays, idols, and artifacts crafted from brass and copper, reflecting Indo-Portuguese aesthetics.",
    "images": [
        "brass_copper_artifacts_goa.jpg"
    ],
    "tags": [
        "brass",
        "copper",
        "decor",
        "heritage"
    ]
}

# Add the new product
new_product_id = add_new_product(new_product)

# Print the newly assigned product ID
print(f"New product added with ID: {new_product_id}")
