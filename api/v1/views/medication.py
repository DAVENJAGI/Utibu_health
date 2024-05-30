#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request
from models import storage
from models.medication import Medication
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/medications", strict_slashes=False, methods=["GET"])
def return_meds():
    """get all users"""
    all_meds = storage.all(Medication).values()
    meds_list = []
    for med in all_meds:
        meds_list.append(med.to_dict())
    return jsonify(meds_list)

@app_views.route("/meds/<string:medication_id>", methods=['GET'], strict_slashes=False)
def get_medication_by_id(medication_id):
    """get user by id"""
    med = storage.get(Medication, medication_id)
    if med is None:
        abort(400) 
    return jsonify(med.to_dict())

@app_views.route("/medication/<string:medication_id>", methods=["DELETE"], strict_slashes=False)
def delete_medication(medication_id):
    """deletes doctor with  specific id"""
    med = storage.get(Medication, medication_id)
    if med is None:
        abort(404)
    med.delete()
    storage.save()
    return jsonify({})


@app_views.route("/medications/", methods=["POST"], strict_slashes=False)
def create_medication():
    """Creates a new user"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'name' not in request.get_json():
        return make_response(jsonify({"error": "Missing medication name"}), 400)
    if 'description' not in request.get_json():
        return make_response(jsonify({"error": "Missing medication description"}), 400)
    if 'dosage' not in request.get_json():
        return make_response(jsonify({"error": "Missing medication dosage"}), 400)
    if 'in_stock' not in request.get_json():
        return make_response(jsonify({"error": "Missing medication in stock"}), 400)
    
    obj = request.get_json()
    med = Medication(**obj)
    med.save()
    return (jsonify(med.to_dict()), 201)

@app_views.route("/medication/<string:medication_id>", methods=['PUT'], strict_slashes=False)
def update_medication(medication_id):
    """updates user's properties except the created, updated, email, and id"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    med = storage.get(Medication, medication_id)
    if med is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(med, key, value)
    storage.save()
    return jsonify(med.to_dict())

