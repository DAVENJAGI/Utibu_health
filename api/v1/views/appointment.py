#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.user import User
from models.doctor import Doctor
from models.appointment import Appointment
from models.authorization import require_user_auth, require_doctor_auth, require_admin_auth, require_user_or_admin_auth, require_doctor_or_admin_auth, require_doctor_or_admin_or_user_auth
import json

# user_view = Blueprint("users", __name__)

# GET ALL APPOINTMENTS AND GET APPOINTMENTS BY ID
@app_views.route("/appointments", strict_slashes=False, methods=["GET"])
@require_doctor_or_admin_or_user_auth
def return_appointments():
    """get all appointments"""
    all_apps = storage.all(Appointment).values()
    apps_list = []
    for app in all_apps:
        apps_list.append(app.to_dict())
    return jsonify(apps_list)

@app_views.route("/appointment/<string:appointment_id>", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_appointment_by_id(appointment_id):
    """get app by id"""
    app = storage.get(Appointment, appointment_id)
    if app is None:
        abort(400)
    return jsonify(app.to_dict())


# GET APPOINTMENT ASSOCIATED TO A CERTAIN USER OR DOCTOR BY RETRIVING USING THEIR IDS
@app_views.route("/user/<string:user_id>/appointments", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_appointment_by_user_id(user_id):
    """gets appointment by user id"""
    user = storage.get(User, user_id)
    
    if user is None:
        abort(404)
        
    all_apps = user.appointments # storage.all(Appointment)
    

    appointment = [app.to_dict() for app in all_apps] # if  all_meds else []
    return jsonify(appointment)

@app_views.route("/doctor/<string:doctor_id>/appointments", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_auth
def get_appointment_by_doctor_id(doctor_id):
    """gets appointment by doctor's id"""
    dkt = storage.get(Doctor, doctor_id)
    
    if dkt is None:
        abort(404)
        
    all_apps = dkt.appointments # storage.all(Appointment)
    

    appointment = [app.to_dict() for app in all_apps] # if  all_meds else []
    return jsonify(appointment)


# CREATE AN APPOINTMENT.BY DOCTOR AND PATIENT
@app_views.route("/user/<string:user_id>/appointment", methods=['POST'], strict_slashes=False)
@require_user_auth
def create_a_new_user_appointment(user_id):
    """create anew user appointment"""

    user = storage.get(User, user_id)

    if not request.get_json():
        return make_response(jsonify({"Error": "Not a JSON"}), 400)
    if 'description' not in request.get_json():
        return make_response(jsonify({"Error": "Description not found"}), 400)
    if 'time' not in request.get_json():
        return make_response(jsonify({"Error": "Medication not found"}), 400)
    if 'date' not in request.get_json():
        return make_response(jsonify({"Error": "Date not set"}), 400)


    obj = request.get_json()
    if user.doctor_id is None:
        return make_response(jsonify({"Error": "There is no doctors assigned to the user. Kindly visit the nearest clinic for further assistance"}), 400)
    else:
        app = Appointment(**obj, user_id=user_id, doctor_id=user.doctor_id)
        app.save()
    return (jsonify(app.to_dict()), 201)
    return (jsonify({"Message": "Appointment created successfully. Thank you"}), 201)

@app_views.route("/doctor/<string:doctor_id>/appointment", methods=['POST'], strict_slashes=False)
@require_doctor_or_admin_auth
def create_a_new_doctor_appointment(doctor_id):
    """create anew user appointment"""

    dkt = storage.get(Doctor, doctor_id)

    if not request.get_json():
        return make_response(jsonify({"Error": "Not a JSON"}), 400)
    if 'description' not in request.get_json():
        return make_response(jsonify({"Error": "Description not found"}), 400)
    if 'time' not in request.get_json():
        return make_response(jsonify({"Error": "Medication not found"}), 400)
    if 'date' not in request.get_json():
        return make_response(jsonify({"Error": "Date not set"}), 400)
    if 'user_id' not in request.get_json():
        return make_response(jsonify({"Error": "Patient's ID not set"}), 400)

    obj = request.get_json()
    app = Appointment(**obj, doctor_id=dkt.id)
    app.save()
    return (jsonify(app.to_dict()), 201)
    return (jsonify({"Message": "Appointment created successfully. Thank you"}), 201)



# UPDATE AN APPOINMENT, ie, POSTPONE ETC.

@app_views.route("/doctor/<string:doctor_id>/appointment/", methods=['PUT'], strict_slashes=False)
@require_doctor_or_admin_auth
def update_doctor_appointment(doctor_id):
    """create anew user appointment"""

    app_id = request.get_json().get('id')
    if not app_id:
        return make_response(jsonify({"Error": "Invalid appointment id"}), 400)
    
    appointment = storage.get(Appointment, app_id)
    if not appointment:
        return make_response(jsonify({"Error": "Appointment unavailable"}), 400)

    appointment.description = request.get_json().get('description', appointment.description)
    appointment.appointment_status = request.get_json().get('appointment_status', appointment.appointment_status)
    appointment.time = request.get_json().get('time', appointment.time)
    appointment.date = request.get_json().get('date', appointment.date)
     
    storage.save()
#    return (jsonify(appointment.to_dict()), 201)
    return (jsonify({"Message": "Appointment updated successfully. Thank you"}), 201)


@app_views.route("/appointment/<string:appointment_id>/", methods=['PUT'], strict_slashes=False)
@require_doctor_or_admin_auth
def update_appointment_with_id(appointment_id):
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    appointment = storage.get(Appointment, appointment_id)
        
    if appointment is None:
        abort(404)

    data = request.get_json()

    appointment_columns = Appointment.__table__.columns.keys()

    for key, value in data.items():
        if key in appointment_columns and key not in ["id", "created_at", "doctor_id", "updated_at"]:
            setattr(appointment, key, value)
    storage.save()
#    return jsonify(appointment.to_dict())
    return (jsonify({"Message": "Appointment Updated successfully. Thank You"}), 201)
