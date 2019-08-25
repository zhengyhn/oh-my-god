from src.lib.string_util import StringUtil


class TestGetCutPostion:
    def test_all_english(self):
        str = 'hello world'
        for i in range(1, len(str) + 1):
            assert StringUtil().get_cut_position(str, i) == i

    def test_all_chinese(self):
        str = '中国，怎么办'
        assert StringUtil().get_cut_position(str, 1) == 0
        assert StringUtil().get_cut_position(str, 2) == 0
        assert StringUtil().get_cut_position(str, 3) == 1
        assert StringUtil().get_cut_position(str, 4) == 1
        assert StringUtil().get_cut_position(str, 5) == 1
        assert StringUtil().get_cut_position(str, 6) == 1
        assert StringUtil().get_cut_position(str, 7) == 1
        assert StringUtil().get_cut_position(str, 8) == 1
        assert StringUtil().get_cut_position(str, 9) == 3
        assert StringUtil().get_cut_position(str, 10) == 3
        assert StringUtil().get_cut_position(str, 11) == 3

    def test_chinese_with_english(self):
        str = 'h我1是, 这，end'
        assert StringUtil().get_cut_position(str, 1) == 1
        assert StringUtil().get_cut_position(str, 2) == 1
        assert StringUtil().get_cut_position(str, 3) == 1
        assert StringUtil().get_cut_position(str, 4) == 2
        assert StringUtil().get_cut_position(str, 5) == 3
        assert StringUtil().get_cut_position(str, 6) == 3
        assert StringUtil().get_cut_position(str, 7) == 3
        assert StringUtil().get_cut_position(str, 8) == 3
        assert StringUtil().get_cut_position(str, 9) == 5
        assert StringUtil().get_cut_position(str, 10) == 6
        assert StringUtil().get_cut_position(str, 11) == 6
        assert StringUtil().get_cut_position(str, 12) == 6
        assert StringUtil().get_cut_position(str, 13) == 6
        assert StringUtil().get_cut_position(str, 14) == 6
        assert StringUtil().get_cut_position(str, 15) == 6
        assert StringUtil().get_cut_position(str, 16) == 8
        assert StringUtil().get_cut_position(str, 17) == 9
        assert StringUtil().get_cut_position(str, 18) == 10
        assert StringUtil().get_cut_position(str, 19) == 11
