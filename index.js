const send = require('koa-send');

function hashlessRoute (allowedMimeTypes, index, opts) {
  let mimes;
  if (Array.isArray(allowedMimeTypes)) {
    mimes = allowedMimeTypes;
  }
  else {
    mimes = false;
  }
  return function * (next) {
    let path = this.path;
    if (checkMime(path)) {
      yield send(this, this.path, opts)
    }
    else {
      yield send(this, index, opts);
    }
  }
  yield next;
}

module.exports = hashlessRoute;

function checkMime (path, mimeTypes) {
  if (path) {
    let nPath = path.split('.');
    let possibleMimeType = nPath.pop();
    for (var i = mimeTypes.length; i >= 0; i--) {
      let re = new RegExp(mimeTypes[i], 'i');
      if (possibleMimeType.match(re)) {
        return true;
      }
    }
    return false;
  }
  else {
    return false;
  }
}
