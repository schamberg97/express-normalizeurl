# express-url
URL normalisation for Express.

## Taking care of
* trailing slashes
* repeted slashes
* case sensitivity

## Installation
```sh
$ npm install express-url
```

## Usage
```js
expurl = require('express-url');
```

### Temporary redirect (302)
```js
app.use(expurl.temp);
```

### Permanent redirect (301)
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