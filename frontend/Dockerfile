# Étape 1: Utiliser l'image Node.js comme base
FROM node:16

# Étape 2: Définir le répertoire de travail
WORKDIR /app

# Étape 3: Copier les fichiers du projet dans le conteneur
COPY ./frontend/package*.json ./

# Étape 4: Installer les dépendances
RUN npm install

# Étape 5: Copier tout le code source dans le conteneur
COPY ./frontend ./

# Étape 6: Construire l'application
RUN npm run build

# Étape 7: Exposer le port pour accéder à l'application
EXPOSE 3000

# Étape 8: Lancer l'application
CMD ["npm", "start"]
