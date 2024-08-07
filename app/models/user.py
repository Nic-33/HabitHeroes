from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, timedelta, time as datetimeTime
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(40),nullable=False)
    last_name = db.Column(db.String(40),nullable=False)
    last_login = db.Column(db.Date(),nullable=False)
    avatar_url = db.Column(db.String())
    about = db.Column(db.String(255))
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())


    habits = db.relationship("Habit", back_populates="users",cascade='all,delete')
    todos = db.relationship("Todo", back_populates="users",cascade='all,delete')
    dailies = db.relationship("Daily", back_populates="users",cascade='all,delete')
    avatars = db.relationship("Avatar", back_populates="users",cascade='all,delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'last_login':self.last_login,
            'avatar_url':self.avatar_url,
            'about':self.about,
            "created_at": self.created_at,
        }
