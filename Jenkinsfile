// pipeline {
//     agent any

//     environment {
//         FRONTEND_DIR = 'frontend'
//         BACKEND_DIR = 'backend'
//         DOCKER_IMAGE_FRONTEND = 'react-frontend-image'
//         DOCKER_IMAGE_BACKEND = 'flask-backend-image'
//     }

//     stages {
//         stage('Build Frontend') {
//             steps {
//                 script {
//                     docker.build(DOCKER_IMAGE_FRONTEND, "./${FRONTEND_DIR}")
//                 }
//             }
//         }
//         stage('Build Backend') {
//             steps {
//                 script {
//                     docker.build(DOCKER_IMAGE_BACKEND, "./${BACKEND_DIR}")
//                 }
//             }
//         }
//          stage('Run Backend Tests') {
//             steps {
//                 script {
//                     docker.image(DOCKER_IMAGE_BACKEND).inside {
//                         sh 'pytest'  // Lancer les tests backend dans le conteneur
//                     }
//                 }
//             }
//         }

//         stage('Run Frontend Tests') {
//             steps {
//                 script {
//                     docker.image(DOCKER_IMAGE_FRONTEND).inside {
//                         sh 'npm test -- --watchAll=false'  // Lancer les tests frontend dans le conteneur
//                     }
//                 }
//             }
//         }
        
//         stage('Deploy') {
//             steps {
//                 echo 'Déployer les images Docker sur un serveur ou une plateforme de déploiement'
//                 // Déploiement de Docker ou autre action ici
//             }
//         }
//     }
// }


pipeline {
    agent any  // Utilise n'importe quel agent pour exécuter le pipeline

    stages {
        stage('Checkout') {
            steps {
                git clone 'https://github.com/BarkouchSana/Prediction_Price_Car_Project.git'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {  // Accéder au dossier frontend
                    script {
                        // Installer les dépendances Node.js pour React
                        sh 'npm install'  // npm est déjà dans le PATH
                    }
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {  // Accéder au dossier backend
                    script {
                        // Installer les dépendances Python
                        sh 'pip install -r requirements.txt'  // python et pip sont dans le PATH
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Construire l'application React pour la production
                        sh 'npm run build'  // npm est déjà dans le PATH
                    }
                }
            }
        }

        stage('Test Backend (Python)') {
            steps {
                dir('backend') {
                    script {
                        // Exécuter les tests Python avec pytest
                        sh 'pytest'  // pytest utilise python, donc python doit être dans le PATH
                    }
                }
            }
        }

        stage('Deploy Backend (Python)') {
            steps {
                dir('backend') {
                    script {
                        // Lancer le serveur backend Python (Flask, Django, etc.)
                        sh 'python3 app.py'  // python est déjà dans le PATH
                    }
                }
            }
        }

        stage('Deploy Frontend (React)') {
            steps {
                dir('frontend') {
                    script {
                        // Déployer l'application React
                        sh 'npm run deploy'  // npm est déjà dans le PATH
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Nettoyage après l\'exécution du pipeline.'
        }
        success {
            echo 'Le pipeline a été exécuté avec succès !'
        }
        failure {
            echo 'Le pipeline a échoué.'
        }
    }
}