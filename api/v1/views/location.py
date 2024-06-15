#!/usr/bin/python3
"""Creates the endpoint route for /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.county import County 
from models.town import Town
import json
from sqlalchemy.orm import joinedload, session 

# user_view = Blueprint("users", __name__)

@app_views.route("/counties", strict_slashes=False, methods=["GET"])
def return_counties():
    """get all hospitals"""
    all_counties = storage.all(County).values()
    county_list = []
    for county in all_counties:
        county_list.append(county.to_dict())
    return jsonify(county_list)

@app_views.route("/county/<string:county_id>", methods=['GET'], strict_slashes=False)
def get_county_by_id(county_id):
    """get a specific hospital by hospital_id"""
    county = storage.get(County, county_id)
    if county is None:
        abort(400) 
    return jsonify(county.to_dict())

@app_views.route("/county/<string:county_id>/wards", methods=['GET'], strict_slashes=False)
def get_wards_by_county_id(county_id):
    """gets appointment by user id"""
    county = storage.get(County, county_id)

    if county is None:
        abort(404)

    all_wards = county.wards 

    if not all_wards:
        return make_response(jsonify({"Error": "No wards added for this county yet"}), 400)
    else:
        ward = [ward.to_dict() for ward in all_wards] # if  all_meds else []
        return jsonify(ward)


