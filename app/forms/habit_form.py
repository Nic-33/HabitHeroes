from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Habit

def testStuff(form,field):
    title = field.data
    print(field.data)
    print(title)
    return True

class HabitForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[])
    difficulty = IntegerField('difficulty', validators=[DataRequired()])
    # date_to_reset = DateField('date_to_reset')
    # date_to_reset = DateField(validators=[DataRequired()])
    
