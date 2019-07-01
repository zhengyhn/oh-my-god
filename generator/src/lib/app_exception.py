class AppException(Exception):
    code = 1

    def __init__(self, message, code=None):
        Exception.__init__(self)
        self.message = message
        if code is not None:
            self.code = code

    def to_dict(self):
        rv = dict()
        rv['message'] = self.message
        rv['code'] = self.code
        return rv
