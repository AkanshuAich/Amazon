from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')


    with app.app_context():
        from . import routes

    # Attach the cache instance to the app
    # app.extensions['cache'] = cache

    return app
