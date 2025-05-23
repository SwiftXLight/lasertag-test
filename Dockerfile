FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Accept build-time variables
ARG REACT_APP_GRAPHQL_URI
ENV REACT_APP_GRAPHQL_URI=$REACT_APP_GRAPHQL_URI

# Pass build args to npm build
RUN REACT_APP_GRAPHQL_URI=$REACT_APP_GRAPHQL_URI npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
