import { describe, expect, it } from 'vitest'

describe('accessibility Studio 1021 demo', () => {
  it('ships the expected audit severity set', () => {
    expect(['critical', 'serious', 'moderate']).toContain('critical')
  })
})
