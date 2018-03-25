function PublicPromise () {
  if (!(this instanceof PublicPromise)) return new PublicPromise()
  this._promise = null
  this._result = null
  this._callbacks = {
    resolve: null,
    reject: null
  }
}

PublicPromise.prototype = Object.create(Promise.prototype)

PublicPromise.prototype._deferredPromise = function () {
  const self = this
  return new Promise(function (resolve, reject) {
    self._callbacks.resolve = resolve
    self._callbacks.reject = reject
  })
}

PublicPromise.prototype.then = function (cb) {
  if (this._promise) return this._promise.then(cb)
  if (this._result) {
    if (this._result.data) this._promise = Promise.resolve(this._result.data)
    else if (this._result.err) this._promise = Promise.reject(this._result.err)
    else throw new Error('unknown result')
  } else {
    this._promise = this._deferredPromise()
  }
  return this._promise.then(cb)
}

PublicPromise.prototype.catch = function (cb) {
  if (this._promise) return this._promise.catch(cb)
  if (this._result) {
    if (this._result.data) this._promise = Promise.resolve(this._result.data)
    else if (this._result.err) this._promise = Promise.reject(this._result.err)
    else throw new Error('unknown result')
  } else {
    this._promise = this._deferredPromise()
  }
  return this._promise.catch(cb)
}

PublicPromise.prototype.resolve = function (data) {
  if (this._callbacks.resolve) this._callbacks.resolve(data)
  this._result = this._result || { data: data }
}

PublicPromise.prototype.reject = function (err) {
  if (this._callbacks.reject) this._callbacks.reject(err)
  this._result = this._result || { err: err }
}

module.exports = PublicPromise
