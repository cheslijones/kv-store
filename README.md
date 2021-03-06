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
This project utilizes [mutli-stage `Dockerfiles`](https://docs.docker.com/develop/develop-images/multistage-build/).

As such, there are stages in each `Dockerfile` for running tests that can be targeted in CI / CD pipelines. Since the tests are being run in a container, dependencies are not needed locally.

*Note: The commands below are from the project root.*

## API Tests
Use the following command:

```
docker build --target test -f ./api/Dockerfile ./api --secret id=mysecret,src=.env.dev --no-cache --progress=plain
```

Alternatively, if you have the development dependencies installed (see Development section below), you can run the tests outside of a container using:

```
cd api
coverage run --omit='src/manage.py,src/config/*,*/.venv/*,*/*__init__.py,*/tests.py,*/admin.py' src/manage.py test src && coverage report
```
*Note: You will likely get a `KeyError: 'DJANGO_SECRET_KEY'` error. To resolve, run the following:*

```
export DJANGO_SECRET_KEY="<some-random-string>"
```

## Client Tests
Use the following command:

```
docker build --target test -f ./client/Dockerfile ./client --no-cache --progress=plain
```

Alternatively, if you have the development dependencies installed (see Development section below), you can run the tests outside of a container using:

```
cd client
npm test -- --coverage --watchAll
```

# Development
The application will run without dependencies installed locally given the services are running in Docker containers.

However, if you want to develop the application, you will need to install the dependencies locally.

## API Dependencies
*Note: This requires [`poetry`](https://python-poetry.org/docs/#installation).*

To install the dependencies, follow these steps:

1. Change into `./api`:

   ```
   cd api
   ```  

2. Install dependencies:

   ```
   poetry install
   ```

3. Start the virtual environment:

   ```
   poetry shell
   ```

## Client Dependencies
*Note: This requires [`npm`]( https://nodejs.org/en/download/package-manager/).*

To install the dependencies, follow these steps:

1. Change into `./client`:

   ```
   cd client
   ```  

2. Install dependencies:

   ```
   npm install
   ```

# Interacting with the Redis Container
If you need to interact directly with the Redis container, you can access the Redis container's `redis-cli` using the following command:
```
docker exec -it kv-store-redis-1 sh 
redis-cli
```

# TODO
## React
- Input validation in React forms
- Refactor React components for reuse
- Mocks need to be improved 

## Django
- Test case for Redis not being able to create the key
- Test cases for `utils.py`

## DevOps
- Protect `main` branch and require PR to merge
- PR build validation and CI
- Production stages in `Dockerfile`
- Add commands for running tests to `docker-compose.yml`
- Deploy test containers along side the development containers
- Extract test reports from containers

