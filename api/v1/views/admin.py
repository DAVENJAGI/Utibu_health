#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request
from models import storage
from models.admin import Admin 
from models.disease import Disease
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/admin/", methods=["POST"], strict_slashes=False)
def create_admin():
    """Creates a new user"""
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
    adm = Admin(**obj)
    adm.save()
    return (jsonify(adm.to_dict()), 201)

@app_views.route("/admin", strict_slashes=False, methods=["GET"])
def return_admin():
    """get all admins"""
    all_admins = storage.all(Admin).values()
    admin_list = []
    for admin in all_admins:
        admin_list.append(admin.to_dict())
    return jsonify(admin_list)

