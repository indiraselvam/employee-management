pipeline {

    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = "indira319/employee-frontend"
        DOCKER_IMAGE_BACKEND  = "indira319/employee-backend"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    docker build -t ${DOCKER_IMAGE_BACKEND}:latest ./backend
                    docker build -t ${DOCKER_IMAGE_FRONTEND}:latest ./frontend
                '''
            }
        }

        stage('Push Docker Images') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

                        docker push ${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER}
                        docker push ${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER}

                        docker tag ${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER} ${DOCKER_IMAGE_BACKEND}:latest
                        docker tag ${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER} ${DOCKER_IMAGE_FRONTEND}:latest

                        docker push ${DOCKER_IMAGE_BACKEND}:latest
                        docker push ${DOCKER_IMAGE_FRONTEND}:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'AWS EC2 deployment will be configured in the next stage.'
            }
        }
    }

    post {

        success {
            echo 'CI pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check Jenkins console output.'
        }
    }
}
