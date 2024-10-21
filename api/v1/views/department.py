#!/usr/bin/python3
"""Creates the routes associated with departments"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response, session
from models import storage
from models.user import User
from models.disease import Disease
from models.department import Department
from models.vital import Reading
from models.user_session import userSession
from models.authorization import require_user_auth, require_admin_auth, require_doctor_auth, require_doctor_or_admin_or_user_auth
from models.authorization import require_user_or_admin_auth
import json
from datetime import datetime
from werkzeug.security import generate_password_hash


from functools import wraps
import secrets


@app_views.route("/departments", strict_slashes=False, methods=["GET"])
@require_admin_auth
def return_departments():
    """get all departments"""
    all_departments = storage.all(Department).values()
    department_list = []
    for department in all_departments:
        department_list.append(department.to_dict())
    return jsonify(department_list)

@app_views.route("/department/<string:department_id>", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_department_by_id(department_id):
    """get department by department id"""
    department = storage.get(Department, department_id)
    if department is None:
        error_message = f"Department with id {department_id} not found"
        return make_response(jsonify({"Message": error_message}), 401) 
    return jsonify(department.to_dict())

@app_views.route("department/<string:department_id>", methods=["DELETE"], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def delete_department(department_id):
    """deletes department with  specific id"""
    department = storage.get(Department, department_id)
    if department is None:
        error_message = f"Department with id {department_id} not found"
        return make_response(jsonify({"Message": error_message}), 401) 

    department.delete()
    storage.save()
    message = f"Department {department.name} with departmentId: {department.id} deleted successfully."
    return (jsonify({"Message": message}), 200)


@app_views.route("/departments/", methods=["POST"], strict_slashes=False)
# @require_doctor_auth
def create_department():
    """Creates a new department"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'name' not in request.get_json():
        return make_response(jsonify({"error": "Missing department name"}), 400)
    if 'description' not in request.get_json():
        return make_response(jsonify({"error": "Missing department description"}), 400)

    obj = request.get_json()
    dept = Department(**obj)
    dept.save()
    message = f"New department {dept.name} with departmentId: {dept.id} created successfully."
    return (jsonify({"Message": message}), 201)

@app_views.route("/department/<string:department_id>", methods=['PUT'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def update_department(department_id):
    """updates department's properties except the created_at, updated_at, and id"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    dept = storage.get(Department, department_id)
    if dept is None:
        error_message = f"Department with departmentId {dept.id} not found"
        return make_response(jsonify({"Message": error_message}), 401)

    for key, value in request.get_json().items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(dept, key, value)
    storage.save()
    message = f"Department {dept.name} with departmentId: {dept.id} updated successfully."
    return (jsonify({"Message": message}), 201)

