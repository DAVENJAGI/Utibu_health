#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request
from models import storage
from models.doctor import Doctor
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/doctors", strict_slashes=False, methods=["GET"])
def return_doctors():
    """get all users"""
    all_doctors = storage.all(Doctor).values()
    doctor_list = []
    for doctor in all_doctors:
        doctor_list.append(doctor.to_dict())
    return jsonify(doctor_list)

@app_views.route("/doctor/<string:doctor_id>", methods=['GET'], strict_slashes=False)
def get_doctor_by_id(doctor_id):
    """get user by id"""
    doctor = storage.get(Doctor, doctor_id)
    if doctor is None:
        abort(400) 
    return jsonify(doctor.to_dict())

@app_views.route("/doctor/<string:doctor_id>", methods=["DELETE"], strict_slashes=False)
def delete_doctor(doctor_id):
    """deletes doctor with  specific id"""
    doctor = storage.get(Doctor, doctor_id)
    if doctor is None:
        abort(404)
    doctor.delete()
    storage.save()
    return jsonify({})


@app_views.route("/doctors/", methods=["POST"], strict_slashes=False)
def create_doctor():
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
    if 'license_no' not in request.get_json():
        return make_response(jsonify({"error": "Missing liense number"}), 400)
    if 'hospital_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing hospital id"}), 400)
    
    obj = request.get_json()
    dkt = Doctor(**obj)
    dkt.save()
    return (jsonify(dkt.to_dict()), 201)

@app_views.route("/doctor/<string:doctor_id>", methods=['PUT'], strict_slashes=False)
def update_doctor(doctor_id):
    """updates user's properties except the created, updated, email, and id"""
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

