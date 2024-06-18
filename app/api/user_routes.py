from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UserForm

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


@user_routes.route('/')
@login_required
def users():
    user_id = current_user.to_dict()['id']
    user = User.query.get(user_id)
    return user.to_dict()

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/', methods=['PUT'])
def update_user ():
    user_id = current_user.to_dict()['id']
    user = User.query.get(user_id)
    form = UserForm()
    user.about=form.about.data
    user.username=form.username.data
    user.avatar_url=form.avatar_url.data
    db.session.commit()
    return user.to_dict()

@user_routes.route('/<int:user_id>/delete', methods=['GET','DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if request.method == "DELETE":
        db.session.delete(user)
        db.session.commit()
        return {'delete': "successful"}, 200
    return {'delete':'Failed'},401
