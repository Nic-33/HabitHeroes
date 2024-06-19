from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Todo(db.Model):
    __tablename__ = 'todos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    difficulty = db.Column(db.Integer(),nullable=False)
    due_date = db.Column(db.Date(),nullable=False)
    completed = db.Column(db.Boolean())

    users = db.relationship("User", back_populates="todos")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description':self.description,
            'difficulty':self.difficulty,
            'due_date':self.due_date,
            'completed':self.completed
        }
