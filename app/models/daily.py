from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Enum
from flask_login import UserMixin
from datetime import datetime, timedelta, time as datetimeTime
from time import localtime, time

class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    difficulty = db.Column(db.Integer(),nullable=False)
    repeat_days = db.Column(db.String()) # need to fix
    date_timestamp = db.Column(db.Integer())
    streak = db.Column(db.Integer())
    due_date = db.Column(db.Integer())
    last_due_date = db.Column(db.Integer())
    completed = db.Column(db.Boolean())
    completed_date = db.Column(db.Integer())
    last_completed_date = db.Column(db.Integer())


    users = db.relationship("User", back_populates="dailies")

    def to_dict(self):
         
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description':self.description,
            'difficulty':self.difficulty,
            'frequency':self.repeat_days, # need to fix
            'date_timestamp':datetime.fromtimestamp(self.date_timestamp),
            'due_date': self.due_date,
            'due_date': datetime.fromtimestamp(self.due_date) if self.due_date is not None else None,
            'streak' : self.streak,
            'completed': self.completed,
            'completed_date': self.completed_date
        }

    def convert_set(self, data):
        if isinstance(data, str):
            return set(data)
        elif isinstance(data, set):
            return ''.join(data)

    def date_due(self):
        dueDates = sorted(set(self.repeat_days))
        currentDate = time()
        current_wday = localtime(currentDate).tm_wday
        for date in dueDates:
            date = int(date)
            if date > current_wday:
                next_wday = date
                break
            else:
                next_wday = int(dueDates[0])
        current = datetime.now()
        nextDateDue = current + timedelta( (next_wday-current.weekday()) % 7 )
        nextDateDue = datetime.combine(nextDateDue, datetimeTime.max)
        return datetime.timestamp(nextDateDue)
