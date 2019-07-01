from ..lib import app_exception
from flask import jsonify, make_response
import json


def handle(app):
    @app.errorhandler(app_exception.AppException)
    def handle_app_exception(error):
        response = jsonify(error.to_dict())
        response.status_code = 200
        return response

    @app.after_request
    def handle_response(response):
        data = response.get_json()
        ret = dict(code=0, data=data)
        response = make_response(jsonify(ret))
        response.status_code = 200
        return response
