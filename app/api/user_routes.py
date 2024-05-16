from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

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
    updated_user = User.query.get(user_id)
    body = request.get_json()

    if "about" in body:
        updated_user.about =  body['about']
    if 'avatarUrl' in body:
        updated_user.avatar_url = body['avatarUrl']

    db.session.commit()
    return updated_user.to_dict()
