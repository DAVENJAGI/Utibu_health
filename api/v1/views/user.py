#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response, session
from models import storage
from models.user import User
from models.disease import Disease
from models.user_session import userSession
import json
from datetime import datetime

from functools import wraps
import secrets
# user_view = Blueprint("users", __name__)

#decorator to protect the endpoints

def require_auth(f):
    '''ensure's the endpoint  is authorized by auth_header and has a valid session_id'''
    @wraps(f)
    def dec_func(*args, **kwargs):
        '''auth header checking'''
        auth_token = request.headers.get('X-Custom-Token')
        print(f"received auth_token: {auth_token}")
        if not auth_token or len(auth_token) != 48:
            return make_response(jsonify({"Message": "Sorry, you do not have the valid authorization to perform the operation"}), 403)

        session_id = request.cookies.get('session_id')
        if not session_id:
            return make_response(jsonify({"Message": "Session id missing."}), 403)

        user_session = storage.get_session(userSession, session_id)
        if not user_session:
            return make_response(jsonify({"message": "Invalid session"}), 401)
#       print(user_session)
        if user_session.expires_at <= datetime.utcnow():
            return make_response(jsonify({"message": "Expired session. Log in to continue"}), 401)

        return f(*args, **kwargs)
    return dec_func


@app_views.route("/users", strict_slashes=False, methods=["GET"])
@require_auth
def return_users():
    """get all users"""
    all_users = storage.all(User).values()
    user_list = []
    for user in all_users:
        user_list.append(user.to_dict())
    return jsonify(user_list)

@app_views.route("/user/<string:user_id>", methods=['GET'], strict_slashes=False)
def get_user_by_id(user_id):
    """get user by id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(400) 
    return jsonify(user.to_dict())

@app_views.route("user/<string:user_id>", methods=["DELETE"], strict_slashes=False)
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
def get_disease_by_user_id(user_id):
    """get disease associated with a specific user"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
    diseases = user.diseases
    disease_dict = [dis.to_dict() for dis in diseases] if diseases else []
    return jsonify(disease_dict)

@app_views.route("/user/<string:user_id>/disease/", methods=['POST'], strict_slashes=False)
def add_disease_to_user_profile(user_id):
    """add disease to a specific user"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    data = request.json
    if "disease_id" not in data:
        return make_response(jsonify({"error": "Missin disease_id"}), 400)

    disease_id = data["disease_id"]

    user = storage.get(User, user_id)
    if not user:
        return make_response(jsonify({"Error": "User not found"}), 400)
    disease = storage.get(Disease, disease_id)
    if not disease:
        return make_response(jsonify({"Error": "Disease not found"}), 400)

    user.diseases.append(disease)
    storage.save()
    return (jsonify({"message": "Disease added successfully"}), 201)


@app_views.route("/users/", methods=["POST"], strict_slashes=False)
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
    usr = User(**obj)
    usr.save()
    return (jsonify(usr.to_dict()), 201)

@app_views.route("/user/<string:user_id>", methods=['PUT'], strict_slashes=False)
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
