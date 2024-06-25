#!/usr/bin/python3
"""Creates the route medication"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request
from models import storage
from models.medication import Medication
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/medications", strict_slashes=False, methods=["GET"])
def return_meds():
    """get all medications"""
    all_meds = storage.all(Medication).values()
    meds_list = []
    for med in all_meds:
        meds_list.append(med.to_dict())
    return jsonify(meds_list)

@app_views.route("/meds/<string:medication_id>", methods=['GET'], strict_slashes=False)
def get_medication_by_id(medication_id):
    """get a specific medication by id"""
    med = storage.get(Medication, medication_id)
    if med is None:
        abort(400) 
    return jsonify(med.to_dict())

@app_views.route("/medication/<string:medication_id>", methods=["DELETE"], strict_slashes=False)
def delete_medication(medication_id):
    """deletes a specific medication by use of medication_id"""
    med = storage.get(Medication, medication_id)
    if med is None:
        abort(404)
    med.delete()
    storage.save()
    return jsonify({})


@app_views.route("/medications/", methods=["POST"], strict_slashes=False)
def create_medication():
    """Creates a new medication"""
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
    if "medication_price" not in request.get_json():
        return make_response(jsonify({"error": "Missing medication price"}), 400)
    
    obj = request.get_json()
    med = Medication(**obj)
    med.save()
    return (jsonify(med.to_dict()), 201)

@app_views.route("/medication/<string:medication_id>", methods=['PUT'], strict_slashes=False)
def update_medication(medication_id):
    """updates specific medication properties except the created_at, updated_at, and id"""
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

