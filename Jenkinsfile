pipeline {
    agent any  // Utilise n'importe quel agent pour exécuter le pipeline
    environment {
        PATH = "C:/Program Files/Git/cmd;${env.PATH}"
    }
    stages {
        stage('Checkout') {
            steps {
                bat "git checkout origin/ma-branche-modifications"
            }
        }
        
        stage('Pull') {
            steps {
                bat "git fetch origin"
                //bat "git pull origin ma-branche-modifications"
                bat "git reset --hard origin/ma-branche-modifications"
            }
        }








        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {  // Accéder au dossier backend
                   bat 'pip install -r requirements.txt'  // python et pip sont dans le PATH
                }
            }
        }

        stage('Test Backend (Python)') {
            steps {
                dir('backend') {
                    bat 'pytest'  // pytest utilise python, donc python doit être dans le PATH
                }
            }
        }

        //stage('Run Backend (Python)') {
        //    steps {
        //        dir('backend') {
        //            bat 'python app.py'  // python est déjà dans le PATH
        //        }
        //    }
        //}

        stage('Deploy Backend to Render') {
            steps {
                script {
                    // Appel au Deploy Hook
                    bat 'curl -k -X POST "https://api.render.com/deploy/srv-cttactbqf0us73eqgfng?key=Lf3q9bPxZbA"'
                }
            }
        }






        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {  // Accéder au dossier frontend
                    bat 'npm install'  // npm est déjà dans le PATH
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm test'  // npm est déjà dans le PATH
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build'  // npm est déjà dans le PATH
                }
            }
        }

        //stage('Start Frontend (React)') {
        //    steps {
        //        dir('frontend') {
        //            bat 'npm start'  // npm est déjà dans le PATH
        //        }
        //    }
        //}

        stage('Deploy Frontend to Render') {
            steps {
                script {
                    // Appel au Deploy Hook
                    bat 'curl -k -X POST "https://api.render.com/deploy/srv-cttbfcbv2p9s738h85e0?key=t5OpDijx2fo"'
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