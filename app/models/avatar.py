from .db import db, environment, SCHEMA, add_prefix_for_prod



class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(),  db.ForeignKey("users.id"),nullable=False,  unique=True)
    seed = db.Column(db.Integer(),nullable=False)
    eyes = db.Column(db.Integer(),nullable=False)
    mouth = db.Column(db.Integer(),nullable=False)

<<<<<<< HEAD
    user = db.relationship("User", back_populates="avatar")
    
=======
>>>>>>> 8733e71f18815bba605e061640ce943454ce1ebd
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'seed':self.seed,
            'eyes':self.eyes,
            "mouth":self.mouth
        }
