# Get Page
## Diven in Capserjs

This is the first [example](http://docs.casperjs.org/en/latest/quickstart.html)
```javascript

var casper = require('casper').create();
casper.start('http://casperjs.org/');

casper.then(function() {
    this.echo('First Page: ' + this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo('Second Page: ' + this.getTitle());
});

casper.run();
```

### Install

```shell
npm install
```

### Run
You can run this script:
```shell
PATH=$(npm bin):$PATH casperjs index.js
```
Or shortcut:
```shell
npm run phantomjs
```
Capser support [SlimerJS ](https://slimerjs.org/):
```shell
npm run slimerjs
```
