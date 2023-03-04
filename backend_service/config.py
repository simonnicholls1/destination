from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    database_hostname: str
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


env_path = os.environ.get('ENV_FILE_PATH', '../prod.env')
settings = Settings(_env_file=env_path, _env_file_encoding='utf-8')
