FROM python:3

# Create app directory
WORKDIR /usr/src/app

# Install tornado server
RUN pip install tornado

# Bundle app source
COPY . .

EXPOSE 12345
CMD [ "python", "dummy_server.py" ]