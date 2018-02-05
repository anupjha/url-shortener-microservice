# url-shortener-microservice

URL Shortener Microservice

## Objective:

Build a full stack JavaScript app that is functionally similar to this: https://little-url.herokuapp.com/ and deploy it to Glitch.

### User Story:

1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. When I visit that shortened URL, it will redirect me to my original link.

4. No short URL collision

### Demo :

#### Design

1. https://www.educative.io/collection/page/5668639101419520/5649050225344512/5668600916475904
2. https://coligo.io/create-url-shortener-with-node-express-mongo/

### Run:

`nodemon app.js`

Example creation usage:
http://localhost:3000/api/https://www.oracle.com

Example creation output
{"originalUrl":"https://www.oracle.com","shortUrl":"http://localhost:3000/x"}
Usage:
http://localhost:3000/x
Will redirect to:
https://www.oracle.com
