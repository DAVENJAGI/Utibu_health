#!/usr/bin/python3
"""This is a script to check if my websockets are showing information update"""
import socketio

sio = socketio.Client()
room_name = "36f5c732-0ba9-4ba5-97fe-49c67ec03aa9" 

@sio.event
def connect():
    print("Connected the websocket server")
#    sio.emit('join', room_name)
#   print(f"Joined room: {room_name}")


@sio.event
def test_event(data):
    print(f"Good boy, it's wokriking{data}")

@sio.event
def appointment_update(data):
    print(f"appointment updated {data}")

@sio.event
def disconnect():
    print("Disconnected from the websocket server")

sio.connect('http://0.0.0.0:5000')
sio.wait()
