#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response, session
from models import storage
from models.user import User
from models.disease import Disease
from models.vital import Reading
from models.user_session import userSession
from models.authorization import require_user_auth, require_admin_auth, require_doctor_auth, require_doctor_or_admin_or_user_auth
from models.authorization import require_user_or_admin_auth
import json
from datetime import datetime
from werkzeug.security import generate_password_hash


from functools import wraps
import secrets


@app_views.route("/users", strict_slashes=False, methods=["GET"])
@require_admin_auth
def return_users():
    """get all users"""
    all_users = storage.all(User).values()
    user_list = []
    for user in all_users:
        user_list.append(user.to_dict())
    return jsonify(user_list)

@app_views.route("/user/<string:user_id>", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_user_by_id(user_id):
    """get user by id"""
    user = storage.get(User, user_id)
    if user is None:
        error_message = f"User with id {user_id} not fouund"
        return make_response(jsonify({"Message": error_message}), 401) 
    return jsonify(user.to_dict())

@app_views.route("user/<string:user_id>", methods=["DELETE"], strict_slashes=False)
@require_user_auth
def delete_user(user_id):
    """deletes  user with  specific id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    user.delete()
    storage.save()
#    return jsonify({})
    return (jsonify({"Message": "User deleted successfully. Thank you"}), 201)

@app_views.route("/user/<string:user_id>/disease/", methods=['GET'], strict_slashes=False)
@require_user_auth
def get_disease_by_user_id(user_id):
    """get disease associated with a specific user"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    diseases = user.diseases
    disease_dict = [dis.to_dict() for dis in diseases] if diseases else []
    return jsonify(disease_dict)

@app_views.route("/user/<string:user_id>/disease/", methods=['POST'], strict_slashes=False)
# @require_doctor_auth
def add_disease_to_user_profile(user_id):
    """add disease to a specific user"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    data = request.json
    if "disease_id" not in data:
        return make_response(jsonify({"error": "Missing disease_id"}), 400)

    disease_id = data["disease_id"]

    user = storage.get(User, user_id)
    if not user:
        return make_response(jsonify({"Error": "User not found"}), 400)
    disease = storage.get(Disease, disease_id)
    if not disease:
        return make_response(jsonify({"Error": "Disease not found"}), 400)

    user.diseases.append(disease)
    storage.save()
    message = f"Disease added successfully to {user.first_name} {user.last_name} userId: {user.id}"
#    return (jsonify({"Message": "Disease added successfully"}), 201)
    return (jsonify({"Message": message}), 201)


@app_views.route("/users/", methods=["POST"], strict_slashes=False)
# @require_doctor_auth
def create_user():
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
    if 'date_of_birth' not in request.get_json():
        return make_response(jsonify({"error": "Missing date_of_birth"}), 400)
    if 'doctor_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing doctor_id"}), 400)
    
    obj = request.get_json()
    existing_user = storage.get_email(User, obj['email'])
    if existing_user:
        return make_response(jsonify({"error": "Email address already in use. Please try another one."}), 400)
    obj['password'] = generate_password_hash(obj['password'])
    usr = User(**obj)
    usr.save()
    return (jsonify(usr.to_dict()), 201)

@app_views.route("/user/<string:user_id>", methods=['PUT'], strict_slashes=False)
@require_user_auth
def update_user(user_id):
    """updates user's properties except the created, updated, email, and id"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    usr = storage.get(User, user_id)
    if usr is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ["id", "email", "created_at", "updated_at"]:
            setattr(usr, key, value)
    storage.save()
    return jsonify(usr.to_dict())
# CREATING USER READINGS
@app_views.route("/user/<string:user_id>/vitals/", methods=['POST'], strict_slashes=False)
@require_doctor_auth
def add_vital_reading_to_user(user_id):
    """add disease to a specific user"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    data = request.json

    user = storage.get(User, user_id)
    if not user:
        return make_response(jsonify({"Error": "User not found"}), 400)
 
    obj = request.get_json()
    vitals = Reading(user_id=user.id, **obj)
    vitals.save()
    return (jsonify({"Message": "User readings added successfully"}, vitals.to_dict()), 201)


@app_views.route("/user/<string:user_id>/vitals/", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_vitals_by_user_id(user_id):
    """get vitals associated with a specific user"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    vitals = user.patient_vitals_readings
    vitals_dict = [vital.to_dict() for vital in vitals] if vitals else []
    return jsonify(vitals_dict), 200

