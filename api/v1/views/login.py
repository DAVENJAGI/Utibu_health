#!/usr/bin/python3
"""This is a route to handle the login request"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.user import User
from models.admin import Admin
from models.doctor import Doctor
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/user/login", strict_slashes=False, methods=["POST"])
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



@app_views.route("/admin/login", strict_slashes=False, methods=["POST"])
def admin_login():
    """A post request sent with email and password from the login page
        Handles login for the app
    """
    data = request.get_json() # the request sent from the login page

    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({"error": "Missing data in request"}), 400)

    email = data['email']
    password = data.get('password')

# The data is sorted in the database, using the email and checks the password.
    admin = storage.getLogin(Admin, email)
    if not admin:
        return make_response(jsonify({"error": "Admin not found"}), 401)

    if admin.password != password:
        return make_response(jsonify({"error": "Invalid password"}), 401)

# returns the object in dictionary format, associated with the email.
    return (jsonify({"message": "Login sucessful", "admin": admin.to_dict()}), 200)



@app_views.route("/doctor/login", strict_slashes=False, methods=["POST"])
def doctor_login():
    """A post request sent with email and password from the login page
        Handles login for the app
    """
    data = request.get_json() # the request sent from the login page

    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({"error": "Missing data in request"}), 400)

    email = data['email']
    password = data.get('password')

# The data is sorted in the database, using the email and checks the password.
    dkt = storage.getLogin(Doctor, email)
    if not dkt:
        return make_response(jsonify({"error": "Doctor not found"}), 401)

    if dkt.password != password:
        return make_response(jsonify({"error": "Invalid password"}), 401)

# returns the object in dictionary format, associated with the email.
    return (jsonify({"message": "Login sucessful", "dkt": dkt.to_dict()}), 200)

