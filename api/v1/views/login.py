#!/usr/bin/python3
"""This is a route to handle the login request"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.user import User
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/login", strict_slashes=False, methods=["POST"])
def login():
    """A post request sent with email and password from the login page
        Handles login for the app
    """
    data = request.get_json() # the request sent from the login page

    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({"error": "Missing data in request"}), 400)  

    email = data['email']
    password = data.get('password')

# The data is sorted in the database, using the email and checks the password. 
    user = storage.getLogin(User, email)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 401)

    if user.password != password:
        return make_response(jsonify({"error": "Invalid password"}), 401)

# returns the object in dictionary format, associated with the email.
    return (jsonify({"message": "Login sucessful", "user": user.to_dict()}), 200)

