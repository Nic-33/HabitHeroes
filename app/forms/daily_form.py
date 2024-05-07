from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Daily

class DailyForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), ])
    description = StringField('description', validators=[DataRequired(), ])
    difficulty = IntegerField( validators=[DataRequired()])
