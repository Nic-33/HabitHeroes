from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Daily

class DailyForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    difficulty = IntegerField( 'difficulty',validators=[DataRequired()])
    # repeat_days = SelectMultipleField('Days to repeat on', choices=[('0',"Monday"),('1',"Tuesday"),('2','Wednesday'),('3','Thursday'),('4','Friday'),('5','Saturday'),('6','Sunday')])
