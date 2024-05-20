from app.models import db, Avatar, environment, SCHEMA
# from app.models.daily import RepeatFrequency, RepeatOn, RepeatFrame
from datetime import datetime
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_avatars():
    demo_avatar1 = Avatar(
        user_id= 1,
        seed=2,
        eyes=6,
        mouth = 5
        )

    demo_avatar2 = Avatar(
       user_id = 2,
        seed =1,
        eyes =3,
        mouth = 7
        )


    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo_avatar1)
    db.session.add(demo_avatar2)
    # db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_avatars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.avatars RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM avatars"))

    db.session.commit()
