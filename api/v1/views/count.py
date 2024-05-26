#!/usr/bin/python3
"""Counts the number of contents in the db, and checks the status of the API"""

from flask import jsonify
from models import storage
from api.v1.views import app_views
from models.user import User
from models.town import Town
from models.medication import Medication
from models.hospital import Hospital
from models.doctor import Doctor
from models.disease import Disease
from models.county import County
from models.constituency import Constituency
import json

@app_views.route("/status")
def api_status():
    """returns a json file"""
    return jsonify({"status": "OK"})

@app_views.route("/stats")
def count_objects():
    """returns the number of objects"""
    data = {
            "Users": storage.count(User),
            "Towns": storage.count(Town),
            "Medications": storage.count(Medication),
            "Hospitals": storage.count(Hospital),
            "Doctors": storage.count(Doctor),
            "Diseases": storage.count(Disease),
            "Counties": storage.count(County),
            "Constituencies": storage.count(Constituency)
            }
    return jsonify(data)
