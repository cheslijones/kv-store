# Instructions: 
Build a simple decomposed Key-Value store by implementing two services which communicate over a REST API. 

The first service, serving at the backend, should implement a basic JSON Rest API which provides a programmable entrypoint for the key-value store (feel free to use an in-memory data structure, such as a map or dictionary). 

The second service should be a small web application which uses the API to allow a user to interact with the key-value store through a web interface.

The following functionality should be implemented:

- Store a value at a given key.
- Retrieve the value for a given key.
- Delete a given key.

Both the JSON Rest API and Web Interface should at a minimum be able to expose and implement these three functions.

# Overview
This is a simple application using the following tech stack:

| Service | Tech              | Directory | URI Root                        | Port   |
| ------- | ----------------- | ----------| ------------------------------- | ------ |
| API     | Django, DRF       | `/api`    | http://localhost:8000/api/keys/ | `8000` |
| Client  | TypeScript, React | `/client` | http://localhost:3000/          | `3000` |
| Redis   | Redis             | N/A       | N/A                             | `6379` |

The API accepts the following HTTP methods:
| Method | URI               |
| ------ | ----------------- |
| POST   | /api/keys/        |
| GET    | /api/keys/<:key>/ |
| DELETE | /api/keys/<:key>/ |

The deployments utilize [mutli-stage `Dockerfiles`](https://docs.docker.com/develop/develop-images/multistage-build/).

# Running the Application
Running the application requires [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/).

With those both installed, please follow these steps:

1. Clone the Repo:

   ```
   git clone https://github.com/cheslijones/kv-store.git
   ```

2. Change into the project directory:

   ```
   cd kv-store
   ```

3. Create a `.env.dev` in the root directory with the following environment variable:

   ```
   DJANGO_SECRET_KEY="<some-random-string>"
   ```

4. Start-up the services:

   ```
   docker-compose up
   ```

5. In a browser, navigate to [`http://localhost:3000/`](http://localhost:3000).

# Running Tests

# Interacting with the Redis Container
If you need to interact directly with the Redis container, you can access the Redis container's `redis-cli` using the following command:
```
docker exec -it kv-store-redis-1 sh 
redis-cli
```

# TODO
- Input validation
- Refactor components for reuse
- Build validation and CI
- Production stages in `Dockerfile`