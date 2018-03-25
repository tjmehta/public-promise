# public-promise
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