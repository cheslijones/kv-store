# Instructions: 
Build a simple decomposed Key-Value store by implementing two services which communicate over a REST API. 

The first service, serving at the backend, should implement a basic JSON Rest API which provides a programmable entrypoint for the key-value store (feel free to use an in-memory data structure, such as a map or dictionary). 

The second service should be a small web application which uses the API to allow a user to interact with the key-value store through a web interface.

The following functionality should be implemented:

- Store a value at a given key.
- Retrieve the value for a given key.
- Delete a given key.

Both the JSON Rest API and Web Interface should at a minimum be able to expose and implement these three functions.

You can write this in whichever languages you choose, however Go and any React-based framework are preferred. The final result should be two separate applications that can be run independently of each other.

Please upload the code to a publicly accessible GitHub, GitLab or other public code repository account.  A README file should be provided, briefly documenting what you are delivering. Like our own code, we expect testing instructions: whether it’s an automated test framework, or simple manual steps.

To help set expectations, we believe you should aim to take no more than 4 hours on this task.

We understand that you have other responsibilities, so if you think you’ll need more than 5 business days, just let us know when you expect to send a reply.

Please don’t hesitate to ask any follow-up questions for clarification.

# Overview

# Running the Application

# Interacting with the Redis Container
```
docker exec -it kv-store-redis-1 sh 
redis-cli
```