from flask import Flask, jsonify
from datetime import datetime

app = Flask(__name__)

# Dictionary to store request counts per day
request_counts = {}

# Middleware to count requests
@app.before_request
def count_requests():
    today = datetime.now().strftime('%Y-%m-%d')

    if today in request_counts:
        request_counts[today] += 1
    else:
        request_counts[today] = 1

# Route to get request count for today
@app.route('/requests', methods=['GET'])
def get_request_count():
    today = datetime.now().strftime('%Y-%m-%d')
    count = request_counts.get(today, 0)
    return jsonify({'date': today, 'count': count})


