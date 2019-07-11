# Express-NormalizeUrl
URL normalisation for Express and Connect

## About

### Taking care of
* trailing slashes
* repeated slashes
* repeated question marks
* repeated ampersands
* repeated query strings
* case sensitivity (does not affect queries by default)

### Redirect example
```
request:  //sLuG??param=val&&param2=VAL2
response: /slug/?param=val&param2=VAL2
```

## Installation
```sh
$ npm install express-url
```

## Usage

### As middelware
```js
// Require module
var expurl = require('express-normalizeurl');

// Process routes through middleware
app.use(expurl());
```

### Middleware options
```js
app.use(expurl({
    requestType: 'GET',
    redirectStatusCode: 302,
    lowercase: true,
    lowercaseQueries: true,
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
* do not serve static files with node directly
* use case sensitive and strict routing

```js
app.set('case sensitive routing', true);
app.set('strict routing', true);
```
