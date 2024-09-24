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
from flask_socketio import SocketIO
from flask_mail import Message
from api.v1.app import mail, app

socketio = SocketIO(app)

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

        try:
            socketio.emit('order_update', order.to_dict(), room=order.user_id)
            print(f"Emitted appointment update event for user {order.user_id}")
        except Exception as e:
            print(f"Error emmittinf an order update event: {e}")

        doctor = storage.get(Doctor, order.doctor_id)
        if doctor is None:
            print(f"User with id {order.user_id} not found")

        doctor_email = doctor.email

        body=f"A new order ID: {order.id} has been placed. Kindly check to either approve or cancel order."
        subject=f"New Order - order ID: {order.id}",       
        body += "\n\n Thank you."


        message = Message(
                subject=subject,
                recipients=[doctor_email],
                body=body
                )
        try:
            mail.send(message)
            print(f"New order email sent to {doctor.email}")
        except Exception as e:
            print(f"Error sending new order email: {e}")


    return jsonify({"Message": "New order placed successfully. Thank You"}, order.to_dict(), 201)

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


@app_views.route("/order/<string:order_id>", methods=['PUT'], strict_slashes=False)
# @require_doctor_auth
def approve_orders(order_id):
    """Approve patient's orders """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    order = storage.get(Order, order_id)
    if order is None:
        abort(404)

    old_order = order.order_status
    data = request.get_json()
    if 'order_status':
        if data['order_status'] not in ("Approved", "Cancelled"):
            return make_response(jsonify({"Error": "The status update can only be either Approved or Cancelled"}), 404)
        else:
            order.order_status = data['order_status']

    if old_order != order.order_status:
        try:
            socketio.emit('order_update', order.to_dict(), room=order.user_id)
            print(f"Emitted appointment update event for user {order.user_id}")
        except Exception as e:
            print(f"Error emmittinf an order update event: {e}")

        user = storage.get(User, order.user_id)
        if user is None:
            print(f"User with id {order.user_id} not found")

        user_email = user.email

        body=f"Your order Order ID: {order.id} has been {order.order_status}."
        subject=f"Order Update - order ID: {order.id}",
        if order.order_status == "Approved":
            subject = f"Order Approval - order ID: {order.id}"
            body += f"\nKidly proceed to payment to complete the process."
        elif order.order_status == "Cancelled":
            subject = f"Order Cancellation - order ID: {order.id}"
            body += f"\nWe apologize for any inconvenience caused. Kindly contact your doctor for more details"
        body += "\n\n Thank you."


        message = Message(
                subject=subject,
                recipients=[user_email],
                body=body
                )


        try:
            mail.send(message)
            print(f"Order confirmation email sent to {user.email}")
        except Exception as e:
            print(f"Error sending order confirmation email: {e}")

    storage.save()
    return jsonify({"Message": "Order Updated successfully. Thank You"}, order.to_dict(), 200)
