from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Avatar

class AvatarForm(FlaskForm):
    seed = IntegerField('seed', validators=[])
    eyes = IntegerField('eyes',validators=[])
    mouth = IntegerField('mouth',validators=[])
  
  
