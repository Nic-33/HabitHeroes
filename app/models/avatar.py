from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.String(40), nullable=False)
    # title = db.Column(db.String(255), nullable=False, unique=True)
    # description = db.Column(db.String(255), nullable=False)
    # difficulty = db.Column(db.Integer(),nullable=False)
    # repeats_frequency = db.Column(db.Enum())
    # repeats_frame = db.Column(db.Enum())
    # repeats_on = db.Column(db.Enum())
    # date_to_reset = db.Column(db.Date())
    # streak = db.Column(db.Enum())
    # due_date = db.Column(db.Date())
    # completed = db.Column(db.Boolean())
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            # 'title': self.title,
            # 'description':self.description,
            # 'difficulty':self.difficulty,
            # 'frequency':self.frequency,
            # 'date_to_reset':self.date_to_reset,
            # # 'strength':self.strength,
            # 'pos':self.pos,
            # 'neg':self.neg,
            # 'pos_count':self.pos_count,
            # 'neg_count':self.neg_count,
        }
