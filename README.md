# Express-NormalizeUrl
URL normalisation for Express and Connect. Forked form @AntuanKhanna/express-url to serve as (almost) drop-in replacement and to maintain the unmaintained code. (E.g. express-url had a typo, where "repeatedSlash" option was written as "repetedSlash". In that case, express-normalizeurl will respect both typing variants)

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
// If you used express-url before, this is the only line you need to change
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
    lowercaseQueries: true, // False by default, requires lowercase to be set to true to work
    trailingSlash: true,
    repeatedSlash: true,
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
