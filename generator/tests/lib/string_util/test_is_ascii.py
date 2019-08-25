from src.lib.string_util import StringUtil


class TestIsAscii:
    def test_english(self):
        assert StringUtil().is_ascii(ord('a'))

    def test_chinese(self):
        assert not StringUtil().is_ascii(ord('中'))

    def test_english_puntuation(self):
        assert StringUtil().is_ascii(ord(','))

    def test_chinese_puntuation(self):
        assert not StringUtil().is_ascii(ord('。'))
