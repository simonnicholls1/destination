"""added destination and beaches tables

Revision ID: 2a3a1bcf45fc
Revises: 113c73d2b1d3
Create Date: 2023-06-03 23:23:07.927586

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2a3a1bcf45fc'
down_revision = '113c73d2b1d3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('destination',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.Column('longitude', sa.Float(), nullable=False),
    sa.Column('date_added', sa.TIMESTAMP(timezone=True), server_default='now()', nullable=False),
    sa.Column('date_updated', sa.TIMESTAMP(timezone=True), nullable=True),
    sa.Column('active', sa.BOOLEAN(), server_default='t', nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('beach',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('destination_id', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(length=300), nullable=False),
    sa.Column('city', sa.String(length=100), nullable=False),
    sa.Column('country', sa.String(length=100), nullable=False),
    sa.Column('country_code', sa.String(length=3), nullable=False),
    sa.Column('post_code', sa.String(length=20), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.Column('longitude', sa.Float(), nullable=False),
    sa.Column('date_added', sa.TIMESTAMP(timezone=True), server_default='now()', nullable=False),
    sa.Column('date_updated', sa.TIMESTAMP(timezone=True), nullable=True),
    sa.Column('active', sa.BOOLEAN(), server_default='t', nullable=False),
    sa.ForeignKeyConstraint(['destination_id'], ['destination.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', 'destination_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('beach')
    op.drop_table('destination')
    # ### end Alembic commands ###
