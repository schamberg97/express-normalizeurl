# express-url
URL normalisation for Express.

## About
### Taking care of
* trailing slashes
* repeated slashes
* repeated question marks
* repeated ampersands
* case sensitivity

### Redirect example
```
// request url
http://example.com//sLuG??param=val&&param2=val2??param3=val3
// response url
http://example.com/slug/?param=val&param2=val2&param3=val3
```

## Installation
```sh
$ npm install express-url
```

## Usage
### Require
```js
expurl = require('express-url');
```

### Use temporary redirect (302)
```js
app.use(expurl.temp);
```

### Use permanent redirect (301)
* try temporary redirect first
* think twice, maybe temporary redirect will suit your needs

```js
app.use(expurl.perm);
```

## Tests
You will need to point ```app``` variable in ```node_modules/express-url/routes.js``` to file with app routes.

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
