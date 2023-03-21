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
    access_token_expire_minutes: int = 30
    mail_api_key: str
    email_template_id: str
    from_email: str
    database_hostname: str


env_path = os.environ.get('ENV_FILE_PATH', '../prod.env')
settings = Settings(_env_file=env_path, _env_file_encoding='utf-8')
