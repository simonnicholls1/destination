FROM python:3.8-slim-buster

# set working directory
WORKDIR /app/backend_service

# set environment variables
ENV CLOUD_SQL_CONNECTION_NAME=$cloud_sql_connection_name \
    DATABASE_PORT=$database_port \
    DATABASE_PASSWORD=$database_password \
    DATABASE_NAME=$database_name \
    DATABASE_USERNAME=$database_username \
    SECRET_KEY=$secret_key \
    ALGORITHM=$algorithm \
    MAIL_API_KEY=$mail_api_key \
    EMAIL_TEMPLATE_ID=$email_template_id \
    PASSWORD_SALT=$password_salt \
    FROM_EMAIL=$from_email \
    PROJECT_ID=$PROJECT_ID \
    KUBERNETES_SERVICE_HOST=$KUBERNETES_SERVICE_HOST \
    ACCESS_TOKEN_EXPIRE_MINUTES=$ACCESS_TOKEN_EXPIRE_MINUTES

# copy the requirements file into the container and install dependencies
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# copy the app files into the container
COPY . .

ENV PYTHONPATH=/app

# expose port
EXPOSE 8000

# set the command to start the app
CMD ["python", "main.py"]
