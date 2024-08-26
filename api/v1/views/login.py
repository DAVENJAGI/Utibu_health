#!/usr/bin/python3
"""This is a route to handle the login request"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response, session, Flask
from models import storage
from models.admin import Admin
from models.user import User
from models.doctor import Doctor
from models.user_session import userSession
from models.doctor_session import doctorSession
from models.admin_session import adminSession
import json
import secrets
import hashlib
from werkzeug.security import check_password_hash

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

    if not check_password_hash(admin.password, password):
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)
#cookie
    session_id = secrets.token_hex(32)
    hashed_session_id = hashlib.sha256(session_id.encode()).hexdigest()
    session[hashed_session_id] = admin.id

# returns the object in dictionary format, associated with the email.
    response = make_response(jsonify({"Message": "Login sucessful", "admin": admin.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)

#Auth header
    custom_token = secrets.token_hex(32)
    hashed_custom_token = hashlib.sha256(custom_token.encode()).hexdigest()
    response.headers['X-Custom-Token'] = custom_token

#Saving the user sessions to database to track sessions
    new_session = adminSession(admin_id=admin.id)
    new_session.session_token = hashed_session_id #secrets.token_hex(32)
    new_session.authorization_token = hashed_custom_token
    storage.new(new_session)
    storage.save()


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

    if not check_password_hash(user.password, password):
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)


#cookie
    session_id = secrets.token_hex(32)
    hashed_session_id = hashlib.sha256(session_id.encode()).hexdigest()
    session[hashed_session_id] = user.id

# returns the object in dictionary format, associated with the email.
    response = make_response(jsonify({"Message": "Login sucessful", "user": user.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)

#Auth header
    custom_token = secrets.token_hex(24)
    hashed_custom_token = hashlib.sha256(custom_token.encode()).hexdigest()
    response.headers['X-Custom-Token'] = custom_token

#Saving the user sessions to database to track sessions
    new_session = userSession(user_id=user.id)
    new_session.session_token = hashed_session_id #secrets.token_hex(32)
    new_session.authorization_token = hashed_custom_token
    storage.new(new_session)
    storage.save()


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

    if not check_password_hash(dkt.password, password):
        return make_response(jsonify({"Message": "Login failed: Incorrect password"}), 401)

#cookie
    session_id = secrets.token_hex(32)
    hashed_session_id = hashlib.sha256(session_id.encode()).hexdigest()
    session[hashed_session_id] = dkt.id

# returns the object in dictionary format, associated with the email.
    response = make_response(jsonify({"Message": "Login sucessful", "dkt": dkt.to_dict()}), 200)
    response.set_cookie('session_id', session_id, httponly=True, max_age=3600)

#Auth header
    custom_token = secrets.token_hex(24)
    hashed_custom_token = hashlib.sha256(custom_token.encode()).hexdigest()
    response.headers['X-Custom-Token'] = custom_token

#Saving dkt sessions to database to track sessions
    new_session = doctorSession(doctor_id=dkt.id)
    new_session.session_token = hashed_session_id #secrets.token_hex(32)
    new_session.authorization_token = hashed_custom_token
    storage.new(new_session)
    storage.save()

    return response

