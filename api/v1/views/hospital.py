#!/usr/bin/python3
"""Creates the endpoint route for /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.hospital import Hospital 
from models.department import Department
from models.doctor import Doctor
from models.authorization import require_admin_auth, require_user_or_admin_auth, require_doctor_or_admin_auth, require_doctor_or_admin_or_user_auth
import json
from sqlalchemy.orm import joinedload, session 

# user_view = Blueprint("users", __name__)

@app_views.route("/hospitals", strict_slashes=False, methods=["GET"])
@require_doctor_or_admin_or_user_auth
def return_hospitals():
    """get all hospitals"""
    all_hospitals = storage.all(Hospital).values()
    hospital_list = []
    for hospital in all_hospitals:
        hospital_list.append(hospital.to_dict())
    return jsonify(hospital_list)

@app_views.route("/hospital/<string:hospital_id>", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_hospital_by_id(hospital_id):
    """get a specific hospital by hospital_id"""
    hospital = storage.get(Hospital, hospital_id)
    if hospital is None:
        abort(400) 
    return jsonify(hospital.to_dict())


@app_views.route("/hospital/<string:hospital_id>", methods=["DELETE"], strict_slashes=False)
@require_admin_auth
def delete_hospital(hospital_id):
    """deletes specific hospital using specific hospital_id"""
    hospital = storage.get(Hospital, hospital_id)
    if hospital is None:
        abort(404)
    hospital.delete()
    storage.save()
    return make_response(jsonify({"Message": "Hospital deleted successfully"}), 201)


@app_views.route("/hospital/<string:hospital_id>/doctors/", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_auth
def get_doctor_by_hospital_id(hospital_id):
    """get doctor related to a specific hospital"""
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
@require_admin_auth
def create_hospital():
    """Creates a new hospital"""
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
    message =  {"Message": "Hospital created successfully. Thank you"}
#    return (jsonify(hosp.to_dict(message)), 201)
    return make_response(jsonify(message), 201)

@app_views.route("/hospital/<string:hospital_id>", methods=['PUT'], strict_slashes=False)
@require_doctor_or_admin_auth
def update_hospital(hospital_id):
    """updates hospital properties except the created_at, updated, email, and id"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    hosp = storage.get(Hospital, hospital_id)
    if hosp is None:
        abort(404)
        message = f"Hospital with hospitalId {hospital_id} not found"
        return make_response(jsonify({"Message": message}), 404)
    for key, value in request.get_json().items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(hosp, key, value)
    storage.save()
    message = f"Hospital {hosp.name} with hospitalId: {hosp.id} updated successfully"
    return make_response(jsonify({"Message": message}), 200) 


@app_views.route("/hospital/<string:hospital_id>/departments", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_departments_in_hospital(hospital_id):
    """gets all departments in a specific hospital"""
    hospital = storage.get(Hospital, hospital_id)

    if hospital is None:
        error_message = f"Hospital with hospitalId {hospital_id} not fouund"
        return make_response(jsonify({"Message": error_message}), 401)

    all_departments = hospital.departments

    departments = [department.to_dict() for department in all_departments] # if  all_meds else []
    return jsonify(departments)
'''
    if not all_departments:
        return make_response(jsonify({"Message": "There are currently no departments added for this hospital yet"}), 200)
    else:
'''



@app_views.route("/hospital/<string:hospital_id>/departments", methods=['POST'], strict_slashes=False)
def add_hospital_department(hospital_id):
    """create new department in a hospital"""
    if not request.get_json():
        return make_response(jsonify({"Error": "Not a JSON"}), 400)

    data = request.json

    if "department_id" not in data:
        return make_response(jsonify({"Error": "Missing department_id"}), 400)

    department_id = data['department_id']

    hospital = storage.get(Hospital, hospital_id)
    if not hospital:
        error_message = f"Hospital with hospitalId: {hospital.id} not found"
        return make_response(jsonify({"Message": error_message}), 401)
        
    department = storage.get(Department, department_id)
    if not department:
        error_message = f"Department with departmentId {department.id} not found"
        return make_response(jsonify({"Message": error_message}), 401)

    hospital.departments.append(department)
    storage.save()
    message = f"{department.name} department added to {hospital.name} with hospitalId: {hospital.id} successfully"
    return make_response(jsonify({"Message": message}), 201) 

