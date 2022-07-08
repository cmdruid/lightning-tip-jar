import '@testing-library/jest-dom'
import * as crypto from '@/lib/crypto';

describe('crypto.hash', () => {
  it('Hashes a string using SHA-256', async () => {
    const testString  = '4e4de6c3-e101-48d8-913b-ef80a115da5f',
          correctHash = '931d5ec90d6387e88346729f5c0c12545a4c9a3ed6429817fbd3c28fda717614',
          testedHash  = await crypto.hash(testString)
    expect(testedHash).toMatch(correctHash)
  })
})