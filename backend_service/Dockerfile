FROM python:3.8-slim-buster

# set working directory
WORKDIR /app/backend_service

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
