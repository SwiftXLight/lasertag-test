# Load .env vars and pass only REACT_APP_ vars to build args
args=$(grep REACT_APP_ .env | sed 's/^/--build-arg /' | tr '\n' ' ')

docker build $args -t my-react-app .
