URL normalisation for Express.

## Taking care of
* trailing slashes
* case sensitivity

## Installation
```sh
$ npm install express-url
```

## Usage
```js
expurl = require('./data_modules/express-url');
app.use(expurl);
```

## Tests
```sh
$ npm test
```

### Additional recommendation
```js
app.set('case sensitive routing', true);
app.set('strict routing', true);
```