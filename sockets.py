#!/usr/bin/python3
"""This is a script to check if my websockets are showing information update"""
import socketio

sio = socketio.Client()

@sio.event
def connect():
    print("Connected the websocket server")
   

@sio.event
def appointment_update(data):
    if 'message' in data:
        print('Dear patient, your appointment has been confirmed by your doctor:', data['message'])
    else:
        print(f"Received appointment update data: {data}")

@sio.event
def disconnect():
    print("Disconnected from the websocket server")

sio.connect('http://0.0.0.0:5000')
sio.wait()
