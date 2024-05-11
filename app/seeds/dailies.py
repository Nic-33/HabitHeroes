from app.models import db, Daily, environment, SCHEMA
# from app.models.daily import RepeatFrequency, RepeatOn, RepeatFrame
from datetime import datetime
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_dailies():
    demo_daily = Daily(
        user_id= 1,
        title='Daily seed',
        description='This is the daily seed',
        difficulty= 1,
        repeat_days = '023',
        date_timestamp=datetime.timestamp(datetime.now()),
        streak = 0,
        due_date=datetime.timestamp(datetime.now())+100000,
        completed=False)

    demo_daily2 = Daily(
        user_id= 1,
        title='Daily seed2',
        description='This is the daily seed 2',
        difficulty= 1,
        repeat_days = '25',
        date_timestamp=datetime.timestamp(datetime.now()),
        streak = 0,
        due_date=datetime.timestamp(datetime.now())+1000000,
        completed=False)

    demo_daily3 = Daily(
        user_id= 1,
        title='Daily seed3',
        description='This is the daily seed 3',
        difficulty= 1,
        repeat_days = '0',
        date_timestamp=datetime.timestamp(datetime.now()),
        streak = 0,
        due_date=datetime.timestamp(datetime.now())+1000000,
        completed=False)

    demo_daily4 = Daily(
        user_id= 2,
        title='Daily seed4',
        description='This is the daily seed 4',
        difficulty= 1,
        repeat_days = '0',
        date_timestamp=datetime.timestamp(datetime.now()),
        streak = 10,
        due_date=datetime.timestamp(datetime.now())-10000000,
        completed=False)

    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo_daily)
    db.session.add(demo_daily2)
    db.session.add(demo_daily3)
    db.session.add(demo_daily4)
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
