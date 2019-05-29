from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from solver import Solve
import pickle
from keras.models import load_model

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

MODEL_FILENAME = "captcha_model.hdf5"
MODEL_LABELS_FILENAME = "model_labels.dat"
with open(MODEL_LABELS_FILENAME, "rb") as f:
	lb = pickle.load(f)

model = load_model(MODEL_FILENAME)
@app.route('/', methods=['POST', 'GET', 'OPTIONS'])
@cross_origin()
def hello():
	base64 = request.get_json()["base64"]
	return jsonify(Solve(model,lb,base64))