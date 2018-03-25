/* eslint jest */

const PublicPromise = require('../index')

process.on('unhandledRejection', (err) => {
  throw err
})

describe('PublicPromise', () => {
  const ctx = {}

  it('should work like a factory', () => {
    const promise = PublicPromise()
    expect(promise).toBeInstanceOf(Promise)
    expect(promise).toBeInstanceOf(PublicPromise)
  })

  describe('instance', () => {
    beforeEach(() => {
      ctx.data = {}
      ctx.err = new Error('boom')
      ctx.promise = new PublicPromise()
    })

    it('should be an instance of PublicPromise', () => {
      expect(ctx.promise).toBeInstanceOf(PublicPromise)
    })

    it('should be an instance of Promise', () => {
      expect(ctx.promise).toBeInstanceOf(Promise)
    })

    describe('resolved promise', () => {
      it('should resolve', () => {
        ctx.promise.resolve(ctx.data)
        return ctx.promise.then((data) => {
          expect(data).toBe(ctx.data)
        })
      })

      it('should reject', () => {
        expect.assertions(1)
        ctx.promise.reject(ctx.err)
        return ctx.promise.catch((err) => {
          expect(err).toBe(ctx.err)
        })
      })

      describe('then chain', () => {
        it('should resolve', () => {
          ctx.promise.resolve(ctx.data)
          return ctx.promise
            .then((data) => data)
            .then((data) => {
              expect(data).toBe(ctx.data)
            })
        })

        it('should reject', () => {
          expect.assertions(1)
          ctx.promise.reject(ctx.err)
          return ctx.promise
            .then((data) => data)
            .catch((err) => {
              expect(err).toBe(ctx.err)
            })
        })
      })

      describe('catch chain', () => {
        it('should resolve', () => {
          ctx.promise.resolve(ctx.data)
          return ctx.promise
            .catch((err) => {
              throw err
            })
            .then((data) => {
              expect(data).toBe(ctx.data)
            })
        })

        it('should reject', () => {
          expect.assertions(1)
          ctx.promise.reject(ctx.err)
          return ctx.promise
            .catch((err) => {
              throw err
            })
            .catch((err) => {
              expect(err).toBe(ctx.err)
            })
        })
      })


      describe('invalid result', () => {
        it('should then', () => {
          ctx.promise._result = {}
          expect(() => {
            ctx.promise.then((data) => {
              expect(data).toBe(ctx.data)
            })
          }).toThrow('unknown result')
        })

        it('should catch', () => {
          expect.assertions(1)
          ctx.promise._result = {}
          expect(() => {
            ctx.promise.catch((err) => {
              expect(err).toBe(ctx.err)
            })
          }).toThrow('unknown result')
        })
      })
    })


    describe('unresolved promise', () => {
      it('should resolve', () => {
        const p = ctx.promise.then((data) => {
          expect(data).toBe(ctx.data)
        })
        ctx.promise.resolve(ctx.data)
        return p
      })

      it('should reject', () => {
        expect.assertions(1)
        const p = ctx.promise.catch((err) => {
          expect(err).toBe(ctx.err)
        })
        ctx.promise.reject(ctx.err)
        return p
      })

      describe('then chain', () => {
        it('should resolve', () => {
          const p = ctx.promise
            .then((data) => data)
            .then((data) => {
              expect(data).toBe(ctx.data)
            })
          ctx.promise.resolve(ctx.data)
          return p
        })

        it('should reject', () => {
          expect.assertions(1)
          const p = ctx.promise
            .then((data) => data)
            .catch((err) => {
              expect(err).toBe(ctx.err)
            })
          ctx.promise.reject(ctx.err)
          return p
        })
      })

      describe('catch chain', () => {
        it('should resolve', () => {
          const p = ctx.promise
            .catch((err) => {
              throw err
            })
            .then((data) => {
              expect(data).toBe(ctx.data)
            })
          ctx.promise.resolve(ctx.data)
          return p
        })

        it('should reject', () => {
          expect.assertions(1)
          const p = ctx.promise
            .catch((err) => {
              throw err
            })
            .catch((err) => {
              expect(err).toBe(ctx.err)
            })
          ctx.promise.reject(ctx.err)
          return p
        })
      })
    })
  })
})
