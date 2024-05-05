"""initial migration

Revision ID: e7f91a9a98ab
Revises: 
Create Date: 2024-05-02 21:25:16.430502

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e7f91a9a98ab'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('last_login', sa.Date(), nullable=False),
    sa.Column('avatar_url', sa.String(), nullable=True),
    sa.Column('about', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('dailies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('difficulty', sa.Integer(), nullable=False),
    sa.Column('repeats_frequency', sa.Enum(), nullable=True),
    sa.Column('repeats_frame', sa.Enum(), nullable=True),
    sa.Column('repeats_on', sa.Enum(), nullable=True),
    sa.Column('date_to_reset', sa.Date(), nullable=True),
    sa.Column('streak', sa.Enum(), nullable=True),
    sa.Column('due_date', sa.Date(), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('habits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('difficulty', sa.Integer(), nullable=False),
    sa.Column('frequency', sa.Enum(), nullable=True),
    sa.Column('date_to_reset', sa.Date(), nullable=True),
    sa.Column('pos', sa.Boolean(), nullable=True),
    sa.Column('neg', sa.Boolean(), nullable=True),
    sa.Column('pos_count', sa.Integer(), nullable=True),
    sa.Column('neg_count', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('todos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('difficulty', sa.Integer(), nullable=False),
    sa.Column('due_date', sa.Date(), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('todos')
    op.drop_table('habits')
    op.drop_table('dailies')
    op.drop_table('users')
    # ### end Alembic commands ###