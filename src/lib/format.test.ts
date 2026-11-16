import { describe, expect, it } from 'vitest'
import { formatPrice } from './format'

describe('formatPrice', () => {
  it('formats a price in Thai baht', () => {
    expect(formatPrice(60)).toBe('฿60.00')
  })

  it('adds a thousands separator', () => {
    expect(formatPrice(1250)).toBe('฿1,250.00')
  })
})
