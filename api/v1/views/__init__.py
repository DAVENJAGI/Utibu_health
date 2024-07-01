#!/usr/bin/python3
"""init for the views module
Creates a blueprint for the app_views object. Then imports views
from the api.v1.views package. IMporting routes related to various files in the module.
"""
from flask import Blueprint


app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.count import *
from api.v1.views.user import *
from api.v1.views.doctor import *
from api.v1.views.hospital import *
from api.v1.views.medication import *
from api.v1.views.disease import *
from api.v1.views.login import *
from api.v1.views.location import *
