import { describe, expect, it } from '@jest/globals'
import { checkSerialObjectType } from './checkSerialObjectType'

describe('checkSerialObjectType', () => {
  it('should return false if the argument is not an object', () => {
    expect(checkSerialObjectType(10, { a: 10 })).toBe(false)
    expect(checkSerialObjectType('some string', { a: 10 })).toBe(false)
    expect(checkSerialObjectType(null, { a: 10 })).toBe(false)
    expect(checkSerialObjectType(undefined, { a: 10 })).toBe(false)
  })

  it('should return false if the argument is missing a field that is present in the example', () => {
    expect(checkSerialObjectType({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(checkSerialObjectType({ a: 'string 1' }, { a: 'string 2', b: 'string 3' })).toBe(false)
  })

  it('should return false if the argument has an extra field that does not exist in the example', () => {
    expect(checkSerialObjectType({ a: 1, b: 2 }, { a: 1 })).toBe(false)
    expect(checkSerialObjectType({ a: 'string 1', b: 'string 2' }, { a: 'string 3' })).toBe(false)
  })
})
