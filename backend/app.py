from flask import Flask, send_from_directory, jsonify, request

app = Flask(__name__, static_folder="build")

@app.route("/")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

# Endpoint pour prédiction
@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.json
    product = data.get("product", "Unknown")
    # Exemple de prédiction (statique ici)
    prediction = {"product": product, "predicted_price": 120.5}
    return jsonify(prediction)

# Pour les fichiers statiques (CSS, JS)
@app.route("/<path:path>")
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(debug=True)
