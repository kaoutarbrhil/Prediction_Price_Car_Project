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
MODEL_PATH = "C:/Users/dell/Prediction_Price_Car_Project/backend/"
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
