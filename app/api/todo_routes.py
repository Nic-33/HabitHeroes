from flask import Flask, render_template, redirect, Blueprint, jsonify, request
from app.models import Todo, db
from app.forms import TodoForm
from flask_login import login_required,current_user
from datetime import datetime # only here for testing, will delete later

todo_routes = Blueprint('todo', __name__)


# @todo_routes.route("/")
# def get_all_todo():
#     todos = Todo.query.all()
#     print("todo:",current_user.to_dict())
#     return {'todos': [todo.to_dict() for todo in todos]}

@todo_routes.route("/")
def get_all_todo_user():
    user_id = current_user.to_dict()['id']
    print("user_id:", user_id)
    todos = Todo.query.filter(Todo.user_id==user_id).all()
    # todos = Todo.query.all()
    return {'todos': [todo.to_dict() for todo in todos]}

@todo_routes.route('/', methods=['POST'])
@login_required
def create_todo():
    form = TodoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = current_user.to_dict()['id']
    if form.validate_on_submit():
        title = form.title.data
        description = form.description.data
        difficulty = form.difficulty.data
        dueDate = datetime.today()
        # dueDate = form.due_date.data
        new_todo = Todo(user_id=user_id, title=title, description=description, difficulty=difficulty,due_date=dueDate, completed=0)
        db.session.add(new_todo)
        db.session.commit()
        return new_todo.to_dict()
    print(form.errors)
    return form.errors, 401

@todo_routes.route('/<int:todo_id>', methods=["GET","POST"])
def update_todo(todo_id):
    form = TodoForm()
    todo = Todo.query.get(todo_id)
    if request.method == "POST":
        if form.validate_on_submit():
            todo.title= form.title.data
            todo.description = form.description.data
            todo.difficulty = form.difficulty.data
            todo.due_date=form.due_data.data
            db.session.add(todo)
            db.session.commit()
            return todo.to_dict()
    elif request.method == "GET":
        return todo.to_dict()

@todo_routes.route('/<int:todo_id>/delete', methods=['GET','DELETE'])
def delete_todo(todo_id):
    todo = Todo.query.get(todo_id)
    if request.method == "DELETE":
        db.session.delete(todo)
        db.session.commit()
        return {'delete': "successful"}, 200
    return {'delete':'Failed'},401

@todo_routes.route('/<int:todo_id>/complete', methods=['GET','POST'])
def complete_todo(todo_id):
    todo = Todo.query.get(todo_id)
    if todo.completed == 0:
        todo.completed = 1
        db.session.add(todo)
        db.session.commit()
        return todo.to_dict()
    elif todo.completed == 1:
        todo.completed = 0
        db.session.add(todo)
        db.session.commit()
        return todo.to_dict()
    return {"complete":"failed"},401
