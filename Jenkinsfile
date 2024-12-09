pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        DOCKER_IMAGE_FRONTEND = 'react-frontend-image'
        DOCKER_IMAGE_BACKEND = 'flask-backend-image'
    }

    stages {
        stage('Build Frontend') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE_FRONTEND, "./${FRONTEND_DIR}")
                }
            }
        }
        stage('Build Backend') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE_BACKEND, "./${BACKEND_DIR}")
                }
            }
        }
         stage('Run Backend Tests') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE_BACKEND).inside {
                        sh 'pytest'  // Lancer les tests backend dans le conteneur
                    }
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE_FRONTEND).inside {
                        sh 'npm test -- --watchAll=false'  // Lancer les tests frontend dans le conteneur
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Déployer les images Docker sur un serveur ou une plateforme de déploiement'
                // Déploiement de Docker ou autre action ici
            }
        }
    }
}
