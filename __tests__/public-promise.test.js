/* eslint jest */

const PublicPromise = require('../index')

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
  })
})