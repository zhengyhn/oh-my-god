from marshmallow import Schema, fields


class Item(Schema):
    title = fields.Str(required=True)
    reply = fields.Str(required=True)


class ArticleGenerateRequest(Schema):
    items = fields.List(fields.Nested(Item))
