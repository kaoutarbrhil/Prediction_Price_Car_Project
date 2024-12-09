# Étape 1: Utiliser l'image Python comme base
FROM python:3.9

# Étape 2: Définir le répertoire de travail
WORKDIR /app

# Étape 3: Copier les fichiers de dépendances
COPY ./backend/requirements.txt ./

# Étape 4: Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Étape 5: Copier le reste du code source
COPY ./backend ./

# Étape 6: Exposer le port pour accéder à l'application
EXPOSE 5000

# Étape 7: Lancer l'application Flask avec Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
