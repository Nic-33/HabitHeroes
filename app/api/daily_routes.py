from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Daily, db
from app.forms import DailyForm
from flask_login import current_user
from datetime import date

daily_routes = Blueprint('daily', __name__)

# @daily_routes.route('/')
# def get_all_daily():
#     dailies = Daily.query.all()
#     print("daily:",current_user.to_dict())
#     return {'daily': [daily.to_dict() for daily in dailies]}

@daily_routes.route('/')
def get_all_daily_user():
    user_id = current_user.to_dict()['id']
    dailies = Daily.query.filter(Daily.user_id==user_id).all()
    return {'dailies': [daily.to_dict() for daily in dailies]}

@daily_routes.route('/', methods=['POST'])
def create_daily():
    form = DailyForm()
    user_id = current_user.to_dict()['id']
    if form.validate_on_submit():
        title = form.title.data
        description = form.description.data
        difficulty = form.difficulty.data
        new_daily = Daily(user_id=user_id, title=title, description=description, difficulty=difficulty, due_date = date.today(), completed=0, streak=0)
        db.session.add(new_daily)
        db.session.commit()
        return new_daily.to_dict()
    return form.errors, 401

@daily_routes.route('/<int:daily_id>', methods=["GET","POST"])
def update_daily(daily_id):
    form = DailyForm()
    daily = Daily.query.get(daily_id)
    if request.method == "POST":
        if form.validate_on_submit():
            daily.title= form.title.data
            daily.description = form.description.data
            daily.difficulty = form.difficulty.data
            db.session.add(daily)
            db.session.commit()
            return daily.to_dict()
    elif request.method == "GET":
        return daily.to_dict()

@daily_routes.route('/<int:daily_id>/delete', methods=['GET','POST'])
def delete_daily(daily_id):
    daily = Daily.query.get(daily_id)
    if request.method == "POST":
        db.session.delete(daily)
        db.session.commit()
        return {'delete': "successful"}, 200
    return {'delete':'Failed'},401

@daily_routes.route('/<int:daily_id>/complete', methods=['GET','POST'])
def complete_daily(daily_id):
    daily = Daily.query.get(daily_id)
    if daily.completed == 0:
        daily.completed = 1
        daily.streak = daily.streak + 1
        daily.due_date = date.today()
        db.session.add(daily)
        db.session.commit()
        return daily.to_dict()
    elif daily.completed == 1:
        daily.completed = 0
        daily.streak = daily.streak - 1
        db.session.add(daily)
        db.session.commit()
        return daily.to_dict()
    return {"complete":"failed"},401
