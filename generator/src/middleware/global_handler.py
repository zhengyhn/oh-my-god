from ..lib.app_exception import AppException
from ..lib.response_code import ResponseCode
from flask import jsonify, make_response
from marshmallow import ValidationError


def handle(app):
    @app.errorhandler(AppException)
    def handle_app_exception(error):
        response = jsonify(error.to_dict())
        response.status_code = 200
        return response

    @app.errorhandler(ValidationError)
    def handle_app_exception(error):
        message = str(error.messages)
        response = make_response(jsonify(dict(code=ResponseCode.FAIL, message=message)))
        response.status_code = 200
        return response

    @app.after_request
    def handle_response(response):
        data = response.get_json()
        ret = dict(code=ResponseCode.SUCCESS, data=data)
        response = make_response(jsonify(ret))
        response.status_code = 200
        return response
