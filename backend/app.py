from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd
from sklearn.preprocessing import StandardScaler
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS



app = Flask(__name__)

# Load the model and scaler
with open("C:/Users/DELL/Desktop/Prediction_Car_Price/sales-prediction-app/backend/car_price_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("C:/Users/DELL/Desktop/Prediction_Car_Price/sales-prediction-app/backend/scaler.pkl", "rb") as scaler_file:
    scaler = pickle.load(scaler_file)

# Categories for one-hot encoding
fuel_types = ['petrol', 'diesel', 'electric', 'cng', 'lpg']
body_types = ['suv', 'Minivans','hatchback', 'sedan','muv', 'hybrids', 'coupe', 'pickup trucks', 'convertibles', 'Wagon']
transmissions = ['manual', 'automatic']
insurances = ['third party', 'comprehensive','zero dep','not available']
turbochargers = ['yes', 'no','twin','turbo']
tyre_types = ['tubeless radial', 'tubeless', 'run-flat','radial','tubeless runflat']
manufacturers = ['kia', 'maruti', 'nissan', 'hyundai', 'honda', 'mercedes-benz', 'bmw', 'ford', 'tata', 'jeep', 
                 'toyota', 'audi', 'mahindra', 'renault', 'chevrolet', 'volkswagen', 'datsun', 'fiat', 'land rover',
                 'mg', 'skoda', 'isuzu', 'mini', 'volvo', 'jaguar', 'citroen', 'mitsubishi', 'mahindra renault', 
                 'mahindra ssangyong', 'lexus', 'hindustan motors', 'opel', 'porsche']
cities = ['chennai', 'hyderabad', 'bangalore', 'delhi', 'jaipur', 'kolkata']

@app.route('/')
def index():
    return render_template('index.html', cities=cities)

@app.route('/predict', methods=['POST'])
def predict():
    # Get form data from the user
    fuel_type = request.form.get('fuel_type')
    body_type = request.form.get('body_type')
    kilometers_driven = float(request.form.get('kilometers_driven'))
    transmission = request.form.get('transmission')
    owner_no = int(request.form.get('owner_no'))
    manufacturer = request.form.get('manufacturer')
    model_year = int(request.form.get('model_year'))
    insurance = request.form.get('insurance')
    engine = float(request.form.get('engine'))
    max_power = float(request.form.get('max_power'))
    torque = float(request.form.get('torque'))
    wheel_size = float(request.form.get('wheel_size'))
    no_of_cylinders = int(request.form.get('no_of_cylinders'))
    turbo_charger = request.form.get('turbo_charger')
    height = float(request.form.get('height'))
    gear_box = int(request.form.get('gear_box'))
    tyre_type = request.form.get('tyre_type')
    cargo_volumn = float(request.form.get('cargo_volumn'))
    city = request.form.get('city')

    # Prepare input data for prediction
    input_data = {
        "fuel_type": fuel_type,
        "body_type": body_type,
        "kilometers_driven": kilometers_driven,
        "transmission": transmission,
        "owner_no": owner_no,
        "manufacturer": manufacturer,
        "model_year": model_year,
        "insurance": insurance,
        "engine": engine,
        "max_power": max_power,
        "torque": torque,
        "wheel_size": wheel_size,
        "no_of_cylinders": no_of_cylinders,
        "turbo_charger": turbo_charger,
        "height": height,
        "gear_box": gear_box,
        "tyre_type": tyre_type,
        "cargo_volumn": cargo_volumn,
        "city": city
    }

    # Convert input data to a DataFrame and apply transformations
    input_df = pd.DataFrame([input_data])
    input_df = pd.get_dummies(input_df)
    numerical_cols = [
        'kilometers_driven', 'owner_no', 'model_year', 'engine', 'max_power', 
        'torque', 'wheel_size', 'no_of_cylinders', 'height', 'gear_box', 'cargo_volumn'
    ]
    input_df[numerical_cols] = scaler.transform(input_df[numerical_cols])

    # Make prediction
    prediction = model.predict(input_df)[0]

    # Return result as JSON or render template with prediction
    return jsonify({"predicted_price": f"₹{prediction:,.2f} lakhs"})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app) # Autorise les requêtes entre origines (frontend-backend)

# Modèle de base de données
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

# Créer la base de données
with app.app_context():
    db.create_all()

# Route d'inscription
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

# Route de connexion
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'fullName': user.full_name, 'email': user.email}}), 200
    return jsonify({'error': 'Invalid email or password'}), 401



if __name__ == '__main__':
    app.run(debug=True)
