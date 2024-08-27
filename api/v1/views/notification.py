#!/usr/bin/python3
"""creates a variable app, instance of flask, and tears down.
It then starts the API running on the port 5000, and address 0.0.0.0
"""

from flask import Flask, request
from api.v1.views import app_views
from models import storage
import os
from flask import jsonify
from flask_cors import CORS
from models.request import Request
from models.appointment import Appointment
import secrets
from flask_socketio import SocketIO
from models.authorization import require_doctor_or_admin_auth

#socketio = SocketIO(app)

app = Flask(__name__)
CORS(app)
app.register_blueprint(app_views)
app.secret_key = secrets.token_hex(32)
# socketio = SocketIO(app)

@app_views.route("/appointment/<string:appointment_id>/", methods=['PUT'], strict_slashes=False)
@require_doctor_or_admin_auth
def update_appointment_with_id(appointment_id):
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    appointment = storage.get(Appointment, appointment_id)
        
    if appointment is None:
        abort(404)

    data = request.get_json()

    appointment_columns = Appointment.__table__.columns.keys()

    old_status = appointment.appointment_status

    print("Before update:", appointment.to_dict())
    for key, value in data.items():
        if key in appointment_columns and key not in ["id", "created_at", "doctor_id", "updated_at"]:
            setattr(appointment, key, value)
    print("After update:", appointment.to_dict())
    storage.save()
#    return jsonify(appointment.to_dict())
    if old_status != appointment.appointment_status and appointment.user_id:
        socketio.emit('appointment_update', appointment.to_dict(), room=appointment.user_id)
    return (jsonify({"Message": "Appointment Updated successfully. Thank You"}), 201)

