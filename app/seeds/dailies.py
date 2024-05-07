from app.models import db, Daily, environment, SCHEMA
from app.models.daily import RepeatFrequency, RepeatOn, RepeatFrame
from datetime import datetime
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_dailies():
    demo_daily = Daily(
        user_id= 1,title='Daily seed', description='This is the daily seed', difficulty= 1,repeats_frequency='once',repeats_frame = 'placeholder',repeats_on='placeholder',date_to_reset=datetime.now(),streak = 0,due_date=datetime.now(),completed=False)
    demo_daily2 = Daily(
        user_id= 2,title='Daily seed2', description='This is the daily seed 2', difficulty= 1,repeats_frequency='twice',repeats_frame = 'placeholder',repeats_on='placeholder',date_to_reset=datetime.now(),streak = 0,due_date=datetime.now(),completed=False)
   
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo_daily)
    db.session.add(demo_daily2)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dailies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dailies"))
        
    db.session.commit()
