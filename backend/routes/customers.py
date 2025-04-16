from flask import Blueprint

customers_bp = Blueprint('customers', __name__)

@customers_bp.route('/')
def customer_home():
    return "Customer route working!"
