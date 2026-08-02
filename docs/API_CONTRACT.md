# Delala API Contract

## Base URL

`/api/v1`

## Response Format

### Success

``` json
{
  "success": true,
  "data": {},
  "message": "OK"
}
```

### Error

``` json
{
  "success": false,
  "message": "Property not found",
  "error": "PROPERTY_NOT_FOUND"
}
```

## Authentication

POST /auth/register POST /auth/login POST /auth/logout GET /auth/me

## Users

GET /users/me PATCH /users/me

## Properties

GET /properties GET /properties/:id POST /properties PATCH
/properties/:id DELETE /properties/:id

Supported query params: - page - limit - city - neighborhood -
minPrice - maxPrice - bedrooms - bathrooms - propertyType - verified -
sort

## Brokers

GET /brokers GET /brokers/:id

## Favorites

GET /favorites POST /favorites DELETE /favorites/:id

## Reviews

GET /properties/:id/reviews POST /reviews

## Visits

POST /visits

## Conversations

GET /conversations POST /conversations

## Messages

GET /conversations/:id/messages POST /messages

## Notifications

GET /notifications

## Admin

GET /admin/dashboard GET /admin/users GET /admin/properties/pending
PATCH /admin/properties/:id/approve PATCH /admin/properties/:id/reject
GET /admin/reports

## Pagination

``` json
{
  "page":1,
  "limit":20,
  "total":150,
  "pages":8
}
```

## Status Codes

200 OK 201 Created 400 Bad Request 401 Unauthorized 403 Forbidden 404
Not Found 409 Conflict 422 Validation Error 500 Internal Server Error
