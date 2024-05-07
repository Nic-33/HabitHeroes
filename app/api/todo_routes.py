from flask import Flask, render_template, redirect, Blueprint, jsonify
from app.models import Todo, db
from app.forms import TodoForm

todo_routes = Blueprint('todo', __name__)


@todo_routes.route("/")
def get_all_todo():
    todos = Todo.query.all()
    print("todo:",todos)
    return {'todos': [todo.to_dict() for todo in todos]}

@todo_routes.route("/<id>")
def get_all_todo_user(id):
    todos = Todo.query.filter(Todo.user_id == id).all()
    return {'todos': [todo.to_dict() for todo in todos]}

@todo_routes.route('/<id>', methods=['GET','POST'])
def create_todo(id):
    form = TodoForm()

    if form.validate_on_submit():

        title = form.title.data
        description = form.description.data
        difficulty = form.difficulty.data
        dueDate = form.due_data.data
        new_todo = Todo(user_id=id, title=title, description=description, difficulty=difficulty,due_date=dueDate, completed=0)
        db.session.add(new_todo)
        db.session.commit()
        return redirect(f'/{id}')
