from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    secret_key: str
    password_salt: str
    algorithm: str
    access_token_expire_minutes: int
    mail_api_key: str
    email_template_id: str
    from_email: str
    cloud_sql_connection_name: str = None
    database_hostname: str = None


env_path = os.environ.get('ENV_FILE_PATH', '../prod.env')
settings = Settings(_env_file=env_path, _env_file_encoding='utf-8')

# convert access_token_expire_minutes to int
settings.access_token_expire_minutes = int(settings.access_token_expire_minutes)

if not settings.cloud_sql_connection_name and not settings.database_hostname:
    raise ValueError("One of cloud_sql_connection_name or database_hostname must be provided")

