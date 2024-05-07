from flask import Flask, render_template, redirect
from ..config import Config
from models import Todo, db
from flask_migrate import Migrate

todo=Flask(__name__)
todo.config.from_object(Config)
db.init_app(todo)
migrate = Migrate(todo, db)


@todo.route("/<int:id>")
def get_all_todo(id):
    todos = Todo.query.filter(Todo.user_id.like(id).all())
    print(todo)
    return todos
