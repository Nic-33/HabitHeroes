from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Todo

class TodoForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[])
    difficulty = IntegerField('difficulty', validators=[DataRequired()])
    due_date = DateField(validators=[DataRequired()])


