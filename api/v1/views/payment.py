#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.user import User
from models.doctor import Doctor
from models.order import Order
from models.medication import Medication
import json

# user_view = Blueprint("users", __name__)


# GET ALL ORDERS AND GET APPOINTMENTS BY ID"""
@app_views.route("/payments/", strict_slashes=False, methods=["GET"])
def get_total_money_transacted():
    """get all total money transacted"""
    try:
        all_orders = storage.all(Order).values()
        total_cost = sum(order.billing_cost for order in all_orders)
        return make_response(jsonify({"total_money_transacted": total_cost}))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
   
