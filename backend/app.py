'''
from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# Initialisation de l'application Flask
app = Flask(__name__)

# Configuration de la base de données
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)  # Autoriser les requêtes entre origines (frontend-backend)

# Chargement des modèles et des fichiers de transformation
MODEL_PATH = "C:/Users/Aya/Prediction_Price_Car_Project/backend/"
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
        
        # Colonnes catégoriques identifiées (remplacez par les vôtres)
        categorical_columns = ['fuel_type', 'body_type', 'transmission', 
                               'manufacturer', 'insurance', 'turbo_charger', 
                               'tyre_type', 'city']
        
        # Appliquer pd.get_dummies uniquement aux colonnes catégoriques
        input_df_encoded = pd.get_dummies(input_df, columns=categorical_columns)
        
        # Aligner sur les colonnes du modèle (assure cohérence)
        input_df_encoded = input_df_encoded.reindex(columns=model.feature_names_in_, fill_value=0)
        
        # Faire la prédiction
        prediction = model.predict(input_df_encoded)[0]
        
        return jsonify({"predicted_price": prediction})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Modèle de base de données pour les utilisateurs
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

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

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(full_name=full_name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# Route pour la connexion d'un utilisateur
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
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

if __name__ == '__main__':
    app.run(debug=True)
'''

from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy.orm import Session  # Import Session

# Initialisation de l'application Flask
app = Flask(__name__)

# Configuration de la base de données
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)  # Autoriser les requêtes entre origines (frontend-backend)

# Chargement des modèles et des fichiers de transformation
MODEL_PATH = "C:/Users/Aya/Prediction_Price_Car_Project/backend/"
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

        # Colonnes catégoriques identifiées (remplacez par les vôtres)
        categorical_columns = ['fuel_type', 'body_type', 'transmission', 
                               'manufacturer', 'insurance', 'turbo_charger', 
                               'tyre_type', 'city']

        # Appliquer pd.get_dummies uniquement aux colonnes catégoriques
        input_df_encoded = pd.get_dummies(input_df, columns=categorical_columns)

        # Aligner sur les colonnes du modèle (assure cohérence)
        input_df_encoded = input_df_encoded.reindex(columns=model.feature_names_in_, fill_value=0)

        # Faire la prédiction
        prediction = model.predict(input_df_encoded)[0]

        return jsonify({"predicted_price": prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Modèle de base de données pour les utilisateurs
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

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

if __name__ == '__main__':
    app.run(debug=True)
