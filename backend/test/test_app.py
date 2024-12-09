import pytest
import json
import sys
import os

# Ajouter le répertoire courant au chemin
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

from app import app, db, User, Prediction_History

@pytest.fixture
def client():
    """Fixture pour configurer un client de test Flask."""
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_index(client):
    """Test de la route d'index."""
    response = client.get('/')
    assert response.status_code == 200
    assert b"Le backend fonctionne correctement !" in response.data

def test_signup(client):
    """Test de l'inscription d'un utilisateur."""
    response = client.post('/signup', json={
        'fullName': 'Test User',
        'email': 'testuser@example.com',
        'password': '12345678!a'
    })
    assert response.status_code == 201
    assert b"User created successfully" in response.data

def test_login(client):
    """Test de la connexion d'un utilisateur."""
    # Inscrire un utilisateur
    client.post('/signup', json={
        'fullName': 'Test User',
        'email': 'testuser@example.com',
        'password': '12345678!a'
    })
    # Connecter l'utilisateur
    response = client.post('/login', json={
        'email': 'testuser@example.com',
        'password': '12345678!a'
    })
    assert response.status_code == 200
    assert b"Login successful" in response.data

def test_predict(client):
    """Test de la prédiction de prix."""
    # Inscrire un utilisateur pour obtenir un ID
    signup_response = client.post('/signup', json={
        'fullName': 'Test User',
        'email': 'testuser@example.com',
        'password': '12345678!a'
    })
    user_id = json.loads(signup_response.data)['message']

    # Effectuer une prédiction
    prediction_response = client.post('/predict', json={
        'manufacturer': 'Toyota',
        'fuel_type': 'Petrol',
        'body_type': 'SUV',
        'transmission': 'Manual',
        'model_year': 2020,
        'kilometers_driven': 50000,
        'owner_no': 1,
        'model_year': 2019,
        'insurance': 'Third Party',
        'engine': 1400, 
        'max_power': 105,
        'torque': 180,
        'wheel_size': 15,
        'no_of_cylinders': 4,
        'turbo_charger': 'Yes',
        'height': 1500,
        'gear_box': 5,
        'tyre_type': 'Tubeless Radial',
        'cargo_volumn': 350,
        'city': "delhi"
    }, headers={'Authorization': user_id})
    assert prediction_response.status_code == 200
    assert 'predicted_price' in json.loads(prediction_response.data)

def test_contact(client):
    """Test du formulaire de contact."""
    response = client.post('/contact', json={
        'name': 'Test User',
        'email': 'testuser@example.com',
        'subject': 'Question',
        'message': 'Ceci est un test.'
    })
    assert response.status_code == 200
    assert b"Votre message a ete envoye avec succes" in response.data

def test_get_prediction_history(client):
    """Test de la récupération de l'historique des prédictions."""
    # Inscrire un utilisateur pour obtenir un ID
    signup_response = client.post('/signup', json={
        'fullName': 'Test User',
        'email': 'testuser@example.com',
        'password': '12345678!a'
    })
    user_id = json.loads(signup_response.data)['message']

    # Ajouter une prédiction à l'historique
    client.post('/predict', json={
        'manufacturer': 'Toyota',
        'fuel_type': 'Petrol',
        'body_type': 'SUV',
        'transmission': 'Manual',
        'model_year': 2020,
        'kilometers_driven': 50000,
        'owner_no': 1,
        'model_year': 2019,
        'insurance': 'Third Party',
        'engine': 1400, 
        'max_power': 105,
        'torque': 180,
        'wheel_size': 15,
        'no_of_cylinders': 4,
        'turbo_charger': 'Yes',
        'height': 1500,
        'gear_box': 5,
        'tyre_type': 'Tubeless Radial',
        'cargo_volumn': 350,
        'city': "delhi"
    }, headers={'Authorization': user_id})

    # Récupérer l'historique
    history_response = client.get('/history', headers={'Authorization': user_id})
    assert history_response.status_code == 200
    assert isinstance(json.loads(history_response.data), list)
