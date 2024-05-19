from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField,BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class UserForm(FlaskForm):
    username = StringField('username', validators=[])
    about = StringField('about', validators=[])
    avatar_url = StringField('avatar url', validators=[])
