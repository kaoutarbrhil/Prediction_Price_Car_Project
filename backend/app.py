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
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///PredictionHistory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)  # Autoriser les requêtes entre origines (frontend-backend)

# Chargement des modèles et des fichiers de transformation
MODEL_PATH = "C:/Users/DELL/Desktop/Prediction_Car_Price_Project/sales-prediction-app/backend/"
with open(f"{MODEL_PATH}car_price_model3.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open(f"{MODEL_PATH}scaler3.pkl", "rb") as scaler_file:
    scaler = pickle.load(scaler_file)

# Point de test pour vérifier si le backend fonctionne
@app.route('/')
def index():
    return "Le backend fonctionne correctement !"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Recevoir les données JSON
        input_data = request.json

        # Récupérer l'ID utilisateur depuis l'en-tête Authorization
        user_id = request.headers.get('Authorization')

        if not user_id:
            return jsonify({"error": "Utilisateur non connecté"}), 401  # L'utilisateur doit être connecté

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

        # Enregistrer l'historique de la prédiction dans la base de données
        prediction_history = Prediction_History(
            manufacturer=input_data['manufacturer'],
            fuel_type=input_data['fuel_type'],
            transmission=input_data['transmission'],
            model_year=input_data['model_year'],
            kms_driven=input_data['kilometers_driven'],
            num_owners=input_data['owner_no'],
            predicted_price=prediction,
            user_id=user_id  # Utilisation de l'ID de l'utilisateur récupéré
        )
        
        db.session.add(prediction_history)
        db.session.commit()

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
class Prediction_History(db.Model):
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

    # Définir la relation pour accéder facilement aux utilisateurs
    user = db.relationship('User', backref=db.backref('predictions', lazy=True))

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

# Route pour l'historique des prédictions
@app.route('/history', methods=['GET'])
def get_prediction_history():
    try:
        # Récupérer l'ID utilisateur depuis l'en-tête Authorization
        user_id = request.headers.get('Authorization')

        if not user_id:
            return jsonify({"error": "Utilisateur non connecté"}), 401  # L'utilisateur doit être connecté

        # Récupérer toutes les prédictions liées à l'utilisateur
        predictions = Prediction_History.query.filter_by(user_id=user_id).all()

        predictions_list = []
        for prediction in predictions:
            predictions_list.append({
                'id': prediction.id,
                'manufacturer': prediction.manufacturer,
                'fuel_type': prediction.fuel_type,
                'transmission': prediction.transmission,
                'model_year': prediction.model_year,
                'kms_driven': prediction.kms_driven,
                'num_owners': prediction.num_owners,
                'predicted_price': prediction.predicted_price,
                'timestamp': prediction.timestamp
            })

        return jsonify(predictions_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Route pour le formulaire de contact
@app.route('/contact', methods=['POST'])
def contact():
    try:
        # Récupérer les données envoyées dans le corps de la requête JSON
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        # Valider les données (vous pouvez ajouter plus de validation selon votre besoin)
        if not name or not email or not subject or not message:
            return jsonify({'error': 'Tous les champs doivent être remplis.'}), 400

        # Traitement des données (par exemple, enregistrement dans une base de données ou envoi par email)
        # Enregistrer le message dans la base de données (optionnel)
        # new_contact = ContactMessage(name=name, email=email, subject=subject, message=message)
        # db.session.add(new_contact)
        # db.session.commit()

        # Si vous souhaitez envoyer un email (optionnel)
        # msg = Message(subject, recipients=['admin@example.com'], body=message, sender=email)
        # mail.send(msg)

        # Réponse de succès
        return jsonify({'message': 'Votre message a été envoyé avec succès.'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

	
