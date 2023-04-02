FROM python:3.8-slim-buster

# set working directory
WORKDIR /app/backend_service

# copy the requirements file into the container and install dependencies
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# set environment variables
ARG cloud_sql_connection_name
ARG database_port
ARG database_password
ARG database_name
ARG database_username
ARG secret_key
ARG algorithm
ARG mail_api_key
ARG email_template_id
ARG password_salt
ARG from_email
ARG PROJECT_ID
ARG KUBERNETES_SERVICE_HOST
ENV database_hostname=${database_hostname} \
    database_port=${database_port} \
    database_password=${database_password} \
    database_name=${database_name} \
    database_username=${database_username} \
    secret_key=${secret_key} \
    algorithm=${algorithm} \
    mail_api_key=${mail_api_key} \
    email_template_id=${email_template_id} \
    password_salt=${password_salt} \
    from_email=${from_email} \
    PROJECT_ID=${PROJECT_ID} \
    KUBERNETES_SERVICE_HOST=${KUBERNETES_SERVICE_HOST}

# copy the app files into the container
COPY . .

ENV PYTHONPATH=/app

# expose port
EXPOSE 8000

# set the command to start the app
CMD ["python", "-m", "main",
     "--database_hostname", "${database_hostname}",
     "--database-port", "${database_port}",
     "--database-password", "${database_password}",
     "--database-name", "${database_name}",
     "--database-username", "${database_username}",
     "--secret-key", "${secret_key}",
     "--algorithm", "${algorithm}",
     "--mail-api-key", "${mail_api_key}",
     "--email-template-id", "${email_template_id}",
     "--password-salt", "${password_salt}",
     "--from-email", "${from_email}",
     "--PROJECT-ID", "${PROJECT_ID}",
     "--KUBERNETES_SERVICE_HOST", "${KUBERNETES_SERVICE_HOST}"
    ]
