from .singleton_mixin import SingletonMixin


class StringUtil(SingletonMixin):
    def __init__(self):
        self.punctuations = [u'，', u'。', u'！', u'？', u'；', u',', u'.', u';', u'?']

    def is_ascii(self, ch):
        return ch < 128

    def get_cut_position(self, text, size):
        pos = 0
        data = text.encode('utf8')
        i = 0
        while i < len(data):
            if self.is_ascii(data[i]):
                i += 1
            else:
                i += 3
            if i <= size:
                pos += 1
            else:
                break
        if pos < len(text) and text[pos] in self.punctuations:
            pos -= 1
        return pos