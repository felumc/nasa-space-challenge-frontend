import time
import random
from socketio import Client

# Initialize the SocketIO client
sio = Client()

# Connect to the Flask server
sio.connect('http://localhost:5035')

# Simulate sending data
try:
    while True:
        # Generate random seismic activity data
        seismic_activity = {
            'activity': random.uniform(0, 10)  # Random seismic activity between 0 and 10
        }
        # Emit the data to the server
        sio.emit('update_chart', seismic_activity)
        print(f"Sent data: {seismic_activity}")

        # Wait for a second before sending new data
        time.sleep(0.1)

except KeyboardInterrupt:
    print("Simulation stopped")
finally:
    sio.disconnect()
