# express-url
URL normalisation for Express and Connect

## About

### Taking care of
* trailing slashes
* repeated slashes
* repeated question marks
* repeated ampersands
* repeated query strings
* case sensitivity

### Redirect example
```
request:  //sLuG??param=val&&param2=val2
response: /slug/?param=val&param2=val2
```

## Installation
```sh
$ npm install express-url
```

## Usage

### As middelware
```js
// Require module
var expurl = require('express-url');

// Process routs through middleware
app.use(expurl());
```

### Middelware options
```js
app.use(expurl({
    requestType: 'GET',
    redirectStatusCode: 302,
    lowercase: true,
    trailingSlash: true,
    repetedSlash: true,
    repeatedQuestionMark: true,
    repeatedAmpersand: true
}));
```

## Tests

```sh
$ npm install
$ cd node_modules/express-url
$ npm test
```

## Recommendations
* do not serve static files with node dirctly
* use case sensitive and strict routing

```js
app.set('case sensitive routing', true);
app.set('strict routing', true);
```
