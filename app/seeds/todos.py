from app.models import db, Todo, environment, SCHEMA
# from app.models.habit import FrequencyEnum
from datetime import datetime
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_todos():
    demo_todo = Todo(
        user_id= 1,title='seed data', description='Make seed data for the database', difficulty= 1,due_date=datetime.now(),completed=False)
   
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo_todo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_todos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM todos"))
        
    db.session.commit()
