import json
from flask import Flask, jsonify, request, send_file
import os
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/csv", methods=["POST"])
def getCsv():
  downloaded_file = "./file.csv"
  headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
  response = requests.get(request.json['url'], headers=headers)
  with open(downloaded_file, "wb") as file:
    file.write(response.content)
  return send_file("./file.csv", as_attachment=True )

@app.route("/", methods=['POST'])
def convert_json_to_text(output_file = "./output.txt"):
    data = request.json


    with open(output_file, 'w') as file:
        json.dump(data, file, indent=4)
    if os.path.exists(output_file):
      return send_file(output_file, as_attachment=True)
    else:
        return jsonify({'message': 'File not found'})




# Convert JSON to text file
if __name__ == "__main__":
  app.run()