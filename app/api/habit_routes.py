from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Habit

habit_routes = Blueprint('habits', __name__)


@habit_routes.route('/')
@login_required
def habits():
    """
    Query for all habits and returns them in a list of user dictionaries
    """
    habits = Habit.query.all()
    return {'habits': [habit.to_dict() for habit in habits]}


@habit_routes.route('/<int:id>')
@login_required
def habit(id):
    """
    Query for a habit by id and returns that user in a dictionary
    """
    habit = Habit.query.get(id)
    return habit.to_dict()
