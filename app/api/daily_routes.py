from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Daily, db
from app.forms import DailyForm

# from flask_login import
from datetime import datetime

daily_routes = Blueprint("daily", __name__)

# @daily_routes.route('/')
# def get_all_daily():
#     dailies = Daily.query.all()
#     print("daily:",current_user.to_dict())
#     return {'daily': [daily.to_dict() for daily in dailies]}


@daily_routes.route("/")
def get_all_daily_user():
    user_id = current_user.to_dict()["id"]
    dailies = Daily.query.filter(Daily.user_id == user_id).all()
    return {"dailies": [daily.to_dict() for daily in dailies]}


@daily_routes.route("/", methods=["POST"])
def create_daily():
    form = DailyForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    user_id = current_user.to_dict()["id"]
    if form.validate_on_submit():
        title = form.title.data
        description = form.description.data
        difficulty = form.difficulty.data
        repeat_days = form.data["repeat_days"]
        # due_date = form.data["due_date"] if form.data["due_date"] is not False else None
        new_daily = Daily(
            user_id=user_id,
            title=title,
            description=description,
            difficulty=difficulty,
            #   due_date = due_date,
            repeat_days=repeat_days,
            completed=0,
            streak=0,
            date_timestamp=datetime.timestamp(datetime.now()),
        )
        # new_daily.due_date = form.data["due_date"]
        # new_daily.due_date = new_daily.date_due()
        new_daily.due_date = new_daily.date_due()
        db.session.add(new_daily)
        db.session.commit()
        return new_daily.to_dict()
    print(form.errors)
    return form.errors, 401


@daily_routes.route("/<int:daily_id>", methods=["GET", "POST"])
def update_daily(daily_id):
    form = DailyForm()
    daily = Daily.query.get(daily_id)
    if request.method == "POST":
        if form.validate_on_submit():
            daily.title = form.title.data
            daily.description = form.description.data
            daily.difficulty = form.difficulty.data
            if daily.repeat_days != form.repeat_days.data:
                daily.repeat_days = daily.convert_set(form.repeat_days.data)
                daily.due_date = daily.date_due()
            db.session.add(daily)
            db.session.commit()
            return daily.to_dict()
    elif request.method == "GET":
        return daily.to_dict()


@daily_routes.route("/<int:daily_id>/delete", methods=["GET", "DELETE"])
def delete_daily(daily_id):
    daily = Daily.query.get(daily_id)
    if request.method == "DELETE":
        db.session.delete(daily)
        db.session.commit()
        return {"delete": "successful"}, 200
    return {"delete": "Failed"}, 401


@daily_routes.route("/<int:daily_id>/complete", methods=["GET", "POST"])
def complete_daily(daily_id):
    daily = Daily.query.get(daily_id)
    next_date_due = daily.date_due()
    print("next due date:", next_date_due)
    streak = int(daily.streak)
    if daily.completed == 0:
        daily.completed = 1

        if daily.due_date < datetime.timestamp(datetime.now()):
            streak = 0
        else:
            streak = streak + 1

        daily.streak = streak
        daily.last_due_date = daily.due_date
        daily.last_completed_date = daily.completed_date
        daily.due_date = next_date_due
        daily.completed_date = datetime.timestamp(datetime.now())
        daily.date_timestamp = datetime.timestamp(datetime.now())
        db.session.add(daily)
        db.session.commit()
        return daily.to_dict()
    elif daily.completed == 1:
        daily.completed = 0
        daily.completed_date = daily.last_completed_date
        daily.due_date = daily.last_due_date

        if streak <= 0:
            streak = 0
        else:
            streak = streak - 1

        daily.streak = streak
        db.session.add(daily)
        db.session.commit()
        return daily.to_dict()
    return {"complete": "failed"}, 401
