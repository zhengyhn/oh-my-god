from flask import jsonify, request
from .article_generate.article_generate_request import ArticleGenerateRequest
from .article_generate.article_generate_response import ArticleGenerateResponse
from .article_generate.article_generate_service import ArticleGenerateService


def routes(app):
    @app.route('/article/generate', methods=['POST'])
    def generate():
        article_generate_request = ArticleGenerateRequest().load(request.get_json())
        article_generate_response = ArticleGenerateService().generate(article_generate_request)

        return jsonify(ArticleGenerateResponse().dump(article_generate_response))
