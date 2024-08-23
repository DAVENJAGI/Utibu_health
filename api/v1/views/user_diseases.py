#!/usr/bin/python3
"""Creates the first route, /users"""

from api.v1.views import app_views
from flask import jsonify, Blueprint, abort, request
from models import storage
from models.user import User
from models.disease import Disease
from models.authorization import require_doctor_or_admin_or_user_auth
import json

# user_view = Blueprint("users", __name__)


@app_views.route("/user/<string:user_id>/disease/", methods=['GET'], strict_slashes=False)
@require_doctor_or_admin_or_user_auth
def get_disease_by_user_id(user_id):
    """get diseases associated to a certain specific user"""
    user = storage.get(User, user_id)
    if user is None:
        abort(404)
   
    disease = [dis.to_dict() for dis in user.diseases]
    return jsonify(disease)
