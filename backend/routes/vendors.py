from flask import Blueprint

vendors_bp = Blueprint('vendors', __name__)

@vendors_bp.route('/')
def vendor_home():
    return "Vendor route working!"
