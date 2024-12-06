from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy.orm import Session

# Initialisation de l'application Flask
app = Flask(__name__)

# Configuration de la base de données
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///PredictionHistory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)  # Autoriser les requêtes entre origines (frontend-backend)

# Chargement des modèles et des fichiers de transformation
MODEL_PATH = "C:/Users/Aya/Prediction_Car_Price_Project2/Prediction_Car_Price_Project/sales-prediction-app/backend/"
with open(f"{MODEL_PATH}car_price_model3.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open(f"{MODEL_PATH}scaler3.pkl", "rb") as scaler_file:
    scaler = pickle.load(scaler_file)


# Point de test pour vérifier si le backend fonctionne
@app.route('/')
def index():
    return "Le backend fonctionne correctement !"

# Route pour prédire le prix d'une voiture
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Recevoir les données JSON
        input_data = request.json  

        # Convertir les données en DataFrame
        input_df = pd.DataFrame([input_data])

        input_df = pd.get_dummies(input_df).reindex(columns=model.feature_names_in_, fill_value=0)

        numerical_cols = [
        'kilometers_driven', 'owner_no', 'model_year', 'engine', 'max_power', 
        'torque', 'wheel_size', 'no_of_cylinders', 'height', 'gear_box', 'cargo_volumn'
        ]

        input_df[numerical_cols] = scaler.transform(input_df[numerical_cols])

        # Faire la prédiction
        prediction = model.predict(input_df)[0]

        return jsonify({"predicted_price": prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Modèle de base de données pour les utilisateurs
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

# Modèle pour l'historique des prédictions
class PredictionHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    manufacturer = db.Column(db.String(255), nullable=False)
    fuel_type = db.Column(db.String(50), nullable=False)
    transmission = db.Column(db.String(50), nullable=False)
    model_year = db.Column(db.Integer, nullable=False)
    kms_driven = db.Column(db.Integer, nullable=False)
    num_owners = db.Column(db.Integer, nullable=False)
    predicted_price = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Créer la base de données
with app.app_context():
    db.create_all()

# Route pour l'inscription d'un utilisateur
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    full_name = data.get('fullName')
    email = data.get('email')
    password = data.get('password')

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(full_name=full_name, email=email, password=hashed_password)

    with Session(db.engine) as session:
        # Vérifier si l'email existe déjà
        if session.query(User).filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 409

        session.add(new_user)
        session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# Route pour la connexion d'un utilisateur
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    with Session(db.engine) as session:
        user = session.query(User).filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return jsonify({
                'message': 'Login successful',
                'user': {'id': user.id, 'fullName': user.full_name, 'email': user.email}
            }), 200

    return jsonify({'error': 'Invalid email or password'}), 401
# Route to fetch user details
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': user.id,
        'name': user.full_name,
        'email': user.email,
    }), 200

# Route to update user details
@app.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Update user information
    user.full_name = data.get('name', user.full_name)
    user.email = data.get('email', user.email)
    
    # Update password only if provided
    if 'password' in data and data['password']:
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200

# Route pour récupérer les détails d'un utilisateur
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    with Session(db.engine) as session:
        user = session.get(User, user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        return jsonify({
            'id': user.id,
            'name': user.full_name,
            'email': user.email,
        }), 200

# Route pour mettre à jour les détails d'un utilisateur
@app.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    with Session(db.engine) as session:
        user = session.get(User, user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Mise à jour des informations utilisateur
        user.full_name = data.get('name', user.full_name)
        user.email = data.get('email', user.email)

        # Mise à jour du mot de passe si fourni
        if 'password' in data and data['password']:
            user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    
    
    # Route pour afficher l'historique des prédictions pour un utilisateur spécifique
@app.route('/history', methods=['GET'])
def get_prediction_history():
    try:
        # Récupérer l'utilisateur connecté (ici, on utilise un ID fixe pour l'exemple)
        user_id = 1  # Remplacer par l'ID de l'utilisateur authentifié
        
        # Récupérer toutes les prédictions liées à l'utilisateur
        predictions = PredictionHistory.query.filter_by(user_id=user_id).all()
        
        predictions_list = []
        for prediction in predictions:
            predictions_list.append({
                'id': prediction.id,
                'manufacturer': prediction.manufacturer,
                'fuel_type': prediction.fuel_type,
                'body_type': prediction.body_type,
                'transmission': prediction.transmission,
                'insurance': prediction.insurance,
                'turbo_charger': prediction.turbo_charger,
                'tyre_type': prediction.tyre_type,
                'model_year': prediction.model_year,
                'engine_size': prediction.engine_size,
                'kilometers_driven': prediction.kilometers_driven,
                'torque': prediction.torque,
                'max_power': prediction.max_power,
                'gear_box': prediction.gear_box,
                'no_of_cylinders': prediction.no_of_cylinders,
                'wheel_size': prediction.wheel_size,
                'height': prediction.height,
                'cargo_volume': prediction.cargo_volume,
                'owner_no': prediction.owner_no,
                'predicted_price': prediction.predicted_price,
                'timestamp': prediction.timestamp
            })
        
        return jsonify(predictions_list)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
