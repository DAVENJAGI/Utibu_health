#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request
from models import storage
from models.user import User
from models.disease import Disease
import json

# user_view = Blueprint("users", __name__)


@app_views.route("/user/<string:user_id>/disease/", methods=['GET'], strict_slashes=False)
def get_disease_by_user_id(user_id):
    """get doctor by id"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
   
    disease = [dis.to_dict() for dis in user.diseases]
    return jsonify(disease)
