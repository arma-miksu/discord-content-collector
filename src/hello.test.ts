import hello from './hello'
import { expect } from 'chai'

describe('hello()', () => {
  it('should return hello message', () => {
    const result: String = hello()
    expect(result).to.equal('Hello Discord Content Collector')
  })
})
