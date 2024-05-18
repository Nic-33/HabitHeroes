from .db import db, environment, SCHEMA, add_prefix_for_prod
import enum
from sqlalchemy import Enum

class FrequencyEnum(enum.Enum):
    DAILY = 'daily'
    WEEKLY = 'weekly'
    MONTHLY = 'monthly'

class Habit(db.Model):
    __tablename__ = 'habits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    difficulty = db.Column(db.Integer,nullable=False)
    frequency = db.Column(db.String(25))
    date_to_reset = db.Column(db.Date())
    # strength = db.Column(db.Enum())
    pos = db.Column(db.Boolean())
    neg = db.Column(db.Boolean())
    pos_count = db.Column(db.Integer())
    neg_count = db.Column(db.Integer())

    users = db.relationship("User", back_populates="habits")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description':self.description,
            'difficulty':self.difficulty,
            'frequency':'daily',
            'date_to_reset':self.date_to_reset,
            # 'strength':self.strength,
            'pos':self.pos,
            'neg':self.neg,
            'pos_count':self.pos_count,
            'neg_count':self.neg_count,
        }
