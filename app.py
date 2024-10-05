from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app)  # Allow all origins for development
socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000')  # Allow React app origin

@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('update_chart')
def handle_update_chart(data):
    # This function can be called to emit data to the connected client
    socketio.emit('update_chart', data)
    print(f"Emitted data: {data}")

if __name__ == '__main__':
    socketio.run(app, port=5035)
