from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Avatar,db
from app.forms import AvatarForm

# from datetime import datetime

avatar_routes = Blueprint('avatars', __name__)


@avatar_routes.route('/')
def get_avatar():
    user_id = current_user.to_dict()['id']
    avatar = Avatar.query.filter(Avatar.user_id==user_id).all()
    return avatar.to_dict()

@avatar_routes.route('/test')
def test_avatar():
    user_id = current_user.to_dict()['id']
    avatar = Avatar.query.filter(Avatar.user_id==user_id).first()
    return avatar.to_dict()
    # print('test!!!!!')
    # return '<h1>Test Test Test</h1>'

# @avatar_routes.route('/',methods=['POST'])
# @login_required
# def create_avatar():
#     # """
#     # Query for all habits and returns them in a list of user dictionaries
#     # """
#     user_id = current_user.to_dict()['id']
#     avatar = Avatar.query.filter(Avatar.user_id==user_id).first()
#     return avatar.to_dict()


# @avatar_routes.route('/',methods=['PUT'])
# @login_required
# def update_avatar():
#     print("Stuffffffffff")
#     form = AvatarForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     avatar = Avatar.query.filter(current_user.to_dict()['id'] == Avatar.user_id).first()
#     if form.seed.data is not None:
#         avatar.seed = form.seed.data
#     if form.eyes.data is not None:
#         avatar.eyes = form.eyes.data
#     if form.mouth.data is not None:
#         avatar.mouth = form.mouth.data
#     # db.session.add(avatar)
#     db.session.commit()
#     return avatar.to_dict()
