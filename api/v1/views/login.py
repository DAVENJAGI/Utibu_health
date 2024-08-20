#!/usr/bin/python3
"""This is a route to handle the login request"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response, session, Flask
from models import storage
from models.admin import Admin
from models.user import User
from models.doctor import Doctor
import json
import secrets
# user_view = Blueprint("users", __name__)

# app = Flask(__name__)
#app_views.secret_key = secrets.token_hex(32)

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
        return make_response(jsonify({"Message": "Login failed: Admin not found"}), 401)

    if admin.password != password:
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)

#cookie
    session_id = secrets.token_hex(32)
    session[session_id] = admin.id

# returns the object in dictionary format, associated with the email.
    response = make_response(jsonify({"Message": "Login sucessful", "admin": admin.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)

#Auth header
    custom_token = secrets.token_hex(24)
    response.headers['X-Custom-Token'] = custom_token


    return response


@app_views.route("/user/login", strict_slashes=False, methods=["POST"])
def user_login():
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
        return make_response(jsonify({"Message": "Login failed: User not found"}), 401)

    if user.password != password:
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)

#cookie
    session_id = secrets.token_hex(32)
    session[session_id] = user.id

# returns the object in dictionary format, associated with the email.
    response = make_response(jsonify({"Message": "Login sucessful", "user": user.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)

#Auth header
    custom_token = secrets.token_hex(24)
    response.headers['X-Custom-Token'] = custom_token

    return response



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
        return make_response(jsonify({"Message": "Login failed: Doctor not found"}), 401)

    if dkt.password != password:
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)

#cookie
    session_id = secrets.token_hex(32)
    session[session_id] = dkt.id

# returns the object in dictionary format, associated with the email.
    response = make_response(jsonify({"Message": "Login sucessful", "dkt": dkt.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)

#Auth header
    custom_token = secrets.token_hex(24)
    response.headers['X-Custom-Token'] = custom_token

    return response

