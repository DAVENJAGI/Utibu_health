#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.disease import Disease
from models.medication import Medication
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/diseases", strict_slashes=False, methods=["GET"])
def return_diseases():
    """get all users"""
    all_diseases = storage.all(Disease).values()
    disease_list = []
    for disease in all_diseases:
        disease_list.append(disease.to_dict())
    return jsonify(disease_list)

@app_views.route("/disease/<string:disease_id>", methods=['GET'], strict_slashes=False)
def get_disease_by_id(disease_id):
    """get user by id"""
    disease = storage.get(Disease, disease_id)
    if disease is None:
        abort(400)
    return jsonify(disease.to_dict())

@app_views.route("/disease/<string:disease_id>/medication", methods=['GET'], strict_slashes=False)
def get_medication_by_disease_id(disease_id):
    """get doctor by id"""
    disease = storage.get(Disease, disease_id)
    
    if disease is None:
        abort(404)
        
    all_meds = disease.medication
    
#    all_meds = storage.all(Medication)
    medication = [meds.to_dict() for meds in all_meds] # if  all_meds else []
    return jsonify(medication)

@app_views.route("/disease/<string:disease_id>/medication", methods=['POST'], strict_slashes=False)
def update_disease_medication_by_medication_id(disease_id):
    """get doctor by id"""
    if not request.get_json():
        return make_response(jsonify({"Error": "Not a JSON"}), 400)

    data = request.json
    
    if "medication_id" not in data:
        return make_response(jsonify({"Error": "Missing medication_id"}), 400)

    medication_id = data['medication_id']

    disease = storage.get(Disease, disease_id)
    if not disease:
        return make_response(jsonify({"Error": "Disease not found"}), 400)
    medication = storage.get(Medication, medication_id)
    if not medication:
        return make_response(jsonify({"Error": "Medication not found"}), 400)

    disease.medication.append(medication)
    storage.save()
    return (jsonify({"Message": "Medication added successfully"}), 201)


@app_views.route("/disease/<string:disease_id>", methods=["DELETE"], strict_slashes=False)
def delete_disease(disease_id):
    """deletes doctor with  specific id"""
    disease = storage.get(Diseae, disease_id)
    if disease is None:
        abort(404)
    disease.delete()
    storage.save()
    return jsonify({})


@app_views.route("/diseases/", methods=["POST"], strict_slashes=False)
def create_disease():
    """Creates a new user"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'name' not in request.get_json():
        return make_response(jsonify({"error": "Missing disease name"}), 400)
    if 'description' not in request.get_json():
        return make_response(jsonify({"error": "Missing user descrption"}), 400)
      
    obj = request.get_json()
    dis = Disease(**obj)
    dis.save()
#    return (jsonify(dis.to_dict()), 201)
    message =  {"Message": "New Disease created successfully. Thank you"}
    return make_response(jsonify(message), 201)


@app_views.route("/disease/<string:disease_id>", methods=['PUT'], strict_slashes=False)
def update_disease(disease_id):
    """updates user's properties except the created, updated, email, and id"""
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    dis = storage.get(Disease, disease_id)
    if dis is None:
        abort(404)
    for key, value in request.get_json().items():
        if key not in ["id", "created_at", "updated_at"]:
            setattr(dis, key, value)
    storage.save()
    return jsonify(dis.to_dict())


