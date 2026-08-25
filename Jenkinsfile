pipeline {

    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = "YOUR_DOCKERHUB_USERNAME/employee-frontend"
        DOCKER_IMAGE_BACKEND = "YOUR_DOCKERHUB_USERNAME/employee-backend"
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
                sh 'docker build -t $DOCKER_IMAGE_BACKEND:$BUILD_NUMBER ./backend'
                sh 'docker build -t $DOCKER_IMAGE_FRONTEND:$BUILD_NUMBER ./frontend'
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

                        docker push $DOCKER_IMAGE_BACKEND:$BUILD_NUMBER
                        docker push $DOCKER_IMAGE_FRONTEND:$BUILD_NUMBER

                        docker tag $DOCKER_IMAGE_BACKEND:$BUILD_NUMBER $DOCKER_IMAGE_BACKEND:latest
                        docker tag $DOCKER_IMAGE_FRONTEND:$BUILD_NUMBER $DOCKER_IMAGE_FRONTEND:latest

                        docker push $DOCKER_IMAGE_BACKEND:latest
                        docker push $DOCKER_IMAGE_FRONTEND:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment stage will be configured after AWS EC2 setup.'
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
