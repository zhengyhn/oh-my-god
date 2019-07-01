from flask import Flask
from .middleware import global_handler
from .article import router

app = Flask(__name__)

global_handler.handle(app)
router.routes(app)

