
# LaserTag Test App

This project allows you to run the LaserTag Test App locally or inside Docker.


## Environment Variables

1. Copy `.env_example` to `.env`.
2. Fill in all required variables.
3. **Important:** Set your GraphQL endpoint URL in `REACT_APP_GRAPHQL_URI`.


## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```


## Running with Docker

1. Make the build script executable:

```bash
chmod +x build.sh
```

2. Build the Docker image:

```bash
sudo ./build.sh
```

3. Run the container:

```bash
sudo docker run -d -p 3000:3000 --name lasertag-test-app-container lasertag-test-app
```

## Notes

* The app will be accessible at [http://localhost:3000](http://localhost:3000)
* Make sure Docker is installed and running before using Docker commands.

