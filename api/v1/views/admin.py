#!/usr/bin/python3
"""Creates the routes associated with admin"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.admin import Admin 
from models.disease import Disease
import json
from werkzeug.security import generate_password_hash
from models.authorization import require_admin_auth

# user_view = Blueprint("users", __name__)

@app_views.route("/admins/", methods=["POST"], strict_slashes=False)
@require_admin_auth
def create_admin():
    """Creates a new admin"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'email' not in request.get_json():
        return make_response(jsonify({"error": "Missing email"}), 400)
    if 'password' not in request.get_json():
        return make_response(jsonify({"error": "Missing user password"}), 400)
    if 'first_name' not in request.get_json():
        return make_response(jsonify({"error": "Missing first_name"}), 400)
    if 'last_name' not in request.get_json():
        return make_response(jsonify({"error": "Missing last_name"}), 400)
    
    obj = request.get_json()
    email = obj['email']
    existing_admin = storage.get_email(Admin, email)
    if existing_admin:
        return make_response(jsonify({"error": "Email address already in use. Please try another one."}), 400)

    hashed_password = generate_password_hash(obj['password'])
    obj['password'] = hashed_password
    adm = Admin(**obj)
    adm.save()
#    return (jsonify(adm.to_dict()), 201)
    return (jsonify({"Message": "New admin added sucessfully"}), 201)

@app_views.route("/admin", strict_slashes=False, methods=["GET"])
@require_admin_auth
def return_admin():
    """get all admins"""
    all_admins = storage.all(Admin).values()
    admin_list = []
    for admin in all_admins:
        admin_list.append(admin.to_dict())
    return jsonify(admin_list)

@app_views.route("/admin/<string:admin_id>", methods=['GET'], strict_slashes=False)
@require_admin_auth
def get_admin_by_id(admin_id):
    """get admin by id"""
    admin = storage.get(Admin, admin_id)
    if admin is None:
        error_message = f"Admin with id {admin_id} not fouund"
        return make_response(jsonify({"Message": error_message}), 401)
    return jsonify(admin.to_dict())
