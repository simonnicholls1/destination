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
    project_id=$PROJECT_ID \
    KUBERNETES_SERVICE_HOST=$KUBERNETES_SERVICE_HOST

RUN echo $cloud_sql_connection_name

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
