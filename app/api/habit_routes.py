from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Habit,db
from app.forms import HabitForm
from datetime import datetime

habit_routes = Blueprint('habits', __name__)

# get all habits
@habit_routes.route('/')
@login_required
def habits():
    """
    Query for all habits and returns them in a list of user dictionaries
    """
    user_id = current_user.to_dict()['id']
    habits = Habit.query.filter(Habit.user_id==user_id).all()
    return {'habits': [habit.to_dict() for habit in habits]}

# create new habit
@habit_routes.route('/',methods=['POST'])
@login_required
def create_habit():
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(request.data)
    # user_id = current_user.to_dict()['id']
    if form.validate_on_submit():
        new_habit = Habit(
            user_id=current_user.to_dict()['id'],
            title=form.data['title'],
            description=form.data['description'],
            difficulty=form.data['difficulty'],
            # date_to_reset = datetime.strptime(form.date_to_reset.data,"%Y-%m-%d"),
            pos_count = form.data['pos_count'],
            neg_count = form.data['neg_count'],
            pos = form.data['pos'],
            neg = form.data['neg']
            )
        db.session.add(new_habit)
        db.session.commit()
        return new_habit.to_dict()
    # return new_habit.todict()
    return form.errors,401


# update specific habit
@habit_routes.route('/<int:id>',methods=['PUT'])
@login_required
def update_habit(id):
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(request.data)
    # user_id = current_user.to_dict()['id']
    if form.validate_on_submit():
        habit = Habit.query.get(id)
        habit.title = form.data["title"]
        habit.description = form.data["description"]
        habit.difficulty = form.data["difficulty"]
        # habit.frequency = form.data["frequency"]
        habit.pos = form.data["pos"] if form.data["pos"] is not None else habit.pos
        habit.neg = form.data["neg"] if form.data["neg"] is not None else habit.neg
        db.session.commit()
        return habit.to_dict()
    return form.errors,401

# get specific habit
@habit_routes.route('/<int:id>')
@login_required
def habit(id):
    """
    Query for a habit by id and returns that user in a dictionary
    """
    habit = Habit.query.get(id)
    return habit.to_dict()



# delete specific habit
@habit_routes.route('/<int:id>/delete',methods=['POST'])
@login_required
def delete_habit(id):
    habit = Habit.query.get(id)
    if request.method == "POST":
        db.session.delete(habit)
        db.session.commit()
        return {'delete':'sucessful'},200
    return{'delete':'Failed'},401


@habit_routes.route('/<int:id>/pos',methods=['PUT'])
@login_required
def increment_habit_pos(id):
    habit = Habit.query.get(id)
    if request.method == "PUT" and habit.user_id == current_user.to_dict()['id'] :
        habit.pos_count = habit.pos_count + 1
        db.session.commit()
        # print('well well well look at what we have here')
        return habit.to_dict(),200
    return{'pos increment':'Failed'},401

@habit_routes.route('/<int:id>/neg',methods=['PUT'])
@login_required
def increment_habit_neg(id):
    habit = Habit.query.get(id)
    if request.method == "PUT" and habit.user_id == current_user.to_dict()['id'] :
        habit.neg_count = habit.neg_count + 1
        db.session.commit()
        # print('well well well look at what we have here')
        return habit.to_dict(),200
    return{'neg increment':'Failed'},401
