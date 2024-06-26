from flask import Blueprint, request
from datetime import date
from app.models import User,Avatar, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

auth_routes = Blueprint('auth', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            if (error not in errorMessages):
                errorMessages.append(f'{error}')
    return errorMessages

@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/avatars', methods=['PUT'])
def User_Avatar():
    user_id = current_user.to_dict()['id']
    avatars = User.query.filter(User.id==user_id).first()
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        avatars.avatar_url = form.avatar_url.data
        db.session.commit()
        return avatars.to_dict()
    return {'errors': {'message': 'failed'}}, 401



@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        # user.last_login = datetime.today()
        # db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

auth_routes.route('/backdoor', methods=['GET','POST'])
def login_backdoor():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
        # Add the user to the session, we are logged in!
    user = User.query.filter(User.email == form.data['email']).first()
        # user.last_login = datetime.today()
        # db.session.commit()
    login_user(user)
    return user.to_dict()
    # return form.errors, 401

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            last_login=date.today(),
            about="",
            avatar_url="https://api.dicebear.com/8.x/fun-emoji/svg?seed=socks&eyes=cute&mouth=cute"
        )
        db.session.add(user)
        db.session.commit()
        print('UserID!!!!!!!!!!!:',user.id)
        avatar = Avatar(
            user_id = user.id,
            seed = 0,
            eyes = 0,
            mouth = 0
        )
        db.session.add(avatar)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
