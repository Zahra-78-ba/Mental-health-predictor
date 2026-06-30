# predict.py (Flask backend)
from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

HIGH_RISK = {"yes", "often", "always"}
MEDIUM_RISK = {"sometimes", "rarely"}
THRESHOLD = 5

def clean_words(text):
    return re.findall(r'\b\w+\b', text.lower())

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        answers = data.get("answers", [])
        if not isinstance(answers, list):
            return jsonify({"error": "Invalid input"}), 400

        score = 0
        for ans in answers:
            words = set(clean_words(ans))
            if words & HIGH_RISK:
                score += 2
            elif words & MEDIUM_RISK:
                score += 1

        if score >= THRESHOLD:
            result = "⚠️ You may need professional mental health support. Please consider speaking to a counselor or therapist."
        else:
            result = "✅ You seem to be doing well! Keep taking care of your mental health and check in regularly."

        return jsonify({ "prediction": result })

    except Exception as e:
        print("Error in /predict:", e)
        return jsonify({"error": "Server error"}), 500

if __name__ == "__main__":
    app.run(port=5001)
