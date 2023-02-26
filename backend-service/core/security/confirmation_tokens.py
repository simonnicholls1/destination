from itsdangerous import URLSafeTimedSerializer
from core.config import settings

def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(settings.secret_key)
    return serializer.dumps(email, salt=settings.password_salt)


def confirm_token(token, expiration=864000):
    serializer = URLSafeTimedSerializer(settings.secret_key)

    email = serializer.loads(
        token,
        salt=settings.password_salt,
        max_age=expiration
    )

    return email