# Koa Hashless Route

This is a Koa JS middleware for hashless routing of single page applications.

### What it does

It's built on top of [koa-send](https://github.com/koajs/send) and so it uses the options object with the same exact setup.

It routes all requests made to a file with the mimetype specified by the `allowedMimeTypes` array to the corresponding file, while redirects all other requests to the index page specified by the `index` parameter. This will allow for pretty urls inside your single page application, such as one built with [AngularJS](https://angularjs.org/).

### Example usage

This example allows for an api to exist at the end-point: `www.yourwebsite.com/api` while all other requests like `www.yourwebsite.com/something/awesome/here` will redirect to `index.html` while maintaining the parameters passed in the url, like `something`, `awesome` and `here`.

```js
const app = require('koa')();
const router = require('koa-router')();
const hashlessRoute = require('koa-spa-hashless-route');

router
.use('/api', apiRoutes.routes(), apiRoutes.allowedMethods())
.use('/', hashlessRoute(['png', 'gif', 'jpeg', 'js', 'css'], 'index.html', { root: __dirname + '/../dist' }));

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000);

```

For more options see [koa-send](https://github.com/koajs/send) documentation.
