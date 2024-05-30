#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request
from models import storage
from models.hospital import Hospital 
from models.doctor import Doctor
import json
from sqlalchemy.orm import joinedload, session 

# user_view = Blueprint("users", __name__)

@app_views.route("/hospitals", strict_slashes=False, methods=["GET"])
def return_hospitals():
    """get all users"""
    all_hospitals = storage.all(Hospital).values()
    hospital_list = []
    for hospital in all_hospitals:
        hospital_list.append(hospital.to_dict())
    return jsonify(hospital_list)

@app_views.route("/hospital/<string:hospital_id>", methods=['GET'], strict_slashes=False)
def get_hospital_by_id(hospital_id):
    """get user by id"""
    hospital = storage.get(Hospital, hospital_id)
    if hospital is None:
        abort(400) 
    return jsonify(hospital.to_dict())


@app_views.route("/hospital/<string:hospital_id>", methods=["DELETE"], strict_slashes=False)
def delete_hospital(hospital_id):
    """deletes doctor with  specific id"""
    hospital = storage.get(Hospital, hospital_id)
    if hospital is None:
        abort(404)
    hospital.delete()
    storage.save()
    return jsonify({})


@app_views.route("/hospital/<string:hospital_id>/doctors/", methods=['GET'], strict_slashes=False)
def get_doctor_by_hospital_id(hospital_id):
    """get doctor by id"""
    hospital = storage.get(Hospital, hospital_id)
    
    if hospital is None:
        abort(404)
        
    if hasattr(hospital, 'doctors'):
        doctors = [dkt.to_dict() for dkt in hospital.doctors]
    else:
        all_doctors = storage.all(Doctor)
        doctors = [dkt.to_dict() for dkt in all_doctors if dkt.hospital_id == hospital_id]
    return jsonify(doctors)


@app_views.route("/hospitals/", methods=["POST"], strict_slashes=False)
def create_hospital():
    """Creates a new user"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'town_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing town id"}), 400)
    if 'email' not in request.get_json():
        return make_response(jsonify({"error": "Missing email"}), 400)
    if 'name' not in request.get_json():
        return make_response(jsonify({"error": "Missing hospital name"}), 400)
        
    obj = request.get_json()
    hosp = Hospital(**obj)
    hosp.save()
    return (jsonify(hosp.to_dict()), 201)

@app_views.route("/hospital/<string:hospital_id>", methods=['PUT'], strict_slashes=False)
def update_hospital(hospital_id):
    """updates user's properties except the created, updated, email, and id"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    hosp = storage.get(Hospital, hospital_id)
    if hosp is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(hosp, key, value)
    storage.save()
    return jsonify(hosp.to_dict())

