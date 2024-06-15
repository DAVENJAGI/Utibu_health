#!/usr/bin/python3
"""Creates the endpoint route for /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request, make_response
from models import storage
from models.county import County
from models.constituency import Constituency
from models.town import Town
import json
from sqlalchemy.orm import joinedload, session 

# user_view = Blueprint("users", __name__)

# GETS ALL LOCATIONS AVAILABLE, ie, COUNTIES, AND COUNTY BY ID
@app_views.route("/counties", strict_slashes=False, methods=["GET"])
def return_counties():
    """get all counties"""
    all_counties = storage.all(County).values()
    county_list = []
    for county in all_counties:
        county_list.append(county.to_dict())
    return jsonify(county_list)

@app_views.route("/county/<string:county_id>", methods=['GET'], strict_slashes=False)
def get_county_by_id(county_id):
    """get a specific county by county_id"""
    county = storage.get(County, county_id)
    if county is None:
        abort(400) 
    return jsonify(county.to_dict())

# GETS ALL WARDS PRESENT IN A CERTAIN COUNTY
@app_views.route("/county/<string:county_id>/wards", methods=['GET'], strict_slashes=False)
def get_wards_by_county_id(county_id):
    """gets all wards in a county"""
    county = storage.get(County, county_id)

    if county is None:
        abort(404)

    all_wards = county.wards 

    if not all_wards:
        return make_response(jsonify({"Error": "No wards added for this county yet"}), 400)
    else:
        ward = [ward.to_dict() for ward in all_wards] # if  all_meds else []
        return jsonify(ward)


# GETS ALL WARDS IN A CONSTITUENCY AND A WARD PRESENT IN A CERTAIN CONSTITUENCY BY ID
@app_views.route("/constituency/<string:constituency_id>/wards", methods=['GET'], strict_slashes=False)
def get_wards_in_constituency(constituency_id):
    """gets all wards in a specific constituency"""
    constituency = storage.get(Constituency, constituency_id)

    if constituency is None:
        abort(404)

    all_wards = constituency.wards 

    if not all_wards:
        return make_response(jsonify({"Error": "No wards added for this constituency yet"}), 400)
    else:
        wards = [ward.to_dict() for ward in all_wards] # if  all_meds else []
        return jsonify(wards)

@app_views.route("/constituency/<string:constituency_id>/ward/<string:ward_id>", methods=['GET'], strict_slashes=False)
def get_ward_by_constituency_id(constituency_id, ward_id):
    """gets a specific ward in a specific constituency and filter by id"""
    constituency = storage.get(Constituency, constituency_id)

    if constituency is None:
        abort(404)

    all_wards = constituency.wards

    if not all_wards:
        return make_response(jsonify({"Error": "No wards added for this county yet"}), 400)
    else:
        ward = [ward for ward in all_wards if ward.id == ward_id] # if  all_meds else []

        if not ward:
            return make_response(jsonify({"Error": "Ward with Id not found"}), 400)
        else:
            ward_data = ward[0].to_dict()
            return jsonify(ward_data)



#GETS A SPECIFIC CONSTITUENCY BY FILTERING IT WITH CONSTITUENCY ID
@app_views.route("/county/<string:county_id>/constituency/<string:constituency_id>", methods=['GET'], strict_slashes=False)
def get_constictuencites_by_county_id(county_id, constituency_id):
    """gets a constituency in a county and filter a specific one by id"""
    county = storage.get(County, county_id)

    if county is None:
        abort(404)

    all_consts = county.constituencies

    if not all_consts:
        return make_response(jsonify({"Error": "No constituencies added for this county yet"}), 400)
    else:
        constituency = [consts for consts in all_consts if consts.id == constituency_id] # if  all_meds else []

        if not constituency:
            return make_response(jsonify({"Error": "Constituency with Id not found"}), 400)
        else:
            consts_data = constituency[0].to_dict()
            return jsonify(consts_data)

