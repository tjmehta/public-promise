function PublicPromise () {
  if (!(this instanceof PublicPromise)) return new PublicPromise()
  const self = this
  this._promise = new Promise(function (resolve, reject) {
    self.resolve = resolve
    self.reject = reject
  })
}

PublicPromise.prototype = Object.create(Promise.prototype)

PublicPromise.prototype.then = function (cb) {
  return this._promise.then(cb)
}

PublicPromise.prototype.catch = function (cb) {
  return this._promise.catch(cb)
}

module.exports = PublicPromise
