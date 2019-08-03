from marshmallow import Schema, fields


class ArticleGenerateResponse(Schema):
    folder_name = fields.Str()
