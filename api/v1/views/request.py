#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request
from models import storage
from models.request import Request
import json

# user_view = Blueprint("users", __name__)

@app_views.route("/requests", strict_slashes=False, methods=["GET"])
def return_requests():
    """get all requests"""
    all_requests = storage.all(Request).values()
    request_list = []
    for request in all_requests:
        request_list.append(request.to_dict())
    return jsonify(request_list)

