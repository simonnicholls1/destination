FROM python:3.8-slim-buster

# set working directory
WORKDIR /app/backend_service

# set environment variables
ENV cloud_sql_connection_name=$cloud_sql_connection_name \
    database_port=$database_port \
    database_password=$database_password \
    database_name=$database_name \
    database_username=$database_username \
    secret_key=$secret_key \
    algorithm=$algorithm \
    mail_api_key=$mail_api_key \
    email_template_id=$email_template_id \
    password_salt=$password_salt \
    from_email=$from_email \
    PROJECT_ID=$PROJECT_ID \
    KUBERNETES_SERVICE_HOST=$KUBERNETES_SERVICE_HOST

# copy the requirements file into the container and install dependencies
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# copy the app files into the container
COPY . .

# create prod.env file
RUN echo "cloud_sql_connection_name=$cloud_sql_connection_name\n" \
    "$database_port=$database_port\n" \
    "$database_password=$database_password\n" \
    "$database_name=$database_name\n" \
    "$database_username=$database_username\n" \
    "$secret_key=$secret_key\n" \
    "$algorithm=$algorithm\n" \
    "$mail_api_key=$mail_api_key\n" \
    "$email_template_id=$email_template_id\n" \
    "$password_salt=$password_salt\n" \
    "$from_email=$from_email\n" \
    "PROJECT_ID=$PROJECT_ID\n" \
    "KUBERNETES_SERVICE_HOST=$KUBERNETES_SERVICE_HOST\n" > /app/prod.env

ENV PYTHONPATH=/app

# expose port
EXPOSE 8000

# set the command to start the app
CMD ["python", "-m", "main"]
