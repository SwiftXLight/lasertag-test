## Available Scripts

In the project directory, you can run:

### Environment

In .env_example you can see all necessary envs to fill
(fill the REACT_APP_GRAPHQL_URI)

### Local setup

Run "npm i"
Run "npm start"

### Running in docker
chmod +x build.sh
sudo ./build.sh
sudo docker run -d -p 3000:3000 --name lasertag-test-app-container lasertag-test-app
