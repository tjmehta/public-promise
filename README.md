# public-promise [![Build Status](https://travis-ci.org/tjmehta/public-promise.svg?branch=master)](https://travis-ci.org/tjmehta/public-promise) [![Greenkeeper badge](https://badges.greenkeeper.io/tjmehta/public-promise.svg)](https://greenkeeper.io/)

Promise that exposes resolve and reject publicly

# Installation
```bash
npm i --save public-promise
```

# Usage
Create a "public" promise and resolve it
```js
import PublicPromise from 'public-promise'

const promise = new PublicPromise()

promise.then((data) => console.log(data)) // { foo: 'foo' }

const data = { foo: 'foo' }
promise.resolve(data)
```

Create a "public" promise and reject it
```js
import PublicPromise from 'public-promise'

const promise = new PublicPromise()

promise.catch((err) => console.log(err)) // [ Error: boom ]

const err = new Error('boom')
promise.reject(err)
```

# License
MIT