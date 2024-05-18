from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField,BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Habit
from datetime import datetime

def testStuff(form,field):
    title = field.data
    print(field.data)
    print(title)
    return True

class HabitForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[])
    difficulty = IntegerField('difficulty', validators=[])
    date_to_reset = StringField('date_to_reset',validators=[])
    pos_count = IntegerField('pos_count',validators=[])
    neg_count = IntegerField('neg_count',validators=[])
    pos= BooleanField('pos',validators=[])
    neg = BooleanField('neg',validators=[])
    # date_to_reset = DateField(validators=[DataRequired()])
