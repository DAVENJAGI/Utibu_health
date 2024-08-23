#!/usr/bin/python3
"""Creates the doctors routing"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.doctor import Doctor
from models.hospital import Hospital
from models.authorization import require_admin_auth, require_user_or_admin_auth, require_doctor_or_admin_auth, require_doctor_or_admin_or_user_auth
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/doctors", strict_slashes=False, methods=["GET"])
@require_admin_auth
def return_doctors():
    """gets all doctors"""
    all_doctors = storage.all(Doctor).values()
    doctor_list = []
    for doctor in all_doctors:
        doctor_list.append(doctor.to_dict())
    return jsonify(doctor_list)


@app_views.route("/doctor/<string:doctor_id>", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_doctor_by_id(doctor_id):
    """get doctor by doctor_id"""
    doctor = storage.get(Doctor, doctor_id)
    if doctor is None:
        abort(400) 
    return jsonify(doctor.to_dict())
@app_views.route("/doctor/<string:doctor_id>/patients", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_auth
def get_all_patients_to_a_doctor(doctor_id):
    """get doctor by id"""
    doctor = storage.get(Doctor, doctor_id)

    if doctor is None:
        abort(404)

    all_patients = doctor.patients

#    all_meds = storage.all(Medication)
    patients = [patient.to_dict() for patient in all_patients] # if  all_meds else []
    return jsonify(patients)

@app_views.route("/doctor/<string:doctor_id>", methods=["DELETE"], strict_slashes=False)
@require_doctor_or_admin_auth
def delete_doctor(doctor_id):
    """deletes doctor with  specific id"""
    doctor = storage.get(Doctor, doctor_id)
    if doctor is None:
        abort(404)
    doctor.delete()
    storage.save()
#    return jsonify({})
    return (jsonify({"Message": "Docotor deleted successfully. Thank you"}), 201)


@app_views.route("/doctors/", methods=["POST"], strict_slashes=False)
@require_admin_auth
def create_doctor():
    """Creates a new doctor"""
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
    if 'license_no' not in request.get_json():
        return make_response(jsonify({"error": "Missing liense number"}), 400)
    if 'hospital_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing hospital id"}), 400)
    
    obj = request.get_json()
    dkt = Doctor(**obj)
    dkt.save()
#    return (jsonify(dkt.to_dict()), 201)
    message =  {"Message": "New Doctor created successfully. Thank you"}
    return make_response(jsonify(message), 201)


@app_views.route("/doctor/<string:doctor_id>", methods=['PUT'], strict_slashes=False)
@require_doctor_or_admin_auth
def update_doctor(doctor_id):
    """updates doctor's properties except the created_at, updated_at, email, and id"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    dkt = storage.get(Doctor, doctor_id)
    if dkt is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ["id", "email", "created_at", "updated_at"]:
            setattr(dkt, key, value)
    storage.save()
    return jsonify(dkt.to_dict())

