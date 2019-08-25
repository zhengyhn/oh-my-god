import { StringUtil } from "../../src/lib";

describe("StringUtil test", () => {
  const stringUtil = new StringUtil();

  describe("htmlToText", () => {
    it("simple html should convert to text", () => {
      expect(stringUtil.htmlToText("<em>abc</em>")).toBe("abc");
    });
    it("simple html with <p> should convert to text and remain \n", () => {
      expect(stringUtil.htmlToText("<em>abc</em><br><br>aaa")).toBe(
        "abc\n\naaa"
      );
    });
  });
});
