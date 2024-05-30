#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.user import User
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/login", strict_slashes=False, methods=["POST"])
def login():
    """get all users"""
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({"error": "Missing data in request"}), 400)  
    
    email = data['email']
    password = data.get('password')
    
    user = storage.getLogin(User, email)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 401)

    if user.password != password:
        return make_response(jsonify({"error": "Invalid password"}), 401)

    return (jsonify({"message": "Login sucessful", "user": user.to_dict()}), 200)

