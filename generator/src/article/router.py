from flask import jsonify, Blueprint


def routes(app):
    @app.route('/article/generate', methods=['POST'])
    def hello():
        return jsonify(dict(
            msg="Hello, World!"
        ))
