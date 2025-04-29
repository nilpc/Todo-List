pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Get code from GitHub repository
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t todo-app:${BUILD_NUMBER} .'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Stop and remove any existing container
                    sh 'docker stop todo-app || true'
                    sh 'docker rm todo-app || true'
                    
                    // Run the new container
                    // Note: We're mapping port 3000 inside the container to port 80 on the host
                    sh 'docker run -d -p 80:3000 --name todo-app todo-app:${BUILD_NUMBER}'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}