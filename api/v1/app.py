#!/usr/bin/python3
"""creates a variable app, instance of flask, and tears down.
It then starts the API running on the port 5000, and address 0.0.0.0
"""
from gevent import monkey
monkey.patch_all()

from flask import Flask, request
from api.v1.views import app_views
from models import storage
import os
from flask import jsonify
from flask_cors import CORS
from models.request import Request
import secrets
from flask_socketio import SocketIO


app = Flask(__name__)
CORS(app)
app.register_blueprint(app_views)
app.secret_key = secrets.token_hex(32)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.after_request
def add_header(response):
    response.headers.add('Access-Control-Expose-Headers', 'X-Custom-Token')
#    response.headers.add('Access-Control-Expose-Headers', 'session_id')

    return response

@app.teardown_appcontext
def teardown(exception=None):
    """Closes a session"""
    storage.close()


@app.before_request
def count_api_calls():
    """Count and save API calls"""
    endpoint = request.path
    method = request.method
    new_request = Request(endpoint=endpoint, method=method)
    new_request.save()


@app.errorhandler(404)
def not_found(error):
    """returns a json string of error 404"""
    return jsonify({"error":  "Not found"}), 404


if __name__ == "__main__":
    host = os.getenv("utibu_API_HOST", "0.0.0.0")
    port = int(os.getenv("utibu_API_PORT", 5000))
#    app.run(host=host, port=port, threaded=True)
    socketio.run(app, host=host, port=port)
    
