## Setting up the environment

Local db for development:
- docker pull amazon/dynamodb-local
- docker run -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb

AWS.config.update({
    region: "eu-north-1",
    endpoint: "http://localhost:8000"
});