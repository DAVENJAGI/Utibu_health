#!/usr/bin/python3
"""init for the views module"""
from flask import Blueprint


app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.count import *
from api.v1.views.user import *
from api.v1.views.doctor import *
from api.v1.views.hospital import *
