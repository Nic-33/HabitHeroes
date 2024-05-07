from .db import db, environment, SCHEMA, add_prefix_for_prod
import enum
from sqlalchemy import Enum
from flask_login import UserMixin

class RepeatFrequency(enum.Enum):
    ONE='one'
    TWO='two'
    THREE='three'
class RepeatFrame(enum.Enum):
    ONE='one'
    TWO='two'
    THREE='three'
class RepeatOn(enum.Enum):
    ONE='one'
    TWO='two'
    THREE='three'

class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    difficulty = db.Column(db.Integer(),nullable=False)
    repeats_frequency = db.Column(db.String(25))
    repeats_frame = db.Column(db.String(25))
    repeats_on = db.Column(db.String())
    date_to_reset = db.Column(db.Date())
    streak = db.Column(db.Integer)
    due_date = db.Column(db.Date())
    completed = db.Column(db.Boolean())

    users = db.relationship("User", back_populates="dailies")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description':self.description,
            'difficulty':self.difficulty,
            'frequency':self.repeats_frequency,
            'date_to_reset':self.date_to_reset,
            # 'strength':self.strength,
            # 'pos':self.pos,
            # 'neg':self.neg,
            # 'pos_count':self.pos_count,
            # 'neg_count':self.neg_count,
        }
