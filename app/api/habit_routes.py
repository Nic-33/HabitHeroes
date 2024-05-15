from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Habit,db
from app.forms import HabitForm

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
            difficulty=form.data['difficulty']
            )
        db.session.add(new_habit)
        db.session.commit()
        return new_habit.to_dict()
    # return new_habit.todict()
    return form.errors,401


# update specific habit

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
    
