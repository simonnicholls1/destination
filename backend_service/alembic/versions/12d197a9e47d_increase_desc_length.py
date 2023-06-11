"""increase descp length

Revision ID: 12d197a9e47d
Revises: 081cb23e3a7a
Create Date: 2023-06-11 18:41:45.691689

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12d197a9e47d'
down_revision = '081cb23e3a7a'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('destination_surf_details', 'description', type_=sa.String(600))

def downgrade():
    op.alter_column('destination_surf_details', 'description', type_=sa.String(200))
