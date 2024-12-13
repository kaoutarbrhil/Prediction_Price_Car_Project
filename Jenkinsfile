pipeline {
    agent any

    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Récupérer le code depuis le dépôt Git
                checkout scm
            }
        }

        stage('Setup Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    // Installer les dépendances du backend
                    sh 'pip install -r requirements.txt'
                }
            }
        }

        stage('Setup Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    // Installer les dépendances du frontend
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            // Lancer les tests backend
                            sh 'pytest'
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            // Lancer les tests frontend
                            sh 'npm test -- --watchAll=false'
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    // Construire les fichiers frontend
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Déploiement en cours...'
                // Ajoutez ici vos étapes pour copier ou déployer les fichiers générés sur un serveur
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Pipeline exécuté avec succès.'
        }
        failure {
            echo 'Le pipeline a échoué.'
        }
    }
}
