import { StringUtil } from '../../src/lib'

describe('StringUtil test', () => {
  const stringUtil = new StringUtil()

  describe('htmlToText', () => {
    it('simple html should convert to text', () => {
      expect(stringUtil.htmlToText('<em>abc</em>')).toBe('abc')
    })
  })
})
