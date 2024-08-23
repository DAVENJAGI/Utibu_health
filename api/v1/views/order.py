#!/usr/biin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.user import User
from models.doctor import Doctor
from models.order import Order
from models.medication import Medication
from models.authorization import require_user_auth, require_doctor_auth, require_admin_auth, require_user_or_admin_auth, require_doctor_or_admin_auth, require_doctor_or_admin_or_user_auth
import json

# user_view = Blueprint("users", __name__)


# GET ALL ORDERS AND GET APPOINTMENTS BY ID"""
@app_views.route("/orders", strict_slashes=False, methods=["GET"])
@require_doctor_or_admin_or_user_auth
def get_all_orders():
    """get all orders"""
    all_orders = storage.all(Order).values()
    order_list = []
    for order in all_orders:
        order_list.append(order.to_dict())
    return jsonify(order_list)


@app_views.route("/order/<string:order_id>", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_order_by_id(order_id):
    """get order by id"""
    order = storage.get(Order, order_id)
    if order is None:
        return make_response(jsonify({"Error": "Order with id not found"}), 400)
    return jsonify(order.to_dict())


# GET AN ORDER ASSOCIATED TO A CERTAIN USER BY THEIR IDS
@app_views.route("/user/<string:user_id>/orders", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_order_by_user_id(user_id):
    """gets orders by user id"""
    user = storage.get(User, user_id)
    
    if user is None:
        abort(404)
        
    all_orders = user.orders # storage.all(Appointment)
    

    user_order = [order.to_dict() for order in all_orders] # if  all_meds else []
    return jsonify(user_order)


# CREATE AN FOR THE PATIENT
@app_views.route("/user/<string:user_id>/order", methods=['POST'], strict_slashes=False)
@require_user_auth
def create_a_new_user_order(user_id):
    """create an order for the user"""

    user = storage.get(User, user_id)

    if not request.get_json():
        return make_response(jsonify({"Error": "Not a JSON"}), 400)
    if 'medication_id' not in request.get_json():
        return make_response(jsonify({"Error": "Medication_id not found"}), 400)
    if 'quantity' not in request.get_json():
        return make_response(jsonify({"Error": "Quantity not selected"}), 400)

    medication_id = request.get_json()['medication_id']
    medication = storage.get(Medication, medication_id)

    if not medication:
        return make_response(jsonify({"Error:" "Medication not found"}), 400)
    medication_price = medication.medication_price
    quantity = request.get_json()['quantity']
    billing_cost = medication_price * quantity

    obj = request.get_json()
    if user.doctor_id is None:
        return make_response(jsonify({"Error": "There is no doctors assigned to the user. Kindly visit the nearest clinic for further assistance"}), 400)
    else:
        order = Order(**obj, user_id=user_id, doctor_id=user.doctor_id, billing_cost=billing_cost)
        order.save()
    return (jsonify(order.to_dict()), 201)
    return (jsonify({"Message": "Order placed successfully. Thank you"}), 201)




'''
# CREATE AN FOR THE PATIENT
@app_views.route("/order", methods=['POST'], strict_slashes=False)
def create_a_new_user_order():
    """create an order for the user"""

#    user = storage.get(User, user_id)

    if not request.get_json():
        return make_response(jsonify({"Error": "Not a JSON"}), 400)
    if 'medication_id' not in request.get_json():
        return make_response(jsonify({"Error": "Medication_id not found"}), 400)
    if 'quantity' not in request.get_json():
        return make_response(jsonify({"Error": "Quantity not selected"}), 400)
    if 'user_id' not in request.get_json():
        return make_response(jsonify({"Error": "User_id not selected"}), 400)
    if 'doctor_id' not in request.get_json():
        return make_response(jsonify({"Error": "Doctor not selected"}), 400)



    medication_id = request.get_json()['medication_id']
    medication = storage.get(Medication, medication_id)

    if not medication:
        return make_response(jsonify({"Error:" "Medication not found"}), 400)
    medication_price = medication.medication_price
    quantity = request.get_json()['quantity']
    billing_cost = medication_price * quantity

    obj = request.get_json()
    order = Order(**obj, billing_cost=billing_cost)
    order.save()
    return (jsonify(order.to_dict()), 201)
    return (jsonify({"Message": "Order placed successfully. Thank you"}), 201)
'''


# GET AN ORDER FOR DOCTOR AND APPROVE ORDER.

@app_views.route("/doctor/<string:doctor_id>/orders", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_auth
def get_order_by_doctor_id(doctor_id):
    """gets orders linked to a certain doctor"""
    doctor = storage.get(Doctor, doctor_id)
    
    if doctor is None:
        abort(404)
        
    all_orders = doctor.orders # storage.all(Appointment)
    

    doctor_order = [order.to_dict() for order in all_orders] # if  all_meds else []
    return jsonify(doctor_order)


@app_views.route("/doctor/<string:doctor_id>/order/<string:order_id>", methods=['PUT'], strict_slashes=False)
@require_doctor_auth
def approve_orders(doctor_id, order_id):
    """Approve patient's orders """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    dkt = storage.get(Doctor, doctor_id)
    if dkt is None:
        abort(404)

    order = storage.get(Order, order_id)
    if order is None:
        abort(404)

    if order.doctor_id != doctor_id:
        abort(403)
    data = request.get_json()
    if 'order_status' in data:
        order.order_status = data['order_status']
    storage.save()
    return jsonify(order.to_dict())
