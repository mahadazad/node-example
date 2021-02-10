# Manual Installation

- Start the mysql server
- Create a database with name `nodetest`
- Open `config/default.yml` and adjust the parameters for the host, username, password, etc
- Run command `npm install`
- Run command `npm start`
- You should see a message like `🚀 Server ready at http://localhost:3000`. That means the server is up and running.

# Using Docker

The project already comes with docker setup. If you want to start testing with docker then you only need to run `docker-compose up`.

# Api Overview:

There are 5 endpoints:

## POST /v1/person (for inserting new record)

##### Example CURLS:

```
curl --location --request POST 'localhost:3000/v1/person' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Name1",
  "surname": "Surname1",
  "email": "name1surname1@gmail.com",
  "age": 12,
  "gender": "male",
  "birthday": "2010-01-01",
  "phone": "03332928282"
}'
```

```
curl --location --request POST 'localhost:3000/v1/person' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Name2",
  "surname": "Surname2",
  "email": "name2surname2@gmail.com",
  "age": 10,
  "gender": "female",
  "birthday": "2011-02-01",
  "phone": "03332324282"
}'
```

```
curl --location --request POST 'localhost:3000/v1/person' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Name3",
  "surname": "Surname3",
  "email": "name3surname3@gmail.com",
  "age": 18,
  "gender": "male",
  "birthday": "1990-05-01",
  "phone": "04402928992"
}'
```

## PUT /v1/person/:id (for updating existing record)

##### Example CURLS:

```
curl --location --request PUT 'localhost:3000/v1/person/1' \
--header 'Content-Type: application/json' \
--data-raw '{
  "contacts": [2, 3]
}'
```

```
curl --location --request PUT 'localhost:3000/v1/person/2' \
--header 'Content-Type: application/json' \
--data-raw '{
  "contacts": [3]
}'
```

## DELETE /v1/person/:id (for deleting record)

##### Example CURL:

The delete will cascade and also delete the child records.

```
curl --location --request DELETE 'localhost:3000/v1/person/3'
```

## GET /v1/person/:id (for retrieving a particular record)

##### Example CURL:

```
curl --location 'localhost:3000/v1/person/1'
```

## GET /v1/persons (for retrieving all the records)

Also supports query parameters: page, perPage

##### Example CURLS:

```
curl --location 'localhost:3000/v1/persons'
```

```
curl --location 'localhost:3000/v1/persons?perPage=1&page2'
```
